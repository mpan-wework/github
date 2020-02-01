import React, { useMemo } from 'react';
import styles from './Path.module.scss';

const Path = (props) => {
  const { path } = props;

  const dirs = useMemo(
    () => path.split('/'),
    [path],
  );

  return (
    <div className={styles.Path}>
      {dirs.map((dir, i) => (
        <React.Fragment key={`${i}${dir}`}>
          <div className={styles.dir}>{dir}</div>
          <div className={styles.slash}>&#47;</div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Path;
