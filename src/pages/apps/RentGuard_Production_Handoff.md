# RentGuard Ghana — Production Handoff

**Platform:** Rent Enforcement & Intelligence Layer
**Version:** v4.0 · March 2026
**Legal Basis:** Act 220 (Rent Act 1963) · PNDCL 138 (Rent Control Law 1986)
**Client:** Ministry of Works and Housing — Rent Control Department
**Prepared by:** BRIDGE PBC

---

## 1. Deliverables

| File | Type | Lines | Description |
|------|------|-------|-------------|
| `RentGuard.jsx` | React JSX | 6,751 | Full platform prototype — 5 roles, 45 nav pages, all workflows |
| `RentGuard_Landing.jsx` | React JSX | 2,019 | Marketing landing page with login and demo request modals |
| `RentGuard_Production_Handoff.md` | Markdown | — | This document |

---

## 2. Platform App — RentGuard.jsx

### 2.1 Technical Inventory

| Metric | Value |
|--------|-------|
| Lines of code | 6,751 |
| React components | 98 |
| useState hooks | 130 |
| onClick handlers | 192 |
| Nav pages (total) | 45 across 5 roles |
| Mock cases | 15 (14 case types) |
| Mock officers | 12 (OFF-001–OFF-012) |
| Mock properties | 8 (P-001–P-008) |
| Mock regions | 10 Ghana regions |
| Audit log entries | 15 |
| Inspection history | 7 |

### 2.2 User Roles & Pages

| Role | Pages | Default Landing | Key Capabilities |
|------|-------|----------------|-----------------|
| National Admin | 16 | Dashboard | Regional intel, case mgmt, GRA export, policy log, settings |
| Case Manager | 8 | Case Queue | SLA tracking, notice generation, officer assignment |
| Taskforce Officer | 7 | Today's Shift | GPS inspection, QR scanner, offline sync, shift handover |
| Landlord | 10 | Compliance Overview | Rent cards, registration, tax summary, tenancy renewal |
| Tenant | 10 | My Tenancy | Complaints, card verification, USSD, legal aid, rights |

### 2.3 Features Built

- ✓ **Auth** — login screen, 5 demo accounts, role-based access, logout
- ✓ **Global search** — Cmd+K with arrow key navigation across cases, properties, officers, pages
- ✓ **CSV exports** — real Blob API downloads for cases, officers, regions, and GRA data
- ✓ **Account settings** — profile, password change, notification toggles, active sessions per role
- ✓ **Onboarding walkthrough** — 4–5 step modal per role on first login
- ✓ **Case notes** — drag-and-drop evidence file attachments
- ✓ **Confirm dialogs** — destructive action protection on deactivate, sign out, etc.
- ✓ **Skeleton loaders** — shimmer components ready for API integration
- ✓ **Mobile CSS** — `@media (max-width: 768px)` sidebar collapses to tab strip
- ✓ **Print CSS** — `@media print` hides nav for report printing
- ✓ **Accessibility** — `aria-label`, `aria-current`, `focus-visible` on all interactive elements
- ✓ **Toast notifications** — module-level global system, no context required
- ✓ **USSD simulator** — full `*714*1#` session flow with menu navigation
- ✓ **QR scanner** — animated viewfinder with violation detection demo
- ✓ **SLA tracker** — visual deadline status by case severity
- ✓ **GRA export** — CSV generation with TIN-matched landlord records
- ✓ **Enforcement flow** — 7-step walkthrough with legal citations
- ✓ **Risk register** — sortable, filterable risk-ranked property list
- ✓ **Officer performance** — monthly inspection and case generation metrics
- ✓ **Immutable audit log** — 15 entries with actor, timestamp, entity, detail

### 2.4 Demo Credentials

> All accounts use password: `demo2026`

| Role | Name | Email |
|------|------|-------|
| National Admin | Commissioner Ama Antwi | `a.antwi@rentcontrol.gov.gh` |
| Case Manager | Mgr. Kwame Acheampong | `k.acheampong@rentguard.gh` |
| Taskforce Officer | Ofc. Kofi Mensah | `k.mensah@rentguard.gh` |
| Landlord | Kwame Asante Boateng | `k.boateng@gmail.com` |
| Tenant | Abena Sarpong | `abena.sarpong@gmail.com` |

---

## 3. Landing Page — RentGuard_Landing.jsx

