const myBoard = new Board(1, 5);

const display = () => {
  for (const player of myBoard.players) {
    myBoard.ctx.fillStyle = 'black'
    myBoard.ctx.font = '13px sans-serif'
    if (player.id === 0) {
      player.ctx.fillText(`${player.name}, score: ${player.score}`, 18, 25);
      player.ctx.fillText(`angle: ${player.angle.toFixed(2)}, speed: ${player.speed.toFixed(2)}`,18,40);
    } else {
      player.ctx.fillText(`${player.name}, score: ${player.score}`,myBoard.canvas.width - 140,25);
      player.ctx.fillText(
        `angle: ${player.angle.toFixed(2)}, speed: ${player.speed.toFixed(2)}`,
        myBoard.canvas.width - 175,
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
  myBoard.frame++;
  
  if (!myBoard.roundOver) {
    if (!myBoard.banana) myBoard.newBanana()
    myBoard.banana.setBanana()
    if (myBoard.banana.speedX || myBoard.banana.speedY) {
      myBoard.banana.draw();
      myBoard.banana.move();
    }
    for (const building of myBoard.myBuildings) {
      if (myBoard.banana?.checkHit(building)) {
        myBoard.banana = null;
        break;
      }
    }
    for (const player of myBoard.players) {
      if (myBoard.banana?.checkHit(player)) {
        player.death();
        myBoard.players[player.id ? 0 : 1].score++;
        myBoard.banana = null;
      }
    }
    if (myBoard.banana?.checkOutOfBounds()) myBoard.banana = null;
  }

  myBoard.players.forEach(player => {
    if (!player.alive) myBoard.endRoundAnimation()
  })
  if (myBoard.checkEndGame()) window.location.href = './gameover.html'

  myBoard.players[myBoard.turn].setAngleAndSpeed()
  myBoard.players[myBoard.turn].drawRefrenceLine()
  myBoard.players[myBoard.turn].drawLastLine()
};
