
## Two fixes in two files

### Fix 1 — Footer logo links to home (SiteFooter.tsx, line 206)

The `BridgeLogoWhite` component uses a plain HTML `<a href="/">` with no `onClick` SPA handler. On mobile this causes a full-page reload instead of client-side navigation.

**Change:** Convert `SiteFooter.tsx` to use `useNavigate` from react-router-dom. Pass a `navigate` prop (or use hook directly in the component) so the logo `<a>` gets `onClick={(e) => { e.preventDefault(); navigate("/"); }}`.

Note: Both `SiteHeader.tsx` and `SiteHeaderMinimal.tsx` already handle this correctly — the footer is the missing case.

### Fix 2 — Mobile footer nav alignment (SiteFooter.tsx, lines 312–341)

The mobile Row 1 (logo + links) uses `alignItems: "flex-end"` which is correct for bottom-aligning. The screenshot confirms the desired look is already close — the links just need to stay reliably on one line within the container.

**Changes to mobile Row 1 container (lines 312–341):**
- Keep `alignItems: "flex-end"` (already there — aligns link text bottoms to logo bottom)
- Set `gap: "8px"` between the 3 link items (tighter than current `12px`)
- Set `fontSize: "11px"` and `letterSpacing: "0px"` on each link (already 11px — confirm no overflow)
- Add `overflow: "hidden"` on the nav links wrapper and ensure `whiteSpace: "nowrap"` + `flexShrink: 0` on each link to prevent wrapping
- Remove `marginLeft: "auto"` — use `justifyContent: "flex-end"` on the links row which already exists

The end result: Logo is flush left, three links ("Company / Services / Insight") sit bottom-aligned to the logo height, all on one line, within the 20px-padded container.

## Files changed
- `src/components/SiteFooter.tsx` — both fixes (logo SPA nav + mobile link row tightening)
