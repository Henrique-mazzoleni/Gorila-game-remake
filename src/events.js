window.addEventListener("load", start);

window.addEventListener('mousemove', (event) => {
  myBoard.setMouse(event.clientX, event.clientY)
})

window.addEventListener('click', (event) => {
  if (!myBoard.banana?.speedX && myBoard.players[myBoard.turn].type !== 'cpu') {
    myBoard.players[myBoard.turn].setLastLine(event.clientX, event.clientY)
    myBoard.banana.throw()
  }
})