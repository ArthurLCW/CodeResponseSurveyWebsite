import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { toggleFailedAttentionCheckTrue } from "../redux/recorderSlice";

Modal.setAppElement("#root");

function FullScreenModalComponent({
  isOpen,
  closeModal,
  enterFullScreen,
  firstTimeEnter,
}) {
  const dispatch = useDispatch();
  const failedAttentionCheck = useSelector(
    (state) => state.recorder.failedAttentionCheck
  );

  useEffect(() => {
    let id;
    let seconds = 0;
    if (isOpen) {
      id = setInterval(() => {
        seconds += 1;
        // console.log("Timer tick");
      }, 1000);
    }

    return () => {
      if (id) {
        // console.log("seconds in total", seconds);
        let records;
        if (sessionStorage.getItem("leaveFullScreenTimes")) {
          records = JSON.parse(sessionStorage.getItem("leaveFullScreenTimes"));
          if (records[sessionStorage.getItem("currentPage")]) {
            records[sessionStorage.getItem("currentPage")][1] += seconds;
            sessionStorage.setItem(
              "leaveFullScreenTimes",
              JSON.stringify(records)
            );
          }
        }

        // check if failed attention check
        if (
          !failedAttentionCheck &&
          sessionStorage.getItem("leaveFullScreenTimes")
        ) {
          let totalTimes = 0;
          let totalDuration = 0;
          Object.values(records).forEach((record) => {
            totalTimes += record[0];
            totalDuration += record[1];
          });
          // if (totalTimes >= 3 || totalDuration >= 3) {
          //   dispatch(toggleFailedAttentionCheckTrue());
          // }
          // console.log(
          //   "cheating check: ",
          //   failedAttentionCheck,
          //   totalTimes,
          //   totalDuration
          // );
        }
        clearInterval(id);
      }
    };
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
      contentLabel="full-screen-mode-confirmation"
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        },
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          zIndex: 1000,
        },
      }}
    >
      {/* Modal的内容 */}
      <div style={{ display: "flex" }}>
        <h1 style={{ margin: "auto" }}>Full-Screen Mode</h1>
      </div>
      {firstTimeEnter ? (
        <p>You need to stay in full-screen mode to proceed with the survey.</p>
      ) : (
        <p>
          Please DO NOT leave full-screen mode before finishing this survey!
        </p>
      )}
      <p>
        Please notice that we will{" "}
        <b>record your action of leaving full-screen mode</b>.
      </p>
      <p>
        <b style={{ color: "red", fontSize: "20px" }}>
          We may reject to pay you if you leave full-screen mode!
        </b>
      </p>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <button onClick={enterFullScreen} className="attractive-btn">
          OK, I understand I should NOT leave full-screen mode.
        </button>
      </div>
    </Modal>
  );
}

export default FullScreenModalComponent;
