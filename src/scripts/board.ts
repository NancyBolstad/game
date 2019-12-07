import createImage from './util/createImage';
import { traps } from './util/traps';

export function createBoard(container: HTMLDivElement): void {
  for (let i: number = 1; i <= 30; i++) {
    const tile = document.createElement('div');
    tile.className = `tile`;
    tile.setAttribute('id', `tile-index-${i}`);

    if (i % 2 !== 0) {
      tile.style.backgroundColor = 'brown';
    } else {
      tile.style.backgroundColor = 'white';
    }

    if (traps.includes(i)) {
      const trapNumber: number = traps.indexOf(i) + 1;
      tile.style.backgroundColor = 'yellow';
      tile.style.backgroundImage = `url('https://res.cloudinary.com/dnkfgmzy1/image/upload/v1575655734/game/trap${trapNumber}.svg')`;
      tile.style.backgroundSize = '4rem';
      tile.style.backgroundRepeat = 'no-repeat';
      tile.style.backgroundPosition = 'center center';
    }

    container.appendChild(tile);
  }
}

export function displayPlayers(container: HTMLElement, playerIndex: number) {
  const player: HTMLImageElement = document.createElement('img');

  player.src = `${createImage(playerIndex)}`;

  player.setAttribute('class', 'board__figure');

  player.setAttribute('alt', `Game figure no.${playerIndex}`);

  player.setAttribute('id', `figure-${playerIndex}`);

  if (container != null) {
    container.appendChild(player);
  }
}
