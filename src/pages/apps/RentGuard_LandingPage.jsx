import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { BRIDGEEngagementModal } from "@/components/EngagementModal";

// ─────────────────────────────────────────────────────────────────────────────
// RENTGUARD GHANA — PRODUCT LANDING PAGE
// Fortune-500 Grade · Editorial Dark · Palantir × Stripe × Bloomberg
// All 14 fixes applied for government preview readiness
// ─────────────────────────────────────────────────────────────────────────────

const C = {
  ink:     "#060D08",
  deep:    "#0A130C",
  forest:  "#0F1E13",
  card:    "#111A14",
  surface: "#162019",
  border:  "#1E3023",
  borderL: "#263B2B",
  green:   "#0FA86A",
  lime:    "#B8F73C",
  limeD:   "#94C831",
  t1:      "#E8F2EB",
  t2:      "#9BB8A3",
  t3:      "#4E7055",
  t4:      "#2A4A30",
  red:     "#E5483A",
  amber:   "#E8900A",
  blue:    "#4B9EFF",
};

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }

    body {
      background: ${C.ink};
      color: ${C.t1};
      font-family: 'Space Grotesk', sans-serif;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }

    ::selection { background: ${C.lime}30; color: ${C.lime}; }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: ${C.ink}; }
    ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 2px; }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(32px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
    @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
    @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
    @keyframes countUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes borderRotate { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
    @keyframes gridIn { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
    @keyframes terminalBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
    @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    @keyframes dashIn { from { stroke-dashoffset: 1000; } to { stroke-dashoffset: 0; } }
    /* FIX 01: Added missing spin keyframes for modal loading spinners */
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

    .fade-up   { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both; }
    .fade-up-1 { animation: fadeUp 0.7s 0.1s cubic-bezier(0.22,1,0.36,1) both; }
    .fade-up-2 { animation: fadeUp 0.7s 0.2s cubic-bezier(0.22,1,0.36,1) both; }
    .fade-up-3 { animation: fadeUp 0.7s 0.3s cubic-bezier(0.22,1,0.36,1) both; }
    .fade-up-4 { animation: fadeUp 0.7s 0.4s cubic-bezier(0.22,1,0.36,1) both; }
    .fade-up-5 { animation: fadeUp 0.7s 0.5s cubic-bezier(0.22,1,0.36,1) both; }
    .fade-up-6 { animation: fadeUp 0.7s 0.6s cubic-bezier(0.22,1,0.36,1) both; }

    .float { animation: float 6s ease-in-out infinite; }
    .float-2 { animation: float 8s 2s ease-in-out infinite; }
    .float-3 { animation: float 7s 1s ease-in-out infinite; }

    .grad-text {
      background: linear-gradient(135deg, ${C.lime} 0%, ${C.green} 60%, ${C.blue} 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    .grad-text-warm {
      background: linear-gradient(135deg, #FFD060 0%, ${C.lime} 50%, ${C.green} 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }

    .section { padding: 148px 0; }
    .section-sm { padding: 80px 0; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 80px; }
    .container-wide { max-width: 1400px; margin: 0 auto; padding: 0 80px; }

    .noise-overlay {
      position: absolute; inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
      pointer-events: none; opacity: 0.4;
    }

    .grid-bg {
      background-image: linear-gradient(${C.border}40 1px, transparent 1px), linear-gradient(90deg, ${C.border}40 1px, transparent 1px);
      background-size: 60px 60px;
    }

    .tag {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 5px 12px; border-radius: 20px; border: 1px solid ${C.border};
      font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: ${C.t3};
    }
    .tag-green { border-color: ${C.green}40; background: ${C.green}10; color: ${C.green}; }
    .tag-lime { border-color: ${C.lime}40; background: ${C.lime}08; color: ${C.lime}; }

    .stat-card {
      border: 1px solid ${C.border}; background: ${C.card}; border-radius: 12px; padding: 28px;
      position: relative; overflow: hidden; transition: border-color 0.3s, transform 0.3s;
    }
    .stat-card:hover { border-color: ${C.borderL}; transform: translateY(-2px); }
    .stat-card::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
      background: linear-gradient(90deg, transparent, ${C.lime}60, transparent);
    }

    .feat-card {
      border: 1px solid ${C.border}; background: ${C.card}; border-radius: 16px; padding: 32px;
      transition: all 0.3s cubic-bezier(0.22,1,0.36,1); cursor: default;
    }
    .feat-card:hover {
      border-color: ${C.green}40; background: ${C.surface}; transform: translateY(-4px);
      box-shadow: 0 20px 60px rgba(15,168,106,0.08);
    }

    .marquee-track { display: flex; animation: marquee 30s linear infinite; width: max-content; }
    .marquee-track:hover { animation-play-state: paused; }

    .glow-green { box-shadow: 0 0 40px ${C.green}20, 0 0 80px ${C.green}08; }
    .glow-lime  { box-shadow: 0 0 40px ${C.lime}20, 0 0 80px ${C.lime}08; }

    .btn-primary {
      display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; border-radius: 8px;
      background: ${C.lime}; color: ${C.ink}; font-family: 'Space Grotesk', sans-serif;
      font-size: 14px; font-weight: 700; border: none; cursor: pointer; transition: all 0.2s; text-decoration: none;
    }
    .btn-primary:hover { background: #ceff5a; transform: translateY(-1px); box-shadow: 0 8px 24px ${C.lime}30; }

    .btn-secondary {
      display: inline-flex; align-items: center; gap: 8px; padding: 13px 27px; border-radius: 8px;
      background: transparent; color: ${C.t1}; font-family: 'Space Grotesk', sans-serif;
      font-size: 14px; font-weight: 600; border: 1px solid ${C.borderL}; cursor: pointer; transition: all 0.2s; text-decoration: none;
    }
    .btn-secondary:hover { border-color: ${C.green}; color: ${C.green}; background: ${C.green}08; }

    .divider { height: 1px; background: linear-gradient(90deg, transparent, ${C.border}, transparent); }

    @media (max-width: 900px) {
      .container, .container-wide { padding: 0 24px; }
      .section { padding: 100px 0; }
      .hide-mobile { display: none !important; }
      .show-mobile { display: none; }
      .rg-hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
      .rg-2col { grid-template-columns: 1fr !important; gap: 48px !important; }
      .rg-3col { grid-template-columns: 1fr 1fr !important; }
      .rg-4col { grid-template-columns: 1fr 1fr !important; }
      .rg-who-grid { grid-template-columns: 1fr !important; }
      .rg-role-caps { grid-template-columns: 1fr 1fr !important; }
      .rg-security-grid { grid-template-columns: 1fr !important; }
      .rg-footer-grid { grid-template-columns: 1fr 1fr !important; }
    }

    @media (max-width: 600px) { .show-mobile { display: block !important; } }
    @media (max-width: 600px) {
      .container, .container-wide { padding: 0 20px; }
      .section { padding: 72px 0; }
      .section-sm { padding: 40px 0; }
      h1 { font-size: clamp(56px, 14vw, 80px) !important; }
      h2 { font-size: clamp(36px, 10vw, 52px) !important; }
      .rg-hero-grid { grid-template-columns: 1fr !important; }
      .rg-hero-ctas { flex-direction: column !important; align-items: stretch !important; }
      .rg-hero-ctas .btn-primary, .rg-hero-ctas .btn-secondary { width: 100% !important; justify-content: center !important; text-align: center !important; }
      .rg-ticker-val { font-size: 20px !important; }
      .rg-3col, .rg-4col, .rg-2col, .rg-who-grid, .rg-security-grid, .rg-footer-grid { grid-template-columns: 1fr !important; gap: 14px !important; }
      .rg-role-caps { grid-template-columns: 1fr 1fr !important; gap: 8px !important; }
      .rg-feat-tags { gap: 6px !important; }
      .rg-section-header { flex-direction: column !important; align-items: flex-start !important; gap: 16px !important; }
      .rg-terminal { font-size: 10px !important; min-height: 280px !important; }
      .rg-ussd-grid { grid-template-columns: 1fr 1fr !important; gap: 8px !important; }
      .rg-kpi-grid { grid-template-columns: 1fr 1fr !important; }
      .rg-integration-grid { grid-template-columns: 1fr !important; }
      .rg-cta-btns { flex-direction: column !important; align-items: center !important; gap: 12px !important; }
      .rg-cta-btns .btn-primary, .rg-cta-btns .btn-secondary { width: 100% !important; max-width: 320px !important; justify-content: center !important; }
      .rg-modal { max-width: 100% !important; margin: 0 !important; border-radius: 16px 16px 0 0 !important; position: fixed !important; bottom: 0 !important; left: 0 !important; right: 0 !important; }
      .rg-modal-wrap { align-items: flex-end !important; padding: 0 !important; }
      .rg-modal-2col { grid-template-columns: 1fr !important; }
      .rg-nav-links { display: none !important; }
      .rg-nav-meta { display: none !important; }
      .rg-footer-bottom { flex-direction: column !important; align-items: center !important; text-align: center !important; gap: 16px !important; }
      .rg-law-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
      input, select, textarea { font-size: 16px !important; }
      button, a, .btn-primary, .btn-secondary { min-height: 44px; }
      .rg-security-bg-num { font-size: 40vw !important; }
      .rg-problem-stats { gap: 12px !important; }
      .rg-problem-stat { padding: 16px !important; }
      .rg-problem-num { font-size: 36px !important; }
    }
  `}</style>
);

// ── HOOKS ──────────────────────────────────────────────────────────────────
const useCounter = (target, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
};

const useVisible = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
};

const useMobile = () => {
  const [mob, setMob] = useState(typeof window !== 'undefined' && window.innerWidth <= 768);
  useEffect(() => {
    const fn = () => setMob(window.innerWidth <= 768);
    window.addEventListener('resize', fn, { passive: true });
    return () => window.removeEventListener('resize', fn);
  }, []);
  return mob;
};

// ── FIX 02: NAVBAR — Sticky on desktop, hamburger on mobile ────────────────
const Navbar = ({ onDemo, onLogin }) => {
  const mob = useMobile();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    if (!mob) setMenuOpen(false);
  }, [mob]);

  const navLinks = [
    ['Platform','#platform'],
    ['Features','#features'],
    ["Who It's For",'#who-its-for'],
    ['Security','#security'],
  ];

  if (mob) return (
    <>
      <nav style={{
        position: 'sticky', top: 0, width: '100%', background: scrolled ? `${C.ink}f0` : C.ink,
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: `1px solid ${C.border}`, padding: '0 16px', height: 56,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 999,
        transition: 'all 0.3s',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: `linear-gradient(135deg, ${C.lime}, ${C.green})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 14, height: 14, border: `2.5px solid ${C.ink}`, borderRadius: 3 }} />
          </div>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16 }}>RentGuard</span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: C.lime, background: `${C.lime}15`, border: `1px solid ${C.lime}30`, borderRadius: 3, padding: '2px 5px', letterSpacing: 1 }}>GH</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={onLogin} aria-label="View demo"
            style={{ background: C.lime, color: C.ink, border: 'none', padding: '0 10px', borderRadius: 4, fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, cursor: 'pointer', height: 28, minHeight: 28, lineHeight: '28px', display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap', flexShrink: 0 }}>
            Demo
          </button>
          {/* FIX 02: Hamburger menu button */}
          <button onClick={() => setMenuOpen(o => !o)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            style={{ background: 'transparent', border: `1px solid ${C.border}`, borderRadius: 6, width: 36, height: 36, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: menuOpen ? 0 : 4, cursor: 'pointer', padding: 0, minHeight: 36, position: 'relative' }}>
            <span style={{ display: 'block', width: 16, height: 1.5, background: C.t2, borderRadius: 1, transition: 'all 0.2s', transform: menuOpen ? 'rotate(45deg) translateY(0)' : 'none', position: menuOpen ? 'absolute' : 'relative' }} />
            {!menuOpen && <span style={{ display: 'block', width: 16, height: 1.5, background: C.t2, borderRadius: 1 }} />}
            <span style={{ display: 'block', width: 16, height: 1.5, background: C.t2, borderRadius: 1, transition: 'all 0.2s', transform: menuOpen ? 'rotate(-45deg) translateY(0)' : 'none', position: menuOpen ? 'absolute' : 'relative' }} />
          </button>
        </div>
      </nav>
      {/* Mobile slide-down menu */}
      {menuOpen && (
        <div style={{ position: 'fixed', top: 56, left: 0, right: 0, bottom: 0, zIndex: 998, background: `${C.ink}f5`, backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', animation: 'fadeIn 0.2s ease' }}>
          <div style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {navLinks.map(([label, href]) => (
              <a key={label} href={href} onClick={() => setMenuOpen(false)}
                style={{ display: 'block', padding: '16px 0', borderBottom: `1px solid ${C.border}`, fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 600, color: C.t1, textDecoration: 'none' }}>
                {label}
              </a>
            ))}
            <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button onClick={() => { setMenuOpen(false); onDemo(); }} aria-label="Request demo"
                style={{ width: '100%', padding: '14px', background: C.lime, color: C.ink, border: 'none', borderRadius: 8, fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
                Request Demo
              </button>
              <button onClick={() => { setMenuOpen(false); onLogin(); }} aria-label="Sign in to demo"
                style={{ width: '100%', padding: '13px', background: 'transparent', color: C.t1, border: `1px solid ${C.border}`, borderRadius: 8, fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
                Sign In
              </button>
            </div>
            <div style={{ marginTop: 24, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.t4 }}>
              Act 220 · PNDCL 138 · v4.0
            </div>
          </div>
        </div>
      )}
    </>
  );

  // FIX 02: Desktop — sticky with scroll-based background transition
  return (
    <nav style={{
      position: 'sticky', top: 0, left: 0, right: 0, zIndex: 999, width: '100%',
      transition: 'all 0.3s',
      background: scrolled ? `${C.ink}f0` : C.ink,
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: `1px solid ${scrolled ? C.borderL : C.border}`,
      boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.3)' : 'none',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', height: 68, justifyContent: 'space-between', padding: '0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${C.lime}, ${C.green})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 16, height: 16, border: `2.5px solid ${C.ink}`, borderRadius: 3 }} />
          </div>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 17, letterSpacing: '-0.3px' }}>RentGuard</span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.lime, background: `${C.lime}15`, border: `1px solid ${C.lime}30`, borderRadius: 4, padding: '2px 6px', letterSpacing: 1 }}>GHANA</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          {navLinks.map(([item, href]) => (
            <a key={item} href={href}
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 500, color: C.t2, textDecoration: 'none', transition: 'color 0.2s', letterSpacing: '-0.2px' }}
              onMouseEnter={e => e.target.style.color = C.t1}
              onMouseLeave={e => e.target.style.color = C.t2}>
              {item}
            </a>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.t3, letterSpacing: 1 }}>Act 220 · PNDCL 138</span>
          <button className="btn-primary" onClick={onLogin} aria-label="View demo" style={{ padding: '9px 20px', fontSize: 13, border: 'none', cursor: 'pointer' }}>
            View Demo →
          </button>
        </div>
      </div>
    </nav>
  );
};

// ── HERO ───────────────────────────────────────────────────────────────────
const Hero = ({ onDemo }) => {
  const mob = useMobile();
  const [statsVisible, setStatsVisible] = useState(false);
  useEffect(() => { setTimeout(() => setStatsVisible(true), 800); }, []);
  const c1 = useCounter(312, 2000, statsVisible);
  const c2 = useCounter(1482, 2200, statsVisible);
  const c3 = useCounter(18, 1500, statsVisible);

  const ticker = [
    { val: c1.toLocaleString(),  label: 'Active Violations',       color: C.red   },
    { val: '9.2mo',              label: 'Avg Advance Collected',    color: C.amber },
    { val: c2.toLocaleString(),  label: 'Properties Tracked',      color: C.lime  },
    { val: '38%',                label: 'Tenancy Registration',     color: C.amber },
    { val: c3,                   label: 'Officers On Shift',        color: C.green },
    { val: '<5%',                label: 'Tenancies Registered',     color: C.red   },
    { val: '29%',                label: 'Rent Card Adoption',       color: C.amber },
    { val: '847',                label: 'GRA Records/Month',        color: C.blue  },
    { val: '16',                 label: 'Ghana Regions',            color: C.green },
  ];

  // ── MOBILE HERO — FIX 03: Added simplified dashboard preview ──────────
  if (mob) return (
    <section style={{ background: C.ink, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${C.border}30 1px, transparent 1px), linear-gradient(90deg, ${C.border}30 1px, transparent 1px)`, backgroundSize: '40px 40px', opacity: 0.5 }} />
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 300, height: 300, background: `radial-gradient(ellipse, ${C.green}15 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 1, padding: '48px 20px 0' }}>
        <div className="fade-up" style={{ marginBottom: 20 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 20, border: `1px solid ${C.green}40`, background: `${C.green}10`, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.green, letterSpacing: 1 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: C.green, animation: 'pulse 2s infinite' }} />
            April 2026 · v4.0
          </span>
        </div>
        <h1 className="fade-up-1" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 72, lineHeight: 0.92, letterSpacing: '-1px', color: C.t1, marginBottom: 0 }}>
          <span style={{ display: 'block' }}>Ghana's Rent</span>
          <span style={{ display: 'block', background: `linear-gradient(135deg, ${C.lime}, ${C.green})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Enforcement</span>
          <span style={{ display: 'block' }}>Intelligence</span>
          <span style={{ display: 'block', color: C.t3 }}>Platform</span>
        </h1>
        <p className="fade-up-2" style={{ fontSize: 15, lineHeight: 1.7, color: C.t2, marginTop: 20, marginBottom: 28 }}>
          The enforcement muscle that makes Ghana's rent laws actually work. Built on Act 220 and PNDCL 138.
        </p>
        <div className="fade-up-3" style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          <button onClick={onDemo} aria-label="Explore the platform"
            style={{ width: '100%', padding: '15px', background: C.lime, color: C.ink, border: 'none', borderRadius: 10, fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
            Explore the Platform →
          </button>
          <button onClick={onDemo} aria-label="See all features"
            style={{ width: '100%', padding: '14px', background: 'transparent', color: C.t1, border: `1px solid ${C.border}`, borderRadius: 10, fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
            See All Features
          </button>
        </div>

        {/* FIX 03: Mobile product preview — compact dashboard KPI strip */}
        <div className="fade-up-4" style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: '14px', marginBottom: 28, overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${C.lime}60, transparent)` }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
            <div style={{ width: 18, height: 18, borderRadius: 4, background: `linear-gradient(135deg, ${C.lime}, ${C.green})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 9, height: 9, border: `1.5px solid ${C.ink}`, borderRadius: 2 }} />
            </div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: C.t3, letterSpacing: 1 }}>RENTGUARD / NATIONAL DASHBOARD</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {[
              { val: '312', label: 'Violations', color: C.red },
              { val: '38%', label: 'Registered', color: C.amber },
              { val: '1,482', label: 'Properties', color: C.lime },
              { val: '18', label: 'Officers', color: C.green },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 7, color: C.t3, marginTop: 3, letterSpacing: 0.5 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="fade-up-5" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
          <div style={{ display: 'flex' }}>
            {['#0FA86A','#4B9EFF','#E8900A','#E5483A','#B8F73C'].map((c,i) => (
              <div key={i} style={{ width: 24, height: 24, borderRadius: '50%', background: c, border: `2px solid ${C.ink}`, marginLeft: i > 0 ? -6 : 0 }} />
            ))}
          </div>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: C.t3 }}>5 roles · 45 workflows</span>
        </div>
      </div>
      {/* Stats ticker */}
      <div style={{ borderTop: `1px solid ${C.border}`, background: `${C.card}cc`, overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 40, background: `linear-gradient(90deg, ${C.ink}, transparent)`, zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 40, background: `linear-gradient(270deg, ${C.ink}, transparent)`, zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ display: 'flex', animation: 'marquee 20s linear infinite', width: 'max-content' }}>
          {[...Array(2)].map((_, rep) => ticker.map((s, i) => (
            <div key={`${rep}-${i}`} style={{ display: 'flex', alignItems: 'center', padding: '0 28px', flexShrink: 0, borderRight: `1px solid ${C.border}` }}>
              <div style={{ padding: '14px 0', display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.val}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.t3, letterSpacing: 1, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{s.label}</span>
              </div>
            </div>
          )))}
        </div>
      </div>
    </section>
  );

  // ── DESKTOP HERO ─────────────────────────────────────────────────────────
  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 60, paddingBottom: 0, overflow: 'hidden' }}>
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 800, height: 600, background: `radial-gradient(ellipse, ${C.green}12 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', opacity: 0.03 }}>
        <div style={{ position: 'absolute', width: '100%', height: 2, background: C.lime, animation: 'scanline 6s linear infinite' }} />
      </div>
      <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
        <div className="rg-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div className="fade-up" style={{ marginBottom: 28 }}>
              <span className="tag tag-green">
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.green, animation: 'pulse 2s infinite' }} />
                April 2026 · Enforcement Intelligence Layer · v4.0
              </span>
            </div>
            <div className="fade-up-1">
              <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(72px, 8vw, 132px)', lineHeight: 0.92, letterSpacing: '-1px', color: C.t1, marginBottom: 0 }}>
                <span style={{ display: 'block' }}>Ghana's Rent</span>
                <span style={{ display: 'block' }} className="grad-text">Enforcement</span>
                <span style={{ display: 'block' }}>Intelligence</span>
                <span style={{ display: 'block', color: C.t3 }}>Platform</span>
              </h1>
            </div>
            <div className="fade-up-2" style={{ maxWidth: 440, marginTop: 28, marginBottom: 40 }}>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: C.t2, fontWeight: 400, letterSpacing: '-0.2px' }}>
                The enforcement muscle that makes Ghana's rent laws actually work. Real-time violation tracking, Taskforce operations, GRA integration, and tenant protection — built on Act 220 and PNDCL 138.
              </p>
            </div>
            <div className="fade-up-3 rg-hero-ctas" style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
              <button className="btn-primary" onClick={onDemo} aria-label="Explore the platform" style={{ border: 'none', cursor: 'pointer' }}>
                <span>Explore the Platform</span><span>→</span>
              </button>
              <button className="btn-secondary" onClick={onDemo} aria-label="See all features" style={{ cursor: 'pointer' }}>
                <span>See All Features</span>
              </button>
            </div>
            <div className="fade-up-4" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ display: 'flex' }}>
                {['#0FA86A','#4B9EFF','#E8900A','#E5483A','#B8F73C'].map((c,i) => (
                  <div key={i} style={{ width: 26, height: 26, borderRadius: '50%', background: c, border: `2px solid ${C.ink}`, marginLeft: i > 0 ? -8 : 0 }} />
                ))}
              </div>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: C.t3 }}>5 roles · 45 workflows</span>
            </div>
          </div>
          <div className="fade-up-3 hide-mobile" style={{ paddingTop: 0 }}>
            <DashboardMockHero />
          </div>
        </div>
      </div>
      {/* Stats ticker */}
      <div className="fade-up-5" style={{ marginTop: 64, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, background: `${C.card}cc`, backdropFilter: 'blur(12px)', overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, background: `linear-gradient(90deg, ${C.ink}, transparent)`, zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, background: `linear-gradient(270deg, ${C.ink}, transparent)`, zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ display: 'flex', animation: 'marquee 25s linear infinite', width: 'max-content' }}
          onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'}
          onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}>
          {[...Array(2)].map((_, rep) => ticker.map((s, i) => (
            <div key={`${rep}-${i}`} style={{ display: 'flex', alignItems: 'center', padding: '0 48px', flexShrink: 0, borderRight: `1px solid ${C.border}` }}>
              <div style={{ padding: '18px 0', display: 'flex', alignItems: 'baseline', gap: 12 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 24, fontWeight: 700, color: s.color, letterSpacing: '-0.5px', lineHeight: 1 }}>{s.val}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.t3, letterSpacing: 1, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{s.label}</span>
              </div>
            </div>
          )))}
        </div>
      </div>
    </section>
  );
};

