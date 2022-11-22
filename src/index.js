'use strict';

class BoardGame {

}
const body = document.querySelector('body')
const canvas = document.createElement('canvas')
body.prepend(canvas)

const ctx = canvas.getContext('2d')
const numberOfBuildings = Math.round(window.innerWidth/80)

class Building {
    constructor() {
        this.viewHeight = canvas.height
        this.maxHeight = Math.floor(canvas.height * 0.75)
        this.minHeigth = Math.floor(canvas.height * 0.25)
        this.height = Math.floor(Math.random()*(this.maxHeight - this.minHeigth) + this.minHeigth)
    }
    draw() {
        ctx.fillStyle = 'black'
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    setWidth(x) {
        this.x = x;
        this.width = Math.round(canvas.width/numberOfBuildings)
    }
    setHeight() {
        this.height = this.height * canvas.height / this.viewHeight
        this.viewHeight = canvas.height;
        this.y = canvas.height - this.height;
    }
}

class Player {
    constructor(idx) {
        this.width = 20;
        this.height = 40;
        this.idx = idx;
        this.x = this.idx * canvas.width / numberOfBuildings + myBuildings[this.idx].width/2 - this.width/2
        this.y = myBuildings[this.idx].y - this.height
    }
    draw() {
        ctx.fillStyle = 'red'
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

const myBuildings = []

const setWindowSize = () => {
    canvas.width = window.visualViewport.width; 
    canvas.height = window.visualViewport.height;

    myBuildings.forEach((building, i) => {
        building.setWidth(i * canvas.width / numberOfBuildings)
        building.setHeight()
        building.draw()
    })
}

const start = () => {
    setWindowSize()
    
    for (let i=0; i<numberOfBuildings; i++) {
        const building = new Building()
        building.setWidth(i * canvas.width / numberOfBuildings)
        building.setHeight()
        building.draw()
        myBuildings.push(building)
    }

    const playerOne = new Player(Math.round(Math.random()) + 1)
    playerOne.draw()

    const playerTwo = new Player(numberOfBuildings - Math.round(Math.random()) - 2)
    playerTwo.draw()
}

window.addEventListener('load', start)
window.addEventListener('resize', setWindowSize)