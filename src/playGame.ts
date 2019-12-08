import { gameStorage } from './index';
import { createBoard, traps } from './scripts/board';
import {
  showDiceResult,
  updateButton,
  rollDice,
  displayPlayers,
  removePlayer,
  checkDice,
  checkWinner,
  gameEnd,
} from './scripts/gameHelpers';
import { board, diceContainer, player1Btn, player2Btn } from './scripts/util/containers';

function runGame(): void {
  const player1: number = gameStorage.getUnserialize('player1Name');
  const player2: number = gameStorage.getUnserialize('player2Name');
  if (board != null && diceContainer && player1 && player2) {
    createBoard(board);
    showDiceResult(diceContainer, rollDice());
    playGame(player1, player2);
  }
}

function playGame(player1: number, player2: number): void {
  const startPosition: HTMLElement = document.getElementById('tile-index-1');
  const finalPosition = document.getElementById('tile-index-30');

  let player1Status: number = 1;
  let player2Status: number = 1;
  let isPlayer1Turn: boolean = true;

  displayPlayers(startPosition, player1);
  displayPlayers(startPosition, player2);
  updateButton(isPlayer1Turn);
  player1Btn.addEventListener('click', runPlayer1Turn, false);
  player2Btn.addEventListener('click', runPlayer2Turn, false);

  function runPlayer1Turn(): void {
    const currentDicePoint = rollDice();
    showDiceResult(diceContainer, currentDicePoint);
    player1Status += currentDicePoint;

    if (checkWinner(player1Status)) {
      removePlayer(player1);
      displayPlayers(finalPosition, player1);
      gameEnd(player1);
    } else {
      alert(`Player 1 rolled: ${currentDicePoint}`);

      const updatePosition = document.getElementById(`tile-index-${player1Status}`);
      removePlayer(player1);
      displayPlayers(updatePosition, player1);

      if (traps.includes(player1Status)) {
        const trapIndex: number = traps.indexOf(player1Status) + 1;
        player1Status -= trapIndex;
        const newPosition: HTMLElement = document.getElementById(`tile-index-${player1Status}`);

        alert(`Trap ${trapIndex}`);

        setTimeout(function() {
          removePlayer(player1);
          displayPlayers(newPosition, player1);
        }, 1000);
      }
      updateButton(false);

      if (currentDicePoint === 6) {
        alert('Since you rolled 6, you got a Bonus movement. Roll the dice again');
        updateButton(true);
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

      checkDice(currentDicePoint, true);
    }
  }
}

export default runGame;
