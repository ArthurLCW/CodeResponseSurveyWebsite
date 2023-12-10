import React, { useState, useEffect } from 'react';
import PageComponent from "./PageComponent";

const generateRandomString = (length = 10) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const SurveyComponent = ({pageArray, rememberState, setEnableModal}) => {
  const [prolificId, setProlificId] = useState('');
  const [studyId, setStudyId] = useState('');
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    setProlificId(queryParams.get('PROLIFIC_PID') || 'PROLIFIC_PID'+generateRandomString());
    setStudyId(queryParams.get('STUDY_ID') || 'STUDY_ID'+generateRandomString());
    setSessionId(queryParams.get('SESSION_ID') || 'SESSION_ID'+generateRandomString());
  }, []);

  // console.log("prolificId:",prolificId, "studyId:",studyId, "sessionId:",sessionId);
  localStorage.setItem("prolificId", prolificId);
  localStorage.setItem("studyId", studyId);
  localStorage.setItem("sessionId", sessionId);

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

  const goToLastPage = () => {
    localStorage.setItem("lcwPageNum", parseInt(pageArray.length));
    setCurrentPage(parseInt(pageArray.length));
  }

  useEffect(() => {
    if (currentPage === 2 && currentPage!==pageArray.length) {
      setEnableModal(true);
    }
    else if (currentPage===pageArray.length){
      setEnableModal(false);
      if (document.fullscreenElement) {
        document.exitFullscreen()
          .then(() => console.log("已退出全屏模式。"))
          .catch((err) => console.error(`退出全屏模式时发生错误: ${err}`));
      } else {
        console.log("当前不在全屏模式。");
      }
    }
  }, [currentPage, setEnableModal]);
  
  return (
    <div>
      <PageComponent
        pageArray={pageArray}
        pageNumber={currentPage}
        goToNextPage={goToNextPage}
        goToLastPage={goToLastPage}
        isLastPage={currentPage === totalPages}
        finishCode={"asdfgh"}
      />
    </div>
  );
};
  
export default SurveyComponent;

