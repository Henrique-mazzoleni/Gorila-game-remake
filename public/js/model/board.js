class Board {
  static numberOfBuildings = Math.round(window.innerWidth / 113);

  constructor(gravity, numberOfRounds) {
    this.frame = 0;
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.gravity = gravity;
    this.myBuildings = [];
    this.players = [];
    this.turn = 0;
    this.roundOver = false;
    this.rounds = numberOfRounds;
    this.hitList = [];
    this.hitSize = 30;
  }

  setMouse(mouseX, mouseY) {
    this.mouseX = mouseX;
    this.mouseY = mouseY;
  }
 
  start() {
    content.appendChild(this.canvas);
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
      this.loadImg(building, `./imgs/Building0${imgIdx}.svg`)
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

  createPlayers(playerTwoType, playerOneName, playerTwoName) {
    const playerOne = new Player(Math.round(Math.random()) + 1, this, playerOneName)
    this.loadImg(playerOne, './imgs/don-sit.svg', 'sit')
    this.loadImg(playerOne, './imgs/don-throw.svg', 'throw')
    this.loadImg(playerOne, './imgs/don-celebrate.svg', 'celeb0')
    this.loadImg(playerOne, './imgs/don-celebrate-2.svg', 'celeb1')
    this.loadImg(playerOne, './imgs/dead.png', 'dead')
    playerOne.type = 'Human'
    this.players.push(playerOne);
    
    const playerTwo = new Player(Board.numberOfBuildings - Math.round(Math.random()) - 2, this, playerTwoName)
    this.loadImg(playerTwo, './imgs/don-sit-2.svg', 'sit')
    this.loadImg(playerTwo, './imgs/don-throw-2.svg', 'throw')
    this.loadImg(playerTwo, './imgs/don-celebrate.svg', 'celeb0')
    this.loadImg(playerTwo, './imgs/don-celebrate-2.svg', 'celeb1')
    this.loadImg(playerTwo, './imgs/dead.png', 'dead')
    if (playerTwoType === 'cpu') playerTwo.type = 'cpu'
    else playerOne.type = 'Human'
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
    this.loadImg(this.banana, './imgs/banana.svg')
  }

  drawDamage() {
    this.hitList.forEach(hit => {
      this.ctx.save()
      this.ctx.beginPath()
      this.ctx.arc(hit.x, hit.y, this.hitSize, 0, 2*Math.PI)
      this.ctx.clip()
      this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height)
      this.ctx.restore()
    })
  }

  endRoundAnimation() {
    this.ctx.fillStyle = '#f1c232'
    this.ctx.font = '40px bananasplit'
    content.classList.add('overlay')
    this.players.forEach(player => {
      if (player.alive) this.ctx.fillText(`${player.name} wins this round!`, this.canvas.width / 2 - 280, 200)
    })
  }

  newRound() {
    this.banana = null;
    this.players.forEach(player => player.alive = true);
    this.myBuildings.splice(0, this.myBuildings.length);
    this.createBuildings();
    this.players.forEach((player) => {
      if (player.id === 0) player.idx = Math.round(Math.random()) + 1;
      else player.idx = Board.numberOfBuildings - Math.round(Math.random()) - 2;
      player.explosion = null
      player.width = 60;
      player.lastLine = null;
    });
    this.roundOver = false
    this.hitList = []
    content.classList.remove('overlay')
  }

  checkEndGame() {
    for (const player of this.players) if (player.score === this.rounds) return true
    return false
  }
}
