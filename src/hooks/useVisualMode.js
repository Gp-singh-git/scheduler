import { useState } from 'react';
//setting mode to decide what to show in appointments
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); // Array tracking all modes

  function transition(mode, replace = false) {
    setMode(mode);
    if (!replace) {
      //If last entry/mode needs to be replaced, replace is set true
      setHistory((prev) => {
        return [...prev, mode];
      });
    } else {
      setHistory((prev) => {
        return [...prev.slice(0, prev.length - 1), mode];
      });
    }
  }
  //To go one step back in modes
  const back = function () {
    if (history.length === 1) return;

    const y = [...history];
    y.pop();
    setHistory(y);
    setMode(y[y.length - 1]);
  };

  return { mode, transition, back };
}
