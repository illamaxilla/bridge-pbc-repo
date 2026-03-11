
## Plan: Fix build errors + replace private headers/footers + wire CTAs in Housing, Tourism, Transport

### Build errors to fix first

**Error 1 — Housing.tsx line 2824:** `setActiveTier(tier.id)` fails because `useState("all")` infers type `string`, but `tier.id` can be `1 | 2 | "all"`.
- Fix: change `useState("all")` → `useState<string | number>("all")` at line 2722.

**Error 2 — Tourism.tsx line 2818:** Duplicate `border` property in one style object (line 2815 `border: "none"` + line 2818 `border: activeStage === i ? ...`).
- Fix: remove line 2815 `border: "none"` — keep only the conditional border on line 2818.

---

### Replace private Header with `SiteHeaderMinimal` (3 files)

Each file has a private `Header` component spanning ~235 lines. Replace it entirely by:
1. Adding `import { useNavigate } from "react-router-dom"` and `import SiteHeader from "@/components/SiteHeaderMinimal"` and `import SiteFooter from "@/components/SiteFooter"` at the top of each file (line 1, after the existing React import).
2. Deleting the entire `const Header = () => { ... }` block in each file.
3. Replacing `<Header />` with `<SiteHeader />` in the main export component.

**Housing.tsx:** `Header` spans lines 1030–1316. Delete those lines.
**Tourism.tsx:** `Header` spans lines 1340–1628 (needs confirmed). Delete those lines.
**Transport.tsx:** `Header` spans lines 1077–1370 (needs confirmed). Delete those lines.

In Housing's main export: replace `<Header />` with `<SiteHeader />` and remove the `<div style={{ height: "72px" }} />` spacer (Transport has one, Housing's hero already has 112px top padding so no spacer needed; Transport's hero needs checking).

---

### Replace private Footer with `SiteFooter` (3 files)

Each file has a private `Footer` component spanning ~340 lines plus a `footerSectorIcons` array and `SectorGrid` component that are only used by that private footer. Replace all of this by:
1. Deleting `const footerSectorIcons = [...]`, `const SectorGrid = ...`, and `const Footer = () => { ... }` in each file.
2. Replacing `<Footer />` with `<SiteFooter />` in the main export.
3. Also removing the pre-footer separator divs that precede `<Footer />` in Housing (lines 7004–7007) — `SiteFooter` has its own internal separator.

**Housing.tsx:**
- `footerSectorIcons` + `SectorGrid` + `Footer`: lines 6320–6978
- Pre-footer separator: lines 7004–7007
- In main export: replace `<Footer />` with `<SiteFooter />`

**Tourism.tsx:**
- `footerSectorIcons` + `SectorGrid` + `Footer`: lines 1013–1339 (before Header) + 7178–7515
- In main export: replace `<Footer />` with `<SiteFooter />`

**Transport.tsx:**
- `footerSectorIcons` + `SectorGrid` + `Footer`: lines 6290–6956
- `CTAFooterSeparator`: lines 6280–6284 (keep or replace with SiteFooter internal separator)
- In main export: replace `<CTAFooterSeparator /><Footer />` with `<SiteFooter />`

---

### Wire CTA buttons with `useNavigate` (3 files)

All three FinalCTASections use plain `<button>` with no `onClick`. Add `const navigate = useNavigate()` inside each `FinalCTASection` and wire:

| File | Button label | Target |
|---|---|---|
| Housing.tsx | "Start a Conversation" | `navigate("/contact")` |
| Housing.tsx | "Explore the Full Analysis" | `navigate("/resources")` |
| Tourism.tsx | "Start a Conversation" | `navigate("/contact")` |
| Tourism.tsx | "Explore the Full Analysis" | `navigate("/resources")` |
| Transport.tsx | "Start a Conversation" | `navigate("/contact")` |
| Transport.tsx | "Explore the Full Analysis" | `navigate("/resources")` |

---

### Files changed

| File | Changes |
|---|---|
| `Housing.tsx` | Add imports (line 1); fix `useState` type (line 2722); delete private `Header` (~286 lines); delete private `Footer`+`footerSectorIcons`+`SectorGrid` (~660 lines); add `navigate` + `onClick` in `FinalCTASection`; update main export |
| `Tourism.tsx` | Add imports (line 1); fix duplicate `border` (line 2815); delete `footerSectorIcons`+`SectorGrid` (lines 1013–1339 before Header); delete private `Header` (~290 lines); delete private `Footer` (~340 lines); add `navigate` + `onClick` in `FinalCTASection`; update main export |
| `Transport.tsx` | Add imports (line 1); delete private `Header` (~295 lines); delete private `Footer`+`footerSectorIcons`+`SectorGrid`+`CTAFooterSeparator` (~680 lines); add `navigate` + `onClick` in `FinalCTASection`; update main export |

**Zero changes to section content, data, or section components.**
