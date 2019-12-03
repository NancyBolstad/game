import { player1Selection, player2Selection } from './util/containers';
import { hasSelected } from './util/hasSelected';
export function handleSelection(): void {
  const hasPlayer1Selected = hasSelected(player1Selection);
  const hasPlayer2Selected = hasSelected(player2Selection);
  if (hasPlayer1Selected && hasPlayer2Selected) {
    window.location.href = 'game.html';
  } else {
    alert('Select character first, then start the game');
  }
}
