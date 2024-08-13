import { memo,useCallback, useEffect, useRef, useState } from "react";

export default memo(function StopWatch() {
  const [time, setTime] = useState(0); //time represents time in seconds.
  const intervalRef = useRef(null);

  const startTimer = useCallback(() => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 10);
    }
  },[]);

  const stopTimer = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  },[]);

  const resetTimer = useCallback(() => {
    clearInterval(intervalRef.current)
    setTime(0);
  },[]);

  const formatTime = useCallback((time) => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = Math.floor(time / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}`;
  },[]);

  useEffect(()=>{
    return ()=>{
        clearInterval(intervalRef.current)
    }
  },[])

  return (
    <>
      <h1> {formatTime(time)}</h1>
      <button onClick={startTimer}>Start Timer</button>
      <button onClick={stopTimer}>Stop Timer</button>
      <button onClick={resetTimer}>Reset</button>
    </>
  );
});
