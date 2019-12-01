import { gameStorage } from '../index';
let dragged: HTMLElement;
let hasPlayer1Selected: boolean = false;
let hasPlayer2Selected: boolean = false;

function handleDragStart(event: DragEvent): void {
  // store a ref. on the dragged elem
  dragged = event.target as HTMLElement;
  // make it half transparent
  (event.target as HTMLElement).style.opacity = '0.5';
}

function handleDragEnd(event: DragEvent): void {
  (event.target as HTMLElement).style.opacity = '';
}

function handleDragOver(event: DragEvent): void {
  event.preventDefault();
}

function handleDragEnter(event: DragEvent): void {
  if ((event.target as HTMLElement).className === 'startZone') {
    (event.target as HTMLElement).style.background = 'purple';
  }
  if ((event.target as HTMLElement).className === 'endZone1') {
    (event.target as HTMLElement).style.background = 'purple';
  }
  if ((event.target as HTMLElement).className === 'endZone2') {
    (event.target as HTMLElement).style.background = 'purple';
  }
}
function handleDragLeave(event: DragEvent): void {
  if ((event.target as HTMLElement).className === 'startZone') {
    (event.target as HTMLElement).style.background = '';
  }
  if ((event.target as HTMLElement).className === 'endZone1') {
    (event.target as HTMLElement).style.background = '';
  }
  if ((event.target as HTMLElement).className === 'endZone2') {
    (event.target as HTMLElement).style.background = '';
  }
}

function handleDrop(event: DragEvent): void {
  // prevent default action (open as link for some elements)
  event.preventDefault();

  if (hasPlayer1Selected && (event.target as HTMLElement).className == 'endZone1') {
    alert('Only one character is allowed.');
    (event.target as HTMLElement).style.background = '';
  }

  if (hasPlayer2Selected && (event.target as HTMLElement).className == 'endZone2') {
    alert('Only one character is allowed.');
    (event.target as HTMLElement).style.background = '';
  }
  // move dragged elem to the selected drop target
  if (!hasPlayer1Selected && (event.target as HTMLElement).className == 'endZone1') {
    (event.target as HTMLElement).style.background = '';
    dragged.parentNode.removeChild(dragged);
    (event.target as HTMLElement).appendChild(dragged);
    gameStorage.set('player1Name', `${dragged.getAttribute('key')}`);
    hasPlayer1Selected = true;
  }

  if (!hasPlayer2Selected && (event.target as HTMLElement).className == 'endZone2') {
    (event.target as HTMLElement).style.background = '';
    dragged.parentNode.removeChild(dragged);
    (event.target as HTMLElement).appendChild(dragged);
    gameStorage.set('player2Name', `${dragged.getAttribute('key')}`);
    hasPlayer2Selected = true;
  }

  if ((event.target as HTMLElement).className == 'startZone') {
    (event.target as HTMLElement).style.background = '';
    dragged.parentNode.removeChild(dragged);
    (event.target as HTMLElement).appendChild(dragged);
    if ((hasPlayer1Selected = true)) hasPlayer1Selected = false;
    if ((hasPlayer2Selected = true)) hasPlayer2Selected = false;
    console.log(dragged);
  }
}

function handleDrag() {
  document.addEventListener('dragstart', handleDragStart);
  document.addEventListener('dragend', handleDragEnd);
  document.addEventListener('dragover', handleDragOver);
  document.addEventListener('dragenter', handleDragEnter);
  document.addEventListener('dragleave', handleDragLeave);
  document.addEventListener('drop', handleDrop);
}

export default handleDrag;
