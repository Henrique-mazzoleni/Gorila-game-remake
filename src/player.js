class Player {
  constructor(idx, board, name) {
    this.name = name;
    this.board = board;
    this.canvas = this.board.canvas;
    this.ctx = this.board.ctx;
    this.width = 40;
    this.idx = idx;
    this.angle = 45;
    this.speed = 20;
    this.score = 0;
    if (idx < board.myBuildings.length / 2) this.id = 0;
    else this.id = 1;
    this.alive = true;
    this.celebrate = 0;
    this.currImage = null;
    this.explosion = null;
  }

  draw() {
    if (this.board.players[this.id ? 0 : 1].alive) {
      if (this.board.turn !== this.id) {
        if (!this.board.banana?.speedX) {
          this.currImage = this.image?.find(image => image.id === 'sit')
        } else {
          this.currImage = this.image?.find(image => image.id === 'throw')
        }
      } else if (this.alive) {
        this.currImage = this.image?.find(image => image.id === 'sit')
      } else {
        if (this.board.frame % 10 === 0)
        this.currImage = this.image?.find(image => image.id === 'dead')
      }
    } else if (this.alive) {
      if (this.board.frame % 10 === 0) {
        this.celebrate = this.celebrate ? 0 : 1 
      }
      this.currImage = this.image?.find(image => image.id === `celeb${this.celebrate}`)
    } 
    
    if (this.explosion && this.explosion < 80) {
      this.explosion += 7
      this.width = this.explosion
    }
    if (this.currImage) this.ctx.drawImage(this.currImage, this.x, this.y, this.width, this.width)
  }
  
  place() {
    this.x = (this.idx * this.canvas.width) / Board.numberOfBuildings +
      this.board.myBuildings[this.idx].width / 2 -
      this.width / 2;
    this.y = this.board.myBuildings[this.idx].y - this.width;
  }

  death() {
    setTimeout(() => this.board.newRound(), 3000)
    this.explosion = 1;
    this.alive = false;
    this.board.roundOver = true;
  }
}
