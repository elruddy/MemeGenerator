let gElCanvas;
let gCtx;

function onInit() {
  gElCanvas = document.querySelector('canvas');
  gCtx = gElCanvas.getContext('2d');
  resizeCanvas();
  console.log(gMeme);
  renderImage();
}

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container');
  gElCanvas.width = elContainer.offsetWidth;
  gElCanvas.height = elContainer.offsetHeight;
  //window.addEventListener('resize', resizeCanvas);
}
