import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Error from "./Error";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const ERROR_SAVE = "ERROR_SAVE";
const DELETING = "DELETING";
const ERROR_DELETE = "ERROR_DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment (props) {

  // let student = ''
  // let interviewer = {};

  // if(props.interview) {
  //   interviewer = props.interview.interviewer;
  //   student = props.interview.student
  // }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

  function deleteInterview() {
    transition(DELETING);
    setTimeout((() => props.cancelInterview(props.id)
    .then(transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true))), 1000) //setTimeout implemented to allow enough time for DELETING mode to show
  }

  return (
    <article className="appointment">
      <Header
        time={props.time}
      />
      {mode === EMPTY && 
        <Empty 
        onAdd={() => {
          transition(CREATE);
        }} 
        />
      }
      {mode === SHOW && 
      props.interview &&
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => {transition(CONFIRM)}}
          onEdit={() => {transition(EDIT)}}
        />
      }
      {mode === CREATE && 
        <Form
          onCancel={() => back()}
          interviewers={props.interviewers}
          onSave={save}
        />
      }
      {mode === SAVING &&
        <Status 
          message="Saving"
        />
      }
      {mode === ERROR_SAVE &&
        <Error 
        message="Could not save appointment. Please try again later."
        />
      }
      {mode === DELETING &&
        <Status
          message="Deleting"
        />
      }
      {mode === ERROR_DELETE &&
        <Error
          message="Could not delete appointment. Please try again later."
        />
      }
      {mode === CONFIRM &&
        <Confirm
          onCancel={() => back()}
          onConfirm={deleteInterview} 
        />
      }
      {mode === EDIT &&
        <Form 
        student={props.interview.student}
        interviewer={props.interview.interviewer.id}
        onSave={save}
        onCancel={() => back()}
        interviewers={props.interviewers}
        />
      }
    </article>
  )
}