const chatContainer = document.getElementById('chat-container');
const form = document.getElementById('chat-form');
const nameInput = document.getElementById('name');
const messageInput = document.getElementById('message');

// Submit new message
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const message = messageInput.value.trim();
  
  if (!name || !message) return;

  await fetch('/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, message }),
  });

  messageInput.value = '';
});

// Poll for new messages
async function fetchMessages() {
  const res = await fetch('/api/messages');
  const messages = await res.json();
  
  chatContainer.innerHTML = messages.map(msg => `
    <div class="message message-enter message-enter-active">
      <span class="font-semibold text-blue-600">${msg.name}:</span>
      <span class="ml-2">${msg.text}</span>
    </div>
  `).join('');
}

setInterval(fetchMessages, 2000);
fetchMessages();
