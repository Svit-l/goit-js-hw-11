import './sass/main.scss';
// import './js/gallery';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import FetchFoto from './js/fetchFoto';
import { getRefs } from './js/getRefs';
import renderImg from './js/renderImg';

const refs = getRefs();
const fetchFoto = new FetchFoto();
refs.searchBtn.classList.add('is-hidden');

refs.searchForm.addEventListener('submit', onSearch);
refs.searchBtn.addEventListener('click', onSearchMore);

async function onSearch(e) {
  e.preventDefault();
  fetchFoto.resetPage();
  fetchFoto.searchQuery = refs.formInput.value.trim();
  refs.gallery.innerHTML = '';

  if (fetchFoto.searchQuery === '') {
    refs.gallery.innerHTML = '';
    refs.searchBtn.classList.add('is-hidden');
    return Notiflix.Notify.failure('Please enter your search data.');
  }
  await fetchFoto.fetchFotoRef().then(response => {
    const hitsImgLength = response.data.hits.length;
    if (hitsImgLength === 0) {
      refs.searchBtn.classList.add('is-hidden');
      refs.gallery.innerHTML = '';
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

async function onSearchMore() {
  fetchFoto.fetchFotoRef().then(response => {
    const hitsImgLength = response.data.hits.length;
    // console.log(hitsImgLength);
    if (hitsImgLength < 40) {
      refs.searchBtn.classList.add('is-hidden');
      Notiflix.Notify.success("We're sorry, but you've reached the end of search results.");
    }
  });
}
