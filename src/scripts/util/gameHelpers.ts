import { player1Btn, player2Btn } from './containers';
import { diceArray } from './dice';
import createImage from './createImage';

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

export function createBoard(container: HTMLElement): void {
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

export function updatePlayer1Button(isPlayer1Turn: boolean): void {
  if (isPlayer1Turn) {
    player1Btn.disabled = false;
    player2Btn.disabled = true;
  } else {
    player1Btn.disabled = true;
    player2Btn.disabled = false;
  }
}

export function showDiceResult(container: HTMLElement, point: number) {
  container.innerHTML = diceArray[point - 1];
}

export function rollDice(): number {
  return Math.floor(Math.random() * 6) + 1;
}

export function removePlayer(player: number): void {
  document.getElementById(`figure-${player}`).remove();
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

export function checkWinner(playerStatus: number): boolean {
  return playerStatus >= 30 ? true : false;
}

export function gameEnd(winner: number) {
  player1Btn.disabled = true;
  player2Btn.disabled = true;
}
