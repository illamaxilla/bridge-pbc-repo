import { useRef, useState, useCallback } from 'react';

/**
 * Hook for tracking and controlling horizontal scroll position in carousels.
 * Calculates the active index based on child element width and gap.
 */
export function useScrollIndex(count: number) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || !el.children.length) return;
    const child =
      (el.children[0] as HTMLElement)?.children?.[0] as HTMLElement ||
      el.children[0] as HTMLElement;
    if (!child) return;
    const childWidth =
      child.offsetWidth +
      parseInt(getComputedStyle(el.children[0] as HTMLElement || el).gap || '0', 10);
    const idx = Math.round(el.scrollLeft / (childWidth || 1));
    setActiveIndex(Math.min(Math.max(idx, 0), count - 1));
  }, [count]);

  const scrollTo = useCallback((idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const child =
      (el.children[0] as HTMLElement)?.children?.[0] as HTMLElement ||
      el.children[0] as HTMLElement;
    if (!child) return;
    const gap = parseInt(getComputedStyle(el.children[0] as HTMLElement || el).gap || '0', 10);
    const childWidth = child.offsetWidth + gap;
    el.scrollTo({ left: idx * childWidth, behavior: 'smooth' });
  }, []);

  return { scrollRef, activeIndex, onScroll, scrollTo };
}
