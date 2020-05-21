import _ from 'lodash';
import i18next from 'i18next';
import axios from 'axios';
import setWatches from './watches';
import resources from './locales';
import { translate } from './common';


const proxy = 'https://cors-anywhere.herokuapp.com';

const search = (url, text, countRes, state) => {
  const { form, find } = state;
  // console.log(state);
  axios.get(url, {
    params: {
      action: 'query',
      format: 'json',
      list: 'search',
      srlimit: form.countRes,
      srsearch: form.textSearch,
    },
  })
    .then((response) => {
      form.processState = 'finished';
      // console.log(response.data);
      find.totalHits = _.get(response.data, 'query.searchinfo.totalhits');
      find.links = _.get(response.data, 'query.search');
      // console.log(state);
    })
    .catch((err) => {
      form.processState = 'filling';

      console.log(err);
    });
};

const app = () => {
  const state = {
    form: {
      processState: 'filling',
      textSearch: '',
      countRes: 10,
      errors: [],
    },
    find: {
      // urlAPI: 'https://ru.wikipedia.org/w/api.php',
      // urlWiki: 'https://ru.wikipedia.org/wiki',
      links: [],
      totalHits: 0,
      errors: [],
    },
  };

  const form = document.getElementById('form');
  const input = document.getElementById('text_search');
  const selectCountRes = document.getElementById('select_count_res');
  const selectLang = document.getElementById('select_lang');

  input.addEventListener('input', (evt) => {
    state.form.processState = 'filling';
    state.form.textSearch = evt.target.value;
  });

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const textSearch = state.form.textSearch.trim();

    if (textSearch === '') return;

    state.form.processState = 'sending';
    // console.log(i18next.t('urlAPI'), i18next.t('urlWiki'));
    search(`${proxy}/${i18next.t('urlAPI')}`, textSearch, 10, state);
  });

  selectCountRes.addEventListener('change', (evt) => {
    state.form.countRes = evt.target.value;
  });

  selectLang.addEventListener('change', (evt) => {
    i18next.changeLanguage(evt.target.value)
      .then(translate);
  });

  i18next.init(
    {
      lng: 'ru',
      resources,
    },
  ).then((texts) => {
    translate(texts);
    setWatches(state, texts);
  });
};

export default app;
