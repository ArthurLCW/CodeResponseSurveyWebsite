import React, { useEffect, useState } from 'react';
import QuestionComponent from './QuestionComponent';
import { useSelector, useDispatch } from 'react-redux'
import { increment, reset } from '../redux/recorderSlice';
import {Page} from '../util/utilClass';
import {writeParticipantData} from "../util/firebase";
import TimerComponent from './TimerComponent';

const PageComponent = ({ pageArray, pageNumber, goToNextPage, goToLastPage, isLastPage, finishCode }) => {
  console.log(pageArray.length, pageNumber);
  const [finished, setFinished] = useState(false);
  const [screenMsg, setScreenMsg] = useState("");
  const num = useSelector((state) => state.recorder.num)
  const dispatch = useDispatch();
  const screenFlag = useSelector((state) => state.recorder.screenFlag);

  // Modify this block to send data to backend
  if (pageNumber === pageArray.length){
    let localStorageObject = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key.includes(".")) localStorageObject[key] = localStorage.getItem(key);
    }
    console.log(localStorage);
    console.log(localStorageObject);
    writeParticipantData(localStorage.getItem("prolificId"),localStorageObject)
    localStorage.clear();
  }

  // if (pageNumber == 1){
  //   console.log("test");
  //   writeParticipantData();
  // }

  const handleClick = () => {
    console.log("num when clicking next page: ", num, " page array length: ", pageArray[pageNumber-1].questions.length);
    if (!finished) setFinished(true);
    if (Number.parseInt(num)===pageArray[pageNumber-1].questions.length) {
      dispatch(reset());
      goToNextPage();
      setFinished(false);
    }
    if (screenFlag) {
      console.log("screen flag true in page component click, msg: ", screenMsg);
      alert(screenMsg);
      goToLastPage();
    }
  }

  useEffect(() => {
    for (let i=0; i<pageArray[pageNumber-1].questions.length; i++){
      if (pageArray[pageNumber-1].questions[i].screenMsg){
        setScreenMsg(pageArray[pageNumber-1].questions[i].screenMsg);
      }
    }

  }, [pageNumber])

  return (
    <div>
      <h1>Page {pageNumber}</h1>

      {(finishCode && (pageNumber===pageArray.length) && !screenFlag) && (
        <div>
          <p><b><i>Please paste the following finish code in your Prolific Link: </i></b></p>
          <h3 style={{color:"red"}}>{finishCode}</h3>
        </div>
      )}

      {(pageArray[pageNumber-1].timing>0) && <TimerComponent key={pageNumber} totalTime={pageArray[pageNumber-1].timing} goToNextPage={goToNextPage}/>}

      <div>
        {pageArray[pageNumber-1].questions.map((questionContent, index) => {
          return <QuestionComponent key={"lcwSurvey-"+pageNumber+"-"+index} myKey={"lcwSurvey-"+pageNumber+"-"+index} questionContent={questionContent} finished={finished}/>;
        })}
      </div>
      
      {!isLastPage && (
        <button onClick={handleClick}>Go to Page {parseInt(pageNumber,10) + 1}</button>
      )}
    </div>
  );
};

export default PageComponent;
