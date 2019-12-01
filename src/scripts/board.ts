export function createBoard(container: HTMLDivElement): void {
  for (let i = 1; i <= 30; i++) {
    const tile = document.createElement('div');
    tile.className = `tile tile-index-${i}`;

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

    container.appendChild(tile);
  }
}
