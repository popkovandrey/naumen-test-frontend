import { watch } from 'melanke-watchjs';
import _ from 'lodash';
import { format } from 'date-fns';
import { countWords, countBytes } from './common';

const setWatches = (state, texts) => {
  const { find, form } = state;
  const input = document.getElementById('text_search');
  const submit = document.getElementById('btn_submit');
  // const errorDiv = document.getElementById('err_div');
  // const divAlert = document.getElementById('div_alert');
  const spinner = document.getElementById('spinner');
  const divResults = document.getElementById('res_find');


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
