const myBoard = new Board(1);

const display = () => {
  for (const player of myBoard.players) {
    myBoard.ctx.fillStyle = 'black'
    myBoard.ctx.font = '13px sans-serif'
    if (player.id === 0) {
      player.ctx.fillText(`Player one, score: ${player.score}`, 18, 25);
      player.ctx.fillText(
        `angle: ${player.angle}, speed: ${player.speed}`,
        18,
        40
      );
    } else {
      player.ctx.fillText(
        `Player two, score: ${player.score}`,
        myBoard.canvas.width - 140,
        25
      );
      player.ctx.fillText(
        `angle: ${player.angle}, speed: ${player.speed}`,
        myBoard.canvas.width - 140,
        40
      );
    }
  }
};

const setWindow = () => {
  myBoard.canvas.width = window.visualViewport.width;
  myBoard.canvas.height = window.visualViewport.height;
  
  display();
  myBoard.setPlayers()
  myBoard.setBuildings()
};

const start = () => {
  myBoard.start();
  myBoard.createBuildings();
  myBoard.createPlayers();
};

const updateGame = () => {
  setWindow();
  
  if (!myBoard.roundOver) {
    if (!myBoard.banana) myBoard.newBanana()
    myBoard.banana.setBanana()
    myBoard.banana.draw();
    myBoard.banana.move();
    for (const building of myBoard.myBuildings) {
      if (myBoard.banana.checkHit(building)) {
        myBoard.banana = null;
        break;
      }
    }
    for (const player of myBoard.players) {
      if (myBoard.banana.checkHit(player)) {
        player.death();
        myBoard.players[player.id ? 0 : 1].score++;
        myBoard.banana = null;
      }
    }
    if (myBoard.banana.checkOutOfBounds()) myBoard.banana = null;
  }
};
