import { useState, useEffect } from 'react';
import { background } from '@storybook/theming';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(modeX, replace = false) { 
    // this adds a new mode with the spread operator
    if(!replace) {
    setHistory( prev =>([...prev, mode]));
    }
    setMode(modeX);
  }
  function back() {
    if(history.length > 0){
      setMode(history[history.length - 1])
      setHistory(prev => [...prev.slice(0, -1)]); 
    }
  }

  return { mode, transition, back };
};
