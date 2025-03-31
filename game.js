let player1Score = 0, player1Round = 0;
let player2Score = 0, player2Round = 0;
let isPlayer1Turn = true;
const WIN_SCORE = 100;

function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

function updateScore() {
  document.getElementById("player1Score").textContent = Math.min(player1Score, WIN_SCORE);
  document.getElementById("player2Score").textContent = Math.min(player2Score, WIN_SCORE);
  document.getElementById("player1Meter").value = Math.min(player1Score, WIN_SCORE);
  document.getElementById("player2Meter").value = Math.min(player2Score, WIN_SCORE);
}

function updateTempScore() {
  if (isPlayer1Turn) {
    let displayScore = Math.min(player1Score + player1Round, WIN_SCORE);
    document.getElementById("player1Score").textContent = displayScore;
    document.getElementById("player2Score").textContent = player2Score;
    document.getElementById("player1Meter").value = displayScore;
    document.getElementById("player2Meter").value = player2Score;
  } else {
    let displayScore = Math.min(player2Score + player2Round, WIN_SCORE);
    document.getElementById("player2Score").textContent = displayScore;
    document.getElementById("player1Score").textContent = player1Score;
    document.getElementById("player2Meter").value = displayScore;
    document.getElementById("player1Meter").value = player1Score;
  }
}

function rollDice() {
  if (checkWin()) return;

  let die = rollDie();
  let currentPlayer = isPlayer1Turn ? "Player 1" : "Player 2";
  document.getElementById("dieScore").textContent = `${currentPlayer} rolled ${die}`;
  document.getElementById("diceImage").src = `die${die}.png`;

  if (die === 1) {
    if (isPlayer1Turn) {
      player1Round = 0;
    } else {
      player2Round = 0;
    }
    switchTurn();
  } else {
    if (isPlayer1Turn) {
      player1Round += die;
      if (player1Score + player1Round >= WIN_SCORE) {
        player1Score += player1Round;
        updateScore();
        checkWin();
        return;
      }
    } else {
      player2Round += die;
      if (player2Score + player2Round >= WIN_SCORE) {
        player2Score += player2Round;
        updateScore();
        checkWin();
        return;
      }
    }
  }

  updateTempScore();
  checkWin();
}

function hold() {
  if (checkWin()) return;

  if (isPlayer1Turn) {
    player1Score += player1Round;
    player1Round = 0;
    updateScore();
    if (checkWin()) return;
  } else {
    player2Score += player2Round;
    player2Round = 0;
    updateScore();
    if (checkWin()) return;
  }

  switchTurn();
}

function switchTurn() {
  isPlayer1Turn = !isPlayer1Turn;
  let nextPlayer = isPlayer1Turn ? "Player 1" : "Player 2";
  document.getElementById("dieScore").textContent = `${nextPlayer}'s turn. Roll the die!`;
  updateScore();
}

function checkWin() {
  if (player1Score >= WIN_SCORE) {
    document.getElementById("winnerText").textContent = "Player 1 Wins!";
    document.getElementById("winnerMessage").style.display = 'block';
    disableButtons();
    return true;
  } else if (player2Score >= WIN_SCORE) {
    document.getElementById("winnerText").textContent = "Player 2 Wins!";
    document.getElementById("winnerMessage").style.display = 'block';
    disableButtons();
    return true;
  }
  return false;
}

function disableButtons() {
  document.getElementById("rollButton").disabled = true;
  document.getElementById("holdButton").disabled = true;
}

function restartGame() {
  player1Score = 0;
  player1Round = 0;
  player2Score = 0;
  player2Round = 0;
  isPlayer1Turn = true;

  document.getElementById("winnerMessage").style.display = 'none';
  document.getElementById("dieScore").textContent = "Player 1's turn. Roll the die!";
  document.getElementById("diceImage").src = "die1.png";
  document.getElementById("rollButton").disabled = false;
  document.getElementById("holdButton").disabled = false;

  updateScore();
}

function goHome() {
  window.location.href = "index.html";
}

function goTutorial() {
  window.location.href= "instructions.html"
}

function goGame() {
  window.location.href="game.html"
}