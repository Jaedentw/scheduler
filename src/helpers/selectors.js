
export function getAppointmentsForDay(state, day) {

  let appointmentsArray = [];

  for (let dayObj of state.days) {
    if(dayObj.name === day) {
      for(let id of dayObj.appointments) {
        if(state.appointments[id]) {
          appointmentsArray.push(state.appointments[id]);
        }
      }
    }  
  }

  return appointmentsArray;
}

export function getInterview(state, interview) {

  if(!interview) return null;
  return {
    ...interview,
    interviewer: state.interviewers[interview.interviewer]
  }
}

export function getInterviewersForDay(state, day) {
  let interviewerArray = [];
  
  for (let dayObj of state.days) {
    if(dayObj.name === day) {
      let interviewerIds = dayObj.interviewers
      for (let interviewerId of interviewerIds) {
        if(state.interviewers[interviewerId]) {
          interviewerArray.push(state.interviewers[interviewerId]);
        }
      }
    }  
  }

  return interviewerArray;
}