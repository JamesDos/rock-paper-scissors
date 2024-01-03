const rockButton = document.querySelector('#rock-button');
const paperButton = document.querySelector('#paper-button');
const scissorsButton = document.querySelector('#scissors-button');
const resetButton = document.querySelector('#end-button');
const userScoreLabel = document.querySelector('#user-score');
const computerScoreLabel = document.querySelector('#computer-score');
const results = document.querySelector('.results');
const message = document.querySelector('#starting-message');

let playerScore = 0;
let computerScore = 0;
let round = 0;

let hasEnded = () => {
  return playerScore === 5 || computerScore === 5;
}

let incrScore = (result) => {
  if (result === 1 && !hasEnded()) {
    playerScore++;
  } if (result === 0 && !hasEnded()) {
    computerScore++;
  }
}

let incrRound = () => {
  if (!hasEnded()) {
    round++;
  }
}

let resetGame = () => {
  playerScore = 0;
  computerScore = 0;
  round = 0;
  let children = Array.from(results.children);
  children.forEach( (child) => {
    if (child.id !== "starting-message") {
      results.removeChild(child);
    }
  });
  results.innerHTML = '';
  let newMessage = document.createElement('p');
  newMessage.textContent = "Play Rock-Paper-Scissors";
  results.appendChild(newMessage);
  displayScores(playerScore, computerScore);
}

resetButton.addEventListener('click', () => resetGame());

let getComputerChoice = () => {
  let num = Math.floor(Math.random() * 3);
  if (num === 0) {
    return "ROCK";
  } else if (num === 1) {
    return "PAPER";
  } else {
    return "SCISSORS";
  }
}

let getPlayerChoice = () => prompt("Choose Rock, Paper, or Scissors!");

let formatResult = (result, text) => {
  return {
    winner: result,
    message: text
  };
}

let playRound = (playerSelection, computerSelection) => {
  console.log(`Your Selection: ${playerSelection}`)
  console.log(`Computer Selection: ${computerSelection}`)
  incrRound();
  let res = {};
  switch (playerSelection) {
    case "ROCK":
      if (computerSelection === "ROCK") {
        res = formatResult(-1, "Tie!");
      } else if (computerSelection === "PAPER") {
        res = formatResult(0, "You Lose! Paper beats Rock!");
      } else {
        res = formatResult(1, "You Win! Rock beats Scissors!" );
      }
      break;
    case "PAPER":
      if (computerSelection === "ROCK") {
        res = formatResult(1, "You Win! Paper beats Rock!");
      } else if (computerSelection === "PAPER") {
        res = formatResult(-1, "Tie!");
      } else {
        res = formatResult(0,"You Lose! Scissors beats Paper!");
      }
      break;
    case "SCISSORS":
      if (computerSelection === "ROCK") {
        res = formatResult(0, "You Lose! Rock beats Scissors!");
      } else if (computerSelection === "PAPER") {
        res = formatResult(1, "You Win! Scissors beats Paper");
      } else {
        res = formatResult(-1, "Tie!");
      }
      break;
    default: 
      console.log("Please type either rock, paper, or scissors")
      break;
  }
  if (!hasEnded()) {
    incrScore(res.winner);
  }
  return res;
}

let displayScores = (pScore, cScore) => {
    userScoreLabel.textContent = pScore;
    computerScoreLabel.textContent = cScore;
}

let displayRoundInfo = (round, playerScore, computerScore, roundResult) => {
  results.innerHTML = '';
  let roundLabel = document.createElement('h3');
  roundLabel.textContent = `Round ${round}`;
  roundLabel.setAttribute('style', "text-align: center");
  results.appendChild(roundLabel);
  let roundResultLabel = document.createElement('p');
  if (playerScore >= 5 || computerScore >= 5) {
    let finalMessage = playerScore > computerScore ? "You Win The Game!" : "You Lose The Game!";
    roundResultLabel.textContent = finalMessage;
    roundResultLabel.setAttribute('style', "color: red");
  } else {
    roundResultLabel.textContent = roundResult;
    roundResultLabel.setAttribute('style', 'text-align: center');
  }
  results.appendChild(roundResultLabel);
  displayScores(playerScore, computerScore);
}

// let game = () => {
//   let playerScore = 0;
//   let computerScore = 0;

//   for(let i = 1; i < 6; i++) {
//     let roundResult = playRound(getPlayerChoice(), getComputerChoice());
//     if (roundResult.winner) {
//       playerScore++;
//     } else {
//       computerScore++;
//     }
//     displayRoundInfo(i, playerScore, computerScore, roundResult.message);
//   }
// } 

rockButton.addEventListener('click', () => {
  let computerChoice = getComputerChoice();
  let roundResult = playRound("ROCK", computerChoice);
  displayRoundInfo(round, playerScore, computerScore, roundResult.message);
});
paperButton.addEventListener('click', () => {
  let computerChoice = getComputerChoice();
  let roundResult = playRound("PAPER", computerChoice);
  displayRoundInfo(round, playerScore, computerScore, roundResult.message);
});
scissorsButton.addEventListener('click', () => {
  let computerChoice = getComputerChoice();
  let roundResult = playRound("SCISSORS", computerChoice);
  displayRoundInfo(round, playerScore, computerScore, roundResult.message);
});
