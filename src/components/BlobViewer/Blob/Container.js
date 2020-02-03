import React, { useEffect, useRef } from 'react';
import fileType from 'file-type';
import styles from './Container.module.scss';
import useAsyncMemo from '../../shared/useAsyncMemo';
import useCodeMirror from './useCodeMirror';

const Container = (props) => {
  const { blob = {} } = props;

  const textArea = useRef(null);

  const [{ codeMirrorRef }] = useCodeMirror({ textArea });

  const mimeType = useAsyncMemo(
    async () => {
      if (!blob.content) {
        return null;
      }

      return fileType.fromBuffer(Buffer.from(blob.content, 'base64'));
    },
    [blob],
    null,
  );

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
      <div>{JSON.stringify(mimeType)}</div>
      <div
        className={styles.CodeMirror}
        style={blob.type === 'blob' && !mimeType ? {} : { display: 'none'}}
      >
        <textarea className={styles.textArea} ref={textArea} />
      </div>
    </main>
  );
};

export default Container;
