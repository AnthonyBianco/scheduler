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

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

// In the Appointment component update the save action to show the SAVING indicator before calling props.bookInterview.


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
  props.bookInterview(props.id, interview)
  .then(() => {
    transition(SHOW);
    });
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
    });
  }

  function cancel(){
    if (props.interview){
      return transition(SHOW);
    } else {
      return transition(EMPTY);
    }
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

