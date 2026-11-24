import { config } from './config.js';
import { storage } from './storage.js';
import { mark } from './timing.js';
import { syncLanguageSwitch } from './i18n.js';
import { updateAuthUi } from './auth.js';

const PARTS = [
  { id: 'header', url: 'components/header.html' },
  { id: 'footer', url: 'components/footer.html' },
];

const NAV_SECTIONS = {
  'course_details.html': 'courses.html',
  'course_enrollment.html': 'courses.html',
  'room_page.html': 'rooms.html',
  'booking.html': 'rooms.html',
};

const fileOf = (path) => {
  const file = (path || '').split(/[?#]/)[0].split('/').pop();
  return file === '' ? 'index.html' : file;
};

export function setActiveNav() {
  const page = fileOf(window.location.pathname);
  const section = NAV_SECTIONS[page] || page;

  document.querySelectorAll('.navbar-nav .nav-link').forEach((link) => {
    const target = fileOf(link.getAttribute('href'));
    link.classList.remove('active');
    link.removeAttribute('aria-current');
    if (target !== section) return;

    link.classList.add('active');
    if (target === page) {
      link.setAttribute('aria-current', 'page');
      link.addEventListener('click', (event) => event.preventDefault());
    } else {
      link.setAttribute('aria-current', 'true');
    }
  });
}

const cacheKey = (id) => config.storage.components + id;

function insert(id, html) {
  const element = document.getElementById(id);
  if (!element) return false;
  element.innerHTML = html;
  if (id === 'header') {
    setActiveNav();
    syncLanguageSwitch();
    updateAuthUi();
  }
  return true;
}

export function loadComponents() {
  let usedCache = false;
  PARTS.forEach(({ id }) => {
    const cached = storage.get(cacheKey(id));
    if (cached && insert(id, cached)) usedCache = true;
  });
  mark(usedCache ? 'header/footer inserted from cache' : 'no cached header/footer (first visit)');

  const hold = storage.get(cacheKey('header')) === null;

  const done = Promise.all(
    PARTS.map(({ id, url }) =>
      fetch(url)
        .then((response) => response.text())
        .then((html) => {
          const changed = html !== storage.get(cacheKey(id));
          if (changed) {
            storage.set(cacheKey(id), html);
            insert(id, html);
          }
          return changed;
        })
        .catch((error) => {
          console.error(`Could not load ${id}:`, error);
          return false;
        })
    )
  ).then((results) => {
    mark('header/footer fetched' + (results.some(Boolean) ? ' (changed, re-inserted)' : ' (unchanged)'));
  });

  return { hold, done };
}
