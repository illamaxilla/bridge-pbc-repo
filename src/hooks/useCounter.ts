import { useState, useEffect } from "react";

/**
 * Animates a number from 0 to a target value with cubic ease-out.
 * Used across all sector pages for stat counter animations.
 */
export const useCounter = (target: number | string, duration = 1200, active = true) => {
  const [count, setCount] = useState(0);
  const numTarget = parseFloat(String(target).replace(/[^0-9.]/g, "")) || 0;
  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }
    let start = 0;
    let frameId: number;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * numTarget * 10) / 10);
      if (progress < 1) frameId = requestAnimationFrame(step);
    };
    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [numTarget, duration, active]);
  return count;
};
