
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