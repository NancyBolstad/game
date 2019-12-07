import { createBoard, displayPlayers } from './scripts/board';
import { traps } from './scripts/util/traps';
import { board, diceContainer, player1Btn, player2Btn } from './scripts/util/containers';
import { updateButton, showDiceResult } from './scripts/game';
import { gameStorage } from './index';

function rollDice(): number {
  return Math.floor(Math.random() * 6) + 1;
}

function removePlayer(player: number): void {
  document.getElementById(`figure-${player}`).remove();
}

function runGame(): void {
  const player1: number = gameStorage.getUnserialize('player1Name');
  const player2: number = gameStorage.getUnserialize('player2Name');
  if (board != null && diceContainer && player1 && player2) {
    createBoard(board);
    showDiceResult(diceContainer, rollDice());
    playGame(player1, player2);
  } else {
    alert('Missing components to start the game.');
  }
}

function playGame(player1: number, player2: number): void {
  const startPlace: HTMLElement = document.getElementById('tile-index-1');
  let player1Status: number = 1;
  let player2Status: number = 1;
  let isPlayer1Turn: boolean = true;

  displayPlayers(startPlace, player1);
  displayPlayers(startPlace, player2);
  updateButton(isPlayer1Turn);

  player1Btn.addEventListener('click', runPlayer1Turn, false);
  player2Btn.addEventListener('click', runPlayer2Turn, false);

  function runPlayer1Turn(): void {
    const currentDicePoint = rollDice();
    showDiceResult(diceContainer, currentDicePoint);
    player1Status += currentDicePoint;

    if (player1Status >= 30) {
      const finalPosition = document.getElementById('tile-index-30');
      displayPlayers(finalPosition, player1);
      player1Btn.disabled = true;
      player2Btn.disabled = true;
      console.log('Player 1 winner');
      alert('Winner! Player 1 got the throne!');
      return null;
    }
    console.log(`Player 1 rolled: ${currentDicePoint}`);

    const updatePosition = document.getElementById(`tile-index-${player1Status}`);
    removePlayer(player1);
    displayPlayers(updatePosition, player1);

    if (player1Status != updatePlayer1Status()) {
      removePlayer(player1);
      const index = updatePlayer1Status();
      const trapPosition = document.getElementById(`tile-index-${index}`);
      displayPlayers(trapPosition, player1);
    }

    if (currentDicePoint === 6) {
      console.log('Since you rolled 6, you got a Bonus movement. Roll the dice again');
    } else {
      console.log(`player1Status:${player1Status}`);
      console.log(`player2Status:${player2Status}`);
      isPlayer1Turn = false;
      updateButton(isPlayer1Turn);
    }
  }

  function updatePlayer1Status(): number {
    switch (player1Status) {
      case traps[0]:
        return player1Status - 1;
        console.log(`Trap 1: move back 1 steps >>>Current player 1: ${player1Status}`);
        break;
      case traps[1]:
        return player1Status - 2;
        console.log(`Trap 2: move back 2 steps >>>Current player 1: ${player1Status}`);
        break;
      case traps[2]:
        return player1Status - 3;
        console.log(`Trap 3: move back 3 steps >>>Current player 1: ${player1Status}`);
        break;
      case traps[3]:
        return player1Status - 4;
        console.log(`Trap 4: move back 4 steps >>>Current player 1: ${player1Status}`);
        break;
      case traps[4]:
        return player1Status - 5;
        console.log(`Trap 5: move back 5 steps >>>Current player 1: ${player1Status}`);
        break;
      default:
        return 0;
        console.log(`Normal: >>>Current player 1: ${player1Status}`);
        break;
    }
  }

  function runPlayer2Turn(): void {
    const currentDicePoint = rollDice();
    showDiceResult(diceContainer, currentDicePoint);
    console.log(`Player 2 rolled: ${currentDicePoint}`);
    removePlayer(player2);
    player1Status += currentDicePoint;

    if (player2Status >= 30) {
      const finalPosition = document.getElementById('tile-index-30');
      displayPlayers(finalPosition, player2);
      player1Btn.disabled = true;
      player2Btn.disabled = true;
      console.log('Player 2 winner');
      alert('Winner!!!');
      return null;
      return null;
    }

    const updatePosition = document.getElementById(`tile-index-${player1Status}`);
    displayPlayers(updatePosition, player2);

    if (currentDicePoint === 6) {
      updatePlayer2Status();
      console.log('Since you rolled 6, you got a Bonus movement');
      return null;
    } else {
      updatePlayer2Status();
    }
    console.log(`player1Status:${player1Status}`);
    console.log(`player2Status:${player2Status}`);
    isPlayer1Turn = true;
    updateButton(isPlayer1Turn);
  }
  function updatePlayer2Status() {
    switch (player2Status) {
      case traps[0]:
        player2Status -= 1;
        console.log(`Trap 1: move back 1 steps >>>Current player 2: ${player2Status}`);
        break;
      case traps[1]:
        player2Status -= 2;
        console.log(`Trap 2: move back 2 steps >>>Current player 2: ${player2Status}`);
        break;
      case traps[2]:
        player2Status -= 3;
        console.log(`Trap 3: move back 3 steps >>>Current player 2: ${player2Status}`);
        break;
      case traps[3]:
        player2Status -= 4;
        console.log(`Trap 4: move back 4 steps >>>Current player 2: ${player2Status}`);
        break;
      case traps[4]:
        player2Status -= 5;
        console.log(`Trap 5: move back 5 steps >>>Current player 2: ${player2Status}`);
        break;
      case traps[5]:
        player2Status -= 6;
        console.log(`Trap 6: move back 6 steps >>>Current player 2: ${player2Status}`);
        break;
      default:
        console.log(`Normal: >>>Current player 2: ${player2Status}`);
        break;
    }
  }
}

export default runGame;
