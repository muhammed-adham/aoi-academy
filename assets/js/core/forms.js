import { config } from './config.js';
import { session } from './storage.js';
import { signIn, signOut } from './auth.js';
import { t, toggleLanguage } from './i18n.js';
import { onChange, onClick, onSubmit } from './actions.js';

const valueOf = (id) => (document.getElementById(id) || {}).value || '';

const englishValueOf = (id) => {
  const field = document.getElementById(id);
  return (field && field.dataset.en) || valueOf(id);
};

function goToSuccess(summary) {
  session.setJSON(config.storage.submission, summary);
  window.location.href = 'success.html';
}

onChange('toggle-language', () => toggleLanguage());

onClick('logout', () => {
  signOut();
  alert(t('Successfully logged out!'));
  window.location.href = 'index.html';
});

onSubmit('sign-in', (form, event) => {
  event.preventDefault();
  const email = valueOf('signinEmail');
  if (!email || !valueOf('signinPassword')) return;
  signIn(email);
  alert(t('Successfully signed in!'));
  window.location.href = 'index.html';
});

onSubmit('sign-up', (form, event) => {
  event.preventDefault();
  if (valueOf('signupPassword') !== valueOf('confirmPassword')) {
    alert(t('Passwords do not match!'));
    return;
  }
  signIn(valueOf('signupEmail'));
  alert(t('Account created successfully!'));
  window.location.href = 'index.html';
});

onSubmit('enrollment', (form, event) => {
  event.preventDefault();
  goToSuccess({
    type: 'enrollment',
    name: valueOf('enrollFirstName'),
    email: valueOf('enrollEmail'),
    item: englishValueOf('selectedCourse'),
  });
});

onChange('toggle-user-type', (toggle) => {
  const outside = toggle.checked;
  document.getElementById('userTypeLabel').textContent = outside ? 'Outside AOI' : 'Inside AOI';
  document.getElementById('insideCompanyFields').classList.toggle('hidden', outside);
  document.getElementById('outsideCompanyFields').classList.toggle('hidden', !outside);

  ['college', 'direction'].forEach((id) => { document.getElementById(id).required = outside; });
  ['fileNumber', 'workSection'].forEach((id) => { document.getElementById(id).required = !outside; });
});

onSubmit('booking', (form, event) => {
  event.preventDefault();
  goToSuccess({
    type: 'booking',
    name: valueOf('bookingFirstName'),
    email: valueOf('bookingEmail'),
    item: englishValueOf('selectedRoom'),
    date: valueOf('bookingDate'),
    time: valueOf('bookingTime'),
  });
});

onSubmit('contact', (form, event) => {
  event.preventDefault();
  goToSuccess({
    type: 'contact',
    name: valueOf('firstName'),
    email: valueOf('email'),
    item: valueOf('subject'),
  });
});
