import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./App.css";
import SurveyComponent from "./component/SurveyComponent";
import { Question, Page } from "./util/utilClass";

Modal.setAppElement("#root");

function App() {
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [enableModal, setEnableModal] = useState(false);
  const [firstTimeEnter, setFirstTimeEnter] = useState(true);

  const [leaveFullScreenTimes, setLeaveFullScreenTimes] = useState(
    parseInt(sessionStorage.getItem("leaveFullScreenTimes")) || 0
  );

  useEffect(() => {
    function onFullScreenChange() {
      if (!document.fullscreenElement && enableModal) {
        setModalIsOpen(true);
        setLeaveFullScreenTimes((prevTimes) => {
          const newTimes = prevTimes + 1;
          sessionStorage.setItem("leaveFullScreenTimes", newTimes);
          return newTimes;
        });
      }
    }

    document.addEventListener("fullscreenchange", onFullScreenChange);
    if (enableModal) {
      setModalIsOpen(true);
    }

    return () => {
      document.removeEventListener("fullscreenchange", onFullScreenChange);
    };
  }, [enableModal]);

  const enterFullScreen = () => {
    document.documentElement.requestFullscreen().catch((e) => {
      console.error(`Cannot enter full screen mode: ${e.message}`);
    });
    setModalIsOpen(false);
    if (firstTimeEnter) setFirstTimeEnter(false);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    console.log("reject full screen mode.");
    sessionStorage.setItem("rejectFullScreen", true);
  };

  const pageObj = {
    consent: [
      new Page([
        new Question(
          "multiple-choice",
          ["consent.md"],
          [
            "Yes, I agree to participate in this study.",
            "No, I disagree to participate in this study.",
          ],
          "No, I disagree to participate in this study.",
          "Thanks for your time. We respect your decision of not participating in this study. Now you may leave this website."
        ),
      ]),
    ],
    // // screener (programming experience)
    // screener: [
    //   new Page([
    //     new Question(
    //       "multiple-choice",
    //       ["screener1.md"],
    //       ["Yes", "No", "I don't know"]
    //     ),
    //     new Question(
    //       "likert-scale",
    //       ["screener2.md"],
    //       [
    //         "Not experienced at all",
    //         "Slightly experienced",
    //         "Moderately experienced",
    //         "Very experienced",
    //         "Extremely experienced",
    //       ]
    //     ),
    //     new Question(
    //       "likert-scale",
    //       ["screener3.md"],
    //       [
    //         "Not involved at all",
    //         "Slightly involved",
    //         "Moderately involved",
    //         "Very involved",
    //         "Extremely involved",
    //       ]
    //     ),
    //     new Question(
    //       "multiple-choice",
    //       ["screener4.md"],
    //       [
    //         "Student specializing in IT-related fields.",
    //         "Professional specializing in IT (such as developer, testing engineer, operations engineer, etc).",
    //         "Others.",
    //       ]
    //     ),
    //     new Question(
    //       "multiple-choice",
    //       ["screener5.md"],
    //       ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "10+"]
    //     ),
    //   ]),
    // ],
    // // demographics (attitudes towards ai, language proficiency)
    // demographics: [
    //   new Page([
    //     new Question(
    //       "likert-scale",
    //       ["attitudes1.md"],
    //       [
    //         "0 (Strongly disagree)",
    //         "1",
    //         "2",
    //         "3",
    //         "4",
    //         "5",
    //         "6",
    //         "7",
    //         "8",
    //         "9",
    //         "10 (Strongly agree)",
    //       ]
    //     ),
    //     new Question(
    //       "likert-scale",
    //       ["attitudes2.md"],
    //       [
    //         "0 (Strongly disagree)",
    //         "1",
    //         "2",
    //         "3",
    //         "4",
    //         "5",
    //         "6",
    //         "7",
    //         "8",
    //         "9",
    //         "10 (Strongly agree)",
    //       ]
    //     ),
    //     new Question(
    //       "likert-scale",
    //       ["attitudes3.md"],
    //       [
    //         "0 (Strongly disagree)",
    //         "1",
    //         "2",
    //         "3",
    //         "4",
    //         "5",
    //         "6",
    //         "7",
    //         "8",
    //         "9",
    //         "10 (Strongly agree)",
    //       ]
    //     ),
    //     new Question(
    //       "likert-scale",
    //       ["attitudes4.md"],
    //       [
    //         "0 (Strongly disagree)",
    //         "1",
    //         "2",
    //         "3",
    //         "4",
    //         "5",
    //         "6",
    //         "7",
    //         "8",
    //         "9",
    //         "10 (Strongly agree)",
    //       ]
    //     ),
    //     new Question(
    //       "likert-scale",
    //       ["attitudes5.md"],
    //       [
    //         "0 (Strongly disagree)",
    //         "1",
    //         "2",
    //         "3",
    //         "4",
    //         "5",
    //         "6",
    //         "7",
    //         "8",
    //         "9",
    //         "10 (Strongly agree)",
    //       ]
    //     ),
    //     new Question(
    //       "likert-scale",
    //       ["language-proficiency.md"],
    //       [
    //         "Not familiar at all",
    //         "Slightly familiar",
    //         "Moderately familiar",
    //         "Very familiar",
    //         "Extremely familiar",
    //       ]
    //     ),
    //   ]),
    // ],
    // coding (the medium one)
    codingMedium: [
      // coding question (self-coding)
      new Page(
        [
          new Question(
            "coding",
            ["coding1-medium.md"],
            [],
            null,
            null,
            "record",
            `
/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {

};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {

};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {

};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
            `
          ),
        ],
        420, // timer
        1
      ),

      // coding question (assisted coding)
      new Page(
        [
          new Question(
            "coding",
            [
              "coding2-medium-v11.md",
              "coding2-medium-v12.md",
              "coding2-medium-v13.md",
              "coding2-medium-v21.md",
              "coding2-medium-v22.md",
              "coding2-medium-v23.md",
            ],
            [],
            null,
            null,
            "display"
          ),
        ],
        420, // timer
        1
      ),

      // post-hoc (domain knowledge familarity & perceived difficulty)
      new Page([
        new Question(
          "likert-scale",
          ["domain-knowledge-LRU.md"],
          [
            "Not familiar at all",
            "Slightly familiar",
            "Moderately familiar",
            "Very familiar",
            "Extremely familiar",
          ]
        ),
        new Question(
          "likert-scale",
          ["domain-knowledge-HashMap.md"],
          [
            "Not familiar at all",
            "Slightly familiar",
            "Moderately familiar",
            "Very familiar",
            "Extremely familiar",
          ]
        ),
        new Question(
          "likert-scale",
          ["domain-knowledge-LinkedList.md"],
          [
            "Not familiar at all",
            "Slightly familiar",
            "Moderately familiar",
            "Very familiar",
            "Extremely familiar",
          ]
        ),
        new Question(
          "likert-scale",
          ["perceived-difficulty.md"],
          [
            "Extremely easy",
            "Somewhat Easy",
            "Neither easy nor difficult",
            "Somewhat difficult",
            "Extremely difficult",
          ]
        ),
      ]),
    ],
    // coding (the medium one)
    codingEasy: [
      // coding question (self-coding)
      new Page(
        [
          new Question(
            "coding",
            ["coding1-easy.md"],
            [],
            null,
            null,
            "record",
            `
/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function(ransomNote, magazine) {

};
        `
          ),
        ],
        420, // timer
        1
      ),

      // coding question (assisted coding)
      new Page(
        [
          new Question(
            "coding",
            [
              "coding2-easy-v11.md",
              "coding2-easy-v12.md",
              "coding2-easy-v13.md",
              "coding2-easy-v21.md",
              "coding2-easy-v22.md",
              "coding2-easy-v23.md",
            ],
            [],
            null,
            null,
            "display"
          ),
        ],
        420, // timer
        1
      ),

      // post-hoc (domain knowledge familarity & perceived difficulty)
      new Page([
        new Question(
          "likert-scale",
          ["domain-knowledge-HashMap.md"],
          [
            "Not familiar at all",
            "Slightly familiar",
            "Moderately familiar",
            "Very familiar",
            "Extremely familiar",
          ]
        ),
        new Question(
          "likert-scale",
          ["perceived-difficulty.md"],
          [
            "Extremely easy",
            "Somewhat Easy",
            "Neither easy nor difficult",
            "Somewhat difficult",
            "Extremely difficult",
          ]
        ),
      ]),
    ],
    gratitude: [new Page([new Question("null", ["gratitude.md"], [])])],
  };

  const pageSection = {
    medium: [
      "consent",
      "screener",
      "demographics",
      "codingMedium",
      "gratitude",
    ],
    easy: ["consent", "screener", "demographics", "codingEasy", "gratitude"],
  };

  return (
    <div>
      <div className="app">
        <div className="survey">
          <SurveyComponent
            // pageArray={pageArray}
            pageObj={pageObj}
            pageSection={pageSection}
            rememberState={false}
            setEnableModal={setEnableModal}
          />
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        contentLabel="full-screen-mode-confirmation"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <div style={{ display: "flex" }}>
          <h1 style={{ margin: "auto" }}>Full-Screen Mode</h1>
        </div>
        {firstTimeEnter ? (
          <h3>Are you willing to enter full-screen mode?</h3>
        ) : (
          <h3>Are you sure you want to exit full-screen mode?</h3>
        )}
        <p>
          Please notice that we will record your action of leaving full-screen
          mode or reject entering full-screen mode.
        </p>
        {firstTimeEnter ? (
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <button onClick={enterFullScreen} className="attractive-btn">
              Yes
            </button>
            <button onClick={closeModal} className="less-attractive-btn">
              No
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <button onClick={closeModal} className="less-attractive-btn">
              Yes
            </button>
            <button onClick={enterFullScreen} className="attractive-btn">
              No
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default App;

// import React, { useState } from "react";
// import { render } from "react-dom";
// import MonacoEditor from "react-monaco-editor";

// const App = () => {
//   // 初始化代码状态
//   const [code, setCode] = useState(
//     '// 你可以在这里写一些 C++ 代码\n#include<iostream>\nint main() {\n  std::cout << "Hello, World!" << std::endl;\n  return 0;\n}'
//   );

//   // 处理编辑器内容变化
//   const handleEditorChange = (newValue, e) => {
//     setCode(newValue);
//   };

//   // 配置编辑器选项
//   const options = {
//     selectOnLineNumbers: true,
//     roundedSelection: false,
//     readOnly: false,
//     cursorStyle: "line",
//     automaticLayout: true,
//   };

//   return (
//     <MonacoEditor
//       width="800"
//       height="600"
//       language="cpp"
//       theme="vs-dark"
//       value={code}
//       options={options}
//       onChange={handleEditorChange}
//     />
//   );
// };

// // render(<App />, document.getElementById('root'));
// export default App;
