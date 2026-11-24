import '../core/boot.js';
import { $ } from '../core/dom.js';
import { createFilterPills } from '../core/ui/filter-pills.js';
import { createShowMore } from '../core/ui/show-more.js';
import { courseCard } from '../core/ui/cards.js';
import { coursesData } from '../../data/courses.js';
import { addDemoCourses } from '../../data/demo.js';

addDemoCourses(coursesData);

const container = $('#courses_container');

const more = createShowMore({
  items: coursesData,
  render: (courses, { append }) => {
    const html = courses.map(courseCard).join('');
    if (append) container.insertAdjacentHTML('beforeend', html);
    else container.innerHTML = html;
  },
  anchor: container,
  initial: 9,
  step: 9,
});
more.showNext();

createFilterPills({
  items: coursesData,
  getValue: (course) => course.category,
  anchor: container,
  onChange: (filtered) => more.setItems(filtered),
});
