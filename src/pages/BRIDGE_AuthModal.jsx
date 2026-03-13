import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────
// TOKENS
// ─────────────────────────────────────────────
const C = {
  primary:     "#1B4D3E",
  primaryDark: "#163f32",
  primaryDeep: "#0f2e24",
  accent:      "#B8D935",
  accentDim:   "#a5c42e",
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
// LOGO (white variant for dark panel)
// ─────────────────────────────────────────────
const LogoWhite = () => (
  <svg height="28" viewBox="0 0 3434.33 932.3" xmlns="http://www.w3.org/2000/svg">
    <defs><style>{`
      .lw1{fill:#ffffff;}
      .lw2{fill:#ffffff;stroke:#ffffff;stroke-width:.5px;stroke-miterlimit:10;}
      .lw3{fill:none;stroke:#ffffff;stroke-width:80px;stroke-miterlimit:10;}
      .lw4{fill:none;stroke:#333;stroke-width:5px;stroke-miterlimit:10;}
      .lw5{fill:#B8D935;stroke:#ffffff;stroke-miterlimit:10;}
      .lw6{fill:#B8D935;}
      .lw8{fill:#ffffff;}
    `}</style></defs>
    <g><g>
      <path className="lw6" d="M2070.26,927.95c-.2.2-.5.4-.7.5h-.3l1-.5Z"/>
      <path className="lw1" d="M1853.06,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9h0ZM1894.56,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1v.1Z"/>
      <path className="lw2" d="M1431.68,224.45h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.05c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5l.1.1h0Z"/>
      <path className="lw2" d="M1488.08,578.65v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"/>
      <rect className="lw6" x="1427.38" y="17.35" width="205.2" height="145"/>
      <rect className="lw1" x="1427.48" y="221.75" width="205.2" height="693.2" rx="9.6" ry="9.6"/>
      <path className="lw1" d="M2757.31,19.09h491.3c5.42,0,9.82,4.4,9.82,9.82v218.7c0,5.42-4.4,9.82-9.82,9.82h-507.36c-56.98,0-108.53,23.02-145.87,60.35-37.34,37.23-60.45,88.79-60.45,145.66,0,113.75,92.37,206.01,206.32,206.01h12.89c2.86,0,5.11,2.25,5.11,5.11v236.7c0,1.13-.92,1.94-1.94,1.94h0c-242.22,0-438.52-195.99-438.52-437.8v-18.51c0-241.81,196.29-437.8,438.52-437.8h0Z"/>
      <rect className="lw1" x="2812.75" y="339.47" width="216.75" height="572.62" rx="9.6" ry="9.6"/>
      <rect className="lw6" x="3083.41" y="339.47" width="175.12" height="257.67"/>
      <rect className="lw6" x="3083.41" y="654.42" width="175.12" height="257.67"/>
      <rect className="lw3" x="40" y="40" width="843.91" height="852.3" rx="36.55" ry="36.55"/>
      <polygon className="lw5" points="722.6 322.13 462.28 452.8 201.97 322.75 461.21 192.52 722.6 322.13"/>
      <path className="lw1" d="M197.84,426.78c3.86-.53,7.04.85,10.74,1.41l252.53,125.67c84.54-40,167.66-83.83,251.89-124.84,33.14-11.49,50.09,34.15,18.55,49.11l-259.23,129.08c-10.18,3.72-14.14,2.57-23.85-1.31l-264.23-132.98c-17.04-14.4-7.96-43.2,13.61-46.14h0Z"/>
      <path className="lw6" d="M195.25,558c3.65-.63,7.4-.4,11.08-.22,86.11,40.47,170.4,85.05,255.95,126.78l252.92-126c29.53-7.22,45.44,28.67,22.29,46.49l-270.42,134.42-8.62.31c-91.6-42.21-181.07-89.86-271.7-134.42-18.72-12.06-13.3-43.58,8.5-47.37h0Z"/>
    </g></g>
  </svg>
);

const LogoDark = () => (
  <svg height="28" viewBox="0 0 3434.33 932.3" xmlns="http://www.w3.org/2000/svg">
    <defs><style>{`.ld1,.ld2{fill:#1b4d3e;}.ld2{stroke:#000;stroke-width:.5px;}.ld2,.ld3,.ld4,.ld5{stroke-miterlimit:10;}.ld3{stroke-width:80px;}.ld3,.ld4{fill:none;}.ld3,.ld5{stroke:#1b4d3e;}.ld6,.ld5{fill:#b8d935;}.ld4{stroke:#231f20;stroke-width:5px;}.ld8{fill:#191919;}`}</style></defs>
    <g><g>
      <path className="ld6" d="M2070.26,927.95c-.2.2-.5.4-.7.5h-.3l1-.5Z"/>
      <path className="ld1" d="M1853.06,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9h0ZM1894.56,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1v.1Z"/>
      <path className="ld2" d="M1431.68,224.45h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.05c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5l.1.1h0Z"/>
      <path className="ld2" d="M1488.08,578.65v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"/>
      <rect className="ld6" x="1427.38" y="17.35" width="205.2" height="145"/>
      <rect className="ld1" x="1427.48" y="221.75" width="205.2" height="693.2" rx="9.6" ry="9.6"/>
      <path className="ld1" d="M2757.31,19.09h491.3c5.42,0,9.82,4.4,9.82,9.82v218.7c0,5.42-4.4,9.82-9.82,9.82h-507.36c-56.98,0-108.53,23.02-145.87,60.35-37.34,37.23-60.45,88.79-60.45,145.66,0,113.75,92.37,206.01,206.32,206.01h12.89c2.86,0,5.11,2.25,5.11,5.11v236.7c0,1.13-.92,1.94-1.94,1.94h0c-242.22,0-438.52-195.99-438.52-437.8v-18.51c0-241.81,196.29-437.8,438.52-437.8h0Z"/>
      <rect className="ld1" x="2812.75" y="339.47" width="216.75" height="572.62" rx="9.6" ry="9.6"/>
      <rect className="ld6" x="3083.41" y="339.47" width="175.12" height="257.67"/>
      <rect className="ld6" x="3083.41" y="654.42" width="175.12" height="257.67"/>
      <rect className="ld3" x="40" y="40" width="843.91" height="852.3" rx="36.55" ry="36.55"/>
      <polygon className="ld5" points="722.6 322.13 462.28 452.8 201.97 322.75 461.21 192.52 722.6 322.13"/>
      <path className="ld1" d="M197.84,426.78c3.86-.53,7.04.85,10.74,1.41l252.53,125.67c84.54-40,167.66-83.83,251.89-124.84,33.14-11.49,50.09,34.15,18.55,49.11l-259.23,129.08c-10.18,3.72-14.14,2.57-23.85-1.31l-264.23-132.98c-17.04-14.4-7.96-43.2,13.61-46.14h0Z"/>
      <path className="ld6" d="M195.25,558c3.65-.63,7.4-.4,11.08-.22,86.11,40.47,170.4,85.05,255.95,126.78l252.92-126c29.53-7.22,45.44,28.67,22.29,46.49l-270.42,134.42-8.62.31c-91.6-42.21-181.07-89.86-271.7-134.42-18.72-12.06-13.3-43.58,8.5-47.37h0Z"/>
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
  outline: "none", transition: "border-color 0.18s ease, background 0.18s ease",
  boxSizing: "border-box", width: "100%",
  boxShadow: focused ? `0 0 0 3px rgba(27,77,62,0.07)` : "none",
});

