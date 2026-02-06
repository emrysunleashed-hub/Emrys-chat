// 1️⃣ Add your Supabase URL & anon key
const SUPABASE_URL = "https://paniyafeuuhstgxdknvi.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhbml5YWZldXVoc3RneGRrbnZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzODY1OTMsImV4cCI6MjA4NTk2MjU5M30.WnBD6oewGKX5pz999cdx9lAIQD76Je1xc-NGpJQPZrU";

// 2️⃣ Create Supabase client
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 3️⃣ DOM elements
const usernameInput = document.getElementById('username');
const messageInput = document.getElementById('message');
const messagesList = document.getElementById('messages');

// 4️⃣ Fetch messages
async function loadMessages() {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.log(error);
    return;
  }

  messagesList.innerHTML = '';
  data.forEach(msg => {
    const li = document.createElement('li');
    li.textContent = `${msg.username}: ${msg.content}`;
    messagesList.appendChild(li);
  });
}

// 5️⃣ Send a message
async function sendMessage() {
  const username = usernameInput.value.trim();
  const content = messageInput.value.trim();
  if (!username || !content) return alert('Enter username & message');

  const { error } = await supabase
    .from('messages')
    .insert([{ username, content }]);

  if (error) {
    console.log(error);
    return;
  }

  messageInput.value = '';
  loadMessages();
}

// 6️⃣ Initial load
loadMessages();

// 7️⃣ Auto-refresh every 2 sec
setInterval(loadMessages, 2000);
