import { useState, useEffect } from "react";
import {
  X, ArrowRight, ArrowLeft, Check, Lock, Star, AlertCircle,
  User, Mail, Briefcase, Globe, MapPin, FileText, ChevronDown,
  CheckCircle, Clock, Shield, Zap, Users, BookOpen
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// DESIGN TOKENS — exact BRIDGE system
// ─────────────────────────────────────────────────────────────
const C = {
  primary:  "#1B4D3E",
  accent:   "#B8D935",
  bg:       "#F3F5F2",
  white:    "#FFFFFF",
  line:     "#DEDEDE",
  text:     "#1A1A1A",
  muted:    "#6B7280",
  error:    "#DC2626",
  errorBg:  "#FEF2F2",
};
const F = "'Inter', system-ui, sans-serif";
// ─────────────────────────────────────────────────────────────
// BRIDGE LOGO
// ─────────────────────────────────────────────────────────────
const BridgeLogo = ({ height = 26, dark = false, uid = "bl" }) => (
  <svg height={height} viewBox="0 0 3258.5 932.3" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
    <defs>
      <style>{`
        .${uid}-1{fill:none;stroke:${dark ? C.primary : '#fff'};stroke-width:80px;stroke-miterlimit:10;}
        .${uid}-4,.${uid}-3{fill:#b8d935;}
        .${uid}-3{stroke:#1b4d3e;stroke-miterlimit:10;}
        .${uid}-5,.${uid}-2{fill:${dark ? C.primary : '#fff'};}
        .${uid}-2{stroke:#000;stroke-width:.5px;stroke-miterlimit:10;}
        .${uid}-6{fill:#74914a;}
      `}</style>
    </defs>
    <path className={`${uid}-5`} d="M1853.1,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.6,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1h0v.1Z"/>
    <path className={`${uid}-2`} d="M1431.7,224.5h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5h.1v.1Z"/>
    <path className={`${uid}-2`} d="M1488.1,578.7v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"/>
    <rect className={`${uid}-4`} x="1427.4" y="17.4" width="205.2" height="145"/>
    <rect className={`${uid}-5`} x="1427.5" y="221.8" width="205.2" height="693.2" rx="9.6" ry="9.6"/>
    <path className={`${uid}-5`} d="M2757.3,19.1h491.3c5.4,0,9.8,4.4,9.8,9.8v218.7c0,5.4-4.4,9.8-9.8,9.8h-507.4c-57,0-108.5,23-145.9,60.4-37.3,37.2-60.5,88.8-60.5,145.7,0,113.7,92.4,206,206.3,206h12.9c2.9,0,5.1,2.3,5.1,5.1v236.7c0,1.1-.9,1.9-1.9,1.9h0c-242.2,0-438.5-196-438.5-437.8v-18.5c0-241.8,196.3-437.8,438.5-437.8h.1Z"/>
    <rect className={`${uid}-5`} x="2812.8" y="339.5" width="216.8" height="572.6" rx="9.6" ry="9.6"/>
    <rect className={`${uid}-4`} x="3083.4" y="339.5" width="175.1" height="257.7"/>
    <rect className={`${uid}-4`} x="3083.4" y="654.4" width="175.1" height="257.7"/>
    <rect className={`${uid}-1`} x="40" y="40" width="843.9" height="852.3" rx="36.6" ry="36.6"/>
    <polygon className={`${uid}-3`} points="722.6 322.1 462.3 452.8 202 322.8 461.3 192.5 722.6 322.1"/>
    <path className={`${uid}-6`} d="M197.9,426.8c3.9-.5,7,.8,10.7,1.4l252.5,125.7c84.5-40,167.7-83.8,251.9-124.8,33.1-11.5,50.1,34.2,18.5,49.1l-259.2,129.1c-10.2,3.7-14.1,2.6-23.9-1.3l-264.2-133c-17-14.4-8-43.2,13.6-46.1h.1v-.1Z"/>
    <path className={`${uid}-4`} d="M195.3,558c3.7-.6,7.4-.4,11.1-.2,86.1,40.5,170.4,85.1,255.9,126.8l252.9-126c29.5-7.2,45.4,28.7,22.3,46.5l-270.4,134.4-8.6.3c-91.6-42.2-181.1-89.9-271.7-134.4-18.7-12.1-13.3-43.6,8.5-47.4h0Z"/>
  </svg>
);

// ─────────────────────────────────────────────────────────────
// SHARED PRIMITIVES
// ─────────────────────────────────────────────────────────────
const Field = ({ label, type = "text", placeholder, value, onChange, required, hint, icon, error, as, rows, options, max }) => {
  const [focused, setFocused] = useState(false);
  const borderColor = error ? C.error : focused ? C.primary : C.line;
  const shared = {
    width: "100%", padding: "12px 16px",
    paddingLeft: icon ? "42px" : "16px",
    borderRadius: 10, boxSizing: "border-box",
    border: `1.5px solid ${borderColor}`,
    backgroundColor: focused ? C.white : "#FAFAFA",
    color: C.text, fontSize: "14px", fontFamily: F, outline: "none",
    transition: "border-color 0.2s, background 0.2s", appearance: "none",
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: "11px", fontWeight: "700", fontFamily: F,
        color: error ? C.error : C.primary, letterSpacing: "1px", textTransform: "uppercase" }}>
        {label}{required && <span style={{ color: C.accent, marginLeft: 3 }}>*</span>}
      </label>
      <div style={{ position: "relative" }}>
        {icon && (
          <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
            color: focused ? C.primary : C.muted, pointerEvents: "none", zIndex: 1 }}>
            {icon}
          </div>
        )}
        {as === "textarea" ? (
          <textarea placeholder={placeholder} value={value} onChange={onChange} rows={rows || 4}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            style={{ ...shared, resize: "vertical", minHeight: 96 }} />
        ) : as === "select" ? (
          <div style={{ position: "relative" }}>
            <select value={value} onChange={onChange}
              onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
              style={{ ...shared, minHeight: 44, paddingRight: "38px", width: "100%", cursor: "pointer" }}>
              <option value="">{placeholder}</option>
              {options.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
            <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
              pointerEvents: "none", color: focused ? C.primary : C.muted }}>
              <ChevronDown size={15} />
            </div>
          </div>
        ) : (
          <input type={type} placeholder={placeholder} value={value} onChange={onChange}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            max={max} style={{ ...shared, minHeight: 44 }} />
        )}
      </div>
      {hint && !error && <p style={{ margin: 0, fontSize: "12px", fontFamily: F, color: C.muted, lineHeight: 1.5 }}>{hint}</p>}
      {error && <p style={{ margin: 0, fontSize: "12px", fontFamily: F, color: C.error }}>{error}</p>}
    </div>
  );
};

// Mobile bottom-sheet handle
const DragHandle = () => (
  <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 4px", flexShrink: 0 }}>
    <div style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: C.line }} />
  </div>
);

// Step progress bar (strip style for mobile)
const StepStrip = ({ current, total }) => (
  <div style={{ display: "flex", flexShrink: 0 }}>
    {Array.from({ length: total }).map((_, i) => (
      <div key={i} style={{
        flex: 1, height: 3,
        backgroundColor: i < current ? C.primary : i === current ? C.accent : C.line,
        transition: "background-color 0.3s",
      }} />
    ))}
  </div>
);

