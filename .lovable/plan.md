
## Create Auth Placeholder Files

### What to build

Three placeholder files, all UI-only (no backend wiring yet), ready for the user to paste their own code into via the Code Editor.

### Files to create

| File | Purpose |
|---|---|
| `src/pages/Login.tsx` | Standalone `/login` page — full page layout |
| `src/components/AuthModal.tsx` | Modal/popup component — toggled from the navbar |

### How each placeholder will be structured

**`src/pages/Login.tsx`**
- Exports a default `Login` component
- Minimal shell: BRIDGE-branded wrapper div, a `{/* PASTE YOUR SIGN-IN / REGISTER CODE HERE */}` comment block, and a back-to-home link
- Registered as `/login` route in `App.tsx`

**`src/components/AuthModal.tsx`**
- Exports a default `AuthModal` component accepting `open` and `onClose` props
- Uses the existing `@radix-ui/react-dialog` (already installed) for the modal shell
- Inner body is a comment block: `{/* PASTE YOUR SIGN-IN / REGISTER CODE HERE */}`
- No wiring to the navbar yet — that comes after you paste your code in

### Routes

Add to `App.tsx`:
```
/login  →  <Login />
```

`AuthModal` is a component, not a route — no additional route needed.

### Files to edit

| File | Action |
|---|---|
| `src/pages/Login.tsx` | Create |
| `src/components/AuthModal.tsx` | Create |
| `src/App.tsx` | Add `/login` route + `Login` import |
