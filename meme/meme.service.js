var gImgs;
_createImgs();

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