// Desktop step dots for sidebar
const SidebarSteps = ({ steps, current }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
    {steps.map((label, i) => (
      <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 6, height: 6, borderRadius: "50%",
          backgroundColor: i <= current ? C.accent : "rgba(255,255,255,0.2)",
        }} />
        <span style={{
          fontSize: "12px", fontFamily: F, fontWeight: i === current ? "700" : "400",
          color: i === current ? C.white : "rgba(255,255,255,0.45)",
        }}>{label}</span>
      </div>
    ))}
  </div>
);

// Desktop progress bar (full)
const DesktopProgress = ({ steps, current }) => (
  <div style={{ paddingBottom: 28 }}>
    <div style={{ display: "flex", alignItems: "center" }}>
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : "none" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{
                width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
                backgroundColor: done ? C.primary : active ? C.accent : C.line,
                color: done ? C.white : active ? C.primary : C.muted,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "12px", fontWeight: "700", fontFamily: F, transition: "all 0.3s",
              }}>
                {done ? <Check size={13} strokeWidth={3} /> : i + 1}
              </div>
              <span style={{
                fontSize: "10px", fontWeight: active || done ? "700" : "500", fontFamily: F,
                color: active || done ? C.primary : C.muted, letterSpacing: "0.3px", whiteSpace: "nowrap",
              }}>{label}</span>
            </div>
            {i < steps.length - 1 && (
              <div style={{
                flex: 1, height: 2, backgroundColor: done ? C.primary : C.line,
                margin: "0 8px", marginTop: -20, transition: "background-color 0.3s",
              }} />
            )}
          </div>
        );
      })}
    </div>
  </div>
);

// Global CSS — idempotent keyframes (safe to re-render)
const ModalCSS = () => (
  <style>{`
    @keyframes bridgeSlideUp {
      from { transform: translateY(100%); opacity: 0; }
      to   { transform: translateY(0);    opacity: 1; }
    }
    @keyframes bridgeFadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    .bridge-sheet  { animation: bridgeSlideUp 0.32s cubic-bezier(0.22,1,0.36,1) both; }
    .bridge-dialog { animation: bridgeFadeIn  0.24s cubic-bezier(0.22,1,0.36,1) both; }
    .bridge-scroll { overscroll-behavior: contain; -webkit-overflow-scrolling: touch; }
    input[type="date"] { min-height: 44px; }
  `}</style>
);

