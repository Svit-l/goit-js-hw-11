import './sass/main.scss';
// import './js/gallery';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import ImagesApiService from './js/fetchFoto';
import { getRefs } from './js/getRefs';
import { renderImg } from './js/renderImg';

const refs = getRefs();
const imagesApiService = new ImagesApiService();
refs.searchBtn.classList.add('is-hidden');

refs.searchForm.addEventListener('submit', onSearch);
refs.searchBtn.addEventListener('click', onSearchBtn);

async function onSearch(e) {
  e.preventDefault();
  imagesApiService.resetPage();
  imagesApiService.searchQuery = e.currentTarget.elements.query.value;
  refs.galleryWrap.innerHTML = '';

  if (imagesApiService.searchQuery === '') {
    refs.galleryWrap.innerHTML = '';
    refs.searchBtn.classList.add('is-hidden');
    return Notiflix.Notify.failure('Please enter your search data.');
  }
  await imagesApiService.fetchFotoRef().then(response => {
    const hitsImgLength = response.data.hits.length;
    if (hitsImgLength === 0) {
      refs.searchBtn.classList.add('is-hidden');
      refs.galleryWrap.innerHTML = '';
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
    }

    Notiflix.Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
    renderImg(response);
    refs.searchBtn.classList.remove('is-hidden');
  });
  e.target.reset();
}

async function onSearchBtn() {
  imagesApiService.fetchFotoRef().then(response => {
    const hitsImgLength = response.data.hits.length;
    console.log(hitsImgLength);
    if (hitsImgLength < 40) {
      refs.searchBtn.classList.add('is-hidden');
      Notiflix.Notify.success("We're sorry, but you've reached the end of search results.");
    }
    renderImg(response);
  });
}
