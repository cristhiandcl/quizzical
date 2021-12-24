import React from "react";

export default function Start(props) {
  return (
    <div className="start-page">
      <h1 className="title">Quizzical</h1>
      <p className="description">Test yourself with some trivia questions</p>
      <button onClick={props.startQuiz} className="start-button">Start quiz</button>
    </div>
  );
}
