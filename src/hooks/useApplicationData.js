import React, { useState, Fragment, useEffect, useReducer } from "react";
import axios from 'axios';
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index.js";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../components/helpers/selectors";


export default function useApplicationData(props) {

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const INCREMENT_SPOTS = "INCREMENT_SPOTS";
  const DECREMENT_SPOTS = "DECREMENT_SPOTS";

  
  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return {
          ...state,
          day: action.day,
        }

      case SET_APPLICATION_DATA:
        return { 
          ...state,
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers,
        }

      case SET_INTERVIEW: {
        const appointment = {
          ...state.appointments[action.id],
          interview: action.interview && { ...action.interview }
        };

        const appointments = {
          ...state.appointments,
          [action.id]: appointment
        };

        return { ...state, appointments };
      }

      case INCREMENT_SPOTS: {
        const dayId = action.payload.dayId;

        console.log(dayId)

        const days = state.days.map((day) => {
          if (day.id === dayId) {
            return { ...day, spots: day.spots - 1 };
          }

          return day;
        });

        return { ...state, days };
      }

      case DECREMENT_SPOTS: {
        const dayId = action.payload.dayId;

        console.log(dayId)

        const days = state.days.map((day) => {
          if (day.id === dayId) {
            return { ...day, spots: day.spots + 1 };
          }

          return day;
        });

        return { ...state, days };
      }

      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const [state, dispatch] = useReducer(reducer, {
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
});

 
  useEffect(()=> {
    Promise.all([
      Promise.resolve(axios.get(`/api/days`)), 
      Promise.resolve(axios.get(`/api/appointments`)),
      Promise.resolve(axios.get(`/api/interviewers`))

    ]).then((all) => {
      console.log(all);
      dispatch({ type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data });
    })
    }, []);  


  const cancelInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview} 
    };

    const appointments = {                                    
      ...state.appointments,
      [id]: appointment
    }

    const day = state.days.find((day) => day.name = state.day);

    return axios.delete(`api/appointments/${id}`, interview)
    .then(() => {
      delete appointments[id];
      dispatch({ type: SET_INTERVIEW, id, interview: null }); 
      
      if (day) {
        dispatch({
          type: INCREMENT_SPOTS,
          payload: {
            dayId: day.id
          }
        });
      }
    });

  
  }

  const bookInterview = (id, interview) => {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const day = state.days.find((day) => day.name = state.day);

    return axios.put(`api/appointments/${id}`, {interview})
    .then(() => {
      dispatch({ type: SET_INTERVIEW, id, interview });

      if (day) {
        dispatch({
          type: INCREMENT_SPOTS,
          payload: {
            dayId: day.id
          }
        });
      }
    });
  }

  const setDay = day => dispatch  ({type: SET_DAY, day });

  function getSpots (state, change) {
    const spots = state.days.map((indexDay) => {
      if (state.day === indexDay.name){
      return {...indexDay, spots: indexDay.spots + change}
    }
    return indexDay
    })
    return spots;
  }

  return { 
    state,
    actions: {
      cancelInterview,
      bookInterview,
      setDay
    }
  }

}
//     // this returns a promise.all
    
//     useEffect(()=> {
//       Promise.all([
//         Promise.resolve(axios.get(`/api/days`)),
//         Promise.resolve(axios.get(`/api/appointments`)),
//         Promise.resolve(axios.get(`/api/interviewers`))
  
//       ]).then((all) => {
//         setState(prev => ({ days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
//       })
//       }, []) 
  
//       // do I need to return any of this?
  
//   //   const appointments = getAppointmentsForDay(state, state.day);
  
//   //   const schedule = appointments.map((appointment) => {
    
//   //   const interview = getInterview(state, appointment.interview);
//   // const interviewers = getInterviewersForDay(state, state.day);
//   //     // Pass bookInterview to each Appointment component as props.
  
//   //   return (
//   //     <Appointment
//   //       bookInterview = {bookInterview}
//   //       interviewers = {interviewers}
//   //       key={appointment.id}
//   //       id={appointment.id}
//   //       time={appointment.time}
//   //       interview={interview}
//   //       cancelInterview = {cancelInterview}
//   //     />
//   //   );
//   // });
  
  
//   //   return (
//   //     <main className="layout">
//   //       <section className="sidebar">
//   //       <img
//   //   className="sidebar--centered"
//   //   src="images/logo.png"
//   //   alt="Interview Scheduler"
//   // />
//   // <hr className="sidebar__separator sidebar--centered" />
  
//   // <nav className="sidebar__menu">
  
//   //     <DayList
//   //       days={state.days}
//   //       day={state.day}
//   //       setDay={setDay} 
//   //       />
  
//   // </nav>
//   // </section>
//   // <img
//   //   className="sidebar__lhl sidebar--centered"
//   //   src="images/lhl.png"
//   //   alt="Lighthouse Labs"
//   // />
  
//   // <section className="schedule">{schedule}</section>
//   //     </main>
//   //   );
//   // }
  
  