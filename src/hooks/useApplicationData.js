import { useEffect, useState } from "react"
import axios from 'axios';

export default function useApplicationData() {
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

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, {interview})
      .then( response => setState({...state, appointments}))
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
    return axios.delete(`/api/appointments/${id}`).then((response) => {
      setState({
        ...state,
        appointments
      });
    })
  };

  function setDay(day) {
    setState({ ...state, day });
  };

  let [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })

  return { setDay, cancelInterview, bookInterview, state };
}