function wrap(getStore) {
  return {
    get(key, fallback = null) {
      try {
        const value = getStore().getItem(key);
        return value === null ? fallback : value;
      } catch (error) {
        return fallback;
      }
    },
    set(key, value) {
      try {
        getStore().setItem(key, value);
        return true;
      } catch (error) {
        return false;
      }
    },
    remove(key) {
      try {
        getStore().removeItem(key);
      } catch (error) {

      }
    },
    getJSON(key, fallback = null) {
      try {
        const raw = getStore().getItem(key);
        return raw === null ? fallback : JSON.parse(raw);
      } catch (error) {
        return fallback;
      }
    },
    setJSON(key, value) {
      return this.set(key, JSON.stringify(value));
    },
  };
}

export const storage = wrap(() => window.localStorage);

export const session = wrap(() => window.sessionStorage);
