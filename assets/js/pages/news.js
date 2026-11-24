import '../core/boot.js';
import { $, $$, escapeHtml as e } from '../core/dom.js';
import { onClick } from '../core/actions.js';
import { getLanguage, isArabic, locale, onLanguageChange } from '../core/i18n.js';
import { createFilterPills } from '../core/ui/filter-pills.js';
import { createShowMore } from '../core/ui/show-more.js';
import { newsData } from '../../data/news.js';
import { newsAr } from '../../i18n/news.ar.js';
import { addDemoNews } from '../../data/demo.js';

addDemoNews(newsData, newsAr);

const TEXT = {
  en: {
    readFull: 'Read Full Article', showLess: 'Show Less', share: 'Share', tweet: 'Tweet', copyLink: 'Copy Link',
    copied: 'Copied!', checkOut: 'Check out:', read: (n) => `${n} min read`,
    photos: 'Photos', enlarge: 'Enlarge photo', prev: 'Previous photo', next: 'Next photo', closeViewer: 'Close',
    of: (i, n) => `Photo ${i} of ${n}`, viewPhotos: (n) => `View ${n} photos`, category: 'Show articles in this category',
  },
  ar: {
    readFull: 'قراءة المقال كاملًا', showLess: 'عرض أقل', share: 'مشاركة', tweet: 'تغريد', copyLink: 'نسخ الرابط',
    copied: 'تم النسخ!', checkOut: 'اطلع على:', read: (n) => `${n} دقائق للقراءة`,
    photos: 'الصور', enlarge: 'تكبير الصورة', prev: 'الصورة السابقة', next: 'الصورة التالية', closeViewer: 'إغلاق',
    of: (i, n) => `الصورة ${i} من ${n}`, viewPhotos: (n) => `عرض الصور (${n})`, category: 'عرض مقالات هذا التصنيف',
  },
};
const ui = () => TEXT[getLanguage()];
const number = (value) => new Intl.NumberFormat(locale()).format(value);

function tx(article, field) {
  const ar = isArabic() && newsAr[article.id];
  return ar && ar[field] ? ar[field] : article[field];
}

const formatDate = (date) =>
  new Date(date).toLocaleDateString(locale(), { year: 'numeric', month: 'short', day: 'numeric' });

function photosOf(article) {
  const ar = isArabic() && newsAr[article.id] && newsAr[article.id].images;
  return (article.images || []).map((image, i) => ({
    src: image.src,
    alt: (ar && ar[i] && ar[i].alt) || image.alt || '',
    caption: (ar && ar[i] && ar[i].caption) || image.caption || '',
  }));
}

const thumbSrc = (src) => src.replace(/([?&]w=)\d+/, (match, prefix) => prefix + '400');

function galleryHtml(article) {
  const photos = photosOf(article);
  if (!photos.length) return '';
  return `
    <div class="article-photos">
      <div class="article-photos-title"><i class="far fa-images" aria-hidden="true"></i>${ui().photos} (${number(photos.length)})</div>
      <div class="article-thumbs">
        ${photos.map((photo, i) => `
          <button type="button" class="article-thumb" aria-label="${e(ui().enlarge)}: ${e(photo.alt)}"
            data-action="open-lightbox" data-article="${article.id}" data-index="${i}">
            <img src="${e(thumbSrc(photo.src))}" alt="${e(photo.alt)}" loading="lazy" data-hide-on-error=".article-thumb">
            <span class="zoom-hint" aria-hidden="true"><i class="fas fa-magnifying-glass-plus"></i></span>
          </button>`).join('')}
      </div>
    </div>`;
}

function photosBadge(article) {
  const count = (article.images || []).length;
  if (!count) return '';
  const label = ui().viewPhotos(number(count));
  return `
    <span class="meta-divider" aria-hidden="true"></span>
    <button type="button" class="meta-item meta-photos d-flex align-items-center" data-action="open-lightbox"
      data-article="${article.id}" data-index="0" aria-label="${e(label)}" title="${e(label)}">
      <i class="far fa-images me-2" aria-hidden="true"></i><span>${number(count)}</span>
    </button>`;
}

const lightbox = { articleId: null, index: 0 };
const lightboxElement = $('#imageLightbox');

