import '../core/boot.js';
import { $, escapeHtml as e } from '../core/dom.js';
import { config } from '../core/config.js';
import { isLoggedIn } from '../core/auth.js';
import { storage } from '../core/storage.js';
import { courseCard } from '../core/ui/cards.js';
import { coursesData } from '../../data/courses.js';

const card = $('#profile-card');

if (isLoggedIn()) {
  const user = storage.getJSON(config.storage.user, {});
  card.innerHTML = `
    <div class="mb-3"><i class="fas fa-user-circle fa-4x text-primary-custom" aria-hidden="true"></i></div>
    <h2 class="h5 text-primary-custom">Your account</h2>
    <p class="text-muted mb-0">Signed in as <bdi dir="ltr">${e(user.email || '')}</bdi></p>`;
} else {
  card.innerHTML = `
    <div class="mb-3"><i class="fas fa-user-circle fa-4x text-primary-custom" aria-hidden="true"></i></div>
    <h2 class="h5 text-primary-custom">You are not signed in</h2>
    <p class="text-muted">Sign in to manage your account.</p>
    <a href="sign_in.html" class="btn btn-card">Sign In</a>`;
}

$('#courses_container').innerHTML = coursesData.slice(0, 3).map(courseCard).join('');
