import React, { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SvgIcon from "@mui/material/SvgIcon";

const TestHeader = ({
  showTab,
  setShowTab,
  setTestFold,
  testFold,
  testInput,
  setTestResult,
}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  function isStringAnArray(str) {
    const trimmedStr = str.trim();
    if (!(trimmedStr.startsWith("[") && trimmedStr.endsWith("]"))) {
      return false;
    }

    try {
      const parsed = JSON.parse(trimmedStr);
      if (!Array.isArray(parsed)) {
        return false;
      }
      if (
        trimmedStr.slice(1, -1).includes("[") ||
        trimmedStr.slice(1, -1).includes("]")
      ) {
        return false;
      }
      return true;
    } catch (e) {
      // If JSON.parse() fails, the string is not a valid JSON array
      return false;
    }
  }

  useEffect(() => {
    let timer;
    if (isButtonDisabled) {
      timer = setTimeout(() => {
        setIsButtonDisabled(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isButtonDisabled]);

  const handleRunButtonClick = () => {
    console.log("isButtonClick", isButtonDisabled);
    console.log("testInput", testInput);
    if (isButtonDisabled) return;
    if (!isStringAnArray(testInput)) {
      setTestResult({
        type: "Invalid Testcase",
        message: `${testInput} is NOT a valid input! Please refer to the examples and introduction of the input format. `,
        isError: true,
      });
    }
    setShowTab("Test Result");
    setIsButtonDisabled(true);
  };

  const handleSubmitButtonClick = () => {
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
          <span style={iconLabelStyle} onClick={handleRunButtonClick}>
            <SvgIcon component={PlayArrowIcon} style={iconStyle} />
            Run
          </span>
        </Tooltip>
        <Tooltip
          title="Submit and run your code with all test cases. "
          componentsProps={{ tooltip: { sx: { fontSize: "1em" } } }}
        >
          <span style={iconLabelStyle} onClick={handleSubmitButtonClick}>
            <SvgIcon component={CloudUploadIcon} style={iconStyle} />
            Submit
          </span>
        </Tooltip>
      </span>
    </div>
  );
};

const TestCases = ({
  examples = [],
  clarification = "",
  testInput,
  setTestInput,
  expectedOutput,
  setExpectedOutput,
}) => {
  const labelStype = {
    display: "inline-block",
    width: "10vw",
    paddingRight: "20px",
  };
  const inputStyle = {
    width: "25vw",
    // height: "10vh",
  };

  return (
    <div style={{ padding: "10px" }}>
      <div>
        <span style={labelStype}>Testcase Input:</span>
        <input
          type="text"
          style={inputStyle}
          value={testInput}
          onChange={(e) => setTestInput(e.target.value)}
          placeholder="Enter input based on the format below."
        />
      </div>

      <div>
        <span style={labelStype}>Expected Output:</span>
        <input
          type="text"
          style={inputStyle}
          value={expectedOutput}
          onChange={(e) => setExpectedOutput(e.target.value)}
          placeholder="Enter expected output based on the format below."
        />
      </div>

      {examples.map((example, index) => {
        return (
          <button
            style={{
              borderRadius: "5px",
              background: "#5a92c5",
              color: "white",
              borderColor: "#094183",
              borderWidth: "1px",
              borderStyle: "solid",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onClick={() => {
              setTestInput(example.input);
              setExpectedOutput(example.output);
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

const TestResult = ({ testResult }) => {
  const resultTypeStyle = {
    color: testResult.isError ? "rgb(239, 71, 67)" : "rgb(45, 181, 93)",
    padding: "20px",
    fontSize: "20px",
    fontWeight: "500",
  };
  const resultMessageStyle = {
    backgroundColor: testResult.isError
      ? "rgba(246, 54, 54, 0.08)"
      : "rgba(38, 187, 156, .08)",
    color: testResult.isError ? "rgb(246, 54, 54)" : "rgb(45, 181, 93)",
    padding: "20px",
    fontSize: "14px",
  };
  return (
    <div style={{ margin: "20px" }}>
      <div style={resultTypeStyle}>{testResult.type}</div>
      <div style={resultMessageStyle}>{testResult.message}</div>
    </div>
  );
};

const TestContent = ({
  examples,
  clarification,
  showTab,
  testInput,
  setTestInput,
  expectedOutput,
  setExpectedOutput,
  testResult,
}) => {
  return (
    <div
      style={{
        height: "25vh",
        overflowY: "scroll",
      }}
    >
      {showTab === "Test Cases" && (
        <TestCases
          examples={examples}
          clarification={clarification}
          testInput={testInput}
          setTestInput={setTestInput}
          expectedOutput={expectedOutput}
          setExpectedOutput={setExpectedOutput}
        />
      )}
      {showTab === "Test Result" && <TestResult testResult={testResult} />}
    </div>
  );
};

const TestLayout = ({
  setTestFold,
  testFold,
  examples = [],
  clarification,
}) => {
  const [showTab, setShowTab] = useState("Test Result");
  const [testInput, setTestInput] = useState(examples[0].input || "");
  const [expectedOutput, setExpectedOutput] = useState(
    examples[0].output || ""
  );
  const [testResult, setTestResult] = useState({
    type: "",
    message: "There will be running results once you run/submit your code.",
    isError: false,
  });

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
        testInput={testInput}
        setTestResult={setTestResult}
      />
      {!testFold && (
        <TestContent
          examples={examples}
          clarification={clarification}
          showTab={showTab}
          testInput={testInput}
          setTestInput={setTestInput}
          expectedOutput={expectedOutput}
          setExpectedOutput={setExpectedOutput}
          testResult={testResult}
        />
      )}
    </div>
  );
};

export default TestLayout;
