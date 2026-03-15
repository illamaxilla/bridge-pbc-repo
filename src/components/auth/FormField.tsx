import React, { useState, useId } from "react";
import { cn } from "@/lib/utils";

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
  error?: string;
}

export const Field = ({ label, type = "text", placeholder, value, onChange, required, hint, error }: FieldProps) => {
  const [focused, setFocused] = useState(false);
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[13px] font-semibold text-[#191919] font-[Inter,sans-serif]">
        {label}{required && <span className="text-[#1B4D3E] ml-0.5">*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(
          "px-4 py-3 rounded-[10px] border-[1.5px] text-[15px] font-[Inter,sans-serif] text-[#191919] outline-none transition-all duration-200 w-full box-border",
          focused
            ? "border-[#1B4D3E] bg-white"
            : error
              ? "border-red-400 bg-red-50"
              : "border-[#DEDEDE] bg-[#F3F5F2]"
        )}
      />
      {error && (
        <span id={errorId} className="text-xs text-red-600 font-[Inter,sans-serif]" role="alert">
          {error}
        </span>
      )}
      {hint && !error && (
        <span id={hintId} className="text-xs text-gray-400 font-[Inter,sans-serif]">{hint}</span>
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
  const id = useId();
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[13px] font-semibold text-[#191919] font-[Inter,sans-serif]">
        {label}{required && <span className="text-[#1B4D3E] ml-0.5">*</span>}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className={cn(
          "px-4 py-3 pr-10 rounded-[10px] border-[1.5px] text-[15px] font-[Inter,sans-serif] outline-none transition-all duration-200 cursor-pointer appearance-none w-full box-border bg-no-repeat bg-[right_14px_center]",
          focused
            ? "border-[#1B4D3E] bg-white"
            : "border-[#DEDEDE] bg-[#F3F5F2]",
          value ? "text-[#191919]" : "text-gray-400"
        )}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%231B4D3E' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
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
  const id = useId();
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[13px] font-semibold text-[#191919] font-[Inter,sans-serif]">
        {label}{required && <span className="text-[#1B4D3E] ml-0.5">*</span>}
      </label>
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={3}
        required={required}
        className={cn(
          "px-4 py-3 rounded-[10px] border-[1.5px] text-[15px] font-[Inter,sans-serif] text-[#191919] outline-none transition-all duration-200 resize-y min-h-[88px] w-full box-border leading-relaxed",
          focused
            ? "border-[#1B4D3E] bg-white"
            : "border-[#DEDEDE] bg-[#F3F5F2]"
        )}
      />
    </div>
  );
};
