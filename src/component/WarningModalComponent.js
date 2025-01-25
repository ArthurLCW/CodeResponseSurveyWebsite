import React, { useState, useEffect } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

function WarningModalComponent({ pageArray, pageNumber }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    if (
      pageArray[pageNumber - 1].questions.some(
        (question) => question.questionType === "coding"
      )
    ) {
      // console.log("in warning modal open: ", pageNumber, pageArray);
      openModal();
    }
    // console.log("in warning modal: ", pageNumber, pageArray);
  }, [pageNumber]);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
      contentLabel="warning-mode-confirmation"
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
          zIndex: 900,
        },
      }}
    >
      {/* Modal的内容 */}
      <div style={{ display: "flex" }}>
        <h1 style={{ margin: "auto" }}>Warning</h1>
      </div>
      <p>Please DO NOT use AI/Internet searching to solve this problem.</p>
      <p>Please DO NOT leave full-screen mode before finishing this survey.</p>

      <p>
        <b style={{ color: "red", fontSize: "20px" }}>
          We may reject to pay you if you leave full-screen mode!
        </b>
      </p>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <button onClick={closeModal} className="attractive-btn">
          OK
        </button>
      </div>
    </Modal>
  );
}

export default WarningModalComponent;
