import React, { useState } from 'react';
import QuestionComponent from './QuestionComponent';
import { useSelector, useDispatch } from 'react-redux'
import { increment, reset } from '../redux/recorderSlice';
import {Page} from './util';

const PageComponent = ({ pageArray, pageNumber, goToNextPage, isLastPage }) => {
  console.log(pageArray.length);
  const [finished, setFinished] = useState(false);
  const num = useSelector((state) => state.recorder.num)
  const dispatch = useDispatch();

  const handleClick = () => {
    console.log("num when clicking next page: ", num, " page array length: ", pageArray[pageNumber-1].questions.length);
    if (!finished) setFinished(true);
    if (Number.parseInt(num)===pageArray[pageNumber-1].questions.length) {
      dispatch(reset());
      goToNextPage();
      setFinished(false);
    }
  }

  return (
    <div>
      <h1>Page {pageNumber}</h1>
      <div>
        {pageArray[pageNumber-1].questions.map((questionContent, index) => 
          <QuestionComponent key={pageNumber+"-"+index} myKey={pageNumber+"-"+index} questionContent={questionContent} finished={finished}/>)}
      </div>
      
      {!isLastPage && (
        <button onClick={handleClick}>Go to Page {parseInt(pageNumber,10) + 1}</button>
      )}
    </div>
  );
};

export default PageComponent;