const labelStyle = {
  fontSize: "11px", fontWeight: "700", fontFamily: "Inter, sans-serif",
  color: C.primary, letterSpacing: "0.9px", textTransform: "uppercase",
  marginBottom: "6px", display: "block",
};

const Field = ({ label, type = "text", placeholder, value, onChange, required, rightEl }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label style={labelStyle}>{label}{required && <span style={{ color: C.accent, marginLeft: "3px" }}>*</span>}</label>
      <div style={{ position: "relative" }}>
        <input
          type={type} placeholder={placeholder} value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} required={required}
          style={{ ...inputBase(focused), paddingRight: rightEl ? "48px" : "16px" }}
        />
        {rightEl && <div style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)" }}>{rightEl}</div>}
      </div>
    </div>
  );
};

const PasswordField = ({ label, value, onChange, required }) => {
  const [focused, setFocused] = useState(false);
  const [show, setShow] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label style={labelStyle}>{label}{required && <span style={{ color: C.accent, marginLeft: "3px" }}>*</span>}</label>
      <div style={{ position: "relative" }}>
        <input
          type={show ? "text" : "password"} placeholder="••••••••••••"
          value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} required={required}
          style={{ ...inputBase(focused), paddingRight: "48px" }}
        />
        <button type="button" onClick={() => setShow(s => !s)} style={{
          position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)",
          background: "none", border: "none", cursor: "pointer", color: C.faint, padding: 0,
          display: "flex", alignItems: "center",
        }}>
          {show ? (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
          ) : (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          )}
        </button>
      </div>
    </div>
  );
};

