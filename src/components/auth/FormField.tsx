import React, { useState } from "react";
import { colors } from "@/lib/theme";

// ============================================================
// FIELD COMPONENT
// ============================================================
export interface FieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  hint?: string;
}

export const Field = ({ label, type = "text", placeholder, value, onChange, required, hint }: FieldProps) => {
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
export interface SelectOption { value: string; label: string; }
export interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  required?: boolean;
}

export const SelectField = ({ label, value, onChange, options, required }: SelectFieldProps) => {
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
export interface TextareaFieldProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
}

export const TextareaField = ({ label, placeholder, value, onChange, required }: TextareaFieldProps) => {
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
