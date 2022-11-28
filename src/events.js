window.addEventListener("load", start);

window.addEventListener('mousemove', (event) => {
  myBoard.setMouse(event.clientX, event.clientY)
})

window.addEventListener('click', (event) => {
  myBoard.players[myBoard.turn].setLastLine(event.clientX, event.clientY)
  myBoard.banana.throw()
})