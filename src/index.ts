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
  validateSelectionBtn,
  player1Btn,
  player2Btn,
} from './scripts/util/containers';
import Storage from './scripts/util/storage';
import { updateButton, showDiceResult } from './scripts/game';

export const gameStorage = new Storage();
const defaultIndex: number = Math.floor(Math.random() * 6) + 1;

if (characterList != null) {
  getCharacterCards(characterIndex);
  handleDrag();
}
if (board != null) {
  createBoard(board);
  playGame();
}

if (diceContainer != null) showDiceResult(diceContainer, defaultIndex);

if (validateSelectionBtn != null)
  validateSelectionBtn.addEventListener('click', handleSelection, false);

function playGame() {
  let player1Status: number = 1;
  let player2Status: number = 1;
  let isPlayer1Turn: boolean = true;

  updateButton(isPlayer1Turn, player1Btn, player2Btn);

  player1Btn.addEventListener('click', runPlayer1Turn, false);

  player2Btn.addEventListener('click', runPlayer2Turn, false);

  function runPlayer1Turn(): void {
    const currentDicePoint = rollDice();
    showDiceResult(diceContainer, currentDicePoint);
    console.log(`Player 1 rolled: ${currentDicePoint}`);
    player1Status += currentDicePoint;

    if (player1Status >= 30) {
      console.log('Player 1 winner');
      alert('Winner');
      player1Btn.disabled = true;
      player2Btn.disabled = true;
      return null;
    }

    if (currentDicePoint === 6) {
      updatePlayer1Status(); //checkUpdate
      console.log('Since you rolled 6, you got a Bonus movement');
      return null;
    } else {
      updatePlayer1Status();
    }
    console.log(`player1Status:${player1Status}`);
    console.log(`player2Status:${player2Status}`);
    isPlayer1Turn = false;
    updateButton(isPlayer1Turn, player1Btn, player2Btn);
  }

  function runPlayer2Turn(): void {
    const currentDicePoint = rollDice();
    showDiceResult(diceContainer, currentDicePoint);
    console.log(`Player 2 rolled: ${currentDicePoint}`);
    player2Status += currentDicePoint;

    if (player2Status >= 30) {
      console.log('Player 2 winner');
      return null;
    }

    if (currentDicePoint === 6) {
      updatePlayer2Status();
      console.log('Since you rolled 6, you got a Bonus movement');
      return null;
    } else {
      player2Status += currentDicePoint;
      updatePlayer2Status();
    }
    console.log(`player1Status:${player1Status}`);
    console.log(`player2Status:${player2Status}`);

    isPlayer1Turn = true;
    updateButton(isPlayer1Turn, player1Btn, player2Btn);
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