### 3.1 Section Inventory

| Section | Key Elements |
|---------|-------------|
| Navbar | Static (not sticky) · logo · 4 anchor links · "View Demo →" opens Login Modal |
| Hero | Wide two-column layout · 132px Bebas headline · animated counters · dashboard mockup · scrolling stats ticker (10 data points) |
| Problem | DM Serif italic headline · 4 stat cards · April 2026 mandate callout |
| Features | 3×2 card grid · equalized 30-word descriptions · 3 tags each · hover glow |
| Who It's For | 5-role vertical selector · animated detail panel · capability grid |
| Terminal | 15-line live system.log types out on scroll intersection |
| Mobile | 4-screen phone frame · floating badges · screen selector |
| USSD | `*714*1#` feature phone mockup · 4 menu options |
| Security | Numbered 01–06 list left · editorial detail panel right · active color shifts |
| Impact | Before→After KPI cards (all lime) · law citation strip with glow |
| Integrations | 3×2 grid · type badge · live status indicator · hover glow |
| CTA | Radial glow · 110px headline · 2 buttons → Demo Request Modal |
| Footer | 4-column · all links wired · `tel:` · external `gov.gh` · scroll-to-top logo |

### 3.2 Modal System

| Modal | Trigger | Purpose | Production Action |
|-------|---------|---------|------------------|
| Login Modal | "View Demo →" in navbar | Name + passcode auth gate | Replace `setTimeout` with real auth API → redirect to app |
| Demo Request Modal | "Explore Platform", "See All Features", "Request Demo" | Lead capture (6 fields) | Replace `setTimeout` with Resend / HubSpot / backend POST |

### 3.3 Navigation Anchors

| Link | Target |
|------|--------|
| Platform | `#platform` — Problem section |
| Features | `#features` — 6-feature card grid |
| Who It's For | `#who-its-for` — Role selector |
| Security | `#security` — Security & Legal |
| View Demo → | Opens Login Modal |
| Request a Demo → | Opens Demo Request Modal |

### 3.4 Footer Links

| Item | Destination |
|------|-------------|
| Act 220 | `ghanalii.org/legislation/act-220` (external) |
| PNDCL 138 | `ghanalii.org/legislation/pndcl-138` (external) |
| NCA | `nca.org.gh` (external) |
| DPC | `dpc.gov.gh` (external) |
| GRA | `gra.gov.gh` (external) |
| rentcontrol.mwh.gov.gh | External link |
| 0302-664-000 | `tel:+233302664000` — dialable on mobile |
| BRIDGE PBC | `bridgepbc.com` (external) |
| Privacy Policy / Terms | `#demo` placeholder — build these pages before launch |
| Security (footer) | `#security` section |

---

## 4. Backend Requirements

> The master build prompt (produced separately by BRIDGE) covers Sections 1–15 of the full production backend. Request this document before beginning development.

### 4.1 Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| API | Node.js + Express | ~50 REST endpoints. Master build prompt Sections 2–3 |
| Database | PostgreSQL + PostGIS | Schema in Section 2: triggers, enums, RLS, risk scoring |
| Auth | Supabase Auth or Auth0 | JWT + row-level security. Replaces demo login in `RentGuard.jsx` |
| Real-time | Supabase Realtime | Live activity feed, case status propagation |
| File storage | Cloudflare R2 or S3 | Evidence photos, PDFs, agreement documents |
| Background jobs | BullMQ + Redis | Risk scoring, GRA export, compliance reminders |
| Offline sync | WatermelonDB | Officer mobile — conflict-free sync on reconnect |
| Mobile app | React Native (Expo) | Android-first. Officer phone frame maps 1:1 to Expo screens |
| USSD | Africa's Talking | `*714*1#` handler. Master build prompt Section 6 |
| SMS | Africa's Talking | 10 event types. Templates in Section 9 |
| WhatsApp | Meta Cloud API | Complaint channel intake |
| CI/CD | GitHub Actions + Docker | Master build prompt Section 13 |

### 4.2 Integrations

| Integration | Purpose | Status |
|-------------|---------|--------|
| rentcontrol.mwh.gov.gh | Bidirectional tenancy/property sync | MOU required |
| NIA Ghana Card API | Identity verification on registration | Access agreement required |
| GRA Tax System | Monthly rental income SFTP export | MOU referenced in prototype |
| MTN / Telecel MoMo | Payment confirmation webhooks | Standard API — ready |
| Africa's Talking | USSD `*714*1#` + all SMS notifications | NCA shortcode registration required |
| Meta WhatsApp Cloud | Tenant complaint intake channel | Standard API — ready |
| Firebase FCM | Officer push notifications | Standard — ready |

