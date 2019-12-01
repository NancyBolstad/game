class Draggable {
  container: HTMLElement;
  box: NodeListOf<HTMLElement>;

  constructor() {
    this.container = document.querySelector('.box__dragabble');
    this.box = document.querySelectorAll('.box');

    this._addEventListener();
  }

  _addEventListener() {
    this.box.forEach(element => {
      element.addEventListener('dragenter', this.dragenter);
      element.addEventListener('dragleave', this.dragleave);
      element.addEventListener('dragover', this.dragover);
      element.addEventListener('drop', this.drop);
    });

    this.container.addEventListener('dragstart', this.dragstart);
    this.container.addEventListener('dragend', this.dragend);
  }

  dragstart(event: DragEvent) {
    (event.target as HTMLElement).classList.add('drag_start');
    setTimeout(() => {
      (event.target as HTMLElement).classList.add('invisible');
    }, 0);
  }

  dragend(event: DragEvent) {
    (event.target as HTMLElement).classList.remove('invisible');
    (event.target as HTMLElement).classList.remove('drag_start');
  }

  dragenter(event: DragEvent) {
    event.preventDefault();

    (event.target as HTMLElement).classList.add('drag_enter');
  }

  dragleave(event: DragEvent) {
    (event.target as HTMLElement).classList.remove('drag_enter');
  }

  dragover(event: DragEvent) {
    event.preventDefault();
  }

  drop(event: DragEvent) {
    let container: HTMLElement = document.querySelector('.box__dragabble');
    (event.target as HTMLElement).classList.remove('drag_enter');
    container.append(container);
  }
}

export default Draggable;
