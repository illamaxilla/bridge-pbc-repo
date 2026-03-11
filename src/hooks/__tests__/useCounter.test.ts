import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useCounter } from "../useCounter";

describe("useCounter", () => {
  it("returns 0 initially", () => {
    // Mock requestAnimationFrame so the callback never fires
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
});
