import React, { useState } from 'react';
import './App.css';
import Popup from './components/Popup';

const App = () => {

  //A toggle variable to enable and disable the popup
  const [showPopup, setShowPopup] = useState(false);

  //This fucntion helps to manage the togglePopup enable and disable
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };


  return (
    <div className="container">
      <div className="app-content">
        <h2>View Segment</h2>
        <button className="save-btn" onClick={togglePopup}>
          Save segment
        </button>
      </div>
      {showPopup && (
        <Popup handleClose={togglePopup} />
      )}
    </div>
  );
};

export default App;
