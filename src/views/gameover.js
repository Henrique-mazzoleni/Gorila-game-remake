const currUrl = new URL(document.location.href)
let currParams = new URLSearchParams(currUrl.search)

const resultMessage = document.querySelector('#result')

const audioObj = {
    twoPlayer: new Audio('/sounds/End_twoPlayer.wav'),
    win: new Audio('/sounds/Win.ogg'),
    lose: new Audio('/sounds/lose.wav'),
}

let conclusion;
if (currParams.get('pltp') == 'two-players'){
    audioObj.twoPlayer.play()
    
    if (currParams.get('diff') > 0.5) conclusion = 'That was a close battle!'
    if (currParams.get('diff') > 0.65) conclusion = 'Dominate performance!'
    if (currParams.get('diff') > 0.8) conclusion = 'What a blow out!'
    
    resultMessage.innerHTML = `
        <p class="winner">${currParams.get('w')} won!</p>
        <p>${conclusion}</p>
        <p>Come on ${currParams.get('l')} you can win the next one</p>
    `
} else {
    if (currParams.get('w') === 'Computer') {
        audioObj.lose.play()
        resultMessage.innerHTML = `
            <p class="winner">You Lost...</p>
            <p>Come on ${currParams.get('l')} you can win the next one</p>
        `
    } else {
        audioObj.win.play()
        resultMessage.innerHTML = `
            <p class="winner">You Won!</p>
            <p>That was an amazing display of skill ${currParams.get('w')}!</p>
        `
    }
}

document.querySelector('#restart').addEventListener('click', () => {
    const url = new URL(document.location.href)

    if (document.location.hostname === 'localhost') url.pathname = '/'
    else url.pathname = '/Gorila-game-remake/'
    
    document.location.href = url
})