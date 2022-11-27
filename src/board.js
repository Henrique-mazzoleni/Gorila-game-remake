class Board {
  static numberOfBuildings = Math.round(window.innerWidth / 80);

  constructor(gravity, numberOfRounds) {
    this.frame = 0;
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.gravity = gravity;
    this.myBuildings = [];
    this.players = [];
    this.turn = 0;
    this.roundOver = false;
    this.rounds = numberOfRounds
  }
 
  start() {
    const body = document.querySelector("body");
    body.prepend(this.canvas);
    this.interval = setInterval(updateGame, 30);
  }

  loadImg(classObject, url, id) {
    const image = new Image()
    image.src = url;
    image.id = id
    image.onload = () => {
      if (classObject.image) {
        if (classObject.image.length) classObject.image.push(image)
        else classObject.image = [classObject.image, image]
      } else {
        classObject.image = image
      }
    }
  }

  createBuildings() {
    for (let i = 0; i < Board.numberOfBuildings; i++) {
      const building = new Building(this)
      const imgIdx = Math.ceil(Math.random()*6)
      this.loadImg(building, `../imgs/Building0${imgIdx}.svg`)
      myBoard.myBuildings.push(building);
    }
  }

  setBuildings() {
    this.myBuildings.forEach((building, i) => {
      building.setWidth((i * this.canvas.width) / Board.numberOfBuildings);
      building.setHeight();
      building.draw();
    });
  }

  createPlayers() {
    const playerOne = new Player(Math.round(Math.random()) + 1, this, 'Player One')
    this.loadImg(playerOne, '../imgs/don-sit.svg', 'sit')
    this.loadImg(playerOne, '../imgs/don-throw.svg', 'throw')
    this.loadImg(playerOne, '../imgs/don-celebrate.svg', 'celeb0')
    this.loadImg(playerOne, '../imgs/don-celebrate-2.svg', 'celeb1')
    this.loadImg(playerOne, '../imgs/dead.png', 'dead')
    this.players.push(playerOne);
    
    const playerTwo = new Player(Board.numberOfBuildings - Math.round(Math.random()) - 2, this, 'Player Two')
    this.loadImg(playerTwo, '../imgs/don-sit-2.svg', 'sit')
    this.loadImg(playerTwo, '../imgs/don-throw-2.svg', 'throw')
    this.loadImg(playerTwo, '../imgs/don-celebrate.svg', 'celeb0')
    this.loadImg(playerTwo, '../imgs/don-celebrate-2.svg', 'celeb1')
    this.loadImg(playerTwo, '../imgs/dead.png', 'dead')
    this.players.push(playerTwo);
  }

  setPlayers() {
    this.players.forEach((player) => {
        player.draw();
        player.place();
      });
  }

  newBanana() {
    this.banana = new Banana(this)
    this.loadImg(this.banana, '../imgs/banana.svg')
  }

  endRoundAnimation() {
    this.ctx.fillStyle = 'black'
    this.ctx.font = '25px sans-serif'
    this.ctx.shadowColor = 'white'
    this.ctx.shadowBlur = 7
    this.players.forEach(player => {
      if (player.alive) this.ctx.fillText(`${player.name} wins this round!`, 200, 100)
    })
  }

  newRound() {
    this.banana = null;
    this.players.forEach(player => player.alive = true);
    this.myBuildings.splice(0, this.myBuildings.length);
    this.createBuildings();
    this.players.forEach((player) => {
      player.angle = 45;
      player.speed = 20;
      if (player.id === 0) player.idx = Math.round(Math.random()) + 1;
      else Board.numberOfBuildings - Math.round(Math.random()) - 2;
    });
    this.roundOver = false
  }

  checkEndGame() {
    for (const player of this.players) if (player.score === this.rounds) return true
    return false
  }
}
