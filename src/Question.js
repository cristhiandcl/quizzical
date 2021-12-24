import React from "react";

export default function Question(props) {

  return (
    <div className="questions-table">
      <p className="question-header">{props.question}</p>
    </div>
  );
}
