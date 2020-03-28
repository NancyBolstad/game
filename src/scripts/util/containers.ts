//page:select-player
export const characterList: HTMLElement = document.getElementById('startZone');
export const player1Selection: HTMLElement = document.getElementById('endZone1');
export const player2Selection: HTMLElement = document.getElementById('endZone2');
export const validateSelectionBtn: HTMLAnchorElement = document.querySelector('.cta--validation');

//page:game
export const board: HTMLElement = document.getElementById('gameBoard');
export const diceContainer: HTMLElement = document.getElementById('diceImage');
export const player1Btn: HTMLButtonElement = document.querySelector('.btn--Player1');
export const player2Btn: HTMLButtonElement = document.querySelector('.btn--Player2');
export const overlay: HTMLElement = document.getElementById('overlay');
export const message: HTMLElement = document.getElementById('message');

//page:winner
export const winnerContainer: HTMLElement = document.getElementById('winner');
export const congratulationMessage: HTMLElement = document.getElementById('congratulation');
export const resetBtn: HTMLElement = document.getElementById('reset');
export const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');

//page:about-us
export const nextSectionBtn: HTMLElement = document.getElementById('nextSection');
