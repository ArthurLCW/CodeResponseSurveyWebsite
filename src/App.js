import React, { useState, useEffect } from "react";
import "./App.css";
import SurveyComponent from "./component/SurveyComponent";
import FullScreenModalComponent from "./component/FullScreenModalComponent";
import { Question, Page } from "./util/utilClass";
import CodingEasyRemoveDuplicates from "./question/CodingEasyRemoveDuplicates";
import CodingEasyRansomNotes from "./question/CodingEasyRansomNotes";

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
    new Question(
      "likert-scale",
      ["post-test-variable.md"],
      [
        "Very good",
        "Somewhat good",
        "Neither good nor bad",
        "Somewhat bad",
        "Very bad",
        "I don't remember the variable naming style of the AI-generated codes",
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
  ];

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
    // screener (programming experience)
    screener: [
      new Page([
        new Question(
          "multiple-choice",
          ["screener1.md"],
          ["Yes", "No", "I don't know"]
        ),
        new Question(
          "likert-scale",
          ["screener2.md"],
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
          ["screener3.md"],
          [
            "Not involved at all",
            "Slightly involved",
            "Moderately involved",
            "Very involved",
            "Extremely involved",
          ]
        ),
        new Question(
          "multiple-choice",
          ["screener4.md"],
          [
            "Student specializing in IT-related fields.",
            "Professional specializing in IT (such as developer, testing engineer, operations engineer, etc).",
            "Others.",
          ]
        ),
        new Question(
          "multiple-choice",
          ["screener5.md"],
          ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "10+"]
        ),
      ]),
    ],
    // demographics (attitudes towards ai, language proficiency)
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
        new Question(
          "likert-scale",
          ["language-proficiency.md"],
          [
            "Not familiar at all",
            "Slightly familiar",
            "Moderately familiar",
            "Very familiar",
            "Extremely familiar",
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
    // coding (the medium one: remove-duplicates-from-sorted-list)
    codingMediumRemoveDuplicates: [
      // coding question (self-coding)
      new Page(
        [
          new Question(
            "coding",
            ["coding1-medium-remove-duplicates-from-sorted-list.md"],
            [],
            null,
            null,
            [
              { input: "[1,2,3,3,4,4,5]", output: "[1,2,5]" },
              { input: "[1,1,1,2,3]", output: "[2,3]" },
            ],
            `The input contains the values of all nodes presenting as an array. For example, [1,1,2] represents node(1)=>node(1)=>node(2). 
            Please notice that both the input and output is the head of a linked-list, NOT an Array. We use array to present input and output just for simplicity. `,
            `
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

function arrayToLinkedList(arr) {
  if (arr.length === 0) return undefined; // Handle empty array case

  let head = new ListNode(arr[0]); // Create the head of the linked list
  let current = head;

  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]); // Create and link the next node
    current = current.next; // Move to the newly created node
  }

  return head; // Return the head of the linked list
}

function linkedListToArray(head) {
  let arr = []; // Initialize an empty array to hold the node values

  let current = head; // Start with the head of the linked list

  while (current !== null && current !== undefined) {
    // Push the current node's value to the array, allowing for 'undefined' values
    arr.push(current.val);

    // Move to the next node in the list
    current = current.next;
  }

  return arr; // Return the array containing all node values
}
`,
            `
var res = function (str) {
  let arrayOld = JSON.parse(str);
  let linkedListOld = arrayToLinkedList(arrayOld);
  let linkedListNew = deleteDuplicates(linkedListOld);
  let arrayNew = linkedListToArray(linkedListNew);
  return JSON.stringify(arrayNew);
};

const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString();
console.log(res(input));
`,
            "record",
            `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *   this.val = (val===undefined ? 0 : val)
 *   this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
  
};`,
            [
              { stdin: "[1,2,3]", expected_output: "[1,2,3]" },
              { stdin: "[1,1,2]", expected_output: "[2]" },
              { stdin: "[1,1,2,3,3,4,5,5]", expected_output: "[2,4]" },
              { stdin: "[7,7,7,7]", expected_output: "[]" },
              { stdin: "[]", expected_output: "[]" },
              { stdin: "[-3,-3,0,1,1,2,3,3]", expected_output: "[0,2]" },
              { stdin: "[2,2,3,3,4,4,4]", expected_output: "[]" },
              {
                stdin: "[1,1,2,3,3,4,5,5,6]",
                expected_output: "[2,4,6]",
              },
              {
                stdin:
                  "[1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15,16,16,17,17,18,18,19,19,20,20]",
                expected_output: "[]",
              },
              {
                stdin:
                  "[100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]",
                expected_output: "[]",
              },
            ]
          ),
        ],
        600, // timer
        60
      ),

      // coding question (assisted coding)
      new Page(
        [
          new Question(
            "coding",
            [
              "coding2-medium-v11-remove-duplicates.md",
              "coding2-medium-v12-remove-duplicates.md",
              "coding2-medium-v13-remove-duplicates.md",
              "coding2-medium-v21-remove-duplicates.md",
              "coding2-medium-v22-remove-duplicates.md",
              "coding2-medium-v23-remove-duplicates.md",
            ],
            [],
            null,
            null,
            [
              { input: "[1,2,3,3,4,4,5]", output: "[1,2,5]" },
              { input: "[1,1,1,2,3]", output: "[2,3]" },
            ],
            `The input contains the values of all nodes presenting as an array. For example, [1,1,2] represents node(1)=>node(1)=>node(2). 
            Please notice that both the input and output is the head of a linked-list, NOT an Array. We use array to present input and output just for simplicity. `,
            `
            function ListNode(val, next) {
              this.val = val === undefined ? 0 : val;
              this.next = next === undefined ? null : next;
            }
            
            function arrayToLinkedList(arr) {
              if (arr.length === 0) return undefined; // Handle empty array case
            
              let head = new ListNode(arr[0]); // Create the head of the linked list
              let current = head;
            
              for (let i = 1; i < arr.length; i++) {
                current.next = new ListNode(arr[i]); // Create and link the next node
                current = current.next; // Move to the newly created node
              }
            
              return head; // Return the head of the linked list
            }
            
            function linkedListToArray(head) {
              let arr = []; // Initialize an empty array to hold the node values
            
              let current = head; // Start with the head of the linked list
            
              while (current !== null && current !== undefined) {
                // Push the current node's value to the array, allowing for 'undefined' values
                arr.push(current.val);
            
                // Move to the next node in the list
                current = current.next;
              }
            
              return arr; // Return the array containing all node values
            }
            `,
            `
            var res = function (str) {
              let arrayOld = JSON.parse(str);
              let linkedListOld = arrayToLinkedList(arrayOld);
              let linkedListNew = deleteDuplicates(linkedListOld);
              let arrayNew = linkedListToArray(linkedListNew);
              return JSON.stringify(arrayNew);
            };
            
            const fs = require("fs");
            let input = fs.readFileSync("/dev/stdin").toString();
            console.log(res(input));
            `,
            "display",
            null,
            [
              { stdin: "[1,2,3]", expected_output: "[1,2,3]" },
              { stdin: "[1,1,2]", expected_output: "[2]" },
              { stdin: "[1,1,2,3,3,4,5,5]", expected_output: "[2,4]" },
              { stdin: "[7,7,7,7]", expected_output: "[]" },
              { stdin: "[]", expected_output: "[]" },
              { stdin: "[-3,-3,0,1,1,2,3,3]", expected_output: "[0,2]" },
              { stdin: "[2,2,3,3,4,4,4]", expected_output: "[]" },
              {
                stdin: "[1,1,2,3,3,4,5,5,6]",
                expected_output: "[2,4,6]",
              },
              {
                stdin:
                  "[1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15,16,16,17,17,18,18,19,19,20,20]",
                expected_output: "[]",
              },
              {
                stdin:
                  "[100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]",
                expected_output: "[]",
              },
            ]
          ),
        ],
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
          ["domain-knowledge-twoPointer.md"],
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
    // easy_ransom_notes: [
    //   "consent",
    //   "screener",
    //   "demographics",
    //   "codingEasyRansomNotes",
    //   "gratitude",
    // ],
    easy_ransom_notes: ["consent", "codingEasyRansomNotes", "gratitude"],
    // easy_remove_duplicates: [
    //   "consent",
    //   "screener",
    //   "demographics",
    //   "codingEasyRemoveDuplicates",
    //   "gratitude",
    // ],
    easy_remove_duplicates: [
      "consent",
      "codingEasyRemoveDuplicates",
      "gratitude",
    ],
    // medium_remove_duplicates: [
    //   "consent",
    //   "screener",
    //   "demographics",
    //   "codingMediumRemoveDuplicates",
    //   "gratitude",
    // ],
    // medium_remove_duplicates: [
    //   "consent",
    //   "codingMediumRemoveDuplicates",
    //   "gratitude",
    // ],
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
      <FullScreenModalComponent
        isOpen={modalIsOpen}
        closeModal={closeModal}
        enterFullScreen={enterFullScreen}
        firstTimeEnter={firstTimeEnter}
      />
    </div>
  );
}

export default App;