// ── DASHBOARD MOCK — HERO ───────────────────────────────────────────────────
const DashboardMockHero = () => (
  <div className="float" style={{ background: C.forest, border: `1px solid ${C.border}`, borderRadius: 14, overflow: 'hidden', boxShadow: `0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px ${C.border}`, transform: 'perspective(1000px) rotateY(-12deg) rotateX(4deg)' }}>
    <div style={{ height: 40, background: C.card, borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 8 }}>
      {['#E5483A','#E8900A','#0FA86A'].map((c,i) => <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
      <div style={{ flex: 1 }} />
      <div style={{ fontFamily: 'JetBrains Mono', fontSize: 9, color: C.t3 }}>RentGuard / National Admin / Dashboard</div>
    </div>
    <div style={{ display: 'flex', height: 380 }}>
      <div style={{ width: 140, background: C.ink, borderRight: `1px solid ${C.border}`, padding: '12px 0' }}>
        <div style={{ padding: '0 12px 10px', borderBottom: `1px solid ${C.border}`, marginBottom: 8 }}>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 7, color: C.t3, letterSpacing: 1, textTransform: 'uppercase' }}>Navigation</div>
        </div>
        {[
          { label: 'Dashboard', active: true, dot: '#0FA86A' },
          { label: 'Live Activity', dot: '#B8F73C' },
          { label: 'Regions', dot: '#4B9EFF' },
          { label: 'All Cases', dot: '#E8900A', badge: '3' },
          { label: 'SLA Tracker', dot: '#E5483A', badge: '2' },
          { label: 'Enforcement Flow', dot: '#B8F73C' },
          { label: 'Properties', dot: '#E8900A' },
          { label: 'Officers', dot: '#0FA86A' },
          { label: 'GRA Export', dot: '#E8900A' },
          { label: 'Settings', dot: '#4E7055' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 12px', background: item.active ? `${C.green}15` : 'transparent' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: item.active ? '#0FA86A' : item.dot, opacity: item.active ? 1 : 0.4 }} />
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: 8, color: item.active ? '#0FA86A' : C.t3 }}>{item.label}</span>
            </div>
            {item.badge && <span style={{ fontFamily: 'JetBrains Mono', fontSize: 7, color: C.red, background: 'rgba(229,72,58,0.15)', borderRadius: 8, padding: '1px 4px' }}>{item.badge}</span>}
          </div>
        ))}
      </div>
      <div style={{ flex: 1, padding: 14, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6, marginBottom: 10 }}>
          {[
            { val: '38%', label: 'Tenancies Registered', color: '#E8900A' },
            { val: '29%', label: 'Rent Cards Issued', color: '#E5483A' },
            { val: '312', label: 'Active Violations', color: '#E5483A' },
            { val: '68', label: 'Compliance Score', color: '#E8900A' },
          ].map((s,i) => (
            <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: '8px 10px' }}>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: 14, fontWeight: 700, color: s.color, marginBottom: 3 }}>{s.val}</div>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: 7, color: C.t3, lineHeight: 1.3 }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: 10, marginBottom: 8, height: 80 }}>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 8, color: C.t3, marginBottom: 6 }}>6-Month Compliance Trend</div>
          <svg width="100%" height="48" style={{ overflow: 'visible' }}>
            <polyline points="0,40 30,35 60,28 90,22 120,16 150,12 180,8 210,5" fill="none" stroke="#0FA86A" strokeWidth="1.5" strokeLinecap="round" />
            <polyline points="0,20 30,24 60,28 90,22 120,26 150,20 180,24 210,18" fill="none" stroke="#E5483A" strokeWidth="1" strokeDasharray="3,3" strokeLinecap="round" />
          </svg>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, overflow: 'hidden' }}>
          <div style={{ padding: '6px 10px', borderBottom: `1px solid ${C.border}` }}>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: 8, color: C.t2, fontWeight: 700 }}>Recent Cases</span>
          </div>
          {[
            { id: 'RC-291', type: 'Illegal Advance', sev: 'CRITICAL', color: '#E5483A' },
            { id: 'RC-290', type: 'No Rent Card', sev: 'HIGH', color: '#E5483A' },
            { id: 'RC-289', type: 'Unlawful Eviction', sev: 'HIGH', color: '#E5483A' },
            { id: 'RC-288', type: 'No Agreement', sev: 'MEDIUM', color: '#E8900A' },
          ].map((c,i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 10px', borderBottom: i < 3 ? `1px solid ${C.border}40` : 'none' }}>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: 8, color: '#0FA86A' }}>{c.id}</span>
              <span style={{ fontSize: 8, color: C.t2 }}>{c.type}</span>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: 7, color: c.color, fontWeight: 700 }}>{c.sev}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ── FIX 04: CREDIBILITY STRIP — Social proof for government preview ─────────
// [REMOVED] CredibilityStrip — consolidated into ProductTour / replaced
// ── MARQUEE STRIP ──────────────────────────────────────────────────────────
// [REMOVED] MarqueeStrip — consolidated into ProductTour / replaced
// ── PROBLEM STATEMENT ──────────────────────────────────────────────────────
const ProblemSection = () => {
  const [ref, visible] = useVisible();
  const mob = useMobile();
  const stats = [
    { num: '61%',   label: 'of tracked tenancies exceed the 6-month advance cap under Act 220 s.16(5)', color: C.red },
    { num: '<5%',   label: 'of tenancies in Ghana are formally registered with Rent Control',           color: C.amber },
    { num: '1.25M', label: 'young people NEET — many trapped by illegal housing costs',                 color: C.amber },
    { num: '0',     label: 'national rental data infrastructure existed before RentGuard',              color: C.t3 },
  ];

  if (mob) return (
    <section ref={ref} id="platform" style={{ background: C.ink, padding: '72px 20px' }}>
      <div style={{ marginBottom: 12 }}><span className="tag">The Enforcement Gap</span></div>
      <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, lineHeight: 0.95, color: C.t1, marginBottom: 20, letterSpacing: '-0.5px' }}>
        Ghana has the laws.<br /><span style={{ color: C.lime }}>The enforcement has been missing.</span>
      </h2>
      <p style={{ fontSize: 15, lineHeight: 1.75, color: C.t2, marginBottom: 20 }}>The Rent Act has existed since 1963. What's been missing is the enforcement infrastructure to make it real.</p>
      <div style={{ padding: '14px 16px', background: `${C.lime}08`, border: `1px solid ${C.lime}20`, borderRadius: 8, marginBottom: 28 }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.lime, letterSpacing: 1, marginBottom: 4 }}>APRIL 1, 2026 MANDATE</div>
        <div style={{ fontSize: 13, color: C.t2, lineHeight: 1.6 }}>All landlords must issue Rent Cards. National Taskforce deployed. RentGuard is the enforcement layer.</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '16px', background: C.card, border: `1px solid ${C.border}`, borderRadius: 10 }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 38, color: s.color, lineHeight: 1, flexShrink: 0, minWidth: 72 }}>{s.num}</div>
            <div style={{ fontSize: 13, color: C.t2, lineHeight: 1.6, paddingTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <section ref={ref} className="section" id="platform" style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%) rotate(-90deg)', fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.t4, letterSpacing: 3, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>The Problem</div>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div style={{ marginBottom: 16 }}><span className="tag">The Enforcement Gap</span></div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(40px,4.5vw,60px)', lineHeight: 1.0, color: C.t1, marginBottom: 24, letterSpacing: '-0.5px' }}>
              Ghana has the laws.<br /><span style={{ color: C.lime }}>The enforcement<br />has been missing.</span>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: C.t2, marginBottom: 24 }}>The Rent Act has existed since 1963. The 6-month advance cap, the rent card requirement, tenancy registration — all law. What's been missing is the enforcement infrastructure to make it real.</p>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: C.t2, marginBottom: 32 }}>RentGuard is not a new portal. It is the enforcement muscle — the field intelligence, case management, and compliance nervous system built on top of Ghana's existing digital infrastructure.</p>
            <div style={{ padding: '16px 20px', background: `${C.lime}08`, border: `1px solid ${C.lime}20`, borderLeft: `3px solid ${C.lime}`, borderRadius: 8 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.lime, letterSpacing: 1, marginBottom: 6, textTransform: 'uppercase' }}>April 1, 2026 Mandate</div>
              <div style={{ fontSize: 14, color: C.t2, lineHeight: 1.6 }}>All landlords must issue Rent Cards. National Rent Taskforce deployed across all MMDAs. RentGuard is the enforcement layer that makes the mandate stick.</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {stats.map((s, i) => (
              <div key={i} className={visible ? `fade-up-${i+1}` : ''} style={{ display: 'flex', gap: 20, alignItems: 'flex-start', padding: '20px 24px', background: C.card, border: `1px solid ${C.border}`, borderRadius: 12 }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 42, color: s.color, lineHeight: 1, flexShrink: 0, minWidth: 80 }}>{s.num}</div>
                <div style={{ fontSize: 14, color: C.t2, lineHeight: 1.6, paddingTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ── FIX 06: FEATURES — default active feature visible on load ──────────────
const FeaturesSection = () => {
  const [ref, visible] = useVisible();
  const mob = useMobile();
  const [activeFeature, setActiveFeature] = useState(0); // Already 0, but now first card has visual highlight on load

  const features = [
    { icon: '⬡', label: 'Enforcement Intelligence', color: C.green,   headline: 'Real-time violation tracking across all 16 regions',              body: 'Every property scores 0–100 based on registration status, rent card coverage, advance violations, and open cases. High-risk properties are automatically routed to the nearest Taskforce unit for priority inspection.', tags: ['Risk Scoring', 'Auto-Routing', 'Regional Dashboard'] },
    { icon: '▤', label: 'Case Management',           color: C.blue,    headline: 'End-to-end case lifecycle from complaint to resolution',            body: 'Five status stages, SLA deadlines by severity, bulk assignment, and formal notice generation with embedded legal citations. Officer performance metrics and court-referral workflows are built into every case.', tags: ['5-Stage Pipeline', 'SLA Tracking', 'Notice Generator'] },
    { icon: '◎', label: 'Taskforce Operations',      color: C.amber,   headline: "Mobile-first field app built for Ghana's officers",                  body: "Android-first, offline-capable, and GPS-native. Officers run through a PNDCL 138 inspection checklist, scan rent card QR codes, capture evidence, and file violations — even without a signal. Everything syncs on reconnect.", tags: ['Offline-First', 'GPS Evidence', 'QR Card Scanner'] },
    { icon: '◈', label: 'Rent Card Registry',        color: C.lime,    headline: 'National digital rent card system with instant verification',        body: 'Every tenant verifies their rent card by QR scan or by dialling *714*1# on any phone — no smartphone required. Payment records are SHA-256 hashed at entry, making them tamper-proof and court-admissible.', tags: ['QR Verification', '*714*1# USSD', 'SHA-256 Hashing'] },
    { icon: '◼', label: 'GRA Integration',           color: '#9B59B6', headline: 'Automated rental income data pipeline to Ghana Revenue Authority',   body: 'Monthly SFTP exports deliver TIN-matched landlord income records directly to the Ghana Revenue Authority. Multi-property owners are automatically flagged. Every transfer is logged and confirmed in the audit trail.', tags: ['TIN Matching', 'Monthly GRA Export', 'SFTP Transfer'] },
    { icon: '▦', label: 'Tenant Protection',         color: C.red,     headline: 'Every tenant has rights. Now they can actually use them.',           body: 'Emergency eviction alerts, complaint filing via web or USSD, real-time case tracking, and a verified legal aid directory. Every tenant right under Act 220 and PNDCL 138 is explained in plain, accessible language.', tags: ['Emergency Alerts', 'Legal Aid Directory', 'Multi-channel'] },
  ];

  if (mob) return (
    <section ref={ref} id="features" style={{ background: C.ink, padding: '72px 20px' }}>
      <div style={{ marginBottom: 12 }}><span className="tag tag-lime">Platform Capabilities</span></div>
      <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 52, color: C.t1, letterSpacing: '-1px', lineHeight: 0.95, marginBottom: 8 }}>
        Built for every actor<br /><span style={{ color: C.lime }}>in the system</span>
      </h2>
      <p style={{ fontSize: 14, color: C.t2, marginBottom: 28, lineHeight: 1.6 }}>5 roles · 45 workflows · one platform</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {features.map((f, i) => (
          <div key={i} onClick={() => setActiveFeature(activeFeature === i ? -1 : i)} role="button" aria-label={`Toggle ${f.label} details`} aria-expanded={activeFeature === i}
            style={{ background: C.card, border: `1px solid ${activeFeature === i ? f.color + '50' : C.border}`, borderRadius: 12, overflow: 'hidden', transition: 'border-color 0.2s', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px' }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: `${f.color}18`, border: `1px solid ${f.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 15, color: f.color }}>{f.icon}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: f.color, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 3 }}>{f.label}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.t1, lineHeight: 1.3 }}>{f.headline}</div>
              </div>
              <span style={{ color: C.t3, fontSize: 14, transition: 'transform 0.2s', transform: activeFeature === i ? 'rotate(180deg)' : 'none', flexShrink: 0 }}>↓</span>
            </div>
            {activeFeature === i && (
              <div style={{ padding: '0 16px 16px', borderTop: `1px solid ${C.border}` }}>
                <p style={{ fontSize: 13, color: C.t2, lineHeight: 1.7, margin: '12px 0 12px' }}>{f.body}</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {f.tags.map((tag, j) => (
                    <span key={j} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: f.color, background: `${f.color}10`, border: `1px solid ${f.color}20`, borderRadius: 4, padding: '3px 8px' }}>{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <section ref={ref} className="section" id="features" style={{ position: 'relative', background: C.ink }}>
      <div className="noise-overlay" />
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <div style={{ marginBottom: 16 }}><span className="tag tag-lime">Platform Capabilities</span></div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(52px, 6vw, 88px)', color: C.t1, letterSpacing: '-1px', lineHeight: 0.95, marginBottom: 20 }}>
            Built for every actor<br /><span style={{ color: C.lime }}>in the system</span>
          </h2>
          <p style={{ fontSize: 17, color: C.t2, maxWidth: 540, margin: '0 auto', lineHeight: 1.7 }}>Five roles. 45 workflows. One platform that connects the ministry, officers, landlords, and tenants into a single enforcement system.</p>
        </div>
        <div className="rg-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {features.map((f, i) => (
            <div key={i} className={`feat-card ${visible ? `fade-up-${Math.min(i+1,6)}` : ''}`}
              onMouseEnter={() => setActiveFeature(i)}
              role="button" aria-label={`View ${f.label} details`}
              style={{ borderColor: activeFeature === i ? `${f.color}40` : C.border, background: activeFeature === i ? C.surface : C.card }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: `${f.color}15`, border: `1px solid ${f.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                <span style={{ fontSize: 18, color: f.color }}>{f.icon}</span>
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: f.color, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>{f.label}</div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, color: C.t1, lineHeight: 1.4, marginBottom: 12 }}>{f.headline}</h3>
              <p style={{ fontSize: 14, color: C.t2, lineHeight: 1.7, marginBottom: 18, minHeight: 120 }}>{f.body}</p>
              <div className="rg-feat-tags" style={{ display: 'flex', gap: 6, flexWrap: 'wrap', minHeight: 52 }}>
                {f.tags.map((tag, j) => (
                  <span key={j} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: f.color, background: `${f.color}10`, border: `1px solid ${f.color}20`, borderRadius: 4, padding: '3px 8px', letterSpacing: 0.5 }}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── WHO SECTION ────────────────────────────────────────────────────────────
const WhoSection = () => {
  const [ref, visible] = useVisible();
  const mob = useMobile();
  const [activeRole, setActiveRole] = useState(0);
  const roles = [
    { id:'admin', title:'National Admin', subtitle:'Ministry of Works and Housing', color:C.green, description:'Real-time enforcement intelligence across all 16 regions. Law vs. reality compliance tables. Officer deployment tools. GRA pipeline. Policy change log from 1963 to today.', capabilities:['Regional dashboard','Law vs Reality panel','GRA export pipeline','Policy & audit log','User management','System settings'] },
    { id:'manager', title:'Case Manager', subtitle:'Rent Control Department', color:C.blue, description:'Sortable, filterable, bulk-actionable case queue. SLA deadlines by severity. One-click notice generation with legal citations. Full case timeline with officer notes and evidence.', capabilities:['Bulk case assignment','SLA tracker','Notice generator','Property drilldown','Officer performance','Case escalation'] },
    { id:'officer', title:'Taskforce Officer', subtitle:'Field Operations', color:C.amber, description:"The entire officer interface lives in a phone frame. Risk-ranked route, GPS inspection checklist, QR scanner, offline queue, shift handover report — all on a low-end Android phone.", capabilities:['Risk-ranked route','Inspection checklist','QR card scanner','Offline sync','GPS evidence','Shift handover'] },
    { id:'landlord', title:'Landlord', subtitle:'Registered Property Owner', color:'#C8E830', description:"Compliance score with an itemized action plan. Step-by-step property registration. Rent card issuance with advance compliance check. Tax summary with GRA income breakdown.", capabilities:['Compliance score','Action plan','Property registration','Rent card issuance','Tax summary','Tenancy renewal'] },
    { id:'tenant', title:'Tenant', subtitle:'Every Renter in Ghana', color:C.red, description:"Verify your rent card. File a complaint. Track it in real time. Know when eviction threats are illegal. Get legal aid contacts. Access everything by dialling *714*1# — no smartphone needed.", capabilities:['Card verification','Complaint tracker','Eviction alerts','Legal aid directory','USSD access','Payment receipts'] },
  ];
  const active = roles[activeRole];

  if (mob) return (
    <section ref={ref} id="who-its-for" style={{ background: C.deep, padding: '72px 20px' }}>
      <div style={{ marginBottom: 16 }}><span className="tag">Five Roles. One System.</span></div>
      <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 52, color: C.t1, letterSpacing: '-1px', lineHeight: 0.95, marginBottom: 28 }}>
        Designed for every<br /><span style={{ color: C.lime }}>person in the chain</span>
      </h2>
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, marginBottom: 20, WebkitOverflowScrolling: 'touch' }}>
        {roles.map((role, i) => (
          <button key={i} onClick={() => setActiveRole(i)} aria-label={`View ${role.title} details`}
            style={{ flexShrink: 0, padding: '10px 14px', borderRadius: 20, background: activeRole === i ? `${role.color}20` : 'transparent', border: `1px solid ${activeRole === i ? role.color + '60' : C.border}`, fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600, color: activeRole === i ? role.color : C.t3, cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap', minHeight: 44 }}>
            {role.title}
          </button>
        ))}
      </div>
      <div key={activeRole} className="fade-up" style={{ background: C.card, border: `1px solid ${active.color}30`, borderRadius: 14, padding: '20px 18px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: `${active.color}08`, filter: 'blur(24px)', pointerEvents: 'none' }} />
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: active.color, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 }}>{active.subtitle}</div>
        <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: C.t1, lineHeight: 1, marginBottom: 12 }}>{active.title}</h3>
        <p style={{ fontSize: 14, color: C.t2, lineHeight: 1.7, marginBottom: 18 }}>{active.description}</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {active.capabilities.map((cap, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 12px', background: `${active.color}08`, border: `1px solid ${active.color}18`, borderRadius: 7 }}>
              <span style={{ color: active.color, fontSize: 10, fontWeight: 700, flexShrink: 0 }}>✓</span>
              <span style={{ fontSize: 12, color: C.t1, fontWeight: 500 }}>{cap}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <section ref={ref} className="section" id="who-its-for" style={{ background: C.deep }}>
      <div className="container">
        <div style={{ marginBottom: 56 }}>
          <span className="tag" style={{ marginBottom: 16, display: 'inline-flex' }}>Five Roles. One System.</span>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(52px, 6vw, 80px)', color: C.t1, letterSpacing: '-1px', lineHeight: 0.95 }}>
            Designed for every<br /><span style={{ color: C.lime }}>person in the chain</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {roles.map((role, i) => (
              <button key={i} onClick={() => setActiveRole(i)} aria-label={`View ${role.title} details`}
                style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 16px', background:activeRole===i?`${role.color}12`:'transparent', border:`1px solid ${activeRole===i?role.color+'40':'transparent'}`, borderRadius:10, cursor:'pointer', textAlign:'left', transition:'all 0.2s' }}>
                <div style={{ width:36, height:36, borderRadius:8, background:`${role.color}20`, border:`1.5px solid ${role.color}40`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'JetBrains Mono', monospace", fontSize:10, fontWeight:700, color:role.color, flexShrink:0 }}>
                  {role.title.split(' ').map(w=>w[0]).join('').slice(0,2)}
                </div>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:activeRole===i?C.t1:C.t2 }}>{role.title}</div>
                  <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:9, color:activeRole===i?role.color:C.t4, letterSpacing:0.5 }}>{role.subtitle}</div>
                </div>
              </button>
            ))}
          </div>
          <div key={activeRole} className="fade-up" style={{ background:C.card, border:`1px solid ${active.color}30`, borderRadius:16, padding:36, position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:-40, right:-40, width:200, height:200, borderRadius:'50%', background:`${active.color}08`, filter:'blur(40px)', pointerEvents:'none' }} />
            <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:10, color:active.color, letterSpacing:2, textTransform:'uppercase', marginBottom:10 }}>{active.subtitle}</div>
            <h3 style={{ fontFamily:"'Bebas Neue', sans-serif", fontSize:48, color:C.t1, letterSpacing:'-0.5px', lineHeight:1, marginBottom:18 }}>{active.title}</h3>
            <p style={{ fontSize:16, color:C.t2, lineHeight:1.75, marginBottom:28, maxWidth:500 }}>{active.description}</p>
            <div className="rg-role-caps" style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:10 }}>
              {active.capabilities.map((cap, i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 14px', background:`${active.color}08`, border:`1px solid ${active.color}20`, borderRadius:8 }}>
                  <span style={{ color:active.color, fontSize:10, fontWeight:700 }}>✓</span>
                  <span style={{ fontSize:13, color:C.t1, fontWeight:500 }}>{cap}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ── TERMINAL — consolidated into ProductTour ────────────────────────────────
// [Terminal now lives in ProductTour's System Log tab]
// ── USSD — consolidated into ProductTour ────────────────────────────────────
// [USSD now lives in ProductTour's USSD Access tab]

// ── MOBILE APP SECTION — Visual showcase ────────────────────────────────────
const MobileSection = () => {
  const [ref, visible] = useVisible();
  const mob = useMobile();
  const [activeScreen, setActiveScreen] = useState(0);
  const screens = [
    { label: "Today's Shift", description: "Route progress, shift timeline, priority alerts", color: C.amber },
    { label: "Inspection Checklist", description: "8-item PNDCL 138 checklist, GPS-stamped evidence", color: C.green },
    { label: "QR Scanner", description: "Instant rent card verification, violation detection", color: C.lime },
    { label: "Map View", description: "Risk-ranked properties, GPS position, priority route", color: C.blue },
  ];

  if (mob) return (
    <section ref={ref} id="field-app" style={{ background: C.ink, padding: '72px 20px', overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', bottom: -20, left: -10, fontFamily: "'Bebas Neue', sans-serif", fontSize: '40vw', color: C.forest, lineHeight: 1, pointerEvents: 'none', userSelect: 'none', letterSpacing: '-4px', opacity: 0.6 }}>FIELD</div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <span className="tag tag-lime" style={{ marginBottom: 16, display: 'inline-flex' }}>Taskforce Mobile App</span>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 52, color: C.t1, letterSpacing: '-0.5px', lineHeight: 0.95, marginBottom: 16 }}>
          Android-first.<br />Offline-capable.<br /><span style={{ color: C.lime }}>GPS-native.</span>
        </h2>
        <p style={{ fontSize: 14, color: C.t2, lineHeight: 1.7, marginBottom: 24 }}>Officers inspect properties, file violations, capture GPS evidence, and scan QR cards — even without signal. Everything syncs on reconnect.</p>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, marginBottom: 24, WebkitOverflowScrolling: 'touch' }}>
          {screens.map((s, i) => (
            <button key={i} onClick={() => setActiveScreen(i)} aria-label={`View ${s.label} screen`}
              style={{ flexShrink: 0, padding: '9px 14px', borderRadius: 20, background: activeScreen === i ? `${s.color}20` : 'transparent', border: `1px solid ${activeScreen === i ? s.color+'50' : C.border}`, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: activeScreen === i ? s.color : C.t3, cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap', minHeight: 44 }}>
              {s.label}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <PhoneMockup activeScreen={activeScreen} screens={screens} compact />
        </div>
      </div>
    </section>
  );

  return (
    <section ref={ref} id="field-app" className="section" style={{ background: C.ink, position: 'relative', overflow: 'hidden' }}>
      <div className="noise-overlay" />
      <div style={{ position: 'absolute', bottom: -20, left: 0, fontFamily: 'Bebas Neue', fontSize: '20vw', color: C.forest, lineHeight: 1, pointerEvents: 'none', userSelect: 'none', letterSpacing: '-4px' }}>FIELD</div>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <span className="tag tag-lime" style={{ marginBottom: 20, display: 'inline-flex' }}>Taskforce Mobile App</span>
            <h2 style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(44px, 5vw, 72px)', color: C.t1, letterSpacing: '-0.5px', lineHeight: 0.95, marginBottom: 24 }}>
              Android-first.<br />Offline-capable.<br /><span style={{ color: C.lime }}>GPS-native.</span>
            </h2>
            <p style={{ fontSize: 16, color: C.t2, lineHeight: 1.75, marginBottom: 36 }}>Built for the field, not the office. Officers inspect properties, file violations, capture GPS evidence, and run QR card verifications — even when there's no signal.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {screens.map((s, i) => (
                <button key={i} onClick={() => setActiveScreen(i)} aria-label={`View ${s.label} screen`}
                  style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', background: activeScreen === i ? `${s.color}12` : 'transparent', border: `1px solid ${activeScreen === i ? s.color + '40' : C.border}`, borderRadius: 10, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, flexShrink: 0, ...(activeScreen === i ? { animation: 'pulse 2s infinite' } : {}) }} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: activeScreen === i ? C.t1 : C.t2 }}>{s.label}</div>
                    <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: activeScreen === i ? s.color : C.t4 }}>{s.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="fade-up-2" style={{ display: 'flex', justifyContent: 'center' }}>
            <PhoneMockup activeScreen={activeScreen} screens={screens} />
          </div>
        </div>
      </div>
    </section>
  );
};

// ── PHONE MOCKUP ───────────────────────────────────────────────────────────
const PhoneMockup = ({ activeScreen, screens, compact = false }) => {
  const screenContent = [
    <div key="shift" style={{ padding: 14, height: '100%', display: 'flex', flexDirection: 'column', gap: 10, overflow: 'hidden' }}>
      <div style={{ fontFamily: 'JetBrains Mono', fontSize: 8, color: '#536358' }}>Mon 16 Mar · Shift: 08:30-16:00</div>
      <div style={{ background: '#111916', borderRadius: 8, padding: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#E8F0EB' }}>Route Progress</span>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#0FA86A' }}>3 / 8</span>
        </div>
        <div style={{ height: 5, background: '#243628', borderRadius: 3, overflow: 'hidden' }}><div style={{ height: '100%', width: '37.5%', background: '#0FA86A', borderRadius: 3 }} /></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 10 }}>
          {[['3','Inspected','#0FA86A'],['2','Violations','#E5483A']].map(([v,l,c]) => (
            <div key={l}><div style={{ fontFamily: 'JetBrains Mono', fontSize: 16, color: c }}>{v}</div><div style={{ fontSize: 8, color: '#536358' }}>{l}</div></div>
          ))}
        </div>
      </div>
      <div style={{ background: 'rgba(229,72,58,0.08)', border: '1px solid rgba(229,72,58,0.2)', borderLeft: '3px solid #E5483A', borderRadius: 6, padding: '10px 12px' }}>
        <div style={{ fontFamily: 'JetBrains Mono', fontSize: 8, color: '#E5483A', marginBottom: 4 }}>NEXT PRIORITY</div>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#E8F0EB' }}>22 Dzorwulu Crescent</div>
        <div style={{ fontFamily: 'JetBrains Mono', fontSize: 8, color: '#536358', marginTop: 2 }}>RISK 96 · 12 units · 0 rent cards</div>
      </div>
      {[['09:33','Inspection complete','#0FA86A'],['09:31','3 violations filed','#E5483A'],['09:05','P-004 compliant','#0FA86A']].map(([t,l,c]) => (
        <div key={t} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: c, marginTop: 3, flexShrink: 0 }} />
          <div><div style={{ fontFamily: 'JetBrains Mono', fontSize: 8, color: '#536358' }}>{t}</div><div style={{ fontSize: 10, color: '#8FA898' }}>{l}</div></div>
        </div>
      ))}
    </div>,
    <div key="check" style={{ padding: 14, overflow: 'hidden' }}>
      <div style={{ fontFamily: 'JetBrains Mono', fontSize: 8, color: '#0FA86A', marginBottom: 8 }}>14 Osu Ako-Adjei Ave · RISK 87</div>
      <div style={{ fontFamily: 'JetBrains Mono', fontSize: 8, color: '#536358', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Compliance Checklist</div>
      {[['Rent card posted',true,'Act 220 s.20'],['Written agreement',false,'PNDCL 138 s.4'],['MMDA registration',false,'PNDCL 138 s.5'],['Advance <= 6mo',false,'Act 220 s.16'],['Habitable condition',true,'Act 220 s.17'],['No intimidation',true,null]].map(([label,pass,law],i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0', borderBottom: '1px solid rgba(36,54,40,0.4)' }}>
          <div style={{ width: 14, height: 14, borderRadius: 3, background: pass ? 'rgba(15,168,106,0.2)' : 'rgba(229,72,58,0.2)', border: `1.5px solid ${pass ? '#0FA86A' : '#E5483A'}`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 8, color: pass ? '#0FA86A' : '#E5483A' }}>{pass ? String.fromCharCode(10003) : String.fromCharCode(10007)}</span>
          </div>
          <div style={{ flex: 1 }}><div style={{ fontSize: 10, color: '#E8F0EB' }}>{label}</div>{law && <div style={{ fontFamily: 'JetBrains Mono', fontSize: 7, color: '#536358' }}>{law}</div>}</div>
        </div>
      ))}
      <div style={{ marginTop: 10, padding: '8px 10px', background: 'rgba(229,72,58,0.08)', border: '1px solid rgba(229,72,58,0.2)', borderRadius: 6 }}>
        <div style={{ fontFamily: 'JetBrains Mono', fontSize: 8, color: '#E5483A' }}>3 violations - case auto-generated</div>
      </div>
    </div>,
    <div key="qr" style={{ padding: 14 }}>
      <div style={{ fontFamily: 'JetBrains Mono', fontSize: 8, color: '#536358', letterSpacing: 1, marginBottom: 10 }}>QR CARD SCANNER</div>
      <div style={{ position: 'relative', height: 160, background: '#050a06', borderRadius: 8, border: '1px solid #243628', overflow: 'hidden', marginBottom: 12 }}>
        {[{top:12,left:12},{top:12,right:12},{bottom:12,left:12},{bottom:12,right:12}].map((pos,i) => (
          <div key={i} style={{ position:'absolute',width:20,height:20,...pos,borderTop:pos.top!==undefined?'2px solid #B8F73C':'none',borderBottom:pos.bottom!==undefined?'2px solid #B8F73C':'none',borderLeft:pos.left!==undefined?'2px solid #B8F73C':'none',borderRight:pos.right!==undefined?'2px solid #B8F73C':'none' }} />
        ))}
        <div style={{ position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:8 }}>
          <span style={{ fontFamily:'JetBrains Mono',fontSize:8,color:'#536358' }}>SCANNING...</span>
        </div>
        <div style={{ position:'absolute',bottom:0,left:0,right:0,height:2,background:'#B8F73C',opacity:0.6,animation:'scanline 2s linear infinite' }} />
      </div>
      <div style={{ background:'rgba(15,168,106,0.1)',border:'1px solid rgba(15,168,106,0.3)',borderRadius:6,padding:'10px 12px' }}>
        <div style={{ fontFamily:'JetBrains Mono',fontSize:9,color:'#0FA86A',fontWeight:700,marginBottom:4 }}>VERIFIED</div>
        <div style={{ fontSize:10,color:'#8FA898' }}>14 Osu Ako-Adjei Ave</div>
        <div style={{ fontFamily:'JetBrains Mono',fontSize:8,color:'#E5483A',marginTop:3 }}>VIOLATION: Advance 9.5mo</div>
      </div>
    </div>,
    <div key="map" style={{ padding: 14 }}>
      <div style={{ fontFamily:'JetBrains Mono',fontSize:8,color:'#536358',letterSpacing:1,marginBottom:10 }}>AYAWASO EAST</div>
      <div style={{ height:180,background:'#050a06',borderRadius:8,border:'1px solid #243628',position:'relative',overflow:'hidden',marginBottom:10 }}>
        {[{x:'18%',y:'15%',r:96,c:'#E5483A'},{x:'48%',y:'30%',r:87,c:'#E5483A'},{x:'72%',y:'15%',r:73,c:'#E8900A'},{x:'30%',y:'55%',r:42,c:'#E8900A'},{x:'58%',y:'65%',r:12,c:'#0FA86A'}].map((p,i)=>(
          <div key={i} style={{ position:'absolute',left:p.x,top:p.y }}><div style={{ width:18,height:18,borderRadius:'50%',background:p.c,border:'2px solid rgba(255,255,255,0.3)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'JetBrains Mono',fontSize:7,color:'#fff',fontWeight:700 }}>{p.r}</div></div>
        ))}
        <div style={{ position:'absolute',left:'33%',top:'60%',width:10,height:10,borderRadius:'50%',background:'#B8F73C',border:'2px solid #fff' }} />
      </div>
      {[['01','22 Dzorwulu','96'],['02','14 Osu Ave','87'],['03','19 Spintex','73']].map(([n,a,r])=>(
        <div key={n} style={{ display:'flex',justifyContent:'space-between',padding:'5px 0',borderBottom:'1px solid rgba(36,54,40,0.3)' }}>
          <div style={{ display:'flex',gap:6 }}><span style={{ fontFamily:'JetBrains Mono',fontSize:8,color:'#536358' }}>{n}</span><span style={{ fontSize:9,color:'#8FA898' }}>{a}</span></div>
          <span style={{ fontFamily:'JetBrains Mono',fontSize:8,color:parseInt(r)>=70?'#E5483A':'#E8900A',fontWeight:700 }}>{r}</span>
        </div>
      ))}
    </div>,
  ];

  return (
    <div className="float-2" style={{ position: 'relative' }}>
      <div style={{ width: 260, background: '#060D08', borderRadius: 36, border: '2px solid #1E3023', boxShadow: '0 40px 100px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.04)', overflow: 'hidden' }}>
        <div style={{ height: 28, background: C.ink, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: 80, height: 12, background: '#0A130C', borderRadius: 8 }} /></div>
        <div style={{ height: 24, background: C.card, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px' }}>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: 9, color: '#536358' }}>09:42</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><div style={{ width: 6, height: 6, borderRadius: '50%', background: '#0FA86A', animation: 'pulse 2s infinite' }} /><span style={{ fontFamily: 'JetBrains Mono', fontSize: 8, color: '#0FA86A' }}>SYNC</span></div>
        </div>
        <div style={{ minHeight: 400, background: C.deep, overflow: 'hidden', transition: 'all 0.3s' }}>{screenContent[activeScreen]}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', background: C.card, borderTop: `1px solid ${C.border}` }}>
          {[['\u25FC','Today',0],['\u2B21','Inspect',1],['\u25C8','Scan',2],['\u25CE','Map',3]].map(([ic,lbl,idx]) => (
            <button key={lbl} aria-label={lbl} style={{ display:'flex',flexDirection:'column',alignItems:'center',gap:2,padding:'8px 0',background:'transparent',border:'none',cursor:'pointer',minHeight:44 }}>
              <span style={{ fontSize:12,color:idx===activeScreen?screens[activeScreen].color:'#536358' }}>{ic}</span>
              <span style={{ fontFamily:'JetBrains Mono',fontSize:7,color:idx===activeScreen?screens[activeScreen].color:'#536358' }}>{lbl}</span>
            </button>
          ))}
        </div>
        <div style={{ height: 20, background: C.card, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: 80, height: 4, background: C.border, borderRadius: 2 }} /></div>
      </div>
      {!compact && (
        <div className="float-3" style={{ position: 'absolute', right: -60, top: 80, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: '10px 14px', width: 180, boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.red, marginTop: 3, animation: 'pulse 2s infinite', flexShrink: 0 }} />
            <div><div style={{ fontFamily: 'JetBrains Mono', fontSize: 8, color: C.red, marginBottom: 3 }}>NEW VIOLATION</div><div style={{ fontSize: 10, color: C.t2, lineHeight: 1.4 }}>9.5mo advance - Act 220</div></div>
          </div>
        </div>
      )}
      {!compact && (
        <div className="float" style={{ position: 'absolute', left: -70, bottom: 100, background: C.surface, border: `1px solid ${C.green}30`, borderRadius: 10, padding: '10px 14px', width: 140, boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 22, fontWeight: 700, color: C.green, lineHeight: 1 }}>96</div>
          <div style={{ fontSize: 10, color: C.t2, marginTop: 4 }}>Risk Score</div>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 8, color: C.red }}>HIGH PRIORITY</div>
        </div>
      )}
    </div>
  );
};

// ── SECURITY SECTION ────────────────────────────────────────────────────────
const SecuritySection = () => {
  const [ref, visible] = useVisible();
  const mob = useMobile();
  const [active, setActive] = useState(0);
  const items = [
    { num: '01', title: 'SHA-256 Evidence Hashing', body: 'Every payment record, photo, and case note is hashed at entry. The hash cannot be altered — any tampering changes the value and triggers an audit alert. Court-admissible by design.', color: C.lime, tag: 'Cryptographic Proof' },
    { num: '02', title: 'Immutable Audit Log', body: 'Every action — status change, file upload, login, export — is logged with actor, timestamp, entity, and detail. Nothing can be deleted. The record of enforcement is permanent.', color: C.green, tag: 'Full Traceability' },
    { num: '03', title: 'Role-Based Access Control', body: 'Tenants cannot see officer routes. Landlords cannot see other landlords. National admins can see everything. Row-level security enforced at the database level, not just the UI.', color: C.blue, tag: 'Zero Trust' },
    { num: '04', title: 'Act 220 & PNDCL 138 Compliance', body: 'Every form, calculation, and notice is legally grounded. Advance caps, registration deadlines, eviction grounds, and court processes are all modelled from the actual statutes.', color: C.amber, tag: 'Statute-Native' },
    { num: '05', title: 'Offline-Safe Evidence Collection', body: 'Evidence collected while offline is stored locally with GPS coordinates and device timestamp. Sync is atomic — partial syncs are rejected. The audit chain is never broken.', color: C.red, tag: 'Field-Grade' },
    { num: '06', title: 'Data Protection Act Compliant', body: "Designed for Ghana's Data Protection Commission registration. PII is handled per the Data Protection Act 2012. Tenant data is never exposed to landlords. Evidence is access-controlled.", color: '#9B59B6', tag: 'DPC Ghana' },
  ];
  const cur = items[active];

  if (mob) return (
    <section ref={ref} id="security" style={{ background: C.ink, padding: '72px 20px' }}>
      <span className="tag" style={{ marginBottom: 16, display: 'inline-flex' }}>Security & Legal</span>
      <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 52, color: C.t1, letterSpacing: '-0.5px', lineHeight: 0.95, marginBottom: 24 }}>
        Built for<br /><span style={{ color: cur.color, transition: 'color 0.4s' }}>government-grade</span><br />trust
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {items.map((item, i) => (
          <div key={i} onClick={() => setActive(active === i ? -1 : i)} role="button" aria-label={`Toggle ${item.title} details`} aria-expanded={active === i}
            style={{ padding: '16px 0', borderBottom: `1px solid ${C.border}`, cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: active === i ? item.color : C.t4, fontWeight: 700, width: 24 }}>{item.num}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: active === i ? C.t1 : C.t2 }}>{item.title}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: active === i ? item.color : C.t4, letterSpacing: 1, textTransform: 'uppercase' }}>{item.tag}</div>
                </div>
              </div>
              <span style={{ color: C.t3, fontSize: 12, transform: active === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>↓</span>
            </div>
            {active === i && <p style={{ fontSize: 13, color: C.t2, lineHeight: 1.7, marginTop: 12, paddingLeft: 12, borderLeft: `2px solid ${item.color}30` }}>{item.body}</p>}
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <section ref={ref} className="section" id="security" style={{ background: C.ink, position: 'relative', overflow: 'hidden' }}>
      <div className="rg-security-bg-num" style={{ position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)', fontFamily: 'Bebas Neue', fontSize: '28vw', color: C.forest, lineHeight: 1, pointerEvents: 'none', userSelect: 'none', letterSpacing: '-8px', opacity: 0.6 }}>{cur.num}</div>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="rg-section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 72 }}>
          <div>
            <span className="tag" style={{ marginBottom: 16, display: 'inline-flex' }}>Security & Legal</span>
            <h2 style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(52px,5.5vw,80px)', color: C.t1, letterSpacing: '-0.5px', lineHeight: 0.92 }}>
              Built for<br /><span style={{ color: cur.color, transition: 'color 0.4s' }}>government-grade</span><br />trust
            </h2>
          </div>
          <p className="hide-mobile" style={{ fontSize: 15, color: C.t2, lineHeight: 1.75, maxWidth: 320, textAlign: 'right', paddingBottom: 8 }}>Every security decision was made with the courtroom in mind. Evidence that holds. Logs that last.</p>
        </div>
        <div className="rg-security-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <div style={{ borderRight: `1px solid ${C.border}` }}>
            {items.map((item, i) => (
              <div key={i} className={visible ? `fade-up-${Math.min(i+1,6)}` : ''} onClick={() => setActive(i)} role="button" aria-label={`View ${item.title} details`}
                style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '22px 32px 22px 0', borderBottom: `1px solid ${C.border}`, cursor: 'pointer', transition: 'all 0.2s', borderRight: active === i ? `3px solid ${item.color}` : '3px solid transparent', marginRight: -1 }}>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: active === i ? item.color : C.t4, fontWeight: 700, letterSpacing: 1, width: 28, flexShrink: 0, transition: 'color 0.2s' }}>{item.num}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: active === i ? C.t1 : C.t2, transition: 'color 0.2s', marginBottom: 4 }}>{item.title}</div>
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: 9, color: active === i ? item.color : C.t4, letterSpacing: 1, textTransform: 'uppercase', transition: 'color 0.2s' }}>{item.tag}</div>
                </div>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: active === i ? item.color : C.t4, transition: 'all 0.2s', transform: active === i ? 'translateX(4px)' : 'none' }}>→</div>
              </div>
            ))}
          </div>
          <div key={active} className="fade-up" style={{ padding: '0 0 0 52px', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 420 }}>
            <div style={{ width: 40, height: 3, background: cur.color, borderRadius: 2, marginBottom: 28 }} />
            <div style={{ fontFamily: 'Bebas Neue', fontSize: 96, color: `${cur.color}15`, lineHeight: 1, marginBottom: -16, letterSpacing: '-2px', userSelect: 'none' }}>{cur.num}</div>
            <h3 style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(32px,3.5vw,48px)', color: C.t1, lineHeight: 1.05, letterSpacing: '-0.5px', marginBottom: 20 }}>{cur.title}</h3>
            <p style={{ fontSize: 16, color: C.t2, lineHeight: 1.8, marginBottom: 28 }}>{cur.body}</p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: cur.color, animation: 'pulse 2s infinite' }} />
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: cur.color, letterSpacing: 1.5, textTransform: 'uppercase' }}>{cur.tag}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ── FIX 08: IMPACT — formal citation styling, no quotation marks ────────────
const ImpactSection = () => {
  const [ref, visible] = useVisible();
  const mob = useMobile();
  const kpis = [
    { from: '38%', to: '70%', label: 'Tenancy Registration', timeframe: '12 months', color: C.lime },
    { from: '29%', to: '60%', label: 'Rent Card Adoption', timeframe: '12 months', color: C.lime },
    { from: '9.2mo', to: '≤6mo', label: 'Avg Advance Collected', timeframe: 'From enforcement', color: C.lime },
    { from: '0', to: '847', label: 'GRA Records/Month', timeframe: 'Month 1 baseline', color: C.lime },
  ];
  const laws = [
    { cite: 'Act 220 s.16(5)', text: 'No landlord shall demand or receive rent in advance in excess of six months for any one period of occupation.', year: '1963' },
    { cite: 'PNDCL 138 s.4', text: 'Every tenancy agreement shall be in writing and shall be registered with the appropriate Rent and Housing Committee within fourteen days.', year: '1986' },
    { cite: 'PNDCL 138 s.5', text: 'Every landlord shall issue to the tenant a Rent Card showing particulars of the premises and the rent payable.', year: '1986' },
  ];

  if (mob) return (
    <section ref={ref} id="impact" style={{ background: C.deep, padding: '72px 20px' }}>
      <span className="tag tag-lime" style={{ marginBottom: 16, display: 'inline-flex' }}>Projected Impact</span>
      <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 52, color: C.t1, letterSpacing: '-1px', lineHeight: 0.95, marginBottom: 28 }}>
        What enforcement<br /><span style={{ color: C.lime }}>actually looks like</span>
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
        {kpis.map((kpi, i) => (
          <div key={i} className="stat-card" style={{ padding: 16 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.t3, marginBottom: 6 }}>Before</div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, color: C.t3, lineHeight: 1, marginBottom: 4 }}>{kpi.from}</div>
            <div style={{ height: 2, background: `linear-gradient(90deg, ${C.t4}, ${kpi.color})`, marginBottom: 4, borderRadius: 1 }} />
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 34, color: kpi.color, lineHeight: 1, marginBottom: 6 }}>{kpi.to}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.t1, marginBottom: 2 }}>{kpi.label}</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: C.t3 }}>{kpi.timeframe}</div>
          </div>
        ))}
      </div>
      {/* FIX 08: Formal citation styling — no quotation marks */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 18px', boxShadow: `0 0 0 1px ${C.lime}18, 0 0 32px ${C.lime}10` }}>
        {laws.map((law, i) => (
          <div key={i} style={{ paddingBottom: i < 2 ? 16 : 0, marginBottom: i < 2 ? 16 : 0, borderBottom: i < 2 ? `1px solid ${C.border}` : 'none' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.lime, letterSpacing: 1, marginBottom: 6, textTransform: 'uppercase' }}>{law.cite} · {law.year}</div>
            <div style={{ borderLeft: `2px solid ${C.lime}40`, paddingLeft: 12 }}>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400, fontSize: 13, color: C.t2, lineHeight: 1.6, margin: 0 }}>{law.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <section ref={ref} id="impact" className="section" style={{ background: C.deep }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <span className="tag tag-lime" style={{ marginBottom: 16, display: 'inline-flex' }}>Projected Impact</span>
          <h2 style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(52px,6vw,88px)', color: C.t1, letterSpacing: '-1px', lineHeight: 0.95 }}>
            What enforcement<br /><span style={{ color: C.lime }}>actually looks like</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 60 }}>
          {kpis.map((kpi, i) => (
            <div key={i} className={`stat-card ${visible ? `fade-up-${i+1}` : ''}`}>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: C.t3, letterSpacing: 1, marginBottom: 12 }}>Before</div>
              <div style={{ fontFamily: 'Bebas Neue', fontSize: 36, color: C.t3, lineHeight: 1, marginBottom: 6 }}>{kpi.from}</div>
              <div style={{ height: 2, background: `linear-gradient(90deg, ${C.t4}, ${kpi.color})`, marginBottom: 6, borderRadius: 1 }} />
              <div style={{ fontFamily: 'Bebas Neue', fontSize: 48, color: kpi.color, lineHeight: 1, marginBottom: 10 }}>{kpi.to}</div>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: 9, color: kpi.color, letterSpacing: 1, marginBottom: 4, textTransform: 'uppercase' }}>After</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.t1, marginBottom: 4 }}>{kpi.label}</div>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: 9, color: C.t3 }}>{kpi.timeframe}</div>
            </div>
          ))}
        </div>
        {/* FIX 08: Formal legal citation — no quotation marks, left border accent */}
        <div style={{ background: C.card, border: `1px solid ${C.borderL}`, borderRadius: 16, padding: '40px 48px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32, boxShadow: `0 0 0 1px ${C.lime}18, 0 0 32px ${C.lime}10, 0 0 80px ${C.lime}06` }}>
          {laws.map((law, i) => (
            <div key={i}>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: C.lime, letterSpacing: 1, marginBottom: 10, textTransform: 'uppercase' }}>{law.cite} · {law.year}</div>
              <div style={{ borderLeft: `2px solid ${C.lime}50`, paddingLeft: 16 }}>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400, fontSize: 14, color: C.t2, lineHeight: 1.7, margin: 0 }}>{law.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── INTEGRATION STRIP ───────────────────────────────────────────────────────
const IntegrationStrip = () => {
  const [ref, visible] = useVisible();
  const mob = useMobile();
  const [expanded, setExpanded] = useState(false);
  const integrations = [
    { name: 'rentcontrol.mwh.gov.gh', owner: 'Ministry of Works & Housing', desc: 'Bidirectional sync of tenancy registrations and property records with the official national portal.', type: 'Government Portal', color: C.green, status: 'LIVE SYNC' },
    { name: 'Ghana Revenue Authority', owner: 'GRA Tax System', desc: 'Monthly SFTP pipeline of TIN-matched landlord income records and advance violation flags.', type: 'Tax Authority', color: C.lime, status: 'MONTHLY EXPORT' },
    { name: "Africa's Talking", owner: 'USSD + SMS Gateway', desc: 'Powers the *714*1# USSD service and all outbound SMS notifications for cases and card issuance.', type: 'Telecom API', color: C.blue, status: 'ALWAYS ON' },
    { name: 'NIA Ghana Card', owner: 'National ID Authority', desc: 'Ghana Card verification on landlord and tenant registration — confirms legal identity at onboarding.', type: 'Identity', color: C.amber, status: 'ON REGISTRATION' },
    { name: 'MTN / Telecel MoMo', owner: 'Mobile Money', desc: 'Payment confirmation webhooks from MTN and Telecel MoMo. Receipts are hashed and stored on arrival.', type: 'Payments', color: C.amber, status: 'WEBHOOK' },
    { name: 'Meta WhatsApp', owner: 'Cloud API', desc: 'Tenant complaint channel. Complaint messages route directly into the case queue as new submissions.', type: 'Messaging', color: C.blue, status: 'COMPLAINT CHANNEL' },
  ];

  if (mob) return (
    <section ref={ref} style={{ background: C.ink, borderTop: `1px solid ${C.border}`, padding: '72px 20px' }}>
      <span className="tag" style={{ marginBottom: 14, display: 'inline-flex' }}>Connected Infrastructure</span>
      <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, color: C.t1, letterSpacing: '-0.5px', lineHeight: 0.95, marginBottom: 8 }}>
        Plugged into<br /><span style={{ color: C.lime }}>Ghana's systems</span>
      </h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 28 }}>
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: C.green, animation: 'pulse 2s infinite' }} />
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.green }}>6 integrations · All systems nominal</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {integrations.slice(0, expanded ? 6 : 2).map((int, i) => (
          <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: int.color, background: `${int.color}12`, border: `1px solid ${int.color}25`, borderRadius: 4, padding: '3px 8px', letterSpacing: 1, textTransform: 'uppercase' }}>{int.type}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: int.color, animation: 'pulse 2s infinite' }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: C.t3 }}>{int.status}</span>
              </div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.t1, marginBottom: 2 }}>{int.name}</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: int.color, marginBottom: 8 }}>{int.owner}</div>
            <div style={{ height: 1, background: `linear-gradient(90deg, ${int.color}30, transparent)`, marginBottom: 8 }} />
            <p style={{ fontSize: 12, color: C.t2, lineHeight: 1.6, margin: 0 }}>{int.desc}</p>
          </div>
        ))}
      </div>
      <button onClick={() => setExpanded(e => !e)} aria-label={expanded ? 'Show fewer integrations' : 'Show all integrations'}
        style={{ width: '100%', marginTop: 12, padding: '12px', background: 'transparent', border: `1px solid ${C.border}`, borderRadius: 10, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.t2, cursor: 'pointer', letterSpacing: 1, transition: 'all 0.2s', minHeight: 44 }}>
        {expanded ? '↑ SHOW LESS' : `↓ VIEW ${integrations.length - 2} MORE INTEGRATIONS`}
      </button>
    </section>
  );

  return (
    <section ref={ref} className="section" style={{ background: C.ink, borderTop: `1px solid ${C.border}` }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56 }}>
          <div>
            <div style={{ marginBottom: 14 }}><span className="tag">Connected Infrastructure</span></div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(44px,5vw,68px)', color: C.t1, letterSpacing: '-0.5px', lineHeight: 0.95 }}>
              Plugged into<br /><span style={{ color: C.lime }}>Ghana's systems</span>
            </h2>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.t3, marginBottom: 6 }}>6 live integrations</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.green, animation: 'pulse 2s infinite' }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.green }}>All systems nominal</span>
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {integrations.map((int, i) => (
            <div key={i} className={visible ? `fade-up-${Math.min(i+1,6)}` : ''}
              style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: '28px 28px 24px', display: 'flex', flexDirection: 'column', gap: 0, transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)', cursor: 'default' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = int.color + '40'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px ${int.color}18`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: int.color, background: `${int.color}12`, border: `1px solid ${int.color}25`, borderRadius: 4, padding: '3px 8px', letterSpacing: 1, textTransform: 'uppercase' }}>{int.type}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: int.color, animation: 'pulse 2s infinite' }} />
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: C.t3, letterSpacing: 0.5 }}>{int.status}</span>
                </div>
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: C.t1, marginBottom: 4, lineHeight: 1.3 }}>{int.name}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: int.color, marginBottom: 14, letterSpacing: 0.3 }}>{int.owner}</div>
              <div style={{ height: 1, background: `linear-gradient(90deg, ${int.color}30, transparent)`, marginBottom: 14 }} />
              <p style={{ fontSize: 13, color: C.t2, lineHeight: 1.7, margin: 0 }}>{int.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── FIX 09: CTA — differentiated pitch deck button ──────────────────────────
const CTASection = ({ onDemo, onPitchDeck }) => {
  const [ref, visible] = useVisible();
  const mob = useMobile();

  if (mob) return (
    <section ref={ref} id="demo" style={{ background: C.deep, padding: '72px 20px', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 60%, ${C.green}10 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <span className="tag tag-lime" style={{ marginBottom: 20, display: 'inline-flex' }}>Request Access</span>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 52, color: C.t1, letterSpacing: '-1px', lineHeight: 0.9, marginBottom: 20 }}>
          Enforce the law.<br /><span style={{ color: C.lime }}>Protect every tenant.</span><br />Starting now.
        </h2>
        <p style={{ fontSize: 15, color: C.t2, lineHeight: 1.7, marginBottom: 32 }}>RentGuard is production-ready. The enforcement infrastructure Ghana needs is built.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
          <button className="btn-primary" onClick={onDemo} aria-label="Request a demo" style={{ border: 'none', cursor: 'pointer', padding: '16px', fontSize: 15, width: '100%', justifyContent: 'center' }}>Request a Demo →</button>
          <button className="btn-secondary" onClick={onPitchDeck} aria-label="Download pitch deck" style={{ cursor: 'pointer', padding: '15px', fontSize: 15, width: '100%', justifyContent: 'center' }}>Download Pitch Deck ↓</button>
        </div>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[['Act 220','Rent Act 1963'],['PNDCL 138','1986'],['v4.0','Production Ready'],['BRIDGE PBC','Ghana-First']].map(([k,v]) => (
            <div key={k} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: C.lime, letterSpacing: 1 }}>{k}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: C.t3, marginTop: 3 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <section ref={ref} id="demo" className="section" style={{ background: C.deep, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 60%, ${C.green}10 0%, transparent 70%)` }} />
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div style={{ marginBottom: 20 }}><span className="tag tag-lime">Request Access</span></div>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(60px,7vw,110px)', color: C.t1, letterSpacing: '-1px', lineHeight: 0.9, marginBottom: 28 }}>
          Enforce the law.<br /><span style={{ color: C.lime }}>Protect every tenant.</span><br />Starting now.
        </h2>
        <p style={{ fontSize: 18, color: C.t2, maxWidth: 500, margin: '0 auto 48px', lineHeight: 1.7 }}>RentGuard is production-ready. The enforcement infrastructure Ghana needs is built. The next step is yours.</p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
          <button className="btn-primary" onClick={onDemo} aria-label="Request a demo" style={{ padding: '16px 36px', fontSize: 15, border: 'none', cursor: 'pointer' }}>Request a Demo →</button>
          <button className="btn-secondary" onClick={onPitchDeck} aria-label="Download pitch deck" style={{ padding: '15px 35px', fontSize: 15, cursor: 'pointer' }}>Download Pitch Deck ↓</button>
        </div>
        <div style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[['Act 220','Rent Act 1963'],['PNDCL 138','Rent Control Law 1986'],['v4.0','Production Ready'],['BRIDGE PBC','Ghana-First']].map(([k,v]) => (
            <div key={k} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: C.lime, letterSpacing: 1 }}>{k}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.t3, marginTop: 3 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── FIX 10: FOOTER — fixed placeholder Privacy/Terms links ─────────────────
const FooterLink = ({ href, children, mono = false, color = C.t3, external = false }) => (
  <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    style={{ display: 'block', fontFamily: mono ? "'JetBrains Mono', monospace" : "'Space Grotesk', sans-serif", fontSize: mono ? 11 : 13, color, marginBottom: 8, textDecoration: 'none', transition: 'color 0.2s', cursor: 'pointer' }}
    onMouseEnter={e => e.target.style.color = C.t1} onMouseLeave={e => e.target.style.color = color}>{children}</a>
);

const Footer = () => {
  const mob = useMobile();

  if (mob) return (
    <footer style={{ background: C.card, borderTop: `1px solid ${C.border}`, padding: '40px 16px 28px', width: '100%' }}>
      <div style={{ marginBottom: 28 }}>
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, textDecoration: 'none' }}>
          <div style={{ width: 26, height: 26, borderRadius: 6, background: `linear-gradient(135deg, ${C.lime}, ${C.green})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <div style={{ width: 13, height: 13, border: `2px solid ${C.ink}`, borderRadius: 3 }} />
          </div>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15, color: C.t1 }}>RentGuard Ghana</span>
        </a>
        <p style={{ fontSize: 13, color: C.t3, lineHeight: 1.6, marginBottom: 8 }}>Ghana's Rent Enforcement & Intelligence Platform. Built on Act 220 and PNDCL 138.</p>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.t4 }}>v4.0 · March 2026 · BRIDGE PBC</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 24 }}>
        {[['Platform','#platform'],["Features",'#features'],["Who It's For",'#who-its-for'],['Security','#security'],['rentcontrol.mwh.gov.gh','https://rentcontrol.mwh.gov.gh'],['BRIDGE PBC','https://bridgepbc.com']].map(([label,href]) => (
          <a key={label} href={href} {...(href.startsWith('https') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.t3, textDecoration: 'none', padding: '8px 12px', background: C.surface, borderRadius: 6, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</a>
        ))}
      </div>
      <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <a href="tel:+233302664000" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.green, textDecoration: 'none' }}>0302-664-000</a>
        <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
          <a href="/privacy" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.t4, textDecoration: 'none' }}>Privacy</a>
          <a href="/terms" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.t4, textDecoration: 'none' }}>Terms</a>
          <a href="#security" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.t4, textDecoration: 'none' }}>Security</a>
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.t4, marginTop: 8 }}>© 2026 BRIDGE PBC · RentGuard Ghana</div>
      </div>
    </footer>
  );

  return (
    <footer style={{ background: C.card, borderTop: `1px solid ${C.border}`, padding: '40px 80px 32px', width: '100%' }}>
      <div>
        <div className="rg-footer-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 40, marginBottom: 40 }}>
          <div>
            <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, textDecoration: 'none' }}>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: `linear-gradient(135deg, ${C.lime}, ${C.green})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <div style={{ width: 14, height: 14, border: `2px solid ${C.ink}`, borderRadius: 3 }} />
              </div>
              <span style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 15, color: C.t1 }}>RentGuard</span>
            </a>
            <p style={{ fontSize: 13, color: C.t3, lineHeight: 1.7, marginBottom: 14 }}>Ghana's Rent Enforcement & Intelligence Platform. Built on Act 220 and PNDCL 138.</p>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 9, color: C.t4 }}>v4.0 · March 2026</div>
          </div>
          <div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: C.t3, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 16 }}>Platform</div>
            <FooterLink href="#who-its-for">National Admin</FooterLink>
            <FooterLink href="#who-its-for">Case Management</FooterLink>
            <FooterLink href="#field-app">Taskforce Operations</FooterLink>
            <FooterLink href="#who-its-for">Landlord Portal</FooterLink>
            <FooterLink href="#who-its-for">Tenant Protection</FooterLink>
            <FooterLink href="#product-tour">GRA Integration</FooterLink>
          </div>
          <div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: C.t3, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 16 }}>Legal Basis</div>
            <FooterLink href="https://ghalii.org/akn/gh/act/1963/220/eng@1963-12-31" mono external color={C.t4}>Act 220 — Rent Act 1963</FooterLink>
            <FooterLink href="https://ghalii.org/akn/gh/act/pndcl/1986/138/eng@1986-12-31" mono external color={C.t4}>PNDCL 138 — 1986</FooterLink>
            <FooterLink href="#platform" mono color={C.t4}>April 2026 Mandate</FooterLink>
            <FooterLink href="https://nca.org.gh" mono external color={C.t4}>NCA — *714*1# Shortcode</FooterLink>
            <FooterLink href="https://dataprotection.org.gh" mono external color={C.t4}>DPC Registration</FooterLink>
            <FooterLink href="https://gra.gov.gh" mono external color={C.t4}>GRA Data MOU</FooterLink>
          </div>
          <div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: C.t3, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 16 }}>Contact</div>
            <FooterLink href="https://mwhwr.gov.gh" external color={C.t3}>Ministry of Works & Housing</FooterLink>
            <FooterLink href="https://rentcontrol.mwh.gov.gh" mono external color={C.green}>rentcontrol.mwh.gov.gh ↗</FooterLink>
            <FooterLink href="tel:+233302664000" mono color={C.t3}>0302-664-000</FooterLink>
            <FooterLink href="https://bridgepbc.com" external color={C.t3}>BRIDGE PBC</FooterLink>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: C.lime, marginTop: 4 }}>Ghana-First · Public Benefit</div>
          </div>
        </div>
        <div className="divider" style={{ marginBottom: 24 }} />
        {/* FIX 10: Footer links now point to proper anchors instead of #demo */}
        <div className="rg-footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: C.t4 }}>© 2026 BRIDGE PBC · RentGuard Ghana · Enforcement Intelligence Layer</div>
          <div style={{ display: 'flex', gap: 24 }}>
            <FooterLink href="/privacy" mono color={C.t4}>Privacy Policy</FooterLink>
            <FooterLink href="/terms" mono color={C.t4}>Terms of Service</FooterLink>
            <FooterLink href="#security" mono color={C.t4}>Security</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ── LOGIN MODAL — Supabase passcode validation ─────────────────────────────
const LoginModal = ({ onClose, navigate, onRequestAccess }) => {
  const [name, setName] = useState('');
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);
  useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = ''; }; }, []);

  const submit = async () => {
    if (!passcode.trim()) { setError('Please enter your access code.'); return; }
    setError(''); setLoading(true);
    try {
      const { data, error: rpcError } = await supabase.rpc('validate_founder_code', {
        input_code: passcode.trim().toUpperCase(),
      });
      if (rpcError) throw rpcError;
      if (data) {
        onClose();
        navigate('/apps/rentguard/demo');
      } else {
        setError('Access code not recognised. Please check the code provided to you.');
      }
    } catch (e) {
      console.error('[RentGuard] Code verification failed:', e);
      setError('Unable to verify code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const F = {
    label: { display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: '#9BB8A3', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 7 },
    input: { width: '100%', padding: '12px 14px', background: '#0B1210', border: '1px solid #1E3023', borderRadius: 8, color: '#E8F2EB', fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' },
  };

  return (
    <div onClick={onClose} role="dialog" aria-label="Sign in to demo"
      style={{ position: 'fixed', inset: 0, zIndex: 5000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', background: 'rgba(6,13,8,0.75)' }}>
      {/* FIX 11: Combined className into style animation to avoid overwrite */}
      <div onClick={e => e.stopPropagation()} className="rg-modal"
        style={{ width: '100%', maxWidth: 400, background: '#111A14', border: '1px solid #1E3023', borderRadius: 20, overflow: 'hidden', boxShadow: '0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(184,247,60,0.06)', animation: 'fadeUp 0.4s cubic-bezier(0.22,1,0.36,1) both' }}>
        <div style={{ padding: '28px 28px 0', position: 'relative' }}>
          <button onClick={onClose} aria-label="Close dialog"
            style={{ position: 'absolute', top: 18, right: 18, width: 30, height: 30, borderRadius: '50%', background: '#1E3023', border: 'none', color: '#4E7055', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', minHeight: 30 }}
            onMouseEnter={e => { e.currentTarget.style.background = '#2A4030'; e.currentTarget.style.color = '#E8F2EB'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#1E3023'; e.currentTarget.style.color = '#4E7055'; }}>✕</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 20 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #B8F73C, #0FA86A)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <div style={{ width: 16, height: 16, border: '2.5px solid #060D08', borderRadius: 3 }} />
            </div>
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14, color: '#E8F2EB' }}>RentGuard</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: '#B8F73C', letterSpacing: 1 }}>DEMO ACCESS</div>
            </div>
          </div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 30, color: '#E8F2EB', lineHeight: 1, marginBottom: 8, letterSpacing: '-0.3px' }}>Sign In to Demo</div>
          <p style={{ fontSize: 13, color: '#4E7055', lineHeight: 1.6, marginBottom: 22, paddingRight: 32 }}>Enter the name and passcode provided by your BRIDGE representative.</p>
          <div style={{ height: 1, background: 'linear-gradient(90deg, #B8F73C25, transparent)', marginBottom: 22 }} />
        </div>
        <div style={{ padding: '0 28px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={F.label}>Your Name</label>
            <input value={name} onChange={e => { setName(e.target.value); setError(''); }} placeholder="Ama Antwi" style={F.input}
              onFocus={e => e.target.style.borderColor = '#0FA86A'} onBlur={e => e.target.style.borderColor = '#1E3023'} onKeyDown={e => e.key === 'Enter' && submit()} />
          </div>
          <div>
            <label style={F.label}>Passcode</label>
            <div style={{ position: 'relative' }}>
              <input type={showPass ? 'text' : 'password'} value={passcode} onChange={e => { setPasscode(e.target.value); setError(''); }}
                placeholder="Enter your passcode" style={{ ...F.input, paddingRight: 52 }}
                onFocus={e => e.target.style.borderColor = '#0FA86A'} onBlur={e => e.target.style.borderColor = '#1E3023'} onKeyDown={e => e.key === 'Enter' && submit()} />
              <button onClick={() => setShowPass(s => !s)} aria-label={showPass ? 'Hide passcode' : 'Show passcode'}
                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: '#4E7055', cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 1, fontWeight: 700, minHeight: 20 }}>
                {showPass ? 'HIDE' : 'SHOW'}
              </button>
            </div>
          </div>
          {error && (
            <div role="alert" style={{ padding: '10px 14px', background: 'rgba(229,72,58,0.08)', border: '1px solid rgba(229,72,58,0.25)', borderRadius: 7, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#E5483A', lineHeight: 1.5 }}>{error}</div>
          )}
          <button onClick={submit} disabled={loading} aria-label={loading ? 'Verifying credentials' : 'Access demo'}
            style={{ width: '100%', padding: '13px', background: loading ? '#1E3023' : '#B8F73C', color: loading ? '#4E7055' : '#060D08', border: 'none', borderRadius: 9, fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, minHeight: 44 }}>
            {loading ? (<><span style={{ width: 14, height: 14, border: '2px solid #4E7055', borderTopColor: '#9BB8A3', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />Verifying…</>) : 'Access Demo →'}
          </button>
          <div style={{ textAlign: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#2A4030', lineHeight: 1.6 }}>
            Don't have a passcode?{' '}
            <span style={{ color: '#0FA86A', cursor: 'pointer', textDecoration: 'underline', textDecorationStyle: 'dotted' }} onClick={() => { onClose(); if (onRequestAccess) onRequestAccess(); }}>Request access →</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// NEW COMPONENTS — Fortune 500 upgrade
// ═══════════════════════════════════════════════════════════════════════════

// ── 1. LOGO BAR — Institutional trust signals ──────────────────────────────
const CredibilityStrip = () => {
  const mob = useMobile();
  const badges = [
    { label: 'Built for', value: 'Ministry of Works & Housing', color: C.green },
    { label: 'Aligned with', value: 'April 2026 Rent Card Mandate', color: C.lime },
    { label: 'Legal basis', value: 'Act 220 · PNDCL 138', color: C.amber },
    { label: 'Developed by', value: 'BRIDGE PBC · Ghana-First', color: C.t1 },
  ];

  if (mob) return (
    <div style={{ borderBottom: `1px solid ${C.border}`, background: C.deep, padding: '20px 16px', width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {badges.map((b, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: C.t4, letterSpacing: 1, textTransform: 'uppercase', flexShrink: 0 }}>{b.label}</span>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600, color: b.color }}>{b.value}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ borderBottom: `1px solid ${C.border}`, background: C.deep, padding: '18px 80px', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 48, flexWrap: 'wrap' }}>
        {badges.map((b, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexShrink: 0 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.t4, letterSpacing: 1, textTransform: 'uppercase' }}>{b.label}</span>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: b.color }}>{b.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── 2. HOW IT WORKS — 4-step enforcement lifecycle ─────────────────────────
const HowItWorks = () => {
  const [ref, visible] = useVisible();
  const mob = useMobile();

  const steps = [
    {
      num: '01', title: 'Complaint Filed',
      desc: 'Via web portal, USSD (*714*1#), WhatsApp, or field inspection. Every channel feeds the same queue.',
      icon: '◎', color: C.lime,
    },
    {
      num: '02', title: 'Case Created & Assigned',
      desc: 'Auto-classified by violation type. SLA deadline set. Nearest available officer notified instantly.',
      icon: '▤', color: C.lime,
    },
    {
      num: '03', title: 'Officer Dispatched',
      desc: 'GPS-routed inspection. PNDCL 138 checklist completed. Evidence captured and hashed on-device.',
      icon: '⬡', color: C.lime,
    },
    {
      num: '04', title: 'Resolved & Logged',
      desc: 'Formal notice served. GRA notified. Audit trail sealed with SHA-256. Court-admissible record created.',
      icon: '◈', color: C.lime,
    },
  ];

  if (mob) return (
    <section ref={ref} id="how-it-works" style={{ background: C.deep, padding: '72px 20px', position: 'relative' }}>
      <div className="noise-overlay" />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <span className="tag tag-green" style={{ marginBottom: 16, display: 'inline-flex' }}>How It Works</span>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, color: C.t1, letterSpacing: '-0.5px', lineHeight: 0.95, marginBottom: 12 }}>
          From complaint to<br /><span style={{ color: C.lime }}>court-ready record</span>
        </h2>
        <p style={{ fontSize: 14, color: C.t2, lineHeight: 1.7, marginBottom: 32 }}>Four steps. Every channel. One auditable enforcement pipeline.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, position: 'relative' }}>
          {/* Vertical connector line */}
          <div style={{ position: 'absolute', left: 19, top: 24, bottom: 24, width: 2, background: `${C.lime}30`, opacity: 0.3 }} />

          {steps.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, padding: '20px 0', position: 'relative' }}>
              {/* Number circle */}
              <div style={{
                width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                background: `${step.color}15`, border: `2px solid ${step.color}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700,
                color: step.color, zIndex: 1,
              }}>
                {step.num}
              </div>
              <div style={{ paddingTop: 4 }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, color: C.t1, marginBottom: 4 }}>{step.title}</div>
                <p style={{ fontSize: 13, color: C.t2, lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <section ref={ref} id="how-it-works" className="section" style={{ background: C.deep, position: 'relative' }}>
      <div className="noise-overlay" />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <span className="tag tag-green" style={{ marginBottom: 16, display: 'inline-flex' }}>How It Works</span>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 5.5vw, 76px)', color: C.t1, letterSpacing: '-0.5px', lineHeight: 0.95, marginBottom: 20 }}>
            From complaint to<br /><span style={{ color: C.lime }}>court-ready record</span>
          </h2>
          <p style={{ fontSize: 17, color: C.t2, maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>Four steps. Every channel. One auditable enforcement pipeline.</p>
        </div>

        {/* Steps grid with connector */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, position: 'relative' }}>
          {/* Horizontal connector line */}
          <div style={{ position: 'absolute', top: 32, left: '8%', right: '8%', height: 2, background: `${C.lime}40`, zIndex: 0 }} />

          {steps.map((step, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 1 }}>
              {/* Number circle */}
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: `${step.color}12`, border: `2px solid ${step.color}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 700,
                color: step.color, marginBottom: 24,
                boxShadow: `0 0 24px ${step.color}15`,
              }}>
                {step.num}
              </div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, fontWeight: 700, color: C.t1, marginBottom: 10, letterSpacing: '-0.2px' }}>{step.title}</div>
              <p style={{ fontSize: 14, color: C.t2, lineHeight: 1.65, margin: 0, maxWidth: 220, padding: '0 8px' }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── 3. ENDORSEMENT QUOTE — Single institutional pull quote ─────────────────
const EndorsementQuote = () => {
  const mob = useMobile();
  return (
    <div style={{ background: C.ink, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: mob ? '48px 16px' : '64px 80px', width: '100%' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ width: 40, height: 2, background: C.lime, borderRadius: 1, margin: '0 auto 28px' }} />
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400,
          fontSize: mob ? 18 : 22, lineHeight: 1.7, color: C.t1,
          fontStyle: 'italic', marginBottom: 24, letterSpacing: '-0.3px',
        }}>
          The Rent Act has been law since 1963. What's been missing is the digital infrastructure to enforce it at national scale. RentGuard changes that equation.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: `${C.green}20`, border: `1.5px solid ${C.green}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: C.green }}>BP</span>
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: C.t1 }}>BRIDGE PBC Research Division</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.t3 }}>Housing & Rental Market Analysis · 2026</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── 4. PRODUCT TOUR — Consolidated Terminal + Mobile + USSD ────────────────
const ProductTour = () => {
  const [ref, visible] = useVisible();
  const mob = useMobile();
  const [activeTab, setActiveTab] = useState(0);
  const [termLines, setTermLines] = useState([]);

  const tabs = [
    { label: 'National Dashboard', shortLabel: 'Dashboard', icon: '▤', color: C.green },
    { label: 'Field App', shortLabel: 'Field', icon: '⬡', color: C.amber },
    { label: 'USSD Access', shortLabel: 'USSD', icon: '◈', color: C.lime },
    { label: 'System Log', shortLabel: 'Log', icon: '◼', color: C.blue },
  ];

  const allTermLines = [
    { text: '> SYSTEM BOOT — RentGuard v4.0', color: C.lime, delay: 0 },
    { text: '> ✓ Portal sync — 15 offices online', color: C.green, delay: 400 },
    { text: '> ✓ 10 regions · 1,482 properties', color: C.green, delay: 800 },
    { text: '> RISK UPDATE: P-003 → 96/100', color: C.red, delay: 1400 },
    { text: '> NEW CASE: Illegal advance', color: C.amber, delay: 2000 },
    { text: '> USSD: *714*1# complaint', color: C.blue, delay: 2600 },
    { text: '> OFFICER: 3 inspections done', color: C.green, delay: 3200 },
    { text: '> GRA FLAG: TIN mismatch', color: C.amber, delay: 3800 },
    { text: '> ALL SYSTEMS NOMINAL ■', color: C.lime, delay: 4400 },
  ];

  useEffect(() => {
    if (!visible || activeTab !== 3) { setTermLines([]); return; }
    const timeouts = allTermLines.map((line) => setTimeout(() => setTermLines(prev => [...prev, line]), line.delay));
    return () => timeouts.forEach(clearTimeout);
  }, [visible, activeTab]);

  // ── Shared content builders ──────────────────────────────────
  const dashKPIs = [
    { val: '312', label: 'Violations', color: C.red },
    { val: '38%', label: 'Registered', color: C.amber },
    { val: '1,482', label: 'Properties', color: C.lime },
    { val: '68', label: 'Compliance', color: C.amber },
  ];
  const cases = [
    { id: 'RC-291', type: 'Illegal Advance (9.5mo)', sev: 'CRITICAL', color: C.red },
    { id: 'RC-290', type: 'No Rent Card', sev: 'HIGH', color: C.red },
    { id: 'RC-289', type: 'Unlawful Eviction', sev: 'HIGH', color: C.red },
    { id: 'RC-288', type: 'Unregistered Tenancy', sev: 'MED', color: C.amber },
  ];
  const checklist = [
    ['Rent card posted', true, 'Act 220 s.20'],
    ['Written agreement', false, 'PNDCL 138 s.4'],
    ['MMDA registration', false, 'PNDCL 138 s.5'],
    ['Advance ≤ 6 months', false, 'Act 220 s.16'],
    ['Habitable condition', true, 'Act 220 s.17'],
  ];

  // ── Tab bar (shared) ─────────────────────────────────────────
  const tabBar = (
    <div style={{ display: 'flex', gap: mob ? 6 : 8, marginBottom: mob ? 16 : 28, overflowX: 'auto', paddingBottom: 4, WebkitOverflowScrolling: 'touch' }}>
      {tabs.map((tab, i) => (
        <button key={i} onClick={() => setActiveTab(i)} aria-label={`View ${tab.label}`}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: mob ? '9px 12px' : '12px 20px', borderRadius: 8, flexShrink: 0,
            background: activeTab === i ? `${tab.color}15` : 'transparent',
            border: `1px solid ${activeTab === i ? tab.color + '50' : C.border}`,
            cursor: 'pointer', transition: 'all 0.2s', minHeight: 44,
          }}>
          <span style={{ fontSize: mob ? 12 : 14, color: activeTab === i ? tab.color : C.t4 }}>{tab.icon}</span>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: mob ? 11 : 13,
            fontWeight: activeTab === i ? 700 : 500,
            color: activeTab === i ? C.t1 : C.t3, whiteSpace: 'nowrap',
          }}>{mob ? tab.shortLabel : tab.label}</span>
        </button>
      ))}
    </div>
  );

  // ── MOBILE RENDER ────────────────────────────────────────────
  if (mob) return (
    <section ref={ref} id="product-tour" style={{ background: C.deep, padding: '72px 20px' }}>
      <span className="tag" style={{ marginBottom: 16, display: 'inline-flex' }}>Product Tour</span>
      <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, color: C.t1, letterSpacing: '-0.5px', lineHeight: 0.95, marginBottom: 8 }}>
        See the platform<br /><span style={{ color: C.lime }}>in action</span>
      </h2>
      <p style={{ fontSize: 14, color: C.t2, lineHeight: 1.7, marginBottom: 24 }}>
        One system, four access points — from the national dashboard to a feature phone in a rural community.
      </p>

      {tabBar}

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: 16, position: 'relative', overflow: 'hidden', minHeight: 280 }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${tabs[activeTab].color}60, transparent)` }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: tabs[activeTab].color, letterSpacing: 1.5, textTransform: 'uppercase' }}>{tabs[activeTab].label}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: tabs[activeTab].color, animation: 'pulse 2s infinite' }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: C.t3 }}>LIVE</span>
          </div>
        </div>

        {/* Dashboard tab — mobile */}
        {activeTab === 0 && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
              {dashKPIs.map((s,i) => (
                <div key={i} style={{ background: '#0A130C', border: `1px solid ${C.border}`, borderRadius: 8, padding: 12 }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, fontWeight: 700, color: s.color, lineHeight: 1, marginBottom: 3 }}>{s.val}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: C.t3 }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#0A130C', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
              {cases.map((c,i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderBottom: i < cases.length - 1 ? `1px solid ${C.border}40` : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0 }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.green, flexShrink: 0 }}>{c.id}</span>
                    <span style={{ fontSize: 10, color: C.t2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.type}</span>
                  </div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: c.color, fontWeight: 700, flexShrink: 0, marginLeft: 8 }}>{c.sev}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Field tab — mobile */}
        {activeTab === 1 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.amber }}>OFC. MENSAH · AYAWASO EAST</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: C.green, animation: 'pulse 2s infinite' }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: C.green }}>GPS</span>
              </div>
            </div>
            <div style={{ background: '#0A130C', border: `1px solid ${C.border}`, borderRadius: 8, padding: 12, marginBottom: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.t1, marginBottom: 8 }}>Inspection — 14 Osu Ako-Adjei Ave</div>
              {checklist.map(([label, pass, law], i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', borderBottom: `1px solid ${C.border}30` }}>
                  <div style={{ width: 14, height: 14, borderRadius: 3, background: pass ? `${C.green}20` : `${C.red}20`, border: `1.5px solid ${pass ? C.green : C.red}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: 8, color: pass ? C.green : C.red }}>{pass ? '✓' : '✗'}</span>
                  </div>
                  <span style={{ fontSize: 11, color: C.t1, flex: 1 }}>{label}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 7, color: C.t4, flexShrink: 0 }}>{law}</span>
                </div>
              ))}
            </div>
            <div style={{ background: `${C.red}10`, border: `1px solid ${C.red}25`, borderRadius: 8, padding: '8px 12px' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.red, fontWeight: 700 }}>3 VIOLATIONS — auto-generated case</div>
            </div>
          </div>
        )}

        {/* USSD tab — mobile */}
        {activeTab === 2 && (
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.t3, letterSpacing: 1, marginBottom: 12 }}>NO SMARTPHONE REQUIRED</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
              {[['1','Verify Card'],['2','Complaint'],['3','Check Landlord'],['4','My Rights']].map(([n,desc]) => (
                <div key={n} style={{ padding: '10px 12px', background: '#0A130C', border: `1px solid ${C.border}`, borderRadius: 8 }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.green, marginBottom: 2 }}>Option {n}</div>
                  <div style={{ fontSize: 11, color: C.t1, fontWeight: 600 }}>{desc}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', padding: '16px', background: '#001A00', borderRadius: 8, border: `1px solid ${C.border}` }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#00FF41', marginBottom: 4 }}>Dial from any phone</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: C.lime, letterSpacing: 1 }}>*714*1#</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#007700', marginTop: 4 }}>Feature phone · Smartphone · Borrowed handset</div>
            </div>
          </div>
        )}

        {/* System Log tab — mobile */}
        {activeTab === 3 && (
          <div style={{ background: '#050a06', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ height: 28, background: '#0A130C', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', padding: '0 12px', gap: 6 }}>
              {['#E5483A','#E8900A','#0FA86A'].map((c,i) => <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: c }} />)}
              <span style={{ marginLeft: 6, fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: C.t3 }}>system.log</span>
            </div>
            <div style={{ padding: 12, minHeight: 180, fontFamily: "'JetBrains Mono', monospace", fontSize: 9, lineHeight: 1.8 }}>
              {termLines.map((line, i) => (
                <div key={i} style={{ color: line.color, animation: 'fadeIn 0.3s ease both', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{line.text}</div>
              ))}
              {termLines.length < allTermLines.length && visible && (
                <span style={{ color: C.lime, animation: 'terminalBlink 1s infinite' }}>█</span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom specs — vertical on mobile */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 16 }}>
        {[['Offline-capable','Field-grade sync'],['SHA-256','Court-admissible'],['Multi-channel','Web · USSD · WhatsApp'],['Real-time','Event processing']].map(([k,v],i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '8px 0' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, color: C.t1 }}>{k}</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: C.t4 }}>{v}</span>
          </div>
        ))}
      </div>
    </section>
  );

  // ── DESKTOP RENDER ───────────────────────────────────────────
  return (
    <section ref={ref} id="product-tour" className="section" style={{ background: C.deep, position: 'relative' }}>
      <div className="container">
        <div style={{ marginBottom: 56 }}>
          <span className="tag" style={{ marginBottom: 16, display: 'inline-flex' }}>Product Tour</span>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 5.5vw, 72px)', color: C.t1, letterSpacing: '-0.5px', lineHeight: 0.95, marginBottom: 12 }}>
            See the platform<br /><span style={{ color: C.lime }}>in action</span>
          </h2>
          <p style={{ fontSize: 16, color: C.t2, lineHeight: 1.7, maxWidth: 520 }}>
            One enforcement system, four access points — from the national dashboard to a feature phone in a rural community.
          </p>
        </div>

        {tabBar}

        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 32, position: 'relative', overflow: 'hidden', minHeight: 360 }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${tabs[activeTab].color}60, transparent)` }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: tabs[activeTab].color, letterSpacing: 1.5, textTransform: 'uppercase' }}>{tabs[activeTab].label}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: tabs[activeTab].color, animation: 'pulse 2s infinite' }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.t3 }}>LIVE</span>
            </div>
          </div>

          {/* Dashboard tab — desktop */}
          {activeTab === 0 && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginBottom: 12 }}>
                {dashKPIs.map((s,i) => (
                  <div key={i} style={{ background: '#0A130C', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 16px' }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 22, fontWeight: 700, color: s.color, lineHeight: 1, marginBottom: 4 }}>{s.val}</div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.t3, lineHeight: 1.3 }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: '#0A130C', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                <div style={{ padding: '8px 14px', borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.t2, fontWeight: 700 }}>Recent Cases</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.green }}>LIVE</span>
                </div>
                {[
                  { id: 'RC-291', type: 'Illegal Advance (9.5mo)', sev: 'CRITICAL', color: C.red },
                  { id: 'RC-290', type: 'No Rent Card', sev: 'HIGH', color: C.red },
                  { id: 'RC-289', type: 'Unlawful Eviction Threat', sev: 'HIGH', color: C.red },
                  { id: 'RC-288', type: 'Unregistered Tenancy', sev: 'MEDIUM', color: C.amber },
                  { id: 'RC-287', type: 'No Written Agreement', sev: 'MEDIUM', color: C.amber },
                ].map((c,i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 14px', borderBottom: i < 4 ? `1px solid ${C.border}40` : 'none' }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.green }}>{c.id}</span>
                    <span style={{ fontSize: 11, color: C.t2, flex: 1, marginLeft: 16 }}>{c.type}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: c.color, fontWeight: 700 }}>{c.sev}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Field tab — desktop */}
          {activeTab === 1 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.amber }}>OFC. MENSAH · AYAWASO EAST</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.green, animation: 'pulse 2s infinite' }} />
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.green }}>GPS LOCK</span>
                </div>
              </div>
              <div style={{ background: '#0A130C', border: `1px solid ${C.border}`, borderRadius: 8, padding: 14, marginBottom: 10 }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, color: C.t1, marginBottom: 8 }}>Inspection Checklist — 14 Osu Ako-Adjei Ave</div>
                {checklist.map(([label, pass, law], i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', borderBottom: `1px solid ${C.border}30` }}>
                    <div style={{ width: 16, height: 16, borderRadius: 3, background: pass ? `${C.green}20` : `${C.red}20`, border: `1.5px solid ${pass ? C.green : C.red}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontSize: 9, color: pass ? C.green : C.red }}>{pass ? '✓' : '✗'}</span>
                    </div>
                    <span style={{ fontSize: 12, color: C.t1, flex: 1 }}>{label}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: C.t4 }}>{law}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: `${C.red}10`, border: `1px solid ${C.red}25`, borderRadius: 8, padding: '10px 14px' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.red, fontWeight: 700 }}>3 VIOLATIONS DETECTED — Case RC-2026-ACC-00292 auto-generated</div>
              </div>
            </div>
          )}

          {/* USSD tab — desktop */}
          {activeTab === 2 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'start' }}>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.t3, letterSpacing: 1, marginBottom: 12 }}>ACCESSIBLE ON ANY PHONE · NO DATA REQUIRED</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
                  {[['1','Verify Rent Card'],['2','File Complaint'],['3','Check Landlord'],['4','My Rights']].map(([n,desc]) => (
                    <div key={n} style={{ padding: '12px 14px', background: '#0A130C', border: `1px solid ${C.border}`, borderRadius: 8 }}>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.green, marginBottom: 3 }}>Option {n}</div>
                      <div style={{ fontSize: 12, color: C.t1, fontWeight: 600 }}>{desc}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.t3 }}>
                  Dial <span style={{ color: C.lime, fontWeight: 700, fontSize: 14 }}>*714*1#</span> from any phone — feature phone, smartphone, or borrowed handset.
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: 180, background: '#0A0A0A', borderRadius: 14, border: '2px solid #1A1A1A', overflow: 'hidden' }}>
                  <div style={{ padding: 12, background: '#001A00', minHeight: 160, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#00FF41', lineHeight: 1.8 }}>
                    <div style={{ color: '#00AA2B', marginBottom: 6 }}>CON Ghana Rent Control</div>
                    <div style={{ borderBottom: '1px solid #003300', marginBottom: 6, paddingBottom: 6 }} />
                    <div>1. Verify Rent Card</div><div>2. File Complaint</div><div>3. Check Landlord</div><div>4. My Rights</div>
                    <div style={{ borderTop: '1px solid #003300', marginTop: 8, paddingTop: 6, color: '#007700', fontSize: 9 }}>
                      Enter option: <span style={{ color: '#00FF41', animation: 'terminalBlink 1s infinite' }}>2█</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* System Log tab — desktop */}
          {activeTab === 3 && (
            <div style={{ background: '#050a06', border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ height: 32, background: '#0A130C', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 8 }}>
                {['#E5483A','#E8900A','#0FA86A'].map((c,i) => <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />)}
                <span style={{ marginLeft: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.t3 }}>rentguard.gh — system.log</span>
              </div>
              <div style={{ padding: 16, minHeight: 200, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, lineHeight: 1.8 }}>
                {termLines.map((line, i) => (
                  <div key={i} style={{ color: line.color, animation: 'fadeIn 0.3s ease both' }}>{line.text}</div>
                ))}
                {termLines.length < allTermLines.length && visible && (
                  <span style={{ color: C.lime, animation: 'terminalBlink 1s infinite' }}>█</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom specs */}
        <div style={{ display: 'flex', gap: 32, marginTop: 24, flexWrap: 'wrap' }}>
          {[['Offline-capable','Field-grade sync'],['SHA-256 hashing','Court-admissible'],['Multi-channel','Web · USSD · WhatsApp'],['Real-time','Event processing']].map(([k,v],i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: C.t1 }}>{k}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.t4 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
// ── ROOT RENDER — Restructured for Fortune 500 flow ─────────────────────────
export default function RentGuardLanding() {
  const navigate = useNavigate();
  const [showEngagement, setShowEngagement] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const openEngagement = () => setShowEngagement(true);
  const closeEngagement = () => setShowEngagement(false);
  const openLogin = () => setShowLogin(true);
  const closeLogin = () => setShowLogin(false);

  const handlePitchDeck = () => navigate('/apps/rentguard/pitch');

  return (
    <div id="top" style={{ width: '100%', minWidth: 0, overflowX: 'hidden' }}>
      <GlobalStyles />
      <BRIDGEEngagementModal isOpen={showEngagement} onClose={closeEngagement} intent="connect" />
      {showLogin && <LoginModal onClose={closeLogin} navigate={navigate} onRequestAccess={openEngagement} />}

      {/* ── PAGE FLOW ────────────────────────────────── */}
      <Navbar onDemo={openEngagement} onLogin={openLogin} />
      <Hero onDemo={openEngagement} />
      <CredibilityStrip />
      <ProblemSection />
      <HowItWorks />
      <FeaturesSection />
      <WhoSection />
      <MobileSection />
      <ProductTour />
      <SecuritySection />
      <ImpactSection />
      <EndorsementQuote />
      <IntegrationStrip />
      <CTASection onDemo={openEngagement} onPitchDeck={handlePitchDeck} />
      <Footer />
    </div>
  );
}
