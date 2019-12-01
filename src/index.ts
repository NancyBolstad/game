import { board, diceContainer, startTile, characterList } from './scripts/util/containers';
import Storage from './scripts/util/storage';
import showCharacter from './scripts/showCharacter';
import { diceArray } from './scripts/util/dice';
import { createBoard } from './scripts/board';
import { Jon, Samwell, Sansa } from './scripts/util/characters';

const gameStorage = new Storage();
gameStorage.get('test');

if (characterList != null) {
  showCharacter(Samwell);
  showCharacter(Jon);
  showCharacter(Sansa);
}

const defaultIndex: number = Math.floor(Math.random() * 6) + 1;

if (diceContainer != null) diceContainer.innerHTML = diceArray[defaultIndex - 1];

if (board != null) createBoard(board);

if (startTile != null) startTile.innerHTML = diceArray[defaultIndex - 1];
