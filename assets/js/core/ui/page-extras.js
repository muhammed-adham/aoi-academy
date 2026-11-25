import { onLanguageChange, t } from '../i18n.js';

export function initPageExtras() {

  const bar = document.createElement('div');
  bar.className = 'read-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const scrolled = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    bar.style.width = height > 0 ? `${(scrolled / height) * 100}%` : '0%';
  });

  const top = document.createElement('button');
  top.type = 'button';
  top.className = 'scroll-top';
  top.innerHTML = '<i class="fas fa-arrow-up" aria-hidden="true"></i>';
  const label = () => {
    top.setAttribute('aria-label', t('Back to top'));
    top.title = t('Back to top');
  };
  label();
  onLanguageChange(label);
  document.body.appendChild(top);

  const toggleTop = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    top.classList.toggle('is-visible', y > 400);
  };
  window.addEventListener('scroll', toggleTop, { passive: true });
  toggleTop();

  top.addEventListener('click', () => {
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    const id = link.getAttribute('href');
    if (id.length < 2) return;
    link.addEventListener('click', (event) => {
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}
