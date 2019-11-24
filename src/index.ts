import Storage from './scripts/util/storage';
import ApiService from './scripts/util/apiService';

const gameStorage = new Storage();

gameStorage.set('player1', 'test');

ApiService({ page: 1, pageSize: 10 });

const BOARD_SIZE = 30;
const boardContainer = document.querySelector('.gameBoard');

for (let i = 1; i <= BOARD_SIZE; i++) {
  const tile = document.createElement('div');
  tile.classList.add('tile');

  tile.setAttribute('tile-index', `${i}`);

  if (i % 2 !== 0) {
    tile.style.backgroundColor = 'brown';
  } else {
    tile.style.backgroundColor = 'white';
  }

  if (i == 4) {
    tile.style.backgroundColor = 'orange';
  }

  if (i == 7) {
    tile.style.backgroundColor = 'orange';
  }
  if (i == 13) {
    tile.style.backgroundColor = 'orange';
  }
  if (i == 16) {
    tile.style.backgroundColor = 'orange';
  }
  if (i == 23) {
    tile.style.backgroundColor = 'orange';
  }

  if (i == 29) {
    tile.style.backgroundColor = 'orange';
  }

  boardContainer.appendChild(tile);
}
