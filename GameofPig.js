let player1Score = 0, player1Round = 0;
let player2Score = 0, player2Round = 0;
let isPlayer1Turn = true;
const WIN_SCORE = 100;

function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

function updateScore() {
  // Cap the displayed scores at 100
  document.getElementById("player1Score").textContent = Math.min(player1Score, WIN_SCORE);
  document.getElementById("player2Score").textContent = Math.min(player2Score, WIN_SCORE);

  // Cap the meter values at 100
  document.getElementById("player1Meter").value = Math.min(player1Score, WIN_SCORE);
  document.getElementById("player2Meter").value = Math.min(player2Score, WIN_SCORE);
}

function updateTempScore() {
  if (isPlayer1Turn) {
    // Cap the displayed score at 100
    let displayScore = Math.min(player1Score + player1Round, WIN_SCORE);
    document.getElementById("player1Score").textContent = displayScore;
    document.getElementById("player2Score").textContent = player2Score;
    // Cap the meter value at 100
    document.getElementById("player1Meter").value = displayScore;
    document.getElementById("player2Meter").value = player2Score;
  } else {
    // Cap the displayed score at 100
    let displayScore = Math.min(player2Score + player2Round, WIN_SCORE);
    document.getElementById("player2Score").textContent = displayScore;
    document.getElementById("player1Score").textContent = player1Score;
    // Cap the meter value at 100
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
      // Check if adding the die would exceed 100
      if (player1Score + player1Round + die > WIN_SCORE) {
        return; // Don't add the roll if it would exceed 100
      }
      player1Round += die;
      // Check if exactly 100 is reached
      if (player1Score + player1Round === WIN_SCORE) {
        player1Score += player1Round;
        updateScore();
        checkWin();
        return;
      }
    } else {
      // Check if adding the die would exceed 100
      if (player2Score + player2Round + die > WIN_SCORE) {
        return; // Don't add the roll if it would exceed 100
      }
      player2Round += die;
      // Check if exactly 100 is reached
      if (player2Score + player2Round === WIN_SCORE) {
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
    if (checkWin()) return;  // Ensure game ends if score reaches 100
  } else {
    player2Score += player2Round;
    player2Round = 0;
    updateScore();
    if (checkWin()) return;  // Ensure game ends if score reaches 100
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
