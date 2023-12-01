import React, { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';

const MonacoEditorComponent = () => {
  const [code, setCode] = useState('// type your code...');

  const editorDidMount = (editor, monaco) => {
    console.log('Editor is mounted');
    editor.focus();
  };

  const onChange = (newValue, e) => {
    console.log('onChange', newValue, e);
    setCode(newValue);
  };

  const options = {
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: 'line',
    automaticLayout: true,
  };

  return (
    <MonacoEditor
      height="400"
      language="javascript"
      theme="vs-dark"
      value={code}
      options={options}
      onChange={onChange}
      editorDidMount={editorDidMount}
    />
  );
};

export default MonacoEditorComponent;
