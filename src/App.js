import React, { useState, useEffect, lazy, Suspense } from "react";
import "./App.css";
import { Question, Page } from "./util/utilClass";
import CodingEasyRemoveDuplicates from "./question/CodingEasyRemoveDuplicates";
import CodingEasyRansomNotes from "./question/CodingEasyRansomNotes";
import CodingHardLongestValidParenthesis from "./question/CodingHardLongestValidParenthesis";
import CodingMediumFindWinner from "./question/CodingMediumFindWinner";
import CodingMediumValidateBST from "./question/CodingMediumValidateBST";
import LoadingComponent from "./component/LoadingComponent";

const SurveyComponent = lazy(() => import("./component/SurveyComponent"));
const FullScreenModalComponent = lazy(() =>
  import("./component/FullScreenModalComponent")
);

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
      // Logic to set focus at the top of the application.
      const topOfAppElement = document.getElementById("top-of-app");
      if (topOfAppElement) {
        // console.log("focus exist");
        topOfAppElement.focus();
      }
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

  const closeModal = (e) => {
    setModalIsOpen(false);
    // console.log("reject full screen mode.");
    sessionStorage.setItem("rejectFullScreen", true);

    e.preventDefault();
    document.addEventListener("focusin", (event) => {
      // console.log("Focused on:", event.target);
    });
    const topOfAppElement = document.getElementById("top-of-app");
    if (topOfAppElement) {
      // console.log("focus element exist");
      topOfAppElement.focus();
    }
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
  ];

  const pageObj = {
    consent: [
      new Page([
        new Question(
          // "multiple-choice",
          "likert-scale",
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
          // "multiple-choice",
          "likert-scale",
          ["screener-prolific.md"],
          ["Yes", "No", "I don't know"]
        ),
        new Question(
          // "multiple-choice",
          "likert-scale",
          ["screener-current-job.md"],
          [
            "Student specializing in IT-related fields.",
            "Professional specializing in IT (developer, testing engineer, operations engineer, etc).",
            "Others.",
          ]
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
        // new Question(
        //   // "multiple-choice",
        //   "likert-scale",
        //   ["screener-programming-experience-obj.md"],
        //   ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "10+"]
        // ),
        new Question("fill-in-the-blank-int", [
          "screener-programming-experience-obj.md",
        ]),
        new Question(
          "likert-scale",
          ["screener-language-proficiency-sub.md"],
          [
            "Not familiar at all",
            "Slightly familiar",
            "Moderately familiar",
            "Very familiar",
            "Extremely familiar",
          ]
        ),
        // new Question(
        //   // "multiple-choice",
        //   "likert-scale",
        //   ["screener-language-proficiency-obj.md"],
        //   ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "10+"]
        // ),
        new Question("fill-in-the-blank-int", [
          "screener-language-proficiency-obj.md",
        ]),
        new Question("likert-scale-grid", ["attitudes-general.md"], {
          statements: [
            "I trust AI code generation system",
            "AI code generation system will benefit programmers",
            "I fear AI code generation system",
            "AI will destroy humankind",
            "AI code generation system will cause many job losses",
          ],
          scale: Array.from({ length: 11 }, (_, i) => i),
        }),
      ]),
    ],
    // demographics (attitudes towards ai)
    demographics: [
      new Page([
        new Question("likert-scale-grid", ["attitudes-general.md"], {
          statements: [
            "I trust AI code generation system",
            "AI code generation system will benefit programmers",
            "I fear AI code generation system",
            "AI will destroy humankind",
            "AI code generation system will cause many job losses",
          ],
          scale: Array.from({ length: 11 }, (_, i) => i),
        }),
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
          ["domain-knowledge-HashMap-sub.md"],
          [
            "Not familiar at all",
            "Slightly familiar",
            "Moderately familiar",
            "Very familiar",
            "Extremely familiar",
          ]
        ),
        new Question(
          // "multiple-choice",
          "likert-scale",
          ["domain-knowledge-HashMap-obj.md"],
          [
            "I have never heard of hash maps before this survey. ",
            "I have heard of hash maps, but I have never used them.",
            "I have occasionally used hash maps, but not on a regular basis.",
            "I regularly use hash maps in my projects or work. ",
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
          ["domain-knowledge-LinkedList-sub.md"],
          [
            "Not familiar at all",
            "Slightly familiar",
            "Moderately familiar",
            "Very familiar",
            "Extremely familiar",
          ]
        ),
        new Question(
          // "multiple-choice",
          "likert-scale",
          ["domain-knowledge-LinkedList-obj.md"],
          [
            "I have never heard of linked lists before this survey. ",
            "I have heard of linked lists, but I have never used them.",
            "I have occasionally used linked lists, but not on a regular basis.",
            "I regularly use linked lists in my projects or work. ",
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
          ["domain-knowledge-queue-sub.md"],
          [
            "Not familiar at all",
            "Slightly familiar",
            "Moderately familiar",
            "Very familiar",
            "Extremely familiar",
          ]
        ),
        new Question(
          // "multiple-choice",
          "likert-scale",
          ["domain-knowledge-queue-obj.md"],
          [
            "I have never heard of queues before this survey. ",
            "I have heard of queues, but I have never used them.",
            "I have occasionally used queues, but not on a regular basis.",
            "I regularly use queues in my projects or work. ",
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
          ["domain-knowledge-tree-sub.md"],
          [
            "Not familiar at all",
            "Slightly familiar",
            "Moderately familiar",
            "Very familiar",
            "Extremely familiar",
          ]
        ),
        new Question(
          // "multiple-choice",
          "likert-scale",
          ["domain-knowledge-tree-obj.md"],
          [
            "I have never heard of trees before this survey. ",
            "I have heard of trees, but I have never used them.",
            "I have occasionally used trees, but not on a regular basis.",
            "I regularly use trees in my projects or work. ",
          ]
        ),
        new Question(
          "likert-scale",
          ["domain-knowledge-recursion-sub.md"],
          [
            "Not familiar at all",
            "Slightly familiar",
            "Moderately familiar",
            "Very familiar",
            "Extremely familiar",
          ]
        ),
        new Question(
          // "multiple-choice",
          "likert-scale",
          ["domain-knowledge-recursion-obj.md"],
          [
            "I have never heard of recursion before this survey. ",
            "I have heard of recursion, but I have never used it.",
            "I have occasionally used recursion, but not on a regular basis.",
            "I regularly use recursion in my projects or work. ",
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
          ["domain-knowledge-stack-sub.md"],
          [
            "Not familiar at all",
            "Slightly familiar",
            "Moderately familiar",
            "Very familiar",
            "Extremely familiar",
          ]
        ),
        new Question(
          // "multiple-choice",
          "likert-scale",
          ["domain-knowledge-stack-obj.md"],
          [
            "I have never heard of stacks before this survey. ",
            "I have heard of stacks, but I have never used them.",
            "I have occasionally used stacks, but not on a regular basis.",
            "I regularly use stacks in my projects or work. ",
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
      // "demographics",
      "codingEasyRansomNotes",
      "gratitude",
    ],
    // easy_ransom_notes: ["consent", "codingEasyRansomNotes", "gratitude"],
    easy_remove_duplicates: [
      "consent",
      "screener",
      // "demographics",
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
      // "demographics",
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
      // "demographics",
      "codingMediumFindWinner",
      "gratitude",
    ],
    // medium_find_winner: ["consent", "codingMediumFindWinner", "gratitude"],
    medium_validate_BST: [
      "consent",
      "screener",
      // "demographics",
      "codingMediumValidateBST",
      "gratitude",
    ],
    // medium_validate_BST: ["consent", "codingMediumValidateBST", "gratitude"],
  };

  return (
    <div>
      <div className="app">
        <div
          tabIndex="-1"
          id="top-of-app"
          style={{ height: "1px", outline: "none" }}
        ></div>
        <div className="survey">
          <Suspense fallback={<LoadingComponent />}>
            <SurveyComponent
              // pageArray={pageArray}
              pageObj={pageObj}
              pageSection={pageSection}
              rememberState={false}
              setEnableModal={setEnableModal}
            />
          </Suspense>
        </div>
      </div>
      <Suspense fallback={<LoadingComponent />}>
        <FullScreenModalComponent
          isOpen={modalIsOpen}
          closeModal={(e) => closeModal(e)}
          enterFullScreen={enterFullScreen}
          firstTimeEnter={firstTimeEnter}
        />
      </Suspense>
    </div>
  );
}

export default App;
