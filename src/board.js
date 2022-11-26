class Board {
  static numberOfBuildings = Math.round(window.innerWidth / 80);

  constructor(gravity) {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.gravity = gravity;
    this.myBuildings = [];
    this.players = [];
    this.turn = 0;
    this.roundOver = false;
  }

  start() {
    const body = document.querySelector("body");
    body.prepend(this.canvas);
    this.interval = setInterval(updateGame, 30);
  }

  createBuildings() {
    for (let i = 0; i < Board.numberOfBuildings; i++)
      myBoard.myBuildings.push(new Building(this));
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
    this.ctx.fillStyle = "black";
    this.players.forEach((player) => {
        if (player.alive) player.draw();
        player.place();
      });
  }

  newBanana() {
    this.banana = new Banana(this)
  }

  newRound() {
    this.banana = null;
    this.players.forEach((player) => (player.alive = true));
    this.myBuildings.splice(0, this.myBuildings.length);
    this.createBuildings();
    this.players.forEach((player) => {
      if (player.id === 0) player.idx = Math.round(Math.random()) + 1;
      else Board.numberOfBuildings - Math.round(Math.random()) - 2;
    });
    this.roundOver = false
  }
}
