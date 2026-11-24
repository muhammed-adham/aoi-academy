import { config } from './config.js';
import { storage } from './storage.js';

export const isLoggedIn = () => storage.get(config.storage.user) !== null;

export function signIn(email) {
  storage.setJSON(config.storage.user, { email });
}

export function signOut() {
  storage.remove(config.storage.user);
}

export function updateAuthUi() {
  const loggedIn = isLoggedIn();
  const set = (id, hidden) => {
    const element = document.getElementById(id);
    if (element) element.hidden = hidden;
  };
  set('authBtn', loggedIn);
  set('userBtn', !loggedIn);
  set('logoutBtn', !loggedIn);
}
