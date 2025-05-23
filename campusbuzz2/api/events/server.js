const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const USERS_FILE = path.join(__dirname, 'users.json');

// Ensure users.json exists
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, '[]', 'utf-8');
}

// --- Existing Events Route ---
app.get('/api/events', (req, res) => {
  res.json([
    {
      title: 'CBSE Board Exam',
      date: '2025-03-01',
      time: '10:00 AM',
      description: 'Final board exams for class 12.'
    },
    {
      title: 'Hackathon',
      date: '2025-04-15',
      time: '09:00 AM',
      description: 'A 24-hour coding hackathon on sustainability.'
    }
  ]);
});

// --- New Signup Route ---
app.post('/signup', (req, res) => {
  const { username, password, age, email } = req.body;
  const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));

  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  users.push({ username, password, age, email });
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');

  res.status(201).json({ message: 'Signup successful!' });
});

// --- New Auth/Login Route ---
app.post('/auth', (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // For demo only – in real apps use JWT or sessions
  res.json({ message: 'Login successful!', token: 'demo-token' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
