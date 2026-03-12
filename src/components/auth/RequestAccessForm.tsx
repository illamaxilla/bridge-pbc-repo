import React, { useState } from "react";
import { colors } from "@/lib/theme";
import { supabase } from "@/integrations/supabase/client";
import { Field, SelectField, TextareaField } from "./FormField";
import type { SelectOption } from "./FormField";

// ============================================================
// REQUEST ACCESS FORM
// ============================================================
export interface RequestAccessFormProps {
  onSuccess?: (mode: string) => void;
  isMobile: boolean;
}

export const countryOptions: SelectOption[] = [
  { value: "", label: "Select country…" },
  { value: "gh", label: "Ghana" },
  { value: "ng", label: "Nigeria" },
  { value: "ke", label: "Kenya" },
  { value: "za", label: "South Africa" },
  { value: "us", label: "United States" },
  { value: "gb", label: "United Kingdom" },
  { value: "other", label: "Other" },
];

export const roleOptions: SelectOption[] = [
  { value: "", label: "Select role…" },
  { value: "investor", label: "Investor / Fund Manager" },
  { value: "government", label: "Government / Policy" },
  { value: "ngo", label: "NGO / Development" },
  { value: "entrepreneur", label: "Entrepreneur / Founder" },
  { value: "researcher", label: "Researcher / Academic" },
  { value: "other", label: "Other" },
];

export const interestOptions: SelectOption[] = [
  { value: "", label: "Select primary interest…" },
  { value: "investment", label: "Investment opportunities" },
  { value: "policy", label: "Policy & governance research" },
  { value: "partnership", label: "Partnership & collaboration" },
  { value: "data", label: "Market data & analytics" },
  { value: "implementation", label: "Implementation support" },
  { value: "other", label: "Other" },
];

export const connectionOptions: SelectOption[] = [
  { value: "", label: "How did you hear about BRIDGE?" },
  { value: "referral", label: "Referred by someone" },
  { value: "event", label: "Event or conference" },
  { value: "social", label: "Social media" },
  { value: "search", label: "Web search" },
  { value: "press", label: "Press / media" },
  { value: "other", label: "Other" },
];

export interface RequestFormState {
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

export const RequestAccessForm = ({ onSuccess, isMobile }: RequestAccessFormProps) => {
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
