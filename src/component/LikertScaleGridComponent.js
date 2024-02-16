import React, { useState } from "react";
import "./LikertScaleGridComponent.css";

const LikertScaleGridComponent = ({ questionContent }) => {
  const questions = questionContent.gridQuestions;
  const options = questionContent.questionOptions;

  // Initialize state to track responses for each question
  const [responses, setResponses] = useState(questions.map(() => ""));

  // Handle option selection
  const handleSelect = (questionIndex, option) => {
    setResponses(
      responses.map((response, index) =>
        index === questionIndex ? option : response
      )
    );
  };

  return (
    <div className="likert-grid">
      <div className="grid-header">
        <div className="header-spacer"></div>
        {options.map((option, index) => (
          <div className="option-title">{option}</div>
        ))}
      </div>
      {questions.map((question, questionIndex) => (
        <div className="question-row">
          <div className="question-text">{question}</div>
          {options.map((option, optionIndex) => (
            <label className="option-label">
              <input
                type="radio"
                name={`question-${questionIndex}`}
                value={option}
                checked={responses[questionIndex] === option}
                onChange={() => handleSelect(questionIndex, option)}
              />
              <span className="custom-radio"></span>
            </label>
          ))}
        </div>
      ))}
    </div>
  );
};

export default LikertScaleGridComponent;
