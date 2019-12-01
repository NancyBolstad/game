import { gameStorage } from '../index';
let dragged: HTMLElement;
let hasSelected: boolean = false;

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
  if ((event.target as HTMLElement).className === 'endZone') {
    (event.target as HTMLElement).style.background = 'purple';
  }
}
function handleDragLeave(event: DragEvent): void {
  if ((event.target as HTMLElement).className === 'startZone') {
    (event.target as HTMLElement).style.background = '';
  }
  if ((event.target as HTMLElement).className === 'endZone') {
    (event.target as HTMLElement).style.background = '';
  }
}

function handleDrop(event: DragEvent): void {
  // prevent default action (open as link for some elements)
  event.preventDefault();
  if (hasSelected && (event.target as HTMLElement).className == 'endZone') {
    alert('Only one character is allowed.');
    (event.target as HTMLElement).style.background = '';
  }
  // move dragged elem to the selected drop target
  if (!hasSelected && (event.target as HTMLElement).className == 'endZone') {
    (event.target as HTMLElement).style.background = '';
    dragged.parentNode.removeChild(dragged);
    (event.target as HTMLElement).appendChild(dragged);
    hasSelected = true;
    updateSelected();
  }
  if ((event.target as HTMLElement).className == 'startZone') {
    hasSelected = false;
    (event.target as HTMLElement).style.background = '';
    dragged.parentNode.removeChild(dragged);
    (event.target as HTMLElement).appendChild(dragged);
  }
}

function updateSelected(): void {
  if (window.location.toString().includes('select-player1')) {
    gameStorage.set('player1Name', `${dragged.getAttribute('key')}`);
  }

  if (window.location.toString().includes('select-player2')) {
    gameStorage.set('player2Name', `${dragged.getAttribute('key')}`);
  }
}

function handleDrag() {
  document.addEventListener('dragstart', handleDragStart);
  document.addEventListener('dragend', handleDragEnd);

  /* events fired on the drop targets */
  document.addEventListener('dragover', handleDragOver);

  document.addEventListener('dragenter', handleDragEnter);

  document.addEventListener('dragleave', handleDragLeave);

  document.addEventListener('drop', handleDrop);
}

export default handleDrag;
