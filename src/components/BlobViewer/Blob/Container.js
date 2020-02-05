import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import fileType from 'file-type';
import { lookup } from 'mime-types';
import useAsyncMemo from '../../shared/useAsyncMemo';
import useAsyncEffect from '../../shared/useAsyncEffect';
import useCodeMirror from './useCodeMirror';
import githubClient from '../../../service/api/github';
import styles from './Container.module.scss';

const Blob = (props) => {
  const { blob = {} } = props;
  const [content, setContent] = useState(null);

  const contentType = useMemo(
    () => {
      if (!blob.path) {
        return '';
      }

      return lookup(blob.path);
    },
    [blob],
  );

  useAsyncEffect(
    async () => {
      if (/image/.test(contentType)) {
        setContent(null);
      } else if (!blob.url) {
        setContent(null);
      } else {
        const data = await githubClient.blob(blob.url);
        if (data.content) {
          setContent(data.content);
        } else {
          setContent(null);
        }
      }
    },
    [contentType, blob],
  );

  const textAreaRef = useRef(null);
  const [{ codeMirrorRef }] = useCodeMirror({ textAreaRef });

  const mimeType = useAsyncMemo(
    async () => {
      if (!content) {
        return '';
      }

      return fileType.fromBuffer(Buffer.from(content, 'base64'));
    },
    [content],
    '',
  );

  useEffect(
    () => {
      if (!content) {
        return;
      }

      content
        && codeMirrorRef.current
        && codeMirrorRef.current.getDoc().setValue(window.atob(content));
    },
    [codeMirrorRef, content],
  );

  return (
    <main className={styles.Container}>
      <div>{JSON.stringify(mimeType)}</div>
      <div
        className={styles.CodeMirror}
        style={content ? {} : { display: 'none'}}
      >
        <textarea className={styles.textArea} ref={textAreaRef} />
      </div>
    </main>
  );
};

export default Blob;
