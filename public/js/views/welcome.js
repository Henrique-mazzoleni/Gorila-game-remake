// const socket = io();

const song = new Audio(`/sounds/Welcome_Song.mp3`);
const soundOff = `<i class="fas fa-volume-mute"></i>`;
const soundOn = `<i class="fas fa-volume-up"></i>`;
const soundButton = document.querySelector("#volume-toggle");

let songPlay;
const toggleSound = () => {
  if (!songPlay) {
    songPlay = setInterval(() => {
      song.play();
    }, 100);
    soundButton.innerHTML = soundOn;
  } else {
    song.pause();
    clearInterval(songPlay);
    songPlay = null;
    soundButton.innerHTML = soundOff;
  }
};

const setupSection = document.querySelector("Section.set-up");

const selectHTML = `
  <h2>How Many Players?</h2>
  <div class="player-selection">
    <button onclick="singlePlayerForm()">Single Player</button>
    <button onclick="twoPlayerForm()">Two Players</button>
  </div>
`;

const selectOnlineHTML = `
  <h2>Where is your Challenger?</h2>
  <div class="player-selection">
    <button onclick="selectChallenge()">Online</button>
    <button onclick="twoPlayerForm()">Offline</button>
  </div>
`

const selectChallengeHTML = `
  <h2>Set up a new Challenge or acept one that already been made?</h2>
  <div class="player-selection">
    <button onclick="newChallengeForm()">New Challenge</button>
    <button onclick="acceptChallengeForm()">Pick One</button>
  </div>
`

const singlePlayerFormHTML = `
  <form action="/game" method="GET">
    <h2>Set up your game!</h2>
    <div class="first-player">
      <label for="name">Your Name</label>
      <input type="text" id="name" placeholder="Player Name" name="pl1" required>
    </div>
    <div class="rounds">
      <label for="rounds">How many rounds do you want to play?</label>
      <input type="number" min="0" max="10" id="rounds" placeholder="3" name="r" required>
    </div>
    <div class='action'>
      <button onclick="revertForm()">Back</button>
      <button type="submit">Start!</button>
    </div>
  </form>
`;

const twoPlayerFormHTML = `
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
      <button onclick="revertForm()">Back</button>
      <button type="submit">Start!</button>
    </div>
  </form>
`;

const newChallengeFormHTML = `
  <form action="/game" method="GET">
    <h2>Set up your Challenge!</h2>
    <div class="first-player">
      <label for="name">Your Name</label>
      <input type="text" id="name" placeholder="Player Name" name="pl1" required>
    </div>
    <div class="rounds">
      <label for="rounds">How many rounds do you want to play?</label>
      <input type="number" min="0" max="10" id="rounds" placeholder="3" name="r" required>
    </div>
    <div class='action'>
      <button onclick="revertForm()">Back</button>
      <button type="submit">Start!</button>
    </div>
  </form>
`

const revertForm = () => {
  setupSection.innerHTML = selectHTML;
};

const singlePlayerForm = () => {
  setupSection.innerHTML = singlePlayerFormHTML;
};

const twoPlayerForm = () => {
  setupSection.innerHTML = twoPlayerFormHTML;
};

const selectOnline = () => {
  setupSection.innerHTML = selectOnlineHTML;
}

const selectChallenge = () => {
  setupSection.innerHTML = selectChallengeHTML;
}

// const newChallengeForm = () => {
//   setupSection.innerHTML = newChallengeFormHTML;
//   const form = document.querySelector('form')
//   form.addEventListener('submit', (event) => {
//     event.preventDefault()
//     const playerName = form.querySelector('#name').value
//     const noOfRounds = +form.querySelector('#rounds').value
//     socket.emit('challengeMade', playerName, noOfRounds)
//   })
// }


// let acceptChallengeFormHTML;

// let challenges;
// socket.on('availableChallanges', (availableChallenges) => {
//   console.log(availableChallenges);
//   challenges = availableChallenges
// })

// const acceptChallengeForm = async () => {
//   if (challenges.length === 0) {
//     acceptChallengeFormHTML = `
//     <h2>There are no challenges at the moment</h2>
//     <div class='action'>
//       <button onclick="revertForm()">Back</button>
//       <button onclick="newChallengeForm()">New Challenge</button>
//     </div>
//     `
//   } else {
//     acceptChallengeFormHTML = `
//     <section id="gamesSelect">
//     <h2>Pick one of the challenges below</h2>
//     <section id="table">
//     <div class="names">
//       <h3>Challenger Name</h3>
//       <ul>
//     ` 
//     for (const challenge of challenges) acceptChallengeFormHTML += `<li>${challenge[0]}</li>`
//     acceptChallengeFormHTML += `
//       </ul>
//     </div>
//     <div class="rounds">
//       <h3>No of Rounds</h3>
//       <ul id="challengeRounds">
//     `
//     for (const challenge of challenges) acceptChallengeFormHTML += `<li >${challenge[1]}</li>`
//     acceptChallengeFormHTML += `
//       </ul>
//     </div>
//     <div class="action">
//       <h3>take the challenge!</h3>
//       <ul>
//     `
//     for (const challenge of challenges) acceptChallengeFormHTML += `<li><button onclick="acceptChallenge('${challenge[0]}',${challenge[1]})">accept!</button></li>`
//     acceptChallengeFormHTML += `
//       </ul>
//     </div>
//     </section>
//     <div class='action'>
//     <button onclick="revertForm()">Back</button>
//     <button onclick="newChallengeForm()">New Challenge</button>
//   </div>
//     </section>
//     `
//   }
//   setupSection.innerHTML = acceptChallengeFormHTML;
// }

// const acceptChallenge = (...challenger) => {
//   console.log('accepted')
//   console.log(challenger)
// }