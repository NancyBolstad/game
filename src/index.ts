import { createBoard } from './scripts/board';
import getCharacterCards from './scripts/showCharacter';
import characters from './scripts/util/characters';
import {
  board,
  characterList,
  diceContainer,
  startTile,
  validateSelectionBtn,
} from './scripts/util/containers';
import { diceArray } from './scripts/util/dice';
import Storage from './scripts/util/storage';
import handleDrag from './scripts/handleDrag';
import { handleSelection } from './scripts/handleSelection';

export const gameStorage = new Storage();

if (characterList != null) {
  getCharacterCards(characters);
  handleDrag();
}

const defaultIndex: number = Math.floor(Math.random() * 6) + 1;

if (diceContainer != null) diceContainer.innerHTML = diceArray[defaultIndex - 1];

if (board != null) createBoard(board);

if (startTile != null) startTile.innerHTML = diceArray[defaultIndex - 1];

if (validateSelectionBtn != null)
  validateSelectionBtn.addEventListener('click', handleSelection, false);
