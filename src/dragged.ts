import { gameStorage } from './index';
var dragged: HTMLElement;
var hasSelected: boolean;

document.addEventListener(
  'dragstart',
  function(event: DragEvent) {
    // store a ref. on the dragged elem
    dragged = event.target as HTMLElement;
    // make it half transparent
    (event.target as HTMLElement).style.background = 'yellow';
  },
  false,
);
document.addEventListener(
  'dragend',
  function(event: DragEvent) {
    // reset the transparency
    (event.target as HTMLElement).style.background = 'black';
  },
  false,
);
/* events fired on the drop targets */
document.addEventListener(
  'dragover',
  function(event: DragEvent) {
    // prevent default to allow drop
    event.preventDefault();
  },
  false,
);
document.addEventListener(
  'dragenter',
  function(event: DragEvent) {
    // highlight potential drop target when the draggable element enters it
    if ((event.target as HTMLElement).className == 'dropzone1') {
      (event.target as HTMLElement).style.background = 'purple';
    }
    if ((event.target as HTMLElement).className == 'dropzone2') {
      (event.target as HTMLElement).style.background = 'purple';
    }
  },
  false,
);
document.addEventListener(
  'dragleave',
  function(event: DragEvent) {
    // reset background of potential drop target when the draggable element leaves it
    if ((event.target as HTMLElement).className == 'dropzone1') {
      (event.target as HTMLElement).style.background = '';
    }
    if ((event.target as HTMLElement).className == 'dropzone2') {
      (event.target as HTMLElement).style.background = '';
    }
  },
  false,
);
document.addEventListener(
  'drop',
  function(event) {
    // prevent default action (open as link for some elements)
    event.preventDefault();
    if (hasSelected && (event.target as HTMLElement).className == 'dropzone2') {
      alert('Only one character is allowed.');
    }
    // move dragged elem to the selected drop target
    if (!hasSelected && (event.target as HTMLElement).className == 'dropzone2') {
      (event.target as HTMLElement).style.background = '';
      dragged.parentNode.removeChild(dragged);
      (event.target as HTMLElement).appendChild(dragged);
      const character = dragged.getAttribute('key');
      console.log(`helloe ${character}`);
      gameStorage.set('player1Name', `${character}`);
      hasSelected = true;
    }
    if ((event.target as HTMLElement).className == 'dropzone1') {
      hasSelected = false;
      (event.target as HTMLElement).style.background = '';
      dragged.parentNode.removeChild(dragged);
      (event.target as HTMLElement).appendChild(dragged);
    }
  },
  false,
);
