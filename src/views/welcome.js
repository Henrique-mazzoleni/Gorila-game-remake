
const url = new URL(document.location.origin);

let deploy = '';

if (!document.location.hostname === "localhost") deploy = "/Gorila-game-remake";

url.pathname = `${deploy}/game.html`;
const params = new URLSearchParams(url.search);

const song = new Audio(`${deploy}/sounds/Welcome_Song.mp3`)
const songPlay = setInterval(()=> {
  song.play();
},9000)

const setupSection = document.querySelector("Section.set-up");
const singlePlayerButton = document.querySelector("#single-player");
const twoPlayerButton = document.querySelector("#two-player");

const twoPlayerHTML = `
  <form>
    <h2>Set up your game!</h2>
    <div class="first-player">
      <label for="name1">First Player</label>
      <input type="text" id="name1" placeholder="Player One">
    </div>
    <div class="second-player">
      <label for="name2">Second Player</label>
      <input type="text" id="name2" placeholder="Player Two">
    </div>
    <div class="rounds">
      <label for="rounds">How many rounds do you want to play?</label>
      <input type="number" min="0" max="10" id="rounds" placeholder="3">
    </div>
    <div class='action'>
      <button id='back-button'>
        Back
      </button>
      <button id='play-button'>
        Start!
      </button>
    </div>
  </form>
        `;

const singlePlayerHTML = `
  <form>
    <h2>Set up your game!</h2>
    <div class="first-player">
      <label for="name1">Your Name</label>
      <input type="text" id="name1" placeholder="Player Name">
    </div>
    <div class="rounds">
      <label for="rounds">How many rounds do you want to play?</label>
      <input type="number" min="0" max="10" id="rounds" placeholder="3">
    </div>
    <div class='action'>
      <button id='back-button'>
        Back
      </button>
      <button id='play-button'>
        Start!
      </button>
    </div>
  </form>
`;

singlePlayerButton.addEventListener("click", () => {
  setupSection.innerHTML = singlePlayerHTML;

  const playerName = document.querySelector(".first-player input");
  const rounds = document.querySelector(".rounds input");
  const submitButton = document.querySelector("#play-button");

  submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (!playerName.value) playerName.value = 'Player'
    if (!rounds.value) rounds.value = "3";

    params.append('pltp', 'single-player')
    params.append("pl1", playerName.value);
    params.append("r", rounds.value);
    url.search = params;
    
    clearInterval(songPlay)
    document.location.href = url;
  })
});

twoPlayerButton.addEventListener("click", () => {
  setupSection.innerHTML = twoPlayerHTML;

  const playerOneName = document.querySelector(".first-player input");
  const playerTwoName = document.querySelector(".second-player input");
  const rounds = document.querySelector(".rounds input");
  const submitButton = document.querySelector("#play-button");
  
  submitButton.addEventListener("click", (event) => {
    event.preventDefault();
  
    if (!playerOneName.value) playerOneName.value = "Player One";
    if (!playerTwoName.value) playerTwoName.value = "Player Two";
    if (!rounds.value) rounds.value = "3";
    params.append('pltp', 'two-players')
    params.append("pl1", playerOneName.value);
    params.append("pl2", playerTwoName.value);
    params.append("r", rounds.value);
    url.search = params;
    
    clearInterval(songPlay)
    document.location.href = url;
  });
});

