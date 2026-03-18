import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ═══════════════════════════════════════════════════════════════
// BRIDGE Apps — Landing Page v3
// Full-screen, no-scroll, 3×3 icon grid
// ═══════════════════════════════════════════════════════════════

const C = {
  primary: '#1B4D3E',
  accent:  '#B8D935',
  bg:      '#F3F5F2',
  white:   '#FFFFFF',
  dark:    '#191919',
  line:    '#DEDEDE',
  body:    '#666666',
  label:   '#999999',
};

const NAV_ITEMS = [
  { label: "Home",               to: "/" },
  { label: "About",              to: "/about" },
  { label: "Methodology",        to: "/methodology" },
  { label: "Services",           to: "/services" },
  { label: "Sectors",            to: "/sectors" },
  { label: "Insight",            to: "/insights" },
  { label: "BRIDGE Intelligence", to: "/intelligence/dashboard" },
  { label: "Community",          to: "/community" },
  { label: "Resources",          to: "/resources" },
  { label: "Contact",            to: "/contact" },
  { label: "Policy Updates",     to: "/policy" },
];

// ── Menu Overlay ──────────────────────────────────────────────
const MenuOverlay = ({ open, onClose, navigate }) => {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: C.dark, color: C.white,
      display: 'flex', flexDirection: 'column',
      fontFamily: 'Inter, sans-serif',
      animation: 'menuFadeIn 0.2s ease',
    }}>
      <style>{`@keyframes menuFadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '18px 24px', borderBottom: '1px solid #333',
      }}>
        <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.3px' }}>
          <span>BRIDGE</span>{' '}<span style={{ color: C.accent }}>Apps</span>
        </span>
        <div onClick={onClose} style={{
          width: 32, height: 32, borderRadius: '50%', border: '1px solid #444',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18"/><path d="M6 6l12 12"/>
          </svg>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 0' }}>
        {NAV_ITEMS.map((item) => (
          <div
            key={item.to}
            onClick={() => { navigate(item.to); onClose(); }}
            style={{
              padding: '16px 28px', cursor: 'pointer',
              fontSize: 18, fontWeight: 400, color: 'rgba(255,255,255,0.85)',
              borderBottom: '1px solid #222', transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#252525'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            {item.label}
          </div>
        ))}
      </div>
      <div style={{ padding: '16px 28px', borderTop: '1px solid #333', fontSize: 11, color: '#666' }}>
        {'\u00A9'} 2026 BRIDGE PBC
      </div>
    </div>
  );
};

// ── App Data (9 apps, 3×3) ────────────────────────────────────
const apps = [
  // Row 1 — Live
  {
    id: '01',
    name: 'Impact Score\u2122 Assessor',
    tagline: 'Score your venture against BRIDGE\u2019s proprietary evaluation framework.',
    status: 'Live',
    icon: 'target',
    route: 'countdown',
  },
  {
    id: '02',
    name: 'RentGuard Ghana',
    tagline: 'Rent enforcement and intelligence platform for tenants, landlords, and regulators.',
    status: 'Live',
    icon: 'shield',
    route: 'external',
  },
  {
    id: '03',
    name: 'BRIDGE Connect',
    tagline: 'Matching Ghana\u2019s skilled workforce to verified local and global opportunities.',
    status: 'Live',
    icon: 'link',
    route: 'countdown',
  },
  // Row 2 — Coming Q3
  {
    id: '04',
    name: 'Market Opportunity Finder',
    tagline: 'Explore 174+ identified opportunities by sector, region, and capital range.',
    status: 'Coming Q3 2026',
    icon: 'search',
  },
  {
    id: '05',
    name: 'Investment Readiness Diagnostic',
    tagline: 'Five-dimension health check for founders seeking growth capital.',
    status: 'Coming Q3 2026',
    icon: 'bar-chart',
  },
  {
    id: '06',
    name: 'Diaspora Skills Matcher',
    tagline: 'Map your professional profile to Ghana contribution pathways.',
    status: 'Coming Q3 2026',
    icon: 'users',
  },
  // Row 3 — Coming Q4
  {
    id: '07',
    name: 'Sector Pulse Tracker',
    tagline: 'Community-sourced sentiment dashboard across all 12 sectors.',
    status: 'Coming Q4 2026',
    icon: 'activity',
  },
  {
    id: '08',
    name: 'P&P Community Survey',
    tagline: 'Self-administered Peace & Prosperity diagnostic for communities.',
    status: 'Coming Q4 2026',
    icon: 'clipboard',
  },
  {
    id: '09',
    name: 'Ghana Policy Tracker',
    tagline: 'Real-time policy intelligence and regulatory change alerts across 12 sectors.',
    status: 'Coming Q4 2026',
    icon: 'scroll',
  },
];

// ── SVG Icon Components ───────────────────────────────────────
const I = {
  target: (c) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  shield: (c) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  link: (c) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 7h3a5 5 0 0 1 0 10h-3m-6 0H6A5 5 0 0 1 6 7h3"/><path d="M8 12h8"/>
    </svg>
  ),
  search: (c) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  ),
  'bar-chart': (c) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/>
    </svg>
  ),
  users: (c) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  activity: (c) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
  clipboard: (c) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
      <path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>
    </svg>
  ),
  scroll: (c) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/>
    </svg>
  ),
};

// ── Arrow Icon ────────────────────────────────────────────────
const Arrow = ({ color = C.label }) => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7"/><path d="M7 7h10v10"/>
  </svg>
);

// ── BRIDGE Logo (full SVG wordmark) ───────────────────────────
const Logo = () => (
  <svg height="28" viewBox="0 0 3258.5 932.3" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
    {/* Border box icon */}
    <rect x="40" y="40" width="843.9" height="852.3" rx="36.6" ry="36.6" fill="none" stroke={C.primary} strokeWidth="80" strokeMiterlimit="10"/>
    {/* Bridge icon shapes */}
    <polygon fill="#b8d935" stroke={C.primary} strokeMiterlimit="10" points="722.6 322.1 462.3 452.8 202 322.8 461.3 192.5 722.6 322.1"/>
    <path fill="#74914a" d="M197.9,426.8c3.9-.5,7-.8,10.7,1.4l252.5,125.7c84.5-40,167.7-83.8,251.9-124.8,33.1-11.5,50.1,34.2,18.5,49.1l-259.2,129.1c-10.2,3.7-14.1,2.6-23.9-1.3l-264.2-133c-17-14.4-8-43.2,13.6-46.1h.1v-.1Z"/>
    <path fill="#b8d935" d="M195.3,558c3.7-.6,7.4-.4,11.1-.2,86.1,40.5,170.4,85.1,255.9,126.8l252.9-126c29.5-7.2,45.4,28.7,22.3,46.5l-270.4,134.4-8.6.3c-91.6-42.2-181.1-89.9-271.7-134.4-18.7-12.1-13.3-43.6,8.5-47.4h0Z"/>
    {/* B letterform */}
    <path fill={C.primary} stroke="#000" strokeWidth=".5" strokeMiterlimit="10" d="M1431.7,224.5h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5h.1v.1Z"/>
    <path fill={C.primary} stroke="#000" strokeWidth=".5" strokeMiterlimit="10" d="M1488.1,578.7v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"/>
    <rect fill="#b8d935" x="1427.4" y="17.4" width="205.2" height="145"/>
    <rect fill={C.primary} x="1427.5" y="221.8" width="205.2" height="693.2" rx="9.6" ry="9.6"/>
    {/* R letterform */}
    <path fill={C.primary} d="M1853.1,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.6,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1h0v.1Z"/>
    {/* G letterform */}
    <path fill={C.primary} d="M2757.3,19.1h491.3c5.4,0,9.8,4.4,9.8,9.8v218.7c0,5.4-4.4,9.8-9.8,9.8h-507.4c-57,0-108.5,23-145.9,60.4-37.3,37.2-60.5,88.8-60.5,145.7,0,113.7,92.4,206,206.3,206h12.9c2.9,0,5.1,2.3,5.1,5.1v236.7c0,1.1-.9,1.9-1.9,1.9h0c-242.2,0-438.5-196-438.5-437.8v-18.5c0-241.8,196.3-437.8,438.5-437.8h.1Z"/>
    <rect fill={C.primary} x="2812.8" y="339.5" width="216.8" height="572.6" rx="9.6" ry="9.6"/>
    <rect fill="#b8d935" x="3083.4" y="339.5" width="175.1" height="257.7"/>
    <rect fill="#b8d935" x="3083.4" y="654.4" width="175.1" height="257.7"/>
  </svg>
);

// ═══════════════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════════════
export default function BRIDGEAppsLanding() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Countdown: 60 days from a fixed launch date
  const LAUNCH = new Date('2026-05-17T00:00:00');
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const diff = Math.max(0, LAUNCH - now);
      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const pad = isMobile ? 16 : 80;

  // ── Countdown Screen ─────────────────────────────────────
  if (selectedApp) {
    const pad2 = (n) => String(n).padStart(2, '0');
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: C.primary,
        fontFamily: 'Inter, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '24px' : '80px',
        boxSizing: 'border-box',
        position: 'relative',
      }}>
        {/* Back button */}
        <button
          onClick={() => setSelectedApp(null)}
          style={{
            position: 'absolute',
            top: isMobile ? '20px' : '40px',
            left: isMobile ? '20px' : '80px',
            background: 'none',
            border: `1px solid rgba(255,255,255,0.2)`,
            borderRadius: '50px',
            padding: '8px 20px',
            color: 'rgba(255,255,255,0.7)',
            fontSize: '12px',
            fontWeight: 500,
            fontFamily: 'Inter, sans-serif',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={(e) => { e.target.style.borderColor = C.accent; e.target.style.color = C.accent; }}
          onMouseLeave={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.2)'; e.target.style.color = 'rgba(255,255,255,0.7)'; }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
          </svg>
          All Apps
        </button>

        {/* Icon */}
        <div style={{
          width: isMobile ? '56px' : '72px',
          height: isMobile ? '56px' : '72px',
          borderRadius: '16px',
          backgroundColor: 'rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: isMobile ? '16px' : '24px',
        }}>
          {I[selectedApp.icon]('rgba(255,255,255,0.9)')}
        </div>

        {/* App name */}
        <h2 style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: isMobile ? '24px' : '36px',
          fontWeight: 700,
          color: '#FFFFFF',
          margin: '0 0 6px',
          textAlign: 'center',
          letterSpacing: '-0.5px',
        }}>
          {selectedApp.name}
        </h2>

        {/* Tagline */}
        <p style={{
          fontSize: isMobile ? '12px' : '14px',
          color: 'rgba(255,255,255,0.5)',
          textAlign: 'center',
          maxWidth: '420px',
          margin: '0 0 40px',
          lineHeight: 1.5,
        }}>
          {selectedApp.tagline}
        </p>

        {/* "Launching in" label */}
        <div style={{
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: C.accent,
          marginBottom: isMobile ? '16px' : '20px',
        }}>
          Launching In
        </div>

        {/* Countdown boxes */}
        <div style={{
          display: 'flex',
          gap: isMobile ? '12px' : '20px',
          marginBottom: '48px',
        }}>
          {[
            { val: timeLeft.d, label: 'Days' },
            { val: timeLeft.h, label: 'Hours' },
            { val: timeLeft.m, label: 'Minutes' },
            { val: timeLeft.s, label: 'Seconds' },
          ].map((unit, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                width: isMobile ? '60px' : '88px',
                height: isMobile ? '60px' : '88px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '8px',
              }}>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: isMobile ? '24px' : '36px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  letterSpacing: '-1px',
                }}>
                  {pad2(unit.val)}
                </span>
              </div>
              <span style={{
                fontSize: isMobile ? '8px' : '10px',
                fontWeight: 600,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)',
              }}>
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        {/* Notify CTA */}
        <button style={{
          background: C.accent,
          border: 'none',
          borderRadius: '50px',
          padding: isMobile ? '12px 28px' : '14px 36px',
          fontSize: isMobile ? '12px' : '14px',
          fontWeight: 600,
          fontFamily: 'Inter, sans-serif',
          color: C.primary,
          cursor: 'pointer',
          letterSpacing: '0.3px',
        }}>
          Notify Me at Launch
        </button>

        {/* Footer */}
        <div style={{
          position: 'absolute',
          bottom: isMobile ? '16px' : '40px',
          fontSize: '9px',
          color: 'rgba(255,255,255,0.2)',
          letterSpacing: '0.3px',
        }}>
          {'\u00A9'} 2026 BRIDGE PBC
        </div>
      </div>
    );
  }


  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: C.bg,
      fontFamily: 'Inter, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      padding: `${pad}px`,
      boxSizing: 'border-box',
    }}>

      {/* ── Top Bar ──────────────────────────────────── */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: isMobile ? 10 : 16,
        flexShrink: 0,
      }}>
        <Logo />
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {!isMobile && (
            <span style={{
              fontSize: '9px',
              fontWeight: 600,
              color: C.label,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
            }}>
              BRIDGE Applications{'\u2122'}
            </span>
          )}
          <div
            onClick={() => setMenuOpen(true)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              border: `1px solid ${C.line}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2" strokeLinecap="round">
              <path d="M3 12h18"/><path d="M3 6h18"/><path d="M3 18h18"/>
            </svg>
          </div>
        </div>
      </div>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} navigate={navigate} />

      {/* ── Header ───────────────────────────────────── */}
      <div style={{
        textAlign: 'center',
        marginBottom: isMobile ? 10 : 18,
        flexShrink: 0,
      }}>
        <div style={{
          display: 'inline-block',
          padding: '3px 10px',
          border: `1px solid ${C.line}`,
          borderRadius: '50px',
          fontSize: '8px',
          fontWeight: 600,
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          color: C.primary,
          marginBottom: isMobile ? 6 : 10,
        }}>
          Intelligence {'\u00B7'} Powered by BRIDGE
        </div>
        <h1 style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: isMobile ? '24px' : '36px',
          fontWeight: 300,
          color: C.primary,
          margin: 0,
          lineHeight: 1.1,
          letterSpacing: '-0.5px',
        }}>
          <span style={{ fontWeight: 700 }}>BRIDGE</span> <span style={{ fontWeight: 700, color: C.accent }}>Apps</span>
        </h1>
        {!isMobile && (
          <p style={{
            fontSize: '12px',
            color: C.body,
            maxWidth: '400px',
            margin: '5px auto 0',
            lineHeight: 1.5,
          }}>
            Real tools. Real impact. Built for Ghana.
          </p>
        )}
      </div>

      {/* ── App Grid (3×3) ───────────────────────────── */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr 1fr 1fr' : 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(3, 1fr)',
        gap: isMobile ? '8px' : '12px',
        minHeight: 0,
      }}>
        {apps.map((app) => {
          const isHovered = hovered === app.id;
          const isLive = app.status === 'Live';
          const hoverC = isLive ? C.accent : '#B0B0B0';
          return (
            <div
              key={app.id}
              onMouseEnter={() => setHovered(app.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => {
                if (app.route === 'external') navigate('/apps/rentguard');
                else if (app.route === 'countdown') setSelectedApp(app);
              }}
              style={{
                backgroundColor: C.white,
                border: `1px solid ${isHovered ? hoverC : C.line}`,
                borderRadius: isMobile ? '10px' : '12px',
                padding: isMobile ? '10px' : '18px',
                cursor: app.route ? 'pointer' : 'default',
                transition: 'all 0.25s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: isHovered
                  ? '0 6px 20px rgba(27, 77, 62, 0.1)'
                  : '0 1px 2px rgba(0,0,0,0.03)',
                transform: isHovered ? 'translateY(-2px)' : 'none',
                overflow: 'hidden',
              }}
            >
              {/* Top: Icon + Status */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '6px' : '8px' }}>
                  <div style={{
                    width: isMobile ? '28px' : '34px',
                    height: isMobile ? '28px' : '34px',
                    borderRadius: '8px',
                    backgroundColor: isHovered ? hoverC : C.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.25s ease',
                    flexShrink: 0,
                  }}>
                    {I[app.icon](C.primary)}
                  </div>
                  {!isMobile && (
                    <span style={{
                      fontSize: '8px',
                      fontWeight: 600,
                      letterSpacing: '0.8px',
                      color: C.label,
                    }}>
                      APP {app.id}
                    </span>
                  )}
                </div>
                <div style={{
                  padding: isMobile ? '2px 5px' : '2px 7px',
                  borderRadius: '50px',
                  backgroundColor: isLive ? C.accent : 'transparent',
                  border: isLive ? 'none' : `1px solid ${C.line}`,
                  fontSize: isMobile ? '7px' : '8px',
                  fontWeight: 600,
                  letterSpacing: '0.3px',
                  color: isLive ? C.primary : C.label,
                  whiteSpace: 'nowrap',
                }}>
                  {app.status}
                </div>
              </div>

              {/* Middle: Name + Tagline */}
              <div>
                <h3 style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: isMobile ? '10px' : '14px',
                  fontWeight: 600,
                  color: C.primary,
                  margin: '0 0 2px',
                  lineHeight: 1.25,
                }}>
                  {app.name}
                </h3>
                {!isMobile && (
                  <p style={{
                    fontSize: '11px',
                    color: C.body,
                    margin: 0,
                    lineHeight: 1.4,
                  }}>
                    {app.tagline}
                  </p>
                )}
              </div>

              {/* Bottom: Arrow */}
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}>
                <div style={{
                  width: isMobile ? '20px' : '24px',
                  height: isMobile ? '20px' : '24px',
                  borderRadius: '50%',
                  border: `1px solid ${isHovered ? hoverC : C.line}`,
                  backgroundColor: isHovered ? hoverC : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.25s ease',
                }}>
                  <Arrow color={isHovered ? C.primary : C.label} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Footer Strip ─────────────────────────────── */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: isMobile ? 8 : 14,
        paddingTop: isMobile ? 6 : 10,
        borderTop: `1px solid ${C.line}`,
        flexShrink: 0,
      }}>
        <span style={{ fontSize: '9px', color: C.label, letterSpacing: '0.3px' }}>
          {'\u00A9'} 2026 BRIDGE PBC
        </span>
        <span style={{ fontSize: '9px', color: C.label }}>
          {isMobile ? 'BRIDGE Apps' : `Real Tools ${'\u00B7'} Free Entry ${'\u00B7'} Depth on Demand`}
        </span>
      </div>
    </div>
  );
}
