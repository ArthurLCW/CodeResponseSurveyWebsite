import React, { useState, useEffect, useRef } from 'react';
import {MdDisplayerComponent, Markdown} from './MdDisplayerComponent';
import MonacoEditorComponent from './MonacoEditorComponent';
// import LikertScaleGridComponent from './LikertScaleGridComponent';
import "./QuestionComponent.css";
import { useSelector, useDispatch } from 'react-redux'
import { increment, toggleScreenTrue, toggleScreenFalse } from '../redux/recorderSlice';

const WarningMsg = () => (
  <div className='warning'>
    <b>
      Please finish this question! 
    </b>
  </div>
);

const WarningMsgCoding = () => (
  <div className='warning'>
    <b>
      Please finish this coding question! You need to write at least 10 lines of non-empty codes. 
    </b>
  </div>
)

const QuestionComponent = ({ myKey, questionContent, finished }) => {
  const num = useSelector((state) => state.recorder.num);
  const screenFlag = useSelector((state) => state.recorder.screenFlag);
  const [selectedOption, setSelectedOption] = useState(null);
  const [codingNonEnptyLines, setCodingNonEnptyLines] = useState(0);
  const [chosenSrcFlag, setChosenSrcFlag] = useState(false);
  const dispatch = useDispatch();
  
  const handleOptionChange = (event) => {
    if (selectedOption===null) dispatch(increment());
    setSelectedOption(event.target.value);
    localStorage.setItem(myKey, event.target.value);

    if (questionContent.screenOption && event.target.value===questionContent.screenOption){
      console.log("screen flag0: ", screenFlag);
      dispatch(toggleScreenTrue());
    }
    else if (questionContent.screenOption){
      console.log("screen flag1: ", screenFlag);
      dispatch(toggleScreenFalse());
    }

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
      <MonacoEditorComponent 
        dispatch={dispatch} 
        setSelectedOption={setSelectedOption} 
        myKey={myKey} 
        recordLogic={questionContent.recordLogic} 
        setCodingNonEnptyLines={setCodingNonEnptyLines}
      />
    );
  }

  const unfinishedStyle = {
    backgroundColor: ((selectedOption===null && finished) || (questionContent.questionType==="coding" && finished && (codingNonEnptyLines<10))) ? '#e6f1ff' : 'white', 
  };

  const codingParentStyle = (questionContent.questionType==="coding")? {display: "flex"} : {};
  const codingChildStyle = (questionContent.questionType==="coding")? {width: "35vw", paddingRight: "30px"} : {};

  let recordDisplay = "";
  if (questionContent.recordLogic==="display"){
    if (questionContent.questionType="coding") recordDisplay = "```javascript\n"+localStorage.getItem("lcwRecordInfo")+"\n```";
  }

  let fileName = questionContent.questionTextSrc[0];
  if (questionContent.questionTextSrc.length>1 && !chosenSrcFlag){
    fileName = questionContent.questionTextSrc[Math.floor(Math.random() * questionContent.questionTextSrc.length)];
    setChosenSrcFlag(true);
    // list does not exist, initialize it
    if (!localStorage.getItem("lcwSurveyRandomIndexList")){ 
      localStorage.setItem("lcwSurveyRandomIndexList", myKey);
      localStorage.setItem("lcwSurveyRandomMd", fileName);
    }
    // list exists, and the key does not exist in the key -> add the key directly
    else if (!localStorage.getItem("lcwSurveyRandomIndexList").split(",").includes(myKey)){
      localStorage.setItem("lcwSurveyRandomIndexList", localStorage.getItem("lcwSurveyRandomIndexList")+","+myKey);
      localStorage.setItem("lcwSurveyRandomMd", localStorage.getItem("lcwSurveyRandomMd")+","+fileName);
    }
    // list exists, and the key exists too -> modify the list instead of directly adding the key
    else{
      const indexList = localStorage.getItem("lcwSurveyRandomIndexList").split(",");
      for (let i=0; i<indexList.length; i++){
        if (indexList[i]===myKey){
          const newMdList = localStorage.getItem("lcwSurveyRandomMd").split(",");
          newMdList[i] = fileName;
          localStorage.setItem("lcwSurveyRandomMd", newMdList.join(","));
          break;
        }
      }
    }
    console.log("filename:", fileName, localStorage.getItem("lcwSurveyRandomIndexList"), localStorage.getItem("lcwSurveyRandomMd"));
  }

  return (
    <div className='question' >
      {(questionContent.questionType==="coding" && finished && (codingNonEnptyLines<10)) && <WarningMsgCoding/>}
      {(questionContent.questionType!=="coding" && selectedOption===null && finished) && <WarningMsg/>}
      <div style={unfinishedStyle}>
        <div style={codingParentStyle}>
          <div style={codingChildStyle}>
            <MdDisplayerComponent fileName={fileName}/>
            {/* {(questionContent.recordLogic==="display") && <Markdown content={"```javascript\n"+localStorage.getItem("lcwRecordInfo")+"```"}/>} */}
            <Markdown content={recordDisplay}/>
          </div>
          <div>
            {options}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionComponent;
