let gSavedMemes;

function initSavedMemes() {
  nav = document.getElementById('nav');

  const elSavedMemes = document.getElementById('saved-memes');

  gSavedMemes = loadFromStorage(G_SAVED_MEMES);

  if (!gSavedMemes || gSavedMemes.length === 0) {
    elSavedMemes.innerText = 'No memes saved yet, go ahead and create some!';
    return;
  }

  let innerHTML = '';
  for (var i = 0; i < gSavedMemes.length; i++) {
    innerHTML =
      innerHTML +
      `<div class="meme-conteiner"><button onclick="deleteSavedMeme(${i})">X</button><canvas onclick="onChooseMeme(${i})" id="meme-canvas-${i}" width="400" height="400"></canvas></div>`;
  }

  elSavedMemes.innerHTML = innerHTML;

  drawMemes();
}

function drawMemes() {
  for (let i = 0; i < gSavedMemes.length; i++) {
    const elCanvas = document.getElementById(`meme-canvas-${i}`);

    renderCanvasImage(gSavedMemes[i], elCanvas);
  }
}

function renderCanvasImage(meme, canvas) {
  const memeBackground = getImageById(meme.selectedImgId);

  const image = new Image();
  image.src = '../meme/' + memeBackground.url;

  image.onload = () => {
    drawCanvasImage(image, meme, canvas);
  };
}

function renderCanvasText(meme, canvas) {
  const ctx = canvas.getContext('2d');

  for (let i = 0; i < meme.lines.length; i++) {
    const line = meme.lines[i];

    ctx.font = `${line.size}px ${line.font}`;
    ctx.fillStyle = line.color;

    ctx.fillText(
      line.txt,
      line.posX + line.size / 2,
      line.posY - line.size / 2,
      canvas.width,
      canvas.height
    );
  }
}

function drawCanvasImage(image, meme, canvas) {
  const ctx = canvas.getContext('2d');

  canvas.height = (image.naturalHeight / image.naturalWidth) * canvas.width;
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  renderCanvasText(meme, canvas);
}

function onChooseMeme(index) {
  saveToStorage(G_MEME, gSavedMemes[index]);
  window.location.href = '../index.html';
}

function deleteSavedMeme(index) {
  gSavedMemes.splice(index, 1);

  saveToStorage(G_SAVED_MEMES, gSavedMemes);

  initSavedMemes();
}
