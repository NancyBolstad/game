import { gameStorage } from './../index';
import {
  showDiceResult,
  updatePlayer1Button,
  rollDice,
  displayPlayers,
  removePlayer,
  checkWinner,
  gameEnd,
  traps,
} from './util/gameHelpers';
import { diceContainer, player1Btn, player2Btn } from './util/containers';

function playGame(player1: number, player2: number): void {
  const startPosition: HTMLElement = document.getElementById('tile-index-1');
  const finalPosition = document.getElementById('tile-index-30');

  let player1Status: number = 1;
  let player2Status: number = 1;

  displayPlayers(startPosition, player1);
  displayPlayers(startPosition, player2);
  updatePlayer1Button(true);
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
      gameStorage.set('winner', `${player1}`);
      setTimeout(function() {
        window.location.href = 'winner.html';
      }, 1000);
    } else {
      alert(`Player 1 rolled: ${currentDicePoint}`);

      const updatePosition = document.getElementById(`tile-index-${player1Status}`);
      removePlayer(player1);
      displayPlayers(updatePosition, player1);

      traps.forEach(element => {
        if (element.token == player1Status) {
          const { action, message } = element;
          player1Status -= action;
          const newPosition = document.getElementById(`tile-index-${player1Status}`);
          console.log(newPosition);

          alert(`${message}`);

          setTimeout(function() {
            console.log(1111111);
            removePlayer(player1);
            console.log(2222222);
            displayPlayers(newPosition, player1);
          }, 1000);
        }
      });

      updatePlayer1Button(false);

      if (currentDicePoint === 6) {
        alert('Since you rolled 6, you got a Bonus movement. Roll the dice again');
        updatePlayer1Button(true);
      }
    }
  }

  function runPlayer2Turn(): void {
    const currentDicePoint = rollDice();
    showDiceResult(diceContainer, currentDicePoint);
    player2Status += currentDicePoint;

    if (checkWinner(player2Status)) {
      removePlayer(player2);
      displayPlayers(finalPosition, player2);
      gameEnd(player2);
      gameStorage.set('winner', `${player2}`);
      setTimeout(function() {
        window.location.href = 'winner.html';
      }, 1000);
    } else {
      alert(`Player 2 rolled: ${currentDicePoint}`);

      const updatePosition = document.getElementById(`tile-index-${player2Status}`);
      removePlayer(player2);
      displayPlayers(updatePosition, player2);

      traps.forEach(element => {
        if (element.token == player2Status) {
          const { action, message } = element;
          player2Status -= action;
          const newPosition = document.getElementById(`tile-index-${player2Status}`);
          console.log(newPosition);

          alert(`${message}`);

          setTimeout(function() {
            console.log(1111111);
            removePlayer(player2);
            console.log(2222222);
            displayPlayers(newPosition, player2);
          }, 1000);
        }
      });

      updatePlayer1Button(true);

      if (currentDicePoint === 6) {
        alert('Since you rolled 6, you got a Bonus movement. Roll the dice again');
        updatePlayer1Button(false);
      }
    }
  }
}

export default playGame;
