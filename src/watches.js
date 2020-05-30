import { watch } from 'melanke-watchjs';
import _ from 'lodash';
import i18next from 'i18next';
import { format } from 'date-fns';
import { translate, countWords, countBytes } from './common';

const setWatches = (state, texts) => {
  const { find, form } = state;
  const input = document.getElementById('text_search');
  const submit = document.getElementById('btn_submit');
  const divAlert = document.getElementById('div_alert');
  const spinner = document.getElementById('spinner');
  const divResults = document.getElementById('res_find');
  const darkTheme = document.getElementById('dark_theme');
  const lightTheme = document.getElementById('light_theme');


  watch(form, 'processState', () => {
    const { processState } = form;
    const btnFindCaption = texts('btnFindCaption');

    switch (processState) {
      case 'sending':
        submit.textContent = '...';
        spinner.removeAttribute('hidden');
        submit.disabled = true;
        input.disabled = true;
        break;
      case 'filling':
        spinner.setAttribute('hidden', '');
        submit.textContent = btnFindCaption;
        submit.disabled = false;
        input.disabled = false;
        break;
      case 'finished':
        spinner.setAttribute('hidden', '');
        submit.textContent = btnFindCaption;
        input.value = '';
        submit.disabled = true;
        input.disabled = false;
        break;
      default:
        throw new Error(`Unknown processState form: ${processState}!`);
    }
  });

  watch(form, 'theme', () => {
    if (form.theme === 'light') {
      lightTheme.setAttribute('selected', '');
    } else {
      darkTheme.setAttribute('selected', '');
    }
    document.styleSheets[1].disabled = form.theme === 'light';
    document.styleSheets[2].disabled = form.theme === 'dark';
    document.cookie = `theme=${form.theme}`;
  });

  watch(form, 'lang', () => {
    i18next.changeLanguage(form.lang)
      .then((t) => {
        translate(t);
        document.cookie = `lang=${form.lang}`;
        const lang = document.getElementById(`${form.lang}_lang`);
        if (lang) {
          lang.setAttribute('selected', '');
        }
      });
  });

  watch(find, 'statusRequest', () => {
    if (find.statusRequest.status === 'bad') {
      divAlert.textContent = find.statusRequest.message;
      divAlert.removeAttribute('hidden');

      setTimeout(() => divAlert.setAttribute('hidden', ''), 5000);
    }
  });

  watch(find, 'links', () => {
    const { links, totalHits } = find;
    const { textSearch } = form;

    divResults.innerHTML = `<p>${texts('resultFind')} "${textSearch}"<br>
      <small>${texts('totalHits')} ${totalHits}</small></p>`;

    if (_.isEqual(links, [])) return;

    let strItems = '';

    links.forEach((item) => {
      strItems = `${strItems}
      <p>
          <a href="${texts('urlWiki')}/${item.title}" target="_blank">${item.title}</a><br>
          <small>${item.snippet}...</small><br>
          <span class="info">${countBytes(item.size, texts)} (${countWords(item.wordcount, texts)}) - ${format(new Date(item.timestamp), 'HH:mm, dd.MM.yyyy')}</span>
      </p>`;
    });

    divResults.innerHTML += strItems;
  });
};

export default setWatches;
