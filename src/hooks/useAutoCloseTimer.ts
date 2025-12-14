import { useEffect, useRef, useState } from "react";

export function useAutoCloseTimer(seconds: number, onFinish: () => void) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const start = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(seconds);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          onFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stop = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    return () => stop();
  }, []);

  return { timeLeft, start, stop };
}
