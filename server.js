const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));
/*
* Route to render HTML Page
*/
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/stats', (req, res) => res.sendFile(path.join(__dirname, 'public', 'stats.html')));
app.get('/exercise', (req, res) => res.sendFile(path.join(__dirname, 'public', 'exercise.html')));


app.listen(port, () => console.log(`App listening on port ${port}!`));