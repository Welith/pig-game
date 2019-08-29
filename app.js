/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, dice, diceImg;

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    diceImg = document.querySelector('.dice');


    // Set initial dice to hidden
    diceImg.style.display = 'none';
}

init();

function changePlayer() {
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    document.querySelector('#current-' + activePlayer).innerHTML = '0';
    activePlayer = !activePlayer;
    activePlayer = activePlayer ? 1 : 0;
    roundScore = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    diceImg.style.display = 'none';
}

function restartGame() {
    location.reload();
}

// Roll dice event listener
document.querySelector('.btn-roll').addEventListener('click', function () {
    dice = Math.floor(Math.random() * 6) + 1;
    var scoreBox = document.querySelector('#score-' + activePlayer);
    diceImg.style.display = 'block';
    document.querySelector('#current-' + activePlayer).innerHTML = dice;
    diceImg.setAttribute('src', 'dice-' + dice + '.png')
    if (dice !== 1) {
        roundScore += dice;
        scores[activePlayer] += roundScore;
        scoreBox.innerHTML = scores[activePlayer];
        if (scores[activePlayer] >= 100) {
            scoreBox.innerHTML = "WINNER";
            document.querySelector('#score-' + !activePlayer).innerHTML = 'LOSER';
            diceImg.style.display = 'none';
            document.querySelector('.name-roll').style.display = 'none';
            document.querySelector('.btn-hold').style.display = 'none';
            document.querySelector('#current-' + activePlayer).innerHTML = 'WINNER';
            document.querySelector('#current-' + !activePlayer).innerHTML = 'LOSER'
        }
        roundScore = 0;
    } else {
        scores[activePlayer] = 0;
        scoreBox.innerHTML = scores[activePlayer];
        changePlayer();
    }
});

// Hold functionality
document.querySelector('.btn-hold').addEventListener('click', function () {
    changePlayer();
});

// New game functionality
document.querySelector('.btn-new').addEventListener('click', function () {
    restartGame();
});


