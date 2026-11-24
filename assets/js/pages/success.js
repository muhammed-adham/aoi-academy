import '../core/boot.js';
import { $, escapeHtml as e } from '../core/dom.js';
import { config } from '../core/config.js';
import { session } from '../core/storage.js';
import { coursesData } from '../../data/courses.js';
import { roomsData } from '../../data/rooms.js';
import { addDemoCourses, addDemoRooms } from '../../data/demo.js';

addDemoCourses(coursesData);
addDemoRooms(roomsData);

const card = $('#ok-card');
const submission = session.getJSON(config.storage.submission);

const KINDS = {
  booking: {
    heading: 'Booking request received!',
    itemLabel: 'Room / Lab',
    next: 'to confirm availability and details',
    more: ['rooms.html', 'More rooms'],
  },
  enrollment: {
    heading: 'Enrollment submitted!',
    itemLabel: 'Course',
    next: 'with your enrollment details and next steps',
    more: ['courses.html', 'More courses'],
  },
  contact: {
    heading: 'Message sent!',
    itemLabel: 'Subject',
    next: 'to reply to your message',
    more: ['courses.html', 'More courses'],
  },
};

function renderEmpty() {
  card.innerHTML = `
    <div class="ok-icon ok-icon-empty"><i class="fas fa-inbox" aria-hidden="true"></i></div>
    <h1>Nothing submitted yet</h1>
    <p class="text-muted mb-4">There's no recent request to show. Browse our courses or rooms to get started.</p>
    <div class="d-flex flex-column flex-sm-row gap-2 justify-content-center">
      <a href="courses.html" class="btn btn-card">Browse Courses</a>
      <a href="index.html" class="btn btn-outline-secondary">Return Home</a>
    </div>`;
}

function render(data) {
  const kind = KINDS[data.type] || KINDS.enrollment;
  const rows = [[kind.itemLabel, data.item || '—']];
  if (data.type === 'booking' && data.date) rows.push(['Requested date', data.date + (data.time ? ' at ' + data.time : '')]);
  rows.push(['Confirmation sent to', data.email || '—']);

  card.innerHTML = `
    <div class="ok-icon"><i class="fas fa-check" aria-hidden="true"></i></div>
    <h1>${kind.heading}</h1>
    <p class="text-muted mb-0">
      ${data.name ? `<span>Thank you,</span> <b>${e(data.name)}</b>. ` : ''}<span>A confirmation email has been sent to</span>
      <b>${e(data.email || 'your inbox')}</b>.
    </p>

    <div class="ok-summary">
      ${rows.map(([label, value]) => `<div><span>${label}</span><span>${e(value)}</span></div>`).join('')}
    </div>

    <h2 class="h6 text-start fw-bold text-primary-custom">What happens next</h2>
    <ul class="ok-steps">
      <li><i class="fas fa-envelope" aria-hidden="true"></i><span>Check your inbox for the confirmation (and your spam folder, just in case).</span></li>
      <li><i class="fas fa-phone" aria-hidden="true"></i><span>Our team will contact you soon ${kind.next}.</span></li>
    </ul>

    <div class="d-flex flex-column flex-sm-row gap-2 justify-content-center">
      <a href="index.html" class="btn btn-card"><i class="fas fa-house me-2" aria-hidden="true"></i>Return Home</a>
      <a href="${kind.more[0]}" class="btn btn-outline-secondary">${kind.more[1]}</a>
    </div>`;
}

if (submission) render(submission);
else renderEmpty();
