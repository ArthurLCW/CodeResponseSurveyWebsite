import React, { useState, useEffect } from "react";
import "./TimerComponent.css";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../redux/recorderSlice";

const TimerComponent = ({
  timeMax,
  timeMin,
  goToNextPage,
  setTimingFullfilledFlag,
}) => {
  const [seconds, setSeconds] = useState(timeMax);

  // for performance enhancement, avoid updating state in Page component every second
  const [localTimingFlag, setLocalTimingFlag] = useState(false);
  const dispatch = useDispatch();

  console.log("Timer: ", seconds, timeMax, timeMin);
  useEffect(() => {
    // Set up the interval
    const interval = setInterval(() => {
      setSeconds((seconds) => {
        // If seconds is 0, clear the interval and return 0
        if (seconds === 0) {
          clearInterval(interval);
          dispatch(reset());
          goToNextPage();
          return 0;
        } else if (timeMax - seconds >= timeMin && !localTimingFlag) {
          setTimingFullfilledFlag(true);
          setLocalTimingFlag(true);
          console.log("Timer able to proceed: ", seconds, timeMax, timeMin);
        }

        // Otherwise, decrement seconds
        return seconds - 1;
      });
    }, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="timer">
      <p>
        Please finish all the questions in this page within{" "}
        <b>
          {parseInt(timeMax / 60)} minutes and {parseInt(timeMax % 60)} seconds
        </b>
        .{" "}
      </p>
      {timeMin > 0 && (
        <p>
          Please spend <b>at least</b>{" "}
          <b>
            {parseInt(timeMin / 60)} minutes and {parseInt(timeMin % 60)}{" "}
            seconds
          </b>{" "}
          to finish the questions in this page.{" "}
        </p>
      )}
      <p>
        You still have{" "}
        <b>
          <i>
            {parseInt(seconds / 60)} minutes and {parseInt(seconds % 60)}{" "}
            seconds remaining
          </i>
        </b>
      </p>
    </div>
  );
};

export default TimerComponent;
