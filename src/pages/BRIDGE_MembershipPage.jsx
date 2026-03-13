import { useState, useEffect, useRef } from "react";
import {
  Check, Lock, Globe, Users, Star, ArrowRight, ChevronDown,
  BarChart2, FileText, Shield, BookOpen, Zap, TrendingUp, Layout,
  MessageSquare, Briefcase, Database
} from "lucide-react";

/* ─────────────────────────────────────────────
   FONT LOADER
───────────────────────────────────────────── */
const FontLoader = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);
  return null;
};

/* ─────────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────────── */
const C = {
  ink:     "#0A1A0F",
  primary: "#1B4D3E",
  teal:    "#2E5A4D",
  accent:  "#B8D935",
  bg:      "#F3F5F2",
  white:   "#FFFFFF",
  line:    "#DEDEDE",
  muted:   "#6B7280",
  subtle:  "#9CA3AF",
  text:    "#111827",
};
const F = {
  sans: "'Inter', system-ui, sans-serif",
  body: "'Inter', system-ui, sans-serif",
};
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/* ─────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────── */
const GlobalStyles = () => {
  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = `
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; overflow-x: hidden; }
      body { background: ${C.bg}; overflow-x: hidden; }
      ::selection { background: ${C.accent}; color: ${C.primary}; }
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(30px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .hov-card { transition: box-shadow .35s ${EASE}, transform .35s ${EASE}; }
      .hov-card:hover { box-shadow: 0 18px 52px rgba(0,0,0,.11) !important; transform: translateY(-3px); }
      .hov-paid { transition: box-shadow .35s ${EASE}, transform .35s ${EASE}; }
      .hov-paid:hover { box-shadow: 0 28px 80px rgba(10,26,15,.45) !important; transform: translateY(-3px); }
      .hov-btn { transition: all .25s ${EASE}; }
      .hov-btn:hover { transform: translateY(-2px); }
      .hov-outline:hover { background: rgba(255,255,255,.08) !important; }
      .faq-row:hover { background: rgba(27,77,62,.03); }
    `;
    document.head.appendChild(s);
    return () => { if (s.parentNode) s.parentNode.removeChild(s); };
  }, []);
  return null;
};

/* ─────────────────────────────────────────────
   BRIDGE LOGO
───────────────────────────────────────────── */
const BridgeLogo = ({ height = 36 }) => (
  <svg height={height} viewBox="0 0 3258.5 932.3" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
    <defs>
      <style>{`.cls-1{fill:none;stroke:#fff;stroke-width:80px;}.cls-1,.cls-2,.cls-3{stroke-miterlimit:10;}.cls-4,.cls-3{fill:#b8d935;}.cls-5,.cls-2{fill:#fff;}.cls-2{stroke:#000;stroke-width:.5px;}.cls-3{stroke:#1b4d3e;}.cls-6{fill:#74914a;}`}</style>
    </defs>
    <path className="cls-5" d="M1853.1,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.6,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1h0v.1Z"/>
    <path className="cls-2" d="M1431.7,224.5h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5h.1v.1Z"/>
    <path className="cls-2" d="M1488.1,578.7v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"/>
    <rect className="cls-4" x="1427.4" y="17.4" width="205.2" height="145"/>
    <rect className="cls-5" x="1427.5" y="221.8" width="205.2" height="693.2" rx="9.6" ry="9.6"/>
    <path className="cls-5" d="M2757.3,19.1h491.3c5.4,0,9.8,4.4,9.8,9.8v218.7c0,5.4-4.4,9.8-9.8,9.8h-507.4c-57,0-108.5,23-145.9,60.4-37.3,37.2-60.5,88.8-60.5,145.7,0,113.7,92.4,206,206.3,206h12.9c2.9,0,5.1,2.3,5.1,5.1v236.7c0,1.1-.9,1.9-1.9,1.9h0c-242.2,0-438.5-196-438.5-437.8v-18.5c0-241.8,196.3-437.8,438.5-437.8h.1Z"/>
    <rect className="cls-5" x="2812.8" y="339.5" width="216.8" height="572.6" rx="9.6" ry="9.6"/>
    <rect className="cls-4" x="3083.4" y="339.5" width="175.1" height="257.7"/>
    <rect className="cls-4" x="3083.4" y="654.4" width="175.1" height="257.7"/>
    <rect className="cls-1" x="40" y="40" width="843.9" height="852.3" rx="36.6" ry="36.6"/>
    <polygon className="cls-3" points="722.6 322.1 462.3 452.8 202 322.8 461.3 192.5 722.6 322.1"/>
    <path className="cls-6" d="M197.9,426.8c3.9-.5,7,.8,10.7,1.4l252.5,125.7c84.5-40,167.7-83.8,251.9-124.8,33.1-11.5,50.1,34.2,18.5,49.1l-259.2,129.1c-10.2,3.7-14.1,2.6-23.9-1.3l-264.2-133c-17-14.4-8-43.2,13.6-46.1h.1v-.1Z"/>
    <path className="cls-4" d="M195.3,558c3.7-.6,7.4-.4,11.1-.2,86.1,40.5,170.4,85.1,255.9,126.8l252.9-126c29.5-7.2,45.4,28.7,22.3,46.5l-270.4,134.4-8.6.3c-91.6-42.2-181.1-89.9-271.7-134.4-18.7-12.1-13.3-43.6,8.5-47.4h0Z"/>
  </svg>
);

/* ─────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────── */
const useVisible = (thresh = 0.15) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: thresh });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [thresh]);
  return [ref, vis];
};

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
const BlackStar = ({ size = 56 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon
      points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35"
      fill={C.ink}
    />
  </svg>
);

const ImgPlaceholder = ({ radius, label }) => (
  <div style={{
    width: "100%", height: "100%",
    backgroundColor: "rgba(255,255,255,.07)",
    border: "1.5px dashed rgba(255,255,255,.18)",
    borderRadius: radius || 12,
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center", gap: 6,
  }}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.3)" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/>
      <path d="M21 15l-5-5L5 21"/>
    </svg>
    {label && <span style={{ fontSize: 9, fontFamily: "DM Sans, sans-serif", fontWeight: "600",
      color: "rgba(255,255,255,.25)", letterSpacing: "1px", textTransform: "uppercase" }}>{label}</span>}
  </div>
);

const ImgPlaceholderLight = ({ label, radius = 16 }) => (
  <div style={{
    width: "100%", height: "100%",
    backgroundColor: "#EEF0EC",
    border: radius === 0 ? "none" : "1.5px dashed #C8CCBF",
    borderRadius: radius,
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center", gap: 6,
  }}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9AA18E" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/>
      <path d="M21 15l-5-5L5 21"/>
    </svg>
    {label && <span style={{ fontSize: 9, fontFamily: "DM Sans, sans-serif", fontWeight: "600",
      color: "#9AA18E", letterSpacing: "1px", textTransform: "uppercase" }}>{label}</span>}
  </div>
);

const heroImages = [
  { alt: "Ghana market", radius: "20px 4px 4px 4px",   label: "Image 1" },
  { alt: "Professional", radius: "4px 20px 4px 4px",   label: "Image 2" },
  { alt: "Community",    radius: "4px 4px 4px 20px",   label: "Image 3" },
  { alt: "Partnership",  radius: "4px 4px 20px 4px",   label: "Image 4" },
];

const HeroImageGrid = ({ size }) => (
  <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
    <div style={{
      display: "grid", gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "1fr 1fr", gap: 10,
      width: "100%", height: "100%",
    }}>
      {heroImages.map((img, i) => (
        <div key={i} style={{ borderRadius: img.radius, overflow: "hidden", minHeight: 0 }}>
          <ImgPlaceholder radius={img.radius} label={img.label} />
        </div>
      ))}
    </div>
    {/* Black Star centered at intersection */}
    <div style={{
      position: "absolute",
      top: "50%", left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 10,
      width: size * 0.18, height: size * 0.18,
      backgroundColor: C.accent,
      borderRadius: "50%",
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: "0 4px 20px rgba(10,26,15,.35)",
    }}>
      <BlackStar size={size * 0.12} />
    </div>
  </div>
);

