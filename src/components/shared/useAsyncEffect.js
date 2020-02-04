import { useEffect } from 'react';

const useAsyncEffect = (fn, deps) => {
  useEffect(
    () => {
      Promise.resolve().then(fn);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps,
  );
};

export default useAsyncEffect;
