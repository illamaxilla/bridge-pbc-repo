import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { colors } from "@/lib/theme";
import { supabase } from "@/integrations/supabase/client";
import { Field } from "./FormField";

// ============================================================
// FORGOT PASSWORD FORM
// ============================================================

const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export interface ForgotPasswordFormProps {
  onBack: () => void;
}

export const ForgotPasswordForm = ({ onBack }: ForgotPasswordFormProps) => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [btnHover, setBtnHover] = useState(false);

  const { control, handleSubmit, formState: { errors }, getValues } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setError(null);
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
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
            If an account exists for <strong>{getValues("email")}</strong>, we've sent a password reset link. Please check your inbox and spam folder.
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
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
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

      <div>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Field
              label="Email Address" type="email" placeholder="your@email.com"
              value={field.value} onChange={field.onChange} required
            />
          )}
        />
        {errors.email && (
          <span style={{ fontSize: "12px", color: "#dc2626", fontFamily: "Inter, sans-serif", marginTop: "4px", display: "block" }}>
            {errors.email.message}
          </span>
        )}
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
