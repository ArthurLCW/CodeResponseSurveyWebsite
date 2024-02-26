import React, { useState, useEffect, useRef } from "react";
import { MdDisplayerComponent, Markdown } from "./MdDisplayerComponent";
import MonacoEditorComponent from "./MonacoEditorComponent";
// import LikertScaleGridComponent from './LikertScaleGridComponent';
import "./QuestionComponent.css";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  toggleScreenTrue,
  toggleScreenFalse,
} from "../redux/recorderSlice";

const WarningMsg = () => (
  <div className="warning">
    <b>Please finish this question!</b>
  </div>
);

const WarningMsgCoding = () => (
  <div className="warning">
    <b>
      Please finish this coding question! You need to write at least 10 lines of
      non-empty codes.
    </b>
  </div>
);

const QuestionComponent = ({ myKey, questionContent, finished }) => {
  const num = useSelector((state) => state.recorder.num);
  const screenFlag = useSelector((state) => state.recorder.screenFlag);
  const [selectedOption, setSelectedOption] = useState(null);
  const [codingNonEnptyLines, setCodingNonEnptyLines] = useState(0);
  const dispatch = useDispatch();

  const handleOptionChange = (event) => {
    if (selectedOption === null) dispatch(increment());
    setSelectedOption(event.target.value);
    sessionStorage.setItem(myKey, event.target.value);

    if (
      questionContent.screenOption &&
      event.target.value === questionContent.screenOption
    ) {
      console.log("screen flag0: ", screenFlag);
      dispatch(toggleScreenTrue());
    } else if (questionContent.screenOption) {
      console.log("screen flag1: ", screenFlag);
      dispatch(toggleScreenFalse());
    }

    console.log(
      "id: ",
      myKey,
      ": ",
      event.target.value,
      ": ",
      selectedOption,
      " : ",
      num
    );
    console.log(
      "id: ",
      myKey,
      ", sessionStorage: ",
      sessionStorage.getItem(myKey)
    );
  };

  let options;

  if (questionContent.questionType === "null") {
    // Handle null case
  } else if (questionContent.questionType === "multiple-choice") {
    const labelStyle = {
      display: "block", // This makes each label a block-level element
      margin: "5px 0", // Optional: Adds some spacing between options
    };
    options = (
      <div>
        {questionContent.questionOptions.map((option, index) => (
          <label key={index} style={labelStyle}>
            <input
              type="radio"
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
            />
            {option}
          </label>
        ))}
      </div>
    );
  } else if (questionContent.questionType === "likert-scale") {
    options = (
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        {questionContent.questionOptions.map((option, index) => (
          <div key={index} className="likert-scale-container">
            <div className="likert-label">{option}</div>
            <input
              type="radio"
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
            />
          </div>
        ))}
      </div>
    );
  } else if (questionContent.questionType === "coding") {
    console.log(questionContent);
    options = (
      <MonacoEditorComponent
        dispatch={dispatch}
        setSelectedOption={setSelectedOption}
        myKey={myKey}
        recordLogic={questionContent.recordLogic}
        setCodingNonEnptyLines={setCodingNonEnptyLines}
        defaultCode={questionContent.defaultCode}
      />
    );
  }

  // console.log(finished, codingNonEnptyLines, selectedOption === null);
  const unfinishedStyle = {
    backgroundColor:
      (selectedOption === null && finished) ||
      (questionContent.questionType === "coding" &&
        finished &&
        codingNonEnptyLines < 10)
        ? "#e6f1ff"
        : "white",
  };

  const codingParentStyle =
    questionContent.questionType === "coding" ? { display: "flex" } : {};
  const codingChildStyle =
    questionContent.questionType === "coding"
      ? { width: "35vw", paddingRight: "30px" }
      : {};

  let recordDisplay = "";
  if (questionContent.recordLogic === "display") {
    if ((questionContent.questionType = "coding"))
      recordDisplay =
        "```javascript\n" + sessionStorage.getItem("lcwRecordInfo") + "\n```";
  }

  const fileName = useRef(questionContent.questionTextSrc[0]);
  useEffect(() => {
    if (questionContent.questionTextSrc.length > 1) {
      const randomNumber = Math.floor(
        Math.random() * questionContent.questionTextSrc.length
      );
      fileName.current = questionContent.questionTextSrc[randomNumber];
      console.log("randomNumber", randomNumber, fileName.current);
      // list does not exist, initialize it
      if (!sessionStorage.getItem("lcwSurveyRandomIndexList")) {
        sessionStorage.setItem("lcwSurveyRandomIndexList", myKey);
        sessionStorage.setItem("lcwSurveyRandomMd", fileName.current);
      }
      // list exists, and the key does not exist in the key -> add the key directly
      else if (
        !sessionStorage
          .getItem("lcwSurveyRandomIndexList")
          .split(",")
          .includes(myKey)
      ) {
        sessionStorage.setItem(
          "lcwSurveyRandomIndexList",
          sessionStorage.getItem("lcwSurveyRandomIndexList") + "," + myKey
        );
        sessionStorage.setItem(
          "lcwSurveyRandomMd",
          sessionStorage.getItem("lcwSurveyRandomMd") + "," + fileName.current
        );
      }
      // list exists, and the key exists too -> modify the list instead of directly adding the key
      else {
        const indexList = sessionStorage
          .getItem("lcwSurveyRandomIndexList")
          .split(",");
        for (let i = 0; i < indexList.length; i++) {
          if (indexList[i] === myKey) {
            const newMdList = sessionStorage
              .getItem("lcwSurveyRandomMd")
              .split(",");
            newMdList[i] = fileName.current;
            sessionStorage.setItem("lcwSurveyRandomMd", newMdList.join(","));
            break;
          }
        }
      }
      console.log(
        "filename:",
        fileName.current,
        sessionStorage.getItem("lcwSurveyRandomIndexList"),
        sessionStorage.getItem("lcwSurveyRandomMd")
      );
    }
  }, [myKey, questionContent.questionTextSrc]);

  return (
    <div className="question">
      {questionContent.questionType === "coding" &&
        finished &&
        codingNonEnptyLines < 10 && <WarningMsgCoding />}
      {questionContent.questionType !== "coding" &&
        selectedOption === null &&
        finished && <WarningMsg />}
      <div style={unfinishedStyle}>
        <div style={codingParentStyle}>
          <div style={codingChildStyle}>
            <MdDisplayerComponent fileName={fileName.current} />
            {/* {(questionContent.recordLogic==="display") && <Markdown content={"```javascript\n"+sessionStorage.getItem("lcwRecordInfo")+"```"}/>} */}
            <Markdown content={recordDisplay} />
          </div>
          <div>{options}</div>
        </div>
      </div>
    </div>
  );
};

export default QuestionComponent;
