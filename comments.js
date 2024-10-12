// Creat web server
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const commentsPath = path.join(__dirname, 'data/comments.json');

app.get('/api/comments', (req, res) => {
  fs.readFile(commentsPath, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal server error');
      return;
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/comments', (req, res) => {
  fs.readFile(commentsPath, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal server error');
      return;
    }
    const comments = JSON.parse(data);
    const newComment = req.body;
    newComment.id = comments.length + 1;
    comments.push(newComment);
    fs.writeFile(commentsPath, JSON.stringify(comments), (err) => {
      if (err) {
        console.log(err);
        res.status(500).send('Internal server error');
        return;
      }
      res.status(201).send('Comment added');
    });
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});