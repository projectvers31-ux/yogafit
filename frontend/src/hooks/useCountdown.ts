import { useState, useEffect } from 'react';

export function useCountdown(initial = 1800) {
  const [timeLeft, setTimeLeft] = useState(initial);
  useEffect(() => {
    const id = setInterval(() => setTimeLeft((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(id);
  }, []);
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };
  return { timeLeft, formatTime };
}

export default useCountdown;
