import React from 'react';
import { useNavigate } from 'react-router-dom';

const FirstPage = () => {
  const navigate = useNavigate();

  const navigateToSecondPage = () => {
    localStorage.setItem('currentPage', 'second'); // Save page state
    navigate('/second');
  };

  return (
    <div>
      <h1>First Page</h1>
      <button onClick={navigateToSecondPage}>Go to Second Page</button>
    </div>
  );
};

export default FirstPage;