const SelectField = ({ label, value, onChange, options, required }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label style={labelStyle}>{label}{required && <span style={{ color: C.accent, marginLeft: "3px" }}>*</span>}</label>
      <select value={value} onChange={onChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} required={required}
        style={{ ...inputBase(focused), paddingRight: "40px", cursor: "pointer", appearance: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%231B4D3E' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center",
          color: value ? C.dark : C.faint,
        }}>
        {options.map(o => <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>)}
      </select>
    </div>
  );
};

const TextareaField = ({ label, placeholder, value, onChange, required }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label style={labelStyle}>{label}{required && <span style={{ color: C.accent, marginLeft: "3px" }}>*</span>}</label>
      <textarea placeholder={placeholder} value={value} onChange={onChange} rows={3}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} required={required}
        style={{ ...inputBase(focused), resize: "vertical", minHeight: "90px", lineHeight: "1.6" }}
      />
    </div>
  );
};

// ─────────────────────────────────────────────
// SUBMIT BUTTON
// ─────────────────────────────────────────────
const SubmitBtn = ({ loading, disabled, label }) => {
  const [hov, setHov] = useState(false);
  return (
    <button type="submit" disabled={disabled || loading}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        width: "100%", padding: "15px 32px", borderRadius: "50px", border: "none",
        backgroundColor: (disabled || loading) ? "#C8C8C8" : hov ? C.primaryDark : C.primary,
        color: C.white, fontSize: "15px", fontWeight: "700", fontFamily: "Inter, sans-serif",
        cursor: (disabled || loading) ? "not-allowed" : "pointer",
        transition: "background 0.2s ease, transform 0.1s ease",
        transform: hov && !disabled && !loading ? "translateY(-1px)" : "none",
        boxShadow: hov && !disabled && !loading ? "0 6px 20px rgba(27,77,62,0.3)" : "none",
        display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
      }}>
      {loading ? (
        <><span style={{ width: "17px", height: "17px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: C.white, borderRadius: "50%", animation: "auth-spin 0.7s linear infinite", display: "inline-block" }}/> Processing…</>
      ) : (
        <>{label}<span style={{ width: "24px", height: "24px", backgroundColor: C.accent, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </span></>
      )}
    </button>
  );
};

// ─────────────────────────────────────────────
// LEFT BRAND PANEL
// ─────────────────────────────────────────────
const BrandPanel = ({ tab }) => {
  const isRequest = tab === "request";
  const stats = isRequest
    ? [
        { n: "12",    label: "Sector analyses" },
        { n: "174+",  label: "Identified ventures" },
        { n: "60K+",  label: "Words of research" },
      ]
    : [
        { n: "12",    label: "Integrated sectors" },
        { n: "GH",    label: "Ghana-first focus" },
        { n: "PBC",   label: "Public benefit corp" },
      ];

  return (
    <div style={{
      background: `linear-gradient(160deg, ${C.primaryDeep} 0%, ${C.primary} 100%)`,
      padding: "44px 36px", display: "flex", flexDirection: "column",
      justifyContent: "space-between", position: "relative", overflow: "hidden",
      minHeight: "520px",
    }}>
      {/* Subtle pattern overlay */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.035,
        backgroundImage: `radial-gradient(circle, ${C.white} 1px, transparent 1px)`,
        backgroundSize: "22px 22px",
      }}/>

      {/* Top */}
      <div style={{ position: "relative" }}>
        <LogoWhite />
        <div style={{ marginTop: "36px" }}>
          <div style={{
            display: "inline-block", padding: "5px 12px",
            border: `1px solid rgba(184,217,53,0.35)`,
            borderRadius: "50px", marginBottom: "16px",
          }}>
            <span style={{ fontSize: "10px", fontWeight: "700", fontFamily: "Inter, sans-serif", color: C.accent, letterSpacing: "1.2px", textTransform: "uppercase" }}>
              {isRequest ? "Research Library" : "Authenticated Portal"}
            </span>
          </div>
          <h2 style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "26px", fontWeight: "700",
            color: C.white, lineHeight: "1.3",
            margin: "0 0 14px 0",
          }}>
            {isRequest
              ? <>Building Ghana's most comprehensive investment intelligence platform.</>
              : <>Welcome back to Ghana's premier investment intelligence platform.</>
            }
          </h2>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", fontFamily: "Inter, sans-serif", lineHeight: "1.7", margin: 0 }}>
            {isRequest
              ? "Institutional-grade sector analysis built for investors, government partners, and development organizations."
              : "Access your personalized portal, sector analyses, and investment documentation."
            }
          </p>
        </div>
      </div>

      {/* Stats strip */}
      <div style={{ position: "relative" }}>
        <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.1)", marginBottom: "24px" }}/>
        <div style={{ display: "flex", gap: "0" }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              flex: 1, paddingRight: "16px",
              borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none",
              marginRight: i < stats.length - 1 ? "16px" : 0,
            }}>
              <div style={{ fontSize: "22px", fontWeight: "800", fontFamily: "Inter, sans-serif", color: C.accent, lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", fontFamily: "Inter, sans-serif", marginTop: "4px", lineHeight: "1.3" }}>{s.label}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", fontFamily: "Inter, sans-serif", margin: "20px 0 0 0" }}>
          © 2026 BRIDGE PBC · All rights reserved
        </p>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// SIGN IN FORM
