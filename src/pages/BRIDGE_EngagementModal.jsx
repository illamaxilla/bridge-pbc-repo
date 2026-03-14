import { useState, useEffect } from "react";

// ─────────────────────────────────────────────
// TOKENS
// ─────────────────────────────────────────────
const C = {
  primary:     "#1B4D3E",
  primaryDark: "#163f32",
  primaryDeep: "#0f2e24",
  accent:      "#B8D935",
  accentLight: "#E8F5E0",
  bg:          "#F3F5F2",
  white:       "#FFFFFF",
  dark:        "#191919",
  mid:         "#666666",
  faint:       "#999999",
  line:        "#DEDEDE",
  lineStrong:  "#C8C8C8",
};

// ─────────────────────────────────────────────
// INTENT MAP
// ─────────────────────────────────────────────
const INTENTS = {
  briefing: {
    badge: "30-Min Briefing",
    headline: ["Schedule a", "Briefing"],
    sub: "Pick a date and time — we'll walk you through BRIDGE's portfolio, methodology, and how we can work together.",
    cta: "Confirm Briefing",
    successTitle: "Briefing Confirmed",
    successMsg: "You're booked. A calendar invite and confirmation will be sent to your email shortly.",
    panelStat: { n: "30", unit: "min", label: "Focused briefing" },
  },
  scope: {
    badge: "Full Package Scope",
    headline: ["Request the Full", "Package Scope"],
    sub: "Get the complete documentation — sector analyses, investment summaries, and government alignment materials.",
    cta: "Request Scope",
    successTitle: "Scope Request Received",
    successMsg: "We'll prepare your full package and reach out within 2–3 business days.",
    panelStat: { n: "60K+", unit: "", label: "Words of analysis" },
  },
  partnership: {
    badge: "Partnership Enquiry",
    headline: ["Start a", "Partnership Conversation"],
    sub: "Tell us about your organization and goals. We'll identify where BRIDGE and your work can create the most impact.",
    cta: "Send Enquiry",
    successTitle: "Enquiry Received",
    successMsg: "Thank you for your interest. Our team will be in touch within 3–5 business days.",
    panelStat: { n: "12", unit: "", label: "Integrated sectors" },
  },
  discovery: {
    badge: "Discovery Session",
    headline: ["Request a", "Discovery Session"],
    sub: "A focused session to explore how BRIDGE's 12-sector portfolio aligns with your mandate.",
    cta: "Confirm Session",
    successTitle: "Session Confirmed",
    successMsg: "Your discovery session is booked. A calendar invite will be sent to your email.",
    panelStat: { n: "174+", unit: "", label: "Ventures identified" },
  },
  advisory: {
    badge: "Deployment Advisory",
    headline: ["Enquire About", "Deployment Advisory"],
    sub: "Explore how BRIDGE's deployment advisory services can accelerate your capital deployment in Ghana's growth sectors.",
    cta: "Send Enquiry",
    successTitle: "Advisory Enquiry Received",
    successMsg: "The BRIDGE advisory team will review your enquiry and follow up within 3–5 business days.",
    panelStat: { n: "GH₵8.9B", unit: "", label: "Budget alignment" },
  },
  connect: {
    badge: "Get in Touch",
    headline: ["Let's", "Connect"],
    sub: "Share a bit about yourself and your goals. We'll be in touch to explore how we can work together.",
    cta: "Send Message",
    successTitle: "Message Received",
    successMsg: "Thank you for reaching out. The BRIDGE team will be in touch within 3–5 business days.",
    panelStat: { n: "3–5", unit: "", label: "Business day response" },
  },
};

const SCHEDULING_INTENTS = ["briefing", "discovery"];

const TIME_SLOTS = [
  { label: "9:00 AM",  value: "09:00", period: "morning" },
  { label: "10:00 AM", value: "10:00", period: "morning" },
  { label: "11:00 AM", value: "11:00", period: "morning" },
  { label: "2:00 PM",  value: "14:00", period: "afternoon" },
  { label: "3:00 PM",  value: "15:00", period: "afternoon" },
  { label: "4:00 PM",  value: "16:00", period: "afternoon" },
  { label: "5:00 PM",  value: "17:00", period: "evening" },
  { label: "6:00 PM",  value: "18:00", period: "evening" },
];

