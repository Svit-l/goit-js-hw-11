// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
import { getRefs } from './getRefs';
const refs = getRefs();

export default function renderImg(images) {
  const imgArray = images.data.hits;
  const markupImgCard = imgArray
    .map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => {
      return `<li class="photo-card">
        <a class="gallery-item link" href=${largeImageURL}>
        <img class="gallery-img" src=${webformatURL} alt=${tags} loading="lazy" width="354" height="225" />
        </a>
        <ul class="info list">
            <li class="info-item">
                <b>Likes </br><span class='text'>${likes}</span></b>
            </li>
            <li class="info-item">
                <b>Views </br><span class='text'>${views}</span></b>
            </li>
            <li class="info-item">
                <b>Comments </br><span class='text'>${comments}</span></b>
            </li>
            <li class="info-item">
                <b>Downloads </br><span class='text'>${downloads}</span></b>
            </li>
        </ul>
    </li>`;
    })
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markupImgCard);

  let gallery = new SimpleLightbox('.gallery-wrap a');
  gallery.refresh();
}
