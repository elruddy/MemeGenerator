var gKeyWords;
var userKeyWords = [];

function createGallery() {
  nav = document.getElementById('nav');
  loadKeywords();
  showKeyWords();
  createPictureGallery();
}

function showKeyWords() {
  let innerHTML = '<div class="keywords-container">';

  for (const keyWord of Object.keys(gKeyWords)) {
    innerHTML =
      innerHTML +
      `<h3  class='key' style='font-size: ${
        14 + gKeyWords[keyWord] * 2
      }px' onclick="toggleKeyWord(this, '${keyWord}')">${keyWord}</h3>`;
  }

  innerHTML = innerHTML + '</div>';
  const keyWordsEle = document.getElementById('keywords');
  keyWordsEle.innerHTML = innerHTML;
}

function toggleKeyWord(element, keyword) {
  let wordIndex = userKeyWords.indexOf(keyword);

  if (wordIndex === -1) {
    userKeyWords.push(keyword);
    element.classList.add('picked');
  } else {
    userKeyWords.splice(wordIndex, 1);
    element.classList.remove('picked');
  }

  createPictureGallery();
}

function createPictureGallery() {
  let keyWordsFilter = [];

  if (userKeyWords.length === 0) keyWordsFilter = Object.keys(gKeyWords);
  else keyWordsFilter = userKeyWords;

  const images = getImages(keyWordsFilter);
  let innerHTML = '';
  for (var i = 0; i < images.length; i++) {
    innerHTML += `<img src="../meme/${images[i].url}" onclick="chooseImg(${images[i].id})"/>`;
  }
  var elGallery = document.getElementById('gallery');
  elGallery.innerHTML = innerHTML;
}

function loadKeywords() {
  gKeyWords = loadFromStorage(G_KEY_WORDS);

  if (!gKeyWords) {
    gKeyWords = {
      man: 0,
      woman: 0,
      dancing: 0,
      funny: 0,
      love: 0,
      animal: 0,
      baby: 0,
    };
    saveToStorage(G_KEY_WORDS, gKeyWords);
  }
}

function chooseImg(id) {
  for (const keyWord of userKeyWords) {
    gKeyWords[keyWord]++;
  }

  saveToStorage(G_KEY_WORDS, gKeyWords);

  const meme = { selectedImgId: id, lines: [] };

  saveToStorage(G_MEME, meme);
  window.location.href = '../index.html';
}
