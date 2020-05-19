import axios from 'axios';
import { parseListLinks, parseTotalHits } from './parseSearchWiki';
import setWatches from './watches';

const proxy = 'https://cors-anywhere.herokuapp.com';
const urlAPI = 'https://ru.wikipedia.org/w/api.php';

const search = (url, text, countRes, state) => {
  const { form, find } = state;
  // console.log(state);
  axios.get(url, {
    params: {
      action: 'query',
      format: 'xml',
      list: 'search',
      srlimit: form.countRes,
      srsearch: form.textSearch,
    },
  })
    .then((response) => {
      form.processState = 'finished';
      // console.log(response.data);
      find.totalHits = parseTotalHits(response.data);
      find.links = parseListLinks(response.data);
    })
    .catch((err) => {
      form.processState = 'filling';

      console.log(err);
    });
};

const app = () => {
  const state = {
    form: {
      processStete: 'filling',
      textSearch: '',
      countRes: 10,
      errors: [],
    },
    find: {
      links: [],
      totalHits: 0,
      errors: [],
    },
  };

  const form = document.getElementById('form');
  const input = document.getElementById('text_search');
  const selectCountRes = document.getElementById('select_count_res');

  input.addEventListener('input', (evt) => {
    state.form.processState = 'filling';
    state.form.textSearch = evt.target.value;
  });

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const textSearch = state.form.textSearch.trim();

    if (textSearch === '') return;

    state.form.processState = 'sending';

    search(`${proxy}/${urlAPI}`, textSearch, 10, state);
  });

  selectCountRes.addEventListener('onchange', (evt) => {
    console.log('assa');
  });

  setWatches(state);
};

export default app;
