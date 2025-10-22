import React from 'react';
//import './Loader.css';

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-spinner"></div>
      <p>Loading... Please wait</p>
    </div>
  );
};

export default Loader;