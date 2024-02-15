const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

let tasks = [];

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const { text } = req.body;
  if (text) {
    tasks.push({ text, completed: false });
    res.json({ success: true });
  } else {
    res.status(400).json({ error: 'Text is required for a task.' });
  }
});

app.put('/api/tasks/:index', (req, res) => {
  const { index } = req.params;
  const { text, completed } = req.body;

  if (index && text !== undefined && completed !== undefined) {
    tasks[index] = { text, completed };
    res.json({ success: true });
  } else {
    res.status(400).json({ error: 'Invalid request parameters.' });
  }
});

app.delete('/api/tasks/:index', (req, res) => {
  const { index } = req.params;

  if (index) {
    tasks.splice(index, 1);
    res.json({ success: true });
  } else {
    res.status(400).json({ error: 'Invalid request parameters.' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
