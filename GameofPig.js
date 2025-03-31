let player1Score = 0, player1Round = 0;
let player2Score = 0, player2Round = 0;
let isPlayer1Turn = true;
const WIN_SCORE = 100;

function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

function updateScore() {
  document.getElementById("player1Score").textContent = player1Score;
  document.getElementById("player2Score").textContent = player2Score;

  // Update the progress bar to reflect current score out of 100
  document.getElementById("player1Meter").value = player1Score;
  document.getElementById("player2Meter").value = player2Score;
}

function updateTempScore() {
  if (isPlayer1Turn) {
    document.getElementById("player1Score").textContent = player1Score + player1Round;
    document.getElementById("player2Score").textContent = player2Score;
  } else {
    document.getElementById("player2Score").textContent = player2Score + player2Round;
    document.getElementById("player1Score").textContent = player1Score;
  }

  // Update the progress bar while rolling
  document.getElementById("player1Meter").value = player1Score + player1Round;
  document.getElementById("player2Meter").value = player2Score + player2Round;
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
    } else {
      player2Round += die;
    }
  }

  updateTempScore();
  checkWin();  // Check for winner after every roll
}

function hold() {
  if (checkWin()) return;

  if (isPlayer1Turn) {
    player1Score += player1Round;
    player1Round = 0;
  } else {
    player2Score += player2Round;
    player2Round = 0;
  }

  updateScore();
  if (!checkWin()) {
    switchTurn();
  }
}

function switchTurn() {
  isPlayer1Turn = !isPlayer1Turn;
  let nextPlayer = isPlayer1Turn ? "Player 1" : "Player 2";
  document.getElementById("dieScore").textContent = `${nextPlayer}'s turn. Roll the die!`;
  updateScore();
}

function checkWin() {
  if (player1Score >= WIN_SCORE) {
    document.getElementById("winnerMessage").textContent = "🎉 Player 1 Wins! 🎉";
    disableButtons();
    return true;
  } else if (player2Score >= WIN_SCORE) {
    document.getElementById("winnerMessage").textContent = "🎉 Player 2 Wins! 🎉";
    disableButtons();
    return true;
  }
  return false;
}

function disableButtons() {
  document.getElementById("rollButton").disabled = true;
  document.getElementById("holdButton").disabled = true;
}

// 🔄 Restart Game Function
function restartGame() {
  player1Score = 0;
  player1Round = 0;
  player2Score = 0;
  player2Round = 0;
  isPlayer1Turn = true;

  document.getElementById("winnerMessage").textContent = "";
  document.getElementById("dieScore").textContent = "Player 1's turn. Roll the die!";
  document.getElementById("diceImage").src = "die1.png"; // Default dice image
  document.getElementById("rollButton").disabled = false;
  document.getElementById("holdButton").disabled = false;

  updateScore(); // Reset the scores
}
