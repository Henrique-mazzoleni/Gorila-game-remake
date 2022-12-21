require('dotenv').config();
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"))
app.use(express.static(path.join(__dirname, "../public")))

hbs.registerPartials(path.join(__dirname, '../templates/partials'))

const availableChallenges = []

app.get('/', (req, res) => {
    res.render('welcome', {title: "Welcome", challenges: availableChallenges})
})

app.get("/game", (req, res) => {
    console.log(availableChallenges);
    res.render('game', {title: "Game"})
})

app.get("/gameover", (req,res) => {
    res.render('gameover', {title: "Gameover"})
})

app.get('/challenges', (req,res) => {
    res.send({availableChallenges})
})

io.on('connection', (socket) => {
    console.log('New websocket connection');

    socket.on('challengeMade', (playerName, noOfRounds) => {
        availableChallenges.push([playerName, noOfRounds])
    })
})

server.listen(process.env.PORT, () => console.log(`running on port ${process.env.PORT}`))