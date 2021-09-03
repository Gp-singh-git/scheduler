import React, {useState, useEffect} from "react";
import DayList from "./DayList";
import Appointment from "components/Appointment"
import axios from "axios";
import "components/Application.scss";
import getAppointmentsForDay from "helpers/selectors";


// const days = [
  //   {
    //     id: 1,
    //     name: "Monday",
    //     spots: 2,
    //   },
    //   {
      //     id: 2,
      //     name: "Tuesday",
      //     spots: 5,
      //   },
      //   {
        //     id: 3,
        //     name: "Wednesday",
        //     spots: 0,
        //   },
        // ];
        // const appointments = [
        //   {
        //     id: 1,
        //     time: "12pm",
        //   },
        //   {
        //     id: 2,
        //     time: "1pm",
        //     interview: {
        //       student: "Lydia Miller-Jones",
        //       interviewer: {
        //         id: 1,
        //         name: "Sylvia Palmer",
        //         avatar: "https://i.imgur.com/LpaY82x.png",
        //       }
        //     }
        //   },
        //   {
        //     id: 3,
        //     time: "2pm",
        //     interview: {
        //       student: "Justin Miller",
        //       interviewer: {
        //         id: 3,
        //         name: "Mildred Nazir",
        //         avatar: "https://i.imgur.com/T2WwVfS.png",
        //       }
        //     }
        //   },
        //   {
        //     id: 4,
        //     time: "3pm",
        //     interview: {
        //       student: "Adam G",
        //       interviewer: {
        //         id: 2,
        //         name: "Tori Malcolm",
        //         avatar: "https://i.imgur.com/Nmx0Qxo.png",
        //       }
        //     }
        //   },
        //   {
        //     id: 5,
        //     time: "4pm",
        //     interview: {
        //       student: "Jocky rhodes",
        //       interviewer: {
        //         id: 5,
        //         name: "Sven Jones",
        //         avatar: "https://i.imgur.com/twYrpay.jpg",
        //       }
        //     }
        //   }
        // ];
        
        
        export default function Application(props) {
          
          const [state, setState] = useState({
            day: "Monday",
            days: [],
            appointments: {}
          });
          const dailyAppointments = getAppointmentsForDay({days: state.days, appointments: state.appointments},
                                                        state.day);

          // setState({ ...state, day: "Tuesday" });
          
          const setDay = day => setState({ ...state, day });
  
          // const setDays = (days) => setState(prev => ({ ...prev, days }));

          useEffect(() => {
          //  axios.get("/api/days")
          //  .then(response => {
          //    console.log("=========> ", response)
            //  setDays(response.data);

            Promise.all([
              axios.get("http://localhost:8001/api/days"),
              axios.get("http://localhost:8001/api/appointments"),
            ]).then((all) => {
              console.log(">>>>>>>>>>>>", all)
              setState(prev => ({...prev, days: all[0].data, appointments: all[1].data }));
              // set your states here with the correct values...
            })

        
          },[])
          
          const appShow = dailyAppointments.map(appointment => 
            <Appointment key={appointment.id} {...appointment} />
            )
            appShow.push(<Appointment key="last" time="5pm" />)
            
            
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
                  <DayList
                    days={state.days}
                    day = {state.day}
                    setDay={setDay}
                    />
              </nav>
              <img
                className="sidebar__lhl sidebar--centered"
                src="images/lhl.png"
                alt="Lighthouse Labs"
          />
          </section>
      <section className="schedule">
        {appShow}
      </section>
    </main>
  );
}
