import { formatNumber, onLanguageChange, t } from '../i18n.js';

export function createShowMore({ items: startItems, render, anchor, initial = 6, step = initial, inside = false }) {
  let items = startItems;
  let shown = 0;

  const wrap = document.createElement('div');
  wrap.className = 'show-more-wrap';
  wrap.innerHTML = `
    <p class="show-more-status" aria-live="polite" tabindex="-1"></p>
    <div class="show-more-progress" aria-hidden="true"><span></span></div>
    <button type="button" class="show-more-btn"></button>`;
  if (inside) anchor.appendChild(wrap);
  else anchor.insertAdjacentElement('afterend', wrap);

  const status = wrap.querySelector('.show-more-status');
  const bar = wrap.querySelector('.show-more-progress span');
  const button = wrap.querySelector('.show-more-btn');

  function updateLabels() {
    const total = items.length;
    const remaining = total - shown;

    wrap.style.display = total <= initial ? 'none' : '';
    status.textContent = t(`Showing ${shown} of ${total}`);
    bar.style.width = total ? `${(shown / total) * 100}%` : '0%';

    const buttonHadFocus = document.activeElement === button;
    button.hidden = remaining <= 0;
    button.innerHTML =
      `${t('Show more')} <span class="opacity-75">(${formatNumber(Math.min(step, remaining))})</span>` +
      ' <i class="fas fa-chevron-down ms-1" aria-hidden="true"></i>';

    if (buttonHadFocus && remaining <= 0) status.focus();
  }

  function showNext() {
    const batch = items.slice(shown, shown + (shown === 0 ? initial : step));
    if (!batch.length) return;
    render(batch, { append: shown > 0 });
    shown += batch.length;
    updateLabels();
  }

  function rerender() {
    render(items.slice(0, shown), { append: false });
    updateLabels();
  }

  function revealIndex(index) {
    while (shown <= index && shown < items.length) showNext();
  }

  function setItems(newItems) {
    items = newItems;
    shown = 0;
    render([], { append: false });
    showNext();
    updateLabels();
  }

  button.addEventListener('click', showNext);
  onLanguageChange(updateLabels);

  return { showNext, rerender, revealIndex, setItems, updateLabels, getItems: () => items, wrap };
}
