import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { colors } from "@/lib/theme";

// ============================================================
// MOBILE HOOK
// ============================================================
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= 480 : false
  );
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth <= 480);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return isMobile;
};

// ============================================================
// BRIDGE LOGO (dark variant)
// ============================================================
const BridgeLogo = ({ height = 36 }: { height?: number }) => (
  <svg height={height} viewBox="0 0 3434.33 932.3" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
    <g>
      <path fill="#b8d935" d="M2070.26,927.95c-.2.2-.5.4-.7.5h-.3l1-.5Z" />
      <path fill="#0fea68" d="M2070.26,927.95c-.2.2-.5.4-.7.5h-.3l1-.5Z" />
      <path fill="#1b4d3e" d="M1853.06,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9h0ZM1894.56,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1v.1Z" />
      <path fill="#1b4d3e" stroke="#000" strokeWidth=".5" strokeMiterlimit="10" d="M1431.68,224.45h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.05c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5l.1.1h0Z" />
      <path fill="#1b4d3e" stroke="#000" strokeWidth=".5" strokeMiterlimit="10" d="M1488.08,578.65v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z" />
      <rect fill="#b8d935" x="1427.38" y="17.35" width="205.2" height="145" />
      <rect fill="#1b4d3e" x="1427.48" y="221.75" width="205.2" height="693.2" rx="9.6" ry="9.6" />
      <path fill="#1b4d3e" d="M2757.31,19.09h491.3c5.42,0,9.82,4.4,9.82,9.82v218.7c0,5.42-4.4,9.82-9.82,9.82h-507.36c-56.98,0-108.53,23.02-145.87,60.35-37.34,37.23-60.45,88.79-60.45,145.66,0,113.75,92.37,206.01,206.32,206.01h12.89c2.86,0,5.11,2.25,5.11,5.11v236.7c0,1.13-.92,1.94-1.94,1.94h0c-242.22,0-438.52-195.99-438.52-437.8v-18.51c0-241.81,196.29-437.8,438.52-437.8h0Z" />
      <rect fill="#1b4d3e" x="2812.75" y="339.47" width="216.75" height="572.62" rx="9.6" ry="9.6" />
      <rect fill="#b8d935" x="3083.41" y="339.47" width="175.12" height="257.67" />
      <rect fill="#b8d935" x="3083.41" y="654.42" width="175.12" height="257.67" />
      <circle fill="none" stroke="#191919" strokeWidth="5" strokeMiterlimit="10" cx="3385.56" cy="866.94" r="46.27" />
      <path fill="#191919" d="M3404.8,889.32l-10.31-14.71c.25,0,.38-.13.63-.25,2.89-1.26,5.03-3.02,6.54-5.41s2.26-5.15,2.26-8.55c0-5.03-1.76-8.93-5.16-11.82s-8.05-4.27-14.08-4.27h-18.36v44.89h8.3v-13.08h11.94l9.18,13.08h8.93l.13.13h0ZM3392.85,853.74c1.89,1.51,2.77,3.77,2.77,6.66s-.88,5.03-2.77,6.66-4.65,2.39-8.3,2.39h-9.81v-17.85h9.81c3.65,0,6.41.75,8.3,2.26h0v-.13h0Z" />
      <rect fill="none" stroke="#1b4d3e" strokeWidth="80" strokeMiterlimit="10" x="40" y="40" width="843.91" height="852.3" rx="36.55" ry="36.55" />
      <polygon fill="#b8d935" stroke="#1b4d3e" strokeMiterlimit="10" points="722.6 322.13 462.28 452.8 201.97 322.75 461.21 192.52 722.6 322.13" />
      <path fill="#1b4d3e" d="M197.84,426.78c3.86-.53,7.04.85,10.74,1.41l252.53,125.67c84.54-40,167.66-83.83,251.89-124.84,33.14-11.49,50.09,34.15,18.55,49.11l-259.23,129.08c-10.18,3.72-14.14,2.57-23.85-1.31l-264.23-132.98c-17.04-14.4-7.96-43.2,13.61-46.14h0Z" />
      <path fill="#b8d935" d="M195.25,558c3.65-.63,7.4-.4,11.08-.22,86.11,40.47,170.4,85.05,255.95,126.78l252.92-126c29.53-7.22,45.44,28.67,22.29,46.49l-270.42,134.42-8.62.31c-91.6-42.21-181.07-89.86-271.7-134.42-18.72-12.06-13.3-43.58,8.5-47.37h0Z" />
    </g>
  </svg>
);

