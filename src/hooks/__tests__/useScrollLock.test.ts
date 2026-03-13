import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useScrollLock } from "../useScrollLock";

// We need to reset the module-level lockCount between test files.
// Since lockCount is module-scoped, we track and restore overflow manually.

describe("useScrollLock", () => {
  beforeEach(() => {
    document.body.style.overflow = "";
  });

  it("sets body overflow to hidden when locked is true", () => {
    renderHook(() => useScrollLock(true));
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("does not modify body overflow when locked is false", () => {
    document.body.style.overflow = "";
    renderHook(() => useScrollLock(false));
    expect(document.body.style.overflow).toBe("");
  });

  it("restores body overflow when unmounted", () => {
    const { unmount } = renderHook(() => useScrollLock(true));
    expect(document.body.style.overflow).toBe("hidden");

    unmount();
    expect(document.body.style.overflow).toBe("");
  });

  it("handles ref counting with multiple simultaneous locks", () => {
    const hook1 = renderHook(() => useScrollLock(true));
    const hook2 = renderHook(() => useScrollLock(true));

    expect(document.body.style.overflow).toBe("hidden");

    // Unmounting one should keep the lock since the other is still active
    hook1.unmount();
    expect(document.body.style.overflow).toBe("hidden");

    // Unmounting the second should release the lock
    hook2.unmount();
    expect(document.body.style.overflow).toBe("");
  });

  it("restores overflow when locked changes from true to false", () => {
    const { rerender } = renderHook(({ locked }) => useScrollLock(locked), {
      initialProps: { locked: true },
    });

    expect(document.body.style.overflow).toBe("hidden");

    rerender({ locked: false });
    expect(document.body.style.overflow).toBe("");
  });
});
