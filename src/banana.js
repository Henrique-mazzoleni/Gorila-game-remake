class Banana {
  constructor(board) {
    this.board = board
    this.canvas = this.board.canvas;
    this.ctx = this.board.ctx;
    this.size = 10;
    this.speedX = null;
    this.speedY = null;
    this.setBanana()
  }

  draw() {
    this.ctx.fillStyle = 'orange'
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  setBanana() {
    if (this.speedX === null) {
        const player = this.board.players[this.board.turn];
        this.y = player.y - this.size
        if (this.board.turn === 0) this.x = player.x - player.width / 2
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
        return true;
      }
    }
    return false;
  }
  checkOutOfBounds() {
    return this.x + this.size < 0 || this.x > this.canvas.width
  }
}
