import React from "react";

// Basic component to display the Vote
function Vote({ text }) {
  return (
    <div className="btn-large white-text center black center hoverable">
      <div className="black-text">
        <div className="word-break white-text">{ text }</div>
      </div>
    </div>
  );
}

export default Vote;
