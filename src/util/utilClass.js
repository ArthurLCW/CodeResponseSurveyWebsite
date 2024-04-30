export class Question {
  constructor(
    questionType,
    questionTextSrc,
    questionOptions, // for grid-likert-scale, it is {statements:[], scale: []}
    screenOption = null,
    screenMsg = null,
    examples = [],
    clarification = "",
    preCode = "",
    postCode = "",
    recordLogic = null,
    defaultCode = null,
    testCases = [],
    verifyInputFormat = undefined,
    verifyOutputFormat = undefined,
    attentionCheck = false,
    attentionAns = []
  ) {
    this.questionType = questionType;
    this.questionTextSrc = questionTextSrc; // array
    this.questionOptions = questionOptions;
    this.screenOption = screenOption;
    this.screenMsg = screenMsg;
    this.examples = examples; // example test cases
    this.clarification = clarification; // clarification of input
    this.preCode = preCode; // code submit to api for testing, usually contains class def
    this.postCode = postCode; // code submit to api for testing, usually function callers
    this.recordLogic = recordLogic; // "record" or "display"
    this.defaultCode = defaultCode;
    this.testCases = testCases;
    this.verifyInputFormat = verifyInputFormat;
    this.verifyOutputFormat = verifyOutputFormat;
    this.attentionCheck = attentionCheck;
    this.attentionAns = attentionAns;
  }
}

export class Page {
  constructor(questions, timeMax = 0, timeMin = 0) {
    this.questions = questions; // Array of Questions
    this.timeMax = timeMax; // upper limit of timing, number, seconds
    this.timeMin = timeMin; // lower limit of timing, number, seconds
  }
}
