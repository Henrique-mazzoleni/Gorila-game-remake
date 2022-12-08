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
        this.x = player.x + player.width/2 - this.size/2
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
      obstacle.x + obstacle.width > this.x &&
      obstacle.y < this.y + this.size
    ) {
      for (const hit of this.board.hitList) {
        const distance = ((hit.x - this.x)**2 + (hit.y - this.y)**2)**0.5
        if (distance < this.board.hitSize) return false
      }
      if (!obstacle.name) this.board.hitList.push({x: this.x, y: this.y})
      return true;
    }
    return false;
  }

  checkOutOfBounds() {
    return this.x + this.size < 0 || this.x > this.canvas.width
  }
}
