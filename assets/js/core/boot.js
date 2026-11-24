import '../../i18n/ui.ar.js';
import { logSummaryOnLoad, mark } from './timing.js';
import { getLanguage, savedLanguage, setLanguage } from './i18n.js';
import { loadComponents } from './components.js';
import { initActions } from './actions.js';
import { enhanceSelects } from './ui/select.js';
import { initPageExtras } from './ui/page-extras.js';
import './forms.js';

mark('main modules loaded');

setLanguage(savedLanguage());
mark('language applied: ' + getLanguage());

const components = loadComponents();
initActions();
enhanceSelects();
initPageExtras();

function revealPage() {
  document.documentElement.classList.remove('lang-loading');
  mark('page revealed (loading screen removed)');
}

const domReady =
  document.readyState === 'loading'
    ? new Promise((resolve) => document.addEventListener('DOMContentLoaded', resolve, { once: true }))
    : Promise.resolve();

Promise.all([domReady, components.hold ? components.done : null]).then(revealPage);

window.addEventListener('pageshow', () => document.documentElement.classList.remove('lang-loading'));

logSummaryOnLoad(getLanguage);
