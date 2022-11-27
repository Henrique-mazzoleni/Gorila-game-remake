window.addEventListener("load", start);
window.addEventListener("keydown", (event) => {
  if (event.key === " ") myBoard.banana.throw(myBoard);
  if (event.key === "ArrowDown") myBoard.players[myBoard.turn].speed--;
  if (event.key === "ArrowUp") myBoard.players[myBoard.turn].speed++;
  if (myBoard.turn === 0) {
    if (event.key === "ArrowLeft") myBoard.players[myBoard.turn].angle++;
    if (event.key === "ArrowRight") myBoard.players[myBoard.turn].angle--;
  } else {
    if (event.key === "ArrowLeft") myBoard.players[myBoard.turn].angle--;
    if (event.key === "ArrowRight") myBoard.players[myBoard.turn].angle++;
  }
});
