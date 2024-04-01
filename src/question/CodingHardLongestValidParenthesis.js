import { Question } from "../util/utilClass";

function isInputValid(s) {
  // Check each character to see if it is not '(' or ')'
  for (let char of s) {
    if (char !== "(" && char !== ")") {
      return false; // Found a character that is not '(' or ')'
    }
  }
  return true; // All characters are '(' or ')'
}

function isOutputValid(s) {
  const regex = /^\d+$/;
  return regex.test(s);
}

const question = (recordLogic) =>
  new Question(
    "coding",
    recordLogic === "record"
      ? ["coding1-hard-longest-valid-parenthesis.md"]
      : [
          "coding2-hard_longest_valid_parenthesis-with.md",
          "coding2-hard_longest_valid_parenthesis-without.md",
        ],
    [],
    null,
    null,
    [
      { input: "(()", output: "2" },
      { input: ")()())", output: "4" },
      { input: "", output: "0" },
    ],
    `The input can be null. For any input that is not null, it will contain only '(' and/or ')'. \n
    The output should be an integer. `,
    ``,
    `
  var res = function (str) {
    return JSON.stringify(longestValidParentheses(str));
  };

const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString();
console.log(res(input));
`,
    recordLogic,
    recordLogic === "record"
      ? `/**
* @param {string} s
* @return {number}
*/
var longestValidParentheses = function(s) {
  
};`
      : null,
    [
      { stdin: "(()", expected_output: 2 },
      { stdin: ")()())", expected_output: 4 },
      { stdin: "", expected_output: 0 },
      { stdin: "())(()())", expected_output: 6 },
      { stdin: "((()))", expected_output: 6 },
      { stdin: "()(()", expected_output: 2 },
      { stdin: "(()(((()", expected_output: 2 },
      { stdin: "()()()", expected_output: 6 },
      { stdin: ")(", expected_output: 0 },
      { stdin: "((((((())))))", expected_output: 12 },
    ],
    isInputValid,
    isOutputValid
  );

export default question;
