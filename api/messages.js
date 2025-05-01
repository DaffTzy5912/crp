// api/messages.js
const { promises: fs } = require('fs');
const path = require('path');

const DATA_FILE = path.join(process.cwd(), 'messages.json');
const MAX_MESSAGES = 50; // Batas maksimum pesan yang disimpan

export default async function handler(req, res) {
  let messages = [];

  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    messages = JSON.parse(data);
  } catch (e) {
    // Jika file belum ada, buat array kosong
    messages = [];
  }

  // POST: Tambah pesan baru
  if (req.method === 'POST') {
    const { name, message } = req.body;

    if (!name || !message) {
      return res.status(400).json({ error: 'Name and message are required' });
    }

    const newMessage = {
      name,
      message,
      timestamp: new Date().toISOString(),
    };

    messages.push(newMessage);

    // Batasi jumlah pesan
    if (messages.length > MAX_MESSAGES) {
      messages = messages.slice(-MAX_MESSAGES); // Hanya simpan N pesan terakhir
    }

    // Simpan kembali ke file
    await fs.writeFile(DATA_FILE, JSON.stringify(messages, null, 2));

    return res.status(201).json({ success: true });
  }

  // GET: Kembalikan semua pesan
  res.status(200).json(messages);
}
