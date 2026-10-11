(() => {
  'use strict';
  const search = document.querySelector('#game-search');
  const cards = Array.from(document.querySelectorAll('.game-card'));
  const status = document.querySelector('#search-status');
  const empty = document.querySelector('#no-results');
  const reset = document.querySelector('#reset-search');

  function update() {
    const query = search.value.trim().toLocaleLowerCase();
    let found = 0;
    for (const card of cards) {
      const matches = card.dataset.search.includes(query);
      card.hidden = !matches;
      if (matches) found++;
    }
    empty.hidden = found !== 0;
    status.textContent = `${found} game${found === 1 ? '' : 's'} found`;
  }

  search.addEventListener('input', update);
  reset.addEventListener('click', () => {
    search.value = '';
    update();
    search.focus();
  });
})();
