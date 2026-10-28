const server = require('express');
const app = server();

const hobbies = [
    'cycling', 'boating', 'guitar'
]
const skills = [
    'JavaScript', 'Node.js', 'Express.js'
]
const port = 3000;

app.get('/', (req, res) => {
    res.status(200);
    res.send("Welcome to Camper Bot's homepage!");
});

app.get('/hobbies', (req, res) => {
    res.status(200);
    res.send("I cycle, go boating, and play guitar.");
});

app.get('/skills', (req, res) => {
    res.status(200);
    res.send("JavaScript, Node.js, and Express.js!");
});

app.get('/api/profile', (req, res) => {
    res.status(200);
    res.json({
        name: 'Camper Bot',
        hobbies: hobbies,
        skills: skills
    });
});

app.listen(port, () => {
    console.log("Server is running in port ", port)
});