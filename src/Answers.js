import React from "react"

export default function Answers(props) {
    const styles = {
        backgroundColor: props.isHeld && !props.triggered ? "#deebf8" : props.triggered && props.answer === props.correct ? "#94D7A2" : props.isHeld && props.triggered ? '#F8BCBC' : "#fff",
        opacity: props.isHeld && props.triggered && !(props.answer === props.correct) ? "0.5" : props.triggered && props.answer === props.correct ? "1" : !props.isHeld &&  props.triggered && "0.5",
    }
    return (
            <div className="individual-answer" style={styles} onClick={props.hold} >
              <p>
                {props.answer}
              </p>
            </div>
    )
}