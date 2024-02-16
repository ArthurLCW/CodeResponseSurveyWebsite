import React, { useState, useEffect } from "react";
import PageComponent from "./PageComponent";

const generateRandomString = (length = 10) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// https://www.hci-survey.com/?PROLIFIC_PID=12345&STUDY_ID=67890&SESSION_ID=abcde
const SurveyComponent = ({
  // pageArray,
  pageObj,
  pageSection,
  rememberState,
  setEnableModal,
}) => {
  const [prolificId, setProlificId] = useState("");
  const [studyId, setStudyId] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [questionSet, setQestionSet] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    setProlificId(
      queryParams.get("PROLIFIC_PID") ||
        "PROLIFIC_PID_" + generateRandomString()
    );
    setStudyId(
      queryParams.get("STUDY_ID") || "STUDY_ID_" + generateRandomString()
    );
    setSessionId(
      queryParams.get("SESSION_ID") || "SESSION_ID_" + generateRandomString()
    );
    setQestionSet(queryParams.get("QUESTION_SET") || "medium");
  }, []);

  // console.log("prolificId:",prolificId, "studyId:",studyId, "sessionId:",sessionId);
  localStorage.setItem("prolificId", prolificId);
  localStorage.setItem("studyId", studyId);
  localStorage.setItem("sessionId", sessionId);
  localStorage.setItem("questionSet", questionSet);

  if (!rememberState) localStorage.setItem("lcwPageNum", 1);

  const pageArray = [];
  for (const [key, value] of Object.entries(pageObj)) {
    if (pageSection.includes(key)) {
      for (const page of value) {
        pageArray.push(page);
      }
    }
  }

  const totalPages = pageArray.length;

  const [currentPage, setCurrentPage] = useState(
    localStorage.getItem("lcwPageNum") ? localStorage.getItem("lcwPageNum") : 1
  );

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      localStorage.setItem("lcwPageNum", parseInt(currentPage, 10) + 1);
      setCurrentPage(parseInt(currentPage, 10) + 1);
    }
  };

  const goToLastPage = () => {
    localStorage.setItem("lcwPageNum", parseInt(pageArray.length));
    setCurrentPage(parseInt(pageArray.length));
  };

  useEffect(() => {
    if (currentPage === 2 && currentPage !== pageArray.length) {
      setEnableModal(true);
    } else if (currentPage === pageArray.length) {
      setEnableModal(false);
      if (document.fullscreenElement) {
        document
          .exitFullscreen()
          .then(() => console.log("Exit full-screen mode. "))
          .catch((err) =>
            console.error(
              `Errors occured when exiting full-screen mode: ${err}`
            )
          );
      } else {
        console.log("Currently not in full-screen mode. ");
      }
    }
  }, [currentPage, pageArray.length, setEnableModal]);

  return (
    <div>
      <PageComponent
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
