import { diceArray } from './util/dice';

export function updateButton(
  condition: boolean,
  btn1: HTMLButtonElement,
  btn2: HTMLButtonElement,
): void {
  if (condition) {
    btn1.disabled = false;
    btn2.disabled = true;
  } else {
    btn2.disabled = false;
    btn1.disabled = true;
  }
}

export function showDiceResult(container: HTMLElement, point: number) {
  container.innerHTML = diceArray[point - 1];
}
