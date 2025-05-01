let messages = [];

export default function handler(req, res) {
  // Handle POST: Add new message
  if (req.method === 'POST') {
    const { name, message } = req.body;
    messages.push({ name, text: message });
    return res.status(201).json({ success: true });
  }

  // Handle GET: Return all messages
  if (req.method === 'GET') {
    return res.status(200).json(messages);
  }

  // Fallback for other methods
  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
