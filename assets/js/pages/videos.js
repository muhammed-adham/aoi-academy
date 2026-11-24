import '../core/boot.js';
import { $, $$, escapeHtml as e } from '../core/dom.js';
import { config } from '../core/config.js';
import { onClick } from '../core/actions.js';
import { session } from '../core/storage.js';
import { isArabic, onLanguageChange } from '../core/i18n.js';
import { createShowMore } from '../core/ui/show-more.js';
import { videosData } from '../../data/videos.js';
import { addDemoVideos } from '../../data/demo.js';

addDemoVideos(videosData);

const list = $('#videos-container');
const player = $('#main-video');
let currentVideoId = null;
let more = null;

function videoItem(video) {
  return `
    <div class="mb-4 video-entry">
      <div class="card video-item" data-action="select-video" data-video-id="${e(video.id)}">
        <div class="row g-0">
          <div class="col-4 position-relative">
            <img src="https://img.youtube.com/vi/${e(video.id)}/mqdefault.jpg" class="img-fluid rounded-start h-100 w-100 video-thumb"
              alt="${e(video.title)}" loading="lazy">
            <span class="video-duration position-absolute bottom-0 end-0 m-1">${e(video.duration)}</span>
          </div>
          <div class="col-8">
            <div class="card-body video-body">
              <h3 class="card-title h6 small" title="${e(video.title)}">${e(video.title)}</h3>
              <div class="video-meta d-flex justify-content-between align-items-center gap-2">
                <small class="text-muted">${e(video.category)}</small>
                <span class="yt-views" data-views-for="${e(video.id)}" data-state="loading">
                  <i class="fas fa-users" aria-hidden="true"></i><span class="yt-views-text">0 views</span>
                </span>
                <span class="yt-now">
                  <i class="fas fa-circle-play" aria-hidden="true"></i><span class="yt-now-text">Watching now</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

function renderVideos(videos, { append }) {
  if (!append) $$('.video-entry', list).forEach((entry) => entry.remove());

  const html = videos.map(videoItem).join('');
  if (more) more.wrap.insertAdjacentHTML('beforebegin', html);
  else list.insertAdjacentHTML('beforeend', html);
  markActive();
  paintAllViews();
}

function markActive() {
  $$('.video-item', list).forEach((item) => item.classList.toggle('active', item.dataset.videoId === currentVideoId));
}

function selectVideo(id, { scroll = false } = {}) {
  const video = videosData.find((v) => v.id === id);
  if (!video) return;
  currentVideoId = id;
  player.src = `https://www.youtube.com/embed/${encodeURIComponent(id)}`;
  $('#main-video-title').textContent = video.title;
  $('#main-video-description').textContent = video.description;
  markActive();
  paintAllViews();

  if (scroll && window.innerWidth < 992) player.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

onClick('select-video', (item) => selectVideo(item.dataset.videoId, { scroll: true }));

const VIEWS_CACHE_KEY = 'aoiYtViews';
const VIEWS_CACHE_MS = 10 * 60 * 1000;
const REFRESH_MS = 5 * 60 * 1000;

let views = null;

function formatViews(count) {
  const number = new Intl.NumberFormat(isArabic() ? 'ar' : 'en', { notation: 'compact', maximumFractionDigits: 1 }).format(count);
  return isArabic() ? `${number} مشاهدة` : `${number} ${count === 1 ? 'view' : 'views'}`;
}

function paintViews(element, id) {
  if (!element) return;
  if (views === null) {
    element.dataset.state = 'loading';
    return;
  }
  if (views === false || typeof views[id] !== 'number') {
    element.dataset.state = 'error';
    return;
  }
  element.dataset.state = 'ready';
  $('.yt-views-text', element).textContent = formatViews(views[id]);
  element.title = views[id].toLocaleString() + ' views';
}

function paintAllViews() {

  $$('[data-views-for]').forEach((element) => paintViews(element, element.dataset.viewsFor));
  paintViews($('#main-video-views'), currentVideoId);
}

async function loadViews() {
  if (!config.youtubeApiKey) {
    views = false;
    paintAllViews();
    return;
  }

  const cached = session.getJSON(VIEWS_CACHE_KEY);
  if (cached && Date.now() - cached.time < VIEWS_CACHE_MS) {
    views = cached.data;
    paintAllViews();
    return;
  }

  try {
    const ids = videosData.map((video) => video.id).join(',');
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${ids}&key=${config.youtubeApiKey}`
    );
    if (!response.ok) throw new Error('YouTube API ' + response.status);
    const json = await response.json();
    const map = {};
    (json.items || []).forEach((item) => {
      if (item.statistics && item.statistics.viewCount != null) map[item.id] = Number(item.statistics.viewCount);
    });
    views = map;
    session.setJSON(VIEWS_CACHE_KEY, { time: Date.now(), data: map });
  } catch (error) {
    console.error('Could not load YouTube views:', error);
    if (!views) views = false;
  }
  paintAllViews();
}

onLanguageChange(paintAllViews);

const normalize = (text) =>
  String(text || '')
    .toLowerCase()
    .replace(/[ً-ٰٟ]/g, '')
    .replace(/[أإآ]/g, 'ا')
    .trim();

function matches(video, words) {
  const ar = video.ar || {};
  const haystack = [video.title, video.description, video.category, ar.title, ar.description, ar.category]
    .map(normalize)
    .join(' ');
  return words.every((word) => haystack.includes(word));
}

const searchInput = $('#video-search');
const searchClear = $('#video-search-clear');
const searchEmpty = $('#videos-empty');

function applySearch() {
  const query = normalize(searchInput.value);
  searchClear.hidden = !query;
  const words = query ? query.split(/\s+/) : [];
  const results = words.length ? videosData.filter((video) => matches(video, words)) : videosData;
  more.setItems(results);
  searchEmpty.hidden = results.length > 0;
}

let searchTimer = null;
searchInput.addEventListener('input', () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(applySearch, 150);
});
searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && searchInput.value) {
    searchInput.value = '';
    applySearch();
  }
});
onClick('clear-search', () => {
  searchInput.value = '';
  applySearch();
  searchInput.focus();
});

more = createShowMore({
  items: videosData,
  render: renderVideos,
  anchor: list,
  inside: true,
  initial: 8,
  step: 8,
});
more.showNext();

selectVideo(videosData[0].id);

loadViews();
setInterval(() => {
  session.remove(VIEWS_CACHE_KEY);
  loadViews();
}, REFRESH_MS);
