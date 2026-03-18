import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

// ─────────────────────────────────────────────────────────────────────────────
// RENTGUARD GHANA — PRODUCT LANDING PAGE
// Fortune-500 Grade · Editorial Dark · Palantir × Stripe × Bloomberg
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
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=DM+Serif+Display:ital@0;1&display=swap');

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

    /* ── ANIMATIONS ── */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(32px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; } to { opacity: 1; }
    }
    @keyframes scanline {
      0%   { transform: translateY(-100%); }
      100% { transform: translateY(100vh); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0.3; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-12px); }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes countUp {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes borderRotate {
      0%   { background-position: 0% 50%; }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes gridIn {
      from { opacity: 0; transform: scale(0.97); }
      to   { opacity: 1; transform: scale(1); }
    }
    @keyframes terminalBlink {
      0%, 100% { opacity: 1; } 50% { opacity: 0; }
    }
    @keyframes marquee {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    @keyframes dashIn {
      from { stroke-dashoffset: 1000; }
      to   { stroke-dashoffset: 0; }
    }

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

    /* Gradient text */
    .grad-text {
      background: linear-gradient(135deg, ${C.lime} 0%, ${C.green} 60%, ${C.blue} 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .grad-text-warm {
      background: linear-gradient(135deg, #FFD060 0%, ${C.lime} 50%, ${C.green} 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* Section spacing */
    .section { padding: 120px 0; }
    .section-sm { padding: 80px 0; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 40px; }
    .container-wide { max-width: 1400px; margin: 0 auto; padding: 0 40px; }

    /* Grid noise texture overlay */
    .noise-overlay {
      position: absolute;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
      pointer-events: none;
      opacity: 0.4;
    }

    /* Grid lines */
    .grid-bg {
      background-image:
        linear-gradient(${C.border}40 1px, transparent 1px),
        linear-gradient(90deg, ${C.border}40 1px, transparent 1px);
      background-size: 60px 60px;
    }

    /* Tag / pill */
    .tag {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 5px 12px; border-radius: 20px;
      border: 1px solid ${C.border};
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px; letter-spacing: 1px; text-transform: uppercase;
      color: ${C.t3};
    }
    .tag-green {
      border-color: ${C.green}40;
      background: ${C.green}10;
      color: ${C.green};
    }
    .tag-lime {
      border-color: ${C.lime}40;
      background: ${C.lime}08;
      color: ${C.lime};
    }

    /* Stat card */
    .stat-card {
      border: 1px solid ${C.border};
      background: ${C.card};
      border-radius: 12px;
      padding: 28px;
      position: relative;
      overflow: hidden;
      transition: border-color 0.3s, transform 0.3s;
    }
    .stat-card:hover {
      border-color: ${C.borderL};
      transform: translateY(-2px);
    }
    .stat-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, ${C.lime}60, transparent);
    }

    /* Feature card */
    .feat-card {
      border: 1px solid ${C.border};
      background: ${C.card};
      border-radius: 16px;
      padding: 32px;
      transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
      cursor: default;
    }
    .feat-card:hover {
      border-color: ${C.green}40;
      background: ${C.surface};
      transform: translateY(-4px);
      box-shadow: 0 20px 60px rgba(15,168,106,0.08);
    }

    /* Marquee */
    .marquee-track {
      display: flex;
      animation: marquee 30s linear infinite;
      width: max-content;
    }
    .marquee-track:hover { animation-play-state: paused; }

    /* Dashboard mock styles */
    .mock-sidebar { width: 200px; background: ${C.forest}; border-right: 1px solid ${C.border}; flex-shrink: 0; }
    .mock-content { flex: 1; overflow: hidden; }

    /* Glow */
    .glow-green { box-shadow: 0 0 40px ${C.green}20, 0 0 80px ${C.green}08; }
    .glow-lime  { box-shadow: 0 0 40px ${C.lime}20, 0 0 80px ${C.lime}08; }

    /* Button */
    .btn-primary {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 14px 28px; border-radius: 8px;
      background: ${C.lime}; color: ${C.ink};
      font-family: 'Space Grotesk', sans-serif;
      font-size: 14px; font-weight: 700;
      border: none; cursor: pointer;
      transition: all 0.2s;
      text-decoration: none;
    }
    .btn-primary:hover { background: #ceff5a; transform: translateY(-1px); box-shadow: 0 8px 24px ${C.lime}30; }

    .btn-secondary {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 13px 27px; border-radius: 8px;
      background: transparent; color: ${C.t1};
      font-family: 'Space Grotesk', sans-serif;
      font-size: 14px; font-weight: 600;
      border: 1px solid ${C.borderL}; cursor: pointer;
      transition: all 0.2s;
      text-decoration: none;
    }
    .btn-secondary:hover { border-color: ${C.green}; color: ${C.green}; background: ${C.green}08; }

    /* Divider */
    .divider { height: 1px; background: linear-gradient(90deg, transparent, ${C.border}, transparent); }

    /* ── TABLET (≤ 900px) ── */
    @media (max-width: 900px) {
      .container, .container-wide { padding: 0 24px; }
      .section { padding: 80px 0; }
      .hide-mobile { display: none !important; }
    .show-mobile { display: none; }
      /* Hero */
      .rg-hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
      /* 2-col layouts */
      .rg-2col { grid-template-columns: 1fr !important; gap: 48px !important; }
      /* 3-col grid → 2-col */
      .rg-3col { grid-template-columns: 1fr 1fr !important; }
      /* 4-col → 2-col */
      .rg-4col { grid-template-columns: 1fr 1fr !important; }
      /* Who section */
      .rg-who-grid { grid-template-columns: 1fr !important; }
      .rg-role-caps { grid-template-columns: 1fr 1fr !important; }
      /* Security */
      .rg-security-grid { grid-template-columns: 1fr !important; }
      /* Footer */
      .rg-footer-grid { grid-template-columns: 1fr 1fr !important; }
    }

    /* ── MOBILE (≤ 600px) ── */
    @media (max-width: 600px) { .show-mobile { display: block !important; } }
    @media (max-width: 600px) {
      .container, .container-wide { padding: 0 16px; }
      .section { padding: 56px 0; }
      .section-sm { padding: 40px 0; }

      /* Typography scale-down */
      h1 { font-size: clamp(56px, 14vw, 80px) !important; }
      h2 { font-size: clamp(36px, 10vw, 52px) !important; }

      /* Hero */
      .rg-hero-grid { grid-template-columns: 1fr !important; }
      .rg-hero-ctas { flex-direction: column !important; align-items: stretch !important; }
      .rg-hero-ctas .btn-primary,
      .rg-hero-ctas .btn-secondary { width: 100% !important; justify-content: center !important; text-align: center !important; }

      /* Stat ticker — larger font on mobile */
      .rg-ticker-val { font-size: 20px !important; }

      /* All grids → single column */
      .rg-3col,
      .rg-4col,
      .rg-2col,
      .rg-who-grid,
      .rg-security-grid,
      .rg-footer-grid { grid-template-columns: 1fr !important; gap: 14px !important; }

      /* Role capabilities grid */
      .rg-role-caps { grid-template-columns: 1fr 1fr !important; gap: 8px !important; }

      /* Feature card tags — wrap freely */
      .rg-feat-tags { gap: 6px !important; }

      /* Section headers — stack */
      .rg-section-header { flex-direction: column !important; align-items: flex-start !important; gap: 16px !important; }

      /* Terminal — smaller font */
      .rg-terminal { font-size: 10px !important; min-height: 280px !important; }

      /* USSD section inner grid */
      .rg-ussd-grid { grid-template-columns: 1fr 1fr !important; gap: 8px !important; }

      /* Impact KPIs */
      .rg-kpi-grid { grid-template-columns: 1fr 1fr !important; }

      /* Integration grid → 1 col */
      .rg-integration-grid { grid-template-columns: 1fr !important; }

      /* CTA buttons */
      .rg-cta-btns { flex-direction: column !important; align-items: center !important; gap: 12px !important; }
      .rg-cta-btns .btn-primary,
      .rg-cta-btns .btn-secondary { width: 100% !important; max-width: 320px !important; justify-content: center !important; }

      /* Modals — full screen on mobile */
      .rg-modal { max-width: 100% !important; margin: 0 !important; border-radius: 16px 16px 0 0 !important; position: fixed !important; bottom: 0 !important; left: 0 !important; right: 0 !important; }
      .rg-modal-wrap { align-items: flex-end !important; padding: 0 !important; }

      /* Modal form grid */
      .rg-modal-2col { grid-template-columns: 1fr !important; }

      /* Navbar */
      .rg-nav-links { display: none !important; }
      .rg-nav-meta { display: none !important; }

      /* Footer metadata */
      .rg-footer-bottom { flex-direction: column !important; align-items: center !important; text-align: center !important; gap: 16px !important; }

      /* Law citation grid */
      .rg-law-grid { grid-template-columns: 1fr !important; gap: 24px !important; }

      /* iOS input zoom prevention */
      input, select, textarea { font-size: 16px !important; }

      /* Touch targets */
      button, a, .btn-primary, .btn-secondary { min-height: 44px; }

      /* Security section bg number */
      .rg-security-bg-num { font-size: 40vw !important; }

      /* Problem stats */
      .rg-problem-stats { gap: 12px !important; }
      .rg-problem-stat { padding: 16px !important; }
      .rg-problem-num { font-size: 36px !important; }
    }
  `}</style>
);

// ── COUNTER ANIMATION HOOK ─────────────────────────────────────────────────
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

// ── INTERSECTION OBSERVER HOOK ─────────────────────────────────────────────
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

// ── useMobile — JS-based, reliable in all iframe/artifact environments ──────
const useMobile = () => {
  const [mob, setMob] = useState(
    typeof window !== 'undefined' && window.innerWidth <= 768
  );
  useEffect(() => {
    const fn = () => setMob(window.innerWidth <= 768);
    window.addEventListener('resize', fn, { passive: true });
    return () => window.removeEventListener('resize', fn);
  }, []);
  return mob;
};

// ── NAVBAR ─────────────────────────────────────────────────────────────────
const Navbar = ({ onDemo, onLogin }) => {
  const mob = useMobile();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  if (mob) return (
    <nav style={{ position: 'relative', background: C.ink, borderBottom: `1px solid ${C.border}`, padding: '0 20px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 999 }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 28, height: 28, borderRadius: 7, background: `linear-gradient(135deg, ${C.lime}, ${C.green})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 14, height: 14, border: `2.5px solid ${C.ink}`, borderRadius: 3 }} />
        </div>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16 }}>RentGuard</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: C.lime, background: `${C.lime}15`, border: `1px solid ${C.lime}30`, borderRadius: 3, padding: '2px 5px', letterSpacing: 1 }}>GH</span>
      </div>
      {/* Mobile CTA */}
      <button onClick={onLogin}
        style={{ background: C.lime, color: C.ink, border: 'none', padding: '0 10px', borderRadius: 4, fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, cursor: 'pointer', height: 24, minHeight: 0, lineHeight: '24px', display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap', flexShrink: 0, boxSizing: 'content-box' }}>
        Demo →
      </button>
    </nav>
  );

  return (
    <nav style={{ position: 'relative', top: 0, left: 0, right: 0, zIndex: 999, transition: 'all 0.3s', background: C.ink, borderBottom: `1px solid ${C.border}` }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', height: 68, justifyContent: 'space-between', maxWidth: 1400 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${C.lime}, ${C.green})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 16, height: 16, border: `2.5px solid ${C.ink}`, borderRadius: 3 }} />
          </div>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 17, letterSpacing: '-0.3px' }}>RentGuard</span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.lime, background: `${C.lime}15`, border: `1px solid ${C.lime}30`, borderRadius: 4, padding: '2px 6px', letterSpacing: 1 }}>GHANA</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          {[['Platform','#platform'],['Features','#features'],["Who It's For",'#who-its-for'],['Security','#security']].map(([item,href]) => (
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
          <button className="btn-primary" onClick={onLogin} style={{ padding: '9px 20px', fontSize: 13, border: 'none', cursor: 'pointer' }}>
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

  // ── MOBILE HERO ──────────────────────────────────────────────────────────
  if (mob) return (
    <section style={{ background: C.ink, position: 'relative', overflow: 'hidden' }}>
      {/* Grid bg */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${C.border}30 1px, transparent 1px), linear-gradient(90deg, ${C.border}30 1px, transparent 1px)`, backgroundSize: '40px 40px', opacity: 0.5 }} />
      {/* Glow */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 300, height: 300, background: `radial-gradient(ellipse, ${C.green}15 0%, transparent 70%)`, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '40px 20px 0' }}>
        {/* Tag */}
        <div className="fade-up" style={{ marginBottom: 20 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 20, border: `1px solid ${C.green}40`, background: `${C.green}10`, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.green, letterSpacing: 1 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: C.green, animation: 'pulse 2s infinite' }} />
            April 2026 · v4.0
          </span>
        </div>

        {/* Headline */}
        <h1 className="fade-up-1" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 72, lineHeight: 0.92, letterSpacing: '-1px', color: C.t1, marginBottom: 0 }}>
          <span style={{ display: 'block' }}>Ghana's Rent</span>
          <span style={{ display: 'block', background: `linear-gradient(135deg, ${C.lime}, ${C.green})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Enforcement</span>
          <span style={{ display: 'block' }}>Intelligence</span>
          <span style={{ display: 'block', color: C.t3 }}>Platform</span>
        </h1>

        {/* Sub */}
        <p className="fade-up-2" style={{ fontSize: 15, lineHeight: 1.7, color: C.t2, marginTop: 20, marginBottom: 28 }}>
          The enforcement muscle that makes Ghana's rent laws actually work. Built on Act 220 and PNDCL 138.
        </p>

        {/* CTAs — stacked, full width */}
        <div className="fade-up-3" style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          <button onClick={onDemo}
            style={{ width: '100%', padding: '15px', background: C.lime, color: C.ink, border: 'none', borderRadius: 10, fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
            Explore the Platform →
          </button>
          <button onClick={onDemo}
            style={{ width: '100%', padding: '14px', background: 'transparent', color: C.t1, border: `1px solid ${C.border}`, borderRadius: 10, fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
            See All Features
          </button>
        </div>

        {/* Role avatars */}
        <div className="fade-up-4" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
          <div style={{ display: 'flex' }}>
            {['#0FA86A','#4B9EFF','#E8900A','#E5483A','#B8F73C'].map((c,i) => (
              <div key={i} style={{ width: 24, height: 24, borderRadius: '50%', background: c, border: `2px solid ${C.ink}`, marginLeft: i > 0 ? -6 : 0 }} />
            ))}
          </div>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: C.t3 }}>5 roles · 45 workflows</span>
        </div>
      </div>

      {/* Stats ticker — mobile optimised */}
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
      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: 1400, padding: '0 40px' }}>
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
              <button className="btn-primary" onClick={onDemo} style={{ border: 'none', cursor: 'pointer' }}>
                <span>Explore the Platform</span><span>→</span>
              </button>
              <button className="btn-secondary" onClick={onDemo} style={{ cursor: 'pointer' }}>
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
    {/* Topbar */}
    <div style={{ height: 40, background: C.card, borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 8 }}>
      {['#E5483A','#E8900A','#0FA86A'].map((c,i) => <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
      <div style={{ flex: 1 }} />
      <div style={{ fontFamily: 'JetBrains Mono', fontSize: 9, color: C.t3 }}>RentGuard / National Admin / Dashboard</div>
    </div>
    <div style={{ display: 'flex', height: 380 }}>
      {/* Sidebar */}
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
      {/* Content */}
      <div style={{ flex: 1, padding: 14, overflow: 'hidden' }}>
        {/* KPI grid */}
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
        {/* Chart area */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: 10, marginBottom: 8, height: 80 }}>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 8, color: C.t3, marginBottom: 6 }}>6-Month Compliance Trend</div>
          <svg width="100%" height="48" style={{ overflow: 'visible' }}>
            <polyline points="0,40 30,35 60,28 90,22 120,16 150,12 180,8 210,5" fill="none" stroke="#0FA86A" strokeWidth="1.5" strokeLinecap="round" />
            <polyline points="0,20 30,24 60,28 90,22 120,26 150,20 180,24 210,18" fill="none" stroke="#E5483A" strokeWidth="1" strokeDasharray="3,3" strokeLinecap="round" />
          </svg>
        </div>
        {/* Cases table */}
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

// ── MARQUEE STRIP ──────────────────────────────────────────────────────────
const MarqueeStrip = () => {
  const items = [
    '16 Ghana Regions', 'Act 220 s.16(5)', 'PNDCL 138 s.4', 'Rent Card Registry',
    'GRA Integration', '*714*1# USSD', 'SHA-256 Evidence', 'GPS Field Operations',
    'Real-time Risk Scoring', 'Taskforce Android App', 'National Compliance Score',
    'Case Management', 'Notice Generator', 'SLA Tracking', 'Bulk Export',
  ];

  return (
    <div style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, background: C.card, overflow: 'hidden', padding: '14px 0' }}>
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '0 32px', flexShrink: 0 }}>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: C.t3, letterSpacing: 1.5, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{item}</span>
            <span style={{ color: C.lime, fontSize: 8 }}>◆</span>
          </div>
        ))}
      </div>
    </div>
  );
};

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
    <section ref={ref} id="platform" style={{ background: C.ink, padding: '56px 20px' }}>
      <div className={visible ? 'fade-up' : ''} style={{ marginBottom: 12 }}>
        <span className="tag">The Enforcement Gap</span>
      </div>
      <h2 className={visible ? 'fade-up-1' : ''} style={{ fontFamily: "'DM Serif Display', serif", fontSize: 34, lineHeight: 1.15, color: C.t1, marginBottom: 20, fontStyle: 'italic' }}>
        Ghana has the laws.<br /><span style={{ color: C.lime }}>The enforcement has been missing.</span>
      </h2>
      <p style={{ fontSize: 15, lineHeight: 1.75, color: C.t2, marginBottom: 20 }}>
        The Rent Act has existed since 1963. What's been missing is the enforcement infrastructure to make it real.
      </p>
      <div style={{ padding: '14px 16px', background: `${C.lime}08`, border: `1px solid ${C.lime}20`, borderRadius: 8, marginBottom: 28 }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.lime, letterSpacing: 1, marginBottom: 4 }}>APRIL 1, 2026 MANDATE</div>
        <div style={{ fontSize: 13, color: C.t2, lineHeight: 1.6 }}>All landlords must issue Rent Cards. National Taskforce deployed. RentGuard is the enforcement layer.</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {stats.map((s, i) => (
          <div key={i} className={visible ? `fade-up-${i+1}` : ''} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '16px', background: C.card, border: `1px solid ${C.border}`, borderRadius: 10 }}>
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
            <div className={visible ? 'fade-up' : ''} style={{ marginBottom: 16 }}><span className="tag">The Enforcement Gap</span></div>
            <div className={visible ? 'fade-up-1' : ''}>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(36px,4vw,52px)', lineHeight: 1.15, color: C.t1, marginBottom: 24, fontStyle: 'italic' }}>
                Ghana has the laws.<br /><span style={{ color: C.lime }}>The enforcement<br />has been missing.</span>
              </h2>
            </div>
            <div className={visible ? 'fade-up-2' : ''}>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: C.t2, marginBottom: 24 }}>The Rent Act has existed since 1963. The 6-month advance cap, the rent card requirement, tenancy registration — all law. What's been missing is the enforcement infrastructure to make it real.</p>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: C.t2, marginBottom: 32 }}>RentGuard is not a new portal. It is the enforcement muscle — the field intelligence, case management, and compliance nervous system built on top of Ghana's existing digital infrastructure.</p>
            </div>
            <div className={visible ? 'fade-up-3' : ''} style={{ padding: '16px 20px', background: `${C.lime}08`, border: `1px solid ${C.lime}20`, borderLeft: `3px solid ${C.lime}`, borderRadius: 8 }}>
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


