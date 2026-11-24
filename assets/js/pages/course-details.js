import '../core/boot.js';
import { $, escapeHtml as e, getParam } from '../core/dom.js';
import { coursesData, getCourseById } from '../../data/courses.js';
import { addDemoCourses } from '../../data/demo.js';

addDemoCourses(coursesData);

const root = $('#course-root');
const course = getCourseById(getParam('course'));

function notFound() {
  root.innerHTML = `
    <div class="container text-center py-5 my-5">
      <i class="fas fa-search fa-3x text-primary-custom mb-3" aria-hidden="true"></i>
      <h1 class="h3">Course not found</h1>
      <p class="text-muted">The course you're looking for doesn't exist or was removed.</p>
      <a href="courses.html" class="btn btn-card">Browse all courses</a>
    </div>`;
  document.title = 'Course not found | AOI Academy';
}

function relatedCard(r) {
  return `
    <div class="col-md-4">
      <a href="course_details.html?course=${encodeURIComponent(r.id)}" class="text-decoration-none">
        <div class="card card-custom h-100">
          <img src="${e(r.image)}" class="card-img-top" alt="${e(r.title)}" loading="lazy">
          <div class="card-body">
            <h3 class="card-title h6">${e(r.title)}</h3>
            <div class="d-flex justify-content-between">
              <span class="badge bg-primary-custom">${e(r.duration)}</span>
              <span class="text-primary-custom fw-bold">$${e(r.price)}</span>
            </div>
          </div>
        </div>
      </a>
    </div>`;
}

function curriculumItem(module, i) {
  return `
    <div class="accordion-item">
      <h3 class="accordion-header">
        <button class="accordion-button ${i ? 'collapsed' : ''}" type="button" data-bs-toggle="collapse"
          data-bs-target="#m${i}" aria-expanded="${i ? 'false' : 'true'}" aria-controls="m${i}">
          <span class="cd-week">${i + 1}</span>${e(module.title)}
        </button>
      </h3>
      <div id="m${i}" class="accordion-collapse collapse ${i ? '' : 'show'}" data-bs-parent="#curriculum">
        <div class="accordion-body">
          <ul class="cd-bullets">${module.topics.map((topic) => `<li>${e(topic)}</li>`).join('')}</ul>
        </div>
      </div>
    </div>`;
}

function render(c) {
  document.title = `${c.title} | AOI Academy`;
  const enrollUrl = `course_enrollment.html?courseTitle=${encodeURIComponent(c.title)}`;

  const related = coursesData
    .filter((x) => x.id !== c.id)
    .sort((a, b) => (b.category === c.category) - (a.category === c.category))
    .slice(0, 3);

  root.innerHTML = `
    <section class="cd-hero">
      <div class="container">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-3">
            <li class="breadcrumb-item"><a href="index.html">Home</a></li>
            <li class="breadcrumb-item"><a href="courses.html">Courses</a></li>
            <li class="breadcrumb-item active" aria-current="page">${e(c.title)}</li>
          </ol>
        </nav>
        <span class="cd-category mb-3">${e(c.category)}</span>
        <h1 class="fw-bold mt-2">${e(c.title)}</h1>
        <p class="lead col-lg-8 px-0 opacity-75">${e(c.description)}</p>
        <div class="cd-meta">
          <span><i class="fas fa-user-tie" aria-hidden="true"></i>${e(c.instructor)}</span>
          <span><i class="fas fa-clock" aria-hidden="true"></i>${e(c.duration)} · ${e(c.hours)} hours</span>
          <span><i class="fas fa-signal" aria-hidden="true"></i>${e(c.level)}</span>
          <span><i class="fas fa-location-dot" aria-hidden="true"></i>${e(c.format)}</span>
        </div>
      </div>
    </section>

    <div class="container section cd-main pb-5">
      <div class="row g-4">
        <div class="col-lg-8">
          <img class="cd-image" src="${e(c.image)}" alt="${e(c.title)}">

          <div class="cd-panel">
            <h2 class="h4">What you'll learn</h2>
            <ul class="cd-check ps-0 mb-0 row">
              ${c.outcomes.map((o) => `<li class="col-md-6">${e(o)}</li>`).join('')}
            </ul>
          </div>

          <div class="cd-panel">
            <h2 class="h4">Course curriculum</h2>
            <p class="text-muted small mb-3">${c.curriculum.length} modules · ${e(c.duration)}</p>
            <div class="accordion" id="curriculum">${c.curriculum.map(curriculumItem).join('')}</div>
          </div>

          <div class="cd-panel">
            <div class="row g-4">
              <div class="col-md-6">
                <h2 class="h4">Who it's for</h2>
                <ul class="cd-check ps-0 mb-0">${c.audience.map((a) => `<li>${e(a)}</li>`).join('')}</ul>
              </div>
              <div class="col-md-6">
                <h2 class="h4">Requirements</h2>
                <ul class="cd-check ps-0 mb-0">${c.requirements.map((r) => `<li>${e(r)}</li>`).join('')}</ul>
              </div>
            </div>
          </div>

          <div class="cd-panel d-flex align-items-center gap-3">
            <div class="cd-avatar rounded-circle d-flex align-items-center justify-content-center bg-primary-custom text-white flex-shrink-0">
              <i class="fas fa-user-tie" aria-hidden="true"></i>
            </div>
            <div>
              <small class="text-muted">Your instructor</small>
              <h3 class="h5 mb-0">${e(c.instructor)}</h3>
              <span class="text-muted">${e(c.instructorRole)}</span>
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="cd-side">
            <div class="cd-panel mt-0 shadow-sm">
              <div class="cd-price">$${e(c.price)}</div>
              <small class="text-muted">One-time fee</small>
              <a href="${enrollUrl}" class="btn btn-card w-100 my-3">Enroll Now <i class="fas fa-arrow-right ms-2" aria-hidden="true"></i></a>
              <ul class="cd-facts p-0 mb-0">
                <li><span>Duration</span><span>${e(c.duration)} (${e(c.hours)} hrs)</span></li>
                <li><span>Level</span><span>${e(c.level)}</span></li>
                <li><span>Format</span><span>${e(c.format)}</span></li>
                <li><span>Schedule</span><span>${e(c.schedule)}</span></li>
                <li><span>Start</span><span>${e(c.startDate.replace('Next intake: ', ''))}</span></li>
                <li><span>Certificate</span><span>${e(c.certificate)}</span></li>
              </ul>
              <a href="contact.html" class="btn btn-outline-secondary w-100 mt-3">
                <i class="fa-solid fa-comments me-2" aria-hidden="true"></i>Have a question?
              </a>
            </div>
          </div>
        </div>
      </div>

      <h2 class="h4 mt-5 mb-3 text-primary-custom fw-bold">You may also like</h2>
      <div class="row g-4 cd-related">${related.map(relatedCard).join('')}</div>
    </div>

    <div class="cd-mobile-bar">
      <div><div class="fw-bold fs-5 text-primary-custom">$${e(c.price)}</div><small class="text-muted">${e(c.duration)}</small></div>
      <a href="${enrollUrl}" class="btn btn-card">Enroll Now</a>
    </div>`;
}

if (course) render(course);
else notFound();
