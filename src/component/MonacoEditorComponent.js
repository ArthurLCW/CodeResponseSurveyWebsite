import React, { useState, useEffect } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { useSelector } from 'react-redux'
import { increment, decrement, updateRecordInfo } from '../redux/recorderSlice';



const MonacoEditorComponent = ({dispatch, setSelectedOption, myKey, recordLogic, setCodingNonEnptyLines}) => {
  const [code, setCode] = useState('// type your code...');
  const [lineCount, setLineCount] = useState(1);
  const [nonEmptyLineCount, setNonEmptyLineCount] = useState(1);
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
    
    if (editorInstance) {
      const model = editorInstance.getModel();
      const lineCount = model.getLineCount();
      let nonEmptyLineCountLocal = 0;
  
      for (let i = 1; i <= lineCount; i++) {
        const lineContent = model.getLineContent(i);
        if (lineContent.trim().length > 0) {
          nonEmptyLineCountLocal++;
        }
      }
      setNonEmptyLineCount(nonEmptyLineCountLocal);
      setCodingNonEnptyLines(nonEmptyLineCount);
      console.log("number of nonEmpty lines: ", nonEmptyLineCount);
    }
    // console.log("in onchange1: lineCount: ", lineCount, ", counted: ", counted, ", code: ", code);
  };

  useEffect(() => {
    console.log("in use effect -- lineCount: ", lineCount, "non-empty line: ",nonEmptyLineCount,", counted: ", counted, ", code: ", code);
    if (nonEmptyLineCount >= 10 && !counted) {
      setCounted(true);
      dispatch(increment());
      console.log("MONACO editor increment: ", nonEmptyLineCount);
    } else if (nonEmptyLineCount < 10 && counted) {
      setCounted(false);
      dispatch(decrement());
      console.log("MONACO editor decrement: ", nonEmptyLineCount);
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
