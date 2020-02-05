const createStore = () => {
  const _r = (...args) => window.localStorage.getItem(...args);
  const _w = (...args) => window.localStorage.setItem(...args);

  const getItem = (key, value = null) =>
    _r(`${window.location.pathname}:${key}`) || value;

  const setItem = (key, value) =>
    _w(`${window.location.pathname}:${key}`, value);

  return {
    getItem,
    setItem,
  };
};

const store = createStore();

export default store;
