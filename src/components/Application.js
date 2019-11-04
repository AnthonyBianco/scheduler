import React, { useState, Fragment, useEffect } from "react";
import axios from 'axios';
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index.js";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../components/helpers/selectors";

export default function Application(props) {

  function cancelInterview (id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: {...interview} 
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    return axios.delete(`api/appointments/${id}`, interview)
    .then(() => {
      delete appointments[id];
      setState(prev => ({
        ...state,
      }));
  });
};

  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`api/appointments/${id}`, {interview})
    .then(() => {
      setState({
        ...state,  appointments
      });
    });
  };

  const setDay = day => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  // this returns a promise.all
  
  useEffect(()=> {
    Promise.all([
      Promise.resolve(axios.get(`/api/days`)),
      Promise.resolve(axios.get(`/api/appointments`)),
      Promise.resolve(axios.get(`/api/interviewers`))

    ]).then((all) => {
      setState(prev => ({ days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
    }, []) 


  const appointments = getAppointmentsForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
  
  const interview = getInterview(state, appointment.interview);
const interviewers = getInterviewersForDay(state, state.day);
    // Pass bookInterview to each Appointment component as props.

  return (
    <Appointment
      bookInterview = {bookInterview}
      interviewers = {interviewers}
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      cancelInterview = {cancelInterview}
    />
  );
});


  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />

<nav className="sidebar__menu">

    <DayList
      days={state.days}
      day={state.day}
      setDay={setDay} 
      />

</nav>
</section>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>

<section className="schedule">{schedule}</section>
    </main>
  );
}