// Shared modal shell
const ModalShell = ({ isOpen, onClose, isMobile, sidebar, children, footer }) => {
  if (!isOpen) return null;
  return (
    <>
      <ModalCSS />
      <div onClick={onClose} style={{
        position: "fixed", inset: 0, zIndex: 200,
        backgroundColor: "rgba(10,20,15,0.65)", backdropFilter: "blur(6px)",
      }} />
      <div className={isMobile ? "bridge-sheet" : "bridge-dialog"} onClick={e => e.stopPropagation()} style={{
        position: "fixed", zIndex: 201,
        ...(isMobile
          ? { bottom: 0, left: 0, right: 0, borderRadius: "20px 20px 0 0", maxHeight: "94vh" }
          : { top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "min(860px,95vw)", borderRadius: 20 }
        ),
        backgroundColor: C.white, overflow: "hidden",
        display: "flex", flexDirection: isMobile ? "column" : "row",
        boxShadow: "0 32px 80px rgba(0,0,0,0.28)",
      }}>
        {/* Sidebar — desktop only */}
        {!isMobile && sidebar}

        {/* Right panel */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", maxHeight: isMobile ? "94vh" : "84vh" }}>
          {children}
          {footer}
        </div>
      </div>
    </>
  );
};

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────
const ROLES = [
  "Investor / Fund Manager","Entrepreneur / Founder","Corporate Executive",
  "Government Official","Development Finance","Academic / Researcher",
  "Diaspora Professional","Civil Society","Media / Journalist","Other"
];
const SECTORS = [
  "Infrastructure","Financial Inclusion","Health Systems","Technology & Innovation",
  "Education & Skills","Agriculture & Value Chains","Sports / Entertainment / Creative",
  "Housing & Real Estate","Tourism & Hospitality","Energy & Renewables",
  "Manufacturing & Light Industry","Transportation & Logistics","Multiple / Cross-sector"
];
const REFERRALS = [
  "BRIDGE website","LinkedIn","Twitter / X","Referred by a member",
  "Conference or event","News / Media","Government connection","Other"
];
const INTENT_OPTIONS = [
  { id: "invest",   label: "Investment & Deal Flow",   desc: "Evaluating opportunities to deploy capital in Ghana." },
  { id: "research", label: "Research & Intelligence",   desc: "Need deep sector data and analytical reports." },
  { id: "partner",  label: "Partnership & Business",    desc: "Seeking business or strategic partnerships in Ghana." },
  { id: "policy",   label: "Policy & Government",       desc: "Work in policy, public sector, or development finance." },
  { id: "diaspora", label: "Diaspora Engagement",       desc: "Ghanaian diaspora connecting resources to home." },
  { id: "other",    label: "Other",                     desc: "My use case is different — I'll explain below." },
];

// ═════════════════════════════════════════════════════════════
// FREE MEMBER MODAL
// ═════════════════════════════════════════════════════════════
const FREE_STEPS = ["Your Profile", "Your Interest", "Done"];

const FreeStep0 = ({ data, onChange, isMobile }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
    <div>
      <h3 style={{ margin: "0 0 4px", fontSize: "20px", fontFamily: F, fontWeight: "700", color: C.text, letterSpacing: "-.3px" }}>
        Create Your Profile
      </h3>
      <p style={{ margin: 0, fontSize: "14px", fontFamily: F, color: C.muted }}>
        Free Membership is open to everyone. Tell us a bit about yourself.
      </p>
    </div>

    {/* Value reminder */}
    <div style={{ background: "rgba(184,217,53,0.1)", border: "1px solid rgba(184,217,53,0.3)", borderRadius: 12, padding: "16px 18px" }}>
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        <Zap size={16} color={C.primary} style={{ flexShrink: 0, marginTop: 2 }} />
        <div>
          <p style={{ margin: "0 0 4px", fontSize: "13px", fontWeight: "700", fontFamily: F, color: C.primary }}>
            What you unlock immediately
          </p>
          <p style={{ margin: 0, fontSize: "13px", fontFamily: F, color: C.muted, lineHeight: 1.6 }}>
            Weekly Ghana Pulse newsletter · 3 free sector intelligence briefs · Community portal access · Event invitations
          </p>
        </div>
      </div>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>
      <Field label="First Name" placeholder="Kofi" value={data.firstName}
        onChange={e => onChange("firstName", e.target.value)} required icon={<User size={14} />} />
      <Field label="Last Name" placeholder="Mensah" value={data.lastName}
        onChange={e => onChange("lastName", e.target.value)} required icon={<User size={14} />} />
    </div>

    <Field label="Email Address" type="email" placeholder="you@example.com" value={data.email}
      onChange={e => onChange("email", e.target.value)} required icon={<Mail size={14} />}
      hint="You'll receive your first Ghana Pulse newsletter within 24 hours." />

    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>
      <Field label="Country of Residence" placeholder="e.g. Ghana, United States" value={data.country}
        onChange={e => onChange("country", e.target.value)} required icon={<MapPin size={14} />} />
      <Field label="Your Role" value={data.role} onChange={e => onChange("role", e.target.value)}
        as="select" placeholder="Select your role" options={ROLES} required icon={<Briefcase size={14} />} />
    </div>

    <Field label="Primary Sector of Interest" value={data.sector} onChange={e => onChange("sector", e.target.value)}
      as="select" placeholder="Select a sector" options={SECTORS} required icon={<Globe size={14} />} />
  </div>
);

const FreeStep1 = ({ data, onChange, isMobile }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
    <div>
      <h3 style={{ margin: "0 0 4px", fontSize: "20px", fontFamily: F, fontWeight: "700", color: C.text, letterSpacing: "-.3px" }}>
        Your Interest in Ghana
      </h3>
      <p style={{ margin: 0, fontSize: "14px", fontFamily: F, color: C.muted }}>
        Help us personalise your experience from day one.
      </p>
    </div>

    <Field label="Organization / Employer (optional)" placeholder="Company or institution" value={data.organization}
      onChange={e => onChange("organization", e.target.value)} icon={<Briefcase size={14} />} />

    <div>
      <p style={{ margin: "0 0 12px", fontSize: "11px", fontWeight: "700", fontFamily: F, color: C.text,
        textTransform: "uppercase", letterSpacing: "1px" }}>
        What brings you to BRIDGE? <span style={{ color: C.accent }}>*</span>
      </p>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 10 }}>
        {INTENT_OPTIONS.map(opt => {
          const sel = (data.intents || []).includes(opt.id);
          return (
            <button key={opt.id} onClick={() => {
              const cur = data.intents || [];
              onChange("intents", sel ? cur.filter(i => i !== opt.id) : [...cur, opt.id]);
            }} style={{
              textAlign: "left", padding: "13px 14px", borderRadius: 12, cursor: "pointer", minHeight: 44,
              border: `2px solid ${sel ? C.primary : C.line}`,
              backgroundColor: sel ? "rgba(27,77,62,0.05)" : C.white, transition: "all 0.18s",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: "700", fontFamily: F,
                    color: sel ? C.primary : C.text, marginBottom: 3 }}>{opt.label}</div>
                  <div style={{ fontSize: "12px", fontFamily: F, color: C.muted, lineHeight: 1.4 }}>{opt.desc}</div>
                </div>
                {sel && (
                  <div style={{ width: 17, height: 17, borderRadius: "50%", flexShrink: 0,
                    backgroundColor: C.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Check size={9} color={C.white} strokeWidth={3} />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>

    <Field label="How did you hear about BRIDGE?" value={data.referral}
      onChange={e => onChange("referral", e.target.value)} as="select"
      placeholder="Select one" options={REFERRALS} />
  </div>
);

const FreeSuccess = ({ firstName, email }) => (
  <div style={{ textAlign: "center", padding: "28px 0 40px" }}>
    <div style={{
      width: 72, height: 72, borderRadius: "50%",
      backgroundColor: "rgba(184,217,53,0.15)",
      display: "flex", alignItems: "center", justifyContent: "center",
      margin: "0 auto 24px",
    }}>
      <CheckCircle size={36} color={C.primary} />
    </div>
    <h3 style={{ margin: "0 0 10px", fontSize: "24px", fontFamily: F, fontWeight: "700", color: C.text }}>
      Welcome to BRIDGE, {firstName}.
    </h3>
    <p style={{ margin: "0 auto 24px", fontSize: "14px", fontFamily: F, color: C.muted,
      lineHeight: 1.75, maxWidth: 380 }}>
      Your Free Membership is active. Your first Ghana Pulse newsletter will arrive at <strong>{email}</strong> within 24 hours.
    </p>
    <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 360, margin: "0 auto 24px" }}>
      {[
        "Access 3 free sector intelligence briefs",
        "Join the community portal",
        "Attend upcoming webinars & events",
        "30-day path to Intelligence Membership",
      ].map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, textAlign: "left",
          background: C.bg, borderRadius: 10, padding: "10px 14px" }}>
          <Check size={14} color={C.primary} strokeWidth={3} style={{ flexShrink: 0 }} />
          <span style={{ fontSize: "13px", fontFamily: F, color: C.text }}>{item}</span>
        </div>
      ))}
    </div>
    <div style={{ background: "rgba(27,77,62,0.06)", borderRadius: 12, padding: "14px 18px",
      display: "flex", gap: 10, alignItems: "flex-start", textAlign: "left", marginBottom: 8 }}>
      <Clock size={15} color={C.primary} style={{ flexShrink: 0, marginTop: 1 }} />
      <span style={{ fontSize: "13px", fontFamily: F, color: C.primary, fontWeight: "600", lineHeight: 1.5 }}>
        30 days from today, you can apply for Intelligence Membership.
      </span>
    </div>
  </div>
);

export function BRIDGEFreeMemberModal({ isOpen, onClose }) {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [data, setData] = useState({
    firstName: "", lastName: "", email: "", country: "",
    role: "", sector: "", organization: "", intents: [], referral: "",
  });

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    fn(); window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(0); setSubmitting(false); setSuccess(false);
        setData({ firstName: "", lastName: "", email: "", country: "", role: "", sector: "", organization: "", intents: [], referral: "" });
      }, 300);
      return;
    }
    const count = parseInt(document.body.dataset.modalCount || "0") + 1;
    document.body.dataset.modalCount = String(count);
    document.body.style.overflow = "hidden";
    return () => {
      const next = Math.max(0, parseInt(document.body.dataset.modalCount || "1") - 1);
      document.body.dataset.modalCount = String(next);
      if (next === 0) document.body.style.overflow = "";
    };
  }, [isOpen]);

  const update = (k, v) => setData(d => ({ ...d, [k]: v }));

  const canNext = () => {
    if (step === 0) return data.firstName && data.lastName && data.email.includes('@') && data.country && data.role && data.sector;
    if (step === 1) return (data.intents || []).length > 0;
    return true;
  };

  const handleSubmit = () => {
    setSubmitting(true);
    // TODO: POST to backend — create free member record
    setTimeout(() => { setSubmitting(false); setSuccess(true); }, 1800);
  };

  const SIDEBAR_CONTENT = [
    {
      icon: <Users size={22} color={C.accent} />,
      title: "Free. Forever.",
      body: "BRIDGE Free Membership gives you real access — 3 sector briefs, the weekly Ghana Pulse newsletter, community portal, and event invitations. No trial. No expiry.",
      note: "Paid tiers become available after 30 days of Free Membership.",
    },
    {
      icon: <BookOpen size={22} color={C.accent} />,
      title: "Personalised from day one",
      body: "Tell us which sector matters to you and what role you play. We use this to surface the most relevant intelligence, connections, and opportunities from day one.",
      note: "Your information is never shared with third parties.",
    },
  ];

  const sb = SIDEBAR_CONTENT[Math.min(step, SIDEBAR_CONTENT.length - 1)];

  const sidebar = (
    <div style={{
      width: 260, flexShrink: 0, backgroundColor: C.primary,
      padding: "32px 26px", display: "flex", flexDirection: "column",
    }}>
      <div style={{ marginBottom: 32 }}><BridgeLogo height={22} uid="free-sb" /></div>
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: 14 }}>{sb.icon}</div>
        <h4 style={{ margin: "0 0 10px", fontSize: "16px", fontWeight: "700", fontFamily: F, color: C.white }}>{sb.title}</h4>
        <p style={{ margin: "0 0 14px", fontSize: "13px", fontFamily: F, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>{sb.body}</p>
        <p style={{ margin: 0, fontSize: "12px", fontFamily: F, color: "rgba(184,217,53,0.8)", lineHeight: 1.5, fontStyle: "italic" }}>{sb.note}</p>
      </div>
      <div style={{ marginTop: 32 }}>
        <SidebarSteps steps={FREE_STEPS} current={success ? 2 : step} />
      </div>
    </div>
  );

  const header = (
    <div style={{
      padding: isMobile ? "12px 20px 14px" : "24px 32px 18px",
      borderBottom: `1px solid ${C.line}`,
      display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0,
    }}>
      {isMobile ? (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: C.primary, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Check size={14} color={C.accent} strokeWidth={3} />
          </div>
          <div>
            <p style={{ margin: "0 0 1px", fontSize: "10px", fontWeight: "700", fontFamily: F,
              color: C.accent, letterSpacing: "1.5px", textTransform: "uppercase" }}>
              {success ? "Complete" : `${FREE_STEPS[step]} · Step ${step + 1} of ${FREE_STEPS.length - 1}`}
            </p>
            <p style={{ margin: 0, fontSize: "15px", fontWeight: "700", fontFamily: F, color: C.text }}>
              Free Membership
            </p>
          </div>
        </div>
      ) : (
        <div>
          <p style={{ margin: "0 0 2px", fontSize: "10px", fontWeight: "700", fontFamily: F,
            color: C.accent, letterSpacing: "1.5px", textTransform: "uppercase" }}>Membership</p>
          <h2 style={{ margin: 0, fontSize: "17px", fontWeight: "800", fontFamily: F, color: C.text }}>
            Free Member Application
          </h2>
        </div>
      )}
      <button onClick={onClose} style={{
        width: 34, height: 34, borderRadius: "50%", border: `1.5px solid ${C.line}`,
        backgroundColor: "transparent", cursor: "pointer", color: C.muted,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}><X size={15} /></button>
    </div>
  );

  const footer = !success ? (
    <div style={{
      padding: isMobile ? "13px 20px" : "18px 32px",
      paddingBottom: isMobile ? "calc(13px + env(safe-area-inset-bottom))" : "18px",
      borderTop: `1px solid ${C.line}`,
      display: "flex", flexDirection: isMobile ? "column-reverse" : "row",
      justifyContent: "space-between", alignItems: isMobile ? "stretch" : "center",
      gap: 10, flexShrink: 0,
    }}>
      {step > 0 ? (
        <button onClick={() => setStep(s => s - 1)} style={{
          display: "flex", alignItems: "center", justifyContent: isMobile ? "center" : "flex-start",
          gap: 6, backgroundColor: "transparent", color: C.muted,
          border: isMobile ? `1.5px solid ${C.line}` : "none",
          borderRadius: isMobile ? 100 : 0,
          fontSize: "14px", fontWeight: "600", fontFamily: F, cursor: "pointer",
          padding: isMobile ? "13px" : "10px 0", minHeight: 44,
        }}>
          <ArrowLeft size={14} /> Back
        </button>
      ) : <div />}

      {(() => {
        const ok = canNext();
        return step < FREE_STEPS.length - 2 ? (
          <button onClick={() => ok && setStep(s => s + 1)} disabled={!ok} style={{
            padding: "13px 28px", borderRadius: 100, minHeight: 44,
            backgroundColor: ok ? C.primary : C.line,
            color: ok ? C.white : C.muted, border: "none",
            fontSize: "14px", fontWeight: "700", fontFamily: F,
            cursor: ok ? "pointer" : "not-allowed",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            width: isMobile ? "100%" : "auto", transition: "all 0.2s",
          }}>
            Continue <ArrowRight size={14} />
          </button>
        ) : (
          <button onClick={ok ? handleSubmit : undefined} disabled={!ok || submitting} style={{
            padding: "13px 28px", borderRadius: 100, minHeight: 44,
            backgroundColor: ok ? C.accent : C.line,
            color: ok ? C.primary : C.muted, border: "none",
            fontSize: "14px", fontWeight: "800", fontFamily: F,
            cursor: ok ? "pointer" : "not-allowed",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            width: isMobile ? "100%" : "auto", transition: "all 0.2s",
          }}>
            {submitting ? "Creating account…" : <>Join BRIDGE Free <ArrowRight size={14} /></>}
          </button>
        );
      })()}
    </div>
  ) : (
    <div style={{
      padding: isMobile ? "13px 20px" : "18px 32px",
      paddingBottom: isMobile ? "calc(13px + env(safe-area-inset-bottom))" : "18px",
      borderTop: `1px solid ${C.line}`, flexShrink: 0,
    }}>
      <button onClick={onClose} style={{
        width: "100%", padding: "14px", borderRadius: 100, minHeight: 44,
        backgroundColor: C.accent, color: C.primary, border: "none",
        fontSize: "14px", fontWeight: "800", fontFamily: F, cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
      }}>Go to Dashboard <ArrowRight size={14} /></button>
    </div>
  );

  return (
    <ModalShell isOpen={isOpen} onClose={onClose} isMobile={isMobile} sidebar={sidebar} footer={footer}>
      {isMobile && <DragHandle />}
      {header}
      {isMobile && !success && <StepStrip current={step} total={FREE_STEPS.length - 1} />}
      {!success && !isMobile && step < 2 && (
        <div style={{ padding: "0 32px", paddingTop: 24, flexShrink: 0 }}>
          <DesktopProgress steps={FREE_STEPS.slice(0, 2)} current={step} />
        </div>
      )}
      <div className="bridge-scroll" style={{ flex: 1, overflowY: "auto", padding: isMobile ? "22px 20px" : "20px 32px" }}>
        {success
          ? <FreeSuccess firstName={data.firstName} email={data.email} />
          : step === 0 ? <FreeStep0 data={data} onChange={update} isMobile={isMobile} />
          :              <FreeStep1 data={data} onChange={update} isMobile={isMobile} />
        }
      </div>
    </ModalShell>
  );
}

// ═════════════════════════════════════════════════════════════
// PAID MEMBER MODAL (Intelligence + Investor)
// ═════════════════════════════════════════════════════════════
const PAID_STEPS = ["Eligibility", "Your Profile", "Intent & Use", "Review"];

const NotEligibleScreen = ({ onApplyFree, onClose }) => (
  <div style={{ textAlign: "center", padding: "24px 0 40px" }}>
    <div style={{
      width: 64, height: 64, borderRadius: "50%", backgroundColor: C.errorBg,
      display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 22px",
    }}>
      <Lock size={26} color={C.error} />
    </div>
    <h3 style={{ margin: "0 0 12px", fontSize: "21px", fontWeight: "800", fontFamily: F, color: C.text }}>
      Not Yet Eligible
    </h3>
    <p style={{ margin: "0 auto 28px", fontSize: "14px", fontFamily: F, color: C.muted,
      lineHeight: 1.75, maxWidth: 340 }}>
      Paid Membership requires 30 days as a Free Member first. Start your Free Membership today — it only takes two minutes.
    </p>
    <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 320, margin: "0 auto" }}>
      <button onClick={onApplyFree} style={{
        width: "100%", padding: "14px", borderRadius: 100, minHeight: 44,
        backgroundColor: C.primary, color: C.white, border: "none",
        fontSize: "14px", fontWeight: "700", fontFamily: F, cursor: "pointer",
      }}>Apply for Free Membership</button>
      <button onClick={onClose} style={{
        width: "100%", padding: "14px", borderRadius: 100, minHeight: 44,
        backgroundColor: "transparent", color: C.muted,
        border: `1.5px solid ${C.line}`, fontSize: "14px", fontWeight: "600",
        fontFamily: F, cursor: "pointer",
      }}>Close</button>
    </div>
  </div>
);

