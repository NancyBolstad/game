import { createBoard } from './scripts/board';
import showCharacter from './scripts/showCharacter';
import { Jon, Samwell, Sansa } from './scripts/util/characters';
import { board, characterList, diceContainer, startTile } from './scripts/util/containers';
import { diceArray } from './scripts/util/dice';
import Storage from './scripts/util/storage';
import handleDrag from './scripts/handleDrag';

export const gameStorage = new Storage();
gameStorage.get('test');

if (characterList != null) {
  showCharacter(Samwell);
  showCharacter(Jon);
  showCharacter(Sansa);
  handleDrag();
}

const defaultIndex: number = Math.floor(Math.random() * 6) + 1;

if (diceContainer != null) diceContainer.innerHTML = diceArray[defaultIndex - 1];

if (board != null) createBoard(board);

if (startTile != null) startTile.innerHTML = diceArray[defaultIndex - 1];
