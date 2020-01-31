const store = {
  getItem: (key, value = null) => window.localStorage.getItem(`${window.location.pathname}:${key}`) || value,
  setItem: (key, value) => window.localStorage.setItem(`${window.location.pathname}:${key}`, value),
};

export default store;
