import handleDrag from './scripts/handleDrag';
import { handleSelection } from './scripts/handleSelection';
import playGame from './scripts/playGame';
import getCharacterCards from './scripts/showCharacter';
import showWinner, { Winner as WinnerType } from './scripts/showWinner';
import characterIndex from './scripts/util/characterIndex';
import {
  board,
  characterList,
  diceContainer,
  resetBtn,
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

if (winnerContainer != null) {
  const winner: WinnerType = gameStorage.getUnserialize('winner');
  console.log(winner);
  showWinner(winner);
}

if (resetBtn != null) {
  resetBtn.addEventListener(
    'click',
    function() {
      gameStorage.delete('player1Index');
      gameStorage.delete('player2Index');
      gameStorage.delete('winner');
      window.location.href = 'select.html';
    },
    false,
  );
}
