var gMeme = {
  selectedImgId: -1,
  selectedLineIdx: -1,
  selectedMovableLineIdx: -1,
  lines: [],
};

var img;
var prevMousePos;

function drawImage() {
  gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width;
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}

function initGMeme() {
  const imgId = loadFromStorage(G_IMG_ID);

  if (!imgId) {
    window.location.href = 'meme-gallery/gallery.html';
  }

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
    drawImage(img);
  };
}

function addText() {
  gMeme.lines.push({
    txt: 'New text',
    size: 20,
    font: 'Arial',
    color: '#000000',
    //align: 'left',
    posX: gElCanvas.width / 3,
    posY: gElCanvas.height / (5 + gMeme.lines.length),
  });

  gMeme.selectedLineIdx = gMeme.lines.length - 1;

  renderText();
}

function renderText() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);

  drawImage();

  for (let i = 0; i < gMeme.lines.length; i++) {
    const line = gMeme.lines[i];

    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.fillStyle = line.color;
    line.txtWidth = gCtx.measureText(line.txt).width;

    if (gMeme.selectedLineIdx === i) {
      controlButtonsToggle(false);

      gCtx.strokeStyle = '#6a4884';
      gCtx.lineWidth = 1;
      gCtx.beginPath();
      gCtx.roundRect(
        line.posX,
        line.posY,
        line.txtWidth + line.size,
        -line.size - (line.size * 3) / 4,
        12
      );
      gCtx.stroke();
    }
    gCtx.fillText(
      line.txt,
      line.posX + line.size / 2,
      line.posY - line.size / 2,
      gElCanvas.width,
      gElCanvas.height
    );
  }

  if (gMeme.selectedLineIdx === -1) {
    controlButtonsToggle(true);
    document.getElementById('user-text').value = '';
    document.getElementById('text-clr').value = '#000000';

    document.getElementById('user-text').blur();
    return;
  }

  document.getElementById('user-text').value =
    gMeme.lines[gMeme.selectedLineIdx].txt;
  document.getElementById('text-clr').value =
  //   gMeme.lines[gMeme.selectedLineIdx].color;
  // document.getElementById('user-text').focus();
}

function controlButtonsToggle(active) {
  document.getElementById('delete-text').disabled = active;
  document.getElementById('user-text').disabled = active;
  document.getElementById('text-increase').disabled = active;
  document.getElementById('text-decrease').disabled = active;
  document.getElementById('color-choice').disabled = active;
  document.getElementById('alignLeft').disabled = active;
  document.getElementById('alignCenter').disabled = active;
  document.getElementById('alignRight').disabled = active;
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

function textAlign(dir) {
  if (gMeme.selectedLineIdx === -1) return;
  const textBoxSize =
    gMeme.lines[gMeme.selectedLineIdx].txtWidth +
    gMeme.lines[gMeme.selectedLineIdx].size;

  if (dir === 'L') gMeme.lines[gMeme.selectedLineIdx].posX = 0;
  if (dir === 'C')
    gMeme.lines[gMeme.selectedLineIdx].posX =
      gElCanvas.width / 2 - textBoxSize / 2;
  if (dir === 'R')
    gMeme.lines[gMeme.selectedLineIdx].posX = gElCanvas.width - textBoxSize;
  renderText();
}

function whatLineClicked(clickedPos) {
  for (var i = 0; i < gMeme.lines.length; i++) {
    var line = gMeme.lines[i];

    // chceking if clicked within line area
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
  const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend'];
  //* Gets the first touch point (could be multiple in touch event)
  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  };

  if (TOUCH_EVS.includes(ev.type)) {
    ev.preventDefault();
    /*
     * Calculate touch coordinates relative to canvas
     * position by subtracting canvas offsets (left and top) from page coordinates
     */
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    };
  }
  return pos;
}

function onDown(ev) {
  //* Get mouse/touch position relative to canvas
  const pos = getEvPos(ev);
  document.body.style.cursor = 'grabbing';

  // get information if clicked on line and what
  const lineIdx = whatLineClicked(pos);
  if (lineIdx === -1) return;
  gMeme.selectedMovableLineIdx = lineIdx;
}

function onUp(ev) {
  ev.preventDefault();
  document.body.style.cursor = 'grab';
  gMeme.selectedMovableLineIdx = -1;
  prevMousePos = null;
}

function onMove(ev) {
  if (gMeme.selectedMovableLineIdx === -1) return;

  const mousePos = getEvPos(ev);

  // if we have a previous position
  // calculate mouse difference and apply on drawed text position
  if (prevMousePos) {
    const dx = mousePos.x - prevMousePos.x;
    const dy = mousePos.y - prevMousePos.y;
    gMeme.lines[gMeme.selectedMovableLineIdx].posX += dx;
    gMeme.lines[gMeme.selectedMovableLineIdx].posY += dy;
  }

  // set previous position
  prevMousePos = mousePos;
  //* Redraw the canvas with updated circle position
  renderText();
}

function onCanvasClick(ev) {
  ev.preventDefault();

  const pos = getEvPos(ev);

  const lineIdx = whatLineClicked(pos);

  gMeme.selectedLineIdx = lineIdx;
  renderText();
}

function onDownloadImg(elLink) {
  const imgContent = gElCanvas.toDataURL('image/jpeg');
  elLink.href = imgContent;
}

function switchLine() {
  if (gMeme.lines.length === 0) return;

  gMeme.selectedLineIdx++;

  if (gMeme.selectedLineIdx === gMeme.lines.length) {
    gMeme.selectedLineIdx = 0;
  }

  renderText();
}

function deleteText() {
  if (gMeme.selectedLineIdx === -1) return;

  gMeme.lines.splice(gMeme.selectedLineIdx, 1);
  gMeme.selectedLineIdx = -1;
  renderText();
}

function onShareImg(ev) {
  ev.preventDefault();
  const canvasData = gElCanvas.toDataURL('image/jpeg');
  function onSuccess(uploadedImgUrl) {
    const url = encodeURIComponent(uploadedImgUrl);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`);
  }
  uploadImg(canvasData, onSuccess);
}

async function uploadImg(imgData, onSuccess) {
  const CLOUD_NAME = 'webify';
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
  const formData = new FormData();
  formData.append('file', imgData);
  formData.append('upload_preset', 'webify');
  try {
    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    onSuccess(data.secure_url);
  } catch (err) {
    console.log(err);
  }
}
