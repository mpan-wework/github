import { useCallback, useState } from 'react';

const useAsyncDebouncedCallback = (fn, deps = [], waitTime = 1000) => {
  const [task, setTask] = useState(null);
  const callback = useCallback(fn, deps);
  const debouncedCallback = useCallback(
    async (...args) => {
      clearTimeout(task);
      return new Promise((resolve) => {
        setTask(
          setTimeout(
            async () => {
              const ret = await callback(...args);
              resolve(ret);
            },
            waitTime,
          ),
        );
      });
    },
    [callback, task, waitTime],
  );

  return debouncedCallback;
};

export default useAsyncDebouncedCallback;
