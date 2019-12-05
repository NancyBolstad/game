import Storage from './scripts/util/storage';
import renderCharacterList from './renderCharacterList';
import runGame from './playGame';

export const gameStorage = new Storage();
renderCharacterList();
runGame();
