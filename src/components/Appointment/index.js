import React from "react";
import "./styles.scss"
import Header from "./Header";
import Show from "./Show"
import Empty from "./Empty"

export default function Appointment (props) {

  let student = ''
  let interviewer = {};
  if(props.interview) {
    interviewer = props.interview.interviewer;
    student = props.interview.student
  }

  return (
    <article className="appointment">
      <Header
        time={props.time}
      />
      {props.interview ? 
      <Show
        student={student}
        interviewer={interviewer}
      /> : <Empty />}
    </article>
  )
}