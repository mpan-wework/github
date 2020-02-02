import { useEffect, useRef } from 'react';
import CodeMirror from 'codemirror';

const useCodeMirror = (props) => {
  const { textArea } = props;

  const codeMirrorRef = useRef(null);

  useEffect(
    () => {
      if (codeMirrorRef.current && !textArea.current) {
        return;
      }
      codeMirrorRef.current = CodeMirror.fromTextArea(
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
    [textArea, codeMirrorRef],
  );

  return [
    { codeMirrorRef },
  ];
};

export default useCodeMirror;
