import Storage from './scripts/util/storage';
import { PlayerTypes } from './scripts/util/types';
import ApiService from './scripts/util/apiService';

const gameStorage = new Storage();
let player1: PlayerTypes = {
  selectedCharacter: 'one',
  isWinner: false,
  currentPosition: '',
};

let player2: PlayerTypes = {
  selectedCharacter: 'two',
  isWinner: false,
  currentPosition: '',
};

gameStorage.set('player1', player1.selectedCharacter);
gameStorage.set('player2', player2.selectedCharacter);

ApiService({ page: 1, pageSize: 10 });
