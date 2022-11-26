class Player {
  constructor(idx, board) {
    this.board = board;
    this.canvas = this.board.canvas;
    this.ctx = this.board.ctx;
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
    this.board.roundOver = true;
  }
}
