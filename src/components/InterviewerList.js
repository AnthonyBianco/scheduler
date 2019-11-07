import React from 'react'; 
import InterviewerListItem from "components/InterviewerListItem";
import "./InterviewerList.scss";
import PropTypes from 'prop-types';

export default function InterviewerList(props) {
 
  const interviewers = props.interviewers.map(interviewer => (    
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        setInterviewer={event => props.setInterviewer(interviewer.id)}
      />

  ));

  return (
    <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">{interviewers}</ul>
  </section>


)};

InterviewerList.propTypes = {
  interviewers: PropTypes.array,
  setInterviewer: PropTypes.func.isRequired
};


// Throughout the activities, we will refer to react-testing-library and @testing-library/react. We are calling the library react-testing-library, but we are importing the module named @testing-library/react. When we import the module, always use @testing-library/react.