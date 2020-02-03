import { useEffect, useState } from 'react';

const useAsyncMemo = (fn, deps = [], init = null) => {
  const [memo, setMemo] = useState(init);

  useEffect(
    () => {
      Promise.resolve().then(fn).then(setMemo);
    },
    [fn, deps, setMemo],
  );

  return memo;
};

export default useAsyncMemo;
