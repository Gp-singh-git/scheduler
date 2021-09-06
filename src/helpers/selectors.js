import React from "react";

export function getAppointmentsForDay(state, day) {

  const selDay = state.days.filter(day1 => day1.name === day);
  const arr=[];
  if(selDay.length ===0 ) return arr;

  const result = selDay[0].appointments.map(id1 => state.appointments[id1]);
  
  return result;

  }


export function getInterviewersForDay(state, day) {

  // console.log("state----------->", state);


  const selDay = state.days.filter(day1 => day1.name === day);
  const arr=[];
  if(selDay.length ===0 ) return arr;
  // console.log("selday----->", selDay);
  // console.log("selday----->", selDay);

  const result = selDay[0].interviewers.map(id1 => state.interviewers[id1]);
  
  return result;

  }
export function getInterview(state, interview) {


  if(!interview) return null;
  const id = interview.interviewer;

  const result={};
  result.student = interview.student;
  result.interviewer = state.interviewers[id];
  return result;

  }