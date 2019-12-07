import { diceArray } from './util/dice';
import { player1Btn, player2Btn } from './util/containers';

export function updateButton(isPlayer1Turn: boolean): void {
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
