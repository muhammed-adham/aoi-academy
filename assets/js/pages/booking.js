import '../core/boot.js';
import { $, getParam } from '../core/dom.js';
import { onLanguageChange, t } from '../core/i18n.js';

const field = $('#selectedRoom');
const title = getParam('room');

if (field && title) {
  field.dataset.en = title;
  const show = () => { field.value = t(title); };
  show();
  onLanguageChange(show);
}
