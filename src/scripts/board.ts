interface trap {
  token: number;
  action: number;
  message: string;
}

const trap1: trap = {
  token: 8,
  action: 1,
  message: 'Pirates ahead! Retreat one field to avoid being noticed.',
};

const trap2: trap = {
  token: 14,
  action: 2,
  message: 'A wolf emerges from the night woods. Retreat two fields to escape its chase.',
};

const trap3: trap = {
  token: 18,
  action: 3,
  message:
    'A white walker has been spotted! Immediately retreat three fields to narrowly escape death.',
};

const trap4: trap = {
  token: 24,
  action: 4,
  message: 'Enemy horsemen on the horizon! Outnumbered, you must retreat four fields',
};

const trap5: trap = {
  token: 28,
  action: 5,
  message: 'Fire-breathing dragons appear! Retreat five fields to escape their long gaze.',
};

export const traps: trap[] = [trap1, trap2, trap3, trap4, trap5];

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

    traps.map(element => {
      if (element.token === i) {
        tile.style.backgroundColor = 'yellow';
        tile.style.backgroundImage = `url('https://res.cloudinary.com/dnkfgmzy1/image/upload/v1575655734/game/trap${element.action}.svg')`;
        tile.style.backgroundSize = '4rem';
        tile.style.backgroundRepeat = 'no-repeat';
        tile.style.backgroundPosition = 'center center';
      }
    });

    container.appendChild(tile);
  }
}

export default createBoard;
