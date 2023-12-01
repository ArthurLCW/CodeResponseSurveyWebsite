import React, { useState, useEffect, useRef } from 'react';
import MdDisplayerComponent from './MdDisplayerComponent';
import MonacoEditorComponent from './MonacoEditorComponent';
// import LikertScaleGridComponent from './LikertScaleGridComponent';
import "./QuestionComponent.css";
// import * as monaco from 'monaco-editor';


const QuestionComponent = ({ questionContent, setFinished }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [code, setCode] = useState("// write your code here");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(event.target.value, ": ", selectedOption);
    // setFinished(finished+1);
  };

  let options;

  if (questionContent.questionType === "null") {
    // Handle null case
  } 
  else if (questionContent.questionType === "multiple-choice") {
    const labelStyle = {
      display: 'block', // This makes each label a block-level element
      margin: '5px 0'   // Optional: Adds some spacing between options
    };
    options = (
      <div>
        {questionContent.questionOptions.map((option, index) => (
          <label key={index} style={labelStyle}>
            <input
              type="radio"
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
            />
            {option}
          </label>
        ))}
      </div>
    );
  } 
  else if (questionContent.questionType === "likert-scale") {
    options = (
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        {questionContent.questionOptions.map((option, index) => (
          <div key={index} className="likert-scale-container">
            <div className="likert-label">{option}</div>
            <input
              type="radio"
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
            />
          </div>
        ))}
      </div>
    );
  } 
  else if (questionContent.questionType === "coding") {
    options = (
      <MonacoEditorComponent/>
    );
  }
  // else if (questionContent.questionType === "likert-grid") {
  //   options = (
  //     <LikertScaleGridComponent questionContent={questionContent}/>
  //   )
  // }

  return (
    <div className='question'>
      <MdDisplayerComponent fileName={questionContent.questionTextSrc}/>
      {options}
    </div>
  );
}

export default QuestionComponent;
