var gImgs;
_createImgs();

var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'I sometimes eat Falafel',
      size: 20,
      color: 'red',
    },
  ],
};

function getText() {
  text = document.getElementById('user-text').value;
  textColor = document.getElementById('text-clr').value;
  gMeme.lines.txt = text;
  gMeme.lines.color = textColor;
  return gMeme.lines;
}

function getImageById(id) {
  return gImgs.find((img) => img.id === id);
}

function getImages() {
  return gImgs;
}

function _createImgs() {
  gImgs = [];
  for (var i = 1; i < 25; i++) {
    gImgs.push(_createImg(i));
  }
}

function _createImg(i) {
  return {
    id: i,
    url: `memes-img/${i}.jpg`,
    keywords: ['funny'],
  };
}