// ============================================================
// FIELD COMPONENT
// ============================================================
interface FieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  hint?: string;
}

const Field = ({ label, type = "text", placeholder, value, onChange, required, hint }: FieldProps) => {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label style={{ fontSize: "13px", fontWeight: "600", color: colors.dark, fontFamily: "Inter, sans-serif" }}>
        {label}{required && <span style={{ color: colors.primary, marginLeft: "2px" }}>*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        style={{
          padding: "12px 16px",
          borderRadius: "10px",
          border: `1.5px solid ${focused ? colors.primary : colors.line}`,
          backgroundColor: focused ? colors.white : colors.background,
          fontSize: "15px",
          fontFamily: "Inter, sans-serif",
          color: colors.dark,
          outline: "none",
          transition: "all 0.2s ease",
          boxSizing: "border-box" as const,
          width: "100%",
        }}
      />
      {hint && (
        <span style={{ fontSize: "12px", color: "#999", fontFamily: "Inter, sans-serif" }}>{hint}</span>
      )}
    </div>
  );
};

// ============================================================
// SELECT COMPONENT
// ============================================================
interface SelectOption { value: string; label: string; }
interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  required?: boolean;
}

const SelectField = ({ label, value, onChange, options, required }: SelectFieldProps) => {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label style={{ fontSize: "13px", fontWeight: "600", color: colors.dark, fontFamily: "Inter, sans-serif" }}>
        {label}{required && <span style={{ color: colors.primary, marginLeft: "2px" }}>*</span>}
      </label>
      <select
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        style={{
          padding: "12px 16px",
          borderRadius: "10px",
          border: `1.5px solid ${focused ? colors.primary : colors.line}`,
          backgroundColor: focused ? colors.white : colors.background,
          fontSize: "15px",
          fontFamily: "Inter, sans-serif",
          color: value ? colors.dark : "#999",
          outline: "none",
          transition: "all 0.2s ease",
          cursor: "pointer",
          appearance: "none" as const,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%231B4D3E' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 14px center",
          paddingRight: "40px",
          width: "100%",
          boxSizing: "border-box" as const,
        }}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
};

// ============================================================
// TEXTAREA COMPONENT
// ============================================================
interface TextareaFieldProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
}

const TextareaField = ({ label, placeholder, value, onChange, required }: TextareaFieldProps) => {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label style={{ fontSize: "13px", fontWeight: "600", color: colors.dark, fontFamily: "Inter, sans-serif" }}>
        {label}{required && <span style={{ color: colors.primary, marginLeft: "2px" }}>*</span>}
      </label>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={3}
        required={required}
        style={{
          padding: "12px 16px",
          borderRadius: "10px",
          border: `1.5px solid ${focused ? colors.primary : colors.line}`,
          backgroundColor: focused ? colors.white : colors.background,
          fontSize: "15px",
          fontFamily: "Inter, sans-serif",
          color: colors.dark,
          outline: "none",
          transition: "all 0.2s ease",
          resize: "vertical" as const,
          minHeight: "88px",
          boxSizing: "border-box" as const,
          width: "100%",
          lineHeight: "1.5",
        }}
      />
    </div>
  );
};

// ============================================================
// SIGN IN FORM
// ============================================================
interface SignInFormProps {
  onSuccess?: () => void;
  onForgot?: () => void;
}

