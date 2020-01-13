import React from "react";

// Basic component to display the Vote
function Vote({ text }) {
  const buttonStyle = {
    margin: "5px 0px"
  };

  return (
    <div
      className="btn-large s12 col white-text center deep-orange center"
      style={buttonStyle}
    >
      <div className="black-text">
        <div className="word-break black-text">{text}</div>
      </div>
    </div>
  );
}

export default Vote;
