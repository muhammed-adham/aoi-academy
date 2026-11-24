import { config } from './config.js';
import { storage } from './storage.js';

const ARABIC_LETTERS = /[؀-ۿ]/;
const normalize = (text) => String(text).replace(/\s+/g, ' ').trim();

const exact = {};
const lower = {};
const patterns = [];
const contexts = [];

function add(en, ar) {
  if (typeof en !== 'string' || typeof ar !== 'string' || !en.trim() || !ar.trim()) return;
  const key = normalize(en);
  exact[key] = ar;
  lower[key.toLowerCase()] = ar;
}

function addMap(map) {
  Object.keys(map).forEach((en) => add(en, map[en]));
}

function addObject(en, ar) {
  if (en == null || ar == null) return;
  if (typeof en === 'string' && typeof ar === 'string') {
    if (en.includes(' | ') && ar.includes(' | ')) {
      const a = en.split(' | ');
      const b = ar.split(' | ');
      if (a.length === b.length) {
        a.forEach((part, i) => add(part, b[i]));
        return;
      }
    }
    add(en, ar);
  } else if (Array.isArray(en) && Array.isArray(ar)) {
    en.forEach((item, i) => addObject(item, ar[i]));
  } else if (typeof en === 'object' && typeof ar === 'object') {
    Object.keys(ar).forEach((key) => {
      if (key !== 'ar') addObject(en[key], ar[key]);
    });
  }
}

function addPattern(regex, build) {
  patterns.push([regex, build]);
}

function addContext(selector, map) {
  contexts.push({ selector, map });
}

function lookup(key) {
  if (exact[key] != null) return exact[key];
  const low = key.toLowerCase();
  if (lower[low] != null) return lower[low];
  for (let i = 0; i < patterns.length; i++) {
    const match = key.match(patterns[i][0]);
    if (match) {
      const result = patterns[i][1](match, lookup);
      if (result != null) return result;
    }
  }
  return null;
}

function translate(text, element) {
  const key = normalize(text);
  if (!key) return null;
  if (element && element.closest) {
    for (let i = 0; i < contexts.length; i++) {
      if (contexts[i].map[key] != null && element.closest(contexts[i].selector)) return contexts[i].map[key];
    }
  }
  return lookup(key);
}

export const dictionary = { add, addMap, addObject, addPattern, addContext, translate };

let current = 'en';
const listeners = new Set();

export const getLanguage = () => current;
export const isArabic = () => current === 'ar';

export const locale = () => (isArabic() ? 'ar-EG' : 'en-US');

export function formatNumber(value, options) {
  return new Intl.NumberFormat(locale(), options).format(value);
}

export function t(en) {
  if (!isArabic()) return en;
  const ar = translate(en);
  return ar != null ? ar : en;
}

export function onLanguageChange(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

const translatedNodes = new Set();
const translatedAttributes = new Map();
const ATTRIBUTES = ['placeholder', 'alt', 'title', 'aria-label'];
const SKIP = 'script, style, textarea, [data-no-translate]';
const SKIP_ATTRIBUTES = '[data-no-translate]';

function translateTextNode(node) {
  const raw = node.nodeValue;
  if (!raw || !/\S/.test(raw) || ARABIC_LETTERS.test(raw)) return;
  if (node.parentElement && node.parentElement.closest(SKIP)) return;
  const ar = translate(raw, node.parentElement);
  if (ar == null) return;
  node.__aoiEnglish = raw;
  node.nodeValue = raw.match(/^\s*/)[0] + ar + raw.match(/\s*$/)[0];
  translatedNodes.add(node);
}

function translateAttributes(element) {
  if (element.closest && element.closest(SKIP_ATTRIBUTES)) return;
  ATTRIBUTES.forEach((attribute) => {
    const value = element.getAttribute(attribute);
    if (!value || ARABIC_LETTERS.test(value)) return;
    const ar = translate(value, element);
    if (ar == null) return;
    if (!translatedAttributes.has(element)) translatedAttributes.set(element, {});
    translatedAttributes.get(element)[attribute] = value;
    element.setAttribute(attribute, ar);
  });
}

export function translateTree(root) {
  if (!root) return;
  if (root.nodeType === Node.TEXT_NODE) {
    translateTextNode(root);
    return;
  }
  if (root.nodeType !== Node.ELEMENT_NODE) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) translateTextNode(node);
  translateAttributes(root);
  root.querySelectorAll('[placeholder],[alt],[title],[aria-label]').forEach(translateAttributes);
}

function restoreEnglish() {
  translatedNodes.forEach((node) => {
    if (node.isConnected && node.__aoiEnglish != null) node.nodeValue = node.__aoiEnglish;
  });
  translatedNodes.clear();
  translatedAttributes.forEach((attributes, element) => {
    Object.keys(attributes).forEach((name) => element.setAttribute(name, attributes[name]));
  });
  translatedAttributes.clear();
}

function translateTitle() {
  if (document.__aoiTitleEnglish == null) document.__aoiTitleEnglish = document.title;
  if (isArabic()) {
    if (ARABIC_LETTERS.test(document.title)) return;
    document.__aoiTitleEnglish = document.title;
    const ar = translate(document.title);
    if (ar != null) document.title = ar;
  } else if (document.__aoiTitleEnglish) {
    document.title = document.__aoiTitleEnglish;
  }
}

function applyToDocument() {
  if (isArabic()) translateTree(document.body);
  else restoreEnglish();
  translateTitle();
}

function watchForNewContent() {
  if (!window.MutationObserver) return;
  new MutationObserver((mutations) => {
    if (!isArabic()) return;
    mutations.forEach((m) => m.addedNodes.forEach(translateTree));
  }).observe(document.body, { childList: true, subtree: true });

  const titleElement = document.querySelector('title');
  if (titleElement) {
    new MutationObserver(() => {
      if (isArabic()) translateTitle();
    }).observe(titleElement, { childList: true });
  }
}

export function syncLanguageSwitch() {
  const toggle = document.getElementById('languageSwitch');
  if (toggle) toggle.checked = isArabic();
}

export function setLanguage(language, { persist = false } = {}) {
  current = language === 'ar' ? 'ar' : 'en';
  if (persist) storage.set(config.storage.language, current);

  const arabic = isArabic();
  document.documentElement.lang = current;
  document.documentElement.dir = arabic ? 'rtl' : 'ltr';
  document.body.classList.toggle('rtl', arabic);
  document.body.dir = arabic ? 'rtl' : 'ltr';
  syncLanguageSwitch();

  applyToDocument();
  listeners.forEach((callback) => callback(current));
}

export const savedLanguage = () => (storage.get(config.storage.language) === 'ar' ? 'ar' : 'en');

export function toggleLanguage() {
  const toggle = document.getElementById('languageSwitch');
  setLanguage(toggle && toggle.checked ? 'ar' : 'en', { persist: true });
}

watchForNewContent();
