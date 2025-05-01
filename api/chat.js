let messages = []; // In-memory storage

module.exports = (req, res) => {
  if (req.method === 'POST') {
    const { name, message } = req.body;
    if (!name || !message) {
      return res.status(400).json({ error: 'Name and message are required' });
    }
    messages.push({ name, message, time: new Date().toLocaleTimeString() });
    if (messages.length > 100) messages.shift(); // Limit messages
    return res.status(200).json({ success: true });
  }

  if (req.method === 'GET') {
    return res.status(200).json(messages);
  }

  res.status(405).end();
};