const SignInForm = ({ onSuccess, onForgot }: SignInFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [btnHover, setBtnHover] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); onSuccess && onSuccess(); }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Field
        label="Email Address" type="email" placeholder="your@email.com"
        value={email} onChange={e => setEmail(e.target.value)} required
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <label style={{ fontSize: "13px", fontWeight: "600", color: colors.dark, fontFamily: "Inter, sans-serif" }}>
            Password <span style={{ color: colors.primary }}>*</span>
          </label>
          <button
            type="button"
            onClick={onForgot}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: colors.primary, fontWeight: "600", fontSize: "12px",
              fontFamily: "Inter, sans-serif", padding: 0, textDecoration: "underline",
            }}
          >
            Forgot password?
          </button>
        </div>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{
            padding: "12px 16px", borderRadius: "10px",
            border: `1.5px solid ${colors.line}`, backgroundColor: colors.background,
            fontSize: "15px", fontFamily: "Inter, sans-serif", color: colors.dark,
            outline: "none", boxSizing: "border-box" as const, width: "100%",
          }}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        onMouseEnter={() => setBtnHover(true)}
        onMouseLeave={() => setBtnHover(false)}
        style={{
          marginTop: "4px",
          padding: "15px 32px",
          borderRadius: "50px",
          border: "none",
          backgroundColor: loading ? "#ccc" : (btnHover ? "#163f32" : colors.primary),
          color: colors.white,
          fontSize: "15px",
          fontWeight: "600",
          fontFamily: "Inter, sans-serif",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "all 0.2s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          width: "100%",
        }}
      >
        {loading ? (
          <>
            <span style={{
              width: "16px", height: "16px", borderRadius: "50%",
              border: "2px solid rgba(255,255,255,0.3)",
              borderTopColor: colors.white,
              animation: "bridge-spin 0.7s linear infinite",
              display: "inline-block",
            }} />
            Signing in…
          </>
        ) : (
          <>
            Sign In
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
};

// ============================================================
// REQUEST ACCESS FORM
// ============================================================
interface RequestAccessFormProps {
  onSuccess?: (mode: string) => void;
  isMobile: boolean;
}

const countryOptions: SelectOption[] = [
  { value: "", label: "Select country…" },
  { value: "gh", label: "Ghana" },
  { value: "ng", label: "Nigeria" },
  { value: "ke", label: "Kenya" },
  { value: "za", label: "South Africa" },
  { value: "us", label: "United States" },
  { value: "gb", label: "United Kingdom" },
  { value: "other", label: "Other" },
];

const roleOptions: SelectOption[] = [
  { value: "", label: "Select role…" },
  { value: "investor", label: "Investor / Fund Manager" },
  { value: "government", label: "Government / Policy" },
  { value: "ngo", label: "NGO / Development" },
  { value: "entrepreneur", label: "Entrepreneur / Founder" },
  { value: "researcher", label: "Researcher / Academic" },
  { value: "other", label: "Other" },
];

const interestOptions: SelectOption[] = [
  { value: "", label: "Select primary interest…" },
  { value: "investment", label: "Investment opportunities" },
  { value: "policy", label: "Policy & governance research" },
  { value: "partnership", label: "Partnership & collaboration" },
  { value: "data", label: "Market data & analytics" },
  { value: "implementation", label: "Implementation support" },
  { value: "other", label: "Other" },
];

const connectionOptions: SelectOption[] = [
  { value: "", label: "How did you hear about BRIDGE?" },
  { value: "referral", label: "Referred by someone" },
  { value: "event", label: "Event or conference" },
  { value: "social", label: "Social media" },
  { value: "search", label: "Web search" },
  { value: "press", label: "Press / media" },
  { value: "other", label: "Other" },
];

interface RequestFormState {
  name: string;
  email: string;
  country: string;
  organization: string;
  role: string;
  primaryInterest: string;
  connection: string;
  description: string;
  consent: boolean;
}

const RequestAccessForm = ({ onSuccess, isMobile }: RequestAccessFormProps) => {
  const [form, setForm] = useState<RequestFormState>({
    name: "", email: "", country: "", organization: "",
    role: "", primaryInterest: "", connection: "", description: "", consent: false,
  });
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [btnHover, setBtnHover] = useState(false);

  const set = (key: keyof RequestFormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); onSuccess && onSuccess("request"); }, 1800);
  };

  const step1Valid = form.name && form.email && form.country;
  const step2Valid = form.primaryInterest && form.connection && form.consent;

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

      {/* Step Indicator */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "4px" }}>
        {[1, 2].map(n => (
          <React.Fragment key={n}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
              <div style={{
                width: "28px", height: "28px", borderRadius: "50%",
                backgroundColor: step >= n ? colors.primary : colors.line,
                border: `2px solid ${step >= n ? colors.primary : colors.line}`,
                color: step >= n ? colors.white : "#999",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "12px", fontWeight: "700", fontFamily: "Inter, sans-serif",
                transition: "all 0.3s ease",
              }}>
                {step > n ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                ) : n}
              </div>
              <span style={{ fontSize: "11px", color: step >= n ? colors.primary : "#999", fontFamily: "Inter, sans-serif", fontWeight: step >= n ? "600" : "400" }}>
                {n === 1 ? "Your Details" : "Your Interest"}
              </span>
            </div>
            {n < 2 && (
              <div style={{ width: "48px", height: "2px", backgroundColor: step > 1 ? colors.primary : colors.line, margin: "0 4px", marginBottom: "20px", transition: "background-color 0.3s ease" }} />
            )}
          </React.Fragment>
        ))}
      </div>

      {step === 1 && (
        <>
          <Field label="Full Name" placeholder="Your full name" value={form.name} onChange={set("name")} required />
          <Field label="Email Address" type="email" placeholder="your@email.com" value={form.email} onChange={set("email")} required />

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "16px" }}>
            <SelectField label="Country" value={form.country} onChange={set("country")} options={countryOptions} required />
            <Field label="Organization" placeholder="Your org or company" value={form.organization} onChange={set("organization")} />
          </div>

          <SelectField label="Your Role" value={form.role} onChange={set("role")} options={roleOptions} />

          <button
            type="button"
            disabled={!step1Valid}
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
            onClick={() => setStep(2)}
            style={{
              marginTop: "4px",
              padding: "14px 32px",
              borderRadius: "50px", border: "none",
              backgroundColor: step1Valid ? (btnHover ? "#163f32" : colors.primary) : "#ccc",
              color: colors.white,
              fontSize: "15px", fontWeight: "600", fontFamily: "Inter, sans-serif",
              cursor: step1Valid ? "pointer" : "not-allowed",
              transition: "all 0.2s ease",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
              width: "100%",
            }}
          >
            Continue
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <SelectField label="Primary Interest" value={form.primaryInterest} onChange={set("primaryInterest")} options={interestOptions} required />
          <SelectField label="How did you hear about BRIDGE?" value={form.connection} onChange={set("connection")} options={connectionOptions} required />
          <TextareaField label="Anything else you'd like to share?" placeholder="Optional context about your work or interest…" value={form.description} onChange={set("description")} />

          {/* Consent */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
            <div
              role="checkbox"
              aria-checked={form.consent}
              tabIndex={0}
              onClick={() => setForm(f => ({ ...f, consent: !f.consent }))}
              onKeyDown={e => { if (e.key === " " || e.key === "Enter") setForm(f => ({ ...f, consent: !f.consent })); }}
              style={{
                width: "18px", height: "18px", minWidth: "18px",
                borderRadius: "5px", marginTop: "1px",
                border: `2px solid ${form.consent ? colors.primary : colors.line}`,
                backgroundColor: form.consent ? colors.primary : colors.white,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s ease", cursor: "pointer",
              }}
            >
              {form.consent && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              )}
            </div>
            <span style={{ fontSize: "13px", color: "#555", fontFamily: "Inter, sans-serif", lineHeight: "1.5" }}>
              I agree to receive communications from BRIDGE PBC and understand that access is subject to team review and approval.
            </span>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <button
              type="button"
              onClick={() => setStep(1)}
              style={{
                flex: "0 0 auto",
                padding: "14px 20px",
                borderRadius: "50px",
                border: `1.5px solid ${colors.line}`,
                backgroundColor: "transparent",
                color: colors.primary,
                fontSize: "14px", fontWeight: "600", fontFamily: "Inter, sans-serif",
                cursor: "pointer", transition: "all 0.2s ease",
              }}
            >
              ← Back
            </button>
            <button
              type="submit"
              disabled={!step2Valid || loading}
              onMouseEnter={() => setBtnHover(true)}
              onMouseLeave={() => setBtnHover(false)}
              style={{
                flex: 1,
                padding: "14px 24px",
                borderRadius: "50px", border: "none",
                backgroundColor: (!step2Valid || loading) ? "#ccc" : (btnHover ? "#163f32" : colors.primary),
                color: colors.white,
                fontSize: "15px", fontWeight: "600", fontFamily: "Inter, sans-serif",
                cursor: (!step2Valid || loading) ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
              }}
            >
              {loading ? (
                <>
                  <span style={{
                    width: "16px", height: "16px", borderRadius: "50%",
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTopColor: colors.white,
                    animation: "bridge-spin 0.7s linear infinite",
                    display: "inline-block",
                  }} />
                  Submitting…
                </>
              ) : (
                <>
                  Submit Application
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </>
      )}
    </form>
  );
};

