import { escapeHtml as e } from '../dom.js';

export function courseCard(course) {
  return `
    <div class="col-lg-4 col-md-6">
      <div class="card card-custom">
        <img src="${e(course.image)}" class="card-img-top" alt="${e(course.title)}" loading="lazy">
        <div class="card-body">
          <h5 class="card-title">${e(course.title)}</h5>
          <b>${e(course.instructor)}</b>
          <p class="card-text card-text-fixed">${e(course.description)}</p>
          <div class="d-flex justify-content-between align-items-center mb-3">
            <span class="badge bg-primary-custom">${e(course.duration)}</span>
            <span class="text-primary-custom fw-bold">$${e(course.price)}</span>
          </div>
          <a class="btn btn-card w-100" href="course_details.html?course=${encodeURIComponent(course.id)}">View Details</a>
        </div>
      </div>
    </div>`;
}

export function roomCardCompact(room) {
  return `
    <div class="col-lg-6 col-md-6">
      <div class="card card-custom">
        <img src="${e(room.image)}" class="card-img-top" alt="${e(room.title)}" loading="lazy">
        <div class="card-body">
          <h5 class="card-title">${e(room.title)}</h5>
          <p class="card-text card-text-fixed">${e(room.description)}</p>
          <div class="mb-3 d-flex justify-content-between align-items-center">
            <span class="badge bg-tertiary-custom align-self-start">${e(room.capacity)} Capacity</span>
            <span class="d-none d-md-flex flex-wrap justify-content-center align-items-center gap-2 mx-2">
              ${room.features.map((feature) => `<span class="badge bg-primary-custom">${e(feature)}</span>`).join(' ')}
            </span>
            <div class="text-primary-custom fw-bold align-self-start">$${e(room.price)}/hour</div>
          </div>
          <a class="btn btn-card w-100" href="room_page.html?room=${encodeURIComponent(room.id)}">View Details</a>
        </div>
      </div>
    </div>`;
}

export function roomCard(room) {
  return `
    <div class="col-lg-6 col-md-6">
      <div class="card card-custom h-100">
        <img src="${e(room.image)}" class="card-img-top" alt="${e(room.title)}" loading="lazy">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${e(room.title)}</h5>
          <p class="card-text">${e(room.description)}</p>
          <div class="mb-3">
            <span class="badge bg-secondary-custom me-2">${e(room.capacity)} Capacity</span>
            ${room.features.slice(0, 2).map((feature, i) =>
              `<span class="badge ${i === 0 ? 'bg-tertiary-custom me-2' : 'bg-primary-custom'}">${e(feature)}</span>`).join('')}
          </div>
          <div class="text-primary-custom fw-bold mb-3">$${e(room.price)}/hour</div>
          <a class="btn btn-card w-100 mt-auto" href="room_page.html?room=${encodeURIComponent(room.id)}">
            Book Now <i class="fas fa-calendar-alt ms-1" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </div>`;
}
