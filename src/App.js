import React from "react";
import "./App.css";
import Start from "./Start";
import Question from "./Question";
import Bubbles from "./Bubbles";
import { nanoid } from "nanoid";
import Answers from "./Answers";

function App() {
  console.log("rendered");
  const [startGame, setStartGame] = React.useState(false);
  const [quiz, setQuiz] = React.useState([]);
  const [answered, setAnswer] = React.useState(false);
  const [reStart, setReStart] = React.useState(false);

  React.useEffect(() => {
    setReStart(false);
    async function getQuiz() {
      const res = await fetch("https://opentdb.com/api.php?amount=8");
      const data = await res.json();
      setQuiz(
        data.results.map((question) => {
          let answer = [...question.incorrect_answers, question.correct_answer];
          answer.sort();
          return {
            question: question.question
              .replace(/&quot;/g, '"')
              .replace(/&#039;/g, "'"),
            answer: answer.map((answer) => {
              return {
                value: answer.replace(/&quot;/g, '"').replace(/&#039;/g, '"'),
                id: nanoid(),
                isHeld: false,
                triggered: false,
              };
            }),
            correctAnswer: question.correct_answer,
          };
        })
      );
    }
    getQuiz();
  }, [reStart]);

  function startQuiz() {
    setStartGame((prevStartGame) => !prevStartGame);
  }

  function holdAnswer(id) {
  if (!answered) {   
      setQuiz(
        quiz.map((question) => {
          return {
            question: question.question,
            answer: question.answer.map((answer) => {
              return answer.id === id
                ? { ...answer, isHeld: !answer.isHeld }
                : answer;
            }),
            correctAnswer: question.correctAnswer,
          };
        })
      );}
  }

  function checkAnswers() {
    setAnswer(true);
    let count = 0;
    setQuiz(
      quiz.map((question) => {
        return {
          question: question.question,
          answer: question.answer.map((answer) => {
            answer.isHeld && answer.value === question.correctAnswer
              ? count++
              : count += 0;
            return answer.isHeld && answer.value === question.correctAnswer
              ? { ...answer, triggered: true }
              : { ...answer, triggered: true };
          }),
          correctAnswer: question.correctAnswer,
          totalCorrect: count,
        };
      })
    );
    if (answered) {
      setAnswer(false);
      setReStart(true);
    }
  }

  const allQuestions = quiz.map((question) => {
    return (
      <div key={nanoid()} className="board">
        <Question question={question.question} />
        <div className="answers-container">
          {question.answer.map((answer) => (
            <Answers
              triggered={answer.triggered}
              correct={question.correctAnswer}
              isHeld={answer.isHeld}
              answer={answer.value}
              key={answer.id}
              hold={() => holdAnswer(answer.id)}
            />
          ))}
        </div>
      </div>
    );
  });

  return (
    <div className="App">
        {!startGame ? <Start startQuiz={startQuiz} /> : <div className="fullBoard" >{allQuestions}</div>}
      <div className="button-play">
        {answered && (
          <h3>
            You score {quiz[quiz.length - 1].totalCorrect}/{quiz.length} correct
            answers
          </h3>
        )}
        {startGame && (
          <button className="check-answers" onClick={checkAnswers}>
            {answered ? "Play again" : "Check answers"}
          </button>
        )}
      </div>
      <Bubbles />
    </div>
  );
}

export default App;
// How is it going