const utils = {
  getRandomNumber: size => Math.floor(Math.random() * size),
};

const renderShapesOnCanvas = (ctx, particle) => {
  switch (particle.shape) {
    case 'circle': {
      ctx.beginPath();
      ctx.arc(particle.xAxis, particle.yAxis, 5, 0, Math.PI * 2, true);
      ctx.fill();
      ctx.translate(particle.xAxis, particle.yAxis);
      break;
    }
    case 'rectangle': {
      ctx.translate(particle.xAxis, particle.yAxis);
      ctx.rotate((particle.rotate * Math.PI) / 180);
      ctx.fillRect(particle.xAxis, 0, 5, 10);
      break;
    }
    case 'line': {
      ctx.beginPath();
      ctx.moveTo(particle.xAxis, particle.yAxis);
      ctx.lineTo(particle.xAxis + 5, particle.yAxis + 10);
      ctx.lineWidth = 5;
      ctx.strokeStyle = particle.color;
      ctx.stroke();
      break;
    }
    case 'triangle': {
      ctx.beginPath();
      ctx.moveTo(particle.xAxis, particle.yAxis);
      ctx.lineTo(particle.xAxis + 10, particle.yAxis + 10);
      ctx.lineTo(particle.xAxis, particle.yAxis + 20);
      ctx.fill();
      break;
    }
    case 'square': {
      ctx.translate(particle.xAxis + 20, particle.yAxis + 15);
      ctx.rotate(particle.maxRotate);
      ctx.fillRect(-10, -10, 10, 10);
      ctx.restore();
      break;
    }
  }
};

const getRandomShape = config => ({
  xAxis: utils.getRandomNumber(window.innerWidth),
  yAxis: utils.getRandomNumber(window.innerHeight),
  shape: config.props[utils.getRandomNumber(config.props.length)],
  color: config.colors[utils.getRandomNumber(config.colors.length)],
  speed: utils.getRandomNumber(config.speed) + 5,
  rotate: utils.getRandomNumber(config.maxRotate),
});

const getConfettiShapes = config => {
  const shapes = [];

  for (let i = 0; i < config.maxShapes; i++) {
    shapes.push(getRandomShape(config));
  }

  return shapes;
};

const clearCanvas = (ctx, canvas) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const drawShapes = (shapes, ctx, canvas, config) => {
  clearCanvas(ctx, canvas);

  for (const shape of shapes) {
    if (shape.yAxis >= canvas.height) {
      shape.xAxis = utils.getRandomNumber(window.innerWidth);
      shape.yAxis = 0;
    }
    shape.yAxis = shape.yAxis + shape.speed;
    // shape.xAxis = shape.xAxis - 1;

    ctx.save();
    ctx.fillStyle = shape.color;
    renderShapesOnCanvas(ctx, shape);
    ctx.restore();
  }

  window.requestAnimationFrame(drawShapes.bind(null, shapes, ctx, canvas, config));
};

const renderConfettiAnimation = (config, canvas, ctx) => {
  const shapes = getConfettiShapes(config);
  drawShapes(shapes, ctx, canvas, config);
  // requestID = window.requestAnimationFrame(drawShapes.bind(null, shapes, ctx, canvas, config));
};

export const startConfetti = (config, canvas, ctx) => {
  /* stop any existing canvas animation */
  renderConfettiAnimation(config, canvas, ctx);
};
