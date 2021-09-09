import React from 'react';
//Returns appointmenta array for the day
export function getAppointmentsForDay(state, day) {
  const selDay = state.days.filter((day1) => day1.name === day);
  const arr = [];
  if (selDay.length === 0) return arr;

  const result = selDay[0].appointments.map((id1) => state.appointments[id1]);

  return result;
}
// gets us interviewers array for the 'day'
export function getInterviewersForDay(state, day) {

  const selDay = state.days.filter((day1) => day1.name === day);
  const arr = [];
  if (selDay.length === 0) return arr;

  const result = selDay[0].interviewers.map((id1) => state.interviewers[id1]);

  return result;
}
//Returns interview data to be updated to null value
export function getInterview(state, interview) {
  if (!interview) return null;
  const id = interview.interviewer;

  const result = {};
  result.student = interview.student;
  result.interviewer = state.interviewers[id];
  return result;
}