const DAYS   = ["Su","Mo","Tu","We","Th","Fr","Sa"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
const fmtDate = d => d ? d.toLocaleDateString("en-US", { weekday:"long", month:"long", day:"numeric", year:"numeric" }) : "";
const fmtShort = d => d ? d.toLocaleDateString("en-US", { weekday:"short", month:"short", day:"numeric" }) : "";
const fmtTime = t => t ? (TIME_SLOTS.find(s => s.value === t)?.label || t) : "";

// ─────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────
const useIsMobile = () => {
  const [v, setV] = useState(() => typeof window !== "undefined" ? window.innerWidth <= 680 : false);
  useEffect(() => {
    const fn = () => setV(window.innerWidth <= 680);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return v;
};

// ─────────────────────────────────────────────
// LOGO
// ─────────────────────────────────────────────
const LogoWhite = () => (
  <svg height="28" viewBox="0 0 3434.33 932.3" xmlns="http://www.w3.org/2000/svg">
    <defs><style>{`.elw1,.elw2{fill:#fff;}.elw2{stroke:#fff;stroke-width:.5px;stroke-miterlimit:10;}.elw3{fill:none;stroke:#fff;stroke-width:80px;stroke-miterlimit:10;}.elw5{fill:#B8D935;stroke:#fff;stroke-miterlimit:10;}.elw6{fill:#B8D935;}`}</style></defs>
    <g><g>
      <path className="elw6" d="M2070.26,927.95c-.2.2-.5.4-.7.5h-.3l1-.5Z"/>
      <path className="elw1" d="M1853.06,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9h0ZM1894.56,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1v.1Z"/>
      <path className="elw2" d="M1431.68,224.45h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.05c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5l.1.1h0Z"/>
      <path className="elw2" d="M1488.08,578.65v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"/>
      <rect className="elw6" x="1427.38" y="17.35" width="205.2" height="145"/>
      <rect className="elw1" x="1427.48" y="221.75" width="205.2" height="693.2" rx="9.6" ry="9.6"/>
      <path className="elw1" d="M2757.31,19.09h491.3c5.42,0,9.82,4.4,9.82,9.82v218.7c0,5.42-4.4,9.82-9.82,9.82h-507.36c-56.98,0-108.53,23.02-145.87,60.35-37.34,37.23-60.45,88.79-60.45,145.66,0,113.75,92.37,206.01,206.32,206.01h12.89c2.86,0,5.11,2.25,5.11,5.11v236.7c0,1.13-.92,1.94-1.94,1.94h0c-242.22,0-438.52-195.99-438.52-437.8v-18.51c0-241.81,196.29-437.8,438.52-437.8h0Z"/>
      <rect className="elw1" x="2812.75" y="339.47" width="216.75" height="572.62" rx="9.6" ry="9.6"/>
      <rect className="elw6" x="3083.41" y="339.47" width="175.12" height="257.67"/>
      <rect className="elw6" x="3083.41" y="654.42" width="175.12" height="257.67"/>
      <rect className="elw3" x="40" y="40" width="843.91" height="852.3" rx="36.55" ry="36.55"/>
      <polygon className="elw5" points="722.6 322.13 462.28 452.8 201.97 322.75 461.21 192.52 722.6 322.13"/>
      <path className="elw1" d="M197.84,426.78c3.86-.53,7.04.85,10.74,1.41l252.53,125.67c84.54-40,167.66-83.83,251.89-124.84,33.14-11.49,50.09,34.15,18.55,49.11l-259.23,129.08c-10.18,3.72-14.14,2.57-23.85-1.31l-264.23-132.98c-17.04-14.4-7.96-43.2,13.61-46.14h0Z"/>
      <path className="elw6" d="M195.25,558c3.65-.63,7.4-.4,11.08-.22,86.11,40.47,170.4,85.05,255.95,126.78l252.92-126c29.53-7.22,45.44,28.67,22.29,46.49l-270.42,134.42-8.62.31c-91.6-42.21-181.07-89.86-271.7-134.42-18.72-12.06-13.3-43.58,8.5-47.37h0Z"/>
    </g></g>
  </svg>
);

// ─────────────────────────────────────────────
// FORM PRIMITIVES
// ─────────────────────────────────────────────
const inputBase = (focused) => ({
  padding: "14px 16px", borderRadius: "12px",
  border: `1.5px solid ${focused ? C.primary : C.line}`,
  backgroundColor: focused ? C.white : C.bg,
  fontSize: "15px", fontFamily: "Inter, sans-serif", color: C.dark,
  outline: "none", transition: "border-color 0.18s ease, background-color 0.18s ease, box-shadow 0.18s ease",
  boxSizing: "border-box", width: "100%",
  boxShadow: focused ? "0 0 0 3px rgba(27,77,62,0.07)" : "none",
});
const labelStyle = {
  fontSize: "11px", fontWeight: "700", fontFamily: "Inter, sans-serif",
  color: C.primary, letterSpacing: "0.9px", textTransform: "uppercase",
  marginBottom: "6px", display: "block",
};

const Field = ({ label, type = "text", placeholder, value, onChange, required }) => {
  const [f, setF] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label style={labelStyle}>{label}{required && <span style={{ color: C.accent, marginLeft: "3px" }}>*</span>}</label>
      <input type={type} placeholder={placeholder} value={value} onChange={onChange} required={required}
        onFocus={() => setF(true)} onBlur={() => setF(false)}
        style={inputBase(f)} />
    </div>
  );
};

const TextareaField = ({ label, placeholder, value, onChange }) => {
  const [f, setF] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label style={labelStyle}>{label}</label>
      <textarea placeholder={placeholder} value={value} onChange={onChange} rows={3}
        onFocus={() => setF(true)} onBlur={() => setF(false)}
        style={{ ...inputBase(f), resize: "vertical", minHeight: "88px", lineHeight: "1.6" }} />
    </div>
  );
};

// ─────────────────────────────────────────────
// LEFT PANEL
// ─────────────────────────────────────────────
const EngPanel = ({ intent }) => {
  const cfg = INTENTS[intent] || INTENTS.connect;
  const items = [
    "Ghana's premier investment intelligence platform",
    "Institutional-grade research across 12 sectors",
    "Direct access to the BRIDGE team",
  ];
  return (
    <div style={{
      background: `linear-gradient(160deg, ${C.primaryDeep} 0%, ${C.primary} 100%)`,
      padding: "44px 36px", display: "flex", flexDirection: "column",
      justifyContent: "space-between", position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.035, backgroundImage: `radial-gradient(circle, ${C.white} 1px, transparent 1px)`, backgroundSize: "22px 22px" }}/>
      <div style={{ position: "relative" }}>
        <LogoWhite />
        <div style={{ marginTop: "36px" }}>
          <div style={{ display: "inline-block", padding: "5px 12px", border: "1px solid rgba(184,217,53,0.35)", borderRadius: "50px", marginBottom: "16px" }}>
            <span style={{ fontSize: "10px", fontWeight: "700", fontFamily: "Inter, sans-serif", color: C.accent, letterSpacing: "1.2px", textTransform: "uppercase" }}>{cfg.badge}</span>
          </div>
          <h2 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "24px", fontWeight: "700", color: C.white, lineHeight: "1.35", margin: "0 0 16px 0" }}>
            {cfg.headline[0]} <em>{cfg.headline[1]}</em>
          </h2>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", fontFamily: "Inter, sans-serif", lineHeight: "1.7", margin: 0 }}>{cfg.sub}</p>
        </div>

        {/* Checklist */}
        <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "12px" }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <div style={{ width: "18px", height: "18px", borderRadius: "50%", backgroundColor: "rgba(184,217,53,0.15)", border: "1px solid rgba(184,217,53,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="3.5"><path d="M20 6L9 17l-5-5"/></svg>
              </div>
              <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", fontFamily: "Inter, sans-serif", lineHeight: "1.5" }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom stat */}
      <div style={{ position: "relative" }}>
        <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.1)", marginBottom: "24px" }}/>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "12px" }}>
          <div>
            <div style={{ fontSize: cfg.panelStat.n.length > 5 ? "22px" : "32px", fontWeight: "800", fontFamily: "Inter, sans-serif", color: C.accent, lineHeight: 1 }}>{cfg.panelStat.n}<span style={{ fontSize: cfg.panelStat.n.length > 5 ? "13px" : "16px", marginLeft: "2px" }}>{cfg.panelStat.unit}</span></div>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif", marginTop: "4px" }}>{cfg.panelStat.label}</div>
          </div>
        </div>
        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)", fontFamily: "Inter, sans-serif", margin: "20px 0 0 0" }}>© 2026 BRIDGE PBC · All rights reserved</p>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// CALENDAR WIDGET
