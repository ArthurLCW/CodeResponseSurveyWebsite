import React, { useState } from "react";
import "./LikertScaleGridComponent.css";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "../redux/recorderSlice";

const LikertScaleGrid = ({ statements, scale, setSelectedOption, myKey }) => {
  // State to hold the selected options for each statement
  const [responses, setResponses] = useState({});

  const [finished, setFinished] = useState(false);
  const dispatch = useDispatch();

  // Function to handle option change
  const handleOptionChange = (statement, value) => {
    const newResponse = { ...responses, [statement]: value };
    // console.log(newResponse);
    setResponses(newResponse);
    if (Object.keys(newResponse).length === statements.length) {
      setSelectedOption(newResponse);
      sessionStorage.setItem(myKey, JSON.stringify(newResponse));

      if (!finished) {
        setFinished(true);
        dispatch(increment());
      }
    }
  };

  return (
    <div className="likert-scale-grid">
      {/* Header labels */}
      <div className="header">
        <div></div> {/* Empty Cell for statement alignment */}
        {scale.map((scalePoint, index) => (
          <div key={index} className="scale-point">
            {scalePoint}
            {scalePoint === 0 && " (Strongly disagree)"}
            {scalePoint === 10 && " (Strongly agree)"}
          </div>
        ))}
      </div>
      {/* Statements and scale options */}
      {statements.map((statement, index) => (
        <div key={index} className="statement">
          <div className="statement-text">{statement}</div>
          {scale.map((scalePoint) => (
            <div key={scalePoint} className="scale-option">
              <input
                type="radio"
                id={`${statement}-${scalePoint}`}
                name={statement}
                value={scalePoint}
                checked={responses[statement] === `${scalePoint}`}
                onChange={(e) => handleOptionChange(statement, e.target.value)}
              />
              <label htmlFor={`${statement}-${scalePoint}`}></label>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default LikertScaleGrid;
