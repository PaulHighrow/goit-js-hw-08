import { galleryItems } from './gallery-items.js';

const galleryEl = document.querySelector('.gallery');

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
        <a class="gallery__link" href=${original}>
          <img class="gallery__image" src=${preview} alt=${description} data-source=${original}>
        </a>
      </li>`
    )
    .join('');
}

galleryEl.insertAdjacentHTML('afterbegin', createGalleryMarkup(galleryItems));

function onImageClick(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== 'IMG') {
    return;
  }

  const largeImage = basicLightbox.create(  
    // Спосіб з використанням дата-атрибуту source:
    `<img src="${evt.target.dataset.source}" alt=${evt.target.alt}>`,

    // Спосіб з використанням методу Element.closest() та Element.getAttribute():
    // `<img src="${evt.target.closest('.gallery__link').getAttribute('href')}">`,
    {
      onShow: () => document.addEventListener('keydown', onEscapeKeyPress),
      onClose: () => document.removeEventListener('keydown', onEscapeKeyPress),
    }
  );
  largeImage.show();

  function onEscapeKeyPress(evt) {
    if (evt.key === 'Escape') {
      largeImage.close();
    }
  }
}

galleryEl.addEventListener('click', onImageClick);
