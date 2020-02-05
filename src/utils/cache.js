const createCache = () => {
  const _r = (...args) => window.sessionStorage.getItem(...args);
  const quota = 1024 * 1024 * 4; // 5MB actually
  const _w = (...args) => {
    const used = unescape(encodeURIComponent(JSON.stringify(sessionStorage)))
      .length;
    if (used > quota) {
      window.sessionStorage.clear();
    }
    window.sessionStorage.setItem(...args);
  };
  const _d = (...args) => window.sessionStorage.removeItem(...args);
  const _objKey = (key) => `${window.location.pathname}:${key}`;
  const _expKey = (key) => `${window.location.pathname}:${key}:expires`;
  const _hour = 1000 * 60 * 60;

  const removeItem = (key) => {
    _d(_objKey(key));
    _d(_expKey(key));
  };

  const hasItem = (key) => {
    const exp = _r(_expKey(key));
    if (!exp) {
      return false;
    }

    if (Date.now() < exp) {
      return true;
    }

    removeItem(key);
    return false;
  };

  const getItem = (key, value = null) => {
    return hasItem(key) ? _r(_objKey(key)) || value : value;
  };

  const setItem = (key, value, expires = _hour) => {
    _w(_objKey(key), value);
    _w(_expKey(key), Date.now() + expires);
  };

  return {
    hasItem,
    getItem,
    setItem,
  };
};

const cache = createCache();

export default cache;
