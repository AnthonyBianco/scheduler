
export function getAppointmentsForDay(state, day) {
  const appointments = [];
  const matchingDay = state.days.find(dayReturn => dayReturn.name === day);
  if (!matchingDay){
    return [];
  }
  for (let id of matchingDay.appointments){
    console.log(id, state.appointments[id]);
    appointments.push(state.appointments[id])
  }
  console.log(appointments);
  return appointments;

};

export const getInterview = (state, interview) => {
  if(!interview) {
    return null;
  } else {
    let student = interview.student
    let interviewer = state.interviewers[interview.interviewer]
    let obj = {student, interviewer}
    return obj;
  }
};

  export const getInterviewersForDay = (state, day) => {
    const interviewers = [];
    const filteredDay = state.days.find(dayCheck => dayCheck.name === day)
    if (!filteredDay) return interviewers;
    for (let id of filteredDay.interviewers) {
      interviewers.push(state.interviewers[id])
    }
    return interviewers;
};

//PREVIOUS CODE

// export const getInterviewersForDay = (state, dayName) => {
//   const theDay = state.days.find((day) => {
//     return day.name === dayName;    
//   });
//   if (theDay) {
//     const appointmentIds = theDay.appointments;
//     const appointments = appointmentIds.map(id => state.appointments[id]);
//     const bookedAppointments = appointments.filter((appointment) => appointment.interview);
//     const appointmentInterviewerIds = bookedAppointments.map((appointment) => appointment.interview.interviewer);
//     let uniqueInterviewerIds = [];
//     for (let i = 0; i < appointmentInterviewerIds.length; i++){
//       if (appointmentInterviewerIds.indexOf(appointmentInterviewerIds[i]) === i) {
//         uniqueInterviewerIds.push(appointmentInterviewerIds[i]);
//       }
//     }
//     const actualInterviewers = uniqueInterviewerIds.map(id => state.interviewers[id]);
//     console.log(actualInterviewers);
//     return actualInterviewers;
        
//   }
//   return [];
// };



