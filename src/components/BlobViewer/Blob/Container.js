import React, { useCallback, useEffect, useRef, useState } from 'react';
import CodeMirror from 'codemirror';
import styles from './Container.module.scss';

const Container = (props) => {
  const { blob } = props;

  const codeMirror = useRef(null);
  const textArea = useRef(null);

  const [code, setCode] = useState('');

  const resetCode = useCallback(
    () => {
      if (blob.content) {
        setCode(window.atob(blob.content));
      } else {
        setCode('mike');
      }
    },
    [blob, setCode],
  );

  useEffect(
    () => {
      if (codeMirror.current && !textArea.current) {
        return;
      }
      codeMirror.current = CodeMirror.fromTextArea(
        textArea.current,
        {
          mode: 'javascript',
          theme: 'the-matrix',
          smartIndent: true,
          lineWrapping: true,
          lineNumbers: true,
          readOnly: true,
          autofocus: true,
        },
      );
    },
    [textArea],
  );

  useEffect(
    () => {
      codeMirror.current && codeMirror.current.getDoc().setValue(code);
    },
    [codeMirror, code],
  );

  return (
    <main className={styles.Container}>
      <div onClick={resetCode}>Reset</div>
      <div className={styles.CodeMirror}>
        <textarea className={styles.textArea} ref={textArea} />
      </div>
    </main>
  );
};

export default Container;
