import React, { useState, useEffect } from "react";
import MonacoEditor from "react-monaco-editor";
import TestLayout from "./TestLayout";
import { useSelector } from "react-redux";
import { increment, decrement, updateRecordInfo } from "../redux/recorderSlice";

const MonacoEditorComponent = ({
  dispatch,
  setSelectedOption,
  myKey,
  recordLogic,
  setCodingNonEnptyLines,
  defaultCode,
  examples,
  clarification,
  preCode,
  postCode,
  testCases,
}) => {
  const [testFold, setTestFold] = useState(false);
  const [code, setCode] = useState("// type your code...");
  const [nonEmptyLineCount, setNonEmptyLineCount] = useState(1);
  const num = useSelector((state) => state.recorder.num);

  let editorInstance = null;

  const getNonEmptyLines = (editorInstance) => {
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
      setCodingNonEnptyLines(nonEmptyLineCountLocal);
      console.log(
        "number of nonEmpty lines: ",
        nonEmptyLineCount,
        nonEmptyLineCountLocal
      );
    }
  };

  const editorDidMount = (editor, monaco) => {
    editor.focus();
    editorInstance = editor;
    getNonEmptyLines(editorInstance);
    sessionStorage.setItem(myKey, editorInstance.getValue());
    setCode(editorInstance.getValue());
    // if the user does not input anything, then need to record placeholder at beginning
    if (recordLogic === "record") {
      sessionStorage.setItem("lcwRecordInfo", editorInstance.getValue());
    }
  };

  const onChange = (newValue, e) => {
    sessionStorage.setItem(myKey, newValue);
    // console.log(
    //   "id: ",
    //   myKey,
    //   ", sessionStorage: ",
    //   sessionStorage.getItem(myKey)
    // );
    if (recordLogic === "record") {
      sessionStorage.setItem("lcwRecordInfo", newValue);
      // console.log(
      //   "id: ",
      //   myKey,
      //   ", record sessionStorage: ",
      //   sessionStorage.getItem("lcwRecordInfo")
      // );
    }

    setCode(newValue);
    setSelectedOption(newValue);

    getNonEmptyLines(editorInstance);
    // console.log("in onchange1: lineCount: ", lineCount, ", counted: ", counted, ", code: ", code);
  };

  useEffect(() => {
    if (nonEmptyLineCount >= 10 && num === 0) {
      dispatch(increment());
      console.log("MONACO editor increment: ", nonEmptyLineCount, num);
    } else if (nonEmptyLineCount < 10 && num === 1) {
      dispatch(decrement());
      console.log("MONACO editor decrement: ", nonEmptyLineCount, num);
    } else {
      console.log("MONACO editor nothing: ", nonEmptyLineCount, num);
    }
  }, [dispatch, nonEmptyLineCount, num]);

  const options = {
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: "line",
    automaticLayout: true,
    tabSize: 2,
  };

  return (
    <div style={{ position: "relative" }}>
      <MonacoEditor
        // height="100%"
        height={testFold ? "65vh" : "40vh"}
        width="calc(42.5vw - 5px)"
        language="javascript"
        theme="vs-dark"
        value={
          recordLogic === "display"
            ? sessionStorage.getItem("lcwRecordInfo")
            : defaultCode
        }
        // value = '// type your code...'
        options={options}
        onChange={onChange}
        editorDidMount={editorDidMount}
      />
      <TestLayout
        setTestFold={setTestFold}
        testFold={testFold}
        examples={examples}
        clarification={clarification}
        preCode={preCode}
        postCode={postCode}
        userCode={code}
        testCases={testCases}
      />
    </div>
  );
};

export default MonacoEditorComponent;