### 4.3 Deployment Stack

```
Domain:       rentguard.gh (primary) · rentguard.mwh.gov.gh (preferred)
CDN:          Cloudflare
API:          Railway or Render · or AWS Lagos (af-south-1)
Database:     Supabase · or AWS RDS af-south-1
Storage:      Cloudflare R2
Auth:         Supabase Auth (JWT + RLS)
Mobile:       Expo EAS Build → Google Play (Android APK)
SMS/USSD:     Africa's Talking
Monitoring:   Sentry + Datadog or Grafana
CI/CD:        GitHub Actions → Docker → Railway/Render
```

---

## 5. Legal & Regulatory Checklist

- [ ] Data Protection Commission (DPC) Ghana registration — mandatory before any PII handling
- [ ] Privacy Policy compliant with Ghana Data Protection Act 2012
- [ ] Terms of Service — separate versions for landlords and tenants
- [ ] Ministry of Works and Housing formal MOU for platform operation authority
- [ ] NIA API access agreement for Ghana Card verification
- [ ] GRA data-sharing MOU — formalise what is referenced in the prototype
- [ ] Cybersecurity Authority Ghana compliance review
- [ ] Legal opinion on SHA-256 hashed records as court-admissible evidence
- [ ] Africa's Talking / NCA — USSD shortcode registration (`*714*1#` or assigned code)
- [ ] Legal review of NoticeGenerator output — must be approved by Rent Control legal team
- [ ] Evidence admissibility opinion for GPS-stamped inspection photos

---

## 6. Content Still Required

| Item | Owner | Priority |
|------|-------|----------|
| Verify Rent Control hotline (0302-664-000) | Rent Control Dept | Critical |
| WhatsApp complaint channel number | BRIDGE / partner | High |
| Official Rent Control + Ghana Government logos | Ministry | Critical |
| Complete MMDA list for all 16 regions | GSS / MLGDRD | High |
| SMS/WhatsApp message templates (10 event types) | Rent Control legal | High |
| Formal notice template — legal review | Rent Control legal | Critical |
| Confirm ghanalii.org statute URLs for footer links | BRIDGE | High |
| User manual per role (PDF) | BRIDGE comms | Medium |
| Rent card physical print template (QR spec, paper stock) | Printer / design | Medium |

---

## 7. KPIs for Go-Live Assessment

| KPI | Baseline | Target | Timeframe |
|-----|----------|--------|-----------|
| Tenancy registration rate | 38% | 70% | 12 months |
| Rent card adoption | 29% | 60% | 12 months |
| Avg advance collected | 9.2 months | ≤6 months | From enforcement |
| Case resolution — critical | — | <72 hours median | From launch |
| Officer route completion | — | >80% per shift | From launch |
| USSD complaint submissions | 0 | >200/month | 6 months |
| GRA data match rate | — | >85% with TIN | 12 months |
| Advance violation detection | 0 | Baseline established | 90 days |

---

## 8. Production Integration Guide

### 8.1 App — RentGuard.jsx

#### Authentication
```js
// CURRENT — demo account matching
const match = DEMO_ACCOUNTS.find(a => a.email === email && a.pass === pass);

// REPLACE WITH — Supabase Auth
const { data, error } = await supabase.auth.signInWithPassword({ email, password });
```

#### Data Loading
Replace all `CASES`, `OFFICERS`, `PROPERTIES`, `REGIONS` const arrays with `fetch` calls to your API endpoints. Drop in the `SkeletonTable` and `SkeletonCard` components already built for loading states.

#### CSV Export
Already uses real `Blob` API and `URL.createObjectURL`. For large datasets in production, replace with a server-side CSV generation endpoint and stream the response.

#### Onboarding
The `OnboardingModal` fires on first login via `showOnboarding: true` in `handleLogin`. In production, persist a `hasSeenOnboarding` flag in the user's profile so it only shows once.

---

### 8.2 Landing Page — RentGuard_Landing.jsx

