import React, { useEffect, useState } from "react";
import QuestionComponent from "./QuestionComponent";
import { useSelector, useDispatch } from "react-redux";
import { increment, reset } from "../redux/recorderSlice";
import { Page } from "../util/utilClass";
import { writeParticipantData } from "../util/firebase";
import TimerComponent from "./TimerComponent";
import "./PageComponent.css";
import Modal from "react-modal";

Modal.setAppElement("#root");
const PageComponent = ({
  pageArray,
  pageNumber,
  goToNextPage,
  goToLastPage,
  isLastPage,
  finishCode,
}) => {
  // console.log(pageArray.length, pageNumber);
  const [finished, setFinished] = useState(false);
  const [screenMsg, setScreenMsg] = useState("");
  const [sendingState, setSendingState] = useState(true);
  const [timingFullfilledFlag, setTimingFullfilledFlag] = useState(false);
  const num = useSelector((state) => state.recorder.num);
  const dispatch = useDispatch();
  const screenFlag = useSelector((state) => state.recorder.screenFlag);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  function getCurrentTimeInAEDT() {
    const now = new Date();
    const options = {
      timeZone: "Australia/Sydney",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };

    const formatter = new Intl.DateTimeFormat("en-AU", options);
    return formatter.format(now);
  }

  // Modify this block to send data to backend
  if (pageNumber === pageArray.length && sendingState) {
    setSendingState(false);
    let sessionStorageObject = {};
    sessionStorageObject["sending-time"] = getCurrentTimeInAEDT();
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (!key.includes("."))
        sessionStorageObject[key] = sessionStorage.getItem(key);
    }
    console.log(sessionStorage);
    console.log(sessionStorageObject, sessionStorageObject["prolificId"]);
    writeParticipantData(
      sessionStorageObject["prolificId"],
      sessionStorageObject
    );
    sessionStorage.clear();
  }

  const handleClick = () => {
    if (!finished) setFinished(true);
    if (Number.parseInt(num) === pageArray[pageNumber - 1].questions.length) {
      if (
        !timingFullfilledFlag &&
        parseInt(pageArray[pageNumber - 1].timeMin) > 0
      ) {
        // alert(
        //   "Please spend at least " +
        //     parseInt(pageArray[pageNumber - 1].timeMin / 60) +
        //     " minutes and " +
        //     parseInt(pageArray[pageNumber - 1].timeMin % 60) +
        //     " seconds to finish the questions in this page."
        // );
        setModalContent(
          `Please spend at least ${parseInt(
            pageArray[pageNumber - 1].timeMin / 60
          )} minutes and ${parseInt(
            pageArray[pageNumber - 1].timeMin % 60
          )} seconds to finish the questions in this page.`
        );
        setModalIsOpen(true);
      } else {
        dispatch(reset());
        goToNextPage();
        setFinished(false);
      }
    }
    if (screenFlag) {
      console.log("screen flag true in page component click, msg: ", screenMsg);
      // alert(screenMsg);
      setModalContent(screenMsg);
      setModalIsOpen(true);
      goToLastPage();
    }
  };

  useEffect(() => {
    for (let i = 0; i < pageArray[pageNumber - 1].questions.length; i++) {
      if (pageArray[pageNumber - 1].questions[i].screenMsg) {
        setScreenMsg(pageArray[pageNumber - 1].questions[i].screenMsg);
      }
    }
  }, [pageArray, pageNumber]);

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        contentLabel="go-next-page-alert"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <div style={{ margin: "10px" }}>{modalContent}</div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            className="attractive-btn"
            onClick={() => setModalIsOpen(false)}
          >
            OK
          </button>
        </div>
      </Modal>

      <div>
        <div className="page-number-info">
          Page {pageNumber} / {pageArray.length}
        </div>

        {finishCode && pageNumber === pageArray.length && !screenFlag && (
          <div>
            <p>
              <b>
                <i>
                  Please paste the following completion code in your Prolific
                  Link:{" "}
                </i>
              </b>
            </p>
            <h3 style={{ color: "red" }}>{finishCode}</h3>
          </div>
        )}

        {pageArray[pageNumber - 1].timeMax > 0 && (
          <TimerComponent
            key={pageNumber}
            pageNumber={pageNumber}
            timeMax={pageArray[pageNumber - 1].timeMax}
            timeMin={pageArray[pageNumber - 1].timeMin}
            goToNextPage={goToNextPage}
            setTimingFullfilledFlag={setTimingFullfilledFlag}
          />
        )}

        {pageArray[pageNumber - 1].questions.map((questionContent, index) => {
          // console.log(questionContent);
          return (
            <QuestionComponent
              key={"lcwSurvey-" + pageNumber + "-" + index}
              myKey={"lcwSurvey-" + pageNumber + "-" + index}
              questionContent={questionContent}
              finished={finished}
            />
          );
        })}
      </div>

      {!isLastPage && (
        // <button onClick={handleClick}>Go to Page {parseInt(pageNumber,10) + 1}</button>
        <button className={"next-page-button"} onClick={handleClick}>
          Go to next page
        </button>
      )}
    </div>
  );
};

export default PageComponent;