const Hero = ({ isMobile, onApplyFree, onCompare }) => {
  const [ref, vis] = useVisible(.05);

  return (
    <section ref={ref} style={{
      position: "relative", backgroundColor: C.primary, overflow: "hidden",
    }}>
      {/* bottom vignette */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 180,
        background: "linear-gradient(to top, rgba(10,26,15,.45), transparent)", pointerEvents: "none" }} />

      <div style={{
        position: "relative", zIndex: 2,
        width: "100%",
        padding: isMobile ? "64px 20px 56px" : "80px 80px 80px",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "flex-start" : "center",
        gap: isMobile ? 48 : 64,
      }}>

        {/* ── LEFT: text + CTAs ── */}
        <div style={{ flex: 1, minWidth: 0, maxWidth: isMobile ? "none" : 680 }}>
          {/* overline */}
          <div style={{ animation: vis ? `fadeUp .7s ${EASE} .1s both` : "none" }}>
            <SLabel text="BRIDGE PBC · Ghana" light />
          </div>

          {/* headline */}
          <h1 style={{
            fontSize: isMobile ? 40 : 64,
            fontFamily: F.sans, fontWeight: "300",
            color: C.white, lineHeight: isMobile ? 1.18 : 1.1,
            letterSpacing: isMobile ? "-.5px" : "-1.5px",
            marginBottom: 28,
            animation: vis ? `fadeUp .85s ${EASE} .2s both` : "none",
          }}>
            Built for those who<br />
            believe in{" "}
            <span style={{ color: C.accent, fontWeight: "600" }}>Ghana's</span>
            <br /><span style={{ fontWeight: "600" }}>future.</span>
          </h1>

          {/* sub */}
          <p style={{
            fontSize: isMobile ? 15 : 17, fontFamily: F.body, fontWeight: "300",
            color: "rgba(255,255,255,.58)", lineHeight: 1.8,
            maxWidth: 440, marginBottom: 40,
            animation: vis ? `fadeUp .85s ${EASE} .3s both` : "none",
          }}>
            Whether you're exploring from the diaspora, investing from Accra, or
            building from anywhere — BRIDGE gives you the intelligence to act
            with confidence.
          </p>

          {/* CTAs */}
          <div style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 12,
            animation: vis ? `fadeUp .85s ${EASE} .4s both` : "none",
          }}>
            <button className="hov-btn" onClick={onApplyFree} style={{
              backgroundColor: C.accent, color: C.primary,
              border: "none", borderRadius: 100,
              padding: isMobile ? "14px 24px" : "14px 34px",
              fontSize: 13, fontWeight: "800", fontFamily: F.sans,
              cursor: "pointer", letterSpacing: ".3px",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              width: isMobile ? "100%" : "auto", whiteSpace: "nowrap",
            }}>
              Apply for Free Membership <ArrowRight size={14} />
            </button>
            <button className="hov-btn hov-outline" onClick={onCompare} style={{
              backgroundColor: "transparent", color: C.white,
              border: "1.5px solid rgba(255,255,255,.22)", borderRadius: 100,
              padding: isMobile ? "14px 24px" : "14px 34px",
              fontSize: 13, fontWeight: "500", fontFamily: F.sans, cursor: "pointer",
              width: isMobile ? "100%" : "auto", whiteSpace: "nowrap",
            }}>
              Compare Access Levels
            </button>
          </div>
        </div>

        {/* ── RIGHT: 2×2 image grid ── */}
        <div style={{
          animation: vis ? `fadeUp .9s ${EASE} .35s both` : "none",
          flexShrink: 0,
          alignSelf: isMobile ? "center" : "auto",
        }}>
          <HeroImageGrid size={isMobile ? 340 : 520} />
        </div>

      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   SECTION LABEL UTILITY
───────────────────────────────────────────── */
const SLabel = ({ text, light }) => (
  <div style={{ marginBottom: "24px" }}>
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      backgroundColor: light ? "rgba(184,217,53,.10)" : C.white,
      border: `1px solid ${light ? C.accent : C.line}`,
      color: light ? C.white : C.primary,
      padding: "8px 16px",
      borderRadius: "50px",
      fontSize: "11px",
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: "2px",
      fontFamily: F.sans,
    }}>
      <span style={{
        width: 7, height: 7, borderRadius: "50%", flexShrink: 0,
        backgroundColor: C.accent,
      }} />
      {text}
    </span>
  </div>
);

