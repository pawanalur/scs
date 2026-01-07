import { useState, useImperativeHandle, forwardRef, useRef } from "react";

const ActionTimer = forwardRef((props, ref) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const intervalRef = useRef(null);

  function setElapsedSecondsExternally(seconds) {
    setElapsedSeconds(seconds);
  }

  function startTimer() {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
  }

  function endTimer() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  function resetTimer() {
    endTimer();
    setElapsedSeconds(0);
  }

  function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0"),
    ].join(":");
  }

  const formattedTime = formatTime(elapsedSeconds);

  useImperativeHandle(ref, () => ({
    startTimer,
    endTimer,
    resetTimer,
    setElapsedSecondsExternally,
  }));

  return <>{formattedTime}</>;
});

export default ActionTimer;