function paintLightbox() {
  const article = newsData.find((a) => String(a.id) === String(lightbox.articleId));
  if (!article) return;
  const photos = photosOf(article);
  const photo = photos[lightbox.index];
  $('#lightbox-img').src = photo.src;
  $('#lightbox-img').alt = photo.alt;
  $('#lightbox-caption-text').textContent = photo.caption;
  $('#lightbox-count').textContent = ui().of(number(lightbox.index + 1), number(photos.length));
  $('#lightbox-prev').setAttribute('aria-label', ui().prev);
  $('#lightbox-next').setAttribute('aria-label', ui().next);
  $('#lightbox-close').setAttribute('aria-label', ui().closeViewer);
  const single = photos.length < 2;
  $('#lightbox-prev').hidden = single;
  $('#lightbox-next').hidden = single;
}

function stepLightbox(direction) {
  const article = newsData.find((a) => String(a.id) === String(lightbox.articleId));
  const total = article ? (article.images || []).length : 0;
  if (!total) return;
  lightbox.index = (lightbox.index + direction + total) % total;
  paintLightbox();
}

onClick('open-lightbox', (button) => {
  lightbox.articleId = button.dataset.article;
  lightbox.index = Number(button.dataset.index);
  paintLightbox();
  window.bootstrap.Modal.getOrCreateInstance(lightboxElement).show();
});
onClick('step-lightbox', (button) => stepLightbox(Number(button.dataset.step)));

lightboxElement.addEventListener('show.bs.modal', () => document.body.classList.add('lightbox-open'));
lightboxElement.addEventListener('hidden.bs.modal', () => document.body.classList.remove('lightbox-open'));

document.addEventListener('keydown', (event) => {
  if (!lightboxElement.classList.contains('show')) return;
  const rtl = document.body.dir === 'rtl';
  if (event.key === 'ArrowRight') stepLightbox(rtl ? -1 : 1);
  if (event.key === 'ArrowLeft') stepLightbox(rtl ? 1 : -1);
});

document.addEventListener('error', (event) => {
  const image = event.target;
  const target = image.dataset && image.dataset.hideOnError;
  if (!target) return;
  const box = target === 'parent' ? image.parentElement : image.closest(target);
  if (box) box.hidden = true;
}, true);

function categoryTag(article) {
  if (!article.category) return '';
  return `<button type="button" class="meta-category" title="${e(ui().category)}" data-action="filter-category"
    data-category="${e(article.category)}">${e(article.category)}</button>`;
}

function articleHtml(article) {
  return `
    <article class="news-article mb-5 rounded-4 overflow-hidden card-custom p-4" id="article-${article.id}">
      <div class="article-top">
        ${article.image ? `
          <div class="article-photo">
            <img src="${e(article.image)}" alt="${e(tx(article, 'title'))}" loading="lazy" data-hide-on-error="parent">
          </div>` : ''}

        <div class="article-head">
          <h2 class="article-title fs-3" dir="auto">${e(tx(article, 'title'))}</h2>
          <div class="article-meta d-flex flex-wrap align-items-center">
            ${categoryTag(article)}
            <div class="meta-item d-flex align-items-center">
              <i class="fas fa-bookmark me-2" aria-hidden="true"></i><span>${e(tx(article, 'author'))}</span>
            </div>
            <div class="meta-item d-flex align-items-center">
              <i class="fas fa-calendar me-2" aria-hidden="true"></i><span>${formatDate(article.date)}</span>
            </div>
            ${photosBadge(article)}
          </div>
        </div>
      </div>

      <hr class="article-rule">

      <div class="article-text-area">
        <p class="article-excerpt text-muted" dir="auto">${e(tx(article, 'excerpt'))}</p>
        <div class="article-full-content" dir="auto">
          ${tx(article, 'content')}
          ${galleryHtml(article)}
        </div>
      </div>

      <hr class="article-rule">

      <div class="article-actions d-flex flex-wrap justify-content-between align-items-center gap-3">
        <button type="button" class="read-more-btn btn-card" data-action="toggle-article" data-id="${article.id}" aria-expanded="false"></button>

        <div class="article-share d-flex flex-wrap gap-2 justify-content-center">
          <a href="#" class="share-btn-article btn btn-primary" data-action="share-article" data-platform="facebook" data-id="${article.id}">
            <i class="fab fa-facebook-f me-2" aria-hidden="true"></i>${ui().share}</a>
          <a href="#" class="share-btn-article btn btn-primary" data-action="share-article" data-platform="twitter" data-id="${article.id}">
            <i class="fab fa-twitter me-2" aria-hidden="true"></i>${ui().tweet}</a>
          <a href="#" class="share-btn-article btn btn-primary" data-action="share-article" data-platform="linkedin" data-id="${article.id}">
            <i class="fab fa-linkedin me-2" aria-hidden="true"></i>${ui().share}</a>
          <a href="#" class="share-btn-article btn btn-primary" data-action="copy-article-link" data-id="${article.id}">
            <i class="fas fa-link me-2" aria-hidden="true"></i>${ui().copyLink}</a>
        </div>
      </div>
    </article>`;
}

