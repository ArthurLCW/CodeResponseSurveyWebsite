import React, { useEffect, useState } from 'react';
import QuestionComponent from './QuestionComponent';
import { useSelector, useDispatch } from 'react-redux'
import { increment, reset } from '../redux/recorderSlice';
import {Page} from './util';
import TimerComponent from './TimerComponent';

const PageComponent = ({ pageArray, pageNumber, goToNextPage, goToLastPage, isLastPage }) => {
  console.log(pageArray.length, pageNumber);
  const [finished, setFinished] = useState(false);
  const [screenMsg, setScreenMsg] = useState("");
  const num = useSelector((state) => state.recorder.num)
  const dispatch = useDispatch();
  const screenFlag = useSelector((state) => state.recorder.screenFlag);

  // console.log("screen flag in page component: ", screenFlag, " ", screenMsg);

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

      {(pageArray[pageNumber-1].timing>0) && <TimerComponent key={pageNumber} totalTime={pageArray[pageNumber-1].timing} goToNextPage={goToNextPage}/>}

      <div>
        {pageArray[pageNumber-1].questions.map((questionContent, index) => {
          return <QuestionComponent key={pageNumber+"-"+index} myKey={pageNumber+"-"+index} questionContent={questionContent} finished={finished}/>;
        })}
      </div>
      
      {!isLastPage && (
        <button onClick={handleClick}>Go to Page {parseInt(pageNumber,10) + 1}</button>
      )}
    </div>
  );
};

export default PageComponent;
