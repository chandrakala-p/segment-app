import React, { useState } from 'react';
import './App.css';
import Popup from './components/Popup';

const App = () => {
  const [showPopup, setShowPopup] = useState(false);


  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleSaveSegment = (name) => {
    setShowPopup(false);
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
        <Popup handleClose={togglePopup} handleSave={handleSaveSegment} />
      )}
    </div>
  );
};

export default App;
