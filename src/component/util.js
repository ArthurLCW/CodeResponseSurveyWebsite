export class Question {
  constructor(questionType, questionTextSrc, questionOptions, screenOption=null, screenMsg=null, recordLogic=null) {
    this.questionType = questionType;
    this.questionTextSrc = questionTextSrc;
    this.questionOptions = questionOptions;
    this.screenOption = screenOption;
    this.screenMsg = screenMsg;
    this.recordLogic = recordLogic; // "record" or "display"
  }
}

export class Page {
  constructor(questions, timing = 0){
    this.questions = questions; // Array of Questions
    this.timing = timing; // number, seconds
  }
}

