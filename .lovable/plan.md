
## Surgical plan: Wire FinalCTASection buttons in 9 sector pages

### Problem confirmed
The `FinalCTASection` component in 9 sector pages contains plain `<button>` elements with **no `onClick`, no `navigate`, no `href`** — they do nothing when clicked.

**Affected files:** Energy, Agriculture, Technology, Health, Financial, Manufacturing, Sports, Education, Infrastructure  
**Not affected (already working):** Transport, Housing, Tourism (already use `href="/contact"`)

### Buttons and their targets
- "Start a Conversation" / "Request Full Access" → `/login`
- "Explore the Full Analysis" / "Download Sector Brief" → `/login`

Both buttons go to `/login`. Once logged in, the user lands on `/intelligence/dashboard` (already wired in `ProtectedRoute`).

### The fix — per file

#### Files where `useNavigate` is already imported (6 files):
Energy, Agriculture, Health, Education, Infrastructure, Manufacturing

Just add `onClick={() => navigate("/login")}` to each button inside `FinalCTASection`. The `FinalCTASection` component needs `const navigate = useNavigate()` added at the top of that function.

#### Files where `useNavigate` is NOT yet imported (3 files):
Technology, Financial, Sports

1. Add `useNavigate` to the existing react-router-dom import on line 1 (e.g. `import { useNavigate } from "react-router-dom"` as a new line 2, shifting nothing else)
2. Add `const navigate = useNavigate()` inside `FinalCTASection`
3. Add `onClick={() => navigate("/login")}` to each button

### Edit table (all surgical — only `FinalCTASection` functions touched)

| File | Lines changed | Action |
|---|---|---|
| `Energy.tsx` | Line 1 → add import; lines 5836, 5902, 5936 | Add navigate import + hook + onClick |
| `Agriculture.tsx` | Lines 7029, 7103, 7141 | Add hook + onClick (import already present) |
| `Technology.tsx` | Line 1 → add import; lines 6611, 6673, 6707 | Add import + hook + onClick |
| `Health.tsx` | Lines 6122, 6182, 6216 | Add hook + onClick |
| `Financial.tsx` | Line 1 → add import; lines 6567, 6635, 6670 | Add import + hook + onClick |
| `Manufacturing.tsx` | Lines 6316, 6376, 6410 | Add hook + onClick |
| `Sports.tsx` | Line 1 → add import; lines ~6395, 6471, 6506 | Add import + hook + onClick |
| `Education.tsx` | Lines 6403, 6472, 6506 | Add hook + onClick |
| `Infrastructure.tsx` | Lines 6402, 6469, 6503 | Add hook + onClick |

**Total: 9 files, ~3 line changes each. Zero layout changes, zero styling changes, nothing outside `FinalCTASection` touched.**
