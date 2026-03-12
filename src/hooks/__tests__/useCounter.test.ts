import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCounter } from "../useCounter";

describe("useCounter", () => {
  it("returns 0 initially", () => {
    const rafSpy = vi
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation(() => 0);

    const { result } = renderHook(() => useCounter(100, 1200, true));
    expect(result.current).toBe(0);

    rafSpy.mockRestore();
  });

  it("starts animation when active", () => {
    const rafSpy = vi
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation(() => 1);

    renderHook(() => useCounter(100, 1200, true));
    expect(rafSpy).toHaveBeenCalled();

    rafSpy.mockRestore();
  });

  it("returns 0 when active is false", () => {
    const rafSpy = vi
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation(() => 0);

    const { result } = renderHook(() => useCounter(100, 1200, false));
    expect(result.current).toBe(0);

    rafSpy.mockRestore();
  });

  it("reaches the target value when animation completes", () => {
    let rafCallback: ((ts: number) => void) | null = null;
    const rafSpy = vi
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation((cb) => {
        rafCallback = cb;
        return 1;
      });

    const { result } = renderHook(() => useCounter(50, 1000, true));

    // Simulate the first frame (start = 0, so progress = 0)
    act(() => { rafCallback?.(0); });

    // Simulate the final frame (progress = 1)
    act(() => { rafCallback?.(1000); });

    expect(result.current).toBe(50);

    rafSpy.mockRestore();
  });

  it("handles string target values with non-numeric characters", () => {
    const rafSpy = vi
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation(() => 0);

    const { result } = renderHook(() => useCounter("$2.5M", 1200, true));
    // Initially 0; the parsed target should be 2.5
    expect(result.current).toBe(0);

    rafSpy.mockRestore();
  });

  it("cancels animation frame on unmount", () => {
    const cancelSpy = vi.spyOn(window, "cancelAnimationFrame");
    const rafSpy = vi
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation(() => 42);

    const { unmount } = renderHook(() => useCounter(100, 1200, true));
    unmount();

    expect(cancelSpy).toHaveBeenCalledWith(42);

    rafSpy.mockRestore();
    cancelSpy.mockRestore();
  });

  it("resets to 0 when active changes from true to false", () => {
    const rafSpy = vi
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation(() => 0);

    const { result, rerender } = renderHook(
      ({ active }) => useCounter(100, 1200, active),
      { initialProps: { active: true } }
    );

    rerender({ active: false });
    expect(result.current).toBe(0);

    rafSpy.mockRestore();
  });
});
