import React, { useState } from "react";
import { colors } from "@/lib/theme";
import { useAuth } from "@/context/AuthContext";
import { Field } from "./FormField";

// ============================================================
// SIGN IN FORM
// ============================================================
export interface SignInFormProps {
  onSuccess?: () => void;
  onForgot?: () => void;
}

export const SignInForm = ({ onSuccess, onForgot }: SignInFormProps) => {
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
