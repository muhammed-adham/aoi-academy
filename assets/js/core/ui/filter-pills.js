import { escapeHtml, getParam, setParam } from '../dom.js';
import { formatNumber, onLanguageChange } from '../i18n.js';

export function createFilterPills({ items, getValue, anchor, onChange, param = 'category' }) {

  const values = [];
  const counts = {};
  items.forEach((item) => {
    const value = getValue(item);
    if (value == null) return;
    if (!(value in counts)) {
      counts[value] = 0;
      values.push(value);
    }
    counts[value]++;
  });

  const wrap = document.createElement('div');
  wrap.className = 'filter-pills';
  wrap.setAttribute('role', 'group');
  wrap.setAttribute('aria-label', 'Filter by category');
  wrap.innerHTML = [['all', 'All', items.length]]
    .concat(values.map((value) => [value, value, counts[value]]))
    .map(
      ([value, label, count]) => `
        <button type="button" class="filter-pill" data-value="${escapeHtml(value)}" aria-pressed="false">
          <span class="pill-label">${escapeHtml(label)}</span><span class="pill-count">${count}</span>
        </button>`
    )
    .join('');
  anchor.insertAdjacentElement('beforebegin', wrap);

  const buttons = Array.from(wrap.querySelectorAll('.filter-pill'));
  let active = 'all';

  function updateCounts() {
    buttons.forEach((button) => {
      const value = button.dataset.value;
      button.querySelector('.pill-count').textContent = formatNumber(value === 'all' ? items.length : counts[value]);
    });
  }

  function select(value) {
    if (value !== 'all' && !(value in counts)) value = 'all';
    active = value;
    buttons.forEach((button) => {
      const on = button.dataset.value === value;
      button.classList.toggle('active', on);
      button.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    setParam(param, value === 'all' ? null : value);
    onChange(value === 'all' ? items : items.filter((item) => getValue(item) === value), value);
  }

  buttons.forEach((button) => button.addEventListener('click', () => select(button.dataset.value)));
  onLanguageChange(updateCounts);
  updateCounts();

  const fromAddress = getParam(param);
  select(fromAddress && fromAddress in counts ? fromAddress : 'all');

  return { select, updateCounts, wrap, getActive: () => active };
}
