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