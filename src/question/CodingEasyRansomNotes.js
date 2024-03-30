import { Question } from "../util/utilClass";

function isInputValid(inputString) {
  // Split the input string by space
  const parts = inputString.split(" ");

  // Check if there are exactly two parts and neither of them is an empty string
  if (parts.length === 2 && parts[0] !== "" && parts[1] !== "") {
    return true;
  } else {
    return false;
  }
}

function isOutputValid(str) {
  if (str !== "true" && str !== "false") return false;
  return true;
}

const question = (recordLogic) =>
  new Question(
    "coding",
    recordLogic === "record"
      ? ["coding1-easy-ransom-notes.md"]
      : [
          "coding2-easy_ransom_notes-with.md",
          "coding2-easy_ransom_notes-without.md",
        ],
    [],
    null,
    null,
    [
      { input: "a b", output: "false" },
      { input: "aa ab", output: "false" },
      { input: "aa aab", output: "true" },
    ],
    `The input contains ransomNote and magazine, separated by a space.
    The output should be either true or false.`,
    ``,
    `
  var res = function (str) {
    const inputs = str.split(" ");
  
    return JSON.stringify(canConstruct(inputs[0], inputs[1]));
  };

const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString();
console.log(res(input));
`,
    recordLogic,
    recordLogic === "record"
      ? `/**
* @param {string} ransomNote
* @param {string} magazine
* @return {boolean}
*/
var canConstruct = function(ransomNote, magazine) {
  
};`
      : null,
    [
      {
        stdin: "a b",
        expected_output: "false",
      },
      {
        stdin: "aa ab",
        expected_output: "false",
      },
      {
        stdin: "aa aab",
        expected_output: "true",
      },
      {
        stdin: "hello helloworld",
        expected_output: "true",
      },
      {
        stdin: "world hello",
        expected_output: "false",
      },
      {
        stdin: "openai apioneerinartificialintelligence",
        expected_output: "true",
      },
      {
        stdin: "chatgpt techgiant",
        expected_output: "false",
      },
      {
        stdin: "zz z",
        expected_output: "false",
      },
      {
        stdin: "quickbrownfox thequickbrownfoxjumpsoverthelazydog",
        expected_output: "true",
      },
      {
        stdin: "lazydog thequickbrownfoxjumpsover",
        expected_output: "false",
      },
    ],
    isInputValid,
    isOutputValid
  );

export default question;
