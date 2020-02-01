import React, { useCallback } from 'react';
import styles from './Container.module.scss';

const Container = (props) => {
  const { blobs, path, fetchBlob } = props;

  const onBlobClick = useCallback(
    () => {
      const blob = blobs.find((b) => b.path === path);
      if (blob) {
        fetchBlob(blob.url);
      }
    },
    [blobs, path, fetchBlob],
  );

  return (
    <div className={styles.Container}>
      <div onClick={onBlobClick}>SideBar</div>
    </div>
  );
};

export default Container;
