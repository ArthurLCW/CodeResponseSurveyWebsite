import React, { useState } from 'react';
import QuestionComponent from './QuestionComponent';

const PageComponent = ({ pageArray, pageNumber, goToNextPage, isLastPage }) => {
  console.log(pageArray.length);
  const [finished, setFinished] = useState(0);

  const handleClick = () => {
    // if (finished === pageArray.length)
    goToNextPage();
    // setRecord(false);
  }

  return (
    <div>
      <h1>Page {pageNumber}</h1>
      <div>
        {pageArray[pageNumber-1].map(questionContent => <QuestionComponent questionContent={questionContent} setFinished={setFinished}/>)}
      </div>
      
      {!isLastPage && (
        <button onClick={handleClick}>Go to Page {parseInt(pageNumber,10) + 1}</button>
      )}
    </div>
  );
};

export default PageComponent;
