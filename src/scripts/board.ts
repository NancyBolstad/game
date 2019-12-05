import createImage from './util/createImage';

export const trap1: number = 4;
export const trap2: number = 7;
export const trap3: number = 13;
export const trap4: number = 16;
export const trap5: number = 23;
export const trap6: number = 29;

export function createBoard(container: HTMLDivElement): void {
  for (let i = 1; i <= 30; i++) {
    const tile = document.createElement('div');
    tile.className = `tile`;
    tile.setAttribute('id', `tile-index-${i}`);

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

export function displayPlayers(container: HTMLElement, player1Index: number, player2Index: number) {
  const player1: HTMLImageElement = document.createElement('img');
  const player2: HTMLImageElement = document.createElement('img');

  player1.src = `${createImage(player1Index)}`;
  player2.src = `${createImage(player2Index)}`;

  player1.setAttribute('class', 'board__figure');
  player2.setAttribute('class', 'board__figure');

  player1.setAttribute('alt', `Game figure no.${player1Index}`);
  player2.setAttribute('alt', `Game figure no.${player2Index}`);

  if (container != null) {
    container.appendChild(player1);
    container.appendChild(player2);
  }
}
