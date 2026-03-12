import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { colors } from "@/lib/theme";
import { supabase } from "@/integrations/supabase/client";
import { Field, SelectField, TextareaField } from "./FormField";
import type { SelectOption } from "./FormField";

// ============================================================
// REQUEST ACCESS FORM
// ============================================================

const requestAccessSchema = z.object({
  // Step 1
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  country: z.string().min(1, "Country is required"),
  organization: z.string().optional(),
  role: z.string().optional(),
  // Step 2
  primaryInterest: z.string().min(1, "Primary interest is required"),
  connection: z.string().min(1, "This field is required"),
  description: z.string().optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "You must agree to continue" }) }),
});

type RequestAccessFormData = z.infer<typeof requestAccessSchema>;

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
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { control, handleSubmit, formState: { errors }, trigger, watch } = useForm<RequestAccessFormData>({
    resolver: zodResolver(requestAccessSchema),
    defaultValues: {
      name: "", email: "", country: "", organization: "",
      role: "", primaryInterest: "", connection: "", description: "", consent: false as unknown as true,
    },
  });

  const watchedValues = watch();

  const step1Valid = watchedValues.name && watchedValues.email && watchedValues.country;
  const step2Valid = watchedValues.primaryInterest && watchedValues.connection && watchedValues.consent;

  const handleStep1Continue = async () => {
    const valid = await trigger(["name", "email", "country"]);
    if (valid) setStep(2);
  };

  const onSubmit = async (data: RequestAccessFormData) => {
    setError(null);
    setLoading(true);
    try {
      const { error } = await supabase.from("access_requests").insert({
        name: data.name,
        email: data.email,
        country: data.country,
        organization: data.organization || null,
        role: data.role || null,
        primary_interest: data.primaryInterest,
        connection: data.connection,
        description: data.description || null,
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
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
          <div>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Field label="Full Name" placeholder="Your full name" value={field.value} onChange={field.onChange} required />
              )}
            />
            {errors.name && (
              <span style={{ fontSize: "12px", color: "#dc2626", fontFamily: "Inter, sans-serif", marginTop: "4px", display: "block" }}>
                {errors.name.message}
              </span>
            )}
          </div>
          <div>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Field label="Email Address" type="email" placeholder="your@email.com" value={field.value} onChange={field.onChange} required />
              )}
            />
            {errors.email && (
              <span style={{ fontSize: "12px", color: "#dc2626", fontFamily: "Inter, sans-serif", marginTop: "4px", display: "block" }}>
                {errors.email.message}
              </span>
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "16px" }}>
            <div>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <SelectField label="Country" value={field.value} onChange={field.onChange} options={countryOptions} required />
                )}
              />
              {errors.country && (
                <span style={{ fontSize: "12px", color: "#dc2626", fontFamily: "Inter, sans-serif", marginTop: "4px", display: "block" }}>
                  {errors.country.message}
                </span>
              )}
            </div>
            <Controller
              name="organization"
              control={control}
              render={({ field }) => (
                <Field label="Organization" placeholder="Your org or company" value={field.value ?? ""} onChange={field.onChange} />
              )}
            />
          </div>

          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <SelectField label="Your Role" value={field.value ?? ""} onChange={field.onChange} options={roleOptions} />
            )}
          />

          <button
            type="button"
            disabled={!step1Valid}
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
            onClick={handleStep1Continue}
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
          <div>
            <Controller
              name="primaryInterest"
              control={control}
              render={({ field }) => (
                <SelectField label="Primary Interest" value={field.value} onChange={field.onChange} options={interestOptions} required />
              )}
            />
            {errors.primaryInterest && (
              <span style={{ fontSize: "12px", color: "#dc2626", fontFamily: "Inter, sans-serif", marginTop: "4px", display: "block" }}>
                {errors.primaryInterest.message}
              </span>
            )}
          </div>
          <div>
            <Controller
              name="connection"
              control={control}
              render={({ field }) => (
                <SelectField label="How did you hear about BRIDGE?" value={field.value} onChange={field.onChange} options={connectionOptions} required />
              )}
            />
            {errors.connection && (
              <span style={{ fontSize: "12px", color: "#dc2626", fontFamily: "Inter, sans-serif", marginTop: "4px", display: "block" }}>
                {errors.connection.message}
              </span>
            )}
          </div>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextareaField label="Anything else you'd like to share?" placeholder="Optional context about your work or interest…" value={field.value ?? ""} onChange={field.onChange} />
            )}
          />

          {/* Consent */}
          <Controller
            name="consent"
            control={control}
            render={({ field }) => (
              <div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <div
                    role="checkbox"
                    aria-checked={field.value}
                    tabIndex={0}
                    onClick={() => field.onChange(!field.value)}
                    onKeyDown={e => { if (e.key === " " || e.key === "Enter") field.onChange(!field.value); }}
                    style={{
                      width: "18px", height: "18px", minWidth: "18px",
                      borderRadius: "5px", marginTop: "1px",
                      border: `2px solid ${field.value ? colors.primary : colors.line}`,
                      backgroundColor: field.value ? colors.primary : colors.white,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.2s ease", cursor: "pointer",
                    }}
                  >
                    {field.value && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    )}
                  </div>
                  <span style={{ fontSize: "13px", color: "#555", fontFamily: "Inter, sans-serif", lineHeight: "1.5" }}>
                    I agree to receive communications from BRIDGE PBC and understand that access is subject to team review and approval.
                  </span>
                </div>
                {errors.consent && (
                  <span style={{ fontSize: "12px", color: "#dc2626", fontFamily: "Inter, sans-serif", marginTop: "4px", display: "block" }}>
                    {errors.consent.message}
                  </span>
                )}
              </div>
            )}
          />

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
