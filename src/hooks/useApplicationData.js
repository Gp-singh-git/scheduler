import { useState } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  function bookInterview(id, interview, edit_mode) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    console.log("appointments ----->", appointments);
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        if(edit_mode === 0) {
        const days = updateSpots(-1);
        setState({ ...state, appointments, days });
        } else {
          setState({ ...state, appointments});
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
        console.log('success');


        // const rev_days = calcSpots();
        // setState({ ...state, appointments, days: rev_days });
        console.log('success deleting');
      });
  }

  // function calcSpots() {
  //   console.log('STATE------------', state);
  //   const newDays = state.days;
  //   console.log('------->--newdays-->', newDays);
  //   const modifiedDays = newDays.map((day) => {
  //     const count = day.appointments.filter(
  //       (ap_id) => state.appointments[ap_id].interview === null
  //     );
  //     console.log('Count-------?????', count);
  //     day.spots = count.length;
  //   });

  //   return modifiedDays;
  // }

  function updateSpots(delta) {
    //Step1 using state.day , select the right day from state.days 
    const sel_index = state.days.findIndex( day1 => day1.name === state.day)
    console.log("sel_day ---------->", sel_index);

    //Step 2 using delta, inc/dec spots count for the day

    const days = [...state.days]
    days[sel_index].spots += delta;

    //Step 3 days state update
    // setState({...state, days})
    return days;
  }

  return { bookInterview, cancelInterview, state, setDay, setState };
}