const FeaturesSection = () => {
  const [ref, visible] = useVisible();
  const mob = useMobile();
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    { icon: '⬡', label: 'Enforcement Intelligence', color: C.green,   headline: 'Real-time violation tracking across all 16 regions',              body: 'Every property scores 0–100 based on registration status, rent card coverage, advance violations, and open cases. High-risk properties are automatically routed to the nearest Taskforce unit for priority inspection.', tags: ['Risk Scoring', 'Auto-Routing', 'Regional Dashboard'] },
    { icon: '▤', label: 'Case Management',           color: C.blue,    headline: 'End-to-end case lifecycle from complaint to resolution',            body: 'Five status stages, SLA deadlines by severity, bulk assignment, and formal notice generation with embedded legal citations. Officer performance metrics and court-referral workflows are built into every case.', tags: ['5-Stage Pipeline', 'SLA Tracking', 'Notice Generator'] },
    { icon: '◎', label: 'Taskforce Operations',      color: C.amber,   headline: "Mobile-first field app built for Ghana's officers",                  body: "Android-first, offline-capable, and GPS-native. Officers run through a PNDCL 138 inspection checklist, scan rent card QR codes, capture evidence, and file violations — even without a signal. Everything syncs on reconnect.", tags: ['Offline-First', 'GPS Evidence', 'QR Card Scanner'] },
    { icon: '◈', label: 'Rent Card Registry',        color: C.lime,    headline: 'National digital rent card system with instant verification',        body: 'Every tenant verifies their rent card by QR scan or by dialling *714*1# on any phone — no smartphone required. Payment records are SHA-256 hashed at entry, making them tamper-proof and court-admissible.', tags: ['QR Verification', '*714*1# USSD', 'SHA-256 Hashing'] },
    { icon: '◼', label: 'GRA Integration',           color: '#9B59B6', headline: 'Automated rental income data pipeline to Ghana Revenue Authority',   body: 'Monthly SFTP exports deliver TIN-matched landlord income records directly to the Ghana Revenue Authority. Multi-property owners are automatically flagged. Every transfer is logged and confirmed in the audit trail.', tags: ['TIN Matching', 'Monthly GRA Export', 'SFTP Transfer'] },
    { icon: '▦', label: 'Tenant Protection',         color: C.red,     headline: 'Every tenant has rights. Now they can actually use them.',           body: 'Emergency eviction alerts, complaint filing via web or USSD, real-time case tracking, and a verified legal aid directory. Every tenant right under Act 220 and PNDCL 138 is explained in plain, accessible language.', tags: ['Emergency Alerts', 'Legal Aid Directory', 'Multi-channel'] },
  ];

  if (mob) return (
    <section ref={ref} id="features" style={{ background: C.deep, padding: '56px 20px' }}>
      <div style={{ marginBottom: 12 }}><span className="tag tag-lime">Platform Capabilities</span></div>
      <h2 className={visible ? 'fade-up-1' : ''} style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 52, color: C.t1, letterSpacing: '-1px', lineHeight: 0.95, marginBottom: 8 }}>
        Built for every actor<br /><span className="grad-text">in the system</span>
      </h2>
      <p style={{ fontSize: 14, color: C.t2, marginBottom: 28, lineHeight: 1.6 }}>5 roles · 45 workflows · one platform</p>

      {/* Mobile: accordion style */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {features.map((f, i) => (
          <div key={i}
            onClick={() => setActiveFeature(activeFeature === i ? -1 : i)}
            className={visible ? `fade-up-${Math.min(i+1,6)}` : ''}
            style={{ background: C.card, border: `1px solid ${activeFeature === i ? f.color + '50' : C.border}`, borderRadius: 12, overflow: 'hidden', transition: 'border-color 0.2s', cursor: 'pointer' }}>
            {/* Header row — always visible */}
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
            {/* Expandable body */}
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
    <section ref={ref} className="section" id="features" style={{ position: 'relative', background: C.deep }}>
      <div className="noise-overlay" />
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <div className={visible ? 'fade-up' : ''} style={{ marginBottom: 16 }}><span className="tag tag-lime">Platform Capabilities</span></div>
          <h2 className={visible ? 'fade-up-1' : ''} style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(52px, 6vw, 88px)', color: C.t1, letterSpacing: '-1px', lineHeight: 0.95, marginBottom: 20 }}>
            Built for every actor<br /><span className="grad-text">in the system</span>
          </h2>
          <p className={visible ? 'fade-up-2' : ''} style={{ fontSize: 17, color: C.t2, maxWidth: 540, margin: '0 auto', lineHeight: 1.7 }}>Five roles. 45 workflows. One platform that connects the ministry, officers, landlords, and tenants into a single enforcement system.</p>
        </div>
        <div className="rg-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {features.map((f, i) => (
            <div key={i} className={`feat-card ${visible ? `fade-up-${Math.min(i+1,6)}` : ''}`}
              onMouseEnter={() => setActiveFeature(i)}
              style={{ borderColor: activeFeature === i ? `${f.color}40` : C.border }}>
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


const WhoSection = () => {
  const [ref, visible] = useVisible();
  const mob = useMobile();
  const [activeRole, setActiveRole] = useState(0);

  const roles = [
    { id:'admin',    title:'National Admin',     subtitle:'Ministry of Works and Housing', color:C.green,  description:'Real-time enforcement intelligence across all 16 regions. Law vs. reality compliance tables. Officer deployment tools. GRA pipeline. Policy change log from 1963 to today.', capabilities:['Regional dashboard','Law vs Reality panel','GRA export pipeline','Policy & audit log','User management','System settings'] },
    { id:'manager',  title:'Case Manager',        subtitle:'Rent Control Department',       color:C.blue,   description:'Sortable, filterable, bulk-actionable case queue. SLA deadlines by severity. One-click notice generation with legal citations. Full case timeline with officer notes and evidence.', capabilities:['Bulk case assignment','SLA tracker','Notice generator','Property drilldown','Officer performance','Case escalation'] },
    { id:'officer',  title:'Taskforce Officer',   subtitle:'Field Operations',               color:C.amber,  description:"The entire officer interface lives in a phone frame. Risk-ranked route, GPS inspection checklist, QR scanner, offline queue, shift handover report — all on a low-end Android phone.", capabilities:['Risk-ranked route','Inspection checklist','QR card scanner','Offline sync','GPS evidence','Shift handover'] },
    { id:'landlord', title:'Landlord',             subtitle:'Registered Property Owner',     color:'#C8E830',description:"Compliance score with an itemized action plan. Step-by-step property registration. Rent card issuance with advance compliance check. Tax summary with GRA income breakdown.", capabilities:['Compliance score','Action plan','Property registration','Rent card issuance','Tax summary','Tenancy renewal'] },
    { id:'tenant',   title:'Tenant',               subtitle:'Every Renter in Ghana',         color:C.red,    description:"Verify your rent card. File a complaint. Track it in real time. Know when eviction threats are illegal. Get legal aid contacts. Access everything by dialling *714*1# — no smartphone needed.", capabilities:['Card verification','Complaint tracker','Eviction alerts','Legal aid directory','USSD access','Payment receipts'] },
  ];

  const active = roles[activeRole];

  if (mob) return (
    <section ref={ref} id="who-its-for" style={{ background: C.ink, padding: '56px 20px' }}>
      <div style={{ marginBottom: 16 }}><span className="tag">Five Roles. One System.</span></div>
      <h2 className={visible ? 'fade-up-1' : ''} style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 52, color: C.t1, letterSpacing: '-1px', lineHeight: 0.95, marginBottom: 28 }}>
        Designed for every<br /><span style={{ background: `linear-gradient(135deg, #FFD060, ${C.lime}, ${C.green})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>person in the chain</span>
      </h2>

      {/* Horizontal role chips */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, marginBottom: 20, WebkitOverflowScrolling: 'touch' }}>
        {roles.map((role, i) => (
          <button key={i} onClick={() => setActiveRole(i)}
            style={{ flexShrink: 0, padding: '8px 14px', borderRadius: 20, background: activeRole === i ? `${role.color}20` : 'transparent', border: `1px solid ${activeRole === i ? role.color + '60' : C.border}`, fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600, color: activeRole === i ? role.color : C.t3, cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
            {role.title}
          </button>
        ))}
      </div>

      {/* Active role detail card */}
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
    <section ref={ref} className="section" id="who-its-for" style={{ background: C.ink }}>
      <div className="container">
        <div style={{ marginBottom: 56 }}>
          <span className={`tag ${visible ? 'fade-up' : ''}`} style={{ marginBottom: 16, display: 'inline-flex' }}>Five Roles. One System.</span>
          <h2 className={visible ? 'fade-up-1' : ''} style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(52px, 6vw, 80px)', color: C.t1, letterSpacing: '-1px', lineHeight: 0.95 }}>
            Designed for every<br /><span className="grad-text-warm">person in the chain</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {roles.map((role, i) => (
              <button key={i} onClick={() => setActiveRole(i)}
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


const TerminalSection = () => {
  const [ref, visible] = useVisible();
  const mob = useMobile();
  const [lines, setLines] = useState([]);

  const allLines = [
    { text: '> SYSTEM BOOT — RentGuard v4.0', color: C.lime, delay: 0 },
    { text: '> Connecting to rentcontrol.mwh.gov.gh...', color: C.t3, delay: 300 },
    { text: '> ✓ Portal sync established — 15 offices online', color: C.green, delay: 700 },
    { text: '> ✓ 10 regions · 1,482 properties · 312 active violations', color: C.green, delay: 1200 },
    { text: '> RISK SCORE UPDATE: P-003 (22 Dzorwulu) → 96/100 [HIGH]', color: C.red, delay: 1800 },
    { text: '> NEW CASE: RC-2026-ACC-00291 — Illegal advance 9.5 months', color: C.amber, delay: 2400 },
    { text: '> USSD: *714*1# session opened — complaint filed', color: C.blue, delay: 3000 },
    { text: '> OFFICER SYNC: Ofc. Mensah — 3 inspections, 2 violations', color: C.green, delay: 3600 },
    { text: '> GRA FLAG: L-3378 — TIN mismatch, income GH₵194,400', color: C.amber, delay: 4200 },
    { text: '> RENT CARD ISSUED: RG-2026-ACC-00553 · 3A Labone Link', color: C.green, delay: 4800 },
    { text: '> NOTICE SENT: RC-2026-ACC-00289 — delivered to landlord', color: C.lime, delay: 5400 },
    { text: '> ALL SYSTEMS NOMINAL ■', color: C.lime, delay: 6000 },
  ];

  useEffect(() => {
    if (!visible) return;
    const timeouts = allLines.map((line) => setTimeout(() => setLines(prev => [...prev, line]), line.delay));
    return () => timeouts.forEach(clearTimeout);
  }, [visible]);

  const terminal = (compact = false) => (
    <div style={{ background: '#050a06', border: `1px solid ${C.border}`, borderRadius: compact ? 10 : 12, overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.6)' }}>
      <div style={{ height: 34, background: '#0A130C', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 8 }}>
        {['#E5483A','#E8900A','#0FA86A'].map((c,i) => <div key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />)}
        <span style={{ marginLeft: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.t3 }}>rentguard.gh — system.log</span>
      </div>
      <div style={{ padding: compact ? 14 : 20, minHeight: compact ? 240 : 380, fontFamily: "'JetBrains Mono', monospace", fontSize: compact ? 10 : 11, lineHeight: 1.8 }}>
        {lines.map((line, i) => (
          <div key={i} style={{ color: line.color, animation: 'fadeIn 0.3s ease both' }}>{line.text}</div>
        ))}
        {lines.length < allLines.length && visible && (
          <span style={{ color: C.lime, animation: 'terminalBlink 1s infinite' }}>█</span>
        )}
      </div>
    </div>
  );

  if (mob) return (
    <section ref={ref} style={{ background: C.ink, padding: '56px 20px' }}>
      <span className="tag tag-green" style={{ marginBottom: 16, display: 'inline-flex' }}>Live System Activity</span>
      <h2 className={visible ? 'fade-up-1' : ''} style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, color: C.t1, letterSpacing: '-0.5px', lineHeight: 0.95, marginBottom: 16 }}>
        The enforcement system<br /><span style={{ color: C.lime }}>never stops running</span>
      </h2>
      <p style={{ fontSize: 14, color: C.t2, lineHeight: 1.7, marginBottom: 20 }}>
        Risk scoring recalculates on every complaint. Cases auto-generate from field inspections. GRA exports queue automatically. Every event logged and auditable.
      </p>
      <div style={{ marginBottom: 20 }}>{terminal(true)}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {[['Event processing','Real-time',C.green],['Audit log','Immutable · SHA-256',C.lime],['Portal sync','Every 2 minutes',C.blue],['Offline queue','Auto-sync on reconnect',C.amber]].map(([label,val,color])=>(
          <div key={label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 0', borderBottom:`1px solid ${C.border}` }}>
            <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:11, color:C.t3 }}>{label}</span>
            <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:11, fontWeight:700, color }}>{val}</span>
          </div>
        ))}
      </div>
    </section>
  );

  if (mob) return (
    <section ref={ref} style={{ background: C.ink, padding: '56px 20px' }}>
      <span className="tag tag-green" style={{ marginBottom: 16, display: 'inline-flex' }}>No Smartphone Required</span>
      <h2 className={visible ? 'fade-up-1' : ''} style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 52, color: C.t1, letterSpacing: '-0.5px', lineHeight: 0.9, marginBottom: 16 }}>
        Dial <span style={{ color: C.lime }}>*714*1#</span><br />from any phone
      </h2>
      <p style={{ fontSize: 14, color: C.t2, lineHeight: 1.7, marginBottom: 24 }}>
        The entire tenant verification service is accessible via USSD — no data, no app, no smartphone needed.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 28 }}>
        {[['Option 1','Verify Rent Card'],['Option 2','File Complaint'],['Option 3','Check Landlord'],['Option 4','My Rights']].map(([opt, desc]) => (
          <div key={opt} style={{ padding: '14px', background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.green, marginBottom: 4 }}>{opt}</div>
            <div style={{ fontSize: 13, color: C.t1, fontWeight: 600 }}>{desc}</div>
          </div>
        ))}
      </div>
      {/* Compact USSD phone */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 200, background: '#0A0A0A', borderRadius: 18, border: '2px solid #1A1A1A', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.7)' }}>
          <div style={{ height: 32, background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 50, height: 7, background: '#1A1A1A', borderRadius: 4 }} />
          </div>
          <div style={{ padding: 14, background: '#001A00', minHeight: 200, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#00FF41', lineHeight: 1.8 }}>
            <div style={{ color: '#00AA2B', marginBottom: 8 }}>CON Ghana Rent Control</div>
            <div style={{ borderBottom: '1px solid #003300', marginBottom: 8, paddingBottom: 8 }} />
            <div>1. Verify Rent Card</div>
            <div>2. File Complaint</div>
            <div>3. Check Landlord</div>
            <div>4. My Rights</div>
            <div style={{ borderTop: '1px solid #003300', marginTop: 12, paddingTop: 8, color: '#007700', fontSize: 10 }}>
              Enter option:<br /><span style={{ color: '#00FF41', animation: 'terminalBlink 1s infinite' }}>2█</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: '#1A1A1A' }}>
            {[1,2,3,4,5,6,7,8,9,'*',0,'#'].map(k => (
              <div key={k} style={{ background: '#0D0D0D', height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#555' }}>{k}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <section ref={ref} className="section" style={{ background: C.ink }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <span className="tag tag-green" style={{ marginBottom: 20, display: 'inline-flex' }}>Live System Activity</span>
            <h2 className={visible ? 'fade-up-1' : ''} style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(44px,5vw,68px)', color: C.t1, letterSpacing: '-0.5px', lineHeight: 0.95, marginBottom: 24 }}>
              The enforcement<br />system never<br /><span style={{ color: C.lime }}>stops running</span>
            </h2>
            <p className={visible ? 'fade-up-2' : ''} style={{ fontSize: 16, color: C.t2, lineHeight: 1.75, marginBottom: 32 }}>Risk scoring recalculates on every new complaint. Cases auto-generate from field inspections. GRA exports queue automatically. USSD complaints route directly into the case queue. Every event is logged, immutable, and auditable.</p>
            <div className={visible ? 'fade-up-3' : ''} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[['Event processing','Real-time',C.green],['Audit log retention','Immutable · SHA-256',C.lime],['Portal sync interval','Every 2 minutes',C.blue],['Offline queue','Auto-sync on reconnect',C.amber]].map(([label,val,color])=>(
                <div key={label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 0', borderBottom:`1px solid ${C.border}` }}>
                  <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:11, color:C.t3, letterSpacing:0.5 }}>{label}</span>
                  <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:11, fontWeight:700, color }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={visible ? 'fade-up-2' : ''}>{terminal(false)}</div>
        </div>
      </div>
    </section>
  );
};


const MobileSection = () => {
  const [ref, visible] = useVisible();
  const mob = useMobile();
  const [activeScreen, setActiveScreen] = useState(0);

  const screens = [
    {
      label: "Today's Shift",
      description: "Route progress, shift timeline, priority alerts",
      color: C.amber,
    },
    {
      label: "Inspection Checklist",
      description: "8-item PNDCL 138 checklist, GPS-stamped evidence",
      color: C.green,
    },
    {
      label: "QR Scanner",
      description: "Instant rent card verification, violation detection",
      color: C.lime,
    },
    {
      label: "Map View",
      description: "Risk-ranked properties, GPS position, priority route",
      color: C.blue,
    },
  ];

  if (mob) return (
    <section ref={ref} style={{ background: C.deep, padding: '56px 20px', overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', bottom: -20, left: -10, fontFamily: "'Bebas Neue', sans-serif", fontSize: '40vw', color: C.forest, lineHeight: 1, pointerEvents: 'none', userSelect: 'none', letterSpacing: '-4px', opacity: 0.6 }}>FIELD</div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <span className="tag tag-lime" style={{ marginBottom: 16, display: 'inline-flex' }}>Taskforce Mobile App</span>
        <h2 className={visible ? 'fade-up-1' : ''} style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 52, color: C.t1, letterSpacing: '-0.5px', lineHeight: 0.95, marginBottom: 16 }}>
          Android-first.<br />Offline-capable.<br /><span style={{ color: C.lime }}>GPS-native.</span>
        </h2>
        <p style={{ fontSize: 14, color: C.t2, lineHeight: 1.7, marginBottom: 24 }}>
          Officers inspect properties, file violations, capture GPS evidence, and scan QR cards — even without signal. Everything syncs on reconnect.
        </p>
        {/* Screen selector chips */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, marginBottom: 24, WebkitOverflowScrolling: 'touch' }}>
          {screens.map((s, i) => (
            <button key={i} onClick={() => setActiveScreen(i)}
              style={{ flexShrink: 0, padding: '7px 14px', borderRadius: 20, background: activeScreen === i ? `${s.color}20` : 'transparent', border: `1px solid ${activeScreen === i ? s.color+'50' : C.border}`, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: activeScreen === i ? s.color : C.t3, cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
              {s.label}
            </button>
          ))}
        </div>
        {/* Phone centered */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <PhoneMockup activeScreen={activeScreen} screens={screens} />
        </div>
      </div>
    </section>
  );

  return (
    <section ref={ref} className="section" style={{ background: C.deep, position: 'relative', overflow: 'hidden' }}>
      <div className="noise-overlay" />

      {/* Big background text */}
      <div style={{ position: 'absolute', bottom: -20, left: 0, fontFamily: 'Bebas Neue', fontSize: '20vw', color: C.forest, lineHeight: 1, pointerEvents: 'none', userSelect: 'none', letterSpacing: '-4px' }}>
        FIELD
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          {/* Left text */}
          <div>
            <span className={`tag tag-lime ${visible ? 'fade-up' : ''}`} style={{ marginBottom: 20, display: 'inline-flex' }}>Taskforce Mobile App</span>
            <h2 className={visible ? 'fade-up-1' : ''} style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(44px, 5vw, 72px)', color: C.t1, letterSpacing: '-0.5px', lineHeight: 0.95, marginBottom: 24 }}>
              Android-first.<br />
              Offline-capable.<br />
              <span style={{ color: C.lime }}>GPS-native.</span>
            </h2>
            <p className={visible ? 'fade-up-2' : ''} style={{ fontSize: 16, color: C.t2, lineHeight: 1.75, marginBottom: 36 }}>
              Built for the field, not the office. Officers inspect properties, file violations, capture GPS evidence, and run QR card verifications — even when there's no signal. Everything syncs when reconnected.
            </p>

            {/* Screen selector */}
            <div className={visible ? 'fade-up-3' : ''} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {screens.map((s, i) => (
                <button key={i} onClick={() => setActiveScreen(i)}
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

          {/* Phone mockup */}
          <div className={visible ? 'fade-up-2' : ''} style={{ display: 'flex', justifyContent: 'center' }}>
            <PhoneMockup activeScreen={activeScreen} screens={screens} />
          </div>
        </div>
      </div>
    </section>
  );
};

// ── PHONE MOCKUP ───────────────────────────────────────────────────────────
const PhoneMockup = ({ activeScreen, screens }) => {
  const screenContent = [
    /* Today's Shift */
    <div style={{ padding: 14, height: '100%', display: 'flex', flexDirection: 'column', gap: 10, overflow: 'hidden' }}>
      <div style={{ fontFamily: 'JetBrains Mono', fontSize: 8, color: '#536358' }}>Mon 16 Mar · Shift: 08:30–16:00</div>
      <div style={{ background: '#111916', borderRadius: 8, padding: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#E8F0EB' }}>Route Progress</span>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#0FA86A' }}>3 / 8</span>
        </div>
        <div style={{ height: 5, background: '#243628', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '37.5%', background: '#0FA86A', borderRadius: 3 }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 10 }}>
          {[['3','Inspected','#0FA86A'],['2','Violations','#E5483A']].map(([v,l,c]) => (
            <div key={l}><div style={{ fontFamily: 'JetBrains Mono', fontSize: 16, color: c }}>{v}</div><div style={{ fontSize: 8, color: '#536358' }}>{l}</div></div>
          ))}
        </div>
      </div>
      <div style={{ background: 'rgba(229,72,58,0.08)', border: '1px solid rgba(229,72,58,0.2)', borderLeft: '3px solid #E5483A', borderRadius: 6, padding: '10px 12px' }}>
        <div style={{ fontFamily: 'JetBrains Mono', fontSize: 8, color: '#E5483A', marginBottom: 4 }}>NEXT PRIORITY STOP</div>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#E8F0EB' }}>22 Dzorwulu Crescent</div>
        <div style={{ fontFamily: 'JetBrains Mono', fontSize: 8, color: '#536358', marginTop: 2 }}>RISK 96 · 12 units · 0 rent cards</div>
      </div>
      {[['09:33','Inspection complete — 14 Osu','#0FA86A'],['09:31','3 violations filed','#E5483A'],['09:05','P-004 compliant','#0FA86A']].map(([t,l,c]) => (
        <div key={t} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: c, marginTop: 3, flexShrink: 0 }} />
          <div><div style={{ fontFamily: 'JetBrains Mono', fontSize: 8, color: '#536358' }}>{t}</div><div style={{ fontSize: 10, color: '#8FA898' }}>{l}</div></div>
        </div>
      ))}
    </div>,
    /* Inspection Checklist */
    <div style={{ padding: 14, overflow: 'hidden' }}>
      <div style={{ fontFamily: 'JetBrains Mono', fontSize: 8, color: '#0FA86A', marginBottom: 8 }}>14 Osu Ako-Adjei Ave · RISK 87</div>
      <div style={{ fontFamily: 'JetBrains Mono', fontSize: 8, color: '#536358', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Compliance Checklist</div>
      {[
        ['Rent card posted on door', true, 'Act 220 s.20'],
        ['Written tenancy agreement', false, 'PNDCL 138 s.4'],
        ['MMDA registration notice', false, 'PNDCL 138 s.5'],
        ['Advance ≤ 6 months', false, 'Act 220 s.16'],
        ['Habitable condition', true, 'Act 220 s.17'],
        ['No intimidation observed', true, null],
      ].map(([label, pass, law], i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0', borderBottom: '1px solid rgba(36,54,40,0.4)' }}>
          <div style={{ width: 14, height: 14, borderRadius: 3, background: pass ? 'rgba(15,168,106,0.2)' : 'rgba(229,72,58,0.2)', border: `1.5px solid ${pass ? '#0FA86A' : '#E5483A'}`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 8, color: pass ? '#0FA86A' : '#E5483A' }}>{pass ? '✓' : '✗'}</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: '#E8F0EB' }}>{label}</div>
            {law && <div style={{ fontFamily: 'JetBrains Mono', fontSize: 7, color: '#536358' }}>{law}</div>}
          </div>
        </div>
      ))}
      <div style={{ marginTop: 10, padding: '8px 10px', background: 'rgba(229,72,58,0.08)', border: '1px solid rgba(229,72,58,0.2)', borderRadius: 6 }}>
        <div style={{ fontFamily: 'JetBrains Mono', fontSize: 8, color: '#E5483A' }}>3 violations — case will auto-generate</div>
      </div>
    </div>,
    /* QR Scanner */
    <div style={{ padding: 14 }}>
      <div style={{ fontFamily: 'JetBrains Mono', fontSize: 8, color: '#536358', letterSpacing: 1, marginBottom: 10 }}>QR CARD SCANNER</div>
      <div style={{ position: 'relative', height: 160, background: '#050a06', borderRadius: 8, border: '1px solid #243628', overflow: 'hidden', marginBottom: 12 }}>
        {[{top:12,left:12},{top:12,right:12},{bottom:12,left:12},{bottom:12,right:12}].map((pos,i) => (
          <div key={i} style={{ position:'absolute',width:20,height:20,...pos,borderTop:pos.top!==undefined?`2px solid #B8F73C`:'none',borderBottom:pos.bottom!==undefined?`2px solid #B8F73C`:'none',borderLeft:pos.left!==undefined?`2px solid #B8F73C`:'none',borderRight:pos.right!==undefined?`2px solid #B8F73C`:'none' }} />
        ))}
        <div style={{ position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:8 }}>
          <div style={{ width:48,height:48,display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:3,opacity:0.3 }}>
            {[...Array(9)].map((_,i)=><div key={i} style={{background:[0,2,6,8,4].includes(i)?'#B8F73C':'transparent',borderRadius:1}} />)}
          </div>
          <span style={{ fontFamily:'JetBrains Mono',fontSize:8,color:'#536358' }}>SCANNING…</span>
        </div>
        <div style={{ position:'absolute',bottom:0,left:0,right:0,height:2,background:'#B8F73C',opacity:0.6,animation:'scanline 2s linear infinite' }} />
      </div>
      <div style={{ background:'rgba(15,168,106,0.1)',border:'1px solid rgba(15,168,106,0.3)',borderRadius:6,padding:'10px 12px' }}>
        <div style={{ fontFamily:'JetBrains Mono',fontSize:9,color:'#0FA86A',fontWeight:700,marginBottom:4 }}>VERIFIED · RG-2025-ACC-00123</div>
        <div style={{ fontSize:10,color:'#8FA898' }}>14 Osu Ako-Adjei Ave · Unit 2A</div>
        <div style={{ fontFamily:'JetBrains Mono',fontSize:8,color:'#E5483A',marginTop:3 }}>VIOLATION: Advance 9.5 months</div>
      </div>
      <div style={{ marginTop:8,display:'flex',gap:6 }}>
        <div style={{ flex:1,padding:'6px 8px',background:'rgba(229,72,58,0.1)',border:'1px solid rgba(229,72,58,0.3)',borderRadius:5,fontFamily:'JetBrains Mono',fontSize:8,color:'#E5483A',textAlign:'center' }}>FILE COMPLAINT</div>
        <div style={{ padding:'6px 8px',background:'#111916',border:'1px solid #243628',borderRadius:5,fontFamily:'JetBrains Mono',fontSize:8,color:'#536358',textAlign:'center' }}>HISTORY</div>
      </div>
    </div>,
    /* Map View */
    <div style={{ padding: 14 }}>
      <div style={{ fontFamily:'JetBrains Mono',fontSize:8,color:'#536358',letterSpacing:1,marginBottom:10 }}>AYAWASO EAST · ROUTE MAP</div>
      <div style={{ height:180,background:'#050a06',borderRadius:8,border:'1px solid #243628',position:'relative',overflow:'hidden',marginBottom:10 }}>
        {[...Array(5)].map((_,i)=><div key={i} style={{position:'absolute',top:0,bottom:0,left:`${(i+1)*18}%`,borderLeft:'1px solid rgba(36,54,40,0.3)'}} />)}
        {[...Array(4)].map((_,i)=><div key={i} style={{position:'absolute',left:0,right:0,top:`${(i+1)*25}%`,borderTop:'1px solid rgba(36,54,40,0.3)'}} />)}
        {[{x:'18%',y:'15%',r:96,c:'#E5483A'},{x:'48%',y:'30%',r:87,c:'#E5483A'},{x:'72%',y:'15%',r:73,c:'#E8900A'},{x:'30%',y:'55%',r:42,c:'#E8900A'},{x:'58%',y:'65%',r:12,c:'#0FA86A'}].map((p,i)=>(
          <div key={i} style={{ position:'absolute',left:p.x,top:p.y,display:'flex',flexDirection:'column',alignItems:'center',gap:2 }}>
            <div style={{ width:18,height:18,borderRadius:'50%',background:p.c,border:'2px solid rgba(255,255,255,0.3)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'JetBrains Mono',fontSize:7,color:'#fff',fontWeight:700 }}>{p.r}</div>
          </div>
        ))}
        <div style={{ position:'absolute',left:'33%',top:'60%',width:10,height:10,borderRadius:'50%',background:'#B8F73C',border:'2px solid #fff' }} />
        <div style={{ position:'absolute',fontFamily:'JetBrains Mono',fontSize:7,color:'rgba(255,255,255,0.1)',top:6,left:8,letterSpacing:2 }}>AYAWASO EAST MMDA</div>
      </div>
      <div style={{ fontFamily:'JetBrains Mono',fontSize:8,color:'#536358',marginBottom:6 }}>PRIORITY ROUTE</div>
      {[['01','22 Dzorwulu Crescent','96'],['02','14 Osu Ako-Adjei Ave','87'],['03','19 Spintex Road','73']].map(([n,a,r])=>(
        <div key={n} style={{ display:'flex',justifyContent:'space-between',padding:'5px 0',borderBottom:'1px solid rgba(36,54,40,0.3)' }}>
          <div style={{ display:'flex',gap:6 }}>
            <span style={{ fontFamily:'JetBrains Mono',fontSize:8,color:'#536358' }}>{n}</span>
            <span style={{ fontSize:9,color:'#8FA898' }}>{a}</span>
          </div>
          <span style={{ fontFamily:'JetBrains Mono',fontSize:8,color:parseInt(r)>=70?'#E5483A':'#E8900A',fontWeight:700 }}>{r}</span>
        </div>
      ))}
    </div>,
  ];

  return (
    <div className="float-2" style={{ position: 'relative' }}>
      {/* Phone frame */}
      <div style={{ width: 260, background: '#060D08', borderRadius: 36, border: '2px solid #1E3023', boxShadow: '0 40px 100px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.04)', overflow: 'hidden', position: 'relative' }}>
        {/* Notch */}
        <div style={{ height: 28, background: C.ink, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 80, height: 12, background: '#0A130C', borderRadius: 8 }} />
        </div>
        {/* Status bar */}
        <div style={{ height: 24, background: C.card, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px' }}>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: 9, color: '#536358' }}>09:42</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#0FA86A', animation: 'pulse 2s infinite' }} />
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: 8, color: '#0FA86A' }}>SYNC</span>
          </div>
        </div>
        {/* Screen content */}
        <div style={{ minHeight: 400, background: C.deep, overflow: 'hidden', transition: 'all 0.3s' }}>
          {screenContent[activeScreen]}
        </div>
        {/* Phone nav */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', background: C.card, borderTop: `1px solid ${C.border}` }}>
          {[['◼','Today',0],['⬡','Inspect',1],['◈','Scan',2],['◎','Map',3]].map(([ic,lbl,idx]) => (
            <button key={lbl} onClick={() => setActiveScreen(idx)}
              style={{ display:'flex',flexDirection:'column',alignItems:'center',gap:2,padding:'8px 0',background:'transparent',border:'none',cursor:'pointer' }}>
              <span style={{ fontSize:12,color:idx===activeScreen?screens[activeScreen].color:'#536358' }}>{ic}</span>
              <span style={{ fontFamily:'JetBrains Mono',fontSize:7,color:idx===activeScreen?screens[activeScreen].color:'#536358',letterSpacing:0.5 }}>{lbl}</span>
            </button>
          ))}
        </div>
        {/* Home indicator */}
        <div style={{ height: 20, background: C.card, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 80, height: 4, background: C.border, borderRadius: 2 }} />
        </div>
      </div>

      {/* Floating notification */}
      <div className="float-3" style={{ position: 'absolute', right: -60, top: 80, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: '10px 14px', width: 180, boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.red, marginTop: 3, animation: 'pulse 2s infinite', flexShrink: 0 }} />
          <div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 8, color: C.red, marginBottom: 3 }}>NEW VIOLATION</div>
            <div style={{ fontSize: 10, color: C.t2, lineHeight: 1.4 }}>9.5 months advance — Act 220 breach</div>
          </div>
        </div>
      </div>

      {/* Floating stat */}
      <div className="float" style={{ position: 'absolute', left: -70, bottom: 100, background: C.surface, border: `1px solid ${C.green}30`, borderRadius: 10, padding: '10px 14px', width: 140, boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
        <div style={{ fontFamily: 'JetBrains Mono', fontSize: 22, fontWeight: 700, color: C.green, lineHeight: 1 }}>96</div>
        <div style={{ fontSize: 10, color: C.t2, marginTop: 4 }}>Risk Score</div>
        <div style={{ fontFamily: 'JetBrains Mono', fontSize: 8, color: C.red }}>HIGH PRIORITY</div>
      </div>
    </div>
  );
};

// ── USSD SECTION ────────────────────────────────────────────────────────────
const USSDSection = () => {
  const [ref, visible] = useVisible();
  const mob = useMobile();

  if (mob) return (
    <section ref={ref} style={{ background: C.ink, padding: '56px 20px' }}>
      <span className="tag tag-green" style={{ marginBottom: 16, display: 'inline-flex' }}>No Smartphone Required</span>
      <h2 className={visible ? 'fade-up-1' : ''} style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 52, color: C.t1, letterSpacing: '-0.5px', lineHeight: 0.9, marginBottom: 16 }}>
        Dial <span style={{ color: C.lime }}>*714*1#</span><br />from any phone
      </h2>
      <p style={{ fontSize: 14, color: C.t2, lineHeight: 1.7, marginBottom: 24 }}>
        No data, no app, no smartphone needed. Every tenant in Ghana — including feature phone users — can verify their rent card and file a complaint.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 28 }}>
        {[['Option 1','Verify Rent Card'],['Option 2','File Complaint'],['Option 3','Check Landlord'],['Option 4','My Rights']].map(([opt,desc]) => (
          <div key={opt} style={{ padding: '14px', background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.green, marginBottom: 4 }}>{opt}</div>
            <div style={{ fontSize: 13, color: C.t1, fontWeight: 600 }}>{desc}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 190, background: '#0A0A0A', borderRadius: 18, border: '2px solid #1A1A1A', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.7)' }}>
          <div style={{ height: 28, background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 48, height: 7, background: '#1A1A1A', borderRadius: 4 }} />
          </div>
          <div style={{ padding: 12, background: '#001A00', minHeight: 180, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#00FF41', lineHeight: 1.8 }}>
            <div style={{ color: '#00AA2B', marginBottom: 8 }}>CON Ghana Rent Control</div>
            <div style={{ borderBottom: '1px solid #003300', marginBottom: 8, paddingBottom: 6 }} />
            <div>1. Verify Rent Card</div><div>2. File Complaint</div><div>3. Check Landlord</div><div>4. My Rights</div>
            <div style={{ borderTop: '1px solid #003300', marginTop: 10, paddingTop: 8, color: '#007700', fontSize: 10 }}>
              Enter option:<br /><span style={{ color: '#00FF41', animation: 'terminalBlink 1s infinite' }}>2█</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: '#1A1A1A' }}>
            {[1,2,3,4,5,6,7,8,9,'*',0,'#'].map(k => (
              <div key={k} style={{ background: '#0D0D0D', height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#555' }}>{k}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <section ref={ref} className="section" style={{ background: C.ink }}>
      <div className="container">
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, padding: '56px 60px', position: 'relative', overflow: 'hidden' }}>
          {/* Background decoration */}
          <div style={{ position: 'absolute', right: -60, top: -60, width: 300, height: 300, borderRadius: '50%', background: `${C.green}06`, filter: 'blur(60px)' }} />
          <div style={{ position: 'absolute', fontFamily: 'Bebas Neue', fontSize: '22vw', color: C.forest, lineHeight: 1, top: -20, right: -20, userSelect: 'none', pointerEvents: 'none', letterSpacing: '-4px' }}>*714</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', position: 'relative', zIndex: 1 }}>
            <div>
              <span className={`tag tag-green ${visible ? 'fade-up' : ''}`} style={{ marginBottom: 20, display: 'inline-flex' }}>No Smartphone Required</span>
              <h2 className={visible ? 'fade-up-1' : ''} style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(48px,5vw,72px)', color: C.t1, letterSpacing: '-0.5px', lineHeight: 0.9, marginBottom: 20 }}>
                Dial <span style={{ color: C.lime }}>*714*1#</span><br />
                from any phone
              </h2>
              <p className={visible ? 'fade-up-2' : ''} style={{ fontSize: 16, color: C.t2, lineHeight: 1.75, marginBottom: 32 }}>
                The entire tenant verification service is accessible via USSD — no data, no app, no smartphone. A tenant in a rural community can verify their rent card, file a complaint, and know their rights from any feature phone.
              </p>
              <div className={`${visible ? 'fade-up-3' : ''} rg-ussd-grid`} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  ['Option 1', 'Verify Rent Card'],
                  ['Option 2', 'File Complaint'],
                  ['Option 3', 'Check Landlord'],
                  ['Option 4', 'My Rights'],
                ].map(([opt, desc]) => (
                  <div key={opt} style={{ padding: '12px 16px', background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10 }}>
                    <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: C.green, marginBottom: 4 }}>{opt}</div>
                    <div style={{ fontSize: 13, color: C.t1, fontWeight: 600 }}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* USSD phone mockup */}
            <div className={visible ? 'fade-up-2' : ''} style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: 220, background: '#0A0A0A', borderRadius: 20, border: '2px solid #1A1A1A', overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.7)' }}>
                <div style={{ height: 40, background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 60, height: 8, background: '#1A1A1A', borderRadius: 4 }} />
                </div>
                {/* USSD screen */}
                <div style={{ padding: 16, background: '#001A00', minHeight: 280, fontFamily: 'JetBrains Mono', fontSize: 11, color: '#00FF41', lineHeight: 1.8 }}>
                  <div style={{ color: '#00AA2B', marginBottom: 8 }}>CON Ghana Rent Control</div>
                  <div style={{ borderBottom: '1px solid #003300', marginBottom: 8, paddingBottom: 8 }} />
                  <div>1. Verify Rent Card</div>
                  <div>2. File Complaint</div>
                  <div>3. Check Landlord</div>
                  <div>4. My Rights</div>
                  <div style={{ borderTop: '1px solid #003300', marginTop: 12, paddingTop: 8, color: '#007700', fontSize: 10 }}>
                    Enter option:<br />
                    <span style={{ color: '#00FF41', animation: 'terminalBlink 1s infinite' }}>2█</span>
                  </div>
                </div>
                {/* Keypad */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: '#1A1A1A' }}>
                  {[1,2,3,4,5,6,7,8,9,'*',0,'#'].map(k => (
                    <div key={k} style={{ background: '#0D0D0D', height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'JetBrains Mono', fontSize: 12, color: '#555' }}>{k}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ── SECURITY & LEGAL ────────────────────────────────────────────────────────
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
    <section ref={ref} id="security" style={{ background: C.ink, padding: '56px 20px' }}>
      <span className="tag" style={{ marginBottom: 16, display: 'inline-flex' }}>Security & Legal</span>
      <h2 className={visible ? 'fade-up-1' : ''} style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 52, color: C.t1, letterSpacing: '-0.5px', lineHeight: 0.95, marginBottom: 24 }}>
        Built for<br /><span style={{ color: cur.color, transition: 'color 0.4s' }}>government-grade</span><br />trust
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {items.map((item, i) => (
          <div key={i} onClick={() => setActive(active === i ? -1 : i)}
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
            {active === i && (
              <p style={{ fontSize: 13, color: C.t2, lineHeight: 1.7, marginTop: 12, paddingLeft: 36 }}>{item.body}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <section ref={ref} className="section" id="security" style={{ background: C.ink, position: 'relative', overflow: 'hidden' }}>
      {/* Large background number */}
      <div className="rg-security-bg-num" style={{ position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)', fontFamily: 'Bebas Neue', fontSize: '28vw', color: C.forest, lineHeight: 1, pointerEvents: 'none', userSelect: 'none', letterSpacing: '-8px', opacity: 0.6 }}>
        {cur.num}
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header row */}
        <div className="rg-section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 72  }}>
          <div>
            <span className={`tag ${visible ? 'fade-up' : ''}`} style={{ marginBottom: 16, display: 'inline-flex' }}>Security & Legal</span>
            <h2 className={visible ? 'fade-up-1' : ''} style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(52px,5.5vw,80px)', color: C.t1, letterSpacing: '-0.5px', lineHeight: 0.92 }}>
              Built for<br />
              <span style={{ color: cur.color, transition: 'color 0.4s' }}>government-grade</span><br />
              trust
            </h2>
          </div>
          <p className={`hide-mobile ${visible ? 'fade-up-2' : ''}`} style={{ fontSize: 15, color: C.t2, lineHeight: 1.75, maxWidth: 320, textAlign: 'right', paddingBottom: 8 }}>
            Every security decision was made with the courtroom in mind. Evidence that holds. Logs that last.
          </p>
        </div>

        {/* Main layout — list left, detail right */}
        <div className="rg-security-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2  }}>

          {/* Left — numbered list */}
          <div style={{ borderRight: `1px solid ${C.border}` }}>
            {items.map((item, i) => (
              <div key={i}
                className={visible ? `fade-up-${Math.min(i+1,6)}` : ''}
                onClick={() => setActive(i)}
                style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '22px 32px 22px 0', borderBottom: `1px solid ${C.border}`, cursor: 'pointer', transition: 'all 0.2s', borderRight: active === i ? `3px solid ${item.color}` : '3px solid transparent', marginRight: -1 }}>

                {/* Number */}
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: active === i ? item.color : C.t4, fontWeight: 700, letterSpacing: 1, width: 28, flexShrink: 0, transition: 'color 0.2s' }}>
                  {item.num}
                </div>

                {/* Title + tag */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: active === i ? C.t1 : C.t2, transition: 'color 0.2s', marginBottom: 4 }}>{item.title}</div>
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: 9, color: active === i ? item.color : C.t4, letterSpacing: 1, textTransform: 'uppercase', transition: 'color 0.2s' }}>{item.tag}</div>
                </div>

                {/* Arrow */}
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: active === i ? item.color : C.t4, transition: 'all 0.2s', transform: active === i ? 'translateX(4px)' : 'none' }}>→</div>
              </div>
            ))}
          </div>

          {/* Right — active detail panel */}
          <div key={active} className="fade-up" style={{ padding: '0 0 0 52px', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 420 }}>

            {/* Accent line */}
            <div style={{ width: 40, height: 3, background: cur.color, borderRadius: 2, marginBottom: 28 }} />

            {/* Big number */}
            <div style={{ fontFamily: 'Bebas Neue', fontSize: 96, color: `${cur.color}15`, lineHeight: 1, marginBottom: -16, letterSpacing: '-2px', userSelect: 'none' }}>
              {cur.num}
            </div>

            <h3 style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(32px,3.5vw,48px)', color: C.t1, lineHeight: 1.05, letterSpacing: '-0.5px', marginBottom: 20 }}>
              {cur.title}
            </h3>

            <p style={{ fontSize: 16, color: C.t2, lineHeight: 1.8, marginBottom: 28 }}>
              {cur.body}
            </p>

            {/* Tag pill */}
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

