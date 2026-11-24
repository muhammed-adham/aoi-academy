import '../core/boot.js';
import { $ } from '../core/dom.js';
import { escapeHtml as e } from '../core/dom.js';
import { getLanguage, onLanguageChange } from '../core/i18n.js';
import { courseCard, roomCardCompact } from '../core/ui/cards.js';
import { coursesData } from '../../data/courses.js';
import { roomsData } from '../../data/rooms.js';
import { heroSlides } from '../../data/hero-slides.js';

$('#courses_container').innerHTML = coursesData.slice(0, 3).map(courseCard).join('');
$('#rooms_container').innerHTML = roomsData.map(roomCardCompact).join('');

function highlightFirstWord(text) {
  const [first, ...rest] = text.split(' ');
  return `<span class="text-secondary-custom">${e(first)}</span>${rest.length ? ' ' + e(rest.join(' ')) : ''}`;
}

function slideContent(slide, lang) {
  const arrow = lang === 'ar' ? 'left' : 'right';
  return `
    <div class="container">
      <div class="row">
        <div class="col-lg-8 hero-content">
          <h1>${highlightFirstWord(slide.title[lang])}</h1>
          <p>${e(slide.text[lang])}</p>
          <div class="d-flex flex-wrap gap-3">
            <a class="btn btn-primary-custom" href="${e(slide.primary.href)}">${e(slide.primary.label[lang])}
              <i class="fas fa-arrow-${arrow} ms-2" aria-hidden="true"></i></a>
            <a class="btn btn-outline-custom" href="${e(slide.secondary.href)}">${e(slide.secondary.label[lang])}</a>
          </div>
        </div>
      </div>
    </div>`;
}

const wrapper = $('#hero-slides');
wrapper.innerHTML = heroSlides
  .map((slide) => `<div class="swiper-slide hero"${slide.image ? ` style="--hero-bg: url('${e(slide.image)}')"` : ''}></div>`)
  .join('');
const slideElements = Array.from(wrapper.children);

function renderSlides(lang) {
  slideElements.forEach((element, i) => { element.innerHTML = slideContent(heroSlides[i], lang); });
}
renderSlides(getLanguage());

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const heroSwiper = new window.Swiper('.hero-slider', {
  rewind: true,
  effect: 'fade',
  fadeEffect: { crossFade: true },
  speed: 800,
  autoplay: reduceMotion ? false : { delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true },
  pagination: { el: '.hero-slider .swiper-pagination', clickable: true },
  navigation: { nextEl: '.hero-slider .swiper-button-next', prevEl: '.hero-slider .swiper-button-prev' },
  keyboard: { enabled: true },
});

onLanguageChange((lang) => {
  renderSlides(lang);
  heroSwiper.changeLanguageDirection(lang === 'ar' ? 'rtl' : 'ltr');
});
