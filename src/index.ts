import Storage from './scripts/util/storage';
import { PlayerTypes } from './scripts/util/types';

const gameStorage = new Storage();
let player1: PlayerTypes = {
  selectedCharacter: '',
  isWinner: false,
  currentPosition: '',
};

let player2: PlayerTypes = {
  selectedCharacter: '',
  isWinner: false,
  currentPosition: '',
};

gameStorage.set('player1', player1.selectedCharacter);
gameStorage.set('player2', player1.selectedCharacter);
