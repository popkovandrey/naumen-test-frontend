import _ from 'lodash';
import i18next from 'i18next';
import axios from 'axios';
import setWatches from './watches';
import resources from './locales';
import { translate, getCookie } from './common';
import './css/style.css';
import './css/dark.css';
import './css/light.css';
import './img/screenbrightness.ico';


const proxy = 'https://cors-anywhere.herokuapp.com';

const search = (url, text, countRes, state) => {
  const { form, find } = state;

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
      find.statusRequest = { status: 'success', message: '' };
      find.totalHits = _.get(response.data, 'query.searchinfo.totalhits');
      find.links = _.get(response.data, 'query.search');
    })
    .catch((err) => {
      form.processState = 'filling';
      find.statusRequest = { status: 'bad', message: err.message };
      console.log(err);
    });
};

const app = () => {
  const state = {
    form: {
      processState: 'filling',
      textSearch: '',
      countRes: 10,
      theme: 'light',
      lang: 'ru',
      errors: [],
    },
    find: {
      links: [],
      totalHits: 0,
      statusRequest: {},
    },
  };

  const form = document.getElementById('form');
  const input = document.getElementById('text_search');
  const selectCountRes = document.getElementById('select_count_res');
  const selectLang = document.getElementById('select_lang');
  const imgTheme = document.getElementById('img_theme');

  input.addEventListener('input', (evt) => {
    state.form.processState = 'filling';
    state.form.textSearch = evt.target.value;
  });

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const textSearch = state.form.textSearch.trim();

    if (textSearch === '') return;

    state.form.processState = 'sending';

    search(`${proxy}/${i18next.t('urlAPI')}`, textSearch, 10, state);
  });

  selectCountRes.addEventListener('change', (evt) => {
    state.form.countRes = evt.target.value;
  });

  selectLang.addEventListener('change', (evt) => {
    state.form.lang = evt.target.value;
  });

  document.addEventListener('DOMContentLoaded', () => {
    state.form.theme = getCookie('theme', 'light');
    state.form.lang = getCookie('lang', 'ru');
  });

  imgTheme.addEventListener('click', () => {
    state.form.theme = state.form.theme === 'light' ? 'dark' : 'light';
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
