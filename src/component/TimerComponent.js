import React, { useState, useEffect, useRef } from "react";
import "./TimerComponent.css";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../redux/recorderSlice";

const TimerComponent = ({
  pageNumber,
  timeMax,
  timeMin,
  goToNextPage,
  setTimingFullfilledFlag,
}) => {
  const [seconds, setSeconds] = useState(timeMax);
  const secondsRef = useRef(seconds);

  const num = useSelector((state) => state.recorder.num);

  // for performance enhancement, avoid updating state in Page component every second
  const [localTimingFlag, setLocalTimingFlag] = useState(false);
  const dispatch = useDispatch();

  // console.log("current time", seconds, pageNumber);
  useEffect(() => {
    // Set up the interval
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        const newSeconds = prevSeconds - 1;
        secondsRef.current = newSeconds;

        if (newSeconds === 0) {
          clearInterval(interval);
          dispatch(reset());
          goToNextPage();
          setTimingFullfilledFlag(false);
          sessionStorage.setItem(
            `Page ${pageNumber} finishing time`,
            timeMax - newSeconds
          );
          // console.log("num", num);
          return 0;
        } else if (timeMax - newSeconds >= timeMin && !localTimingFlag) {
          setTimingFullfilledFlag(true);
          setLocalTimingFlag(true);
        }

        return newSeconds;
      });
    }, 1000);

    // Clear the interval on component unmount
    return () => {
      clearInterval(interval);
      dispatch(reset());
      sessionStorage.setItem(
        `Page ${pageNumber} finishing time`,
        timeMax - secondsRef.current
      );
      // console.log(
      //   "Cleanup - current time",
      //   timeMax - secondsRef.current,
      //   "Max Time:",
      //   timeMax,
      //   "Last Seconds:",
      //   secondsRef.current,
      //   "Page Number:",
      //   pageNumber
      // );
    };
  }, [
    pageNumber,
    timeMax,
    timeMin,
    goToNextPage,
    setTimingFullfilledFlag,
    dispatch,
    localTimingFlag,
  ]);

  return (
    <div className="timer">
      <div>
        Please finish all the questions on this page within{" "}
        <b>
          {parseInt(timeMax / 60)} minute(s) and {parseInt(timeMax % 60)}{" "}
          second(s)
        </b>
        .{" "}
      </div>
      {timeMin > 0 && (
        <div>
          Please spend <b>at least</b>{" "}
          <b>
            {parseInt(timeMin / 60)} minute(s) and {parseInt(timeMin % 60)}{" "}
            second(s)
          </b>{" "}
          to finish the questions on this page.{" "}
        </div>
      )}
      <div>
        You still have{" "}
        <b>
          <i>
            {parseInt(seconds / 60)} minutes and {parseInt(seconds % 60)}{" "}
            seconds remaining
          </i>
        </b>
      </div>
    </div>
  );
};

export default TimerComponent;
