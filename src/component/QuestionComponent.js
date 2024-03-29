import React, { useState, useMemo, useEffect } from "react";
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

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import SvgIcon from "@mui/material/SvgIcon";

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
  // const MdDisplayerComponentMemo = React.memo(
  //   MdDisplayerComponent,
  //   (prevProps, nextProps) => {
  //     console.log(
  //       "rerender in memo",
  //       prevProps.fileName === nextProps.fileName
  //     );
  //     return prevProps.fileName === nextProps.fileName;
  //   }
  // );
  // const MdDisplayerComponentMemo = React.memo(
  //   ({ fileName }) => {
  //     console.log("rerender in self test");
  //     return <h1>{fileName}</h1>;
  //   },
  //   (prevProps, nextProps) => {
  //     console.log(
  //       "rerender in memo",
  //       prevProps.fileName === nextProps.fileName
  //     );
  //     return prevProps.fileName === nextProps.fileName;
  //   }
  // );
  const MdDisplayerComponentMemo = MdDisplayerComponent;
  // const num = useSelector((state) => state.recorder.num);
  // const screenFlag = useSelector((state) => state.recorder.screenFlag);
  const [selectedOption, setSelectedOption] = useState(null);
  const [codingNonEnptyLines, setCodingNonEnptyLines] = useState(0);
  const dispatch = useDispatch();
  const [showTask, setShowTask] = useState(false);
  const [showSelfCodes, setShowSelfCodes] = useState(false);

  const handleOptionChange = (event) => {
    if (selectedOption === null) dispatch(increment());
    setSelectedOption(event.target.value);
    sessionStorage.setItem(myKey, event.target.value);

    if (
      questionContent.screenOption &&
      event.target.value === questionContent.screenOption
    ) {
      // console.log("screen flag0: ", screenFlag);
      dispatch(toggleScreenTrue());
    } else if (questionContent.screenOption) {
      // console.log("screen flag1: ", screenFlag);
      dispatch(toggleScreenFalse());
    }

    // console.log(
    //   "id: ",
    //   myKey,
    //   ": ",
    //   event.target.value,
    //   ": ",
    //   selectedOption,
    //   " : ",
    //   num
    // );
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
        examples={questionContent.examples}
        clarification={questionContent.clarification}
        preCode={questionContent.preCode}
        postCode={questionContent.postCode}
        testCases={questionContent.testCases}
        verifyInputFormat={questionContent.verifyInputFormat}
        verifyOutputFormat={questionContent.verifyOutputFormat}
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
      ? { width: "calc(42.5vw - 5px)", paddingRight: "10px" }
      : {};

  // const fileName = "coding1-easy-remove-duplicates-from-sorted-list.md";
  const fileName = useMemo(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (
      questionContent.questionType === "coding" &&
      questionContent.recordLogic === "display" &&
      queryParams.get("AI_CODE")
    )
      return sessionStorage.getItem("lcwSurveyRandomMd");
    let fileNameTemp = questionContent.questionTextSrc[0];
    if (questionContent.questionTextSrc.length > 1) {
      const randomNumber = Math.floor(
        Math.random() * questionContent.questionTextSrc.length
      );
      fileNameTemp = questionContent.questionTextSrc[randomNumber];
      console.log("randomNumber", randomNumber, fileNameTemp);
      // list does not exist, initialize it
      if (!sessionStorage.getItem("lcwSurveyRandomIndexList")) {
        sessionStorage.setItem("lcwSurveyRandomIndexList", myKey);
        sessionStorage.setItem("lcwSurveyRandomMd", fileNameTemp);
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
          sessionStorage.getItem("lcwSurveyRandomMd") + "," + fileNameTemp
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
            newMdList[i] = fileNameTemp;
            sessionStorage.setItem("lcwSurveyRandomMd", newMdList.join(","));
            break;
          }
        }
      }
      console.log(
        "filename:",
        fileNameTemp,
        sessionStorage.getItem("lcwSurveyRandomIndexList"),
        sessionStorage.getItem("lcwSurveyRandomMd")
      );
    }
    return fileNameTemp;
  }, [myKey]);

  let recordDisplay = "";
  if (questionContent.recordLogic === "display") {
    if ((questionContent.questionType = "coding"))
      recordDisplay =
        "```javascript\n" + sessionStorage.getItem("lcwRecordInfo") + "\n```";
  } else if (questionContent.recordLogic === "record") {
    sessionStorage.setItem("taskFile", fileName);
  }

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
            {questionContent.questionType === "coding" ? (
              <div
                className={
                  questionContent.questionType === "coding" &&
                  "left-coding-panel"
                }
              >
                {questionContent.recordLogic === "record" && (
                  <MdDisplayerComponentMemo fileName="coding1-general.md" />
                )}
                <MdDisplayerComponentMemo fileName={fileName} />
                {questionContent.recordLogic === "display" && (
                  <>
                    <div className="collapse-container">
                      <div
                        className="collapse-header"
                        onClick={() => setShowSelfCodes(!showSelfCodes)}
                      >
                        <SvgIcon
                          component={
                            showSelfCodes ? ArrowDropDownIcon : ArrowRightIcon
                          }
                        />
                        <h4>Codes Written by Yourself in Previous Page</h4>
                      </div>
                      {showSelfCodes && <Markdown content={recordDisplay} />}
                    </div>
                    <div className="collapse-container">
                      <div
                        className="collapse-header"
                        onClick={() => setShowTask(!showTask)}
                      >
                        <SvgIcon
                          component={
                            showTask ? ArrowDropDownIcon : ArrowRightIcon
                          }
                        />
                        <h4>Coding Task Description</h4>
                      </div>
                      {showTask && (
                        <MdDisplayerComponentMemo
                          fileName={sessionStorage.getItem("taskFile")}
                        />
                      )}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <MdDisplayerComponentMemo fileName={fileName} />
            )}
            {/* {(questionContent.recordLogic==="display") && <Markdown content={"```javascript\n"+sessionStorage.getItem("lcwRecordInfo")+"```"}/>} */}
            {/* <Markdown content={recordDisplay} /> */}
          </div>
          <div>{options}</div>
        </div>
      </div>
    </div>
  );
};

export default QuestionComponent;
