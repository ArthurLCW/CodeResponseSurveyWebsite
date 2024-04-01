import React, { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SvgIcon from "@mui/material/SvgIcon";
import executeBatch from "../util/api";

// count line numbers, used to deduce in error message
function countLines(str) {
  if (!str) {
    return -1;
  }
  return str.split("\n").length;
}
// update line number so that they are the same as the line number at the code editor
function updateLineNumbers(inputString, lineNum) {
  if (!inputString) {
    return "";
  }
  // Regular expression to match "/box/script.js:" followed by a number
  const regex = /\/box\/script\.js:(\d+)/g;

  const updatedString = inputString.replace(regex, (match, number) => {
    const updatedNumber = parseInt(number, 10) - lineNum + 1;
    return `/box/script.js:${updatedNumber}`;
  });

  return updatedString;
}

const TestHeader = ({
  showTab,
  isLoading,
  setIsLoading,
  setShowTab,
  setTestFold,
  testFold,
  testInput,
  expectedOutput,
  setTestResult,
  preCode,
  postCode,
  userCode,
  testCases,
  verifyInputFormat,
  verifyOutputFormat,
}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  function transApiResult(submissions, isRun) {
    console.log("rawResults", submissions);
    let type = "";
    let message =
      "There will be running results once you run/submit your code.";
    let isError = false;
    let time = undefined;
    let memory = undefined;

    for (let i = 0; i < submissions.length; i++) {
      if (submissions[i].status.id !== 3) {
        type = submissions[i].status.description;
        isError = true;
        message = isRun
          ? "This is the test result of the testcases SPECIFIED BY YOURSELF:\n"
          : "This is the test result of our predefined testcases:\n";
        if (isRun)
          message += `Passed ${i}/${submissions.length} test cases. \n`;
        if (submissions[i].status.id === 4) {
          // wrong answer
          message += `Expected output is ${submissions[i].expected_output}\n`;
          message += `However, the actual out is ${submissions[i].stdout}\n`;
        } else {
          message += updateLineNumbers(
            submissions[i].stderr,
            countLines(preCode)
          );
        }
        break;
      }
    }
    if (!isError) {
      type = "Accepted";
      message = isRun
        ? "You have pass the testcase specified by yourself. \nHowever, please notice that passing self-defined testcase does NOT guarantee passing all predefined testcases. "
        : "Congratulations! You have passed all the test cases. ";
      time = String(
        parseFloat(submissions[submissions.length - 1].time) * 1000
      );
      memory = submissions[submissions.length - 1].memory;
    }

    return { type, message, isError, time, memory };
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
    setIsButtonDisabled(true);
    console.log("isButtonClick & loading", isButtonDisabled, isLoading);
    console.log("testInput", testInput);
    if (isButtonDisabled || isLoading) return;
    console.log(verifyInputFormat);
    if (!verifyInputFormat(testInput)) {
      setTestResult({
        type: "Invalid Testcase",
        message: `${testInput} is NOT a valid input! Please refer to the examples and introduction of the input format. `,
        isError: true,
      });
      setShowTab("Test Result");
      setIsLoading(false);
      setTestFold(false);
      return;
    }
    if (!verifyOutputFormat(expectedOutput)) {
      setTestResult({
        type: "Invalid Testcase",
        message: `${expectedOutput} is NOT a valid output! Please refer to the examples and introduction of the input/output format. `,
        isError: true,
      });
      setShowTab("Test Result");
      setIsLoading(false);
      setTestFold(false);
      return;
    }

    const submissions = [
      {
        language_id: 63,
        source_code: preCode + userCode + postCode,
        stdin: testInput,
        expected_output: expectedOutput,
      },
    ];
    console.log(userCode);

    setIsLoading(true);
    executeBatch("run", submissions, (results) => {
      if (results) setTestResult(transApiResult(results, true));
      else
        setTestResult({
          type: "Unknown Error",
          message:
            "There is an unknown error, possibly internet failure or non-English identifiers in code. Please try again",
          isError: true,
          time: undefined,
          memory: undefined,
        });
      console.log("run!!!!!!!!!");
      setShowTab("Test Result");
      setIsLoading(false);
      setTestFold(false);
    });
  };

  const handleSubmitButtonClick = () => {
    setIsButtonDisabled(true);
    console.log("isButtonClick & loading", isButtonDisabled, isLoading);
    if (isButtonDisabled || isLoading) return;

    const submissions = testCases;
    for (const submission of submissions) {
      submission.language_id = 63;
      submission.source_code = preCode + userCode + postCode;
    }
    console.log(testCases, submissions);

    setIsLoading(true);
    executeBatch("submit", submissions, (results) => {
      if (results) setTestResult(transApiResult(results, false));
      else
        setTestResult({
          type: "Unknown Error",
          message:
            "There is an unknown error, possibly internet failure or non-English identifiers in code. Please try again",
          isError: true,
          time: undefined,
          memory: undefined,
        });
      console.log("submit!!!!!!!!!");
      setShowTab("Test Result");
      setIsLoading(false);
      setTestFold(false);
    });
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
    background: isButtonDisabled || isLoading ? "#a0c4e5" : "#5a92c5",
    color: "white",
    borderColor: "#094183",
    borderWidth: "1px",
    borderStyle: "solid",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    cursor: isButtonDisabled || isLoading ? "not-allowed" : "pointer",
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
          top: -16,
          left: "50%",
          transform: "translateY(-50%) translateX(-50%)",
          // borderRadius: "50%",
          // background: "lightgray",
          color: "lightgray",
          fontSize: "32px",
          // margin: "5px",
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
        {/* <span
          style={
            showTab === "Submissions" ? tabTitleChosenStyle : tabTitleStyle
          }
          onClick={() => {
            if (showTab !== "Submissions") setShowTab("Submissions");
          }}
        >
          Submissions
        </span> */}
      </span>

      <span>
        <Tooltip
          title="Run your code with inputs specified by yourself in 'Test Cases'."
          componentsProps={{ tooltip: { sx: { fontSize: "1em" } } }}
        >
          <span style={iconLabelStyle} onClick={handleRunButtonClick}>
            <SvgIcon component={PlayArrowIcon} style={iconStyle} />
            Run Your Testcase
          </span>
        </Tooltip>
        <Tooltip
          title="Submit and run your code with all pre-defined test cases. "
          componentsProps={{ tooltip: { sx: { fontSize: "1em" } } }}
        >
          <span style={iconLabelStyle} onClick={handleSubmitButtonClick}>
            <SvgIcon component={CloudUploadIcon} style={iconStyle} />
            Run All Testcases
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
        You may specify a test case here, ensuring to accurately define both the
        input and the expected output.
      </div>
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

const TestResult = ({ testResult, isLoading }) => {
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
  const loadingMessageStyle = {
    padding: "20px",
    fontSize: "14px",
  };
  return isLoading ? (
    <div style={loadingMessageStyle}>Code in Execution...</div>
  ) : (
    <div style={{ margin: "20px" }}>
      <div style={resultTypeStyle}>{testResult.type}</div>
      {testResult.time && testResult.memory && (
        <div>
          <span style={{ marginRight: "10px" }}>
            Runtime: {testResult.time}ms
          </span>
          <span>Memory:{testResult.memory}KB</span>
        </div>
      )}

      <div style={resultMessageStyle}>
        {testResult.message.split("\n").map((line, index, array) => (
          <div key={index}>
            {line}
            {index < array.length - 1 && <br />}
          </div>
        ))}
      </div>
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
  isLoading,
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
      {showTab === "Test Result" && (
        <TestResult testResult={testResult} isLoading={isLoading} />
      )}
    </div>
  );
};

const TestLayout = ({
  setTestFold,
  testFold,
  examples = [],
  clarification,
  preCode,
  postCode,
  userCode,
  testCases,
  verifyInputFormat,
  verifyOutputFormat,
}) => {
  const [showTab, setShowTab] = useState("Test Result");
  const [testInput, setTestInput] = useState(examples[0].input || "");
  const [expectedOutput, setExpectedOutput] = useState(
    examples[0].output || ""
  );
  const [testResult, setTestResult] = useState({
    type: "",
    message: "There will be running results once you run your code.",
    isError: false,
    time: undefined,
    memory: undefined,
  });
  const [isLoading, setIsLoading] = useState(false);

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
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        testInput={testInput}
        expectedOutput={expectedOutput}
        setTestResult={setTestResult}
        preCode={preCode}
        postCode={postCode}
        userCode={userCode}
        testCases={testCases}
        verifyInputFormat={verifyInputFormat}
        verifyOutputFormat={verifyOutputFormat}
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
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default TestLayout;
