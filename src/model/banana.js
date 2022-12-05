class Banana {
  constructor(board) {
    this.board = board
    this.canvas = this.board.canvas;
    this.ctx = this.board.ctx;
    this.size = 16;
    this.speedX = null;
    this.speedY = null;
    this.setBanana()
  }

  draw() {
    this.ctx.save()
    this.ctx.translate(this.x + this.size/2, this.y + this.size/2)
    this.ctx.rotate(Math.PI/5*Math.ceil(this.board.frame/3))
    this.ctx.drawImage(this.image, -this.size/2, -this.size/2, this.size, this.size);
    this.ctx.restore()
  }

  setBanana() {
    if (this.speedX === null) {
        const player = this.board.players[this.board.turn];
        this.y = player.y - this.size
        if (this.board.turn === 0) this.x = player.x - this.size
        else this.x = player.x + player.width
    }
  }

  throw() {
    const player = this.board.players[this.board.turn];
    const angleRadians = (player.angle * Math.PI) / 180;
    this.speedY = player.speed * Math.sin(angleRadians);
    if (this.board.turn === 0) this.speedX = player.speed * Math.cos(angleRadians);
    if (this.board.turn === 1) this.speedX = -player.speed * Math.cos(angleRadians);
    this.board.turn = this.board.turn ? 0 : 1;
  }

  move() {
    this.y -= this.speedY;
    this.x += this.speedX;
    if (this.speedY !== null) this.speedY -= this.board.gravity;
  }

  checkHit(obstacle) {
    if (
      obstacle.x < this.x + this.size &&
      obstacle.x + obstacle.width > this.x
    ) {
      if (obstacle.y < this.y + this.size) {
        if (!obstacle.name) this.board.hitList.push([this.x, this.y])
        return true;
      }
    }
    return false;
  }

  checkOutOfBounds() {
    return this.x + this.size < 0 || this.x > this.canvas.width
  }
}
