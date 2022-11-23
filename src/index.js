'use strict';

class Board {
    static numberOfBuildings = Math.round(window.innerWidth/80)

    constructor(gravity) {
        this.gravity = gravity
        this.myBuildings = []
        this.players = []
    }
    start() {
        const body = document.querySelector('body')
        this.canvas = document.createElement('canvas')
        body.prepend(this.canvas)
        this.ctx = this.canvas.getContext('2d')
        this.interval = setInterval(updateGame, 20)
    }
    setPlayers() {
        this.players.push(new Player(Math.round(Math.random()) + 1, this))
        this.players.push(new Player(Board.numberOfBuildings - Math.round(Math.random()) - 2, this))
    }
    newBanana(player) {
        this.banana = new Banana(player.x-player.width/2, player.y, this.canvas)
    }
}


class Building {
    constructor(canvas) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.ctx.fillStyle = 'black'
        this.viewHeight = canvas.height
        this.maxHeight = Math.floor(canvas.height * 0.75)
        this.minHeigth = Math.floor(canvas.height * 0.25)
        this.height = Math.floor(Math.random()*(this.maxHeight - this.minHeigth) + this.minHeigth)
    }
    draw() {
        this.ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    setWidth(x) {
        this.x = x;
        this.width = Math.round(this.canvas.width/ Board.numberOfBuildings)
    }
    setHeight() {
        this.height = this.height * this.canvas.height / this.viewHeight
        this.viewHeight = this.canvas.height;
        this.y = this.canvas.height - this.height;
    }
}

class Player {
    constructor(idx, board) {
        this.canvas = board.canvas
        this.ctx = this.canvas.getContext('2d')
        this.width = 20;
        this.height = 40;
        this.idx = idx;
        this.x = this.idx * this.canvas.width / Board.numberOfBuildings + board.myBuildings[this.idx].width/2 - this.width/2
        this.y = board.myBuildings[this.idx].y - this.height
        this.angle = 45;
        this.speed = 20;
    }
    draw() {
        this.ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

class Banana {
    constructor(x, y, canvas) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.ctx.fillStyle = 'yellow'
        this.size = 10;
        this.x = x
        this.y = y - this.size
        this.speedX = null
        this.speedY = null
    }
    draw() {
        this.ctx.fillRect(this.x, this.y, this.size, this.size)
    }
    throw(angle, speed) {
        const angleRadians = angle * Math.PI / 180
        this.speedX = speed * Math.cos(angleRadians)
        this.speedY = speed * Math.sin(angleRadians)
    }
    move(board) {
        this.x += this.speedX
        this.y -= this.speedY
        if (this.speedY !== null) this.speedY -= board.gravity
    }
}

const myBoard = new Board(1)

const display = () => {
    const playerOne = myBoard.players[0]
    playerOne.ctx.fillText(`angle: ${playerOne.angle}`, 30, 30)
    playerOne.ctx.fillText(`speed: ${playerOne.speed}`, 30, 50)
}

const setWindow = () => {
    myBoard.canvas.width = window.visualViewport.width;
    myBoard.canvas.height = window.visualViewport.height;
    
    myBoard.ctx.fillStyle = 'gray'
    myBoard.myBuildings.forEach((building, i) => {
        building.setWidth(i * myBoard.canvas.width / Board.numberOfBuildings)
        building.setHeight()
        building.draw()
    })
}

const start = () => {
    myBoard.start()
    setWindow()
    
    for (let i=0; i<Board.numberOfBuildings; i++) {
        const building = new Building(myBoard.canvas)
        building.setWidth(i * myBoard.canvas.width / Board.numberOfBuildings)
        building.setHeight()
        building.draw()
        myBoard.myBuildings.push(building)
    }
    
    myBoard.setPlayers()
}

const updateGame = () => {
    setWindow()
    display()
    
    myBoard.ctx.fillStyle = 'black'
    myBoard.players.forEach(player => player.draw())
    if (myBoard.banana) {
        myBoard.ctx.fillStyle = 'yellow'
        myBoard.banana.draw()
        myBoard.banana.move(myBoard)
    }
}

const loadBanana = () => {
    
}

window.addEventListener('load', start)
window.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') myBoard.newBanana(myBoard.players[0])
    if (event.key === ' ') myBoard.banana.throw(myBoard.players[0].angle, myBoard.players[0].speed)
    if (event.key === 'ArrowLeft') myBoard.players[0].angle--;
    if (event.key === 'ArrowRight') myBoard.players[0].angle++;
    if (event.key === 'ArrowDown') myBoard.players[0].speed--
    if (event.key === 'ArrowUp') myBoard.players[0].speed++
})