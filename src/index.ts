import { createBoard, trap1, trap2, trap3, trap4, trap5, trap6 } from './scripts/board';
import handleDrag from './scripts/handleDrag';
import { handleSelection } from './scripts/handleSelection';
import { rollDice } from './scripts/rollDice';
import getCharacterCards from './scripts/showCharacter';
import characters from './scripts/util/characters';
import {
  board,
  characterList,
  diceContainer,
  startTile,
  validateSelectionBtn,
} from './scripts/util/containers';
import { diceArray } from './scripts/util/dice';
import Storage from './scripts/util/storage';

export const gameStorage = new Storage();

if (characterList != null) {
  getCharacterCards(characters);
  handleDrag();
}

const defaultIndex: number = Math.floor(Math.random() * 6) + 1;

if (diceContainer != null) diceContainer.innerHTML = diceArray[defaultIndex - 1];

if (board != null) createBoard(board);

if (startTile != null) startTile.innerHTML = diceArray[defaultIndex - 1];

if (validateSelectionBtn != null)
  validateSelectionBtn.addEventListener('click', handleSelection, false);

let isPlaying: boolean = true;
let player1Status: number = 1;
let player2Status: number = 1;
const finalScore: number = 30;

while (isPlaying) {
  runPlayer1Turn();
  runPlayer2Turn();
}

function runPlayer1Turn(): void {
  const playerCurrentRoll = rollDice();
  console.log(`Player 1 rolled: ${playerCurrentRoll}`);

  if (playerCurrentRoll === 6) {
    player1Status += playerCurrentRoll;
    updateStatus(player1Status);
    alert('Since you rolled 6, you got a Bonus movement');
    runPlayer1Turn();
  } else {
    player1Status += playerCurrentRoll;
    updateStatus(player1Status);
  }

  checkWinner(player1Status);
}

function runPlayer2Turn(): void {
  const playerCurrentRoll = rollDice();
  console.log(`Player 1 rolled: ${playerCurrentRoll}`);

  if (playerCurrentRoll === 6) {
    player2Status += playerCurrentRoll;
    updateStatus(player2Status);
    alert('Since you rolled 6, you got a Bonus movement');
    alert('Bonus movement');
    runPlayer2Turn();
  } else {
    player2Status += playerCurrentRoll;
    updateStatus(player2Status);
  }

  checkWinner(player2Status);
}

function updateStatus(status: number) {
  switch (status) {
    case trap1:
      status -= 1;
      alert('Trap 1 move back 1 steps');
      break;
    case trap2:
      status -= 2;
      alert('Trap 1 move back 2 steps');
      break;
    case trap3:
      status += 3;
      alert('Trap 3 move back 3 steps');
      break;
    case trap4:
      status += 4;
      alert('Trap 4 move back 4 steps');
      break;
    case trap5:
      status += 5;
      alert('Trap 5 move back 5 steps');
      break;
    case trap6:
      status += 6;
      alert('Trap 6 move back 6 steps');
      break;
    default:
      alert(`Move ${status} steps forward`);
      console.log(`player1Status:${player1Status}`);
      break;
  }
}
function checkWinner(status: number): void {
  if (status >= finalScore) {
    isPlaying = false;

    const winner: string = player1Status > player2Status ? 'Player1' : 'Player2';
    alert(`We got winnter ${winner}`);
  }
}
