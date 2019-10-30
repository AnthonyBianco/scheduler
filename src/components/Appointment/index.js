import React from 'react';
import "./styles.scss";
import Header from "./Header.js"

export default function Appointment () {
  return (
    <>
    <article className="appointment"></article>
    <Header 
    
    />
    </>
  )};


// Update the Appointment component in index.js according to the following:

// All Appointment components will render a Header that takes in a time prop.
// If props.interview is truthy (an interview object) the Appointment will render the <Show /> component, else it should render the <Empty /> component.
// Using ternary operator version of conditional rendering makes the most sense in this case where we want to render Show or Empty based on props.interview.