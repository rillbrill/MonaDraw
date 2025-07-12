// Timer.tsx
import React, { useState, useEffect } from 'react';

interface TimerProps {
  start?: number;
  className?: string;
  onTimeUp?: () => void;
  autoStart?: boolean;
}

const Timer: React.FC<TimerProps> = ({
  start,
  className,
  onTimeUp,
  autoStart = true,
}) => {
  const INITIAL_SECONDS = start ?? 30;
  const [seconds, setSeconds] = useState<number>(INITIAL_SECONDS);
  const [isRunning, setIsRunning] = useState<boolean>(autoStart);

  useEffect(() => {
    setSeconds(INITIAL_SECONDS);
    setIsRunning(autoStart);
  }, [INITIAL_SECONDS, autoStart]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev - 1 <= 0) {
          setIsRunning(false);
          if (onTimeUp) onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, onTimeUp]);

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600).toString().padStart(2, '0');
    const m = Math.floor((secs % 3600) / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const getColorClass = () => {
    if (seconds <= 5 && seconds > 0) {
      return 'text-red-400';
    }
    return className?.includes('text-') ? className : 'text-teal-400';
  };

  return (
    <span
      className={`${getColorClass()} ${className?.replace(/text-\w+-\d+/, '') || 'text-xl font-bold font-mono'}`}
    >
      {formatTime(seconds)}
    </span>
  );
};

export default Timer;
