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
  const divResults = document.getElementById('res_find');


  watch(form, 'processState', () => {
    const { processState } = form;

    switch (processState) {
      case 'sending':
        submit.textContent = '...';
        submit.disabled = true;
        input.disabled = true;
        break;
      case 'filling':
        submit.textContent = 'Find';
        submit.disabled = false;
        input.disabled = false;
        break;
      case 'finished':
        submit.textContent = 'Find';
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
    const { textSearch, countRes } = form;

    divResults.innerHTML = '';

    if (_.isEqual(links, [])) return;

    let strItems = '';

    links.forEach((item) => {
      strItems = `${strItems}
      <p>
          <a href="${item.link}" target="_blank">${item.title}</a><br>
          <small>${item.snippet}...</small><br>
          <span class="info">${countBytes(item.size)} (${countWords(item.wordcount)}) - ${format(new Date(item.timestamp), 'HH:mm, dd.MM.yyyy')}</span>
      </p>`;
    });

    divResults.innerHTML = `<p>Результат поиска "${textSearch}"<br>
      <small>(1-${countRes} из ${totalHits})</small></p>
      ${strItems}`;
  });
};

export default setWatches;
