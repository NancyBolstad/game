import { congratulationMessage, winnerContainer } from './util/containers';
import createImage from './util/createImage';

export interface Winner {
  index: number;
  name: string;
}

function showWinner({ index, name }: Winner): void {
  if (winnerContainer != null) {
    const winnerImage: HTMLImageElement = document.createElement('img');
    winnerImage.className = 'item--winner-image';
    winnerImage.src = `${createImage(index)}`;
    winnerImage.alt = 'Featured image for the winner';
    winnerContainer.appendChild(winnerImage);
  }

  if (congratulationMessage != null) {
    congratulationMessage.innerText = `${name} claimed the crown!`;
  }
}

export default showWinner;
