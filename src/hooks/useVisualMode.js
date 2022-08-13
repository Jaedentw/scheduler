import { useState } from "react";


export default function useVisualMode(initial) {
  let [mode, setMode] = useState(initial);
  let [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      setHistory((prev) => {
        const prev1 = [...prev].slice(0, prev.length - 1)
        return [...prev1, newMode]
      });
      setMode(newMode);
    } else {
      setHistory((prev) => [...prev, newMode]);
      setMode(newMode);
    }
  }

  function back() {
    if (history.length > 1) {
      setHistory((prev) => [...prev].slice(0, prev.length - 1))
      setMode(history.slice(history.length - 2, history.length - 1)[0]);
    }
  }

  return { mode, transition, back };
}