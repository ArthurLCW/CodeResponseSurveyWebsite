import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import "./App.css";
import SurveyComponent from './component/SurveyComponent';
import { Question, Page } from './util/utilClass';

Modal.setAppElement('#root'); 

function App() {
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = ''; // 在大多数浏览器中，设置 returnValue 是必要的
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);


  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [enableModal, setEnableModal] = useState(false); 
  const [leaveFullScreenTimes, setLeaveFullScreenTimes] = useState(
    parseInt(localStorage.getItem('leaveFullScreenTimes')) || 0
  );

  useEffect(() => {
    function onFullScreenChange() {
      if (!document.fullscreenElement && enableModal) {
        setModalIsOpen(true);
        setLeaveFullScreenTimes(prevTimes => {
          const newTimes = prevTimes + 1;
          localStorage.setItem('leaveFullScreenTimes', newTimes);
          return newTimes;
        });
      }
    }

    document.addEventListener('fullscreenchange', onFullScreenChange);
    if (enableModal) {
      setModalIsOpen(true); 
    }

    return () => {
      document.removeEventListener('fullscreenchange', onFullScreenChange);
    };
  }, [enableModal]); 

  const enterFullScreen = () => {
    document.documentElement.requestFullscreen().catch((e) => {
      console.error(`无法进入全屏模式: ${e.message}`);
    });
    setModalIsOpen(false);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    console.log("reject full screen mode.");
    localStorage.setItem("rejectFullScreen", true);
  };

  const pageArray = [
    // consent
    new Page(
      [
        new Question(
          "multiple-choice",
          ["consent.md"],
          ["Yes, I agree to participate in this study.", "No, I disagree to participate in this study."],
          "No, I disagree to participate in this study.",
          "Thanks for your time. We respect your decision of not participating in this study. Now you may leave this website."
        ),
      ]
    ),
    
    // screener (programming experience)
    new Page(
      [
        new Question(
          "multiple-choice",
          ["screener1.md"],
          ["Yes","No", "I don't know"]
        ),
        new Question(
          "likert-scale",
          ["screener2.md"],
          ["Not experienced at all", "Slightly experienced", "Moderately experienced", "Very experienced", "Extremely experienced"]
        ),
        new Question(
          "likert-scale",
          ["screener3.md"],
          ["Not involved at all", "Slightly involved", "Moderately involved", "Very involved", "Extremely involved"]
        ),
        new Question(
          "multiple-choice",
          ["screener4.md"],
          ["Student specializing in IT-related fields.","Developers.", "Other IT-related positions (such as testing engineer, operations engineer, etc).", "Others."]
        ),
        new Question(
          "multiple-choice",
          ["screener5.md"],
          ["0","1","2","3","4","5","6","7","8","9","10","10+",]
        ),
      ]
    ),
    
    // demographics (attitudes towards ai, language proficiency)
    new Page(
      [
        new Question(
          "likert-scale",
          ["attitudes1.md"],
          ["0 (Strongly disagree)","1","2","3","4","5","6","7","8","9","10 (Strongly agree)"],
        ),
        new Question(
          "likert-scale",
          ["attitudes2.md"],
          ["0 (Strongly disagree)","1","2","3","4","5","6","7","8","9","10 (Strongly agree)"],
        ),
        new Question(
          "likert-scale",
          ["attitudes3.md"],
          ["0 (Strongly disagree)","1","2","3","4","5","6","7","8","9","10 (Strongly agree)"],
        ),
        new Question(
          "likert-scale",
          ["attitudes4.md"],
          ["0 (Strongly disagree)","1","2","3","4","5","6","7","8","9","10 (Strongly agree)"],
        ),
        new Question(
          "likert-scale",
          ["attitudes5.md"],
          ["0 (Strongly disagree)","1","2","3","4","5","6","7","8","9","10 (Strongly agree)"],
        ),
        new Question(
          "likert-scale",
          ["language-proficiency.md"],
          ["Not familiar at all", "Slightly familiar", "Moderately familiar", "Very familiar", "Extremely familiar"],
        ),
      ]  
    ),

    // coding question (self-coding)
    new Page(
      [
        new Question(
          "coding",
          ["coding1.md"],
          [],
          null,
          null,
          "record"
        )
      ],
      1000, // timer
    ),
    

    // coding question (assisted coding)
    new Page(
      [
        new Question(
          "coding",
          ["coding2-v11.md","coding2-v12.md","coding2-v13.md"],
          [],
          null,
          null,
          "display"
        )
      ],
      1000, // timer
    ),

    // post-hoc (domain knowledge familarity & perceived difficulty)
    new Page(
      [
        new Question(
          "likert-scale",
          ["domain-knowledge1.md"],
          ["Not familiar at all", "Slightly familiar", "Moderately familiar", "Very familiar", "Extremely familiar"],
        ),
        new Question(
          "likert-scale",
          ["domain-knowledge2.md"],
          ["Not familiar at all", "Slightly familiar", "Moderately familiar", "Very familiar", "Extremely familiar"],
        ),
        new Question(
          "likert-scale",
          ["domain-knowledge3.md"],
          ["Not familiar at all", "Slightly familiar", "Moderately familiar", "Very familiar", "Extremely familiar"],
        ),
        new Question(
          "likert-scale",
          ["perceived-difficulty.md"],
          ["Extremely easy", "Somewhat Easy", "Neither easy nor difficult", "Somewhat difficult", "Extremely difficult"],
        )
      ],
    ),

    new Page(
      [
        new Question(
          "null",
          ["gratitude.md"],
          [],
        )
      ]
    )
  ]

  return (
    <div>
      <div className='app'>
        <div className='survey'>
          <SurveyComponent
            pageArray={pageArray}
            rememberState={false}
            setEnableModal={setEnableModal}
          />
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        contentLabel="full-screen-mode-confirmation"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
          }
        }}
      >
        <div style={{display:"flex"}}><h2 style={{margin: "auto"}}>Full-Screen Mode</h2></div>
        <h4>Are you willing to enter full-screen mode?</h4>
        <p>Please notice that we will record your action of leaving full-screen mode or reject entering full-screen mode. </p>
        <p>If you leave full-screen mode too many times or reject to enter full-screen mode, we may reject to pay your reimbursement. </p>
        <div style={{display:"flex", justifyContent:"space-evenly"}}>
          <button onClick={enterFullScreen}>Yes</button>
          <button onClick={closeModal}>No</button>
        </div>
        
      </Modal>
    </div>
  );
}

export default App;