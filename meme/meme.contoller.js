var gMeme = {
  selectedImgId: -1,
  selectedLineIdx: -1,
  selectedMovableLineIdx: -1,
  lines: [],
};

var img;

function renderImg() {
  gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width;
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}

function initGMeme() {
  const imgId = loadFromStorage(G_IMG_ID);
  gMeme.selectedImgId = imgId;
  gMeme.selectedLineIdx = -1;
  gMeme.lines = [];
}

function renderImage() {
  if (gMeme.selectedImgId === -1) return;

  const meme = getImageById(gMeme.selectedImgId);
  img = new Image();
  img.src = 'meme/' + meme.url;
  img.onload = () => {
    renderImg(img);
  };
}

function addText() {
  gMeme.lines.push({
    txt: 'New text',
    size: 20,
    font: 'Arial',
    color: '#000000',
    posX: gElCanvas.width / 3,
    posY: gElCanvas.height / 5,
  });
  gMeme.selectedLineIdx = gMeme.lines.length - 1;
  renderText();
}

function renderText() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);

  renderImg();

  let idx = 1;
  for (const line of gMeme.lines) {
    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.fillStyle = line.color;
    line.txtWidth = gCtx.measureText(line.txt).width;

    gCtx.fillText(
      line.txt,
      line.posX,
      line.posY,
      gElCanvas.width,
      gElCanvas.height
    );

    idx++;
  }

  if (gMeme.selectedLineIdx === -1) {
    document.getElementById('user-text').value = '';
    document.getElementById('text-clr').value = '#000000';

    document.getElementById('user-text').blur();
    return;
  }

  document.getElementById('user-text').value =
    gMeme.lines[gMeme.selectedLineIdx].txt;
  document.getElementById('text-clr').value =
    gMeme.lines[gMeme.selectedLineIdx].color;
  document.getElementById('user-text').focus();
}

function setText() {
  gMeme.lines[gMeme.selectedLineIdx].txt =
    document.getElementById('user-text').value;
  gMeme.lines[gMeme.selectedLineIdx].color =
    document.getElementById('text-clr').value;

  renderText();
}
function textSize(operator) {
  if (operator === '+' && gMeme.lines[gMeme.selectedLineIdx].size < 100) {
    gMeme.lines[gMeme.selectedLineIdx].size += 10;
  }

  if (operator === '-' && gMeme.lines[gMeme.selectedLineIdx].size > 10) {
    gMeme.lines[gMeme.selectedLineIdx].size -= 10;
  }
  renderText();
}

function whatLineClicked(clickedPos) {
  for (var i = 0; i < gMeme.lines.length; i++) {
    var line = gMeme.lines[i];
    if (
      clickedPos.x >= line.posX &&
      clickedPos.x <= line.posX + line.txtWidth &&
      clickedPos.y >= line.posY - line.size &&
      clickedPos.y <= line.posY
    )
      return i;
  }

  return -1;
}

function getEvPos(ev) {
  //* Gets the first touch point (could be multiple in touch event)
  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  };
  ev.preventDefault();
  /*
   * Calculate touch coordinates relative to canvas
   * position by subtracting canvas offsets (left and top) from page coordinates
   */
  pos = {
    x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
    y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
  };
  return pos;
}

function onDown(ev) {
  //* Get mouse/touch position relative to canvas
  const pos = getEvPos(ev);

  const lineIdx = whatLineClicked(pos);

  if (lineIdx === -1) return;
  gMeme.selectedMovableLineIdx = lineIdx;
}

function onUp(ev) {
  ev.preventDefault();
  gMeme.selectedMovableLineIdx = -1;
}

function onMove(ev) {
  if (gMeme.selectedMovableLineIdx === -1) return;
  const pos = getEvPos(ev);

  //* Calculate distance moved from drag start position
  const dx = pos.x - gMeme.lines[gMeme.selectedMovableLineIdx].posX;
  const dy = pos.y - gMeme.lines[gMeme.selectedMovableLineIdx].posY;
  gMeme.lines[gMeme.selectedMovableLineIdx].posX += dx;
  gMeme.lines[gMeme.selectedMovableLineIdx].posY += dy;

  //* Redraw the canvas with updated circle position
  renderText();
}

function onCanvasClick(ev) {
  ev.preventDefault();

  const pos = getEvPos(ev);

  const lineIdx = whatLineClicked(pos);

  if (lineIdx === -1) {
    gMeme.selectedLineIdx = -1;
    return;
  }

  gMeme.selectedLineIdx = lineIdx;
  renderText();
}

function onDownload(elLink) {
  const imgContent = gElCanvas.toDataURL('image/jpeg');
  elLink.href = imgContent;
}