const container = $('#news-container');

function renderNews(articles, { append }) {
  if (!append) container.innerHTML = '';
  container.insertAdjacentHTML('beforeend', articles.map(articleHtml).join(''));
  $$('.news-article', container).forEach(paintReadMore);
}

function paintReadMore(article) {
  const open = article.classList.contains('is-open');
  const button = $('.read-more-btn', article);
  button.setAttribute('aria-expanded', open ? 'true' : 'false');
  button.innerHTML = open
    ? `<i class="fas fa-chevron-up me-2" aria-hidden="true"></i>${ui().showLess}`
    : `<i class="fas fa-book-open me-2" aria-hidden="true"></i>${ui().readFull}`;
}

function setArticleOpen(id, open, { instant = false, flash = false } = {}) {
  const article = document.getElementById('article-' + id);
  if (!article) return;
  article.classList.toggle('is-open', open);
  paintReadMore(article);

  const hash = '#article-' + id;
  if (open) history.replaceState(null, '', window.location.pathname + window.location.search + hash);
  else if (window.location.hash === hash) history.replaceState(null, '', window.location.pathname + window.location.search);

  article.scrollIntoView({ behavior: instant ? 'auto' : 'smooth', block: 'start' });

  if (flash) {
    article.classList.remove('article-flash');
    void article.offsetWidth;
    article.classList.add('article-flash');
  }
}

onClick('toggle-article', (button) => {
  const article = document.getElementById('article-' + button.dataset.id);
  setArticleOpen(button.dataset.id, !article.classList.contains('is-open'));
});

const articleUrl = (id) => `${window.location.origin}${window.location.pathname}#article-${id}`;

onClick('share-article', (link, event) => {
  event.preventDefault();
  const article = newsData.find((a) => String(a.id) === link.dataset.id);
  if (!article) return;
  const text = `${ui().checkOut} ${tx(article, 'title')}`;
  const url = encodeURIComponent(articleUrl(article.id));
  const targets = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
  };
  if (targets[link.dataset.platform]) window.open(targets[link.dataset.platform], '_blank', 'noopener');
});

onClick('copy-article-link', (link, event) => {
  event.preventDefault();
  if (!navigator.clipboard) return;
  navigator.clipboard.writeText(articleUrl(link.dataset.id)).then(() => {
    const original = link.innerHTML;
    link.innerHTML = `<i class="fas fa-check me-2" aria-hidden="true"></i>${ui().copied}`;
    setTimeout(() => { link.innerHTML = original; }, 2000);
  });
});

const more = createShowMore({
  items: newsData,
  render: renderNews,
  anchor: container,
  initial: 6,
  step: 6,
});

function showNews(articles) {
  more.setItems([...articles].sort((a, b) => (new Date(b.date) - new Date(a.date)) || b.id - a.id));
}

const pills = createFilterPills({
  items: newsData,
  getValue: (article) => article.category,
  anchor: container,
  onChange: showNews,
});

onClick('filter-category', (button) => {
  pills.select(button.dataset.category);
  pills.wrap.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

function openArticleFromHash() {
  const match = window.location.hash.match(/^#article-(\d+)$/);
  if (!match) return;
  const id = match[1];
  let index = more.getItems().findIndex((a) => String(a.id) === id);
  if (index < 0 && newsData.some((a) => String(a.id) === id)) {
    pills.select('all');
    index = more.getItems().findIndex((a) => String(a.id) === id);
  }
  if (index >= 0) more.revealIndex(index);
  if (document.getElementById('article-' + id)) setArticleOpen(id, true, { instant: true, flash: true });
}

onLanguageChange(() => {
  if (!container.children.length) return;
  const open = $$('.news-article.is-open', container).map((article) => article.id);
  more.rerender();
  open.forEach((id) => {
    const article = document.getElementById(id);
    if (article) {
      article.classList.add('is-open');
      paintReadMore(article);
    }
  });
  if (lightboxElement.classList.contains('show')) paintLightbox();
});

openArticleFromHash();
window.addEventListener('load', openArticleFromHash);
window.addEventListener('hashchange', openArticleFromHash);
