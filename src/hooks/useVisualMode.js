import {useState} from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 

  function transition(mode, replace=false) {
    setMode(mode)
     if (!replace) {
        setHistory(prev => {
          return [...prev, mode]
        })
     } else {
       setHistory(prev => {
          return [...prev.slice(0, prev.length - 1), mode]
         })
     }
 }

  const back = function() {
    if(history.length === 1) return ;

    const y = [...history];
    y.pop();
    setHistory(y);
    setMode(y[y.length-1]);


  }

  return { mode, transition, back };
}