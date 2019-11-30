import { board, dice } from './scripts/util/containers';
import Storage from './scripts/util/storage';
import showCharacter from './scripts/showCharacter';
import { diceArray } from './scripts/util/dice';
import { createBoard } from './scripts/board';
import { Jon, Samwell, Sansa } from './scripts/util/characters';

const gameStorage = new Storage();

gameStorage.get('test');
showCharacter(Samwell);
showCharacter(Jon);
showCharacter(Sansa);

const defaultIndex: number = Math.floor(Math.random() * 6) + 1;

dice.innerHTML = diceArray[defaultIndex - 1];

createBoard(board);
