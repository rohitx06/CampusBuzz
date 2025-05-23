// routes/events.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all events
router.get('/', (req, res) => {
  db.query('SELECT * FROM events', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Add an event
router.post('/', (req, res) => {
  const { title, date, time, description } = req.body;
  db.query('INSERT INTO events (title, date, time, description) VALUES (?, ?, ?, ?)',
    [title, date, time, description],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'Event added!', id: result.insertId });
    }
  );
});

// Update event
router.put('/:id', (req, res) => {
  const { title, date, time, description } = req.body;
  db.query(
    'UPDATE events SET title=?, date=?, time=?, description=? WHERE id=?',
    [title, date, time, description, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'Event updated!' });
    }
  );
});

// Delete event
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM events WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Event deleted!' });
  });
});

module.exports = router;
