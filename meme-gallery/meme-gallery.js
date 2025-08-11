function createGallery() {
  const images = getImages();
  let innerHTML = '';
  for (var i = 0; i < images.length; i++) {
    innerHTML += `<img src="../meme/${images[i].url}" onclick="chooseImg(${images[i].id})"/>`;
  }
  var elGallery = document.getElementById('gallery');
  elGallery.innerHTML = innerHTML;
}

function chooseImg(id) {
  saveToStorage(G_IMG_ID, id);
  window.location.href = '../index.html';
}
