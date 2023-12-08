import React, { useState, useEffect } from 'react';
import './TimerComponent.css'
import { useSelector, useDispatch } from 'react-redux'
import { reset } from '../redux/recorderSlice';

const TimerComponent = ({totalTime, goToNextPage}) => {
  const [seconds, setSeconds] = useState(totalTime);
  const dispatch = useDispatch();

  useEffect(() => {
    // Set up the interval
    const interval = setInterval(() => {
      setSeconds(seconds => {
        // If seconds is 0, clear the interval and return 0
        if (seconds === 0) {
          clearInterval(interval);
          dispatch(reset());
          goToNextPage();
          return 0;
        }
  
        // Otherwise, decrement seconds
        return seconds - 1;
      });
    }, 1000);
  
    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  

  return (
    <div className='timer'>
      <p>Please finish all the questions in this page within <b>{parseInt(totalTime/60)} minutes and {parseInt(totalTime%60)} seconds</b>. </p>
      <p>You still have <b><i>{parseInt(seconds/60)} minutes and {parseInt(seconds%60)} seconds remaining</i></b></p>
    </div>
  );
};

export default TimerComponent;


