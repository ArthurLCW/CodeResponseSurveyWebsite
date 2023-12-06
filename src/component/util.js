export class Question {
  constructor(questionType, questionTextSrc, questionOptions, gridQuestions=null) {
    this.questionType = questionType;
    this.questionTextSrc = questionTextSrc;
    this.questionOptions = questionOptions;
    this.gridQuestions = gridQuestions;
  }
}

export class Page {
  constructor(questions, timing = 0){
    this.questions = questions; // Array of Questions
    this.timing = timing; // number, seconds
  }
}