#### Login Modal
```js
// CURRENT — fake verify
setTimeout(() => { setLoading(false); setError('Invalid passcode...'); }, 1000);

// REPLACE WITH — your auth API
const res = await fetch('/api/demo-auth', {
  method: 'POST',
  body: JSON.stringify({ name, passcode }),
});
if (res.ok) window.location.href = 'https://app.rentguard.gh';
else setError('Invalid passcode. Contact your BRIDGE representative.');
```

#### Demo Request Modal
```js
// CURRENT — fake submit
setTimeout(() => { setSub(false); setStep(2); }, 1400);

// REPLACE WITH — Resend, HubSpot, or your CRM
const res = await fetch('/api/demo-request', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(form),
});
if (res.ok) setStep(2);
```

#### "Explore the Platform" Button
```js
// CURRENT — opens Demo Request Modal via onClick={onDemo}

// REPLACE WITH — direct link to live app
<a href="https://app.rentguard.gh" className="btn-primary">
  Explore the Platform →
</a>
```

---

## 9. Design System Reference

### Colors
```
C.ink     #060D08   — page background
C.deep    #0A130C   — section background
C.forest  #0F1E13   — sidebar, dark fills
C.card    #111A14   — card background
C.surface #162019   — elevated surface
C.border  #1E3023   — default border
C.green   #0FA86A   — primary action, success
C.lime    #B8F73C   — accent, highlights
C.t1      #E8F2EB   — primary text
C.t2      #9BB8A3   — secondary text
C.t3      #4E7055   — muted text
C.red     #E5483A   — error, critical
C.amber   #E8900A   — warning, high severity
C.blue    #4B9EFF   — info, links
```

### Typography
```
Bebas Neue      — display headlines
Space Grotesk   — body text, UI
JetBrains Mono  — data, labels, codes
DM Serif Display — editorial pull quotes
```

### App CSS Classes
```
.rg-btn          — base button
.rg-btn-primary  — green filled button
.rg-btn-ghost    — outlined button
.rg-btn-danger   — red outlined button
.rg-input        — form input field
.rg-textarea     — form textarea
.rg-card         — content card
.rg-badge        — status badge
.rg-table        — data table
.rg-tabs / .rg-tab — tab strip
.rg-field        — form field wrapper with label
.fade-in         — opacity transition
.slide-up        — slide up animation
.pulse           — pulsing dot animation
```

---

## 10. File Architecture

```
RentGuard.jsx
├── Constants & Design Tokens (C, F, T)
├── Global CSS (GlobalCSS component)
├── Mock Data (CASES, OFFICERS, PROPERTIES, REGIONS, etc.)
├── Utility Hooks (useSort, useSearch, usePagination)
├── Utility Functions (caseTypeLabel, statusLabel, downloadCSV, etc.)
├── Shared Components (SectionHeader, Pagination, DateRangeFilter, etc.)
├── Toast System (ToastDisplay, setGlobalToast, useToast)
├── Skeleton System (Skeleton, SkeletonCard, SkeletonTable)
├── Onboarding (ONBOARDING_STEPS, OnboardingModal)
├── Admin Components (AdminDashboard → AdminAudit, SettingsPage)
├── Manager Components (BulkCaseManager, CaseDetail, SLATracker, etc.)
├── Officer Components (OfficerMobile, QRScanner, OfficerMap, etc.)
├── Landlord Components (LandlordPortal, RentCardIssuanceForm, etc.)
├── Tenant Components (TenantPortal, ComplaintTracker, USSDSimulator, etc.)
├── Account Settings (AccountSettings, ConfirmDialog)
├── Global Search (GlobalSearchEnhanced)
├── Login Screen (LoginScreen)
└── Root Component (RentGuard — holds all state, routing, auth gate)

RentGuard_Landing.jsx
├── Global Styles & Animations
├── Utility Hooks (useCounter, useVisible)
├── Navbar
├── Hero (with internal stats ticker)
├── ProblemSection
├── FeaturesSection
├── WhoSection
├── TerminalSection
├── MobileSection (with PhoneMockup)
├── USSDSection
├── SecuritySection
├── ImpactSection
├── IntegrationStrip
├── CTASection
├── Footer (with FooterLink)
├── LoginModal
├── DemoModal
└── Root (RentGuardLanding — holds showModal, showLogin state)
```

---

*BRIDGE PBC · RentGuard Ghana · v4.0 · March 2026*
*This document is confidential. Do not distribute without written consent from BRIDGE PBC.*