// ─────────────────────────────────────────────
const SignInForm = ({ onSuccess, onForgot }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); onSuccess(); }, 1500);
  };
  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      <Field label="Email Address" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
          <label style={labelStyle}>Password <span style={{ color: C.accent }}>*</span></label>
          <button type="button" onClick={onForgot} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "12px", color: C.faint, fontFamily: "Inter, sans-serif", padding: 0 }}>
            Forgot password?
          </button>
        </div>
        <PasswordField value={password} onChange={e => setPassword(e.target.value)} required />
      </div>
      <div style={{ paddingTop: "4px" }}>
        <SubmitBtn loading={loading} disabled={!email || !password} label="Sign In" />
      </div>
    </form>
  );
};

// ─────────────────────────────────────────────
// REQUEST ACCESS FORM (2-step)
// ─────────────────────────────────────────────
const RequestAccessForm = ({ onSuccess, isMobile }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", country: "", organization: "", role: "", primaryInterest: "", connection: "", description: "", consent: false });
  const [loading, setLoading] = useState(false);
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const step1Valid = form.name && form.email && form.country;
  const step2Valid = form.primaryInterest && form.connection && form.consent;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!step2Valid) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); onSuccess(); }, 1800);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Step indicator */}
      <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
        {[1, 2].map((n, i) => (
          <div key={n} style={{ display: "flex", alignItems: "center", flex: i === 0 ? "1" : "0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{
                width: "28px", height: "28px", borderRadius: "50%",
                backgroundColor: step >= n ? C.primary : C.line,
                color: step >= n ? C.white : C.faint,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "12px", fontWeight: "700", fontFamily: "Inter, sans-serif",
                transition: "all 0.25s ease", flexShrink: 0,
              }}>
                {step > n ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg> : n}
              </div>
              <span style={{ fontSize: "12px", fontWeight: step === n ? "700" : "400", color: step === n ? C.primary : C.faint, fontFamily: "Inter, sans-serif", whiteSpace: "nowrap" }}>
                {n === 1 ? "Your Details" : "Your Interest"}
              </span>
            </div>
            {i === 0 && <div style={{ flex: 1, height: "1px", backgroundColor: step > 1 ? C.primary : C.line, margin: "0 12px", transition: "background 0.3s ease" }}/>}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", animation: "auth-fadeIn 0.2s ease" }}>
          <Field label="Full Name" placeholder="e.g. Kwame Mensah" value={form.name} onChange={set("name")} required />
          <Field label="Email Address" type="email" placeholder="your@email.com" value={form.email} onChange={set("email")} required />
          <SelectField label="Country of Residence" value={form.country} onChange={set("country")} required
            options={[
              { value: "", label: "Select country…", disabled: true },
              { value: "GH", label: "Ghana" },
              { value: "US", label: "United States" },
              { value: "GB", label: "United Kingdom" },
              { value: "CA", label: "Canada" },
              { value: "DE", label: "Germany" },
              { value: "AU", label: "Australia" },
              { value: "NL", label: "Netherlands" },
              { value: "other", label: "Other" },
            ]}
          />
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "14px" }}>
            <Field label="Organization" placeholder="e.g. Acme Capital" value={form.organization} onChange={set("organization")} />
            <Field label="Role / Title" placeholder="e.g. Managing Director" value={form.role} onChange={set("role")} />
          </div>
          <div style={{ paddingTop: "4px" }}>
            <button type="button" disabled={!step1Valid} onClick={() => setStep(2)} style={{
              width: "100%", padding: "15px 32px", borderRadius: "50px", border: "none",
              backgroundColor: step1Valid ? C.primary : "#C8C8C8",
              color: C.white, fontSize: "15px", fontWeight: "700", fontFamily: "Inter, sans-serif",
              cursor: step1Valid ? "pointer" : "not-allowed",
              transition: "all 0.2s ease",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
            }}>
              Continue
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px", animation: "auth-fadeIn 0.2s ease" }}>
          <SelectField label="Primary Interest" value={form.primaryInterest} onChange={set("primaryInterest")} required
            options={[
              { value: "", label: "Select primary interest…", disabled: true },
              { value: "investment", label: "Investment Opportunity" },
              { value: "partnership", label: "Government / Development Partnership" },
              { value: "advisory", label: "Advisory / Consulting" },
              { value: "research", label: "Research & Analysis" },
              { value: "general", label: "General Interest" },
            ]}
          />
          <SelectField label="Connection to Ghana" value={form.connection} onChange={set("connection")} required
            options={[
              { value: "", label: "Select connection…", disabled: true },
              { value: "citizen", label: "Ghanaian Citizen (resident)" },
              { value: "diaspora", label: "Ghanaian Diaspora" },
              { value: "investor", label: "International Investor" },
              { value: "government", label: "Government Official" },
              { value: "dev-partner", label: "Development Partner / NGO" },
              { value: "academic", label: "Academic / Researcher" },
              { value: "other", label: "Other" },
            ]}
          />
          <TextareaField label="Brief Description of Interest" placeholder="Tell us what you're hoping to explore with BRIDGE…" value={form.description} onChange={set("description")} />

          {/* Consent */}
          <label style={{ display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer", padding: "14px 16px", backgroundColor: form.consent ? C.accentLight : C.bg, border: `1.5px solid ${form.consent ? C.primary : C.line}`, borderRadius: "12px", transition: "all 0.2s ease" }}>
            <div onClick={() => setForm(f => ({ ...f, consent: !f.consent }))} style={{ width: "18px", height: "18px", minWidth: "18px", borderRadius: "5px", marginTop: "1px", border: `2px solid ${form.consent ? C.primary : C.lineStrong}`, backgroundColor: form.consent ? C.primary : C.white, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.18s ease", cursor: "pointer" }}>
              {form.consent && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>}
            </div>
            <span style={{ fontSize: "13px", color: "#555", fontFamily: "Inter, sans-serif", lineHeight: "1.6" }}>
              I agree to receive communications from BRIDGE PBC and understand that access is subject to team review and approval.
            </span>
          </label>

          <div style={{ display: "flex", gap: "10px" }}>
            <button type="button" onClick={() => setStep(1)} style={{ flexShrink: 0, padding: "14px 20px", borderRadius: "50px", border: `1.5px solid ${C.line}`, backgroundColor: "transparent", color: C.mid, fontSize: "14px", fontWeight: "600", fontFamily: "Inter, sans-serif", cursor: "pointer", transition: "all 0.2s ease" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.primary; e.currentTarget.style.color = C.primary; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.line; e.currentTarget.style.color = C.mid; }}
            >← Back</button>
            <div style={{ flex: 1 }}><SubmitBtn loading={loading} disabled={!step2Valid} label="Submit Application" /></div>
          </div>
        </form>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// SUCCESS
// ─────────────────────────────────────────────
const SuccessState = ({ mode, onClose }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 0 8px", textAlign: "center", gap: "20px" }}>
    <div style={{ width: "72px", height: "72px", borderRadius: "50%", backgroundColor: C.accentLight, border: `2px solid ${C.primary}`, display: "flex", alignItems: "center", justifyContent: "center", animation: "auth-popIn 0.4s cubic-bezier(0.175,0.885,0.32,1.275) forwards" }}>
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
    </div>
    <div style={{ maxWidth: "300px" }}>
      <h3 style={{ fontSize: "22px", fontWeight: "700", color: C.primary, fontFamily: "Inter, sans-serif", margin: "0 0 10px 0", lineHeight: 1.2 }}>
        {mode === "request" ? "Application Received" : "Welcome back"}
      </h3>
      <p style={{ fontSize: "15px", color: C.mid, fontFamily: "Inter, sans-serif", lineHeight: "1.65", margin: 0 }}>
        {mode === "request"
          ? "Thank you for your interest. The BRIDGE team will review your application and reach out within 3–5 business days."
          : "You've been successfully signed in. Redirecting to your portal now…"
        }
      </p>
    </div>
    {mode === "request" && (
      <button onClick={onClose} style={{ padding: "13px 36px", borderRadius: "50px", border: "none", backgroundColor: C.primary, color: C.white, fontSize: "14px", fontWeight: "700", fontFamily: "Inter, sans-serif", cursor: "pointer", marginTop: "4px", transition: "background 0.2s ease" }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = C.primaryDark}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = C.primary}
      >Done</button>
    )}
  </div>
);

// ─────────────────────────────────────────────
// MAIN MODAL EXPORT
// ─────────────────────────────────────────────
export const BRIDGEAuthModal = ({ isOpen, onClose, defaultTab = "signin" }) => {
  const [tab,     setTab]     = useState(defaultTab);
  const [success, setSuccess] = useState(null);
  const [visible, setVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isOpen) { setSuccess(null); setTab(defaultTab); requestAnimationFrame(() => setVisible(true)); }
    else setVisible(false);
  }, [isOpen, defaultTab]);

  useEffect(() => {
    const fn = e => { if (e.key === "Escape") onClose(); };
    if (isOpen) document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen && !visible) return null;

  return (
    <>
      <style>{`
        @keyframes auth-spin   { to { transform: rotate(360deg); } }
        @keyframes auth-popIn  { from { opacity:0; transform: scale(0.5); } to { opacity:1; transform: scale(1); } }
        @keyframes auth-fadeIn { from { opacity:0; transform: translateY(6px); } to { opacity:1; transform: translateY(0); } }
        @keyframes auth-up     { from { opacity:0; transform: translateY(18px) scale(0.97); } to { opacity:1; transform: translateY(0) scale(1); } }
        @keyframes auth-slide  { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .auth-scroll::-webkit-scrollbar { display: none; }
        .auth-scroll { scrollbar-width: none; }
      `}</style>

      {/* Backdrop */}
      <div onClick={e => { if (e.target === e.currentTarget) onClose(); }}
        style={{ position: "fixed", inset: 0, zIndex: 2000, backgroundColor: "rgba(8,24,18,0.78)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", display: "flex", alignItems: isMobile ? "flex-end" : "center", justifyContent: "center", padding: isMobile ? 0 : "20px", opacity: visible ? 1 : 0, transition: "opacity 0.25s ease" }}>

        {/* Shell */}
        <div className="auth-scroll" style={{
          width: "100%", maxWidth: isMobile ? "100%" : "860px",
          maxHeight: isMobile ? "94vh" : "90vh", overflowY: "auto",
          borderRadius: isMobile ? "20px 20px 0 0" : "20px",
          boxShadow: "0 40px 100px rgba(0,0,0,0.35), 0 10px 30px rgba(0,0,0,0.2)",
          display: isMobile ? "block" : "grid",
          gridTemplateColumns: isMobile ? undefined : "2fr 3fr",
          overflow: "hidden",
          animation: visible ? (isMobile ? "auth-slide 0.35s cubic-bezier(0.32,0.72,0,1) forwards" : "auth-up 0.3s ease forwards") : "none",
        }}>
          {/* Left brand panel — hidden on mobile */}
          {!isMobile && !success && <BrandPanel tab={tab} />}

          {/* Right form panel */}
          <div className="auth-scroll" style={{ backgroundColor: C.white, overflowY: "auto", position: "relative" }}>
            {isMobile && (
              <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 4px" }}>
                <div style={{ width: "36px", height: "4px", borderRadius: "2px", backgroundColor: C.line }}/>
              </div>
            )}

            {/* Header row */}
            <div style={{ padding: isMobile ? "20px 24px 0" : "32px 36px 0", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              {isMobile ? <LogoDark /> : <div/>}
              <button onClick={onClose} style={{ background: "none", border: `1.5px solid ${C.line}`, borderRadius: "50%", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: C.faint, padding: 0, flexShrink: 0, transition: "all 0.2s ease" }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.bg; e.currentTarget.style.borderColor = C.primary; e.currentTarget.style.color = C.primary; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.borderColor = C.line; e.currentTarget.style.color = C.faint; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            {/* Tab switcher */}
            {!success && (
              <div style={{ padding: isMobile ? "16px 24px 0" : "20px 36px 0" }}>
                <div style={{ display: "flex", backgroundColor: C.bg, borderRadius: "12px", padding: "4px" }}>
                  {[{ key: "signin", label: "Sign In" }, { key: "request", label: "Request Access" }].map(t => (
                    <button key={t.key} onClick={() => setTab(t.key)} style={{
                      flex: 1, padding: "10px 12px", borderRadius: "9px", border: "none",
                      backgroundColor: tab === t.key ? C.white : "transparent",
                      color: tab === t.key ? C.primary : C.faint,
                      fontSize: "13px", fontWeight: tab === t.key ? "700" : "500",
                      fontFamily: "Inter, sans-serif", cursor: "pointer",
                      transition: "all 0.2s ease",
                      boxShadow: tab === t.key ? "0 2px 10px rgba(0,0,0,0.09)" : "none",
                    }}>{t.label}</button>
                  ))}
                </div>
              </div>
            )}

            {/* Body */}
            <div style={{ padding: isMobile ? "24px 24px 40px" : "28px 36px 40px" }}>
              {success ? (
                <SuccessState mode={success} onClose={onClose} />
              ) : tab === "signin" ? (
                <div style={{ animation: "auth-fadeIn 0.2s ease" }}>
                  <div style={{ marginBottom: "24px" }}>
                    <h2 style={{ fontSize: isMobile ? "22px" : "26px", fontWeight: "300", color: C.primary, fontFamily: "Inter, sans-serif", margin: "0 0 6px 0", lineHeight: 1.2 }}>
                      Welcome <span style={{ fontWeight: "700" }}>back</span>
                    </h2>
                    <p style={{ fontSize: "14px", color: C.faint, fontFamily: "Inter, sans-serif", margin: 0, lineHeight: 1.5 }}>Sign in to access your BRIDGE portal and documents.</p>
                  </div>
                  <SignInForm onSuccess={() => setSuccess("signin")} onForgot={() => {}} />
                  <p style={{ marginTop: "22px", textAlign: "center", fontSize: "13px", color: C.faint, fontFamily: "Inter, sans-serif" }}>
                    Don't have access yet?{" "}
                    <button type="button" onClick={() => setTab("request")} style={{ background: "none", border: "none", cursor: "pointer", color: C.primary, fontWeight: "700", fontSize: "13px", fontFamily: "Inter, sans-serif", padding: 0 }}>
                      Request Access →
                    </button>
                  </p>
                </div>
              ) : (
                <div style={{ animation: "auth-fadeIn 0.2s ease" }}>
                  <div style={{ marginBottom: "24px" }}>
                    <h2 style={{ fontSize: isMobile ? "20px" : "24px", fontWeight: "300", color: C.primary, fontFamily: "Inter, sans-serif", margin: "0 0 6px 0", lineHeight: 1.25 }}>
                      Access the full <span style={{ fontWeight: "700" }}>BRIDGE</span> research <span style={{ fontWeight: "700" }}>library</span>
                    </h2>
                    <p style={{ fontSize: "14px", color: C.faint, fontFamily: "Inter, sans-serif", margin: 0, lineHeight: 1.5 }}>
                      12 sector analyses, white papers, investment summaries, and government alignment documentation.
                    </p>
                  </div>
                  <RequestAccessForm onSuccess={() => setSuccess("request")} isMobile={isMobile} />
                  <p style={{ marginTop: "22px", textAlign: "center", fontSize: "13px", color: C.faint, fontFamily: "Inter, sans-serif" }}>
                    Already have access?{" "}
                    <button type="button" onClick={() => setTab("signin")} style={{ background: "none", border: "none", cursor: "pointer", color: C.primary, fontWeight: "700", fontSize: "13px", fontFamily: "Inter, sans-serif", padding: 0 }}>
                      Sign In →
                    </button>
                  </p>
                </div>
              )}
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
export default function BRIDGEAuthDemo() {
  const [open, setOpen] = useState(false);
  const [tab,  setTab]  = useState("signin");
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f2e24 0%, #1B4D3E 60%, #163829 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "20px", fontFamily: "Inter, sans-serif" }}>
      <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", letterSpacing: "2.5px", textTransform: "uppercase" }}>BRIDGE PBC — Auth Modal</p>
      <div style={{ display: "flex", gap: "12px" }}>
        <button onClick={() => { setTab("signin"); setOpen(true); }} style={{ padding: "14px 32px", borderRadius: "50px", border: "1.5px solid rgba(255,255,255,0.2)", backgroundColor: "transparent", color: "#fff", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>Sign In</button>
        <button onClick={() => { setTab("request"); setOpen(true); }} style={{ padding: "14px 32px", borderRadius: "50px", border: "none", backgroundColor: C.accent, color: C.primary, fontSize: "14px", fontWeight: "700", cursor: "pointer" }}>Request Access →</button>
      </div>
      <BRIDGEAuthModal isOpen={open} onClose={() => setOpen(false)} defaultTab={tab} />
    </div>
  );
}
