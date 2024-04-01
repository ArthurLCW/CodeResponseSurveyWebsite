import { Question } from "../util/utilClass";

function isInputValid(s) {
  const parts = s.split(" ");

  if (parts.length !== 2) return false;

  return parts.every((part) => {
    return /^\d+$/.test(part) && parseInt(part, 10) > 0;
  });
}

function isOutputValid(s) {
  const regex = /^[1-9]\d*$/;
  return regex.test(s);
}

const question = (recordLogic) =>
  new Question(
    "coding",
    recordLogic === "record"
      ? ["coding1-medium-find-the-winner-of-the-circular-game.md"]
      : [
          "coding2-medium_find_winner-with.md",
          "coding2-medium_find_winner-without.md",
        ],
    [],
    null,
    null,
    [
      { input: "5 2", output: "3" },
      { input: "6 5", output: "1" },
    ],
    `The input should consist of two positive integers, n and k, separated by a space. 
    The output should be a positive integer.`,
    ``,
    `
  var res = function (str) {
    const inputs = str.split(" ");
    return JSON.stringify(findTheWinner(inputs[0], inputs[1]));
  };

const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString();
console.log(res(input));
`,
    recordLogic,
    recordLogic === "record"
      ? `/**
* @param {number} n
* @param {number} k
* @return {number}
*/
var findTheWinner = function(n, k) {
  
};`
      : null,
    [
      { stdin: "5 2", expected_output: "3" },
      { stdin: "6 5", expected_output: "1" },
      { stdin: "10 3", expected_output: "4" },
      { stdin: "7 7", expected_output: "5" },
      { stdin: "4 1", expected_output: "4" },
      { stdin: "9 2", expected_output: "3" },
      { stdin: "11 6", expected_output: "9" },
      { stdin: "3 2", expected_output: "3" },
      { stdin: "8 4", expected_output: "6" },
      { stdin: "15 5", expected_output: "1" },
    ],
    isInputValid,
    isOutputValid
  );

export default question;
