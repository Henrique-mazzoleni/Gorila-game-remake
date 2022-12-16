class Player {
  constructor(idx, board, name) {
    this.name = name;
    this.board = board;
    this.canvas = this.board.canvas;
    this.ctx = this.board.ctx;
    this.width = 60;
    this.idx = idx;
    this.score = 0;
    this.angle = 0;
    this.speed = 0;
    if (idx < board.myBuildings.length / 2) this.id = 0;
    else this.id = 1;
    this.alive = true;
    this.celebrate = 0;
    this.currImage = null;
    this.explosion = null;
    this.guesses = []
  }

  draw() {
    if (this.board.players[this.id ? 0 : 1].alive) {
      if (!this.alive) {
        if (this.board.frame % 10 === 0)
        this.currImage = this.image?.find(image => image.id === 'dead')
      } else if (this.board.turn !== this.id) {
        if (!this.board.banana?.speedX) {
          this.currImage = this.image?.find(image => image.id === 'sit')
        } else {
          this.currImage = this.image?.find(image => image.id === 'throw')
        }
      } else if (this.alive) {
        this.currImage = this.image?.find(image => image.id === 'sit')
      }
    } else if (this.alive) {
      if (this.board.frame % 10 === 0) {
        this.celebrate = this.celebrate ? 0 : 1 
      }
      this.currImage = this.image?.find(image => image.id === `celeb${this.celebrate}`)
    } 
    
    if (this.explosion && this.explosion < 120) {
      this.explosion += 7
      this.width = this.explosion
    }
    if (this.currImage) this.ctx.drawImage(this.currImage, this.x, this.y, this.width, this.width)
  }

  setLastLine(x, y) {
    this.lastLine = [x, y]
  }

  drawLastLine() {
    if (this.lastLine) {
      this.ctx.beginPath()
      this.ctx.lineWidth = 3;
      this.ctx.strokeStyle = 'green';
      this.ctx.moveTo(Math.floor(this.x + this.width/2), Math.floor(this.y));
      this.ctx.lineTo(Math.floor(this.lastLine[0]), Math.floor(this.lastLine[1]));
      this.ctx.stroke();
    }
  }

  drawRefrenceLine() {
    this.ctx.beginPath()
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = 'red';
    this.ctx.moveTo(Math.floor(this.x + this.width/2), Math.floor(this.y));
    if (this.type === 'cpu') {
      const endX = this.x + this.width/2 - this.speed * 8 * Math.cos(this.angle*Math.PI/180)
      const endY = this.y - this.speed * 8 * Math.sin(this.angle*Math.PI/180)
      this.ctx.lineTo(Math.floor(endX), Math.floor(endY));
    }
    else this.ctx.lineTo(Math.floor(this.board.mouseX), Math.floor(this.board.mouseY));
    this.ctx.stroke();
  }

  setAngleAndSpeed() {
    if (this.id === 0) {
      this.lineX = this.board.mouseX - this.x - this.width / 2
    } else {
      this.lineX = this.x + this.width/2 - this.board.mouseX
    }
    this.lineY = this.y - this.board.mouseY

    this.speed = (this.lineX**2 + this.lineY**2)**(0.5);
    this.angle = Math.acos(this.lineX / this.speed) * 180 / Math.PI;
    if (this.lineY < 0) this.angle *= -1;
    this.speed /= 8
  }

  place() {
    this.x = (this.idx * this.canvas.width) / Board.numberOfBuildings +
      this.board.myBuildings[this.idx].width / 2 -
      this.width / 2;
    this.y = this.board.myBuildings[this.idx].y - this.width;
  }

  death() {
    setTimeout(() => this.board.newRound(), 5000)
    this.explosion = 1;
    this.alive = false;
    this.board.roundOver = true;
  }

  cpuPlay() {
    this.calculatingHits()
    if (!this.interval) {
      this.interval = setInterval(()=> {
        ({ angle: this.angle, speed: this.speed } = this.guesses[Math.floor(Math.random()*this.guesses.length)])
      }, 600)
      setTimeout(() => {
        this.board.banana.throw()
        clearInterval(this.interval)
        this.interval = null;
        this.guesses = [];
      }, 2000)
    }
  }

  calculatingHits() {
    let y0, v, building, d;
    const g = this.board.gravity
    if (!this.guesses.length) {
      for (let i=0; i<= this.board.myBuildings.length/3; i++) {
        building = this.board.myBuildings[i]
        y0 = building.y + this.width - this.y
        d = this.x + this.width/2 - building.x - building.width/2
        for (let teta=50; teta<=75; teta+=10) {
          const numerator = d * g
          const tetaRad = teta * Math.PI /180
          const cosTeta = Math.cos(tetaRad)
          const tanTeta = Math.tan(tetaRad)
          const raiz = 2*(g*y0 + d*g*tanTeta)
          v = numerator / (cosTeta*(raiz)**0.5)
          if (v) this.guesses.push({angle : teta, speed: v})
        }
      }
    }
  }
}
