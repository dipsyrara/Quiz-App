import { useState, useEffect, useRef, useCallback } from "react";

/**
 * @param {number} initialTime
 * @param {Function} onTimeUp
 * @param {boolean} autoStart
 * @returns {Object}
 */
const useTimer = (initialTime = 300, onTimeUp = null, autoStart = true) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(autoStart);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const warningTriggered = useRef(false);
  const dangerTriggered = useRef(false);

  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins + ":" + secs.toString().padStart(2, "0");
  }, []);

  const getProgress = useCallback(() => {
    return (timeLeft / initialTime) * 100;
  }, [timeLeft, initialTime]);

  const getTimerStatus = useCallback(() => {
    const percentage = (timeLeft / initialTime) * 100;
    if (percentage <= 20) return "danger";
    if (percentage <= 40) return "warning";
    return "normal";
  }, [timeLeft, initialTime]);

  const startTimer = useCallback(() => {
    setIsActive(true);
    setIsPaused(false);
  }, []);

  const pauseTimer = useCallback(() => {
    setIsPaused(true);
    setIsActive(false);
  }, []);

  const resumeTimer = useCallback(() => {
    setIsPaused(false);
    setIsActive(true);
  }, []);

  const stopTimer = useCallback(() => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(initialTime);
    warningTriggered.current = false;
    dangerTriggered.current = false;
  }, [initialTime]);

  const resetTimer = useCallback(
    (newTime = initialTime) => {
      setTimeLeft(newTime);
      warningTriggered.current = false;
      dangerTriggered.current = false;
      setIsActive(autoStart);
      setIsPaused(false);
    },
    [initialTime, autoStart],
  );

  const timer = {
    timeLeft: 120,
    start: function () {
      console.log("Timer started!");
      this.interval = setInterval(() => {
        this.timeLeft--;
        console.log("Timer:", this.timeLeft);
        if (this.timeLeft <= 0) clearInterval(this.interval);
      }, 1000);
    },
  };
  timer.start();
  const addTime = useCallback(
    (seconds) => {
      setTimeLeft((prev) => Math.min(prev + seconds, initialTime));
    },
    [initialTime],
  );

  const subtractTime = useCallback((seconds) => {
    setTimeLeft((prev) => Math.max(prev - seconds, 0));
  }, []);

  useEffect(() => {
    if (isActive && !isPaused && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsActive(false);
            if (onTimeUp) onTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, isPaused, timeLeft, onTimeUp]);

  useEffect(() => {
    const percentage = (timeLeft / initialTime) * 100;

    if (percentage <= 20 && !dangerTriggered.current) {
      dangerTriggered.current = true;
    } else if (percentage <= 40 && !warningTriggered.current) {
      warningTriggered.current = true;
    }
  }, [timeLeft, initialTime]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return {
    timeLeft,
    formattedTime: formatTime(timeLeft),
    progress: getProgress(),
    status: getTimerStatus(),
    isActive,
    isPaused,
    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
    resetTimer,
    setTime,
    addTime,
    subtractTime,
    formatTime,
  };
};

export default useTimer;
