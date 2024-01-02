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

let playRound = (playerSelection, computerSelection) => {
  playerSelection = playerSelection.toUpperCase();
  console.log(`Your Selection: ${playerSelection}`)
  console.log(`Computer Selection: ${computerSelection}`)
  switch (playerSelection) {
    case "ROCK":
      if (computerSelection === "ROCK") {
        console.log("Tie!");
        return playRound(getPlayerChoice(), getComputerChoice());
      } else if (computerSelection === "PAPER") {
        console.log("You Lose! Paper beats Rock!");
        return false;
      } else {
        console.log("You Win! Rock beats Scissors!");
        return true;
      }
    case "PAPER":
      if (computerSelection === "ROCK") {
        console.log("You Win! Paper beats Rock!");
        return true;
      } else if (computerSelection === "PAPER") {
        console.log("Tie!");
        return playRound(getPlayerChoice(), getComputerChoice());
      } else {
        console.log("You Lose! Scissors beats Paper!");
        return false
      }
    case "SCISSORS":
      if (computerSelection === "ROCK") {
        console.log("You Lose! Rock beats Scissors!");
        return false;
      } else if (computerSelection === "PAPER") {
        console.log("You Win! Scissors beats Paper");
        return true;
      } else {
        console.log("Tie!");
        return playRound(getPlayerChoice(), getComputerChoice());
      }
    default: 
      console.log("Please type either rock, paper, or scissors")
      return playRound(getPlayerChoice(), getComputerChoice());
  }
}

let game = () => {
  let playerScore = 0;
  let computerScore = 0;
  for(let i = 1; i < 6; i++) {
    console.log(`Round ${i}`)
    if (playRound(getPlayerChoice(), getComputerChoice())) {
      playerScore++;
    } else {
      computerScore++;
    }
  }
  let message = playerScore > computerScore ? `You Win `: `You Lose `;
  console.log(message + `${playerScore}-${computerScore}`);
}

game();