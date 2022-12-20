const url = new URL(document.location.origin);

let deploy = '';
// if (document.location.hostname !== "localhost") deploy = "/Gorila-game-remake";

const song = new Audio(`${deploy}/sounds/Welcome_Song.mp3`)

const soundOff = `
<i class="fas fa-volume-mute"></i>
`
const soundOn = `
<i class="fas fa-volume-up"></i>
`

const soundButton = document.querySelector('#volume-toggle')

let songPlay;
const toggleSound = () => {
  if (!songPlay) {
    songPlay = setInterval(()=> {
      song.play();
    },100)
    soundButton.innerHTML = soundOn
  } else {
    song.pause()
    clearInterval(songPlay)
    songPlay = null;
    soundButton.innerHTML = soundOff
  }
}

const setupSection = document.querySelector("Section.set-up");

const selectHTML = `
  <h2>How Many Players?</h2>
  <div class="player-selection">
    <button id="single-player" onclick="singlePlayerForm()">Single Player</button>
    <button id="two-player" onclick="twoPlayerForm()">Two Players</button>
  </div>
`

const twoPlayerHTML = `
  <form action="/game" method="GET">
    <h2>Set up your game!</h2>
    <div class="first-player">
      <label for="name1">First Player</label>
      <input type="text" id="name1" placeholder="Player One" name="pl1" required>
    </div>
    <div class="second-player">
      <label for="name2">Second Player</label>
      <input type="text" id="name2" placeholder="Player Two" name='pl2' required>
    </div>
    <div class="rounds">
      <label for="rounds">How many rounds do you want to play?</label>
      <input type="number" min="0" max="10" id="rounds" placeholder="3" name="r" required>
    </div>
    <div class='action'>
      <button id='back-button' onclick="revertForm()">
        Back
      </button>
      <button id='play-button' type="submit">
        Start!
      </button>
    </div>
  </form>
        `;

const singlePlayerHTML = `
  <form action="/game" method="GET">
    <h2>Set up your game!</h2>
    <div class="first-player">
      <label for="name1">Your Name</label>
      <input type="text" id="name1" placeholder="Player Name" name="pl1" required>
    </div>
    <div class="rounds">
      <label for="rounds">How many rounds do you want to play?</label>
      <input type="number" min="0" max="10" id="rounds" placeholder="3" name="r" required>
    </div>
    <div class='action'>
      <button id='back-button' onclick="revertForm()">
        Back
      </button>
      <button id='play-button' type="submit">
        Start!
      </button>
    </div>
  </form>
`;

const revertForm = () => {
  setupSection.innerHTML = selectHTML;
}

const singlePlayerForm = () => {
  setupSection.innerHTML = singlePlayerHTML;
}

const twoPlayerForm = () => {
  setupSection.innerHTML = twoPlayerHTML;
}

