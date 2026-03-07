
## Fix 3 TypeScript Errors in Methodology.tsx

### What's broken

**Error 1 — `colors.line` does not exist (line 1067)**
The `colors` object at line 560 only defines 3 properties:
```ts
const colors = { primary: "#1B4D3E", accent: "#B8D935", white: "#FFFFFF" };
```
But line 1067 references `colors.line` (used for a border color). The hex value used elsewhere in this file for that purpose is `#DEDEDE`.

Fix: Add `line: "#DEDEDE"` to the `colors` object.

**Errors 2 & 3 — `React` not imported (lines 1951, 2017)**
The file uses `React.Fragment` as a JSX element, but only named exports are imported:
```ts
import { useState, useEffect, useRef } from "react";
```
`React` itself is never imported, so `React.Fragment` is unresolved.

Fix: Change the import to also bring in `React`:
```ts
import React, { useState, useEffect, useRef } from "react";
```

### Files to edit

| File | Line | Change |
|---|---|---|
| `src/pages/Methodology.tsx` | 1 | Add `React` default import |
| `src/pages/Methodology.tsx` | 560 | Add `line: "#DEDEDE"` to `colors` |
