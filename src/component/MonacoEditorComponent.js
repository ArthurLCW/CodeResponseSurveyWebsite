import React, { useState, useEffect } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { useSelector } from 'react-redux'
import { increment, decrement, updateRecordInfo } from '../redux/recorderSlice';



const MonacoEditorComponent = ({dispatch, setSelectedOption, myKey, recordLogic}) => {
  const [code, setCode] = useState('// type your code...');
  const [lineCount, setLineCount] = useState(1);
  const [counted, setCounted] = useState(false);

  let editorInstance = null;

  const editorDidMount = (editor, monaco) => {
    editor.focus();
    editorInstance = editor;
  };

  const onChange = (newValue, e) => {
    localStorage.setItem(myKey, newValue);
    console.log("id: ", myKey, ", localstorage: ", localStorage.getItem(myKey));
    if (recordLogic==="record"){
      localStorage.setItem("lcwRecordInfo", newValue);
      console.log("id: ", myKey, ", record localstorage: ", localStorage.getItem("lcwRecordInfo"));
    }

    if (editorInstance) {
      const newLineCount = editorInstance.getModel().getLineCount();
      setLineCount(newLineCount);
    }

    setCode(newValue);
    setSelectedOption(newValue);

    // console.log("in onchange1: lineCount: ", lineCount, ", counted: ", counted, ", code: ", code);
  };

  useEffect(() => {
    console.log("in use effect -- lineCount: ", lineCount, ", counted: ", counted, ", code: ", code);
    if (lineCount > 1 && !counted) {
      setCounted(true);
      dispatch(increment());
    } else if (lineCount === 1 && counted) {
      setCounted(false);
      dispatch(decrement());
    }
  }, [lineCount, counted, code, dispatch]);

  const options = {
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: 'line',
    automaticLayout: true,
  };

  return (
    <MonacoEditor
      height="100%"
      width="35vw"
      language="javascript"
      theme="vs-dark"
      value= {(recordLogic==="display")? localStorage.getItem("lcwRecordInfo"):'// type your code...'}
      // value = '// type your code...'
      options={options}
      onChange={onChange}
      editorDidMount={editorDidMount}
    />
  );
};



export default MonacoEditorComponent;
