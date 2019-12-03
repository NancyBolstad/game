import { diceArray } from './util/dice';

export const diceNumber = () => {
  return Math.floor(Math.random() * 6);
};

export function rollDice(): number {
  return Math.floor(Math.random() * 6) + 1;
}

export function createDiceIcon(dicePoint: number) {
  return diceArray[dicePoint + 1];
}