// ─────────────────────────────────────────────
const CalendarPicker = ({ selectedDate, onSelectDate, onSelectTime }) => {
  const today = new Date(); today.setHours(0,0,0,0);
  const [yr,  setYr]  = useState(today.getFullYear());
  const [mo,  setMo]  = useState(today.getMonth());
  const [hov, setHov] = useState(null);

  const next = () => { if (mo === 11) { setMo(0); setYr(y => y+1); } else setMo(m => m+1); };
  const prev = () => { if (mo === 0)  { setMo(11); setYr(y => y-1); } else setMo(m => m-1); };

  const firstDow = new Date(yr, mo, 1).getDay();
  const daysIn   = new Date(yr, mo+1, 0).getDate();
  const cells    = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= daysIn; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const isOff  = d => { if (!d) return true; const dt = new Date(yr,mo,d); return dt < today || dt.getDay()===0 || dt.getDay()===6; };
  const isSel  = d => d && selectedDate && selectedDate.getDate()===d && selectedDate.getMonth()===mo && selectedDate.getFullYear()===yr;
  const isTdy  = d => d && d===today.getDate() && mo===today.getMonth() && yr===today.getFullYear();
  const noPrev = yr===today.getFullYear() && mo===today.getMonth();

  const pick = d => { if (isOff(d)) return; onSelectDate(new Date(yr,mo,d)); onSelectTime(null); };

  return (
    <div style={{ border: `1.5px solid ${C.line}`, borderRadius: "14px", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: C.primary, padding: "12px 16px" }}>
        <button type="button" onClick={prev} disabled={noPrev} style={{ background: "none", border: "none", cursor: noPrev ? "not-allowed" : "pointer", color: noPrev ? "rgba(255,255,255,0.2)" : C.white, padding: "6px 10px", borderRadius: "8px", fontSize: "18px", lineHeight: 1, transition: "background 0.15s" }}
          onMouseEnter={e => { if(!noPrev) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"; }}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
        >‹</button>
        <span style={{ fontSize: "14px", fontWeight: "700", fontFamily: "Inter, sans-serif", color: C.white, letterSpacing: "0.3px" }}>{MONTHS[mo]} {yr}</span>
        <button type="button" onClick={next} style={{ background: "none", border: "none", cursor: "pointer", color: C.white, padding: "6px 10px", borderRadius: "8px", fontSize: "18px", lineHeight: 1, transition: "background 0.15s" }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
        >›</button>
      </div>

      {/* Day headers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", backgroundColor: C.bg, borderBottom: `1px solid ${C.line}` }}>
        {DAYS.map(d => (
          <div key={d} style={{ padding: "8px 0", textAlign: "center", fontSize: "10px", fontWeight: "800", fontFamily: "Inter, sans-serif", color: (d==="Su"||d==="Sa") ? "#ccc" : C.faint, letterSpacing: "0.5px", textTransform: "uppercase" }}>{d}</div>
        ))}
      </div>

      {/* Cells */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", padding: "8px", gap: "3px", backgroundColor: C.white }}>
        {cells.map((d, i) => {
          const off = isOff(d); const sel = isSel(d); const tdy = isTdy(d); const h = hov===i && !off && !sel;
          return (
            <div key={i} onClick={() => pick(d)} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
              style={{
                height: "38px", display: "flex", alignItems: "center", justifyContent: "center",
                borderRadius: "9px", cursor: d && !off ? "pointer" : "default",
                backgroundColor: sel ? C.primary : h ? C.accentLight : tdy ? `${C.accent}28` : "transparent",
                border: tdy && !sel ? `1.5px solid ${C.accent}` : "1.5px solid transparent",
                transition: "background-color 0.13s ease, border-color 0.13s ease, color 0.13s ease",
                fontSize: "13px", fontWeight: sel || tdy ? "700" : "400",
                fontFamily: "Inter, sans-serif",
                color: sel ? C.white : off ? "#d0d0d0" : C.dark,
                userSelect: "none",
              }}
            >{d||""}</div>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{ padding: "8px 16px 12px", display: "flex", alignItems: "center", gap: "16px", borderTop: `1px solid ${C.line}`, backgroundColor: C.white }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "12px", height: "12px", borderRadius: "3px", backgroundColor: C.primary }}/>
          <span style={{ fontSize: "10px", color: C.faint, fontFamily: "Inter, sans-serif" }}>Selected</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "12px", height: "12px", borderRadius: "3px", border: `1.5px solid ${C.accent}`, backgroundColor: `${C.accent}28` }}/>
          <span style={{ fontSize: "10px", color: C.faint, fontFamily: "Inter, sans-serif" }}>Today</span>
        </div>
        <span style={{ fontSize: "10px", color: "#ccc", fontFamily: "Inter, sans-serif", marginLeft: "auto" }}>Weekends unavailable</span>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// TIME PICKER
// ─────────────────────────────────────────────
const TimePicker = ({ selectedTime, onSelectTime, dateLabel }) => {
  const groups = [
    { k: "morning",   label: "Morning",   slots: TIME_SLOTS.filter(s => s.period==="morning") },
    { k: "afternoon", label: "Afternoon", slots: TIME_SLOTS.filter(s => s.period==="afternoon") },
    { k: "evening",   label: "Evening",   slots: TIME_SLOTS.filter(s => s.period==="evening") },
  ];
  return (
    <div style={{ padding: "18px", backgroundColor: C.bg, borderRadius: "14px", border: `1.5px solid ${C.line}`, animation: "eng-fadeUp 0.22s ease forwards" }}>
      <p style={{ fontSize: "13px", fontWeight: "600", fontFamily: "Inter, sans-serif", color: C.primary, margin: "0 0 16px 0" }}>
        Available times on <span style={{ fontWeight: "800" }}>{dateLabel}</span>
        <span style={{ fontWeight: "400", color: C.faint, fontSize: "11px", marginLeft: "8px" }}>West Africa Time</span>
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {groups.map(({ k, label, slots }) => (
          <div key={k}>
            <p style={{ fontSize: "10px", fontWeight: "800", fontFamily: "Inter, sans-serif", color: "#bbb", letterSpacing: "1.2px", textTransform: "uppercase", margin: "0 0 8px 0" }}>{label}</p>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${slots.length}, 1fr)`, gap: "7px" }}>
              {slots.map(slot => {
                const on = selectedTime === slot.value;
                return (
                  <button key={slot.value} type="button" onClick={() => onSelectTime(on ? null : slot.value)}
                    style={{ padding: "11px 4px", borderRadius: "10px", border: `1.5px solid ${on ? C.primary : C.line}`, backgroundColor: on ? C.primary : C.white, color: on ? C.white : C.dark, fontSize: "12px", fontWeight: on ? "700" : "400", fontFamily: "Inter, sans-serif", cursor: "pointer", transition: "all 0.15s ease", textAlign: "center", boxShadow: on ? "0 4px 12px rgba(27,77,62,0.2)" : "none" }}
                    onMouseEnter={e => { if(!on) { e.currentTarget.style.borderColor=C.primary; e.currentTarget.style.backgroundColor=C.accentLight; }}}
                    onMouseLeave={e => { if(!on) { e.currentTarget.style.borderColor=C.line; e.currentTarget.style.backgroundColor=C.white; }}}
                  >{slot.label}</button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// ENGAGEMENT FORM
// ─────────────────────────────────────────────
const EngForm = ({ intent, onSuccess, isMobile }) => {
  const cfg = INTENTS[intent] || INTENTS.connect;
  const isSched = SCHEDULING_INTENTS.includes(intent);
  const [form, setForm] = useState({ name:"", email:"", phone:"", organization:"", role:"", message:"" });
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const set = k => e => setForm(f => ({...f, [k]: e.target.value}));

  const valid = form.name && form.email && (!isSched || (date && time));

  const submit = e => {
    e.preventDefault();
    if (!valid) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); onSuccess({ date, time }); }, 1600);
  };

  return (
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      <Field label="Full Name" placeholder="e.g. Kwame Mensah" value={form.name} onChange={set("name")} required />
      <Field label="Email Address" type="email" placeholder="your@email.com" value={form.email} onChange={set("email")} required />
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "14px" }}>
        <Field label="Organization" placeholder="e.g. Acme Capital" value={form.organization} onChange={set("organization")} />
        <Field label="Role / Title" placeholder="e.g. Managing Director" value={form.role} onChange={set("role")} />
      </div>
      <Field label="Phone (optional)" type="tel" placeholder="+233 XX XXX XXXX" value={form.phone} onChange={set("phone")} />

      {/* Calendar */}
      {isSched && (
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ flex: 1, height: "1px", backgroundColor: C.line }}/>
            <span style={{ fontSize: "11px", fontWeight: "800", fontFamily: "Inter, sans-serif", color: C.primary, letterSpacing: "1px", textTransform: "uppercase", whiteSpace: "nowrap" }}>Select Date &amp; Time</span>
            <div style={{ flex: 1, height: "1px", backgroundColor: C.line }}/>
          </div>

          <CalendarPicker selectedDate={date} onSelectDate={setDate} onSelectTime={setTime} />

          {date && <TimePicker selectedTime={time} onSelectTime={setTime} dateLabel={fmtShort(date)} />}

          {/* Confirmed pill */}
          {date && time && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "13px 16px", backgroundColor: C.accentLight, border: `1.5px solid ${C.primary}`, borderRadius: "12px", animation: "eng-fadeUp 0.2s ease" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="3" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: "13px", fontWeight: "700", fontFamily: "Inter, sans-serif", color: C.primary }}>
                  {fmtShort(date)} · {fmtTime(time)} WAT
                </span>
                <span style={{ fontSize: "11px", color: C.mid, fontFamily: "Inter, sans-serif", marginLeft: "8px" }}>West Africa Time</span>
              </div>
              <button type="button" onClick={() => { setDate(null); setTime(null); }} style={{ background: "none", border: "none", cursor: "pointer", color: C.primary, fontSize: "20px", lineHeight: 1, padding: "0 2px", opacity: 0.5 }}>×</button>
            </div>
          )}

          {!date && <p style={{ fontSize: "12px", color: "#bbb", fontFamily: "Inter, sans-serif", textAlign: "center", margin: 0 }}>Select a date above to see available times.</p>}
          {date && !time && <p style={{ fontSize: "12px", color: "#bbb", fontFamily: "Inter, sans-serif", textAlign: "center", margin: 0 }}>Now pick a time slot to continue.</p>}
        </div>
      )}

      <TextareaField label="Message (optional)" placeholder="Tell us a bit about your goals or what you'd like to discuss…" value={form.message} onChange={set("message")} />

      <button type="submit" disabled={!valid || loading} style={{
        width: "100%", padding: "15px 32px", borderRadius: "50px", border: "none",
        backgroundColor: (!valid || loading) ? C.lineStrong : C.primary, color: C.white,
        fontSize: "15px", fontWeight: "700", fontFamily: "Inter, sans-serif",
        cursor: (!valid || loading) ? "not-allowed" : "pointer",
        transition: "background-color 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease",
        display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
        boxShadow: valid && !loading ? "0 4px 16px rgba(27,77,62,0.25)" : "none",
      }}
        onMouseEnter={e => { if(valid&&!loading){ e.currentTarget.style.backgroundColor=C.primaryDark; e.currentTarget.style.transform="translateY(-1px)"; }}}
        onMouseLeave={e => { if(valid&&!loading){ e.currentTarget.style.backgroundColor=C.primary; e.currentTarget.style.transform="none"; }}}
      >
        {loading ? (
          <><span style={{ width:"17px", height:"17px", border:"2px solid rgba(255,255,255,0.3)", borderTopColor:C.white, borderRadius:"50%", animation:"eng-spin 0.7s linear infinite", display:"inline-block" }}/> Sending…</>
        ) : (
          <>{cfg.cta}<span style={{ width:"24px", height:"24px", backgroundColor:C.accent, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </span></>
        )}
      </button>
    </form>
  );
};

// ─────────────────────────────────────────────
// SUCCESS STATE
// ─────────────────────────────────────────────
const SuccessState = ({ intent, booking, onClose }) => {
  const cfg = INTENTS[intent] || INTENTS.connect;
  const hasBooking = SCHEDULING_INTENTS.includes(intent) && booking?.date && booking?.time;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 0 8px", textAlign: "center", gap: "20px" }}>
      <div style={{ width: "76px", height: "76px", borderRadius: "50%", backgroundColor: C.accentLight, border: `2px solid ${C.primary}`, display: "flex", alignItems: "center", justifyContent: "center", animation: "eng-popIn 0.4s cubic-bezier(0.175,0.885,0.32,1.275) forwards" }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
      </div>

      <div style={{ maxWidth: "320px" }}>
        <h3 style={{ fontSize: "22px", fontWeight: "700", color: C.primary, fontFamily: "Inter, sans-serif", margin: "0 0 10px 0", lineHeight: 1.2 }}>{cfg.successTitle}</h3>
        <p style={{ fontSize: "15px", color: C.mid, fontFamily: "Inter, sans-serif", lineHeight: "1.65", margin: 0 }}>{cfg.successMsg}</p>
      </div>

      {hasBooking && (
        <div style={{ width: "100%", maxWidth: "340px", backgroundColor: C.bg, border: `1.5px solid ${C.primary}`, borderRadius: "14px", padding: "20px", display: "flex", flexDirection: "column", gap: "14px" }}>
          <p style={{ fontSize: "11px", fontWeight: "800", color: C.primary, fontFamily: "Inter, sans-serif", letterSpacing: "1px", textTransform: "uppercase", margin: 0 }}>Your Booking</p>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "10px", backgroundColor: C.accentLight, border: `1.5px solid ${C.primary}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </div>
            <div style={{ textAlign: "left" }}>
              <p style={{ fontSize: "14px", fontWeight: "700", color: C.primary, fontFamily: "Inter, sans-serif", margin: "0 0 3px 0" }}>{fmtDate(booking.date)}</p>
              <p style={{ fontSize: "13px", color: C.mid, fontFamily: "Inter, sans-serif", margin: 0 }}>{fmtTime(booking.time)} · West Africa Time</p>
            </div>
          </div>
          <p style={{ fontSize: "11px", color: "#bbb", fontFamily: "Inter, sans-serif", margin: 0, textAlign: "left" }}>A calendar invite will be sent to your email.</p>
        </div>
      )}

      {/* Calendar shortcuts — only relevant when a booking was confirmed */}
      {hasBooking && (
        <div style={{ width: "100%", maxWidth: "340px", backgroundColor: C.white, border: `1px solid ${C.line}`, borderRadius: "14px", padding: "16px 20px" }}>
          <p style={{ fontSize: "11px", fontWeight: "800", color: C.primary, fontFamily: "Inter, sans-serif", margin: "0 0 10px 0", letterSpacing: "0.8px", textTransform: "uppercase" }}>Add to your calendar</p>
          <div style={{ display: "flex", gap: "8px" }}>
            {[{label:"Google",href:"https://calendar.google.com"},{label:"Outlook",href:"https://outlook.live.com"},{label:"Apple",href:"webcal://"}].map(cal => (
              <a key={cal.label} href={cal.href} target="_blank" rel="noopener noreferrer"
                style={{ flex:1, padding:"10px 8px", borderRadius:"9px", border:`1.5px solid ${C.line}`, backgroundColor:C.bg, color:C.primary, fontSize:"12px", fontWeight:"700", fontFamily:"Inter, sans-serif", textDecoration:"none", textAlign:"center", transition:"all 0.15s ease" }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor=C.primary; e.currentTarget.style.backgroundColor=C.accentLight; }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor=C.line; e.currentTarget.style.backgroundColor=C.bg; }}
              >{cal.label}</a>
            ))}
          </div>
        </div>
      )}

      <button onClick={onClose} style={{ padding:"12px 36px", borderRadius:"50px", border:`1.5px solid ${C.line}`, backgroundColor:"transparent", color:C.faint, fontSize:"13px", fontWeight:"600", fontFamily:"Inter, sans-serif", cursor:"pointer", transition:"all 0.2s ease" }}
        onMouseEnter={e=>{ e.currentTarget.style.borderColor=C.primary; e.currentTarget.style.color=C.primary; }}
        onMouseLeave={e=>{ e.currentTarget.style.borderColor=C.line; e.currentTarget.style.color=C.faint; }}
      >Close</button>
    </div>
  );
};

// ─────────────────────────────────────────────
// MAIN MODAL EXPORT
// ─────────────────────────────────────────────
export const BRIDGEEngagementModal = ({ isOpen, onClose, intent = "connect" }) => {
  const [success, setSuccess] = useState(false);
  const [booking, setBooking] = useState(null);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();
  const cfg = INTENTS[intent] || INTENTS.connect;

  useEffect(() => {
    if (isOpen) {
      setSuccess(false);
      setBooking(null);
      setMounted(true);
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  useEffect(() => {
    const fn = e => { if(e.key==="Escape") onClose(); };
    if (isOpen) document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!mounted) return null;

  const hPad = isMobile ? "24px" : "36px";
  const [headPfx, headBold] = cfg.headline;

  return (
    <>
      <style>{`
        @keyframes eng-spin   { to { transform: rotate(360deg); } }
        @keyframes eng-popIn  { from { opacity:0; transform: scale(0.5); } to { opacity:1; transform: scale(1); } }
        @keyframes eng-fadeUp { from { opacity:0; transform: translateY(8px); } to { opacity:1; transform: translateY(0); } }
        @keyframes eng-up     { from { opacity:0; transform: translateY(18px) scale(0.97); } to { opacity:1; transform: translateY(0) scale(1); } }
        @keyframes eng-slide  { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .eng-scroll::-webkit-scrollbar { display:none; }
        .eng-scroll { scrollbar-width:none; }
      `}</style>

      <div onClick={e=>{ if(e.target===e.currentTarget) onClose(); }}
        style={{ position:"fixed", inset:0, zIndex:2000, backgroundColor:"rgba(8,24,18,0.78)", backdropFilter:"blur(8px)", WebkitBackdropFilter:"blur(8px)", display:"flex", alignItems:isMobile?"flex-end":"center", justifyContent:"center", padding:isMobile?0:"20px", opacity:visible?1:0, transition:"opacity 0.25s ease" }}>

        <div style={{
          width:"100%", maxWidth:isMobile?"100%":"900px",
          borderRadius:isMobile?"20px 20px 0 0":"20px",
          boxShadow:"0 40px 100px rgba(0,0,0,0.35), 0 10px 30px rgba(0,0,0,0.2)",
          display:isMobile?"block":"grid",
          gridTemplateColumns:isMobile?undefined:"2fr 3fr",
          overflow:"hidden",
          animation:visible?(isMobile?"eng-slide 0.35s cubic-bezier(0.32,0.72,0,1) forwards":"eng-up 0.3s ease forwards"):"none",
        }}>
          {/* Left panel — always visible on desktop */}
          {!isMobile && <EngPanel intent={intent} />}

          {/* Right form panel — this is the scrollable column */}
          <div className="eng-scroll" style={{ backgroundColor:C.white, overflowY:"auto", maxHeight:isMobile?"94vh":"90vh" }}>
            {isMobile && (
              <div style={{ display:"flex", justifyContent:"center", paddingTop:"14px", paddingBottom:"6px" }}>
                <div style={{ width:"40px", height:"4px", borderRadius:"2px", backgroundColor:C.line }}/>
              </div>
            )}

            {/* Header — dark logo on white panel for mobile */}
            <div style={{ padding:`${isMobile?"16px":hPad} ${hPad} 0`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              {isMobile ? (
                <svg height="28" viewBox="0 0 3434.33 932.3" xmlns="http://www.w3.org/2000/svg">
                  <defs><style>{`.mld1,.mld2{fill:#1b4d3e;}.mld2{stroke:#000;stroke-width:.5px;stroke-miterlimit:10;}.mld3{fill:none;stroke:#1b4d3e;stroke-width:80px;stroke-miterlimit:10;}.mld5{fill:#b8d935;stroke:#1b4d3e;stroke-miterlimit:10;}.mld6{fill:#b8d935;}`}</style></defs>
                  <g><g>
                    <path className="mld6" d="M2070.26,927.95c-.2.2-.5.4-.7.5h-.3l1-.5Z"/>
                    <path className="mld1" d="M1853.06,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9h0ZM1894.56,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1v.1Z"/>
                    <path className="mld2" d="M1431.68,224.45h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.05c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5l.1.1h0Z"/>
                    <path className="mld2" d="M1488.08,578.65v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"/>
                    <rect className="mld6" x="1427.38" y="17.35" width="205.2" height="145"/>
                    <rect className="mld1" x="1427.48" y="221.75" width="205.2" height="693.2" rx="9.6" ry="9.6"/>
                    <path className="mld1" d="M2757.31,19.09h491.3c5.42,0,9.82,4.4,9.82,9.82v218.7c0,5.42-4.4,9.82-9.82,9.82h-507.36c-56.98,0-108.53,23.02-145.87,60.35-37.34,37.23-60.45,88.79-60.45,145.66,0,113.75,92.37,206.01,206.32,206.01h12.89c2.86,0,5.11,2.25,5.11,5.11v236.7c0,1.13-.92,1.94-1.94,1.94h0c-242.22,0-438.52-195.99-438.52-437.8v-18.51c0-241.81,196.29-437.8,438.52-437.8h0Z"/>
                    <rect className="mld1" x="2812.75" y="339.47" width="216.75" height="572.62" rx="9.6" ry="9.6"/>
                    <rect className="mld6" x="3083.41" y="339.47" width="175.12" height="257.67"/>
                    <rect className="mld6" x="3083.41" y="654.42" width="175.12" height="257.67"/>
                    <rect className="mld3" x="40" y="40" width="843.91" height="852.3" rx="36.55" ry="36.55"/>
                    <polygon className="mld5" points="722.6 322.13 462.28 452.8 201.97 322.75 461.21 192.52 722.6 322.13"/>
                    <path className="mld1" d="M197.84,426.78c3.86-.53,7.04.85,10.74,1.41l252.53,125.67c84.54-40,167.66-83.83,251.89-124.84,33.14-11.49,50.09,34.15,18.55,49.11l-259.23,129.08c-10.18,3.72-14.14,2.57-23.85-1.31l-264.23-132.98c-17.04-14.4-7.96-43.2,13.61-46.14h0Z"/>
                    <path className="mld6" d="M195.25,558c3.65-.63,7.4-.4,11.08-.22,86.11,40.47,170.4,85.05,255.95,126.78l252.92-126c29.53-7.22,45.44,28.67,22.29,46.49l-270.42,134.42-8.62.31c-91.6-42.21-181.07-89.86-271.7-134.42-18.72-12.06-13.3-43.58,8.5-47.37h0Z"/>
                  </g></g>
                </svg>
              ) : <div/>}
              <button onClick={onClose} style={{ background:"none", border:`1.5px solid ${C.line}`, borderRadius:"50%", width:"36px", height:"36px", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:C.faint, padding:0, flexShrink:0, transition:"all 0.2s ease" }}
                onMouseEnter={e=>{ e.currentTarget.style.backgroundColor=C.bg; e.currentTarget.style.borderColor=C.primary; e.currentTarget.style.color=C.primary; }}
                onMouseLeave={e=>{ e.currentTarget.style.backgroundColor="transparent"; e.currentTarget.style.borderColor=C.line; e.currentTarget.style.color=C.faint; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            {/* Section header */}
            {!success && (
              <div style={{ padding:`20px ${hPad} 0` }}>
                <div style={{ display:"inline-flex", alignItems:"center", gap:"7px", padding:"5px 13px", border:`1px solid ${C.line}`, borderRadius:"50px", marginBottom:"14px" }}>
                  <span style={{ width:"6px", height:"6px", borderRadius:"50%", backgroundColor:C.accent, display:"inline-block" }}/>
                  <span style={{ fontSize:"10px", fontWeight:"800", fontFamily:"Inter, sans-serif", color:C.primary, letterSpacing:"1px", textTransform:"uppercase" }}>{cfg.badge}</span>
                </div>
                <h2 style={{ fontSize:isMobile?"22px":"26px", fontWeight:"300", color:C.primary, fontFamily:"Inter, sans-serif", margin:"0 0 10px 0", lineHeight:1.2 }}>
                  {headPfx} <span style={{ fontWeight:"700" }}>{headBold}</span>
                </h2>
                <p style={{ fontSize:"14px", color:C.faint, fontFamily:"Inter, sans-serif", margin:0, lineHeight:1.6 }}>{cfg.sub}</p>
                <div style={{ height:"1px", backgroundColor:C.line, marginTop:"22px" }}/>
              </div>
            )}

            {/* Body */}
            <div style={{ padding:`20px ${hPad} ${isMobile?"40px":"36px"}` }}>
              {success
                ? <SuccessState intent={intent} booking={booking} onClose={onClose} />
                : <EngForm intent={intent} isMobile={isMobile} onSuccess={b=>{ setBooking(b); setSuccess(true); }} />
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// ─────────────────────────────────────────────
// DEMO WRAPPER
// ─────────────────────────────────────────────
export default function BRIDGEEngagementDemo() {
  const [open, setOpen] = useState(false);
  const [intent, setIntent] = useState("briefing");
  const btns = [
    { intent:"briefing",    label:"Schedule a 30-Min Briefing →",        accent:true },
    { intent:"scope",       label:"Request Full Package Scope",            accent:false },
    { intent:"partnership", label:"Partnership Enquiry",                   accent:false },
    { intent:"discovery",   label:"Request a Discovery Session →",         accent:true },
    { intent:"advisory",    label:"Enquire About Deployment Advisory →",   accent:false },
    { intent:"connect",     label:"Schedule a Partnership Conversation →", accent:false },
  ];
  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(160deg,#0f2e24 0%,#1B4D3E 60%,#163829 100%)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"14px", padding:"40px 24px", fontFamily:"Inter, sans-serif" }}>
      <p style={{ color:"rgba(255,255,255,0.25)", fontSize:"11px", letterSpacing:"2.5px", textTransform:"uppercase", marginBottom:"8px" }}>Engagement Modal — Intent Preview</p>
      <div style={{ display:"flex", flexDirection:"column", gap:"10px", width:"100%", maxWidth:"420px" }}>
        {btns.map(b => (
          <button key={b.intent} onClick={() => { setIntent(b.intent); setOpen(true); }}
            style={{ padding:"16px 24px", borderRadius:"12px", border:b.accent?"none":`1px solid rgba(255,255,255,0.15)`, backgroundColor:b.accent?C.accent:"rgba(255,255,255,0.05)", color:b.accent?C.primary:"rgba(255,255,255,0.7)", fontSize:"14px", fontWeight:b.accent?"700":"500", fontFamily:"Inter, sans-serif", cursor:"pointer", textAlign:"left", transition:"all 0.2s ease" }}
          >{b.label}</button>
        ))}
      </div>
      <BRIDGEEngagementModal isOpen={open} onClose={() => setOpen(false)} intent={intent} />
    </div>
  );
}
