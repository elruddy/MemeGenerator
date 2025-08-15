var gImgs = [
  { id: 1, url: 'memes-img/1.jpg', keywords: ['woman', 'dancing'] },
  { id: 2, url: 'memes-img/2.jpg', keywords: ['man', 'funny'] },
  { id: 3, url: 'memes-img/3.jpg', keywords: ['love', 'animal'] },
  { id: 4, url: 'memes-img/4.jpg', keywords: ['baby', 'funny'] },
  { id: 5, url: 'memes-img/5.jpg', keywords: ['baby', 'animal'] },
  { id: 6, url: 'memes-img/6.jpg', keywords: ['animal'] },
  { id: 7, url: 'memes-img/7.jpg', keywords: ['man', 'funny'] },
  { id: 8, url: 'memes-img/8.jpg', keywords: ['baby', 'funny'] },
  { id: 9, url: 'memes-img/9.jpg', keywords: ['man'] },
  { id: 10, url: 'memes-img/10.jpg', keywords: ['man', 'funny'] },
  { id: 11, url: 'memes-img/11.jpg', keywords: ['man', 'funny'] },
  { id: 12, url: 'memes-img/12.jpg', keywords: ['man', 'funny'] },
  { id: 13, url: 'memes-img/13.jpg', keywords: ['baby', 'dancing', 'funny'] },
  { id: 14, url: 'memes-img/14.jpg', keywords: ['man', 'funny'] },
  { id: 15, url: 'memes-img/15.jpg', keywords: ['baby', 'funny'] },
  { id: 16, url: 'memes-img/16.jpg', keywords: ['animal', 'baby'] },
  { id: 17, url: 'memes-img/17.jpg', keywords: ['man', 'funny'] },
  { id: 18, url: 'memes-img/18.jpg', keywords: ['man', 'love'] },
  { id: 19, url: 'memes-img/19.jpg', keywords: ['man'] },
  { id: 20, url: 'memes-img/20.jpg', keywords: ['man'] },
  { id: 21, url: 'memes-img/21.jpg', keywords: ['man'] },
  { id: 22, url: 'memes-img/22.jpg', keywords: ['woman'] },
  { id: 23, url: 'memes-img/23.jpg', keywords: ['man', 'funny'] },
  { id: 24, url: 'memes-img/24.jpg', keywords: ['man'] },
];

function getImageById(id) {
  return gImgs.find((img) => img.id === id);
}

function getImages(keyWords = []) {
  return gImgs.filter((img) => {
    for (const keyword of img.keywords) {
      if (keyWords.includes(keyword)) return true;
    }

    return false;
  });
}
