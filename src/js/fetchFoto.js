import axios from 'axios';
const API_KEY = '24539365-a9ec93e41963d169f0a4900c0';
const BASE_URL = 'https://pixabay.com/api/?key=';
// // https://pixabay.com/api/?key=24539365-a9ec93e41963d169f0a4900c0&q=yellow+flowers&image_type=photo

// export function fetchFoto(inputData) {
//   return fetch(`${BASE_URL}${API_KEY}&q=${inputData}&image_type=photo`).then(res => {
//     if (res.ok) {
//       return res.json();
//     }
//     throw Error(res.statusText);
//   });
// }

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchFotoRef() {
    const getAPI = await axios.get(
      `${BASE_URL}${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`,
    );
    this.incrementPage();
    return getAPI;
  }

  resetPage() {
    this.page = 1;
  }

  incrementPage() {
    this.page += 1;
  }

  decrementPage() {
    this.page -= 1;
  }
}
