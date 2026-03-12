import { describe, it, expect, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useScrollLock } from "../useScrollLock";

describe("useScrollLock", () => {
  beforeEach(() => {
    document.body.style.overflow = "";
  });

  it("sets body overflow to hidden when locked", () => {
    renderHook(() => useScrollLock(true));
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("does not set overflow when not locked", () => {
    renderHook(() => useScrollLock(false));
    expect(document.body.style.overflow).toBe("");
  });

  it("restores overflow when unmounted", () => {
    const { unmount } = renderHook(() => useScrollLock(true));
    expect(document.body.style.overflow).toBe("hidden");
    unmount();
    expect(document.body.style.overflow).toBe("");
  });

  it("supports reference counting with multiple locks", () => {
    const hook1 = renderHook(() => useScrollLock(true));
    const hook2 = renderHook(() => useScrollLock(true));
    expect(document.body.style.overflow).toBe("hidden");

    hook1.unmount();
    // Still locked because hook2 is active
    expect(document.body.style.overflow).toBe("hidden");

    hook2.unmount();
    // Now unlocked
    expect(document.body.style.overflow).toBe("");
  });
});
