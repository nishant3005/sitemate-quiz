const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors());

let issues = [
  { id: 1, title: 'Issue 1', description: 'Description for Issue 1' },
  { id: 2, title: 'Issue 2', description: 'Description for Issue 2' },
];

// Create
app.post('/api/issues', (req, res) => {
  const newIssue = req.body;
  const issueId = newIssue.id;
  const id = parseInt(issueId);
  const issue = issues.find((i) => i.id === id);
  console.log(issue);
  if (issue !== undefined) {
    return res.json({ msg: 'Issue with this issueId already exists.' });
  }
  console.log(newIssue);
  issues.push(newIssue);
  console.log('Created Issue:', newIssue);
  res.json(newIssue);
  console.log(issues);
});

// Read
app.get('/api/issues/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const issue = issues.find((i) => i.id === id);
  console.log(issue);
  if (issue === undefined) {
    return res.json({ msg: 'Issue does not exist.' });
  }
  console.log('Read Issue:', issue);
  res.json(issue);
});

// Update
app.put('/api/issues/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedIssue = req.body;
  issues = issues.map((issue) => (issue.id === id ? updatedIssue : issue));
  console.log('Updated Issue:', updatedIssue);
  res.json(updatedIssue);
});

// Delete
app.delete('/api/issues/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const deletedIssue = issues.find((issue) => issue.id === id);
  if (deletedIssue === undefined) {
    return res.json({ msg: 'Issue does not exist.' });
  }
  issues = issues.filter((issue) => issue.id !== id);

  console.log('Deleted Issue:', deletedIssue);
  res.json({ mag: `Issue with id ${id} is deleted.` });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
