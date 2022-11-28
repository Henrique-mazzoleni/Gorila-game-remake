class Building {
  constructor(board) {
    this.board = board;
    this.canvas = this.board.canvas;
    this.ctx = this.board.ctx;
    this.viewHeight = this.canvas.height;
    this.maxHeight = Math.floor(this.canvas.height * 0.6);
    this.minHeigth = Math.floor(this.canvas.height * 0.15);
    this.height = Math.floor(
      Math.random() * (this.maxHeight - this.minHeigth) + this.minHeigth
    );
  }

  draw() {
    if (this.image) {
      this.ctx.drawImage(this.image, this.x, this.y, this.width, (this.width/this.image.width) * this.image.height)
    }
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