const EligibilityStep = ({ onPass, onFail }) => {
  const [answer, setAnswer] = useState(null);
  const [memberDate, setMemberDate] = useState("");
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");

  const check = () => {
    if (!memberDate) { setError("Please enter the date you became a Free Member."); return; }
    // Parse as local date (not UTC) to avoid timezone off-by-one
    const [y, m, d] = memberDate.split("-").map(Number);
    const joined = new Date(y, m - 1, d);
    const diff = Math.floor((new Date() - joined) / 86400000);
    if (diff < 0) { setError("That date is in the future. Please enter the date you actually became a Free Member."); return; }
    if (diff >= 30) {
      setChecking(true);
      setTimeout(onPass, 1200);
    } else {
      const remaining = 30 - diff;
      const eligibleDate = new Date(joined.getTime() + 30 * 86400000)
        .toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
      setError(`You have ${remaining} more day${remaining !== 1 ? "s" : ""} remaining. Come back after ${eligibleDate}.`);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h3 style={{ margin: "0 0 4px", fontSize: "20px", fontFamily: F, fontWeight: "700", color: C.text }}>
          Eligibility Check
        </h3>
        <p style={{ margin: 0, fontSize: "14px", fontFamily: F, color: C.muted }}>
          Paid Membership requires 30 days as an active Free Member first.
        </p>
      </div>

      <div style={{ background: "rgba(184,217,53,0.1)", border: "1px solid rgba(184,217,53,0.3)", borderRadius: 12, padding: "18px 18px" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <Clock size={17} color={C.primary} style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <p style={{ margin: "0 0 5px", fontSize: "13px", fontWeight: "700", fontFamily: F, color: C.primary }}>
              30-Day Free Membership Requirement
            </p>
            <p style={{ margin: 0, fontSize: "13px", fontFamily: F, color: C.muted, lineHeight: 1.6 }}>
              We ask Free Members to spend 30 days engaging with BRIDGE's work before applying. The result is a community of genuinely informed, committed stakeholders.
            </p>
          </div>
        </div>
      </div>

      <div>
        <p style={{ margin: "0 0 14px", fontSize: "14px", fontWeight: "600", fontFamily: F, color: C.text }}>
          Are you currently a BRIDGE Free Member?
        </p>
        <div style={{ display: "flex", gap: 10 }}>
          {["yes", "no"].map(opt => (
            <button key={opt} onClick={() => { setAnswer(opt); setError(""); }} style={{
              flex: 1, padding: "13px", borderRadius: 12, cursor: "pointer", minHeight: 48,
              border: `2px solid ${answer === opt ? C.primary : C.line}`,
              backgroundColor: answer === opt ? "rgba(27,77,62,0.05)" : C.white,
              color: answer === opt ? C.primary : C.muted,
              fontSize: "14px", fontWeight: "700", fontFamily: F, transition: "all 0.2s",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}>
              {opt === "yes"
                ? <><Check size={13} strokeWidth={3} /> Yes, I'm a Free Member</>
                : <><X size={13} strokeWidth={3} /> No, not yet</>}
            </button>
          ))}
        </div>
      </div>

      {answer === "yes" && (
        <Field label="When did you become a Free Member?" type="date"
          value={memberDate} onChange={e => { setMemberDate(e.target.value); setError(""); }}
          hint="We'll calculate whether your 30-day period has passed."
          required error={error} max={new Date().toISOString().split('T')[0]} />
      )}

      {answer === "no" && (
        <div style={{ background: C.errorBg, border: "1px solid rgba(220,38,38,0.2)", borderRadius: 12, padding: "14px 18px" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <AlertCircle size={15} color={C.error} style={{ flexShrink: 0, marginTop: 2 }} />
            <p style={{ margin: 0, fontSize: "13px", fontFamily: F, color: "#9B1C1C", lineHeight: 1.6 }}>
              Apply for Free Membership first and engage with BRIDGE for 30 days before returning here.
            </p>
          </div>
        </div>
      )}

      {checking && (
        <div style={{ background: "rgba(27,77,62,0.06)", borderRadius: 12, padding: "14px 18px",
          display: "flex", gap: 10, alignItems: "center" }}>
          <CheckCircle size={18} color={C.primary} />
          <span style={{ fontSize: "14px", fontWeight: "600", fontFamily: F, color: C.primary }}>
            Eligibility confirmed — proceeding to your application…
          </span>
        </div>
      )}

      {!checking && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {answer === "yes" && (
            <button onClick={check} style={{
              width: "100%", padding: "14px", borderRadius: 100, minHeight: 44,
              backgroundColor: C.primary, color: C.white, border: "none",
              fontSize: "14px", fontWeight: "700", fontFamily: F, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}>
              Check My Eligibility <ArrowRight size={14} />
            </button>
          )}
          {answer === "no" && (
            <button onClick={onFail} style={{
              width: "100%", padding: "14px", borderRadius: 100, minHeight: 44,
              backgroundColor: C.accent, color: C.primary, border: "none",
              fontSize: "14px", fontWeight: "700", fontFamily: F, cursor: "pointer",
            }}>
              Apply for Free Membership Instead
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const PaidProfileStep = ({ data, onChange, isMobile, tier }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
    <div>
      <h3 style={{ margin: "0 0 4px", fontSize: "20px", fontFamily: F, fontWeight: "700", color: C.text }}>
        Your Profile
      </h3>
      <p style={{ margin: 0, fontSize: "14px", fontFamily: F, color: C.muted }}>
        We review every {tier} application. Your background helps us match you with the right resources from day one.
      </p>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>
      <Field label="First Name" placeholder="Kofi" value={data.firstName}
        onChange={e => onChange("firstName", e.target.value)} required icon={<User size={14} />} />
      <Field label="Last Name" placeholder="Mensah" value={data.lastName}
        onChange={e => onChange("lastName", e.target.value)} required icon={<User size={14} />} />
    </div>

    <Field label="Email Address" type="email" placeholder="you@example.com" value={data.email}
      onChange={e => onChange("email", e.target.value)} required icon={<Mail size={14} />}
      hint="Must match your Free Member account email." />

    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>
      <Field label="Organization / Employer" placeholder="Company or institution" value={data.organization}
        onChange={e => onChange("organization", e.target.value)} icon={<Briefcase size={14} />} />
      <Field label="Your Role" value={data.role} onChange={e => onChange("role", e.target.value)}
        as="select" placeholder="Select your role" options={ROLES} required icon={<Briefcase size={14} />} />
    </div>

    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>
      <Field label="Country of Residence" placeholder="e.g. Ghana, United States" value={data.country}
        onChange={e => onChange("country", e.target.value)} required icon={<MapPin size={14} />} />
      <Field label="Primary Sector of Interest" value={data.sector} onChange={e => onChange("sector", e.target.value)}
        as="select" placeholder="Select a sector" options={SECTORS} required icon={<Globe size={14} />} />
    </div>

    <Field label="LinkedIn Profile (optional)" type="url" placeholder="https://linkedin.com/in/yourname"
      value={data.linkedin} onChange={e => onChange("linkedin", e.target.value)}
      hint="Helps us verify your professional background." />
  </div>
);

const PaidIntentStep = ({ data, onChange, isMobile, tier }) => {
  const toggle = id => {
    const cur = data.intents || [];
    onChange("intents", cur.includes(id) ? cur.filter(i => i !== id) : [...cur, id]);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h3 style={{ margin: "0 0 4px", fontSize: "20px", fontFamily: F, fontWeight: "700", color: C.text }}>
          Intent & Use
        </h3>
        <p style={{ margin: 0, fontSize: "14px", fontFamily: F, color: C.muted }}>
          Help us understand how you plan to use BRIDGE's platform and intelligence.
        </p>
      </div>

      <div>
        <p style={{ margin: "0 0 12px", fontSize: "11px", fontWeight: "700", fontFamily: F, color: C.text,
          textTransform: "uppercase", letterSpacing: "1px" }}>
          Primary reason for {tier} Membership <span style={{ color: C.accent }}>*</span>
        </p>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 10 }}>
          {INTENT_OPTIONS.map(opt => {
            const sel = (data.intents || []).includes(opt.id);
            return (
              <button key={opt.id} onClick={() => toggle(opt.id)} style={{
                textAlign: "left", padding: "13px 14px", borderRadius: 12, cursor: "pointer", minHeight: 44,
                border: `2px solid ${sel ? C.primary : C.line}`,
                backgroundColor: sel ? "rgba(27,77,62,0.05)" : C.white, transition: "all 0.18s",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: "700", fontFamily: F,
                      color: sel ? C.primary : C.text, marginBottom: 3 }}>{opt.label}</div>
                    <div style={{ fontSize: "12px", fontFamily: F, color: C.muted, lineHeight: 1.4 }}>{opt.desc}</div>
                  </div>
                  {sel && (
                    <div style={{ width: 17, height: 17, borderRadius: "50%", flexShrink: 0,
                      backgroundColor: C.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Check size={9} color={C.white} strokeWidth={3} />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <Field label="How do you plan to use BRIDGE's intelligence and community?"
        as="textarea" rows={4}
        placeholder="Describe your goals, the decisions you're trying to make, or the connections you're hoping to build..."
        value={data.intentNote} onChange={e => onChange("intentNote", e.target.value)}
        required hint="Be specific — this helps us understand how to support you best." />

      <Field label="How did you hear about BRIDGE?" value={data.referral}
        onChange={e => onChange("referral", e.target.value)} as="select"
        placeholder="Select one" options={REFERRALS} />
    </div>
  );
};

const ReviewRow = ({ label, value }) => value ? (
  <div style={{ display: "flex", gap: 12, padding: "8px 0", borderBottom: `1px solid ${C.line}` }}>
    <span style={{ fontSize: "11px", fontWeight: "700", fontFamily: F, color: C.muted,
      textTransform: "uppercase", letterSpacing: "0.5px", minWidth: 80, flexShrink: 0 }}>{label}</span>
    <span style={{ fontSize: "13px", fontFamily: F, color: C.text }}>{value}</span>
  </div>
) : null;

const PaidReviewStep = ({ profile, intent, tier, onSubmit, submitting, success }) => {
  const [agreed, setAgreed] = useState(false);
  const pricing = tier === "Intelligence"
    ? { label: "Intelligence Membership", price: "$250/year · ~$21/month" }
    : { label: "Investor Membership", price: "$1,000/year · min. $10K investment commitment" };

  if (success) {
    return (
      <div style={{ textAlign: "center", padding: "24px 0 40px" }}>
        <div style={{
          width: 72, height: 72, borderRadius: "50%", backgroundColor: "rgba(184,217,53,0.15)",
          display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 22px",
        }}>
          <CheckCircle size={36} color={C.primary} />
        </div>
        <h3 style={{ margin: "0 0 10px", fontSize: "24px", fontFamily: F, fontWeight: "700", color: C.text }}>
          Application Submitted
        </h3>
        <p style={{ margin: "0 auto 22px", fontSize: "14px", fontFamily: F, color: C.muted,
          lineHeight: 1.75, maxWidth: 380 }}>
          Thank you, {profile.firstName}. We've received your {tier} Membership application and will reach out to <strong>{profile.email}</strong> within 3–5 business days.
        </p>
        <div style={{ background: "rgba(27,77,62,0.06)", borderRadius: 12, padding: "14px 18px",
          display: "flex", gap: 10, alignItems: "flex-start", textAlign: "left", maxWidth: 400, margin: "0 auto" }}>
          <Shield size={15} color={C.primary} style={{ flexShrink: 0, marginTop: 2 }} />
          <span style={{ fontSize: "13px", fontFamily: F, color: C.primary, fontWeight: "600", lineHeight: 1.5 }}>
            Your Free Member access remains fully active while we review.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div>
        <h3 style={{ margin: "0 0 4px", fontSize: "20px", fontFamily: F, fontWeight: "700", color: C.text }}>
          Review & Submit
        </h3>
        <p style={{ margin: 0, fontSize: "14px", fontFamily: F, color: C.muted }}>
          Confirm your details before submitting your application.
        </p>
      </div>

      <div>
        <p style={{ margin: "0 0 10px", fontSize: "10px", fontWeight: "700", fontFamily: F,
          color: C.accent, letterSpacing: "1.5px", textTransform: "uppercase" }}>Your Profile</p>
        <ReviewRow label="Name" value={`${profile.firstName} ${profile.lastName}`} />
        <ReviewRow label="Email" value={profile.email} />
        <ReviewRow label="Organization" value={profile.organization} />
        <ReviewRow label="Role" value={profile.role} />
        <ReviewRow label="Country" value={profile.country} />
        <ReviewRow label="Sector Focus" value={profile.sector} />
      </div>

      <div>
        <p style={{ margin: "0 0 10px", fontSize: "10px", fontWeight: "700", fontFamily: F,
          color: C.accent, letterSpacing: "1.5px", textTransform: "uppercase" }}>Your Intent</p>
        <ReviewRow label="Goals"
          value={(intent.intents || []).map(id => INTENT_OPTIONS.find(o => o.id === id)?.label).filter(Boolean).join(", ")} />
        <ReviewRow label="Referral" value={intent.referral} />
        {intent.intentNote && (
          <div style={{ padding: "10px 0" }}>
            <div style={{ fontSize: "11px", fontWeight: "700", fontFamily: F, color: C.muted,
              textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 6 }}>How You Plan to Use BRIDGE</div>
            <div style={{ fontSize: "13px", fontFamily: F, color: C.text, lineHeight: 1.6,
              background: C.bg, borderRadius: 8, padding: 13, whiteSpace: "pre-wrap" }}>{intent.intentNote}</div>
          </div>
        )}
      </div>

      {/* Pricing */}
      <div style={{ background: "rgba(27,77,62,0.06)", borderRadius: 12, padding: "15px 18px" }}>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <Star size={15} color={C.primary} style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <p style={{ margin: "0 0 3px", fontSize: "13px", fontWeight: "700", fontFamily: F, color: C.primary }}>
              {pricing.label} · {pricing.price}
            </p>
            <p style={{ margin: 0, fontSize: "13px", fontFamily: F, color: C.muted, lineHeight: 1.5 }}>
              Payment is processed only after your application is reviewed and approved. You will not be charged now.
            </p>
          </div>
        </div>
      </div>

      {/* Agreement checkbox */}
      <label htmlFor={`bridge-agree-${tier}`} style={{ display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer" }}>
        <div style={{ position: "relative", flexShrink: 0, marginTop: 1 }}>
          <input
            id={`bridge-agree-${tier}`} type="checkbox" checked={agreed}
            onChange={e => setAgreed(e.target.checked)}
            style={{ position: "absolute", opacity: 0, width: 20, height: 20, margin: 0, cursor: "pointer" }}
          />
          <div style={{
            width: 20, height: 20, borderRadius: 5, pointerEvents: "none",
            border: `2px solid ${agreed ? C.primary : C.line}`,
            backgroundColor: agreed ? C.primary : "transparent",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s",
          }}>
            {agreed && <Check size={11} color={C.white} strokeWidth={3} />}
          </div>
        </div>
        <span style={{ fontSize: "13px", fontFamily: F, color: C.muted, lineHeight: 1.6 }}>
          I confirm the information above is accurate. I agree to BRIDGE's{" "}
          <a href="#" style={{ color: C.primary, fontWeight: "600" }}>Member Terms</a> and{" "}
          <a href="#" style={{ color: C.primary, fontWeight: "600" }}>Privacy Policy</a>.
        </span>
      </label>

      <button onClick={agreed ? onSubmit : undefined} disabled={!agreed || submitting} style={{
        width: "100%", padding: "15px", borderRadius: 100, minHeight: 44,
        backgroundColor: agreed ? C.primary : C.line,
        color: agreed ? C.white : C.muted, border: "none",
        fontSize: "14px", fontWeight: "700", fontFamily: F,
        cursor: agreed ? "pointer" : "not-allowed", transition: "all 0.2s",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
      }}>
        {submitting ? "Submitting…" : <>Submit {tier} Membership Application <ArrowRight size={14} /></>}
      </button>
    </div>
  );
};

export function BRIDGEPaidMemberModal({ isOpen, onClose, onApplyFreeInstead, tier = "Intelligence" }) {
  const [step, setStep] = useState(0);
  const [notEligible, setNotEligible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [profile, setProfile] = useState({
    firstName: "", lastName: "", email: "", organization: "",
    role: "", country: "", sector: "", linkedin: "",
  });
  const [intent, setIntent] = useState({ intents: [], intentNote: "", referral: "" });

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    fn(); window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(0); setNotEligible(false); setSubmitting(false); setSuccess(false);
        setProfile({ firstName: "", lastName: "", email: "", organization: "", role: "", country: "", sector: "", linkedin: "" });
        setIntent({ intents: [], intentNote: "", referral: "" });
      }, 300);
      return;
    }
    const count = parseInt(document.body.dataset.modalCount || "0") + 1;
    document.body.dataset.modalCount = String(count);
    document.body.style.overflow = "hidden";
    return () => {
      const next = Math.max(0, parseInt(document.body.dataset.modalCount || "1") - 1);
      document.body.dataset.modalCount = String(next);
      if (next === 0) document.body.style.overflow = "";
    };
  }, [isOpen]);

  const updateProfile = (k, v) => setProfile(p => ({ ...p, [k]: v }));
  const updateIntent  = (k, v) => setIntent(i  => ({ ...i, [k]: v }));

  const handleSubmit = () => {
    setSubmitting(true);
    // TODO: POST to backend — create paid member application
    setTimeout(() => { setSubmitting(false); setSuccess(true); }, 2000);
  };

  const canNext = () => {
    if (step === 1) return profile.firstName && profile.lastName && profile.email.includes('@') && profile.role && profile.country && profile.sector;
    if (step === 2) return (intent.intents || []).length > 0 && intent.intentNote.trim().length > 0;
    return true;
  };

  const SIDEBAR_INFO = [
    { icon: <Clock size={22} color={C.accent} />, title: "Why 30 days?",
      body: "BRIDGE Paid Membership is built on trust. We ask Free Members to spend 30 days engaging with content before applying. The result is a community of genuinely informed, committed stakeholders.",
      note: "Your Free Member start date is the anchor for this calculation." },
    { icon: <User size={22} color={C.accent} />, title: "Your profile matters",
      body: "We review every application. Your background helps us match you with the right resources, introductions, and community conversations from day one.",
      note: "We will never share your personal data with third parties." },
    { icon: <FileText size={22} color={C.accent} />, title: tier === "Intelligence" ? "Full intelligence access" : "Deal room + advisory",
      body: tier === "Intelligence"
        ? "Intelligence Members access all 12 sector briefs, the full opportunity database, 11 Cannabis NCC segments, the policy tracker, and the Ghana Insider newsletter."
        : "Investor Members access everything in Intelligence plus the deal room, co-investment pipeline, AI Founders Portal, quarterly reports, and analyst briefings.",
      note: tier === "Intelligence" ? "$250/year. Payment only after approval." : "$1,000/year + min. $10K investment. Payment only after approval." },
    { icon: <Shield size={22} color={C.accent} />, title: "Manual review",
      body: "Every Paid Membership application is reviewed by the BRIDGE team within 3–5 business days. We're selective — that's a feature, not a bug.",
      note: "You'll receive an email with our decision." },
  ];

  const sb = SIDEBAR_INFO[Math.min(step, SIDEBAR_INFO.length - 1)];

  const sidebar = (
    <div style={{
      width: 270, flexShrink: 0, backgroundColor: C.primary,
      padding: "32px 26px", display: "flex", flexDirection: "column",
    }}>
      <div style={{ marginBottom: 32 }}><BridgeLogo height={22} uid="paid-sb" /></div>
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: 14 }}>{sb.icon}</div>
        <h4 style={{ margin: "0 0 10px", fontSize: "16px", fontWeight: "700", fontFamily: F, color: C.white }}>{sb.title}</h4>
        <p style={{ margin: "0 0 14px", fontSize: "13px", fontFamily: F, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>{sb.body}</p>
        <p style={{ margin: 0, fontSize: "12px", fontFamily: F, color: "rgba(184,217,53,0.8)", lineHeight: 1.5, fontStyle: "italic" }}>{sb.note}</p>
      </div>
      <div style={{ marginTop: 32 }}>
        <SidebarSteps steps={PAID_STEPS} current={notEligible ? 0 : success ? PAID_STEPS.length : step} />
      </div>
    </div>
  );

  const header = (
    <div style={{
      padding: isMobile ? "12px 20px 14px" : "24px 32px 18px",
      borderBottom: `1px solid ${C.line}`,
      display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0,
    }}>
      {isMobile ? (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: C.primary, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Check size={14} color={C.accent} strokeWidth={3} />
          </div>
          <div>
            <p style={{ margin: "0 0 1px", fontSize: "10px", fontWeight: "700", fontFamily: F,
              color: C.accent, letterSpacing: "1.5px", textTransform: "uppercase" }}>
              {notEligible ? "Not Eligible" : success ? "Complete" : `${PAID_STEPS[step]} · Step ${step + 1} of ${PAID_STEPS.length}`}
            </p>
            <p style={{ margin: 0, fontSize: "15px", fontWeight: "700", fontFamily: F, color: C.text }}>
              {tier} Membership
            </p>
          </div>
        </div>
      ) : (
        <div>
          <p style={{ margin: "0 0 2px", fontSize: "10px", fontWeight: "700", fontFamily: F,
            color: C.accent, letterSpacing: "1.5px", textTransform: "uppercase" }}>Application</p>
          <h2 style={{ margin: 0, fontSize: "17px", fontWeight: "800", fontFamily: F, color: C.text }}>
            {tier} Membership
          </h2>
        </div>
      )}
      <button onClick={onClose} style={{
        width: 34, height: 34, borderRadius: "50%", border: `1.5px solid ${C.line}`,
        backgroundColor: "transparent", cursor: "pointer", color: C.muted,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}><X size={15} /></button>
    </div>
  );

  const showFooter = !notEligible && !success && step > 0;
  const footer = showFooter ? (
    <div style={{
      padding: isMobile ? "13px 20px" : "18px 32px",
      paddingBottom: isMobile ? "calc(13px + env(safe-area-inset-bottom))" : "18px",
      borderTop: `1px solid ${C.line}`,
      display: "flex", flexDirection: isMobile ? "column-reverse" : "row",
      justifyContent: "space-between", alignItems: isMobile ? "stretch" : "center",
      gap: 10, flexShrink: 0,
    }}>
      <button onClick={() => setStep(s => s - 1)} style={{
        display: "flex", alignItems: "center", justifyContent: isMobile ? "center" : "flex-start",
        gap: 6, backgroundColor: "transparent", color: C.muted,
        border: isMobile ? `1.5px solid ${C.line}` : "none",
        borderRadius: isMobile ? 100 : 0, fontSize: "14px", fontWeight: "600",
        fontFamily: F, cursor: "pointer", padding: isMobile ? "13px" : "10px 0", minHeight: 44,
      }}>
        <ArrowLeft size={14} /> Back
      </button>
      {step < 3 && (() => {
        const ok = canNext();
        return (
          <button onClick={() => ok && setStep(s => s + 1)} disabled={!ok} style={{
            padding: "13px 28px", borderRadius: 100, minHeight: 44,
            backgroundColor: ok ? C.primary : C.line,
            color: ok ? C.white : C.muted, border: "none",
            fontSize: "14px", fontWeight: "700", fontFamily: F,
            cursor: ok ? "pointer" : "not-allowed",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            width: isMobile ? "100%" : "auto", transition: "all 0.2s",
          }}>
            Continue <ArrowRight size={14} />
          </button>
        );
      })()}
    </div>
  ) : success ? (
    <div style={{
      padding: isMobile ? "13px 20px" : "18px 32px",
      paddingBottom: isMobile ? "calc(13px + env(safe-area-inset-bottom))" : "18px",
      borderTop: `1px solid ${C.line}`, flexShrink: 0,
    }}>
      <button onClick={onClose} style={{
        width: "100%", padding: "14px", borderRadius: 100, minHeight: 44,
        backgroundColor: C.accent, color: C.primary, border: "none",
        fontSize: "14px", fontWeight: "800", fontFamily: F, cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
      }}>Go to Dashboard <ArrowRight size={14} /></button>
    </div>
  ) : null;

  return (
    <ModalShell isOpen={isOpen} onClose={onClose} isMobile={isMobile} sidebar={sidebar} footer={footer}>
      {isMobile && <DragHandle />}
      {header}
      {isMobile && !notEligible && !success && <StepStrip current={step} total={PAID_STEPS.length} />}
      {!notEligible && !success && !isMobile && (
        <div style={{ padding: "0 32px", paddingTop: 24, flexShrink: 0 }}>
          <DesktopProgress steps={PAID_STEPS} current={step} />
        </div>
      )}
      <div className="bridge-scroll" style={{ flex: 1, overflowY: "auto", padding: isMobile ? "22px 20px" : "20px 32px" }}>
        {notEligible ? (
          <NotEligibleScreen
            onApplyFree={() => { onClose(); onApplyFreeInstead?.(); }}
            onClose={onClose}
          />
        ) : step === 0 ? (
          <EligibilityStep onPass={() => setStep(1)} onFail={() => setNotEligible(true)} />
        ) : step === 1 ? (
          <PaidProfileStep data={profile} onChange={updateProfile} isMobile={isMobile} tier={tier} />
        ) : step === 2 ? (
          <PaidIntentStep data={intent} onChange={updateIntent} isMobile={isMobile} tier={tier} />
        ) : (
          <PaidReviewStep profile={profile} intent={intent} tier={tier}
            onSubmit={handleSubmit} submitting={submitting} success={success} />
        )}
      </div>
    </ModalShell>
  );
}

// ═════════════════════════════════════════════════════════════
// DEMO WRAPPER — wires both modals to the membership page CTAs
// ═════════════════════════════════════════════════════════════
export default function MembershipModalDemo() {
  const [freeOpen, setFreeOpen]         = useState(false);
  const [intelOpen, setIntelOpen]       = useState(false);
  const [investorOpen, setInvestorOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: C.primary,
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", gap: 20, padding: 40, fontFamily: F }}>

      <BridgeLogo height={28} uid="demo" />
      <h2 style={{ color: "#fff", fontWeight: "800", fontSize: 20, margin: 0 }}>
        Membership Modals
      </h2>
      <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, margin: 0, textAlign: "center", maxWidth: 360 }}>
        Three modal triggers — mirrors the membership page CTA buttons exactly.
      </p>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <button onClick={() => setFreeOpen(true)} style={{
          backgroundColor: "rgba(255,255,255,0.08)", color: "#fff",
          border: "1.5px solid rgba(255,255,255,0.2)", borderRadius: 100,
          padding: "12px 24px", fontSize: "13px", fontWeight: "700",
          fontFamily: F, cursor: "pointer", minHeight: 44,
        }}>
          Apply Free Membership
        </button>
        <button onClick={() => setIntelOpen(true)} style={{
          backgroundColor: C.accent, color: C.primary,
          border: "none", borderRadius: 100, padding: "12px 24px",
          fontSize: "13px", fontWeight: "800", fontFamily: F, cursor: "pointer", minHeight: 44,
        }}>
          Join Intelligence — $250/yr
        </button>
        <button onClick={() => setInvestorOpen(true)} style={{
          backgroundColor: "rgba(255,255,255,0.12)", color: C.white,
          border: "1.5px solid rgba(255,255,255,0.35)", borderRadius: 100, padding: "12px 24px",
          fontSize: "13px", fontWeight: "800", fontFamily: F, cursor: "pointer", minHeight: 44,
        }}>
          Apply Investor — $1,000/yr
        </button>
      </div>

      <BRIDGEFreeMemberModal
        isOpen={freeOpen}
        onClose={() => setFreeOpen(false)}
      />
      <BRIDGEPaidMemberModal
        isOpen={intelOpen}
        onClose={() => setIntelOpen(false)}
        tier="Intelligence"
        onApplyFreeInstead={() => { setIntelOpen(false); setFreeOpen(true); }}
      />
      <BRIDGEPaidMemberModal
        isOpen={investorOpen}
        onClose={() => setInvestorOpen(false)}
        tier="Investor"
        onApplyFreeInstead={() => { setInvestorOpen(false); setFreeOpen(true); }}
      />
    </div>
  );
}
