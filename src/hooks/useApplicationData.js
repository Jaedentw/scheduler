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

  function daySpots(currentDay, take) {
    let dayData = {};
    let dayIndex = -1;

    for (let day of state.days) {
      if (day.name === currentDay) {
        dayData = day;
        dayIndex = state.days.indexOf(day);
      }
    }

    if (take) {
      dayData.spots = dayData.spots - 1
    } else {
      dayData.spots = dayData.spots + 1
    }

    const days = state.days;
    days.splice(dayIndex, 1, dayData)

    setState((prev) => ({
      ...prev,
      days
    }))
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
        setState({ ...state, appointments });
        daySpots(state.day, true)
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
        setState({ ...state, appointments });
        daySpots(state.day, false);
      })
  };

  function setDay(day) {
    setState({ ...state, day });
  };

  return { setDay, cancelInterview, bookInterview, state };
}