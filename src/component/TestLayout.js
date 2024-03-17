import React, { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SvgIcon from "@mui/material/SvgIcon";

const TestHeader = ({ showTab, setShowTab, setTestFold, testFold }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    let timer;
    if (isButtonDisabled) {
      timer = setTimeout(() => {
        setIsButtonDisabled(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isButtonDisabled]);

  const handleButtonClick = () => {
    console.log("isButtonClick", isButtonDisabled);
    if (isButtonDisabled) return;
    setIsButtonDisabled(true);
  };

  const iconStyle = {
    verticalAlign: "middle",
    margin: "0px 3px",
    fontSize: "20px",
    color: "white",
  };

  const iconLabelStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    padding: "5px 10px",
    marginRight: "5px",
    borderRadius: "5px",
    background: isButtonDisabled ? "#a0c4e5" : "#5a92c5",
    color: "white",
    borderColor: "#094183",
    borderWidth: "1px",
    borderStyle: "solid",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    cursor: isButtonDisabled ? "not-allowed" : "pointer",
    transition: "background-color 0.3s",
  };

  const tabTitleStyle = {
    padding: "5px 10px",
    fontSize: "14px",
    cursor: "pointer",
  };

  const tabTitleChosenStyle = {
    padding: "5px 10px",
    fontSize: "14px",
    cursor: "pointer",
    backgroundColor: "#E6F4FF",
    color: "#094183",
    borderRadius: "5px",
    borderColor: "#094183",
    borderWidth: "2px",
    borderStyle: "solid",
  };
  return (
    <div
      style={{
        height: "5vh",
        width: "100%",
        background: "#f0f0f0",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
      }}
    >
      <SvgIcon
        style={{
          position: "absolute",
          top: 10,
          left: "50%",
          transform: "translateY(-50%) translateX(-50%)",
          borderRadius: "50%",
          background: "lightgray",
          margin: "5px",
        }}
        component={testFold ? ArrowDropUpIcon : ArrowDropDownIcon}
        onClick={() => {
          setTestFold(!testFold);
        }}
      />

      <span>
        <span
          style={
            showTab === "Test Result" ? tabTitleChosenStyle : tabTitleStyle
          }
          onClick={() => {
            if (showTab !== "Test Result") setShowTab("Test Result");
          }}
        >
          Test Result
        </span>
        <span
          style={showTab === "Test Cases" ? tabTitleChosenStyle : tabTitleStyle}
          onClick={() => {
            if (showTab !== "Test Cases") setShowTab("Test Cases");
          }}
        >
          Test Cases
        </span>
        <span
          style={
            showTab === "Submissions" ? tabTitleChosenStyle : tabTitleStyle
          }
          onClick={() => {
            if (showTab !== "Submissions") setShowTab("Submissions");
          }}
        >
          Submissions
        </span>
      </span>

      <span>
        <Tooltip
          title="Run your code with specified inputs in 'Test Cases'."
          componentsProps={{ tooltip: { sx: { fontSize: "1em" } } }}
        >
          <span style={iconLabelStyle} onClick={handleButtonClick}>
            <SvgIcon component={PlayArrowIcon} style={iconStyle} />
            Run
          </span>
        </Tooltip>
        <Tooltip
          title="Submit and run your code with all test cases. "
          componentsProps={{ tooltip: { sx: { fontSize: "1em" } } }}
        >
          <span style={iconLabelStyle} onClick={handleButtonClick}>
            <SvgIcon component={CloudUploadIcon} style={iconStyle} />
            Submit
          </span>
        </Tooltip>
      </span>
    </div>
  );
};

const TestContent = ({ examples, clarification }) => {
  const TestCases = ({ examples = [], clarification = "" }) => {
    const [input, setInput] = useState(examples[0] || "");
    const inputStyle = {
      width: "40vw",
      height: "10vh",
    };

    return (
      <div style={{ padding: "10px" }}>
        <textarea
          style={inputStyle}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Please enter input of test cases according to the input format below."
        />
        {examples.map((example, index) => {
          return (
            <button
              onClick={() => {
                setInput(example);
              }}
            >
              Load Example {index}
            </button>
          );
        })}
        <p>{clarification}</p>
      </div>
    );
  };
  return (
    <div
      style={{
        height: "25vh",
        overflowY: "scroll",
      }}
    >
      <TestCases examples={examples} clarification={clarification} />
    </div>
  );
};

const TestLayout = ({ setTestFold, testFold, examples, clarification }) => {
  const [showTab, setShowTab] = useState("Test Result");

  return (
    <div
      style={{
        height: testFold ? "5vh" : "30vh",
        width: "100%",
        background: "#f0f0f0",
        top: testFold ? "65vh" : "40vh",
        zIndex: 10,
        position: "absolute",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
      // onClick={() => {
      //   setTestFold(!testFold);
      // }}
    >
      <TestHeader
        setShowTab={setShowTab}
        showTab={showTab}
        testFold={testFold}
        setTestFold={setTestFold}
      />
      {!testFold && (
        <TestContent examples={examples} clarification={clarification} />
      )}
    </div>
  );
};

export default TestLayout;
