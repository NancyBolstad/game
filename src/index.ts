import { createBoard, trap1, trap2, trap3, trap4, trap5, trap6 } from './scripts/board';
import handleDrag from './scripts/handleDrag';
import { handleSelection } from './scripts/handleSelection';
import { rollDice } from './scripts/rollDice';
import getCharacterCards from './scripts/showCharacter';
import characterIndex from './scripts/util/characterIndex';
import {
  board,
  characterList,
  diceContainer,
  startTile,
  validateSelectionBtn,
  player1Btn,
  player2Btn,
} from './scripts/util/containers';
import { diceArray } from './scripts/util/dice';
import Storage from './scripts/util/storage';

export const gameStorage = new Storage();

if (characterList != null) {
  getCharacterCards(characterIndex);
  handleDrag();
}
if (board != null) {
  createBoard(board);
  playGame();
}

const defaultIndex: number = Math.floor(Math.random() * 6) + 1;

if (diceContainer != null) showDiceResult();

if (startTile != null) startTile.innerHTML = diceArray[defaultIndex - 1];

if (validateSelectionBtn != null)
  validateSelectionBtn.addEventListener('click', handleSelection, false);

if (player1Btn) player1Btn.addEventListener('click', showDiceResult, false);
if (player2Btn) player2Btn.addEventListener('click', showDiceResult, false);

function showDiceResult() {
  const defaultIndex: number = Math.floor(Math.random() * 6) + 1;
  diceContainer.innerHTML = diceArray[defaultIndex - 1];
}

function playGame() {
  let isPlaying: boolean = true;
  let player1Status: number = 1;
  let player2Status: number = 1;

  while (isPlaying) {
    runPlayer1Turn();
    runPlayer2Turn();
  }

  function runPlayer1Turn(): void {
    const currentDicePoint = rollDice();
    console.log(`Player 1 rolled: ${currentDicePoint}`);

    if (currentDicePoint === 6) {
      player1Status += currentDicePoint; //update
      updatePlayer1Status(); //checkUpdate
      console.log('Since you rolled 6, you got a Bonus movement');
      runPlayer1Turn();
    } else {
      player1Status += currentDicePoint;
      updatePlayer1Status();
    }
    console.log(`player1Status:${player1Status}`);
    console.log(`player2Status:${player2Status}`);

    if (player1Status >= 30) {
      console.log('Player 1 winner');
      isPlaying = false;
      return null;
    }
  }

  function runPlayer2Turn(): void {
    const currentDicePoint = rollDice();
    console.log(`Player 2 rolled: ${currentDicePoint}`);

    if (currentDicePoint === 6) {
      player2Status += currentDicePoint;
      updatePlayer2Status();
      console.log('Since you rolled 6, you got a Bonus movement');
      runPlayer2Turn();
    } else {
      player2Status += currentDicePoint;
      updatePlayer2Status();
    }
    console.log(`player1Status:${player1Status}`);
    console.log(`player2Status:${player2Status}`);

    if (player2Status >= 30) {
      console.log('Player 2 winner');
      isPlaying = false;
      return null;
    }
  }

  function updatePlayer2Status() {
    switch (player2Status) {
      case trap1:
        player2Status -= 1;
        console.log(`Trap 1: move back 1 steps >>>Current player 2: ${player2Status}`);
        break;
      case trap2:
        player2Status -= 2;
        console.log(`Trap 2: move back 2 steps >>>Current player 2: ${player2Status}`);
        break;
      case trap3:
        player2Status -= 3;
        console.log(`Trap 3: move back 3 steps >>>Current player 2: ${player2Status}`);
        break;
      case trap4:
        player2Status -= 4;
        console.log(`Trap 4: move back 4 steps >>>Current player 2: ${player2Status}`);
        break;
      case trap5:
        player2Status -= 5;
        console.log(`Trap 5: move back 5 steps >>>Current player 2: ${player2Status}`);
        break;
      case trap6:
        player2Status -= 6;
        console.log(`Trap 6: move back 6 steps >>>Current player 2: ${player2Status}`);
        break;
      default:
        console.log(`Normal: >>>Current player 2: ${player2Status}`);
        break;
    }
  }

  function updatePlayer1Status() {
    switch (player1Status) {
      case trap1:
        player1Status -= 1;
        console.log(`Trap 1: move back 1 steps >>>Current player 1: ${player1Status}`);
        break;
      case trap2:
        player1Status -= 2;
        console.log(`Trap 2: move back 2 steps >>>Current player 1: ${player1Status}`);
        break;
      case trap3:
        player1Status -= 3;
        console.log(`Trap 3: move back 3 steps >>>Current player 1: ${player1Status}`);
        break;
      case trap4:
        player1Status -= 4;
        console.log(`Trap 4: move back 4 steps >>>Current player 1: ${player1Status}`);
        break;
      case trap5:
        player1Status -= 5;
        console.log(`Trap 5: move back 5 steps >>>Current player 1: ${player1Status}`);
        break;
      case trap6:
        player1Status -= 6;
        console.log(`Trap 6: move back 6 steps >>>Current player 1: ${player1Status}`);
        break;
      default:
        console.log(`Normal: >>>Current player 1: ${player1Status}`);
        break;
    }
  }
}

console.log(gameStorage.get('player1Name'));
