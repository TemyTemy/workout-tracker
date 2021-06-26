const db = require('./models');
const express = require('express');
const path = require('path');
const logger = require("morgan");
const app = express();
const {connect} = require('./database/connect');
require('dotenv').config();
const port = process.env.PORT || 3000;
connect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// morgon logs each action we take on server
app.use(logger("dev"));

app.use(express.static('public'));
/*
* Route to render HTML Page
*/
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/stats', (req, res) => res.sendFile(path.join(__dirname, 'public', 'stats.html')));
app.get('/exercise', (req, res) => res.sendFile(path.join(__dirname, 'public', 'exercise.html')));


app.get('/api/workouts', (req, res) =>  db.Workout.find({}).then((workOuts) => {
    res.json(workOuts);
    console.log(workOuts);
}).catch(err => {
    res.status(500).json(err);
  }));

app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
      .then(workout => {
          res.json(workout);
          console.log(workout);
      })
      .catch(err => { console.log(err); res.json(err); });
  });

app.listen(port, () => console.log(`App listening on port ${port}!`));