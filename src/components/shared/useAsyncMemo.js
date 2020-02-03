import { useEffect, useState } from 'react';

const useAsyncMemo = (fn, deps = [], init = null) => {
  const [memo, setMemo] = useState(init);

  useEffect(
    () => {
      Promise.resolve().then(fn).then(setMemo);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps,
  );

  return memo;
};

export default useAsyncMemo;
