import React, { useCallback, useMemo } from 'react';
import styles from './Container.module.scss';

const Path = (props) => {
  const { path, visitPath } = props;

  const handlePathClick = useCallback(
    ({ full }) => () => visitPath(full),
    [visitPath],
  );

  const paths = useMemo(
    () => {
      const pathItems = [{
        label: '/',
        full: '/',
      }];

      if (!path) {
        return pathItems;
      }

      let base = '';
      path.split('/').forEach((pathItem) => {
        pathItems.push(
          {
            label: pathItem,
            full: `${base}${pathItem}`,
          },
          {
            label: '/',
            full: `${base}${pathItem}`,
          },
        );
        base = `${base}${pathItem}/`
      });
      pathItems.pop();

      return pathItems;
    },
    [path],
  );

  return (
    <div className={styles.Container}>
      {paths.map((pathItem, i) => (
        <div
          key={`${pathItem.full}${i}`}
          className={styles.path}
          onClick={handlePathClick(pathItem)}
        >
          {pathItem.label}
        </div>
      ))}
    </div>
  );
};

export default Path;
