import { player1Btn, player2Btn } from './util/containers';
import { diceArray } from './util/dice';
import createImage from './util/createImage';

export function updatePlayer1Button(isPlayer1Turn: boolean): void {
  if (isPlayer1Turn) {
    player1Btn.disabled = false;
    player2Btn.disabled = true;
  } else {
    player1Btn.disabled = true;
    player2Btn.disabled = false;
  }
}

export function showDiceResult(container: HTMLElement, point: number) {
  container.innerHTML = diceArray[point - 1];
}

export function rollDice(): number {
  return Math.floor(Math.random() * 6) + 1;
}

export function removePlayer(player: number): void {
  document.getElementById(`figure-${player}`).remove();
}

export function displayPlayers(container: HTMLElement, playerIndex: number) {
  const player: HTMLImageElement = document.createElement('img');

  player.src = `${createImage(playerIndex)}`;

  player.setAttribute('class', 'board__figure');

  player.setAttribute('alt', `Game figure no.${playerIndex}`);

  player.setAttribute('id', `figure-${playerIndex}`);

  if (container != null) {
    container.appendChild(player);
  }
}

export function checkWinner(playerStatus: number): boolean {
  return playerStatus >= 30 ? true : false;
}

export function gameEnd(winner: number) {
  player1Btn.disabled = true;
  player2Btn.disabled = true;
}
