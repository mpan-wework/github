import React from 'react';
import styles from './Blob.module.scss';

const Blob = ({ blob }) => {
  return (
    <main className={styles.Blob}>
      Blob:{JSON.stringify(blob || {})}
    </main>
  );
};

export default Blob;
