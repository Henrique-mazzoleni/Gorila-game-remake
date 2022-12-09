const url = new URL(document.location.href)
const params = new URLSearchParams(url.search)

const gameoverURL = new URL(window.location.href)
if (window.location.hostname === 'localhost') gameoverURL.pathname = '/gameover.html'
else gameoverURL.pathname = '/Gorila-game-remake/gameover.html'

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
    // create new banana and put banana on the player who's turn it is
    if (!myBoard.banana) myBoard.newBanana();
    myBoard.banana.setBanana();
    
    // if banana is moving
    if (myBoard.banana.speedX || myBoard.banana.speedY) {
      // draw banana animation 
      myBoard.banana.draw();
      myBoard.banana.move();

      // goes thrown buildings and checks for colision with banana
      for (const building of myBoard.myBuildings) {
        if (myBoard.banana?.checkHit(building)) {
          myBoard.banana = null;
          break;
        }
      }
      
      // goes through players and checks for hits and then checks if the explosion radius hits player
      for (const player of myBoard.players) {
        if (myBoard.banana?.checkHit(player)) {
          player.death();
          myBoard.players[player.id ? 0 : 1].score++;
          myBoard.banana = null;
        }
  
        for (const hit of myBoard.hitList) {
          const distance = ((hit.x - player.x)**2 + (hit.y - player.y)**2)**0.5
          if (distance < (myBoard.hitSize + player.width)*0.7) {
            player.death();
            myBoard.hitList = myBoard.hitList.filter(buildingHit => buildingHit !== hit)
            myBoard.players[player.id ? 0 : 1].score++;
            myBoard.banana = null;
          }
        }
      }
  
      // checks if banana is out of bounds on x
      if (myBoard.banana?.checkOutOfBounds()) myBoard.banana = null;
    } else { // if banana is not moving
      // draw the refrence lines
      myBoard.players[myBoard.turn].drawRefrenceLine();
      myBoard.players[myBoard.turn].drawLastLine();

      // if player is cpu throw automatically
      if (myBoard.players[myBoard.turn].type === 'cpu') myBoard.players[myBoard.turn].cpuPlay();
      // else capture mouse and calculate angle and speed
      else myBoard.players[myBoard.turn].setAngleAndSpeed();

      // check if on of the players was hit and play end round animation
      myBoard.players.forEach((player) => {if (!player.alive) myBoard.endRoundAnimation()})
    }
  }

  // check for end game and redirect to end game screen
  if (myBoard.checkEndGame()) {
    const winner = myBoard.players.find(player => player.score == params.get('r'))
    const loser = myBoard.players.find(player => player !== winner)
    
    const gameoverParams = new URLSearchParams()
    gameoverParams.append('w', winner?.name)
    gameoverParams.append('l', loser?.name)
    gameoverParams.append('diff', winner?.score / (winner?.score + loser?.score))

    gameoverURL.search = gameoverParams

    setTimeout(() => {
      window.location.href = gameoverURL
    }, 1000)
  }
  
};