// ============================================================
// SUCCESS STATE
// ============================================================
interface SuccessStateProps {
  mode: string | null;
  onClose: () => void;
}

const SuccessState = ({ mode, onClose }: SuccessStateProps) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px", padding: "16px 0 8px" }}>
    <div style={{
      width: "72px", height: "72px", borderRadius: "50%",
      backgroundColor: colors.accentLight,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2.5">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </div>

    <div style={{ textAlign: "center" as const, display: "flex", flexDirection: "column", gap: "10px" }}>
      <h2 style={{ fontSize: "22px", fontWeight: "700", color: colors.dark, fontFamily: "Inter, sans-serif", margin: 0 }}>
        {mode === "request" ? "Application Received" : "Welcome back"}
      </h2>
      <p style={{ fontSize: "14px", color: "#555", fontFamily: "Inter, sans-serif", lineHeight: "1.6", margin: 0, maxWidth: "320px" }}>
        {mode === "request"
          ? "Thank you for your interest. The BRIDGE team will review your application and reach out within 3–5 business days."
          : "You've been successfully signed in. Redirecting to your portal…"
        }
      </p>
    </div>

    {mode === "request" && (
      <button
        onClick={onClose}
        style={{
          padding: "13px 40px", borderRadius: "50px", border: "none",
          backgroundColor: colors.primary, color: colors.white,
          fontSize: "15px", fontWeight: "600", fontFamily: "Inter, sans-serif",
          cursor: "pointer", marginTop: "4px",
        }}
      >
        Done
      </button>
    )}
  </div>
);

// ============================================================
// MAIN MODAL COMPONENT
// ============================================================
export interface BRIDGEAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "signin" | "request";
  onSignInSuccess?: () => void;
}

