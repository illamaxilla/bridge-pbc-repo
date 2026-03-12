import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Field, SelectField, TextareaField } from "./FormField";
import type { SelectOption } from "./FormField";

const requestAccessSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  country: z.string().min(1, "Country is required"),
  organization: z.string().optional(),
  role: z.string().optional(),
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

  const errorMsg = (msg?: string) =>
    msg ? <span className="block mt-1 text-xs text-red-600 font-[Inter,sans-serif]">{msg}</span> : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {error && (
        <div className="px-4 py-3 rounded-[10px] bg-red-50 border border-red-200 text-red-800 text-[13px] font-[Inter,sans-serif] leading-relaxed">
          {error}
        </div>
      )}

      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-2 mb-1">
        {[1, 2].map(n => (
          <React.Fragment key={n}>
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-[Inter,sans-serif] transition-all duration-300 border-2 ${
                  step >= n
                    ? "bg-[#1B4D3E] border-[#1B4D3E] text-white"
                    : "bg-[#DEDEDE] border-[#DEDEDE] text-gray-400"
                }`}
              >
                {step > n ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                ) : n}
              </div>
              <span className={`text-[11px] font-[Inter,sans-serif] ${
                step >= n ? "text-[#1B4D3E] font-semibold" : "text-gray-400 font-normal"
              }`}>
                {n === 1 ? "Your Details" : "Your Interest"}
              </span>
            </div>
            {n < 2 && (
              <div className={`w-12 h-0.5 mx-1 mb-5 transition-colors duration-300 ${
                step > 1 ? "bg-[#1B4D3E]" : "bg-[#DEDEDE]"
              }`} />
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
            {errorMsg(errors.name?.message)}
          </div>
          <div>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Field label="Email Address" type="email" placeholder="your@email.com" value={field.value} onChange={field.onChange} required />
              )}
            />
            {errorMsg(errors.email?.message)}
          </div>

          <div className={`grid gap-4 ${isMobile ? "grid-cols-1" : "grid-cols-2"}`}>
            <div>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <SelectField label="Country" value={field.value} onChange={field.onChange} options={countryOptions} required />
                )}
              />
              {errorMsg(errors.country?.message)}
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
            onClick={handleStep1Continue}
            className="mt-1 px-8 py-[14px] rounded-full border-none bg-[#1B4D3E] hover:bg-[#163f32] disabled:bg-gray-300 text-white text-[15px] font-semibold font-[Inter,sans-serif] disabled:cursor-not-allowed cursor-pointer transition-all duration-200 flex items-center justify-center gap-2.5 w-full"
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
            {errorMsg(errors.primaryInterest?.message)}
          </div>
          <div>
            <Controller
              name="connection"
              control={control}
              render={({ field }) => (
                <SelectField label="How did you hear about BRIDGE?" value={field.value} onChange={field.onChange} options={connectionOptions} required />
              )}
            />
            {errorMsg(errors.connection?.message)}
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
                <div className="flex items-start gap-2.5">
                  <div
                    role="checkbox"
                    aria-checked={field.value}
                    tabIndex={0}
                    onClick={() => field.onChange(!field.value)}
                    onKeyDown={e => { if (e.key === " " || e.key === "Enter") field.onChange(!field.value); }}
                    className={`w-[18px] h-[18px] min-w-[18px] rounded-[5px] mt-px border-2 flex items-center justify-center transition-all duration-200 cursor-pointer ${
                      field.value
                        ? "border-[#1B4D3E] bg-[#1B4D3E]"
                        : "border-[#DEDEDE] bg-white"
                    }`}
                  >
                    {field.value && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    )}
                  </div>
                  <span className="text-[13px] text-gray-600 font-[Inter,sans-serif] leading-relaxed">
                    I agree to receive communications from BRIDGE PBC and understand that access is subject to team review and approval.
                  </span>
                </div>
                {errorMsg(errors.consent?.message)}
              </div>
            )}
          />

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex-none px-5 py-[14px] rounded-full border-[1.5px] border-[#DEDEDE] bg-transparent text-[#1B4D3E] text-sm font-semibold font-[Inter,sans-serif] cursor-pointer transition-all duration-200"
            >
              ← Back
            </button>
            <button
              type="submit"
              disabled={!step2Valid || loading}
              className="flex-1 px-6 py-[14px] rounded-full border-none bg-[#1B4D3E] hover:bg-[#163f32] disabled:bg-gray-300 text-white text-[15px] font-semibold font-[Inter,sans-serif] disabled:cursor-not-allowed cursor-pointer transition-all duration-200 flex items-center justify-center gap-2.5"
            >
              {loading ? (
                <>
                  <span className="inline-block w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
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
