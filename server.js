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


app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then(workouts =>  {       
      const list = workouts.map(workout => {      
        const duration = workout.exercises.reduce((acc, next)=>{
          return acc + (next.duration || 0);
        }, 0);

        return {
          totalDuration: duration,
          ...workout.toObject()
        }

      })
      

      console.log('List: ', list);
      res.json(list); 
    }).catch(err => { 
      console.log(err);
      res.json(err); 
    });

});

app.put("/api/workouts/:id", async (req, res) => {  
  db.Workout.findByIdAndUpdate(
    req.params.id,
    { $push: { exercises: req.body }},
    { new: true })
    .then(workout => { res.json(workout); })
    .catch(err => { res.json(err); });
});

app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
      .then(workout => {
          res.json(workout);          
      })
      .catch(err => { console.log(err); res.json(err); });
});

app.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(body)
    .then(workout => { res.json(workout); })
    .catch(err => { res.json(err); });
});


app.listen(port, () => console.log(`App listening on port ${port}!`));