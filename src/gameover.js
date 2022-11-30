const currUrl = new URL(document.location.href)
let currParams = new URLSearchParams(currUrl.search)

const resultMessage = document.querySelector('#result')

let conclusion;
if (currParams.get('diff') > 0.5) conclusion = 'That was a close battle!'
if (currParams.get('diff') > 0.65) conclusion = 'Dominate performance!'
if (currParams.get('diff') > 0.8) conclusion = 'What a blow out!'

resultMessage.innerHTML = `
    <p class="winner">${currParams.get('w')} won!</p>
    <p>${conclusion}</p>
    <p>Come on ${currParams.get('l')} you can win the next one</p>
`

const form = document.createElement('form')
form.innerHTML = `
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
    <button>
    Start!
    </button>
`

const formContainer = document.querySelector('#play')

document.querySelector('#add-form').addEventListener('click', (event) => {
    formContainer.innerHTML = ''
    formContainer.appendChild(form)

    const url = new URL(document.location.href)
    url.pathname = 'game.html'
    const params = new URLSearchParams(url.search)


    const playerOneName = document.querySelector('.first-player input')
    const playerTwoName = document.querySelector('.second-player input')
    const rounds = document.querySelector('.rounds input')
    const submitButton = document.querySelector('form button')

    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        
        if (!playerOneName.value) playerOneName.value = 'Player One'
        if (!playerTwoName.value) playerTwoName.value = 'Player Two'
        if (!rounds.value) rounds.value = '3'
        params.append('pl1', playerOneName.value)
        params.append('pl2', playerTwoName.value)
        params.append('r', rounds.value)
        url.search = params

        document.location.href = url
    })
})