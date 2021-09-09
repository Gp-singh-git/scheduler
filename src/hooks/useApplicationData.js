import { useState } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });
  //Function to set day, like Monday, Tuesday, etc
  const setDay = (day) => setState({ ...state, day });

  //Function used in Save/Edit to save values to database.
  function bookInterview(id, interview, edit_mode) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }, //Filling interview details from arg which was null before
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment, //Updating all appointments
    };

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        if (edit_mode === 0) {
          const days = updateSpots(-1);
          setState({ ...state, appointments, days }); //Updating with new Appointments data and days with updated spots
        } else {
          setState({ ...state, appointments });
        }
        console.log('success');
      });
  }

  function cancelInterview(id) {
    const appointment = { ...state.appointments[id], interview: null };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .delete(`/api/appointments/${id}`, { interview: null })
      .then((response) => {
        const days = updateSpots(1);
        setState({ ...state, appointments, days });
      });
  }

  function updateSpots(delta) {
    //Step1 using state.day , select the right day from state.days
    const sel_index = state.days.findIndex((day1) => day1.name === state.day);
    //Step 2 using delta, inc/dec spots count for the day
    const days = [...state.days];
    days[sel_index].spots += delta;

    //Step 3 days state update
    setState({ ...state, days });
    return days;
  }

  return { bookInterview, cancelInterview, state, setDay, setState };
}
