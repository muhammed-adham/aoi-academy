export function enhanceSelects(root = document) {

  const supportsOpenState = window.CSS && CSS.supports && CSS.supports('selector(:open)');

  root.querySelectorAll('select.form-control').forEach((select) => {
    if (select.parentElement.classList.contains('select-wrap')) return;

    const wrap = document.createElement('span');
    wrap.className = 'select-wrap';
    select.parentNode.insertBefore(wrap, select);
    wrap.appendChild(select);

    const chevron = document.createElement('i');
    chevron.className = 'fas fa-chevron-down select-chevron';
    chevron.setAttribute('aria-hidden', 'true');
    wrap.appendChild(chevron);

    if (supportsOpenState) return;
    const close = () => wrap.classList.remove('is-open');
    select.addEventListener('mousedown', () => wrap.classList.toggle('is-open'));
    select.addEventListener('change', close);
    select.addEventListener('blur', close);
    select.addEventListener('keydown', (event) => {
      if (['Escape', 'Enter', 'Tab'].includes(event.key)) close();
      else if (event.key === ' ' || (event.altKey && event.key === 'ArrowDown')) wrap.classList.add('is-open');
    });
  });
}
