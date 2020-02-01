import React from 'react';
import styles from './Blob.module.scss';

const Blob = (props) => {
  const { blob } = props;

  return (
    <main className={styles.Blob}>
      <pre>
        {window.atob(blob.content || 'aGVsbG8gd29ybGQ=')}
      </pre>
    </main>
  );
};

export default Blob;
