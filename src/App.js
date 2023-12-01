import React, { useState } from 'react';
import "./App.css";
import SurveyComponent from './component/SurveyComponent';

class Question {
  constructor(questionType, questionTextSrc, questionOptions, gridQuestions=null) {
    this.questionType = questionType;
    this.questionTextSrc = questionTextSrc;
    this.questionOptions = questionOptions;
    this.gridQuestions = gridQuestions;
  }
}

const App = () => {
  const pageArray = [
    // consent
    [
      new Question(
        "multiple-choice",
        "consent.md",
        ["Yes, I agree to participate in this study.", "No, I disagree to participate in this study."]
      ),
    ],

    // screener (programming experience)
    [
      new Question(
        "multiple-choice",
        "screener1.md",
        ["Yes","No", "I don't know"]
      ),
      new Question(
        "likert-scale",
        "screener2.md",
        ["Not experienced at all", "Slightly experienced", "Moderately experienced", "Very experienced", "Extremely experienced"]
      ),
      new Question(
        "likert-scale",
        "screener3.md",
        ["Not involved at all", "Slightly involved", "Moderately involved", "Very involved", "Extremely involved"]
      ),
      new Question(
        "multiple-choice",
        "screener4.md",
        ["Student specializing in IT-related fields.","Developers.", "Other IT-related positions (such as testing engineer, operations engineer, etc).", "Others."]
      ),
      new Question(
        "multiple-choice",
        "screener5.md",
        ["0","1","2","3","4","5","6","7","8","9","10","10+",]
      ),
    ],
    
    // demographics (attitudes towards ai, language proficiency)
    [
      new Question(
        "likert-scale",
        "attitudes1.md",
        ["0 (Strongly disagree)","1","2","3","4","5","6","7","8","9","10 (Strongly agree)"],
      ),
      new Question(
        "likert-scale",
        "attitudes2.md",
        ["0 (Strongly disagree)","1","2","3","4","5","6","7","8","9","10 (Strongly agree)"],
      ),
      new Question(
        "likert-scale",
        "attitudes3.md",
        ["0 (Strongly disagree)","1","2","3","4","5","6","7","8","9","10 (Strongly agree)"],
      ),
      new Question(
        "likert-scale",
        "attitudes4.md",
        ["0 (Strongly disagree)","1","2","3","4","5","6","7","8","9","10 (Strongly agree)"],
      ),
      new Question(
        "likert-scale",
        "attitudes5.md",
        ["0 (Strongly disagree)","1","2","3","4","5","6","7","8","9","10 (Strongly agree)"],
      ),
      new Question(
        "likert-scale",
        "language-proficiency.md",
        ["Not familiar at all", "Slightly familiar", "Moderately familiar", "Very familiar", "Extremely familiar"],
      ),
    ],

    // coding questions
    [
      new Question(
        "coding",
        "coding1.md",
        [],
      )
    ],
    [
      new Question(
        "coding",
        "coding2.md",
        [],
      )
    ],

    // post-hoc (domain knowledge familarity & perceived difficulty)
    [
      new Question(
        "likert-scale",
        "domain-knowledge1.md",
        ["Not familiar at all", "Slightly familiar", "Moderately familiar", "Very familiar", "Extremely familiar"],
      ),
      new Question(
        "likert-scale",
        "domain-knowledge2.md",
        ["Not familiar at all", "Slightly familiar", "Moderately familiar", "Very familiar", "Extremely familiar"],
      ),
      new Question(
        "likert-scale",
        "domain-knowledge3.md",
        ["Not familiar at all", "Slightly familiar", "Moderately familiar", "Very familiar", "Extremely familiar"],
      ),
      new Question(
        "likert-scale",
        "perceived-difficulty.md",
        ["Extremely easy", "Somewhat Easy", "Neither easy nor difficult", "Somewhat difficult", "Extremely difficult"],
      )
    ],

    [
      new Question(
        "null",
        "gratitude.md",
        [],
      )
    ]
    

  ]



  return (
    <div className='app'>
      <div className='survey'>
        <SurveyComponent
          pageArray={pageArray}
          rememberState={false}
        />
      </div>
    </div>
    
  );
};

export default App;



