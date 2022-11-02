import { galleryItems } from './gallery-items.js';

const galleryEl = document.querySelector('.gallery');

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img class="gallery__image" src="${preview}" alt="${description}">
            </a>
        </li>`
    )
    .join('');
}

galleryEl.insertAdjacentHTML('afterbegin', createGalleryMarkup(galleryItems));

let simpleLightBoxGallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
