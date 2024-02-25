export class Question {
  constructor(
    questionType,
    questionTextSrc,
    questionOptions,
    screenOption = null,
    screenMsg = null,
    recordLogic = null,
    defaultCode = null
  ) {
    this.questionType = questionType;
    this.questionTextSrc = questionTextSrc; // array
    this.questionOptions = questionOptions;
    this.screenOption = screenOption;
    this.screenMsg = screenMsg;
    this.recordLogic = recordLogic; // "record" or "display"
    this.defaultCode = defaultCode;
  }
}

export class Page {
  constructor(questions, timeMax = 0, timeMin = 0) {
    this.questions = questions; // Array of Questions
    this.timeMax = timeMax; // upper limit of timing, number, seconds
    this.timeMin = timeMin; // lower limit of timing, number, seconds
  }
}
