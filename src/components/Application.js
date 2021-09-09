import React, { useState, useEffect } from 'react';
import DayList from './DayList';
import Appointment from 'components/Appointment';
import axios from 'axios';
import 'components/Application.scss';
import {
  getInterview,
  getAppointmentsForDay,
  getInterviewersForDay,
} from 'helpers/selectors';
import useApplicationData from 'hooks/useApplicationData';

export default function Application(props) {
//importing hooks for use here
  const { state, setState, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  const dailyAppointments = getAppointmentsForDay(
    { days: state.days, appointments: state.appointments },
    state.day
  ); // gets us appointments array for the 'day'

  const interviewers = getInterviewersForDay(
    {
      days: state.days,
      appointments: state.appointments,
      interviewers: state.interviewers,
    },
    state.day
  ); // gets us interviewers array for the 'day'

  useEffect(() => {

    // Getting database into state
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers'),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  //Function to parse all appointment data to be shown.
  const appShow = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });
  appShow.push(<Appointment key="last" time="5pm" />); //Last entry (empty 5pm)

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
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>

        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>

      <section className="schedule">
        {appShow} {/*enlists all appointment for the day here*/}
      </section>

    </main>
  );
}
