import { Question } from "../util/utilClass";

function isInputValid(s) {
  let arr;
  try {
    arr = JSON.parse(s);
  } catch (e) {
    return false;
  }

  if (!Array.isArray(arr)) {
    return false;
  }

  return arr.every((item) => {
    return Number.isInteger(item) || item === null;
  });
}

function isOutputValid(s) {
  if (s !== "true" && s !== "false") return false;
  return true;
}

const question = (recordLogic) =>
  new Question(
    "coding",
    recordLogic === "record"
      ? ["coding1-medium-validate-binary-search-tree.md"]
      : [
          "coding2-medium_validate_BST-with.md",
          "coding2-medium_validate_BST-without.md",
        ],
    [],
    null,
    null,
    [
      { input: "[2,1,3]", output: "true" },
      { input: "[5,1,4,null,null,3,6]", output: "false" },
    ],
    `The input for checking whether a binary tree is a valid Binary Search Tree (BST) is provided as an array representing the tree in level order.

    The first element represents the root's value.
    Subsequent elements represent the tree's nodes, level by level, from left to right.
    Null values indicate the absence of nodes, thereby preserving the structure. The output should be either true or false.`,
    `function TreeNode(val, left, right) {
      this.val = val === undefined ? 0 : val;
      this.left = left === undefined ? null : left;
      this.right = right === undefined ? null : right;
    }
    
    function buildTreeFromString(s) {
      let nodes;
      try {
        nodes = JSON.parse(s);
        if (!Array.isArray(nodes)) throw new Error("Input is not a valid array.");
      } catch {
        throw new Error(
          "The input cannot be parsed into a tree, please check carefully."
        );
      }
    
      if (nodes.length === 0) return null;
    
      const root = new TreeNode(nodes[0]);
      const queue = [root];
      let i = 1; // Index for the next node in the nodes array
    
      while (i < nodes.length && queue.length > 0) {
        const current = queue.shift();
        if (!current) continue; // Skip null placeholders
    
        // Process left child
        if (nodes[i] !== undefined) {
          if (nodes[i] !== null) {
            current.left = new TreeNode(nodes[i]);
            queue.push(current.left);
          } else {
            queue.push(null); // Keep a placeholder for structural integrity
          }
          i++;
        }
    
        // Process right child
        if (nodes[i] !== undefined) {
          if (nodes[i] !== null) {
            current.right = new TreeNode(nodes[i]);
            queue.push(current.right);
          } else {
            queue.push(null); // Keep a placeholder for structural integrity
          }
          i++;
        }
      }
    
      // If there are any non-null nodes left in the array, it's an error
      if (i < nodes.length) {
        throw new Error(
          "Invalid tree structure: the array contains extra nodes that cannot fit in a binary tree."
        );
      }
    
      return root;
    }`,

    `
    var res = function (str) {
      const inputHead = buildTreeFromString(str);
      let ans;
      if (inputHead) {
        ans = isValidBST(inputHead);
      }
      return JSON.stringify(ans);
    };

const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString();
console.log(res(input));
`,
    recordLogic,
    recordLogic === "record"
      ? `/**
* Definition for a binary tree node.
* function TreeNode(val, left, right) {
*   this.val = (val===undefined ? 0 : val)
*   this.left = (left===undefined ? null : left)
*   this.right = (right===undefined ? null : right)
* }
*/
/**
  * @param {TreeNode} root
  * @return {boolean}
*/
var isValidBST = function(root) {
  
};`
      : null,
    [
      { stdin: "[2,1,3]", expected_output: "true" },
      { stdin: "[5,1,4,null,null,3,6]", expected_output: "false" },
      { stdin: "[10,5,15,null,null,6,20]", expected_output: "false" },
      { stdin: "[3,2,5,1,4]", expected_output: "false" },
      { stdin: "[1, null, 2, null, 3]", expected_output: "true" },
      { stdin: "[5,4,6,null,null,3,7]", expected_output: "false" },
      { stdin: "[1]", expected_output: "true" },
      { stdin: "[10,5,15,null,null,11,20]", expected_output: "true" },
      { stdin: "[2,2,2]", expected_output: "false" },
      { stdin: "[5,1,7,null,null,6,8]", expected_output: "true" },
    ],
    isInputValid,
    isOutputValid
  );

export default question;
