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
      removePlayer(player1);
      const finalPosition = document.getElementById('tile-index-30');
      displayPlayers(finalPosition, player1);
      player1Btn.disabled = true;
      player2Btn.disabled = true;
      console.log('Player 1 winner');
      alert('Winner! Player 1 got the throne!');
      return null;
    } else {
      console.log(`Player 1 rolled: ${currentDicePoint}`);

      const updatePosition = document.getElementById(`tile-index-${player1Status}`);
      removePlayer(player1);
      displayPlayers(updatePosition, player1);

      if (traps.includes(player1Status)) {
        player1Status -= traps.indexOf(player1Status) + 1;
        const newPosition: HTMLElement = document.getElementById(`tile-index-${player1Status}`);
        alert(`Trap ${traps.indexOf(player1Status) + 1}`);

        setTimeout(function() {
          removePlayer(player1);
          displayPlayers(newPosition, player1);
        }, 1000); //delay is in milliseconds
      }

      if (currentDicePoint === 6) {
        alert('Since you rolled 6, you got a Bonus movement. Roll the dice again');
      } else {
        console.log(`player1Status:${player1Status}`);
        console.log(`player2Status:${player2Status}`);
        isPlayer1Turn = false;
        updateButton(isPlayer1Turn);
      }
    }
  }

  function runPlayer2Turn(): void {
    const currentDicePoint = rollDice();
    showDiceResult(diceContainer, currentDicePoint);
    player2Status += currentDicePoint;

    if (player2Status >= 30) {
      removePlayer(player2);
      const finalPosition = document.getElementById('tile-index-30');
      displayPlayers(finalPosition, player2);
      player1Btn.disabled = true;
      player2Btn.disabled = true;
      console.log('Player 2 winner');
      alert('Winner! Player 2 got the throne!');
    } else {
      alert(`Player 2 rolled: ${currentDicePoint}`);

      const updatePosition = document.getElementById(`tile-index-${player2Status}`);
      removePlayer(player2);
      displayPlayers(updatePosition, player2);

      if (traps.includes(player2Status)) {
        player2Status -= traps.indexOf(player2Status) + 1;
        const newPosition: HTMLElement = document.getElementById(`tile-index-${player2Status}`);
        alert(`Trap ${traps.indexOf(player2Status) + 1}`);

        setTimeout(function() {
          removePlayer(player2);
          displayPlayers(newPosition, player2);
        }, 1000); //delay is in milliseconds
      }

      if (currentDicePoint === 6) {
        alert('Since you rolled 6, you got a Bonus movement. Roll the dice again');
      } else {
        console.log(`player1Status:${player1Status}`);
        console.log(`player2Status:${player2Status}`);
        isPlayer1Turn = true;
        updateButton(isPlayer1Turn);
      }
    }
  }
}

export default runGame;
