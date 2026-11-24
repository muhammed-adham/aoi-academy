import '../core/boot.js';
import { $, $$, escapeHtml as e, getParam } from '../core/dom.js';
import { onClick } from '../core/actions.js';
import { t } from '../core/i18n.js';
import { roomsData } from '../../data/rooms.js';
import { addDemoRooms } from '../../data/demo.js';

addDemoRooms(roomsData);

const FALLBACK_IMAGE =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBBdmFpbGFibGU8L3RleHQ+Cjwvc3ZnPg==';

const state = { room: null, imageIndex: 0 };

const mainImage = $('#main-room-image');
const mainCard = $('#main-room-card');

const allImages = () => (state.room ? [state.room.image, ...(state.room.images || [])] : []);

function renderRoomList() {
  $('#rooms-container').innerHTML = roomsData
    .map((room) => {
      const current = state.room && state.room.id === room.id;
      return `
        <div class="room-item ${current ? 'removed' : ''}">
          <div class="row g-0">
            <div class="col-4 position-relative">
              <div class="room-image">
                <img src="${e(room.image)}" class="img-fluid w-100 h-100 room-item-img" alt="${e(room.title)}" loading="lazy">
              </div>
            </div>
            <div class="col-8">
              <div class="card-body p-3">
                <h3 class="card-title room-item-title mb-1">${e(room.title)}</h3>
                <div class="d-flex justify-content-between align-items-center">
                  <small class="text-muted">${e(room.category)}</small>
                  <small class="fw-bold text-success">$${e(room.price)}/day</small>
                </div>
                <div class="mt-2 d-flex justify-content-between align-items-center">
                  <small class="text-muted"><i class="fas fa-users me-1" aria-hidden="true"></i>${e(room.capacity)} people</small>
                  ${current ? '' : `<button type="button" class="btn btn-sm btn-primary" data-action="select-room" data-id="${e(room.id)}">View Details</button>`}
                </div>
              </div>
            </div>
          </div>
        </div>`;
    })
    .join('');
}

function renderGallery() {
  const images = allImages();
  $('#room-gallery').innerHTML =
    images.length > 1
      ? images
          .map(
            (src, i) => `
              <button type="button" class="gallery-thumb ${i === state.imageIndex ? 'active' : ''}"
                data-action="gallery-image" data-index="${i}" aria-label="Room view ${i + 1}">
                <img src="${e(src)}" alt="Room view ${i + 1}">
              </button>`
          )
          .join('')
      : '';
}

function showImage(index) {
  const images = allImages();
  if (index < 0 || index >= images.length) return;
  state.imageIndex = index;
  mainImage.src = images[index];
  $$('.gallery-thumb').forEach((thumb, i) => thumb.classList.toggle('active', i === index));
}

function showRoom(room) {
  state.room = room;
  state.imageIndex = 0;

  mainCard.style.opacity = '0.7';
  setTimeout(() => {
    mainImage.src = room.image;
    mainImage.alt = room.title;
    $('#main-room-title').textContent = room.title;
    $('#main-room-description').textContent = room.description;
    $('#main-room-features').innerHTML = room.features
      .map((feature) => `<span class="feature-tag">${e(feature)}</span>`)
      .join('');
    $('#main-room-details').innerHTML = `
      <div class="d-flex align-items-center mb-2">
        <i class="fas fa-tag feature-icon" aria-hidden="true"></i><span>${e(room.category)}</span>
      </div>
      <div class="d-flex align-items-center mb-2">
        <i class="fas fa-users feature-icon" aria-hidden="true"></i><span>Up to ${e(room.capacity)} people</span>
      </div>
      <div class="d-flex align-items-center">
        <i class="fas fa-dollar-sign feature-icon" aria-hidden="true"></i><span>$${e(room.price)} per day</span>
      </div>`;
    renderGallery();
    mainCard.style.opacity = '1';
  }, 200);

  renderRoomList();
}

function selectRoom(id) {
  const room = roomsData.find((r) => String(r.id) === String(id));
  if (!room) return;
  showRoom(room);

  if (window.innerWidth < 992) mainImage.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

onClick('select-room', (button) => selectRoom(button.dataset.id));
onClick('gallery-image', (button) => showImage(Number(button.dataset.index)));

onClick('book-room', () => {
  if (state.room) window.location.href = `booking.html?room=${encodeURIComponent(state.room.title)}`;
});

onClick('share-room', () => {
  const room = state.room;
  if (!room) return;
  const text =
    `Check out this amazing ${room.category.toLowerCase()}: ${room.title}\n` +
    `Capacity: ${room.capacity} people | Price: $${room.price}/day\n${room.description}`;

  if (navigator.share) {
    navigator.share({ title: `AOI Academy - ${room.title}`, text, url: window.location.href }).catch(() => {});
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => alert('📋 ' + t('Room details copied to clipboard!')));
  }
});

document.addEventListener('keydown', (event) => {
  if (event.ctrlKey || event.metaKey || event.altKey || /^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName)) return;
  if (!state.room) return;

  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    const step = event.key === 'ArrowRight' ? 1 : -1;
    const next = state.imageIndex + step;
    if (next >= 0 && next < allImages().length) {
      event.preventDefault();
      showImage(next);
    }
  }

  const number = parseInt(event.key, 10);
  if (number >= 1 && number <= roomsData.length) {
    event.preventDefault();
    selectRoom(number);
  }
});

let touchStartX = 0;
mainImage.addEventListener('touchstart', (event) => { touchStartX = event.changedTouches[0].screenX; });
mainImage.addEventListener('touchend', (event) => {
  const distance = event.changedTouches[0].screenX - touchStartX;
  if (Math.abs(distance) < 50) return;
  showImage(state.imageIndex + (distance < 0 ? 1 : -1));
});

document.addEventListener('error', (event) => {
  const image = event.target;
  if (image.tagName === 'IMG' && image.src !== FALLBACK_IMAGE) image.src = FALLBACK_IMAGE;
}, true);

renderRoomList();
const requested = roomsData.find((room) => String(room.id) === getParam('room'));
showRoom(requested || roomsData[0]);
