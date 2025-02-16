import React, { useState, useEffect, useMemo, lazy, Suspense } from "react";
import LoadingComponent from "./LoadingComponent";

const PageComponent = lazy(() => import("./PageComponent"));

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
  const questionSet = useMemo(() => {
    const output =
      Object.keys(pageSection)[
        Math.floor(Math.random() * Object.keys(pageSection).length)
      ];
    return output;
  }, []);
  const queryParams = new URLSearchParams(window.location.search);
  sessionStorage.setItem(
    "prolificId",
    queryParams.get("PROLIFIC_PID") || "PROLIFIC_PID_" + generateRandomString()
  );
  sessionStorage.setItem(
    "studyId",
    queryParams.get("STUDY_ID") || "STUDY_ID_" + generateRandomString()
  );
  sessionStorage.setItem(
    "sessionId",
    queryParams.get("SESSION_ID") || "SESSION_ID_" + generateRandomString()
  );
  sessionStorage.setItem(
    "questionSet",
    queryParams.get("QUESTION_SET") || questionSet
  );
  if (queryParams.get("AI_CODE")) {
    sessionStorage.setItem(
      "lcwSurveyRandomMd",
      "coding2-" +
        sessionStorage.getItem("questionSet") +
        "-" +
        queryParams.get("AI_CODE") +
        ".md"
    );
  }
  sessionStorage.setItem(
    "project",
    queryParams.get("PROJECT") || "default_project"
  );
  sessionStorage.setItem(
    "batch",
    String(queryParams.get("BATCH")) || "default_batch"
  );

  if (!rememberState) sessionStorage.setItem("initPageNum", 1);

  const pageArray = [];
  for (const [key, value] of Object.entries(pageObj)) {
    if (
      (pageSection[sessionStorage.getItem("questionSet")] || []).includes(key)
    ) {
      for (const page of value) {
        pageArray.push(page);
      }
    }
  }

  const totalPages = pageArray.length;

  const [currentPage, setCurrentPage] = useState(
    sessionStorage.getItem("initPageNum")
      ? sessionStorage.getItem("initPageNum")
      : 1
  );

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      // sessionStorage.setItem("initPageNum", parseInt(currentPage, 10) + 1);
      setCurrentPage(parseInt(currentPage, 10) + 1);
      sessionStorage.setItem("currentPage", parseInt(currentPage, 10) + 1);
    }
  };

  const goToLastPage = () => {
    // sessionStorage.setItem("initPageNum", parseInt(pageArray.length));
    setCurrentPage(parseInt(pageArray.length));
    sessionStorage.setItem("currentPage", parseInt(pageArray.length));
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
        // console.log("Currently not in full-screen mode. ");
      }
    }
  }, [currentPage, pageArray.length, setEnableModal]);

  return (
    <div>
      <Suspense fallback={<LoadingComponent />}>
        <PageComponent
          pageArray={pageArray}
          pageNumber={currentPage}
          goToNextPage={goToNextPage}
          goToLastPage={goToLastPage}
          isLastPage={currentPage === totalPages}
          finishCode={"C8MRP57T"}
          failedAttentionCheckCode={"IFailedAttentionCheck"}
          key={currentPage}
        />
      </Suspense>
    </div>
  );
};

export default SurveyComponent;
