import React from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Saving from './Saving';
import Deleting from './Deleting';
import Confirm from './Confirm';
import Error from './Error';
import './styles.scss';
import useVisualMode from 'hooks/useVisualMode';

export default function Appointment(props) {
  //Mode variables to be used
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const DELETING = 'DELETING';
  const CONFIRM = 'CONFIRM';
  const EDIT = 'EDIT';
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  const { interviewers } = props;
  const { bookInterview, cancelInterview } = props;

  //Function to save new appointment booking information
  function save(name, interviewer) {
    let edit_mode = 0;
    if (mode === EDIT) {
      edit_mode = 1;
    }
    transition(SAVING);
    const interview = {
      student: name,
      interviewer,
    };
    bookInterview(props.id, interview, edit_mode)
      .then((response) => {
        transition(SHOW);
      })
      .catch((error) => {
        transition(ERROR_SAVE, true);
      });
  }
  //Function confirming delete operation by showing confirm screen
  function askDelete() {
    transition(CONFIRM);
  }
  //Function deleting appointment data
  function delete1() {
    transition(DELETING, true);
    cancelInterview(props.id)
      .then((response) => {
        transition(EMPTY);
      })
      .catch((error) => {
        transition(ERROR_DELETE, true);
      });
  }

  function edit1() {
    transition(EDIT);
  }

  return (
    <article className="appointment">
      <Header time={props.time}></Header>

      {mode === CONFIRM && (
        <Confirm
          onCancel={() => back()}
          onConfirm={() => delete1()}
          message="Are You sure You want to Delete?"
        />
      )}
      {mode === DELETING && <Deleting />}
      {mode === SAVING && <Saving />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={askDelete}
          onEdit={() => edit1()}
        />
      )}

      {mode === CREATE && (
        <Form
          onCancel={() => back()}
          interviewers={interviewers}
          onSave={save}
        />
      )}

      {mode === EDIT && (
        <Form
          onCancel={() => back()}
          interviewers={interviewers}
          onSave={save}
          name={props.interview.student && props.interview.student}
          interviewer={
            props.interview.interviewer.id && props.interview.interviewer.id
          }
        />
      )}

      {mode === ERROR_SAVE && (
        <Error
          message="Cannot complete the Save operation"
          onClose={() => back()}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Cannot complete the Delete operation"
          onClose={() => back()}
        />
      )}
    </article>
  );
}
