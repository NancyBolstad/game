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
  showMessage,
  deleteMessage,
  rollAgainMessage,
} from './util/gameHelpers';
import { diceContainer, player1Btn, player2Btn } from './util/containers';
import { Winner as WinnerTypes } from '../scripts/showWinner';

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
    showDiceResult(diceContainer, currentDicePoint, 300);
    player1Status += currentDicePoint;

    if (checkWinner(player1Status)) {
      const winner: WinnerTypes = {
        index: player1,
        name: 'Player 1',
      };
      gameStorage.setSerialize('winner', winner);
      removePlayer(player1);
      displayPlayers(finalPosition, player1);
      gameEnd();
      setTimeout(function() {
        window.location.href = 'winner.html';
      }, 1000);
      return;
    } else {
      const updatePosition = document.getElementById(`tile-index-${player1Status}`);
      removePlayer(player1);
      displayPlayers(updatePosition, player1);

      traps.forEach(element => {
        if (element.token == player1Status) {
          const { action, message } = element;
          player1Status -= action;
          const newPosition = document.getElementById(`tile-index-${player1Status}`);

          showMessage(`${message}`);
          deleteMessage();

          setTimeout(function() {
            removePlayer(player1);
            displayPlayers(newPosition, player1);
          }, 3000);
        }
      });

      updatePlayer1Button(false);
    }

    if (currentDicePoint === 6) {
      showMessage(`${rollAgainMessage}`);
      deleteMessage();
      updatePlayer1Button(true);
    }
  }

  function runPlayer2Turn(): void {
    const currentDicePoint = rollDice();
    showDiceResult(diceContainer, currentDicePoint, 300);
    player2Status += currentDicePoint;

    if (checkWinner(player2Status)) {
      const winner: WinnerTypes = {
        index: player2,
        name: 'Player 2',
      };
      gameStorage.setSerialize('winner', winner);
      removePlayer(player2);
      displayPlayers(finalPosition, player2);
      gameEnd();
      setTimeout(function() {
        window.location.href = 'winner.html';
      }, 1000);
      return;
    } else {
      const updatePosition = document.getElementById(`tile-index-${player2Status}`);
      removePlayer(player2);
      displayPlayers(updatePosition, player2);

      traps.forEach(element => {
        if (element.token == player2Status) {
          const { action, message } = element;
          player2Status -= action;
          const newPosition = document.getElementById(`tile-index-${player2Status}`);

          showMessage(`${message}`);
          deleteMessage();

          setTimeout(function() {
            removePlayer(player2);
            displayPlayers(newPosition, player2);
          }, 3000);
        }
      });

      updatePlayer1Button(true);
    }

    if (currentDicePoint === 6) {
      showMessage(`${rollAgainMessage}`);
      deleteMessage();
      updatePlayer1Button(false);
    }
  }
}

export default playGame;