// ── METRICS / IMPACT ────────────────────────────────────────────────────────
const ImpactSection = () => {
  const [ref, visible] = useVisible();
  const mob = useMobile();

  const kpis = [
    { from: '38%',   to: '70%',   label: 'Tenancy Registration', timeframe: '12 months',       color: C.lime },
    { from: '29%',   to: '60%',   label: 'Rent Card Adoption',   timeframe: '12 months',       color: C.lime },
    { from: '9.2mo', to: '≤6mo',  label: 'Avg Advance Collected',timeframe: 'From enforcement', color: C.lime },
    { from: '0',     to: '847',   label: 'GRA Records/Month',    timeframe: 'Month 1 baseline', color: C.lime },
  ];

  const laws = [
    { cite: 'Act 220 s.16(5)', text: 'No landlord shall demand or receive rent in advance in excess of six months for any one period of occupation.', year: '1963' },
    { cite: 'PNDCL 138 s.4',   text: 'Every tenancy agreement shall be in writing and shall be registered with the appropriate Rent and Housing Committee within fourteen days.', year: '1986' },
    { cite: 'PNDCL 138 s.5',   text: 'Every landlord shall issue to the tenant a Rent Card showing particulars of the premises and the rent payable.', year: '1986' },
  ];

  if (mob) return (
    <section ref={ref} style={{ background: C.ink, padding: '56px 20px' }}>
      <span className="tag tag-lime" style={{ marginBottom: 16, display: 'inline-flex' }}>Projected Impact</span>
      <h2 className={visible ? 'fade-up-1' : ''} style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 52, color: C.t1, letterSpacing: '-1px', lineHeight: 0.95, marginBottom: 28 }}>
        What enforcement<br /><span className="grad-text">actually looks like</span>
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
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 18px', boxShadow: `0 0 0 1px ${C.lime}18, 0 0 32px ${C.lime}10` }}>
        {laws.map((law, i) => (
          <div key={i} style={{ paddingBottom: i < 2 ? 16 : 0, marginBottom: i < 2 ? 16 : 0, borderBottom: i < 2 ? `1px solid ${C.border}` : 'none' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.lime, letterSpacing: 1, marginBottom: 6, textTransform: 'uppercase' }}>{law.cite} · {law.year}</div>
            <p style={{ fontFamily: "'DM Serif Display', serif", fontStyle: 'italic', fontSize: 13, color: C.t2, lineHeight: 1.6 }}>"{law.text}"</p>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <section ref={ref} className="section" style={{ background: C.ink }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <span className={`tag tag-lime ${visible ? 'fade-up' : ''}`} style={{ marginBottom: 16, display: 'inline-flex' }}>Projected Impact</span>
          <h2 className={visible ? 'fade-up-1' : ''} style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(52px,6vw,88px)', color: C.t1, letterSpacing: '-1px', lineHeight: 0.95 }}>
            What enforcement<br /><span className="grad-text">actually looks like</span>
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
        <div style={{ background: C.card, border: `1px solid ${C.borderL}`, borderRadius: 16, padding: '40px 48px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32, boxShadow: `0 0 0 1px ${C.lime}18, 0 0 32px ${C.lime}10, 0 0 80px ${C.lime}06` }}>
          {laws.map((law, i) => (
            <div key={i}>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: C.lime, letterSpacing: 1, marginBottom: 10, textTransform: 'uppercase' }}>{law.cite} · {law.year}</div>
              <p style={{ fontFamily: 'DM Serif Display', fontStyle: 'italic', fontSize: 14, color: C.t2, lineHeight: 1.7 }}>"{law.text}"</p>
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
    { name: 'rentcontrol.mwh.gov.gh', owner: 'Ministry of Works & Housing', desc: 'Bidirectional sync of tenancy registrations and property records with the official national portal.', type: 'Government Portal', color: C.green,   status: 'LIVE SYNC' },
    { name: 'Ghana Revenue Authority', owner: 'GRA Tax System',              desc: 'Monthly SFTP pipeline of TIN-matched landlord income records and advance violation flags.',             type: 'Tax Authority',    color: C.lime,    status: 'MONTHLY EXPORT' },
    { name: "Africa's Talking",        owner: 'USSD + SMS Gateway',          desc: 'Powers the *714*1# USSD service and all outbound SMS notifications for cases and card issuance.',      type: 'Telecom API',      color: C.blue,    status: 'ALWAYS ON' },
    { name: 'NIA Ghana Card',          owner: 'National ID Authority',       desc: 'Ghana Card verification on landlord and tenant registration — confirms legal identity at onboarding.', type: 'Identity',         color: C.amber,   status: 'ON REGISTRATION' },
    { name: 'MTN / Telecel MoMo',      owner: 'Mobile Money',                desc: 'Payment confirmation webhooks from MTN and Telecel MoMo. Receipts are hashed and stored on arrival.', type: 'Payments',         color: C.amber,   status: 'WEBHOOK' },
    { name: 'Meta WhatsApp',           owner: 'Cloud API',                   desc: 'Tenant complaint channel. Complaint messages route directly into the case queue as new submissions.',  type: 'Messaging',        color: C.blue,    status: 'COMPLAINT CHANNEL' },
  ];

  if (mob) return (
    <section ref={ref} style={{ background: C.ink, borderTop: `1px solid ${C.border}`, padding: '56px 20px' }}>
      <span className="tag" style={{ marginBottom: 14, display: 'inline-flex' }}>Connected Infrastructure</span>
      <h2 className={visible ? 'fade-up-1' : ''} style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, color: C.t1, letterSpacing: '-0.5px', lineHeight: 0.95, marginBottom: 8 }}>
        Plugged into<br /><span className="grad-text">Ghana's systems</span>
      </h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 28 }}>
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: C.green, animation: 'pulse 2s infinite' }} />
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.green }}>6 integrations · All systems nominal</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {integrations.slice(0, expanded ? 6 : 2).map((int, i) => (
          <div key={i} className={visible ? `fade-up-${Math.min(i+1,6)}` : ''} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16 }}>
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
      {/* Expand / collapse toggle */}
      <button onClick={() => setExpanded(e => !e)}
        style={{ width: '100%', marginTop: 12, padding: '12px', background: 'transparent', border: `1px solid ${C.border}`, borderRadius: 10, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.t2, cursor: 'pointer', letterSpacing: 1, transition: 'all 0.2s' }}
        onTouchStart={e => e.currentTarget.style.borderColor = C.green}
        onTouchEnd={e => e.currentTarget.style.borderColor = C.border}>
        {expanded ? '↑ SHOW LESS' : `↓ VIEW ${integrations.length - 2} MORE INTEGRATIONS`}
      </button>
    </section>
  );

  return (
    <section ref={ref} className="section" style={{ background: C.ink, borderTop: `1px solid ${C.border}` }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56 }}>
          <div>
            <div className={visible ? 'fade-up' : ''} style={{ marginBottom: 14 }}><span className="tag">Connected Infrastructure</span></div>
            <h2 className={visible ? 'fade-up-1' : ''} style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(44px,5vw,68px)', color: C.t1, letterSpacing: '-0.5px', lineHeight: 0.95 }}>
              Plugged into<br /><span className="grad-text">Ghana's systems</span>
            </h2>
          </div>
          <div className={visible ? 'fade-up-2' : ''} style={{ textAlign: 'right' }}>
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


