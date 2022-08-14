import { useEffect, useState } from "react"
import axios from 'axios';

export default function useApplicationData() {

  let [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }))
    })
  }, [])

  function daySpots(currentDay, appointments) {
    let dayData = {};
    let dayIndex = 0;

    for (let day of state.days) {
      if (day.name === currentDay) {
        dayData = day;
        dayIndex = state.days.indexOf(day);
      }
    }

    let counter = 0;

    for (let appt of dayData.appointments) {
      if(appointments[appt].interview === null) {
        counter += 1
      }
    }

    const days = [...state.days]
    const updatedDay = {...dayData, spots: counter}
    days.splice(dayIndex, 1, updatedDay)

    return days;
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(response => {
        const days = daySpots(state.day, appointments)
        setState({ ...state, appointments, days });
      })
  };

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`)
      .then((response) => {
        const days = daySpots(state.day, appointments)
        setState({ ...state, appointments, days });
      })
  };

  function setDay(day) {
    setState({ ...state, day });
  };

  return { setDay, cancelInterview, bookInterview, state };
}