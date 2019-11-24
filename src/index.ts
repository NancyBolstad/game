import Storage from './scripts/util/storage';
import ApiService from './scripts/util/apiService';
import { dice } from './scripts/util/dice';
import { createBoard } from './scripts/board';

const gameStorage = new Storage();

gameStorage.set('player1', 'test');

ApiService({ page: 1, pageSize: 10 });

const boardContainer: HTMLDivElement = document.querySelector('.gameBoard');

const diceContainer = document.getElementById('diceImage');

const index: number = Math.floor(Math.random() * 6) + 1;

console.log(index);
if (diceContainer) diceContainer.innerHTML = dice[index - 1];

if (boardContainer) createBoard(boardContainer);
