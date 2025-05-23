const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Auth routes
app.use('/api/auth', authRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
