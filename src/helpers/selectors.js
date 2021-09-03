import React from "react";

export default function getAppointmentsForDay(state, day) {

  const selDay = state.days.filter(day1 => day1.name === day);
  const arr=[];
  if(selDay.length ===0 ) return arr;

  const result = selDay[0].appointments.map(id1 => state.appointments[id1]);
  
  return result;

  }
