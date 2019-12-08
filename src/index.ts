import handleDrag from './scripts/handleDrag';
import { handleSelection } from './scripts/handleSelection';
import playGame from './scripts/playGame';
import getCharacterCards from './scripts/showCharacter';
import showWinner, { Winner as WinnerTypes } from './scripts/showWinner';
import characterIndex from './scripts/util/characterIndex';
import {
  board,
  characterList,
  diceContainer,
  validateSelectionBtn,
  winnerContainer,
} from './scripts/util/containers';
import { createBoard, rollDice, showDiceResult } from './scripts/util/gameHelpers';
import Storage from './scripts/util/storage';

export const gameStorage = new Storage();

if (characterList != null) {
  getCharacterCards(characterIndex);
  handleDrag();
  if (validateSelectionBtn != null)
    validateSelectionBtn.addEventListener('click', handleSelection, false);
}

if (board != null && diceContainer != null) {
  const player1: number = gameStorage.getUnserialize('player1Index');
  const player2: number = gameStorage.getUnserialize('player2Index');
  createBoard(board);
  showDiceResult(diceContainer, rollDice());

  if (player1 && player2) {
    playGame(player1, player2);
  }
}

console.log(1111111987798);

if (winnerContainer != null) {
  const winner: WinnerTypes = {
    index: 238,
    name: 'Player 1',
  };
  console.log(99999999);
  showWinner(winner);
}
