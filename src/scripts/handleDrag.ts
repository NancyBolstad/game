import { gameStorage } from '../index';
let dragged: HTMLElement;

function handleDragStart(event: DragEvent): void {
  dragged = event.target as HTMLElement;
  (event.target as HTMLElement).style.opacity = '0.5';
}

function handleDragEnd(event: DragEvent): void {
  (event.target as HTMLElement).style.opacity = '';
}

function handleDragOver(event: DragEvent): void {
  event.preventDefault();
}

function handleDragEnter(event: DragEvent): void {
  if ((event.target as HTMLElement).id === 'startZone') {
    (event.target as HTMLElement).style.background = '#745625';
  }
  if ((event.target as HTMLElement).id === 'endZone1') {
    (event.target as HTMLElement).style.background = '#745625';
  }
  if ((event.target as HTMLElement).id === 'endZone2') {
    (event.target as HTMLElement).style.background = '#745625';
  }
}
function handleDragLeave(event: DragEvent): void {
  if ((event.target as HTMLElement).id === 'startZone') {
    (event.target as HTMLElement).style.background = '';
  }
  if ((event.target as HTMLElement).id === 'endZone1') {
    (event.target as HTMLElement).style.background = '';
  }
  if ((event.target as HTMLElement).id === 'endZone2') {
    (event.target as HTMLElement).style.background = '';
  }
}

function handleDrop(event: DragEvent): void {
  // prevent default action (open as link for some elements)
  event.preventDefault();

  // move dragged elem to the selected drop target
  if ((event.target as HTMLElement).id == 'endZone1') {
    if ((event.target as HTMLElement).hasChildNodes()) {
      alert('Only one character is allowed.');
      (event.target as HTMLElement).style.background = '';
      return null;
    }
    (event.target as HTMLElement).style.background = '';
    dragged.parentNode.removeChild(dragged);
    (event.target as HTMLElement).appendChild(dragged);
    gameStorage.set('player1Index', `${dragged.getAttribute('key')}`);
  }

  if ((event.target as HTMLElement).id == 'endZone2') {
    if ((event.target as HTMLElement).hasChildNodes()) {
      alert('Only one character is allowed.');
      (event.target as HTMLElement).style.background = '';
      return null;
    }
    (event.target as HTMLElement).style.background = '';
    dragged.parentNode.removeChild(dragged);
    (event.target as HTMLElement).appendChild(dragged);
    gameStorage.set('player2Index', `${dragged.getAttribute('key')}`);
  }

  if ((event.target as HTMLElement).id == 'startZone') {
    (event.target as HTMLElement).style.background = '';
    dragged.parentNode.removeChild(dragged);
    (event.target as HTMLElement).appendChild(dragged);
  }
}

function handleDrag(): void {
  document.addEventListener('dragstart', handleDragStart);
  document.addEventListener('dragend', handleDragEnd);
  document.addEventListener('dragover', handleDragOver);
  document.addEventListener('dragenter', handleDragEnter);
  document.addEventListener('dragleave', handleDragLeave);
  document.addEventListener('drop', handleDrop);
}

export default handleDrag;
