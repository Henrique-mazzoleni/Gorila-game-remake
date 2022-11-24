"use strict";

class Board {
  static numberOfBuildings = Math.round(window.innerWidth / 80);

  constructor(gravity) {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.gravity = gravity;
    this.myBuildings = [];
    this.players = [];
    this.turn = 0;
  }

  start() {
    const body = document.querySelector("body");
    body.prepend(this.canvas);
    this.interval = setInterval(updateGame, 30);
  }

  createBuildings() {
    for (let i = 0; i < Board.numberOfBuildings; i++) myBoard.myBuildings.push(new Building(this.canvas))
  }

  setBuildings() {
    this.myBuildings.forEach((building, i) => {
      building.setWidth((i * this.canvas.width) / Board.numberOfBuildings);
      building.setHeight();
      building.draw();
    });
  }

  createPlayers() {
      this.players.push(new Player(Math.round(Math.random()) + 1, this));
      this.players.push(
        new Player(Board.numberOfBuildings - Math.round(Math.random()) - 2, this)
      );
  }

  setPlayers() {
    this.players.forEach(player => {
        if (player.id === 0) player.idx = Math.round(Math.random()) + 1
        else Board.numberOfBuildings - Math.round(Math.random()) - 2
    })
  }

  newBanana() {
    const player = this.players[this.turn];
    if (player.id === 0)
      this.banana = new Banana(
        player.x - player.width / 2,
        player.y,
        this.canvas,
        player.id
      );
    else
      this.banana = new Banana(
        player.x + (player.width * 3) / 2,
        player.y,
        this.canvas,
        player.id
      );
  }
}

class Building {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.ctx.fillStyle = "black";
    this.viewHeight = canvas.height;
    this.maxHeight = Math.floor(canvas.height * 0.75);
    this.minHeigth = Math.floor(canvas.height * 0.25);
    this.height = Math.floor(
      Math.random() * (this.maxHeight - this.minHeigth) + this.minHeigth
    );
  }
  draw() {
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  setWidth(x) {
    this.x = x;
    this.width = Math.round(this.canvas.width / Board.numberOfBuildings);
  }
  setHeight() {
    this.height = (this.height * this.canvas.height) / this.viewHeight;
    this.viewHeight = this.canvas.height;
    this.y = this.canvas.height - this.height;
  }
}

class Player {
  constructor(idx, board) {
    this.board = board;
    this.canvas = this.board.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.width = 20;
    this.height = 40;
    this.idx = idx;
    this.angle = 45;
    this.speed = 20;
    this.score = 0;
    if (idx < board.myBuildings.length / 2) this.id = 0;
    else this.id = 1;
    this.alive = true;
  }
  draw() {
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  place() {
    this.x =
      (this.idx * this.canvas.width) / Board.numberOfBuildings +
      this.board.myBuildings[this.idx].width / 2 -
      this.width / 2;
    this.y = this.board.myBuildings[this.idx].y - this.height;
  }
  death() {
    this.alive = false;
  }
}

class Banana {
  constructor(x, y, canvas, playerId) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.ctx.fillStyle = "yellow";
    this.size = 10;
    this.x = x;
    this.y = y - this.size;
    this.speedX = null;
    this.speedY = null;
  }

  draw() {
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  throw(board) {
    const player = board.players[board.turn];
    const angleRadians = (player.angle * Math.PI) / 180;
    this.speedY = player.speed * Math.sin(angleRadians);
    if (board.turn === 0) this.speedX = player.speed * Math.cos(angleRadians);
    if (board.turn === 1) this.speedX = -player.speed * Math.cos(angleRadians);
    board.turn = board.turn ? 0 : 1;
  }

  move(board) {
    this.y -= this.speedY;
    this.x += this.speedX;
    if (this.speedY !== null) this.speedY -= board.gravity;
  }

  checkHit(obstacle) {
    if (
      obstacle.x < this.x + this.size &&
      obstacle.x + obstacle.width > this.x
    ) {
      if (obstacle.y < this.y + this.size) {
        return true;
      }
    }
    return false;
  }
}

const myBoard = new Board(1);

const display = () => {
  for (const player of myBoard.players) {
    if (player.id === 0) {
      player.ctx.fillText(`Player one, score: ${player.score}`, 30, 25);
      player.ctx.fillText(
        `angle: ${player.angle}, speed: ${player.speed}`,
        30,
        40
      );
    } else {
      player.ctx.fillText(
        `Player two, score: ${player.score}`,
        myBoard.canvas.width - 130,
        25
      );
      player.ctx.fillText(
        `angle: ${player.angle}, speed: ${player.speed}`,
        myBoard.canvas.width - 130,
        40
      );
    }
  }
};

const setWindow = () => {
  myBoard.canvas.width = window.visualViewport.width;
  myBoard.canvas.height = window.visualViewport.height;

  myBoard.ctx.fillStyle = "gray";
  myBoard.setBuildings()
};

const start = () => {
  myBoard.start();
  setWindow();
  myBoard.createBuildings();
  myBoard.createPlayers();
};

const updateGame = () => {
  setWindow();
  display();

  myBoard.ctx.fillStyle = "black";
  myBoard.players.forEach((player) => {
    if (player.alive) player.draw();
    player.place();
  });
  if (myBoard.banana) {
    myBoard.ctx.fillStyle = "orange";
    myBoard.banana.draw();
    myBoard.banana.move(myBoard);
    for (const building of myBoard.myBuildings) {
      if (myBoard.banana.checkHit(building)) {
        myBoard.banana = null;
        break;
      }
    }
    for (const player of myBoard.players) {
      if (myBoard.banana.checkHit(player)) {
        player.death();
        myBoard.players[player.id ? 0 : 1].score++;
        myBoard.banana = null;
      }
    }
  }
};

window.addEventListener("load", start);
window.addEventListener("keydown", (event) => {
  if (event.key === "n") {
    myBoard.players.forEach((player) => (player.alive = true));
    myBoard.myBuildings.splice(0, myBoard.myBuildings.length)
    myBoard.createBuildings()
    myBoard.setPlayers()
  }

  if (event.key === "Enter") myBoard.newBanana();
  if (event.key === " ") myBoard.banana.throw(myBoard);
  if (event.key === "ArrowDown") myBoard.players[myBoard.turn].speed--;
  if (event.key === "ArrowUp") myBoard.players[myBoard.turn].speed++;
  if (myBoard.turn === 0) {
    if (event.key === "ArrowLeft") myBoard.players[myBoard.turn].angle++;
    if (event.key === "ArrowRight") myBoard.players[myBoard.turn].angle--;
  } else {
    if (event.key === "ArrowLeft") myBoard.players[myBoard.turn].angle--;
    if (event.key === "ArrowRight") myBoard.players[myBoard.turn].angle++;
  }
});
