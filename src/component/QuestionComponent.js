import React, { useState, useEffect, useRef } from 'react';
import MdDisplayerComponent from './MdDisplayerComponent';
import MonacoEditorComponent from './MonacoEditorComponent';
// import LikertScaleGridComponent from './LikertScaleGridComponent';
import "./QuestionComponent.css";
import { useSelector, useDispatch } from 'react-redux'
import { increment, reset } from '../redux/recorderSlice';

const WarningMsg = () => (
  <div className='warning'>
    <b>
      Please finish this question!
    </b>
  </div>
  
);

const QuestionComponent = ({ myKey, questionContent, finished }) => {
  const num = useSelector((state) => state.recorder.num)
  const [selectedOption, setSelectedOption] = useState(null);
  const dispatch = useDispatch();
  
  const handleOptionChange = (event) => {
    if (selectedOption===null) dispatch(increment());
    setSelectedOption(event.target.value);
    localStorage.setItem(myKey, event.target.value);

    console.log("id: ", myKey, ": ", event.target.value, ": ", selectedOption, " : ", num);
    console.log("id: ", myKey, ", localstorage: ", localStorage.getItem(myKey));
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
      <MonacoEditorComponent dispatch={dispatch} setSelectedOption={setSelectedOption} myKey={myKey}/>
    );
  }

  const style = {
    backgroundColor: ((selectedOption===null && finished) || (questionContent.questionType==="coding" && finished && !selectedOption.includes("\n"))) ? '#e6f1ff' : 'white', 
  };

  return (
    <div className='question' >
      {((selectedOption===null && finished) || (questionContent.questionType==="coding" && finished && !selectedOption.includes("\n"))) && <WarningMsg/>}
      <div style={style}>
        <MdDisplayerComponent fileName={questionContent.questionTextSrc}/>
        {options}
      </div>
    </div>
    
  );
}

export default QuestionComponent;
