import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchPictures } from './fetchFoto';
import axios from 'axios';
import { getRefs } from './getRefs';
const refs = getRefs();

const DEBOUNCE_DELAY = 300;

// const URL = 'https://pixabay.com/api/?key=' + API_KEY + '&q=' + encodeURIComponent('red roses');
// $.getJSON(URL, function (data) {
//   if (parseInt(data.totalHits) > 0)
//     $.each(data.hits, function (i, hit) {
//       console.log(hit.pageURL);
//     });
//   else console.log('No hits');
// });
refs.searchForm.addEventListener('input', evt => {
  refs.searchBtn.removeAttribute('disabled');
});

refs.searchForm.addEventListener('submit', evt => {
  evt.preventDefault();
  console.log(refs.formInput.value.trim());
  refs.searchBtn.setAttribute('disabled', 'true');
  debounce(inputHandling, DEBOUNCE_DELAY);
});

function inputHandling() {
  const inputData = refs.formInput.value.trim();
  console.log(inputData);
  if (inputData !== '') {
    fetch(
      'https://pixabay.com/api/?key=24539365-a9ec93e41963d169f0a4900c0&q=yellow+flowers&image_type=photo',
    )
      // return fetch(`${BASE_URL}/api/?key=${API_KEY}&q=${inputData}&image_type=photo`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw Error(res.statusText);
      })
      // fetchFoto(inputData)
      .then(console.log(inputData))
      .catch(error => {
        Notify.failure(`Oops, there is no country with that name`, {
          width: '200px',
          position: 'center-top',
          distance: '20px',
          opacity: 1,
        });
      });
  }
  //   refs.countryList.innerHTML = '';
  //   refs.countryInfo.innerHTML = '';
}

// function fetchFoto(inputData) {
//   return (
//     fetch(
//       'https://pixabay.com/api/?key=24539365-a9ec93e41963d169f0a4900c0&q=yellow+flowers&image_type=photo',
//     )
//       // return fetch(`${BASE_URL}/api/?key=${API_KEY}&q=${inputData}&image_type=photo`)
//       .then(res => {
//         if (res.ok) {
//           return res.json();
//         }
//         throw Error(res.statusText);
//       })
//   );
// }