export const BRIDGEAuthModal = ({ isOpen, onClose, defaultTab = "signin", onSignInSuccess }: BRIDGEAuthModalProps) => {
  const [tab, setTab] = useState<"signin" | "request">(defaultTab);
  const [success, setSuccess] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const isMobile = useIsMobile();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setSuccess(null);
      setTab(defaultTab);
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [isOpen, defaultTab]);

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen && !visible) return null;

  const hPad = isMobile ? "20px" : "32px";

  return (
    <>
      <style>{`
        @keyframes bridge-spin { to { transform: rotate(360deg); } }
        @keyframes bridge-modalIn { from { opacity: 0; transform: translateY(16px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes bridge-slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes bridge-slideDown { from { transform: translateY(0); } to { transform: translateY(100%); } }
        .bridge-hide-scrollbar::-webkit-scrollbar { display: none; }
        .bridge-hide-scrollbar { scrollbar-width: none; }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={handleBackdrop}
        style={{
          position: "fixed", inset: 0, zIndex: 9998,
          backgroundColor: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: isMobile ? "flex-end" : "center",
          justifyContent: "center",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.25s ease",
        }}
      >
        {/* Modal Panel */}
        <div
          ref={modalRef}
          className="bridge-hide-scrollbar"
          style={{
            position: "relative",
            backgroundColor: colors.white,
            width: isMobile ? "100%" : "480px",
            maxHeight: isMobile ? "92vh" : "90vh",
            overflowY: "auto",
            borderRadius: isMobile ? "20px 20px 0 0" : "20px",
            boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
            animation: visible
              ? (isMobile ? "bridge-slideUp 0.35s cubic-bezier(0.32,0.72,0,1)" : "bridge-modalIn 0.3s cubic-bezier(0.32,0.72,0,1)")
              : "none",
          }}
        >
          {/* Drag handle on mobile */}
          {isMobile && (
            <div style={{ display: "flex", justifyContent: "center", paddingTop: "12px", paddingBottom: "4px" }}>
              <div style={{ width: "36px", height: "4px", borderRadius: "2px", backgroundColor: colors.line }} />
            </div>
          )}

          {/* Header */}
          <div style={{
            display: "flex", flexDirection: "column", gap: "16px",
            padding: `20px ${hPad} 0`,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <BridgeLogo height={isMobile ? 28 : 34} />
              <button
                onClick={onClose}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = colors.background;
                  (e.currentTarget as HTMLButtonElement).style.borderColor = colors.primary;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = colors.line;
                }}
                style={{
                  width: "34px", height: "34px", borderRadius: "50%",
                  border: `1.5px solid ${colors.line}`, backgroundColor: "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", transition: "all 0.2s ease", flexShrink: 0,
                }}
              >
                <X size={16} color={colors.dark} />
              </button>
            </div>

            {/* Tab Bar */}
            {!success && (
              <div style={{
                display: "flex", gap: "4px",
                backgroundColor: colors.background,
                borderRadius: "12px", padding: "4px",
              }}>
                {([
                  { key: "signin" as const, label: "Sign In" },
                  { key: "request" as const, label: "Request Access" },
                ]).map(t => (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setTab(t.key)}
                    style={{
                      flex: 1, padding: isMobile ? "10px 8px" : "10px 16px",
                      borderRadius: "9px", border: "none",
                      backgroundColor: tab === t.key ? colors.white : "transparent",
                      color: tab === t.key ? colors.primary : "#999",
                      fontSize: isMobile ? "13px" : "14px",
                      fontWeight: tab === t.key ? "700" : "500",
                      fontFamily: "Inter, sans-serif",
                      cursor: "pointer", transition: "all 0.2s ease",
                      boxShadow: tab === t.key ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
                      whiteSpace: "nowrap" as const,
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Body */}
          <div style={{ padding: `24px ${hPad} 32px` }}>
            {success ? (
              <SuccessState mode={success} onClose={onClose} />
            ) : tab === "signin" ? (
              <>
                <div style={{ marginBottom: "24px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <h2 style={{ fontSize: "22px", fontWeight: "700", color: colors.dark, fontFamily: "Inter, sans-serif", margin: 0 }}>
                    Welcome back
                  </h2>
                  <p style={{ fontSize: "14px", color: "#666", fontFamily: "Inter, sans-serif", margin: 0 }}>
                    Sign in to access your BRIDGE portal and documents.
                  </p>
                </div>

                <SignInForm onSuccess={() => { onSignInSuccess?.(); setSuccess("signin"); }} onForgot={() => {}} />

                <p style={{ textAlign: "center" as const, fontSize: "13px", color: "#666", fontFamily: "Inter, sans-serif", marginTop: "20px" }}>
                  Don't have access yet?{" "}
                  <button
                    type="button"
                    onClick={() => setTab("request")}
                    style={{
                      background: "none", border: "none", cursor: "pointer",
                      color: colors.primary, fontWeight: "600", fontSize: "13px",
                      fontFamily: "Inter, sans-serif", padding: 0, textDecoration: "underline",
                    }}
                  >
                    Request Access →
                  </button>
                </p>
              </>
            ) : (
              <>
                <div style={{ marginBottom: "24px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <h2 style={{ fontSize: "22px", fontWeight: "700", color: colors.dark, fontFamily: "Inter, sans-serif", margin: 0 }}>
                    Access the full BRIDGE research{" "}
                    <span style={{ color: colors.primary }}>library</span>
                  </h2>
                  <p style={{ fontSize: "14px", color: "#666", fontFamily: "Inter, sans-serif", margin: 0 }}>
                    Complete 12 sector analyses, white papers, investment summaries, and government alignment documentation.
                  </p>
                </div>

                <RequestAccessForm onSuccess={(mode) => setSuccess(mode)} isMobile={isMobile} />

                <p style={{ textAlign: "center" as const, fontSize: "13px", color: "#666", fontFamily: "Inter, sans-serif", marginTop: "20px" }}>
                  Already have access?{" "}
                  <button
                    type="button"
                    onClick={() => setTab("signin")}
                    style={{
                      background: "none", border: "none", cursor: "pointer",
                      color: colors.primary, fontWeight: "600", fontSize: "13px",
                      fontFamily: "Inter, sans-serif", padding: 0, textDecoration: "underline",
                    }}
                  >
                    Sign In →
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BRIDGEAuthModal;
