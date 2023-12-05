import React, { useState } from 'react';
import PageComponent from "./PageComponent";


const SurveyComponent = ({pageArray, rememberState=false}) => {
  if (!rememberState) localStorage.setItem("lcwPageNum", 1); 

  const totalPages = pageArray.length;
  
  const [currentPage, setCurrentPage] = useState(localStorage.getItem("lcwPageNum")? 
    localStorage.getItem("lcwPageNum") : 1);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      localStorage.setItem("lcwPageNum", parseInt(currentPage, 10)+1);
      setCurrentPage(parseInt(currentPage, 10)+1);
    }
  };
  
  return (
    <div>
      <PageComponent
        pageArray={pageArray}
        pageNumber={currentPage}
        goToNextPage={goToNextPage}
        isLastPage={currentPage === totalPages}
      />
    </div>
  );
};
  
export default SurveyComponent;

