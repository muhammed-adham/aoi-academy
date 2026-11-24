import '../core/boot.js';
import { $, $$, escapeHtml as e } from '../core/dom.js';
import { instructors } from '../../data/instructors.js';

function instructorCard(person) {
  const [role, ...tags] = person.title.split('|').map((part) => part.trim());
  return `
    <div class="col-lg-4 col-md-6">
      <article class="instructor-card" tabindex="0">
        <img src="${e(person.image)}" class="instructor-avatar" alt="${e(person.name)}" loading="lazy">
        <h2 class="instructor-name">${e(person.name)}</h2>
        <p class="instructor-title">${e(role)}</p>
        <span class="instructor-hint" aria-hidden="true"><i class="fas fa-chevron-down"></i></span>
        <div class="instructor-details">
          ${tags.length ? `<div class="instructor-tags">${tags.map((tag) => `<span class="instructor-tag">${e(tag)}</span>`).join('')}</div>` : ''}
          <p class="instructor-bio">${e(person.bio)}</p>
          <a href="contact.html" class="instructor-cta"><i class="fas fa-envelope" aria-hidden="true"></i> Get in touch</a>
        </div>
      </article>
    </div>`;
}

$('#instructors-container').innerHTML = instructors.map(instructorCard).join('');

if (window.VanillaTilt && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.VanillaTilt.init($$('.instructor-card'), {
    max: 10,
    speed: 400,
    perspective: 1000,
    scale: 1.02,
    glare: true,
    'max-glare': 0.2,
  });
}