/* ─────────────────────────────────────────────
   TIER CARDS — ASYMMETRIC LAYOUT
───────────────────────────────────────────── */
const SmallCheck = ({ text, dark }) => (
  <div style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "5px 0" }}>
    <div style={{
      width: 16, height: 16, borderRadius: "50%", flexShrink: 0, marginTop: 1,
      backgroundColor: dark ? "rgba(184,217,53,.12)" : "rgba(27,77,62,.08)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <Check size={8} color={dark ? C.accent : C.primary} strokeWidth={3} />
    </div>
    <span style={{ fontSize: 13, fontFamily: F.body, lineHeight: 1.5,
      color: dark ? "rgba(255,255,255,.7)" : C.muted, fontWeight: "300" }}>{text}</span>
  </div>
);


/* ── MOBILE TIER TAB WIDGET ─────────────────── */
const mobileTiers = [
  {
    id: "public", label: "Public", icon: <Globe size={16}/>,
    badge: null, dark: false,
    title: "Open Access", tagline: "No account required. Explore the public face of BRIDGE.",
    price: "Free", priceNote: "No sign-up needed",
    features: ["Full public website & 12 sector overviews","Mission, methodology & insights pages","Contact & partnership inquiries","Public articles & research"],
    cta: null,
  },
  {
    id: "free", label: "Free", icon: <Users size={16}/>,
    badge: "Start Here", dark: false,
    title: "Network Access", tagline: "Join the BRIDGE network. Intelligence, events, resources, community directory.",
    price: "Free", priceNote: "Application required",
    features: ["Everything in General Public","Newsletter & sector updates","Free resource library access","Event & webinar invitations","Basic sector intelligence reports","Member directory (view only)"],
    cta: "apply-free",
  },
  {
    id: "paid", label: "Paid", icon: <Star size={16}/>,
    badge: "Full Access", dark: true,
    title: "The complete BRIDGE intelligence experience.",
    tagline: "For investors, founders, policymakers, and change-makers serious about Ghana's opportunity landscape.",
    price: "$10", priceNote: "per month · $100/year (save 17%)",
    features: ["BRIDGE Intelligence Dashboard","BRIDGE Applications","All 12 sector deep-dive reports","Full restricted document library","Community — forums & discussions","Investment opportunity pipeline","Monthly analyst briefings","Priority partnership introductions","Early access to new research","Direct access to BRIDGE team"],
    cta: "apply-paid",
    lock: "Requires 30 days as a Free Member",
  },
];

const MobileTierWidget = ({ onApplyFree, onApplyPaid, selected, onSelect }) => {
  const tier = mobileTiers[selected];

  return (
    <div style={{ padding: "0 16px 8px" }}>
      {/* tab bar */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
        backgroundColor: C.white, borderRadius: 14,
        border: `1.5px solid ${C.line}`, padding: 4, marginBottom: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,.05)",
      }}>
        {mobileTiers.map((t, i) => (
          <button key={t.id} onClick={() => onSelect(i)} style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            padding: "9px 0", borderRadius: 10, border: "none", cursor: "pointer",
            fontFamily: F.sans, fontSize: 13, fontWeight: "700",
            backgroundColor: selected === i ? (t.dark ? C.primary : C.accent) : "transparent",
            color: selected === i ? (t.dark ? C.white : C.primary) : C.muted,
            transition: `all .2s ${EASE}`,
          }}>
            {t.icon}{t.label}
          </button>
        ))}
      </div>

      {/* card */}
      <div style={{
        backgroundColor: tier.dark ? C.primary : C.white,
        border: tier.dark ? "none" : `1.5px solid ${C.line}`,
        borderRadius: 20, padding: "24px 20px",
        boxShadow: tier.dark ? "0 12px 40px rgba(10,26,15,.28)" : "0 2px 10px rgba(0,0,0,.04)",
        position: "relative", overflow: "hidden",
        transition: `background .25s ${EASE}`,
      }}>
        {/* badge */}
        {tier.badge && (
          <div style={{
            display: "inline-block", marginBottom: 14,
            backgroundColor: tier.dark ? C.accent : "rgba(184,217,53,.14)",
            color: tier.dark ? C.primary : C.primary,
            fontSize: 9, fontWeight: "800", fontFamily: F.sans,
            letterSpacing: "1.5px", textTransform: "uppercase",
            padding: "4px 10px", borderRadius: 100,
          }}>{tier.badge}</div>
        )}

        {/* title */}
        <h3 style={{
          fontSize: 22, fontFamily: F.sans, fontWeight: "300",
          color: tier.dark ? C.white : C.text,
          lineHeight: 1.2, letterSpacing: "-.3px", marginBottom: 8,
        }}>{tier.title}</h3>
        <p style={{
          fontSize: 13, fontFamily: F.body, fontWeight: "300", lineHeight: 1.6,
          color: tier.dark ? "rgba(255,255,255,.5)" : C.muted, marginBottom: 20,
        }}>{tier.tagline}</p>

        {/* price row */}
        <div style={{
          display: "flex", alignItems: "baseline", gap: 10, marginBottom: 16,
          paddingBottom: 16, borderBottom: `1px solid ${tier.dark ? "rgba(255,255,255,.08)" : C.line}`,
        }}>
          <span style={{ fontSize: 30, fontFamily: F.sans, fontWeight: "700",
            color: tier.dark ? C.white : C.text, letterSpacing: "-1px" }}>{tier.price}</span>
          <span style={{ fontSize: 12, fontFamily: F.body, color: tier.dark ? "rgba(255,255,255,.35)" : C.subtle }}>{tier.priceNote}</span>
        </div>

        {/* features */}
        <div style={{ marginBottom: tier.cta ? 20 : 0 }}>
          {tier.features.map((f, i) => <SmallCheck key={i} text={f} dark={tier.dark} />)}
        </div>

        {/* lock notice */}
        {tier.lock && (
          <div style={{
            backgroundColor: "rgba(184,217,53,.07)", border: "1px solid rgba(184,217,53,.18)",
            borderRadius: 10, padding: "10px 14px", marginTop: 16, marginBottom: 16,
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <Lock size={12} color={C.accent} style={{ flexShrink: 0 }}/>
            <span style={{ fontSize: 12, fontFamily: F.body, color: "rgba(255,255,255,.55)", lineHeight: 1.4 }}>
              <strong style={{ color: C.accent }}>Requires 30 days</strong> as a Free Member
            </span>
          </div>
        )}

        {/* CTA */}
        {tier.cta === "apply-free" && (
          <button className="hov-btn" onClick={onApplyFree} style={{
            width: "100%", padding: "13px", marginTop: 4,
            backgroundColor: "transparent", color: C.primary,
            border: `1.5px solid ${C.primary}`, borderRadius: 100,
            fontSize: 13, fontWeight: "700", fontFamily: F.sans, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          }}>Apply for Free Membership <ArrowRight size={13}/></button>
        )}
        {tier.cta === "apply-paid" && (
          <button className="hov-btn" onClick={onApplyPaid} style={{
            width: "100%", padding: "13px",
            backgroundColor: C.accent, color: C.primary,
            border: "none", borderRadius: 100,
            fontSize: 13, fontWeight: "800", fontFamily: F.sans, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          }}>Apply for Paid Membership <ArrowRight size={13}/></button>
        )}
      </div>
    </div>
  );
};

const tierIcons = [<Globe size={20}/>, <Users size={20}/>, <Star size={20}/>];

