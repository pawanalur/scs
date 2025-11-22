import { useState, useImperativeHandle, forwardRef } from "react";

const Timer = forwardRef((props, ref) => {
  const [time, setTime] = useState("00:00:00");

  function startTimer() {
    setTime("00:10:00");
  }

  function endTimer() {
    setTime("01:00:00");
  }

  function resetTimer() {
    setTime("00:00:00");
  }

  useImperativeHandle(ref, () => ({
    startTimer,
    endTimer,
    resetTimer,
  }));

  return <>{time}</>;
});

export default Timer;
