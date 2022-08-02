import React from "react";
import "./styles.scss"
import Header from "./Header";
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const STATUS = "STATUS";

export default function Appointment (props) {

  let student = ''
  let interviewer = {};
  if(props.interview) {
    interviewer = props.interview.interviewer;
    student = props.interview.student
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header
        time={props.time}
      />
      {mode === EMPTY && 
        <Empty 
        onAdd={() => {
          transition(CREATE);
          console.log("Previous Mode", mode)
        }} 
        />
      }
      {mode === SHOW && 
        <Show
          student={student}
          interviewer={interviewer}
        />
      }
      {mode === CREATE && 
        <Form
          onCancel={() => {
            back()
            console.log("Previous Mode", mode)
          }}
          interviewers={['placeholder']}
        />
      }
    </article>
  )
}