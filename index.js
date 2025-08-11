let gElCanvas;
let gCtx;
let gLastPos;

function onInit() {
  gElCanvas = document.querySelector('canvas');
  gCtx = gElCanvas.getContext('2d');
  resizeCanvas();

  initGMeme();
  renderImage();
}

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container');
  gElCanvas.width = elContainer.offsetWidth;
  gElCanvas.height = elContainer.offsetHeight;
  //window.addEventListener('resize', resizeCanvas);
}
