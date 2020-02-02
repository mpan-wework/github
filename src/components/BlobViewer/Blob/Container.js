import React, { useEffect, useRef } from 'react';
import styles from './Container.module.scss';
import useCodeMirror from './useCodeMirror';

const Container = (props) => {
  const { blob } = props;

  const textArea = useRef(null);

  const [{ codeMirrorRef }] = useCodeMirror({ textArea });

  useEffect(
    () => {
      if (blob.type !== 'blob') {
        return;
      }

      const code = window.atob(blob.content);
      codeMirrorRef.current && codeMirrorRef.current.getDoc().setValue(code);
    },
    [codeMirrorRef, blob],
  );

  return (
    <main className={styles.Container}>
      <div
        className={styles.CodeMirror}
        style={blob.type === 'blob' ? {} : { display: 'none'}}
      >
        <textarea className={styles.textArea} ref={textArea} />
      </div>
    </main>
  );
};

export default Container;
