let gElCanvas;
let gCtx;
let gLastPos;
let nav;

function onInit() {
  gElCanvas = document.querySelector('canvas');
  gCtx = gElCanvas.getContext('2d');
  nav = document.getElementById('nav');
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

function closeSideBar() {
  nav.classList.remove('show');
}

function openSideBar() {
  nav.classList.add('show');
}
