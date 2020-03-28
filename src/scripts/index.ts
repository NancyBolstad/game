import handleDrag from './handleDrag';
import { handleSelection } from './handleSelection';
import playGame from './playGame';
import getCharacterCards from './showCharacter';
import showWinner, { Winner as WinnerType } from './showWinner';
import characterIndex from './util/characterIndex';
import {
  board,
  characterList,
  diceContainer,
  resetBtn,
  validateSelectionBtn,
  winnerContainer,
  canvas,
  nextSectionBtn,
} from './util/containers';
import { createBoard, rollDice, showDiceResult } from './util/gameHelpers';
import Storage from './util/storage';
import drawConfetti from './drawConfetti';

export const gameStorage = new Storage();

if (characterList != null) {
  getCharacterCards(characterIndex);
  handleDrag();
  if (validateSelectionBtn != null)
    validateSelectionBtn.addEventListener('click', handleSelection, false);
}

if (board != null && diceContainer != null) {
  const player1: number = gameStorage.getUnserialize('player1Index');
  const player2: number = gameStorage.getUnserialize('player2Index');
  createBoard(board);
  showDiceResult(diceContainer, rollDice());

  if (player1 && player2) {
    playGame(player1, player2);
  }
}

if (winnerContainer != null) {
  const winner: WinnerType = gameStorage.getUnserialize('winner');
  showWinner(winner);
}

if (resetBtn != null) {
  resetBtn.addEventListener(
    'click',
    function() {
      gameStorage.delete('player1Index');
      gameStorage.delete('player2Index');
      gameStorage.delete('winner');
      window.location.href = 'select.html';
    },
    false,
  );
}

if (nextSectionBtn != null) {
  nextSectionBtn.addEventListener('click', function() {
    window.location.href = '#specialties';
  });
}

if (canvas != null) {
  const context = <CanvasRenderingContext2D>canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawConfetti(context, canvas);
}
