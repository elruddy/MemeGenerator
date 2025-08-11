function renderImg(img) {
  gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width;
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}

function renderImage() {
  const memeId = loadFromStorage('chosenMeme');
  const img = new Image();
  console.log(memeId);
  const meme = getImageById(memeId);
  img.src = 'meme/' + meme.url;
  img.onload = () => {
    renderImg(img);
  };
}

// var text;
// function getText() {
//   text = document.getElementById('user-text').value;
//   return text;
// }

function renderText() {
  gCtx.font = '30px Arial';
  gCtx.fillStyle = textColor;
  gCtx.fillText(
    text,
    gElCanvas.width / 3,
    gElCanvas.height / 5,
    gElCanvas.width,
    gElCanvas.height
  );
}

function createMeme(text, memeId) {
  gMeme.selectedImgId = memeId;
  gMeme.selectedLineIdx = 0;
  gMeme.lines[txt] = text;
}
