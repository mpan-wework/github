import { useEffect, useRef } from 'react';
import CodeMirror from 'codemirror';

const useCodeMirror = ({ textAreaRef }) => {
  const codeMirrorRef = useRef(null);

  useEffect(() => {
    if (codeMirrorRef.current && !textAreaRef.current) {
      return;
    }
    codeMirrorRef.current = CodeMirror.fromTextArea(textAreaRef.current, {
      mode: 'javascript',
      theme: 'the-matrix',
      smartIndent: true,
      lineWrapping: true,
      lineNumbers: true,
      readOnly: true,
      autofocus: true,
    });
  }, [textAreaRef, codeMirrorRef]);

  return [{ codeMirrorRef }];
};

export default useCodeMirror;
