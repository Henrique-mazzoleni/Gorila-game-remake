const url = new URL(document.location.href)
const params = new URLSearchParams(url.search)

const myBoard = new Board(1, +params.get('r'));
const content = document.querySelector('#content')

const display = () => {
  for (const player of myBoard.players) {
    myBoard.ctx.fillStyle = "black";
    myBoard.ctx.font = "25px bananasplit";
    if (player.id === 0) {
      player.ctx.fillText(`${player.name}, score: ${player.score}`, 30, 50);
      player.ctx.fillText(
        `angle: ${player.angle.toFixed(2)}, speed: ${player.speed.toFixed(2)}`,
        30,
        80
      );
    } else {
      player.ctx.fillText(
        `${player.name}, score: ${player.score}`,
        myBoard.canvas.width - 280,
        50
      );
      player.ctx.fillText(
        `angle: ${player.angle.toFixed(2)}, speed: ${player.speed.toFixed(2)}`,
        myBoard.canvas.width - 300,
        80
      );
    }
  }
};

const setWindow = () => {
  myBoard.canvas.width = window.visualViewport.width;
  myBoard.canvas.height = window.visualViewport.height;

  display();
  myBoard.setPlayers();
  myBoard.setBuildings();
  myBoard.drawDamage();
};

const start = () => {
  myBoard.start();
  myBoard.createBuildings();
  myBoard.createPlayers(params.get('pl1'), params.get('pl2'));
};

const updateGame = () => {
  setWindow();
  myBoard.frame++;

  if (!myBoard.roundOver) {
    if (!myBoard.banana) myBoard.newBanana();
    myBoard.banana.setBanana();
    if (myBoard.banana.speedX || myBoard.banana.speedY) {
      myBoard.banana.draw();
      myBoard.banana.move();
    } else {
      myBoard.players[myBoard.turn].drawRefrenceLine();
      myBoard.players[myBoard.turn].drawLastLine();
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

  myBoard.players.forEach((player) => {
    if (!player.alive) myBoard.endRoundAnimation();
  });
  if (myBoard.checkEndGame()) {
    const gameoverURL = new URL(window.location.href)
    gameoverURL.pathname = '/Gorila-game-remake/gameover.html'
    const gameoverParams = new URLSearchParams()

    const winner = myBoard.players.find(player => player.score == params.get('r'))
    const loser = myBoard.players.find(player => player !== winner)
    
    gameoverParams.append('w', winner?.name)
    gameoverParams.append('l', loser?.name)
    gameoverParams.append('diff', winner?.score / (winner?.score + loser?.score))

    gameoverURL.search = gameoverParams

    setTimeout(() => {
      window.location.href = gameoverURL
    }, 1000)
  }

  myBoard.players[myBoard.turn].setAngleAndSpeed();
};
