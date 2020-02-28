import { getRandomNumber } from './util/getRandomNumber';

interface ParticlesConfig {
  coordinateX: number;
  coordinateY: number;
  color: string;
}

const particle = (): ParticlesConfig => ({
  coordinateX: getRandomNumber(window.innerWidth),
  coordinateY: getRandomNumber(window.innerHeight),
  color: getRandomColor(),
});

function drawElement(context: CanvasRenderingContext2D, element: ParticlesConfig): void {
  const { coordinateX, coordinateY, color } = element;
  context.beginPath();
  context.moveTo(coordinateX, coordinateY);
  context.lineTo(coordinateX + 5, coordinateY + 10);
  context.lineWidth = 5;
  context.strokeStyle = color;
  context.stroke();
}

function getRandomColor(): string {
  const colors: string[] = ['#FF0000', '#FFFF00', '#00FF00', '#80FFFF', '#FF4000', '#FF00FF'];

  return colors[getRandomNumber(colors.length)];
}

function clearCanvas(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawConfetti(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
  clearCanvas(context, canvas);

  const elements: ParticlesConfig[] = [];
  const amount = 10;

  for (let i = 0; i < amount; i++) {
    elements.push(particle());
  }

  for (const element of elements) {
    if (element.coordinateY >= canvas.height) {
      element.coordinateX = getRandomNumber(window.innerWidth);
      element.coordinateY = 0;
    }

    context.save();
    context.fillStyle = element.color;

    drawElement(context, element);
    context.rotate(50);
    context.restore();
  }

  window.requestAnimationFrame(drawConfetti.bind(null, context, canvas));
}

export default drawConfetti;
