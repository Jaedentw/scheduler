import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {

  const interviewers = props.interviewers;

  let mappedInterviewers = interviewers.map((i) => {
    return (
      <InterviewerListItem
        key={i.id}
        name={i.name}
        avatar={i.avatar}
        selected={i.id === props.interviewer}
        setInterviewer={() => props.onChange(i.id)}
        interviewer={i}
      />
    )
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {mappedInterviewers}
      </ul>
    </section>
  );
}