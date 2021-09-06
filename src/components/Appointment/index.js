import React from "react";
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form";
import Saving from "./Saving";
import Deleting from "./Deleting";
import Confirm from "./Confirm";
import "./styles.scss";
import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
  const {interviewers}=props;
  const {bookInterview, cancelInterview} = props;

  function save(name, interviewer) {
    transition(SAVING)
    const interview = {
      student: name,
      interviewer
    };
    bookInterview(props.id, interview)
    .then(response => {
      transition(SHOW);
  })
}

function askDelete() {
  transition(CONFIRM);
}

function delete1() {
  
  console.log(" in delete 1 function");
  transition(DELETING)
  cancelInterview(props.id)
  .then(response => {
    transition(EMPTY);
  })


}
  console.log("state");
  return(
    <article className="appointment">
      <Header time={props.time}></Header>
      {mode === CONFIRM && <Confirm onCancel={() => back(SHOW)} onConfirm = {() => delete1()} message = "Are You sure You want to Delete?"/>}
      {mode === DELETING && <Deleting />}
      {mode === SAVING && <Saving />}


    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
     <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
    onDelete = {askDelete}
    />
    )}

    {mode === CREATE && <Form onCancel = {() => back(EMPTY)} interviewers = {interviewers} onSave = {save}/>}

    </article>
  );
}
