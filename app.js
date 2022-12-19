const express = require("express");
const path = require("path")
const hbs = require("hbs");

const app = express();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/templates/views"))
app.use(express.static(path.join(__dirname, "/public")))

hbs.registerPartials(path.join(__dirname, '/templates/partials'))

app.get('/', (req, res) => {
    res.render('welcome', {title: "Welcome"})
})

app.get("/game", (req, res) => {
    res.render('game', {title: "Game"})
})

app.get("/gameover", (req,res) => {
    res.render('gameover', {title: "Gameover"})
})

app.listen(3000, () => console.log('running on port 3000'))