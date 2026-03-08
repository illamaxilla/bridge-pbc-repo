
## What we're building

A **route guard** that wraps all `/intelligence/*` routes. If the user is not logged in, they see the `BRIDGEAuthModal` instead of the dashboard. Once they sign in (mock success), they are let through and stay authenticated for the session.

Since there is no Supabase connected, the auth remains **mock-based** — the sign-in form already fakes a 1.5s success. We'll persist the "logged in" flag in `sessionStorage` so it survives navigating around but resets on tab close (appropriate for a demo/beta product).

---

## Approach

### 1. Create `src/components/ProtectedRoute.tsx`
A wrapper component that:
- Reads `sessionStorage.getItem("bridge_authed")` on mount
- If `"1"` → renders `{children}` (pass-through)
- If not → renders the `BRIDGEAuthModal` overlaid on a dark locked screen (or just fullscreen modal)
- When `BRIDGEAuthModal` calls `onSuccess` (sign-in tab only), sets `sessionStorage.setItem("bridge_authed", "1")` and re-renders the children

The `BRIDGEAuthModal` already has an `onClose` prop. We need `onSuccess` propagation — currently `SignInForm` calls `onSuccess` internally which sets `success` state in the modal. We'll intercept this by passing a custom `onAuthSuccess` callback.

**Cleanest approach without touching AuthModal internals:** Instead, modify `BRIDGEAuthModal` to accept an optional `onSignInSuccess?: () => void` prop that fires when sign-in completes (before showing the success screen). The `SignInForm` already calls `onSuccess` on the modal — we just need to thread the callback up one level.

### 2. Modify `src/components/AuthModal.tsx`
- Add `onSignInSuccess?: () => void` to `BRIDGEAuthModalProps`
- Pass it down to `SignInForm` so that when `handleSubmit` succeeds (currently `setLoading(false); onSuccess && onSuccess()`), it also calls `onSignInSuccess()`

### 3. Wrap intelligence routes in `src/App.tsx`
Replace the current:
```tsx
<Route path="/intelligence/*" element={<Intelligence />}>
```
with:
```tsx
<Route path="/intelligence/*" element={
  <ProtectedRoute>
    <Intelligence />
  </ProtectedRoute>
}>
```

### 4. `ProtectedRoute` behaviour
```
sessionStorage has "bridge_authed" = "1"
  → render children normally

sessionStorage missing
  → render a fullscreen dark backdrop (matching the Intelligence shell bg #0F1A12)
    with BRIDGEAuthModal open={true}
    onClose → navigate("/") (can't close without logging in)
    onSignInSuccess → set sessionStorage flag + setState to allow through
```

The modal is already `position: fixed, zIndex: 9998` so it will overlay anything. The backdrop underneath just needs to be a non-blank screen — we'll render it on top of the Intelligence shell (which loads but is hidden behind the modal).

Actually simpler: just render the Intelligence component and overlay the modal on top of it. The modal backdrop already covers everything with `position: fixed`. When `onSignInSuccess` fires, we hide the modal and the dashboard is revealed.

This means **no flicker, no redirect, no layout jump** — the dashboard loads silently underneath.

---

## Files

| File | Change |
|------|--------|
| `src/components/ProtectedRoute.tsx` | **New** — reads sessionStorage, renders children + conditionally shows modal overlay |
| `src/components/AuthModal.tsx` | **Edit** — add `onSignInSuccess?` prop to `BRIDGEAuthModalProps`, thread it to `SignInForm` |
| `src/App.tsx` | **Edit** — wrap all `<Route path="/intelligence/*">` with `<ProtectedRoute>` |

---

## Detail

### `ProtectedRoute.tsx`
```tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BRIDGEAuthModal } from "@/components/AuthModal";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem("bridge_authed") === "1"
  );

  return (
    <>
      {children}
      <BRIDGEAuthModal
        isOpen={!authed}
        onClose={() => navigate("/")}
        defaultTab="signin"
        onSignInSuccess={() => {
          sessionStorage.setItem("bridge_authed", "1");
          setAuthed(true);
        }}
      />
    </>
  );
}
```

### `AuthModal.tsx` changes
1. Add `onSignInSuccess?: () => void` to `BRIDGEAuthModalProps`
2. Pass it through to `SignInForm` as `onSuccess` wrapper:
   ```tsx
   <SignInForm
     onSuccess={() => {
       onSignInSuccess?.();   // ← notify parent
       setSuccess("signin");  // ← existing behaviour
     }}
     onForgot={() => {}}
   />
   ```

### `App.tsx` changes
```tsx
import { ProtectedRoute } from "./components/ProtectedRoute";

// wrap the intelligence route:
<Route path="/intelligence/*" element={
  <ProtectedRoute>
    <Intelligence />
  </ProtectedRoute>
}>
  ...child routes...
</Route>
```

---

## Result

- Visiting `/intelligence/dashboard` while logged out → modal slides up, dashboard blurred behind it
- Closing modal → redirected to `/`
- Signing in → modal dismisses, dashboard is live
- Navigating away and back in the same tab → still authed (sessionStorage persists)
- New tab / fresh visit → must log in again