const TierSection = ({ isMobile, onApplyFree, onApplyPaid, selected, onSelect }) => {
  const [ref, vis] = useVisible(.08);
  const tier = mobileTiers[selected];

  if (isMobile) {
    return (
      <section id="tier-section" style={{ backgroundColor: C.bg, paddingTop: 56, paddingBottom: 56 }}>
        <div style={{ padding: "0 16px", marginBottom: 28 }}>
          <SLabel text="Access Tiers" />
          <h2 style={{ fontSize: 30, fontFamily: F.sans, fontWeight: "300",
            color: C.text, lineHeight: 1.15, letterSpacing: "-.5px" }}>
            Choose your <span style={{ fontWeight: "600" }}>level</span><br/>of engagement.
          </h2>
        </div>
        <MobileTierWidget onApplyFree={onApplyFree} onApplyPaid={onApplyPaid}
          selected={selected} onSelect={onSelect} />
      </section>
    );
  }

  return (
    <section id="tier-section" style={{ backgroundColor: C.bg, padding: "100px 80px" }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* heading row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, gap: 24 }}>
          <div>
            <SLabel text="Access Tiers" />
            <h2 style={{ fontSize: 52, fontFamily: F.sans, fontWeight: "300",
              color: C.text, lineHeight: 1.1, letterSpacing: "-1.5px" }}>
              Choose your <span style={{ fontWeight: "600" }}>level</span><br/>of engagement.
            </h2>
          </div>
          <p style={{ maxWidth: 340, fontSize: 15, fontFamily: F.body, fontWeight: "300",
            color: C.muted, lineHeight: 1.75 }}>
            Access is structured, not arbitrary. Each tier reflects a genuine
            relationship with BRIDGE and Ghana's opportunity landscape.
          </p>
        </div>

        {/* widget */}
        <div style={{
          display: "grid", gridTemplateColumns: "280px 1fr",
          backgroundColor: C.white, borderRadius: 24,
          border: `1.5px solid ${C.line}`, overflow: "hidden",
          boxShadow: "0 4px 32px rgba(0,0,0,.07)",
          animation: vis ? `fadeUp .7s ${EASE} .1s both` : "none",
          minHeight: 520,
        }}>

          {/* ── LEFT: selector ── */}
          <div style={{ borderRight: `1px solid ${C.line}`, padding: 8, display: "flex", flexDirection: "column", justifyContent: "center", gap: 4 }}>
            {mobileTiers.map((t, i) => (
              <button key={t.id} onClick={() => onSelect(i)} style={{
                width: "100%", display: "flex", alignItems: "center", gap: 14,
                padding: "18px 20px", borderRadius: 14, border: "none", cursor: "pointer",
                backgroundColor: selected === i
                  ? (t.dark ? C.primary : "rgba(27,77,62,.05)")
                  : "transparent",
                textAlign: "left",
                transition: `all .25s ${EASE}`,
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: 10, fontFamily: F.sans, fontWeight: "700",
                    letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 2,
                    color: selected === i ? (t.dark ? "rgba(255,255,255,.4)" : C.accent) : C.subtle,
                  }}>{t.label}</div>
                  <div style={{
                    fontSize: 14, fontFamily: F.sans, fontWeight: "700",
                    color: selected === i ? (t.dark ? C.white : C.text) : C.muted,
                    transition: "color .25s",
                  }}>{t.title}</div>
                </div>
                {selected === i && (
                  <div style={{ width: 7, height: 7, borderRadius: "50%", flexShrink: 0,
                    backgroundColor: t.dark ? C.accent : C.primary }}/>
                )}
              </button>
            ))}
          </div>

          {/* ── RIGHT: detail panel ── */}
          <div style={{
            backgroundColor: tier.dark ? C.primary : C.white,
            padding: "48px 52px",
            position: "relative", overflow: "hidden",
            display: "flex", flexDirection: "column",
            transition: `background .3s ${EASE}`,
          }}>
            {/* badge */}
            {tier.badge && (
              <div style={{
                display: "inline-block", alignSelf: "flex-start", marginBottom: 20,
                backgroundColor: tier.dark ? C.accent : "rgba(184,217,53,.15)",
                color: C.primary, fontSize: 9, fontWeight: "800", fontFamily: F.sans,
                letterSpacing: "1.5px", textTransform: "uppercase",
                padding: "4px 12px", borderRadius: 100,
              }}>{tier.badge}</div>
            )}

            <h3 style={{
              fontSize: 34, fontFamily: F.sans, fontWeight: "300",
              color: tier.dark ? C.white : C.text,
              lineHeight: 1.15, letterSpacing: "-.5px", marginBottom: 10,
            }}>{tier.title}</h3>

            <p style={{
              fontSize: 14, fontFamily: F.body, fontWeight: "300", lineHeight: 1.75,
              color: tier.dark ? "rgba(255,255,255,.5)" : C.muted,
              marginBottom: 24, maxWidth: 460,
            }}>{tier.tagline}</p>

            {/* price */}
            <div style={{
              display: "flex", alignItems: "baseline", gap: 12, marginBottom: 24,
              paddingBottom: 24, borderBottom: `1px solid ${tier.dark ? "rgba(255,255,255,.08)" : C.line}`,
            }}>
              <span style={{ fontSize: 40, fontFamily: F.sans, fontWeight: "700",
                color: tier.dark ? C.white : C.text, letterSpacing: "-1.5px" }}>{tier.price}</span>
              <span style={{ fontSize: 13, fontFamily: F.body,
                color: tier.dark ? "rgba(255,255,255,.35)" : C.subtle }}>{tier.priceNote}</span>
            </div>

            {/* features — 2 col grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: tier.features.length > 4 ? "1fr 1fr" : "1fr",
              columnGap: 32, flex: 1,
              marginBottom: tier.cta ? 28 : 0,
            }}>
              {tier.features.map((f, i) => <SmallCheck key={i} text={f} dark={tier.dark}/>)}
            </div>

            {/* lock */}
            {tier.lock && (
              <div style={{
                backgroundColor: "rgba(184,217,53,.07)", border: "1px solid rgba(184,217,53,.18)",
                borderRadius: 10, padding: "12px 16px", marginBottom: 20,
                display: "flex", alignItems: "center", gap: 10,
              }}>
                <Lock size={13} color={C.accent} style={{ flexShrink: 0 }}/>
                <span style={{ fontSize: 12, fontFamily: F.body, color: "rgba(255,255,255,.55)", lineHeight: 1.5 }}>
                  <strong style={{ color: C.accent }}>Requires 30 days</strong> as a Free Member before applying
                </span>
              </div>
            )}

            {/* CTAs */}
            {tier.cta === "apply-free" && (
              <div style={{ alignSelf: "flex-start" }}>
                <button className="hov-btn" onClick={onApplyFree} style={{
                  backgroundColor: "transparent", color: C.primary,
                  border: `1.5px solid ${C.primary}`, borderRadius: 100,
                  padding: "11px 28px", fontSize: 13, fontWeight: "700",
                  fontFamily: F.sans, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 7,
                }}>Apply for Free Membership <ArrowRight size={13}/></button>
              </div>
            )}
            {tier.cta === "apply-paid" && (
              <div style={{ alignSelf: "flex-start" }}>
                <button className="hov-btn" onClick={onApplyPaid} style={{
                  backgroundColor: C.accent, color: C.primary, border: "none", borderRadius: 100,
                  padding: "13px 36px", fontSize: 14, fontWeight: "800",
                  fontFamily: F.sans, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 8,
                }}>Apply for Paid Membership <ArrowRight size={14}/></button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   THE PATH — JOURNEY
───────────────────────────────────────────── */
const journeySteps = [
  { num: "01", tag: "Explore",    title: "Discover the landscape",    body: "Browse BRIDGE's public site. Read sector overviews, understand the methodology, and see what we're building in Ghana.", icon: <Globe size={20}/> },
  { num: "02", tag: "Join",       title: "Apply as a Free Member",    body: "Submit a brief application. Gain access to resources, newsletters, intelligence reports, and event invitations.",         icon: <Users size={20}/> },
  { num: "03", tag: "Engage",     title: "30 days of depth",          body: "Read reports. Attend webinars. Engage with the content. This period ensures Paid Membership is an informed decision.",    icon: <BookOpen size={20}/> },
  { num: "04", tag: "Unlock",     title: "Apply for Paid Membership", body: "After 30 days, access the full platform — Dashboard, community, restricted documents, investment pipeline.",             icon: <Star size={20}/> },
];

const PathSection = ({ isMobile }) => {
  const [ref, vis]              = useVisible(.08);
  const [openStep, setOpenStep] = useState(null);
  const [activeStep, setStep]   = useState(0);

  /* ── MOBILE ── */
  if (isMobile) {
    return (
      <section style={{ backgroundColor: C.white, overflow: "hidden" }}>
        <div style={{ padding: "40px 20px 52px" }}>
          <SLabel text="The Path" />
          <h2 style={{ fontSize: 30, fontFamily: F.sans, fontWeight: "300",
            color: C.text, lineHeight: 1.18, letterSpacing: "-.5px", marginBottom: 10 }}>
            Membership is <span style={{ fontWeight: "600" }}>intentional.</span>
          </h2>
          <p style={{ fontSize: 14, fontFamily: F.body, fontWeight: "300",
            color: C.muted, lineHeight: 1.75, marginBottom: 28 }}>
            BRIDGE is not a subscription — it's a commitment. Here's how you move from visitor to fully-engaged member.
          </p>
          <div style={{ borderRadius: 16, border: `1.5px solid ${C.line}`, overflow: "hidden" }}>
            {journeySteps.map((step, i) => (
              <div key={i} style={{ borderBottom: i < journeySteps.length - 1 ? `1px solid ${C.line}` : "none" }}>
                <button onClick={() => setOpenStep(openStep === i ? null : i)} style={{
                  width: "100%", background: "none", border: "none", cursor: "pointer",
                  padding: "16px 18px", display: "flex", alignItems: "center", gap: 14, textAlign: "left",
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 9, fontFamily: F.sans, fontWeight: "700",
                      color: C.accent, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 2 }}>
                      {step.num} — {step.tag}
                    </div>
                    <div style={{ fontSize: 15, fontFamily: F.sans, fontWeight: "700",
                      color: openStep === i ? C.primary : C.text, transition: "color .2s" }}>
                      {step.title}
                    </div>
                  </div>
                  <ChevronDown size={16} color={C.muted} style={{
                    flexShrink: 0, transition: "transform .3s",
                    transform: openStep === i ? "rotate(180deg)" : "none",
                  }}/>
                </button>
                {openStep === i && (
                  <div style={{ padding: "0 18px 18px 18px" }}>
                    <p style={{ fontSize: 13, fontFamily: F.body, fontWeight: "300",
                      color: C.muted, lineHeight: 1.75, margin: 0,
                      borderLeft: `3px solid ${C.accent}`, paddingLeft: 14 }}>
                      {step.body}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ── DESKTOP ── */
  return (
    <section ref={ref} style={{ display: "flex", minHeight: 680, backgroundColor: C.white, overflow: "hidden" }}>

      {/* LEFT — full-bleed image panel, no padding, no radius on outer edges */}
      <div style={{ width: "40%", flexShrink: 0, position: "relative", backgroundColor: C.bg }}>
        <ImgPlaceholderLight label="Photo" radius={0} />
        {/* lime foot strip */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, backgroundColor: C.accent }} />
      </div>

      {/* RIGHT — padded content */}
      <div style={{
        flex: 1, minWidth: 0,
        padding: "80px 80px 80px 72px",
        display: "flex", flexDirection: "column", justifyContent: "center",
        animation: vis ? `fadeUp .75s ${EASE} .1s both` : "none",
      }}>
        <SLabel text="The Path" />
        <h2 style={{
          fontSize: 60, fontFamily: F.sans, fontWeight: "300",
          color: C.text, lineHeight: 1.05, letterSpacing: "-2px",
          marginBottom: 16,
        }}>
          Membership is<br/><span style={{ fontWeight: "600" }}>intentional.</span>
        </h2>
        <p style={{
          fontSize: 15, fontFamily: F.body, fontWeight: "300",
          color: C.muted, lineHeight: 1.8, maxWidth: 420, marginBottom: 48,
        }}>
          BRIDGE is not a subscription — it's a commitment.
          Here's how you move from visitor to fully-engaged member.
        </p>

        {/* step widget */}
        <div style={{
          backgroundColor: C.bg, borderRadius: 20,
          border: `1.5px solid ${C.line}`, overflow: "hidden",
        }}>
          {/* tabs */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
            {journeySteps.map((step, i) => (
              <button key={i} onClick={() => setStep(i)} style={{
                padding: "22px 20px 18px",
                border: "none", cursor: "pointer", textAlign: "left",
                borderRight: i < 3 ? `1px solid ${C.line}` : "none",
                borderBottom: `2px solid ${activeStep === i ? C.primary : "transparent"}`,
                backgroundColor: activeStep === i ? C.white : "transparent",
                transition: `all .25s ${EASE}`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: 9, fontFamily: F.sans, fontWeight: "700",
                    color: C.accent, letterSpacing: "1.5px", textTransform: "uppercase" }}>
                    {step.num} — {step.tag}
                  </span>
                </div>
                <div style={{ fontSize: 14, fontFamily: F.sans, fontWeight: "700",
                  color: activeStep === i ? C.primary : C.text,
                  lineHeight: 1.3, transition: "color .25s" }}>
                  {step.title}
                </div>
              </button>
            ))}
          </div>
          {/* detail */}
          <div style={{ padding: "28px 32px", backgroundColor: C.white, borderTop: `1px solid ${C.line}` }}>
            <p style={{ margin: 0, fontSize: 15, fontFamily: F.body, fontWeight: "300",
              color: C.muted, lineHeight: 1.85,
              borderLeft: `3px solid ${C.accent}`, paddingLeft: 18 }}>
              {journeySteps[activeStep].body}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   INSIDE PAID — DARK CINEMATIC
───────────────────────────────────────────── */
const insideItems = [
  { icon: <Layout size={22}/>,        title: "Intelligence Dashboard",     stat: "174+ ventures scored",  body: "A private analytics platform tracking Ghana's opportunity landscape. Live metrics, sector scorecards, and the proprietary BRIDGE Impact Score™ across 12 sectors." },
  { icon: <Database size={22}/>,      title: "Restricted Document Library", stat: "50+ documents",         body: "12 sector deep-dives, white papers, government alignment strategies, budget analyses, and the full BRIDGE Integrated Assessment Framework." },
  { icon: <MessageSquare size={22}/>, title: "BRIDGE Community",            stat: "Invite-only",           body: "High-trust forums for investors, founders, policymakers, and diaspora professionals building Ghana's future together." },
  { icon: <TrendingUp size={22}/>,    title: "Investment Pipeline",         stat: "Active deal flow",      body: "BRIDGE-evaluated opportunities across sectors, with full Impact Scores and investment theses. Visibility reserved for Paid Members." },
];

const GridBg = () => (
  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: .025, pointerEvents: "none" }}
    xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <defs>
      <pattern id="gr" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M60,0 L0,0 L0,60" fill="none" stroke={C.accent} strokeWidth=".6"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#gr)"/>
  </svg>
);

/* ── MOBILE INTEL WIDGET (Inside + Compare combined) ── */
const MobileIntelWidget = ({ tab, setTab }) => {
  const [openItem, setOpenItem] = useState(null);

  const compareGroups = [
    { label: "Open Access", rows: compareRows.slice(0, 5) },
    { label: "Paid Only", rows: compareRows.slice(5) },
  ];

  return (
    <section id="intel-section" style={{ backgroundColor: C.ink, padding: "48px 16px", position: "relative", overflow: "hidden" }}>
      <GridBg/>
      <div style={{ position: "relative", zIndex: 1 }}>
        <SLabel text="Paid Membership" light />
        <h2 style={{ fontSize: 28, fontFamily: F.sans, fontWeight: "300",
          color: C.white, lineHeight: 1.2, letterSpacing: "-.5px", marginBottom: 24 }}>
          What you <span style={{ fontWeight: "600" }}>unlock.</span>
        </h2>

        {/* tab switcher */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          backgroundColor: "rgba(255,255,255,.06)",
          borderRadius: 12, padding: 4, marginBottom: 20,
          border: "1px solid rgba(255,255,255,.08)",
        }}>
          {["What's Unlocked", "Compare Tiers"].map((t, i) => (
            <button key={i} onClick={() => setTab(i)} style={{
              padding: "10px 0", borderRadius: 9, border: "none", cursor: "pointer",
              fontFamily: F.sans, fontSize: 13, fontWeight: "700",
              backgroundColor: tab === i ? C.accent : "transparent",
              color: tab === i ? C.primary : "rgba(255,255,255,.5)",
              transition: `all .2s ${EASE}`,
            }}>{t}</button>
          ))}
        </div>

        {/* tab 0: What's Unlocked — accordion */}
        {tab === 0 && (
          <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,.07)" }}>
            {insideItems.map((item, i) => (
              <div key={i} style={{ borderBottom: i < insideItems.length - 1 ? "1px solid rgba(255,255,255,.06)" : "none" }}>
                <button
                  onClick={() => setOpenItem(openItem === i ? null : i)}
                  style={{
                    width: "100%", background: "none", border: "none", cursor: "pointer",
                    padding: "16px 18px", display: "flex", alignItems: "center", gap: 12, textAlign: "left",
                  }}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                    backgroundColor: openItem === i ? "rgba(184,217,53,.15)" : "rgba(184,217,53,.07)",
                    color: C.accent, display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background .2s",
                  }}>{item.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 9, fontFamily: F.sans, fontWeight: "700",
                      color: C.accent, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 1 }}>
                      {item.stat}
                    </div>
                    <div style={{ fontSize: 15, fontFamily: F.sans, fontWeight: "700",
                      color: C.white, lineHeight: 1.3 }}>{item.title}</div>
                  </div>
                  <ChevronDown size={15} color="rgba(255,255,255,.3)" style={{
                    flexShrink: 0, transition: "transform .3s",
                    transform: openItem === i ? "rotate(180deg)" : "none",
                  }}/>
                </button>
                {openItem === i && (
                  <div style={{ padding: "0 18px 18px 66px" }}>
                    <p style={{ fontSize: 13, fontFamily: F.body, fontWeight: "300",
                      color: "rgba(255,255,255,.45)", lineHeight: 1.75, margin: 0 }}>
                      {item.body}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* tab 1: Compare — grouped mini table */}
        {tab === 1 && (
          <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,.07)" }}>
            {/* header */}
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 52px 52px 64px",
              padding: "12px 16px", backgroundColor: "rgba(255,255,255,.04)",
              borderBottom: "1px solid rgba(255,255,255,.07)",
            }}>
              <div/>
              {["Public","Free","Paid"].map((h, i) => (
                <div key={h} style={{ textAlign: "center", fontSize: 9, fontWeight: "700",
                  fontFamily: F.sans, letterSpacing: "1px", textTransform: "uppercase",
                  color: i === 2 ? C.accent : "rgba(255,255,255,.35)" }}>{h}</div>
              ))}
            </div>
            {compareGroups.map((grp, gi) => (
              <div key={gi}>
                <div style={{ padding: "8px 16px 4px",
                  fontSize: 9, fontFamily: F.sans, fontWeight: "700",
                  color: "rgba(255,255,255,.2)", letterSpacing: "1.5px", textTransform: "uppercase" }}>
                  {grp.label}
                </div>
                {grp.rows.map((row, i) => (
                  <div key={i} style={{
                    display: "grid", gridTemplateColumns: "1fr 52px 52px 64px",
                    padding: "10px 16px", alignItems: "center",
                    backgroundColor: i % 2 === 0 ? "transparent" : "rgba(255,255,255,.02)",
                    borderTop: "1px solid rgba(255,255,255,.04)",
                  }}>
                    <span style={{ fontSize: 12, fontFamily: F.body, color: "rgba(255,255,255,.65)", paddingRight: 6 }}>
                      {row.label}
                    </span>
                    {[row.pub, row.free, row.paid].map((on, ci) => (
                      <div key={ci} style={{ display: "flex", justifyContent: "center" }}>
                        <div style={{
                          width: on ? 18 : 7, height: on ? 18 : 7, borderRadius: "50%",
                          backgroundColor: on ? (ci === 2 ? C.accent : "rgba(255,255,255,.25)") : "transparent",
                          border: on ? "none" : "1.5px solid rgba(255,255,255,.12)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          {on && <Check size={9} color={ci === 2 ? C.primary : "rgba(255,255,255,.7)"} strokeWidth={3}/>}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const InsideSection = ({ isMobile, tab, setTab }) => {
  const [ref, vis]            = useVisible(.1);
  const [activeItem, setActiveItem] = useState(0);

  if (isMobile) return <MobileIntelWidget tab={tab} setTab={setTab} />;

  /* ── DESKTOP: unified tabbed widget ── */
  return (
    <section id="intel-section" ref={ref} style={{ backgroundColor: C.ink, position: "relative",
      overflow: "hidden", padding: "100px 80px" }}>
      <GridBg/>
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* heading row + tab switcher */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
          <div>
            <SLabel text="Inside Paid Membership" light />
            <h2 style={{ fontSize: 52, fontFamily: F.sans, fontWeight: "300",
              color: C.white, lineHeight: 1.1, letterSpacing: "-1.5px" }}>
              What you unlock<br/><span style={{ color: C.accent, fontWeight: "600" }}>on day one.</span>
            </h2>
          </div>
          {/* tab switcher — top right */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            backgroundColor: "rgba(255,255,255,.06)",
            borderRadius: 12, padding: 4, alignSelf: "flex-end",
            border: "1px solid rgba(255,255,255,.08)",
          }}>
            {["What's Unlocked", "Compare Tiers"].map((t, i) => (
              <button key={i} onClick={() => { setTab(i); setActiveItem(0); }} style={{
                padding: "10px 24px", borderRadius: 9, border: "none", cursor: "pointer",
                fontFamily: F.sans, fontSize: 13, fontWeight: "700",
                backgroundColor: tab === i ? C.accent : "transparent",
                color: tab === i ? C.primary : "rgba(255,255,255,.5)",
                transition: `all .2s ${EASE}`, whiteSpace: "nowrap",
              }}>{t}</button>
            ))}
          </div>
        </div>

        {/* ── TAB 0: left list + right detail ── */}
        {tab === 0 && (
          <div style={{
            display: "grid", gridTemplateColumns: "268px 1fr",
            backgroundColor: "rgba(255,255,255,.03)",
            borderRadius: 20, overflow: "hidden",
            border: "1px solid rgba(255,255,255,.07)",
            animation: vis ? `fadeUp .6s ${EASE} .1s both` : "none",
          }}>
            {/* left: item list */}
            <div style={{ borderRight: "1px solid rgba(255,255,255,.06)", padding: 8, display: "flex", flexDirection: "column", justifyContent: "center", gap: 4 }}>
              {insideItems.map((item, i) => (
                <button key={i} onClick={() => setActiveItem(i)} style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 14,
                  padding: "16px 18px", borderRadius: 12, border: "none", cursor: "pointer",
                  backgroundColor: activeItem === i ? "rgba(184,217,53,.08)" : "transparent",
                  borderLeft: `2px solid ${activeItem === i ? C.accent : "transparent"}`,
                  textAlign: "left", transition: `all .2s ${EASE}`,
                }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                    backgroundColor: activeItem === i ? "rgba(184,217,53,.15)" : "rgba(184,217,53,.07)",
                    color: C.accent, display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background .2s",
                  }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: 9, fontFamily: F.sans, fontWeight: "700",
                      color: activeItem === i ? C.accent : "rgba(255,255,255,.3)",
                      letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 2 }}>
                      {item.stat}
                    </div>
                    <div style={{ fontSize: 14, fontFamily: F.sans, fontWeight: "700",
                      color: activeItem === i ? C.white : "rgba(255,255,255,.5)",
                      lineHeight: 1.3, transition: "color .2s" }}>{item.title}</div>
                  </div>
                  {activeItem === i && (
                    <div style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%",
                      backgroundColor: C.accent, flexShrink: 0 }}/>
                  )}
                </button>
              ))}
            </div>

            {/* right: detail panel */}
            <div style={{ padding: "48px 52px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ fontSize: 10, fontFamily: F.sans, fontWeight: "700",
                color: C.accent, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 18 }}>
                {insideItems[activeItem].stat}
              </div>
              <h4 style={{ fontSize: 30, fontFamily: F.sans, fontWeight: "600",
                color: C.white, marginBottom: 20, lineHeight: 1.2, letterSpacing: "-.5px" }}>
                {insideItems[activeItem].title}
              </h4>
              <p style={{ fontSize: 16, fontFamily: F.body, fontWeight: "300",
                color: "rgba(255,255,255,.45)", lineHeight: 1.85, maxWidth: 520,
                borderLeft: `3px solid ${C.accent}`, paddingLeft: 20 }}>
                {insideItems[activeItem].body}
              </p>
            </div>
          </div>
        )}

        {/* ── TAB 1: comparison table ── */}
        {tab === 1 && (
          <div style={{
            backgroundColor: "rgba(255,255,255,.03)", borderRadius: 20,
            border: "1px solid rgba(255,255,255,.07)", overflow: "hidden",
            animation: vis ? `fadeUp .6s ${EASE} .1s both` : "none",
          }}>
            {/* header */}
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 130px 130px 150px",
              padding: "20px 36px 16px",
              borderBottom: "1px solid rgba(255,255,255,.07)",
              backgroundColor: "rgba(255,255,255,.03)",
            }}>
              <div/>
              {["Public","Free","Paid"].map((h, i) => (
                <div key={h} style={{ textAlign: "center", fontSize: 11, fontWeight: "700",
                  fontFamily: F.sans, letterSpacing: "1px", textTransform: "uppercase",
                  color: i === 2 ? C.accent : "rgba(255,255,255,.35)",
                  paddingBottom: i === 2 ? 6 : 0,
                  borderBottom: i === 2 ? `2px solid ${C.accent}` : "none",
                }}>{h}</div>
              ))}
            </div>
            {/* grouped rows */}
            {[
              { label: "Open Access",  rows: compareRows.slice(0, 5) },
              { label: "Paid Only",    rows: compareRows.slice(5)    },
            ].map((grp, gi) => (
              <div key={gi}>
                <div style={{ padding: "10px 36px 4px", fontSize: 9, fontFamily: F.sans,
                  fontWeight: "700", color: "rgba(255,255,255,.2)", letterSpacing: "1.5px",
                  textTransform: "uppercase" }}>{grp.label}</div>
                {grp.rows.map((row, i) => (
                  <div key={i} style={{
                    display: "grid", gridTemplateColumns: "1fr 130px 130px 150px",
                    padding: "13px 36px", alignItems: "center",
                    backgroundColor: i % 2 === 0 ? "transparent" : "rgba(255,255,255,.02)",
                    borderTop: "1px solid rgba(255,255,255,.04)",
                  }}>
                    <span style={{ fontSize: 14, fontFamily: F.body, color: "rgba(255,255,255,.7)" }}>{row.label}</span>
                    {[row.pub, row.free, row.paid].map((on, ci) => (
                      <div key={ci} style={{ display: "flex", justifyContent: "center" }}>
                        <div style={{
                          width: on ? 20 : 8, height: on ? 20 : 8, borderRadius: "50%",
                          backgroundColor: on ? (ci === 2 ? C.accent : "rgba(255,255,255,.22)") : "transparent",
                          border: on ? "none" : "1.5px solid rgba(255,255,255,.14)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          {on && <Check size={9} color={ci === 2 ? C.primary : "rgba(255,255,255,.7)"} strokeWidth={3}/>}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   COMPARISON TABLE
───────────────────────────────────────────── */
const compareRows = [
  { label: "Public website & 12 sector overviews",    pub: true,  free: true,  paid: true  },
  { label: "BRIDGE newsletter & sector updates",       pub: false, free: true,  paid: true  },
  { label: "Event & webinar access",                   pub: false, free: true,  paid: true  },
  { label: "Free resource library",                    pub: false, free: true,  paid: true  },
  { label: "Basic intelligence reports",               pub: false, free: true,  paid: true  },
  { label: "Full restricted document library",         pub: false, free: false, paid: true  },
  { label: "BRIDGE Intelligence Dashboard",            pub: false, free: false, paid: true  },
  { label: "All 12 sector deep-dive reports",          pub: false, free: false, paid: true  },
  { label: "BRIDGE Community — forums",                pub: false, free: false, paid: true  },
  { label: "Investment opportunity pipeline",           pub: false, free: false, paid: true  },
  { label: "Monthly analyst briefings",                pub: false, free: false, paid: true  },
  { label: "Priority partnership introductions",       pub: false, free: false, paid: true  },
];

const CompareSection = () => null;

/* ─────────────────────────────────────────────
   FAQ
───────────────────────────────────────────── */
const faqs = [
  { q: "Why the 30-day wait before applying for Paid Membership?",
    a: "BRIDGE is a community of committed stakeholders, not a subscription. The 30-day period lets you genuinely understand our work before committing — and it ensures the community remains high-trust. Every Paid Member knows what BRIDGE is before they arrive." },
  { q: "What exactly is the BRIDGE Intelligence Dashboard?",
    a: "A private, data-rich platform tracking Ghana's opportunity landscape across all 12 sectors. It includes live metrics, sector scorecards, investment pipeline visibility, and BRIDGE's proprietary BRIDGE Impact Score™ across 174+ evaluated ventures. Not publicly accessible." },
  { q: "What's in the restricted document library?",
    a: "All 12 sector deep-dive analyses, white papers, government partnership strategies, agricultural positioning documents, budget alignment reports, and the full BRIDGE Integrated Assessment Framework — research that takes months to produce." },
  { q: "What does Paid Membership cost?",
    a: "$10 per month, or $100 per year — saving you 17% when you commit annually. Payment is processed only after your application is reviewed and approved. The cost is kept deliberately accessible — the mission is empowerment, not exclusivity." },
  { q: "Can organizations apply for membership?",
    a: "Currently memberships are individual. Organizations seeking institutional relationships with BRIDGE should use the Contact page — those are handled through our partnership framework separately." },
  { q: "What if I don't qualify yet?",
    a: "Apply for Free Membership today. Engage for 30 days. Then apply for Paid Membership. The path is clear and the timeline is short — nothing stops you from beginning right now." },
];

const FAQSection = ({ isMobile }) => {
  const [open, setOpen]       = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [ref, vis]            = useVisible(.1);
  const visible = isMobile && !showAll ? faqs.slice(0, 3) : faqs;

  const contactCard = (
    <div style={{
      backgroundColor: C.primary, borderRadius: 20,
      padding: isMobile ? "28px 24px" : "32px 32px",
      marginTop: isMobile ? 16 : 20,
    }}>
      <div style={{ fontSize: 10, fontFamily: F.sans, fontWeight: "700",
        color: C.accent, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 10 }}>
        Still have questions?
      </div>
      <p style={{ fontSize: isMobile ? 14 : 15, fontFamily: F.body, fontWeight: "300",
        color: "rgba(255,255,255,.65)", lineHeight: 1.75, marginBottom: 24 }}>
        Our team responds to every inquiry. Reach out directly and we'll give you a clear, honest answer.
      </p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button className="hov-btn" style={{
          backgroundColor: C.accent, color: C.primary, border: "none",
          borderRadius: 100, padding: "11px 22px",
          fontSize: 13, fontWeight: "800", fontFamily: F.sans, cursor: "pointer",
          display: "flex", alignItems: "center", gap: 7, whiteSpace: "nowrap",
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          Contact Us
        </button>
        <button className="hov-btn hov-outline" style={{
          backgroundColor: "transparent", color: "rgba(255,255,255,.8)",
          border: "1.5px solid rgba(255,255,255,.2)", borderRadius: 100,
          padding: "11px 22px", fontSize: 13, fontWeight: "500", fontFamily: F.sans,
          cursor: "pointer", whiteSpace: "nowrap",
        }}>
          Join Free
        </button>
      </div>
    </div>
  );

  /* ── MOBILE: stacked ── */
  if (isMobile) {
    return (
      <section style={{ backgroundColor: C.white, padding: "52px 20px" }}>
        <SLabel text="Questions" />
        <h2 style={{ fontSize: 30, fontFamily: F.sans, fontWeight: "300",
          color: C.text, lineHeight: 1.1, letterSpacing: "-.5px", marginBottom: 28 }}>
          <span style={{ fontWeight: "600" }}>Frequently</span> asked.
        </h2>
        {/* image + contact card stacked */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ borderRadius: 20, overflow: "hidden", height: 240, backgroundColor: C.bg }}>
            <ImgPlaceholderLight label="Photo" />
          </div>
          {contactCard}
        </div>
        {/* accordion */}
        <div>
          {visible.map((f, i) => (
            <div key={i} style={{ borderTop: `1px solid ${C.line}`, padding: "2px 0" }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{
                width: "100%", textAlign: "left", background: "none", border: "none",
                padding: "16px 8px", cursor: "pointer",
                display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16,
              }}>
                <span style={{ fontSize: 14, fontFamily: F.sans, fontWeight: "600",
                  color: open === i ? C.primary : C.text, lineHeight: 1.4, transition: "color .2s" }}>
                  {f.q}
                </span>
                <div style={{ flexShrink: 0, color: open === i ? C.primary : C.muted,
                  transition: "color .2s, transform .3s",
                  transform: open === i ? "rotate(180deg)" : "none", marginTop: 2 }}>
                  <ChevronDown size={16}/>
                </div>
              </button>
              {open === i && (
                <div style={{ padding: "0 8px 16px" }}>
                  <p style={{ margin: 0, fontSize: 13, fontFamily: F.body, fontWeight: "300",
                    color: C.muted, lineHeight: 1.85,
                    borderLeft: `3px solid ${C.accent}`, paddingLeft: 16 }}>{f.a}</p>
                </div>
              )}
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${C.line}` }}/>
          {!showAll && (
            <button onClick={() => setShowAll(true)} style={{
              width: "100%", marginTop: 16, padding: "12px",
              background: "none", border: `1.5px solid ${C.line}`, borderRadius: 100,
              fontFamily: F.sans, fontSize: 13, fontWeight: "700", color: C.primary,
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}>
              Show all {faqs.length} questions <ChevronDown size={14}/>
            </button>
          )}
        </div>
      </section>
    );
  }

  /* ── DESKTOP: left column (image + contact card) + right accordion ── */
  return (
    <section ref={ref} style={{ backgroundColor: C.white, padding: "100px 80px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 72, alignItems: "flex-start" }}>

        {/* LEFT: image + contact card */}
        <div style={{
          width: 380, flexShrink: 0,
          animation: vis ? `fadeUp .8s ${EASE} .1s both` : "none",
          position: "sticky", top: 40,
        }}>
          {/* image */}
          <div style={{ borderRadius: 20, overflow: "hidden", height: 320, backgroundColor: C.bg }}>
            <ImgPlaceholderLight label="Photo" />
          </div>
          {/* contact card */}
          {contactCard}
        </div>

        {/* RIGHT: FAQ accordion */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ marginBottom: 48 }}>
            <SLabel text="Questions" />
            <h2 style={{ fontSize: 52, fontFamily: F.sans, fontWeight: "300",
              color: C.text, lineHeight: 1.08, letterSpacing: "-1.5px" }}>
              <span style={{ fontWeight: "600" }}>Frequently</span> asked.
            </h2>
          </div>

          <div style={{ animation: vis ? `fadeUp .7s ${EASE} .2s both` : "none" }}>
            {faqs.map((f, i) => (
              <div key={i} style={{
                borderTop: `1px solid ${C.line}`,
                borderRadius: open === i ? 16 : 0,
                backgroundColor: open === i ? C.bg : "transparent",
                boxShadow: open === i ? `0 0 0 1px ${C.line}` : "none",
                marginBottom: open === i ? 8 : 0,
                marginTop: open === i ? -1 : 0,
                overflow: "hidden",
                transition: `background-color .2s ${EASE}`,
              }}>
                <button onClick={() => setOpen(open === i ? null : i)} style={{
                  width: "100%", textAlign: "left", background: "none", border: "none",
                  padding: "22px 20px", cursor: "pointer",
                  display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20,
                }}>
                  <span style={{ fontSize: 17, fontFamily: F.sans, fontWeight: "600",
                    color: open === i ? C.primary : C.text, lineHeight: 1.4, transition: "color .2s" }}>
                    {f.q}
                  </span>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                    backgroundColor: open === i ? C.primary : C.bg,
                    border: `1.5px solid ${open === i ? C.primary : C.line}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: open === i ? C.white : C.muted,
                    transition: `all .25s ${EASE}`,
                    transform: open === i ? "rotate(180deg)" : "none",
                    marginTop: 2,
                  }}>
                    <ChevronDown size={14}/>
                  </div>
                </button>
                {open === i && (
                  <div style={{ padding: "0 20px 24px" }}>
                    <p style={{ margin: 0, fontSize: 15, fontFamily: F.body, fontWeight: "300",
                      color: C.muted, lineHeight: 1.85,
                      borderLeft: `3px solid ${C.accent}`, paddingLeft: 18 }}>{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   BOTTOM CTA
───────────────────────────────────────────── */
const BottomCTA = ({ isMobile, onApplyFree, onApplyPaid }) => {
  const [ref, vis] = useVisible(.2);

  return (
    <section ref={ref} style={{ backgroundColor: C.primary, position: "relative",
      overflow: "hidden", padding: isMobile ? "56px 20px" : "120px 80px" }}>
      {/* giant background number */}
      <div style={{
        position: "absolute", right: isMobile ? 10 : 60, top: "50%",
        transform: "translateY(-50%)",
        fontSize: isMobile ? 200 : 380, fontFamily: F.sans, fontWeight: "300",
        color: "rgba(255,255,255,.022)", lineHeight: 1, pointerEvents: "none",
        userSelect: "none", letterSpacing: "-12px",
      }}>30</div>

      <div style={{
        maxWidth: 700, margin: "0 auto", textAlign: "center",
        position: "relative", zIndex: 1,
        animation: vis ? `fadeUp .8s ${EASE} .1s both` : "none",
      }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <SLabel text="Get Started" light />
        </div>
        <h2 style={{ fontSize: isMobile ? 38 : 64, fontFamily: F.sans, fontWeight: "300",
          color: C.white, lineHeight: 1.06, letterSpacing: isMobile ? "-1px" : "-1.5px", marginBottom: 24 }}>
          The first step is<br/><span style={{ color: C.accent, fontWeight: "600" }}>always free.</span>
        </h2>
        <p style={{ fontSize: isMobile ? 16 : 18, fontFamily: F.body, fontWeight: "300",
          color: "rgba(255,255,255,.5)", lineHeight: 1.8,
          margin: "0 auto 52px", maxWidth: 460 }}>
          Apply as a Free Member. Engage for 30 days. Then, if you're ready to act
          on Ghana's opportunity landscape — unlock everything.
        </p>
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 12, justifyContent: "center",
        }}>
          <button className="hov-btn" onClick={onApplyFree} style={{
            backgroundColor: C.accent, color: C.primary, border: "none", borderRadius: 100,
            padding: isMobile ? "15px 24px" : "16px 42px",
            fontSize: 14, fontWeight: "800", fontFamily: F.sans, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            width: isMobile ? "100%" : "auto", whiteSpace: "nowrap",
          }}>
            Apply for Free Membership <ArrowRight size={14}/>
          </button>
          <button className="hov-btn hov-outline" onClick={onApplyPaid} style={{
            backgroundColor: "transparent", color: "rgba(255,255,255,.75)",
            border: "1.5px solid rgba(255,255,255,.2)", borderRadius: 100,
            padding: isMobile ? "15px 24px" : "16px 42px",
            fontSize: 14, fontWeight: "500", fontFamily: F.sans, cursor: "pointer",
            width: isMobile ? "100%" : "auto", whiteSpace: "nowrap",
          }}>
            View Paid Membership
          </button>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */

/* ─────────────────────────────────────────────
   ROOT
───────────────────────────────────────────── */
export default function MembershipPage({ onApplyPaid, onApplyFree }) {
  const [isMobile, setM]      = useState(false);
  const [tierSel, setTierSel] = useState(1);   // default: Free
  const [intelTab, setIntelTab] = useState(0); // default: What's Unlocked

  useEffect(() => {
    const fn = () => setM(window.innerWidth < 768);
    fn(); window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const hFree = onApplyFree || (() => {});
  const hPaid = onApplyPaid || (() => {});

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleCompare = () => {
    setIntelTab(1);
    setTimeout(() => scrollTo("intel-section"), 50);
  };

  const handleViewPaid = () => {
    setTierSel(2);
    setTimeout(() => scrollTo("tier-section"), 50);
  };

  return (
    <>
      <FontLoader/>
      <GlobalStyles/>
      <div style={{ backgroundColor: C.bg, minHeight: "100vh" }}>
        <Hero isMobile={isMobile} onApplyFree={hFree} onCompare={handleCompare}/>
        <TierSection isMobile={isMobile} onApplyFree={hFree} onApplyPaid={hPaid}
          selected={tierSel} onSelect={setTierSel}/>
        <PathSection isMobile={isMobile}/>
        <InsideSection isMobile={isMobile} tab={intelTab} setTab={setIntelTab}/>
        <CompareSection isMobile={isMobile}/>
        <FAQSection isMobile={isMobile}/>
        <BottomCTA isMobile={isMobile} onApplyFree={hFree} onApplyPaid={handleViewPaid}/>
      </div>
    </>
  );
}
