import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { colors } from "@/lib/theme";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { BridgeLogo } from "@/components/BridgeLogo";

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
  const [error, setError] = useState<string | null>(null);
  const [btnHover, setBtnHover] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
      onSuccess?.();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      if (message.includes("Invalid login")) {
        setError("Invalid email or password. Please try again.");
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {error && (
        <div style={{
          padding: "12px 16px", borderRadius: "10px",
          backgroundColor: "#fef2f2", border: "1px solid #fecaca",
          color: "#991b1b", fontSize: "13px", fontFamily: "Inter, sans-serif",
          lineHeight: "1.5",
        }}>
          {error}
        </div>
      )}

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
          minLength={6}
          style={{
            padding: "12px 16px", borderRadius: "10px",
            border: `1.5px solid ${colors.line}`, backgroundColor: colors.background,
            fontSize: "15px", fontFamily: "Inter, sans-serif", color: colors.dark,
            outline: "none", boxSizing: "border-box" as const, width: "100%",
          }}
        />
        <span style={{ fontSize: "12px", color: "#999", fontFamily: "Inter, sans-serif" }}>
          Minimum 6 characters
        </span>
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
// FORGOT PASSWORD FORM
// ============================================================
interface ForgotPasswordFormProps {
  onBack: () => void;
}

const ForgotPasswordForm = ({ onBack }: ForgotPasswordFormProps) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [btnHover, setBtnHover] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login`,
      });
      if (error) throw error;
      setSent(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", padding: "16px 0 8px" }}>
        <div style={{
          width: "72px", height: "72px", borderRadius: "50%",
          backgroundColor: colors.accentLight,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </div>
        <div style={{ textAlign: "center" as const, display: "flex", flexDirection: "column", gap: "10px" }}>
          <h2 style={{ fontSize: "22px", fontWeight: "700", color: colors.dark, fontFamily: "Inter, sans-serif", margin: 0 }}>
            Check your email
          </h2>
          <p style={{ fontSize: "14px", color: "#555", fontFamily: "Inter, sans-serif", lineHeight: "1.6", margin: 0, maxWidth: "320px" }}>
            If an account exists for <strong>{email}</strong>, we've sent a password reset link. Please check your inbox and spam folder.
          </p>
        </div>
        <button
          onClick={onBack}
          style={{
            padding: "13px 40px", borderRadius: "50px", border: "none",
            backgroundColor: colors.primary, color: colors.white,
            fontSize: "15px", fontWeight: "600", fontFamily: "Inter, sans-serif",
            cursor: "pointer", marginTop: "4px",
          }}
        >
          Back to Sign In
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "4px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "700", color: colors.dark, fontFamily: "Inter, sans-serif", margin: 0 }}>
          Reset your password
        </h2>
        <p style={{ fontSize: "14px", color: "#666", fontFamily: "Inter, sans-serif", margin: 0 }}>
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      {error && (
        <div style={{
          padding: "12px 16px", borderRadius: "10px",
          backgroundColor: "#fef2f2", border: "1px solid #fecaca",
          color: "#991b1b", fontSize: "13px", fontFamily: "Inter, sans-serif",
          lineHeight: "1.5",
        }}>
          {error}
        </div>
      )}

      <Field
        label="Email Address" type="email" placeholder="your@email.com"
        value={email} onChange={e => setEmail(e.target.value)} required
      />

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
            Sending…
          </>
        ) : "Send Reset Link"}
      </button>

      <button
        type="button"
        onClick={onBack}
        style={{
          background: "none", border: "none", cursor: "pointer",
          color: colors.primary, fontWeight: "600", fontSize: "13px",
          fontFamily: "Inter, sans-serif", padding: 0, textDecoration: "underline",
          textAlign: "center" as const,
        }}
      >
        ← Back to Sign In
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

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { error } = await supabase.from("access_requests").insert({
        name: form.name,
        email: form.email,
        country: form.country,
        organization: form.organization || null,
        role: form.role || null,
        primary_interest: form.primaryInterest,
        connection: form.connection,
        description: form.description || null,
      });
      if (error) throw error;
      onSuccess?.("request");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const step1Valid = form.name && form.email && form.country;
  const step2Valid = form.primaryInterest && form.connection && form.consent;

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {error && (
        <div style={{
          padding: "12px 16px", borderRadius: "10px",
          backgroundColor: "#fef2f2", border: "1px solid #fecaca",
          color: "#991b1b", fontSize: "13px", fontFamily: "Inter, sans-serif",
          lineHeight: "1.5",
        }}>
          {error}
        </div>
      )}

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
  const [showForgot, setShowForgot] = useState(false);
  const [visible, setVisible] = useState(false);
  const isMobile = useIsMobile();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setSuccess(null);
      setShowForgot(false);
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
            {!success && !showForgot && (
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
            ) : showForgot ? (
              <ForgotPasswordForm onBack={() => setShowForgot(false)} />
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

                <SignInForm onSuccess={() => { onSignInSuccess?.(); setSuccess("signin"); }} onForgot={() => setShowForgot(true)} />

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
