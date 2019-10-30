import React, { Fragment } from 'react';
import "./styles.scss";
import Header from "./Header.js";
import Empty from "./Empty.js";
import Show from "./Show.js";

export default function Appointment (props) {
  return (
    <article className="appointment">
    <Header time={props.time}/>
    
   
    {props.interview ? <Show name={props.interview.student} interviewer={props.interview.interviewer} /> : < Empty />}   
    </article>
  )};

  // Remember that our <Show /> component takes in two props: a student and an interviewer.
// Update the Appointment component in index.js according to the following:

// All Appointment components will render a Header that takes in a time prop.
// If props.interview is truthy (an interview object) the Appointment will render the <Show /> component, else it should render the <Empty /> component.
// Using ternary operator version of conditional rendering makes the most sense in this case where we want to render Show or Empty based on props.interview.