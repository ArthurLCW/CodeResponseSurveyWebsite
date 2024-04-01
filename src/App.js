import React, { useState, useEffect } from "react";
import "./App.css";
import SurveyComponent from "./component/SurveyComponent";
import FullScreenModalComponent from "./component/FullScreenModalComponent";
import { Question, Page } from "./util/utilClass";
import CodingEasyRemoveDuplicates from "./question/CodingEasyRemoveDuplicates";
import CodingEasyRansomNotes from "./question/CodingEasyRansomNotes";
import CodingHardLongestValidParenthesis from "./question/CodingHardLongestValidParenthesis";
import CodingMediumFindWinner from "./question/CodingMediumFindWinner";
import CodingMediumValidateBST from "./question/CodingMediumValidateBST";

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

  useEffect(() => {
    function onFullScreenChange() {
      if (!document.fullscreenElement && enableModal) {
        setModalIsOpen(true);
        // get records object
        let leaveFullScreenObj;
        if (!sessionStorage.getItem("leaveFullScreenTimes")) {
          leaveFullScreenObj = {};
        } else {
          leaveFullScreenObj = JSON.parse(
            sessionStorage.getItem("leaveFullScreenTimes")
          );
        }

        // get/set current page record
        if (!leaveFullScreenObj[sessionStorage.getItem("currentPage")]) {
          leaveFullScreenObj[sessionStorage.getItem("currentPage")] = [1, 0];
        } else {
          leaveFullScreenObj[sessionStorage.getItem("currentPage")][0] =
            leaveFullScreenObj[sessionStorage.getItem("currentPage")][0] + 1;
        }

        // set records object
        sessionStorage.setItem(
          "leaveFullScreenTimes",
          JSON.stringify(leaveFullScreenObj)
        );
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

  const programFactorsQuestions = [
    new Question(
      "likert-scale",
      ["post-test-time-complexity.md"],
      [
        "My code is better",
        "AI-code is better",
        "They are equivalently good",
        "I don't know",
      ]
    ),
    new Question(
      "likert-scale",
      ["post-test-space-complexity.md"],
      [
        "My code is better",
        "AI-code is better",
        "They are equivalently good",
        "I don't know",
      ]
    ),
    new Question(
      "likert-scale",
      ["post-test-comprehend.md"],
      [
        "Fully understand",
        "Somewhat understand",
        "Do not understand",
        "I don't remember if I can understand. ",
      ]
    ),
    new Question(
      "likert-scale",
      ["post-test-code-quality.md"],
      [
        "Very good",
        "Somewhat good",
        "Neither good nor bad",
        "Somewhat bad",
        "Very bad",
        "I don't remember the quality of the AI-generated codes",
      ]
    ),
    // new Question(
    //   "likert-scale",
    //   ["post-test-variable.md"],
    //   [
    //     "Very good",
    //     "Somewhat good",
    //     "Neither good nor bad",
    //     "Somewhat bad",
    //     "Very bad",
    //     "I don't remember the variable naming style of the AI-generated codes",
    //   ]
    // ),
    new Question(
      "likert-scale",
      ["post-test-comment.md"],
      [
        "Very good",
        "Somewhat good",
        "Neither good nor bad",
        "Somewhat bad",
        "Very bad",
        "I don't remember the comment quality of the AI-generated codes",
        "There is no comment in the AI-generated codes",
      ]
    ),
  ];

  const pageObj = {
    consent: [
      new Page([
        new Question(
          "multiple-choice",
          ["consent.md"],
          [
            "Yes, I agree to participate in this study.",
            "No, I decline to participate in this study.",
          ],
          "No, I decline to participate in this study.",
          "Thanks for your time. We respect your decision not to participate in this study. Now, you may leave this website."
        ),
      ]),
    ],
    // screener (programming experience, language proficiency)
    screener: [
      new Page([
        new Question(
          "multiple-choice",
          ["screener-prolific.md"],
          ["Yes", "No", "I don't know"]
        ),
        new Question(
          "multiple-choice",
          ["screener-current-job.md"],
          [
            "Student specializing in IT-related fields.",
            "Professional specializing in IT (developer, testing engineer, operations engineer, etc).",
            "Others.",
          ]
        ),
        new Question(
          "multiple-choice",
          ["screener-programming-experience-obj.md"],
          ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "10+"]
        ),
        new Question(
          "multiple-choice",
          ["screener-language-proficiency-obj.md"],
          ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "10+"]
        ),
        new Question(
          "likert-scale",
          ["screener-programming-experience-sub.md"],
          [
            "Not experienced at all",
            "Slightly experienced",
            "Moderately experienced",
            "Very experienced",
            "Extremely experienced",
          ]
        ),
        new Question(
          "likert-scale",
          ["screener-language-proficiency-obj.md"],
          [
            "Not involved at all",
            "Slightly involved",
            "Moderately involved",
            "Very involved",
            "Extremely involved",
          ]
        ),
      ]),
    ],
    // demographics (attitudes towards ai)
    demographics: [
      new Page([
        new Question(
          "likert-scale",
          ["attitudes1.md"],
          [
            "0 (Strongly disagree)",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10 (Strongly agree)",
          ]
        ),
        new Question(
          "likert-scale",
          ["attitudes2.md"],
          [
            "0 (Strongly disagree)",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10 (Strongly agree)",
          ]
        ),
        new Question(
          "likert-scale",
          ["attitudes3.md"],
          [
            "0 (Strongly disagree)",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10 (Strongly agree)",
          ]
        ),
        new Question(
          "likert-scale",
          ["attitudes4.md"],
          [
            "0 (Strongly disagree)",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10 (Strongly agree)",
          ]
        ),
        new Question(
          "likert-scale",
          ["attitudes5.md"],
          [
            "0 (Strongly disagree)",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10 (Strongly agree)",
          ]
        ),
      ]),
    ],
    // coding (the easy one: ransom note)
    codingEasyRansomNotes: [
      // coding question (self-coding)
      new Page(
        [CodingEasyRansomNotes("record")],
        600, // timer
        60
      ),

      // coding question (assisted coding)
      new Page(
        [CodingEasyRansomNotes("display")],
        600, // timer
        60
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
        ...programFactorsQuestions,
      ]),
    ],
    // coding (the easy one: remove-duplicates-from-sorted-list)
    codingEasyRemoveDuplicates: [
      // coding question (self-coding)
      new Page(
        [CodingEasyRemoveDuplicates("record")],
        600, // timer
        60
      ),

      // coding question (assisted coding)
      new Page(
        [CodingEasyRemoveDuplicates("display")],
        600, // timer
        60
      ),

      // post-hoc (domain knowledge familarity & perceived difficulty)
      new Page([
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
        ...programFactorsQuestions,
      ]),
    ],

    // coding (the medium one: 1823. Find the Winner of the Circular Game)
    codingMediumFindWinner: [
      // coding question (self-coding)
      new Page(
        [CodingMediumFindWinner("record")],
        600, // timer
        60
      ),

      // coding question (assisted coding)
      new Page(
        [CodingMediumFindWinner("display")],
        600, // timer
        60
      ),

      // post-hoc (domain knowledge familarity & perceived difficulty)
      new Page([
        new Question(
          "likert-scale",
          ["domain-knowledge-queue.md"],
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
        ...programFactorsQuestions,
      ]),
    ],

    // coding (the medium one: 98. Validate Binary Search Tree)
    codingMediumValidateBST: [
      // coding question (self-coding)
      new Page(
        [CodingMediumValidateBST("record")],
        600, // timer
        60
      ),

      // coding question (assisted coding)
      new Page(
        [CodingMediumValidateBST("display")],
        600, // timer
        60
      ),

      // post-hoc (domain knowledge familarity & perceived difficulty)
      new Page([
        new Question(
          "likert-scale",
          ["domain-knowledge-tree.md"],
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
          ["domain-knowledge-recursion.md"],
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
        ...programFactorsQuestions,
      ]),
    ],

    // coding (the hard one: longest valid parenthesis)
    codingHardLongestValidParenthesis: [
      // coding question (self-coding)
      new Page(
        [CodingHardLongestValidParenthesis("record")],
        600, // timer
        60
      ),

      // coding question (assisted coding)
      new Page(
        [CodingHardLongestValidParenthesis("display")],
        600, // timer
        60
      ),

      // post-hoc (domain knowledge familarity & perceived difficulty)
      new Page([
        new Question(
          "likert-scale",
          ["domain-knowledge-stack.md"],
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
          ["domain-knowledge-dynamic-programming.md"],
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
        ...programFactorsQuestions,
      ]),
    ],

    gratitude: [new Page([new Question("null", ["gratitude.md"], [])])],
  };

  const pageSection = {
    easy_ransom_notes: [
      "consent",
      "screener",
      "demographics",
      "codingEasyRansomNotes",
      "gratitude",
    ],
    // easy_ransom_notes: ["consent", "codingEasyRansomNotes", "gratitude"],
    easy_remove_duplicates: [
      "consent",
      "screener",
      "demographics",
      "codingEasyRemoveDuplicates",
      "gratitude",
    ],
    // easy_remove_duplicates: [
    //   "consent",
    //   "codingEasyRemoveDuplicates",
    //   "gratitude",
    // ],
    hard_longest_valid_parenthesis: [
      "consent",
      "screener",
      "demographics",
      "codingHardLongestValidParenthesis",
      "gratitude",
    ],
    // hard_longest_valid_parenthesis: [
    //   "consent",
    //   "codingHardLongestValidParenthesis",
    //   "gratitude",
    // ],
    medium_find_winner: [
      "consent",
      "screener",
      "demographics",
      "codingMediumFindWinner",
      "gratitude",
    ],
    // medium_find_winner: ["consent", "codingMediumFindWinner", "gratitude"],
    medium_validate_BST: [
      "consent",
      "screener",
      "demographics",
      "codingMediumValidateBST",
      "gratitude",
    ],
    // medium_validate_BST: ["consent", "codingMediumValidateBST", "gratitude"],
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
      {/* <FullScreenModalComponent
        isOpen={modalIsOpen}
        closeModal={closeModal}
        enterFullScreen={enterFullScreen}
        firstTimeEnter={firstTimeEnter}
      /> */}
    </div>
  );
}

export default App;
