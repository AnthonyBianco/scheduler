import React, { Fragment } from 'react';
import "./styles.scss";
import Header from "./Header.js";
import Empty from "./Empty.js";
import Show from "./Show.js";
import useVisualMode from "../../hooks/useVisualMode";
import Form from "./Form";
import InterviewerList from 'components/InterviewerList';
import { format } from 'util';
import { irBlack } from 'react-syntax-highlighter/dist/styles/hljs';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


export default function Appointment (props) {


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    }
    // SAVING indicator
    transition(SAVING);
    props
    .bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE));
  }
  

  function cancelInterview (name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
    transition(DELETING);
    props.cancelInterview(props.id, interview)
    .then(() => {
      transition(EMPTY);
    })
      .catch(error => transition(ERROR_DELETE, true));
  }

  function cancel(){
    back();
  }

  function confirm(){
    transition(CONFIRM);
  }

  function onEdit(){
    transition(EDIT);
  }


  return (

    <article className="appointment">
    <Header time={props.time}/>

    {mode === CREATE && <Form interviewers={props.interviewers} onCancel = {back} onSave = {save}/>}
    {mode === EMPTY && <Empty onAdd={() => {transition(CREATE)}} />}
    {mode === SAVING && <Status message={"Saving"}/>}
    {mode === DELETING && <Status message={"Deleting"}/>}
    {mode === CONFIRM && (<Confirm onCancel = {cancel} onConfirm = {cancelInterview}/>)}
    
    {mode === EDIT && (<Form name={props.interview.student} interviewers={props.interviewers} onCancel = {back} onSave = {save}/>)}

    {mode === ERROR_SAVE && <Error  onClose = {back} message={"Could not save"}/>}
    {mode === ERROR_DELETE && <Error onClose = {back} message={"Could not delete"}/>}

    {mode === SHOW && (
    <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
    onDelete = {confirm}
    onEdit = {onEdit}
    />
    )} 
    </article>
  )};

