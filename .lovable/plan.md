
## Fix: "Unlock All" button — open auth modal, redirect back to /resources on sign-in

### The problem
`BridgeTab` (line 975) renders the "Unlock All" `<button>` at line 1149 with no `onClick`. It does nothing. The `BRIDGEAuthModal` is not imported in `Resources.tsx` at all.

### The fix

**3 changes to `src/pages/Resources.tsx`:**

**1. Import `BRIDGEAuthModal`** (line 1, add import):
```tsx
import { BRIDGEAuthModal } from "@/components/AuthModal";
```

**2. Add `showAuth` state + modal to `ResourcesPage`** (lines 2703–2730):
- Add `const [showAuth, setShowAuth] = useState(false);`
- Render `<BRIDGEAuthModal>` inside the return, with:
  - `isOpen={showAuth}`
  - `onClose={() => setShowAuth(false)}`
  - `defaultTab="signin"`
  - `onSignInSuccess` → set `bridge_authed` in sessionStorage, close modal, navigate to `/resources` (stay on page, already there — the page will now show locked content state for the authenticated user)

**3. Pass `onUnlock` callback down to `BridgeTab`** and wire it to the button:
- `ResourcesPage` renders `<BridgeTab ... onUnlock={() => setShowAuth(true)} />`
- `BridgeTab` signature gets `onUnlock` prop
- The `<button>` at line 1149 gets `onClick={onUnlock}`

### Behavior
- User taps "Unlock All" → auth modal opens (signin tab)
- User signs in → `bridge_authed` is set in sessionStorage, modal closes, user stays on `/resources`
- On next visit to `/intelligence/*`, they're already authenticated

### Files changed
- `src/pages/Resources.tsx` only — 3 targeted edits
