import React from "react";

const Spinner = () => {
  return (
  <div className="spinner-container">
    <div className="spinner-border text-muted" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);
};

export default Spinner;