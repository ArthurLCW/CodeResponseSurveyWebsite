import React, { useState, useMemo, lazy, Suspense } from "react";
import "./QuestionComponent.css";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  toggleScreenTrue,
  toggleScreenFalse,
  decrement,
} from "../redux/recorderSlice";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import SvgIcon from "@mui/material/SvgIcon";
import { Markdown } from "./MdDisplayerComponent";
import LoadingComponent from "./LoadingComponent";
const MonacoEditorComponent = lazy(() => import("./MonacoEditorComponent"));

const LikertScaleGridComponent = lazy(() =>
  import("./LikertScaleGridComponent")
);
const MdDisplayerComponent = lazy(() => import("./MdDisplayerComponent"));

const WarningMsg = () => (
  <div className="warning">
    <b>Please finish this question!</b>
  </div>
);

const WarningMsgCoding = () => (
  <div className="warning">
    <b>
      Please finish this coding question! You need to write at least 5 lines of
      non-empty codes (excluding comments).
    </b>
  </div>
);

function removeMdExtension(filename) {
  if (filename.endsWith(".md")) {
    // Remove the last 3 characters (".md") from the string
    return filename.slice(0, -3);
  }
  return filename;
}

const QuestionComponent = ({
  myKey,
  questionContent,
  finished,
  monacoLoaded = !(questionContent.questionType === "coding"),
  setMonacoLoaded = () => {},
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [codingNonEnptyLines, setCodingNonEnptyLines] = useState(0);
  const dispatch = useDispatch();
  const [showTask, setShowTask] = useState(false);
  const [showSelfCodes, setShowSelfCodes] = useState(false);

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
      // console.log("randomNumber", randomNumber, fileNameTemp);
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
      // console.log(
      //   "filename:",
      //   fileNameTemp,
      //   sessionStorage.getItem("lcwSurveyRandomIndexList"),
      //   sessionStorage.getItem("lcwSurveyRandomMd")
      // );
    }
    return fileNameTemp;
  }, [myKey]);

  const handleOptionChange = (event) => {
    if (selectedOption === null) dispatch(increment());
    setSelectedOption(event.target.value);
    sessionStorage.setItem(
      removeMdExtension(myKey + ": " + fileName),
      event.target.value
    ); ///////

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
  };

  const handleInputChange = (event) => {
    // console.log("event", {
    //   val: event.target.value,
    //   selectedOption,
    //   questionContent,
    // });

    if (!selectedOption && event.target.value) {
      // console.log("ready +");
      dispatch(increment());
    } else if (selectedOption && !event.target.value) {
      // console.log("ready -");
      setSelectedOption(null);
      event.target.value = null;
      dispatch(decrement());
      return;
    }
    // console.log("ready =");
    setSelectedOption(event.target.value === "" ? null : event.target.value);
    sessionStorage.setItem(
      removeMdExtension(myKey + ": " + fileName),
      event.target.value
    ); ///////
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
  } else if (questionContent.questionType === "fill-in-the-blank-int") {
    options = (
      <div className="fill-in-the-blank-int">
        <b>Please input an integer:&nbsp;&nbsp;</b>
        <input
          type="number"
          value={selectedOption}
          onChange={(e) => {
            const value = e.target.value;
            if (!value || value.match(/^\d+$/)) {
              handleInputChange(e);
            }
          }}
          step="1"
          min="0"
          // placeholder="Enter an integer"
        />
      </div>
    );
  } else if (questionContent.questionType === "likert-scale-grid") {
    options = (
      <Suspense fallback={<LoadingComponent />}>
        <LikertScaleGridComponent
          statements={questionContent.questionOptions.statements}
          scale={questionContent.questionOptions.scale}
          setSelectedOption={setSelectedOption}
          myKey={removeMdExtension(myKey + ": " + fileName)} ///////
        />
      </Suspense>
    );
  } else if (questionContent.questionType === "coding") {
    // console.log(questionContent);
    options = (
      <Suspense fallback={<LoadingComponent />}>
        <MonacoEditorComponent
          onLoad={() => {
            console.log("onload!!!");

            setMonacoLoaded(true);
          }}
          dispatch={dispatch}
          setSelectedOption={setSelectedOption}
          myKey={removeMdExtension(myKey + ": " + fileName)} //////
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
      </Suspense>
    );
  }

  // console.log(finished, codingNonEnptyLines, selectedOption === null);
  const unfinishedStyle = {
    backgroundColor:
      (selectedOption === null && finished) ||
      (questionContent.questionType === "coding" &&
        finished &&
        codingNonEnptyLines < 5)
        ? "#e6f1ff"
        : "white",
  };

  const codingParentStyle =
    questionContent.questionType === "coding" ? { display: "flex" } : {};
  const codingChildStyle =
    questionContent.questionType === "coding"
      ? { width: "calc(42.5vw - 5px)", paddingRight: "10px" }
      : {};

  let recordDisplay = "";
  if (questionContent.recordLogic === "display") {
    if ((questionContent.questionType = "coding"))
      recordDisplay =
        "```javascript\n" + sessionStorage.getItem("lcwRecordInfo") + "\n```";
  } else if (questionContent.recordLogic === "record") {
    sessionStorage.setItem("taskFile", fileName);
  }

  // console.log("selected option", selectedOption, finished);
  return (
    <div className="question">
      {questionContent.questionType === "coding" &&
        finished &&
        codingNonEnptyLines < 5 && <WarningMsgCoding />}
      {questionContent.questionType !== "coding" &&
        selectedOption === null &&
        finished && <WarningMsg />}
      <div style={unfinishedStyle}>
        <div style={codingParentStyle}>
          {monacoLoaded && (
            <div style={codingChildStyle}>
              {questionContent.questionType === "coding" ? (
                <div
                  className={
                    questionContent.questionType === "coding" &&
                    "left-coding-panel"
                  }
                >
                  {questionContent.recordLogic === "record" && (
                    <Suspense fallback={<LoadingComponent />}>
                      <MdDisplayerComponent fileName="coding1-general.md" />
                    </Suspense>
                  )}
                  <Suspense fallback={<LoadingComponent />}>
                    <MdDisplayerComponent fileName={fileName} />
                  </Suspense>
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
                          <Suspense fallback={<LoadingComponent />}>
                            <MdDisplayerComponent
                              fileName={sessionStorage.getItem("taskFile")}
                            />
                          </Suspense>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Suspense fallback={<LoadingComponent />}>
                  <MdDisplayerComponent fileName={fileName} />
                </Suspense>
              )}
              {/* {(questionContent.recordLogic==="display") && <Markdown content={"```javascript\n"+sessionStorage.getItem("lcwRecordInfo")+"```"}/>} */}
              {/* <Markdown content={recordDisplay} /> */}
            </div>
          )}
          <div>{options}</div>
        </div>
      </div>
    </div>
  );
};

export default QuestionComponent;