const CTASection = ({ onDemo }) => {
  const [ref, visible] = useVisible();
  const mob = useMobile();

  if (mob) return (
    <section ref={ref} id="demo" style={{ background: C.ink, padding: '56px 20px', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 60%, ${C.green}10 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <span className="tag tag-lime" style={{ marginBottom: 20, display: 'inline-flex' }}>Request Access</span>
        <h2 className={visible ? 'fade-up-1' : ''} style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 60, color: C.t1, letterSpacing: '-1px', lineHeight: 0.9, marginBottom: 20 }}>
          Enforce the law.<br /><span className="grad-text">Protect every tenant.</span><br />Starting now.
        </h2>
        <p style={{ fontSize: 15, color: C.t2, lineHeight: 1.7, marginBottom: 32 }}>
          RentGuard is production-ready. The enforcement infrastructure Ghana needs is built.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
          <button className="btn-primary" onClick={onDemo} style={{ border: 'none', cursor: 'pointer', padding: '16px', fontSize: 15, width: '100%', justifyContent: 'center' }}>
            Request a Demo →
          </button>
          <button className="btn-secondary" onClick={onDemo} style={{ cursor: 'pointer', padding: '15px', fontSize: 15, width: '100%', justifyContent: 'center' }}>
            Download Pitch Deck
          </button>
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
    <section ref={ref} id="demo" className="section" style={{ background: C.ink, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 60%, ${C.green}10 0%, transparent 70%)` }} />
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div className={visible ? 'fade-up' : ''} style={{ marginBottom: 20 }}>
          <span className="tag tag-lime">Request Access</span>
        </div>
        <h2 className={visible ? 'fade-up-1' : ''} style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(60px,7vw,110px)', color: C.t1, letterSpacing: '-1px', lineHeight: 0.9, marginBottom: 28 }}>
          Enforce the law.<br /><span className="grad-text">Protect every tenant.</span><br />Starting now.
        </h2>
        <p className={visible ? 'fade-up-2' : ''} style={{ fontSize: 18, color: C.t2, maxWidth: 500, margin: '0 auto 48px', lineHeight: 1.7 }}>
          RentGuard is production-ready. The enforcement infrastructure Ghana needs is built. The next step is yours.
        </p>
        <div className={visible ? 'fade-up-3' : ''} style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
          <button className="btn-primary" onClick={onDemo} style={{ padding: '16px 36px', fontSize: 15, border: 'none', cursor: 'pointer' }}>Request a Demo →</button>
          <button className="btn-secondary" onClick={onDemo} style={{ padding: '15px 35px', fontSize: 15, cursor: 'pointer' }}>Download Pitch Deck</button>
        </div>
        <div className={visible ? 'fade-up-4' : ''} style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap' }}>
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


const FooterLink = ({ href, children, mono = false, color = C.t3, external = false }) => (
  <a href={href}
    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    style={{ display: 'block', fontFamily: mono ? "'JetBrains Mono', monospace" : "'Space Grotesk', sans-serif", fontSize: mono ? 11 : 13, color, marginBottom: 8, textDecoration: 'none', transition: 'color 0.2s', cursor: 'pointer' }}
    onMouseEnter={e => e.target.style.color = C.t1}
    onMouseLeave={e => e.target.style.color = color}>
    {children}
  </a>
);

const Footer = () => {
  const mob = useMobile();

  if (mob) return (
    <footer style={{ background: C.card, borderTop: `1px solid ${C.border}`, padding: '40px 20px 28px' }}>
      {/* Brand */}
      <div style={{ marginBottom: 28 }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, textDecoration: 'none' }}>
          <div style={{ width: 26, height: 26, borderRadius: 6, background: `linear-gradient(135deg, ${C.lime}, ${C.green})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <div style={{ width: 13, height: 13, border: `2px solid ${C.ink}`, borderRadius: 3 }} />
          </div>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15, color: C.t1 }}>RentGuard Ghana</span>
        </a>
        <p style={{ fontSize: 13, color: C.t3, lineHeight: 1.6, marginBottom: 8 }}>Ghana's Rent Enforcement & Intelligence Platform. Built on Act 220 and PNDCL 138.</p>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.t4 }}>v4.0 · March 2026 · BRIDGE PBC</div>
      </div>
      {/* Quick links */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 24 }}>
        {[
          ['Platform','#platform'],["Features",'#features'],["Who It's For",'#who-its-for'],['Security','#security'],
          ['rentcontrol.mwh.gov.gh','https://rentcontrol.mwh.gov.gh'],['BRIDGE PBC','https://bridgepbc.com'],
        ].map(([label,href]) => (
          <a key={label} href={href} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.t3, textDecoration: 'none', padding: '8px 12px', background: C.surface, borderRadius: 6, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            onMouseEnter={e=>e.target.style.color=C.t1} onMouseLeave={e=>e.target.style.color=C.t3}>
            {label}
          </a>
        ))}
      </div>
      {/* Contact */}
      <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <a href="tel:+233302664000" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.green, textDecoration: 'none' }}>0302-664-000</a>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.t4 }}>© 2026 BRIDGE PBC · RentGuard Ghana · Confidential</div>
      </div>
    </footer>
  );

  return (<footer style={{ background: C.card, borderTop: `1px solid ${C.border}`, padding: '40px 0 32px' }}>
    <div className="container">
      <div className="rg-footer-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 40, marginBottom: 40  }}>

        {/* Brand */}
        <div>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, textDecoration: 'none' }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: `linear-gradient(135deg, ${C.lime}, ${C.green})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <div style={{ width: 14, height: 14, border: `2px solid ${C.ink}`, borderRadius: 3 }} />
            </div>
            <span style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 15, color: C.t1 }}>RentGuard</span>
          </a>
          <p style={{ fontSize: 13, color: C.t3, lineHeight: 1.7, marginBottom: 14 }}>
            Ghana's Rent Enforcement & Intelligence Platform. Built on Act 220 and PNDCL 138.
          </p>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 9, color: C.t4 }}>v4.0 · March 2026</div>
        </div>

        {/* Platform — all scroll to sections on this page */}
        <div>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: C.t3, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 16 }}>Platform</div>
          <FooterLink href="#who-its-for">National Admin</FooterLink>
          <FooterLink href="#who-its-for">Case Management</FooterLink>
          <FooterLink href="#who-its-for">Taskforce Operations</FooterLink>
          <FooterLink href="#who-its-for">Landlord Portal</FooterLink>
          <FooterLink href="#who-its-for">Tenant Protection</FooterLink>
          <FooterLink href="#features">GRA Integration</FooterLink>
        </div>

        {/* Legal Basis — external gov.gh sources */}
        <div>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: C.t3, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 16 }}>Legal Basis</div>
          <FooterLink href="https://ghanalii.org/legislation/act-220" mono external color={C.t4}>Act 220 — Rent Act 1963</FooterLink>
          <FooterLink href="https://ghanalii.org/legislation/pndcl-138" mono external color={C.t4}>PNDCL 138 — 1986</FooterLink>
          <FooterLink href="#platform" mono color={C.t4}>April 2026 Mandate</FooterLink>
          <FooterLink href="https://nca.org.gh" mono external color={C.t4}>NCA — *714*1# Shortcode</FooterLink>
          <FooterLink href="https://dpc.gov.gh" mono external color={C.t4}>DPC Registration</FooterLink>
          <FooterLink href="https://gra.gov.gh" mono external color={C.t4}>GRA Data MOU</FooterLink>
        </div>

        {/* Contact */}
        <div>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: C.t3, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 16 }}>Contact</div>
          <FooterLink href="https://mwh.gov.gh" external color={C.t3}>Ministry of Works & Housing</FooterLink>
          <FooterLink href="https://rentcontrol.mwh.gov.gh" mono external color={C.green}>rentcontrol.mwh.gov.gh ↗</FooterLink>
          <FooterLink href="tel:+233302664000" mono color={C.t3}>0302-664-000</FooterLink>
          <FooterLink href="https://bridgepbc.com" external color={C.t3}>BRIDGE PBC</FooterLink>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: C.lime, marginTop: 4 }}>Ghana-First · Public Benefit</div>
        </div>
      </div>

      <div className="divider" style={{ marginBottom: 24 }} />

      <div className="rg-footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12  }}>
        <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: C.t4 }}>
          © 2026 BRIDGE PBC · RentGuard Ghana · Enforcement Intelligence Layer
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          <FooterLink href="#demo" mono color={C.t4}>Privacy Policy</FooterLink>
          <FooterLink href="#demo" mono color={C.t4}>Terms</FooterLink>
          <FooterLink href="#security" mono color={C.t4}>Security</FooterLink>
        </div>
      </div>
    </div>
  </footer>
  );
};



// ── LOGIN MODAL ─────────────────────────────────────────────────────────────
const LoginModal = ({ onClose, navigate }) => {
  const [name, setName]         = useState('');
  const [passcode, setPasscode] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

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
    <div onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 5000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', background: 'rgba(6,13,8,0.75)' }}>

      <div onClick={e => e.stopPropagation()} className="fade-up"
        className="rg-modal" style={{ width: '100%', maxWidth: 400, background: '#111A14', border: '1px solid #1E3023', borderRadius: 20, overflow: 'hidden', boxShadow: '0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(184,247,60,0.06)' }}>

        {/* Header */}
        <div style={{ padding: '28px 28px 0', position: 'relative' }}>
          <button onClick={onClose}
            style={{ position: 'absolute', top: 18, right: 18, width: 30, height: 30, borderRadius: '50%', background: '#1E3023', border: 'none', color: '#4E7055', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#2A4030'; e.currentTarget.style.color = '#E8F2EB'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#1E3023'; e.currentTarget.style.color = '#4E7055'; }}>
            ✕
          </button>

          {/* Logo */}
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
          <p style={{ fontSize: 13, color: '#4E7055', lineHeight: 1.6, marginBottom: 22, paddingRight: 32 }}>
            Enter the name and passcode provided by your BRIDGE representative.
          </p>
          <div style={{ height: 1, background: 'linear-gradient(90deg, #B8F73C25, transparent)', marginBottom: 22 }} />
        </div>

        {/* Form */}
        <div style={{ padding: '0 28px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={F.label}>Your Name</label>
            <input value={name} onChange={e => { setName(e.target.value); setError(''); }}
              placeholder="Ama Antwi"
              style={F.input}
              onFocus={e => e.target.style.borderColor = '#0FA86A'}
              onBlur={e => e.target.style.borderColor = '#1E3023'}
              onKeyDown={e => e.key === 'Enter' && submit()} />
          </div>

          <div>
            <label style={F.label}>Passcode</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? 'text' : 'password'}
                value={passcode} onChange={e => { setPasscode(e.target.value); setError(''); }}
                placeholder="Enter your passcode"
                style={{ ...F.input, paddingRight: 52 }}
                onFocus={e => e.target.style.borderColor = '#0FA86A'}
                onBlur={e => e.target.style.borderColor = '#1E3023'}
                onKeyDown={e => e.key === 'Enter' && submit()} />
              <button onClick={() => setShowPass(s => !s)}
                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: '#4E7055', cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 1, fontWeight: 700 }}>
                {showPass ? 'HIDE' : 'SHOW'}
              </button>
            </div>
          </div>

          {error && (
            <div style={{ padding: '10px 14px', background: 'rgba(229,72,58,0.08)', border: '1px solid rgba(229,72,58,0.25)', borderRadius: 7, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#E5483A', lineHeight: 1.5 }}>
              {error}
            </div>
          )}

          <button onClick={submit} disabled={loading}
            style={{ width: '100%', padding: '13px', background: loading ? '#1E3023' : '#B8F73C', color: loading ? '#4E7055' : '#060D08', border: 'none', borderRadius: 9, fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            {loading ? (
              <>
                <span style={{ width: 14, height: 14, border: '2px solid #4E7055', borderTopColor: '#9BB8A3', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />
                Verifying…
              </>
            ) : 'Access Demo →'}
          </button>

          <div style={{ textAlign: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#2A4030', lineHeight: 1.6 }}>
            Don't have a passcode?{' '}
            <span style={{ color: '#0FA86A', cursor: 'pointer', textDecoration: 'underline', textDecorationStyle: 'dotted' }}
              onClick={onClose}>
              Request access →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── DEMO REQUEST MODAL ──────────────────────────────────────────────────────
const DemoModal = ({ onClose }) => {
  const [step, setStep]         = useState(1); // 1=form 2=success
  const [submitting, setSub]    = useState(false);
  const [form, setForm]         = useState({
    name: '', org: '', role: '', email: '', phone: '', message: '',
  });
  const [errors, setErrors]     = useState({});
  const upd = (k, v) => { setForm(p => ({ ...p, [k]: v })); setErrors(p => ({ ...p, [k]: '' })); };

  // Close on Escape
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = 'Required';
    if (!form.org.trim())   e.org   = 'Required';
    if (!form.email.trim()) e.email = 'Required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.role)         e.role  = 'Required';
    return e;
  };

  const submit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSub(true);
    setTimeout(() => { setSub(false); setStep(2); }, 1400);
  };

  const roles = [
    'Ministry / Government Official',
    'Rent Control Department',
    'Municipal/District Authority',
    'Real Estate / Property Sector',
    'Financial Institution',
    'NGO / Civil Society',
    'Research / Academia',
    'Press / Media',
    'Other',
  ];

  const F = {
    label: { display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: '#9BB8A3', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 7 },
    input: { width: '100%', padding: '11px 14px', background: '#0B1210', border: `1px solid #1E3023`, borderRadius: 8, color: '#E8F2EB', fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' },
    inputErr: { borderColor: '#E5483A' },
    err: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#E5483A', marginTop: 5 },
    field: { marginBottom: 16 },
  };

  return (
    <div
      onClick={onClose}
      className="rg-modal-wrap" style={{ position: 'fixed', inset: 0, zIndex: 5000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', background: 'rgba(6,13,8,0.7)' }}>

      <div
        onClick={e => e.stopPropagation()}
        className="fade-up"
        className="rg-modal" style={{ width: '100%', maxWidth: 540, background: '#111A14', border: '1px solid #1E3023', borderRadius: 20, overflow: 'hidden', boxShadow: '0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(184,247,60,0.06)', maxHeight: '90vh', overflowY: 'auto' }}>

        {step === 1 && (
          <>
            {/* Header */}
            <div style={{ padding: '28px 32px 0', position: 'relative' }}>
              {/* Close button */}
              <button onClick={onClose}
                style={{ position: 'absolute', top: 20, right: 20, width: 32, height: 32, borderRadius: '50%', background: '#1E3023', border: 'none', color: '#4E7055', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#2A4030'; e.currentTarget.style.color = '#E8F2EB'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#1E3023'; e.currentTarget.style.color = '#4E7055'; }}>
                ✕
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: 'linear-gradient(135deg, #B8F73C, #0FA86A)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <div style={{ width: 18, height: 18, border: '2.5px solid #060D08', borderRadius: 4 }} />
                </div>
                <div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15, color: '#E8F2EB' }}>RentGuard Ghana</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#B8F73C', letterSpacing: 1 }}>REQUEST ACCESS · v4.0</div>
                </div>
              </div>

              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 34, color: '#E8F2EB', lineHeight: 1, marginBottom: 8, letterSpacing: '-0.5px' }}>
                Request a Demo
              </div>
              <p style={{ fontSize: 14, color: '#9BB8A3', lineHeight: 1.65, marginBottom: 24, paddingRight: 40 }}>
                We'll set up a live walkthrough of the platform tailored to your role — ministry, enforcement, landlord, or tenant services.
              </p>

              <div style={{ height: 1, background: 'linear-gradient(90deg, #B8F73C30, transparent)', marginBottom: 24 }} />
            </div>

            {/* Form */}
            <div style={{ padding: '0 32px 28px' }}>
              {/* Name + Org */}
              <div className="rg-modal-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 0 }}>
                <div style={F.field}>
                  <label style={F.label}>Full Name *</label>
                  <input value={form.name} onChange={e => upd('name', e.target.value)}
                    placeholder="Ama Antwi"
                    style={{ ...F.input, ...(errors.name ? F.inputErr : {}) }}
                    onFocus={e => { e.target.style.borderColor = '#0FA86A'; }}
                    onBlur={e => { e.target.style.borderColor = errors.name ? '#E5483A' : '#1E3023'; }} />
                  {errors.name && <div style={F.err}>{errors.name}</div>}
                </div>
                <div style={F.field}>
                  <label style={F.label}>Organisation *</label>
                  <input value={form.org} onChange={e => upd('org', e.target.value)}
                    placeholder="Ministry of Works & Housing"
                    style={{ ...F.input, ...(errors.org ? F.inputErr : {}) }}
                    onFocus={e => { e.target.style.borderColor = '#0FA86A'; }}
                    onBlur={e => { e.target.style.borderColor = errors.org ? '#E5483A' : '#1E3023'; }} />
                  {errors.org && <div style={F.err}>{errors.org}</div>}
                </div>
              </div>

              {/* Role selector */}
              <div style={F.field}>
                <label style={F.label}>Your Role *</label>
                <select value={form.role} onChange={e => upd('role', e.target.value)}
                  style={{ ...F.input, ...(errors.role ? F.inputErr : {}), appearance: 'none', cursor: 'pointer', color: form.role ? '#E8F2EB' : '#4E7055' }}
                  onFocus={e => { e.target.style.borderColor = '#0FA86A'; }}
                  onBlur={e => { e.target.style.borderColor = errors.role ? '#E5483A' : '#1E3023'; }}>
                  <option value="" disabled style={{ background: '#111A14' }}>Select your sector…</option>
                  {roles.map(r => <option key={r} value={r} style={{ background: '#111A14', color: '#E8F2EB' }}>{r}</option>)}
                </select>
                {errors.role && <div style={F.err}>{errors.role}</div>}
              </div>

              {/* Email + Phone */}
              <div className="rg-modal-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div style={F.field}>
                  <label style={F.label}>Email Address *</label>
                  <input type="email" value={form.email} onChange={e => upd('email', e.target.value)}
                    placeholder="ama@rentcontrol.gov.gh"
                    style={{ ...F.input, ...(errors.email ? F.inputErr : {}) }}
                    onFocus={e => { e.target.style.borderColor = '#0FA86A'; }}
                    onBlur={e => { e.target.style.borderColor = errors.email ? '#E5483A' : '#1E3023'; }} />
                  {errors.email && <div style={F.err}>{errors.email}</div>}
                </div>
                <div style={F.field}>
                  <label style={F.label}>Phone <span style={{ color: '#4E7055', fontWeight: 400 }}>(optional)</span></label>
                  <input type="tel" value={form.phone} onChange={e => upd('phone', e.target.value)}
                    placeholder="024XXXXXXX"
                    style={F.input}
                    onFocus={e => { e.target.style.borderColor = '#0FA86A'; }}
                    onBlur={e => { e.target.style.borderColor = '#1E3023'; }} />
                </div>
              </div>

              {/* Message */}
              <div style={F.field}>
                <label style={F.label}>What are you looking to solve? <span style={{ color: '#4E7055', fontWeight: 400 }}>(optional)</span></label>
                <textarea value={form.message} onChange={e => upd('message', e.target.value)}
                  rows={3} placeholder="e.g. We need to track advance violations across Greater Accra…"
                  style={{ ...F.input, resize: 'vertical', lineHeight: 1.6 }}
                  onFocus={e => { e.target.style.borderColor = '#0FA86A'; }}
                  onBlur={e => { e.target.style.borderColor = '#1E3023'; }} />
              </div>

              {/* Submit */}
              <button onClick={submit} disabled={submitting}
                style={{ width: '100%', padding: '14px 24px', background: submitting ? '#2A4030' : '#B8F73C', color: submitting ? '#4E7055' : '#060D08', border: 'none', borderRadius: 10, fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, cursor: submitting ? 'not-allowed' : 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                {submitting ? (
                  <>
                    <span style={{ width: 16, height: 16, border: '2px solid #4E7055', borderTopColor: '#9BB8A3', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />
                    Submitting…
                  </>
                ) : 'Request Demo →'}
              </button>

              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#2A4030', textAlign: 'center', marginTop: 14, lineHeight: 1.6 }}>
                We respond within 1 business day · No spam · Unsubscribe anytime
              </p>
            </div>
          </>
        )}

        {step === 2 && (
          <div style={{ padding: '52px 40px', textAlign: 'center' }}>
            {/* Success icon */}
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(184,247,60,0.1)', border: '2px solid rgba(184,247,60,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 28 }}>
              ✓
            </div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, color: '#E8F2EB', letterSpacing: '-0.5px', lineHeight: 1, marginBottom: 14 }}>
              Request Received
            </div>
            <p style={{ fontSize: 15, color: '#9BB8A3', lineHeight: 1.75, maxWidth: 360, margin: '0 auto 12px' }}>
              Thanks, <strong style={{ color: '#E8F2EB' }}>{form.name.split(' ')[0]}</strong>. We'll be in touch at <strong style={{ color: '#B8F73C' }}>{form.email}</strong> within one business day to schedule your walkthrough.
            </p>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#4E7055', marginBottom: 36 }}>
              RentGuard · BRIDGE PBC · Ghana-First
            </p>
            <button onClick={onClose}
              style={{ padding: '12px 32px', background: 'transparent', border: '1px solid #1E3023', borderRadius: 8, color: '#9BB8A3', fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#B8F73C'; e.currentTarget.style.color = '#B8F73C'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#1E3023'; e.currentTarget.style.color = '#9BB8A3'; }}>
              Back to RentGuard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ── ROOT ───────────────────────────────────────────────────────────────────
export default function RentGuardLanding() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const openLogin = () => setShowLogin(true);
  const closeLogin = () => setShowLogin(false);

  return (
    <div>
      <GlobalStyles />
      {showModal && <DemoModal onClose={closeModal} />}
      {showLogin && <LoginModal onClose={closeLogin} navigate={navigate} />}
      <Navbar onDemo={openLogin} onLogin={openLogin} />
      <Hero onDemo={openLogin} />
      <ProblemSection />
      <FeaturesSection />
      <WhoSection />
      <TerminalSection />
      <MobileSection />
      <USSDSection />
      <SecuritySection />
      <ImpactSection />
      <IntegrationStrip />
      <CTASection onDemo={openLogin} />
      <Footer />
    </div>
  );
}
