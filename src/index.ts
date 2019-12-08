import Storage from './scripts/util/storage';
import playGame from './scripts/playGame';
import { showDiceResult, rollDice, createBoard } from './scripts/util/gameHelpers';
import { board, diceContainer } from './scripts/util/containers';
import handleDrag from './scripts/handleDrag';
import { handleSelection } from './scripts/handleSelection';
import getCharacterCards from './scripts/showCharacter';
import characterIndex from './scripts/util/characterIndex';
import { characterList, validateSelectionBtn } from './scripts/util/containers';

export const gameStorage = new Storage();
const player1: number = gameStorage.getUnserialize('player1Index');
const player2: number = gameStorage.getUnserialize('player2Index');

if (characterList != null) {
  getCharacterCards(characterIndex);
  handleDrag();
  if (validateSelectionBtn != null)
    validateSelectionBtn.addEventListener('click', handleSelection, false);
}

if (board != null && diceContainer) {
  createBoard(board);
  showDiceResult(diceContainer, rollDice());
}

if (player1 && player2) {
  playGame(player1, player2);
}
