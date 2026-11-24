import '../core/boot.js';
import { $ } from '../core/dom.js';
import { createFilterPills } from '../core/ui/filter-pills.js';
import { createShowMore } from '../core/ui/show-more.js';
import { roomCard } from '../core/ui/cards.js';
import { roomsData } from '../../data/rooms.js';
import { addDemoRooms } from '../../data/demo.js';

addDemoRooms(roomsData);

const container = $('#rooms_container');

const more = createShowMore({
  items: roomsData,
  render: (rooms, { append }) => {
    const html = rooms.map(roomCard).join('');
    if (append) container.insertAdjacentHTML('beforeend', html);
    else container.innerHTML = html;
  },
  anchor: container,
  initial: 6,
  step: 6,
});
more.showNext();

createFilterPills({
  items: roomsData,
  getValue: (room) => room.category,
  anchor: container,
  onChange: (filtered) => more.setItems(filtered),
});
