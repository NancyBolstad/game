export const traps: number[] = [8, 14, 18, 24, 28];

export function createBoard(container: HTMLDivElement): void {
  for (let i: number = 1; i <= 30; i++) {
    const tile: HTMLDivElement = document.createElement('div');
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

export default createBoard;
