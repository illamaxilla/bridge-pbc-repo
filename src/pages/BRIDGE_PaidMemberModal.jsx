import { useState, useEffect } from "react";
import {
  X, ArrowRight, ArrowLeft, Check, Lock, Star, AlertCircle,
  User, Mail, Briefcase, Globe, MapPin, FileText, ChevronDown,
  CheckCircle, Clock, Shield
} from "lucide-react";
import { BridgeLogo } from "@/components/BridgeLogo";
import { useScrollLock } from "@/hooks/useScrollLock";

// ─── DESIGN TOKENS ───────────────────────────────────────────
const C = {
  primary:  "#1B4D3E",
  accent:   "#B8D935",
  bg:       "#F3F5F2",
  white:    "#FFFFFF",
  line:     "#DEDEDE",
  text:     "#1A1A1A",
  muted:    "#6B7280",
  error:    "#DC2626",
  errorBg:  "#FEF2F2",
};
const F = { sans: "'Inter', sans-serif", body: "'Inter', sans-serif" };

// ─── FIELD COMPONENT ──────────────────────────────────────────
const Field = ({ label, type = "text", placeholder, value, onChange, required, hint, icon, error, as, rows, options }) => {
  const [focused, setFocused] = useState(false);
  const borderColor = error ? C.error : focused ? C.primary : C.line;
  const sharedStyle = {
    width: "100%", padding: "12px 16px",
    paddingLeft: icon ? "42px" : "16px",
    borderRadius: 10, boxSizing: "border-box",
    border: `1.5px solid ${borderColor}`,
    backgroundColor: focused ? C.white : "#FAFAFA",
    color: C.text, fontSize: "14px",
    fontFamily: F.body, outline: "none",
    transition: "border-color 0.2s, background 0.2s",
    appearance: "none",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: "12px", fontWeight: "700", fontFamily: F.sans,
        color: error ? C.error : C.primary, letterSpacing: "0.3px", textTransform: "uppercase" }}>
        {label}{required && <span style={{ color: C.accent, marginLeft: 3 }}>*</span>}
      </label>
      <div style={{ position: "relative" }}>
        {icon && (
          <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
            color: focused ? C.primary : C.muted, pointerEvents: "none", zIndex: 1 }}>
            {icon}
          </div>
        )}
        {as === "textarea" ? (
          <textarea
            placeholder={placeholder} value={value} onChange={onChange} rows={rows || 4} required={required}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            style={{ ...sharedStyle, resize: "vertical", minHeight: 100 }}
          />
        ) : as === "select" ? (
          <select value={value} onChange={onChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} style={sharedStyle}>
            <option value="">{placeholder}</option>
            {options.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        ) : (
          <input
            type={type} placeholder={placeholder} value={value} onChange={onChange} required={required}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            style={sharedStyle}
          />
        )}
      </div>
      {hint && !error && <p style={{ margin: 0, fontSize: "12px", fontFamily: F.body, color: C.muted }}>{hint}</p>}
      {error && <p style={{ margin: 0, fontSize: "12px", fontFamily: F.body, color: C.error }}>{error}</p>}
    </div>
  );
};

// ─── PROGRESS BAR ────────────────────────────────────────────
const steps = ["Eligibility", "Your Profile", "Intent & Use", "Review"];

const ProgressBar = ({ current }) => (
  <div style={{ padding: "0 0 28px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : "none" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                backgroundColor: done ? C.primary : active ? C.accent : C.line,
                color: done ? C.white : active ? C.primary : C.muted,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "13px", fontWeight: "700", fontFamily: F.sans,
                transition: "all 0.3s ease",
              }}>
                {done ? <Check size={14} strokeWidth={3} /> : i + 1}
              </div>
              <span style={{
                fontSize: "10px", fontWeight: active || done ? "700" : "500",
                fontFamily: F.sans, color: active ? C.primary : done ? C.primary : C.muted,
                letterSpacing: "0.3px", whiteSpace: "nowrap",
              }}>{label}</span>
            </div>
            {i < steps.length - 1 && (
              <div style={{
                flex: 1, height: 2, backgroundColor: done ? C.primary : C.line,
                margin: "0 8px", marginTop: -20,
                transition: "background-color 0.3s ease",
              }} />
            )}
          </div>
        );
      })}
    </div>
  </div>
);

// ─── STEP 0: ELIGIBILITY CHECK ────────────────────────────────
const EligibilityStep = ({ onPass, onFail }) => {
  const [answer, setAnswer] = useState(null); // null | "yes" | "no"
  const [memberDate, setMemberDate] = useState("");
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");

  const check = () => {
    if (answer === "no") { onFail(); return; }
    if (!memberDate) { setError("Please enter the date you became a Free Member."); return; }

    const joined = new Date(memberDate);
    const now = new Date();
    const diffDays = Math.floor((now - joined) / (1000 * 60 * 60 * 24));

    if (diffDays >= 30) {
      setChecked(true);
      setTimeout(onPass, 1200);
    } else {
      const remaining = 30 - diffDays;
      setError(`You have ${remaining} more day${remaining !== 1 ? "s" : ""} remaining as a Free Member. Come back after ${new Date(joined.getTime() + 30 * 86400000).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}.`);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      {/* Step heading */}
      <div>
        <h3 style={{ margin: "0 0 4px", fontSize: "20px", fontFamily: F.sans, fontWeight: "600", color: C.text, letterSpacing: "-.3px" }}>Eligibility Check</h3>
        <p style={{ margin: 0, fontSize: "14px", fontFamily: F.body, color: C.muted }}>Paid Membership requires 30 days as an active Free Member first.</p>
      </div>

      {/* Intro block */}
      <div style={{ backgroundColor: "rgba(184,217,53,0.10)", borderRadius: 12,
        border: `1px solid rgba(184,217,53,0.3)`, padding: "20px 20px" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <Clock size={18} color={C.primary} style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <p style={{ margin: "0 0 6px", fontSize: "14px", fontWeight: "700", fontFamily: F.sans, color: C.primary }}>
              30-Day Free Membership Requirement
            </p>
            <p style={{ margin: 0, fontSize: "13px", fontFamily: F.body, color: C.muted, lineHeight: 1.6 }}>
              Paid Membership is reserved for those who have spent at least 30 days as a Free Member. This ensures our community is built on genuine familiarity with BRIDGE's work — not impulse.
            </p>
          </div>
        </div>
      </div>

      {/* Question */}
      <div>
        <p style={{ margin: "0 0 16px", fontSize: "15px", fontWeight: "600", fontFamily: F.sans, color: C.text }}>
          Are you currently a BRIDGE Free Member?
        </p>
        <div style={{ display: "flex", gap: 12 }}>
          {["yes", "no"].map(opt => (
            <button
              key={opt}
              onClick={() => { setAnswer(opt); setError(""); }}
              style={{
                flex: 1, padding: "14px", borderRadius: 12, cursor: "pointer",
                border: `2px solid ${answer === opt ? C.primary : C.line}`,
                backgroundColor: answer === opt ? "rgba(27,77,62,0.05)" : C.white,
                color: answer === opt ? C.primary : C.muted,
                fontSize: "14px", fontWeight: "700", fontFamily: F.sans,
                textTransform: "capitalize", transition: "all 0.2s",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}
            >{opt === "yes"
              ? <><Check size={14} strokeWidth={3} style={{ flexShrink: 0 }} /> Yes, I'm a Free Member</>
              : <><X size={14} strokeWidth={3} style={{ flexShrink: 0 }} /> No, not yet</>
            }</button>
          ))}
        </div>
      </div>

      {/* Date input — only if yes */}
      {answer === "yes" && (
        <div>
          <Field
            label="When did you become a Free Member?"
            type="date"
            value={memberDate}
            onChange={e => { setMemberDate(e.target.value); setError(""); }}
            hint="We'll calculate whether the 30-day period has passed."
            required
            error={error}
          />
        </div>
      )}

      {/* Not a member message */}
      {answer === "no" && (
        <div style={{ backgroundColor: C.errorBg, borderRadius: 12, padding: "16px 20px",
          border: `1px solid rgba(220,38,38,0.2)` }}>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <AlertCircle size={16} color={C.error} style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <p style={{ margin: "0 0 4px", fontSize: "13px", fontWeight: "700", fontFamily: F.sans, color: C.error }}>
                Free Membership Required First
              </p>
              <p style={{ margin: 0, fontSize: "13px", fontFamily: F.body, color: "#9B1C1C", lineHeight: 1.6 }}>
                You need to become a Free Member first and engage with BRIDGE for 30 days before applying for Paid Membership. Start by applying for free access.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Success state */}
      {checked && (
        <div style={{ backgroundColor: "rgba(27,77,62,0.06)", borderRadius: 12, padding: "16px 20px",
          display: "flex", gap: 10, alignItems: "center" }}>
          <CheckCircle size={20} color={C.primary} />
          <span style={{ fontSize: "14px", fontWeight: "600", fontFamily: F.sans, color: C.primary }}>
            Eligibility confirmed — proceeding to your application…
          </span>
        </div>
      )}

      {/* CTA */}
      {!checked && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {answer === "yes" && (
            <button onClick={check} style={{
              width: "100%", padding: "14px", borderRadius: 100,
              backgroundColor: C.primary, color: C.white,
              border: "none", fontSize: "14px", fontWeight: "700",
              fontFamily: F.sans, cursor: "pointer", letterSpacing: "0.3px",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}>
              Check My Eligibility <ArrowRight size={15} />
            </button>
          )}
          {answer === "no" && (
            <button onClick={onFail} style={{
              width: "100%", padding: "14px", borderRadius: 100,
              backgroundColor: C.accent, color: C.primary,
              border: "none", fontSize: "14px", fontWeight: "700",
              fontFamily: F.sans, cursor: "pointer",
            }}>
              Apply for Free Membership Instead
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// ─── STEP 1: PROFILE ──────────────────────────────────────────
const ProfileStep = ({ data, onChange, isMobile }) => {
  const sectors = [
    "Infrastructure","Financial Inclusion","Health Systems","Technology & Innovation",
    "Education & Skills","Agriculture & Value Chains","Sports/Entertainment/Creative",
    "Housing & Real Estate","Tourism & Hospitality","Energy & Renewables",
    "Manufacturing & Light Industry","Transportation & Logistics","Multiple / Cross-sector"
  ];
  const roles = [
    "Investor / Fund Manager","Entrepreneur / Founder","Corporate Executive",
    "Government Official","Development Finance","Academic / Researcher",
    "Diaspora Professional","Civil Society","Media / Journalist","Other"
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h3 style={{ margin: "0 0 4px", fontSize: "20px", fontFamily: F.sans, fontWeight: "600", color: C.text, letterSpacing: "-.3px" }}>Your Profile</h3>
        <p style={{ margin: 0, fontSize: "14px", fontFamily: F.body, color: C.muted }}>Tell us who you are and how you connect to Ghana's opportunity landscape.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 }}>
        <Field label="First Name" placeholder="Kofi" value={data.firstName} onChange={e => onChange("firstName", e.target.value)}
          required icon={<User size={14} />} />
        <Field label="Last Name" placeholder="Mensah" value={data.lastName} onChange={e => onChange("lastName", e.target.value)}
          required icon={<User size={14} />} />
      </div>

      <Field label="Email Address" type="email" placeholder="you@example.com" value={data.email}
        onChange={e => onChange("email", e.target.value)} required icon={<Mail size={14} />}
        hint="Must match your Free Member account email." />

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 }}>
        <Field label="Organization / Employer" placeholder="Company or institution" value={data.organization}
          onChange={e => onChange("organization", e.target.value)} icon={<Briefcase size={14} />} />
        <Field label="Your Role / Title" placeholder="e.g. Director of Strategy" value={data.role}
          onChange={e => onChange("role", e.target.value)} required icon={<Briefcase size={14} />}
          as="select" options={roles} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 }}>
        <Field label="Country of Residence" placeholder="e.g. Ghana, United States" value={data.country}
          onChange={e => onChange("country", e.target.value)} required icon={<MapPin size={14} />} />
        <Field label="Primary Sector of Interest" value={data.sector} onChange={e => onChange("sector", e.target.value)}
          as="select" placeholder="Select a sector" options={sectors} required icon={<Globe size={14} />} />
      </div>

      <Field label="LinkedIn Profile (optional)" type="url" placeholder="https://linkedin.com/in/yourname"
        value={data.linkedin} onChange={e => onChange("linkedin", e.target.value)}
        hint="Helps us verify your professional background." />
    </div>
  );
};

// ─── STEP 2: INTENT ───────────────────────────────────────────
const intentOptions = [
  { id: "invest", label: "Investment & Deal Flow", desc: "I'm evaluating opportunities to deploy capital in Ghana." },
  { id: "research", label: "Research & Intelligence", desc: "I need deep sector data and analytical reports." },
  { id: "partner", label: "Partnership & Business", desc: "I'm seeking business or strategic partnerships in Ghana." },
  { id: "policy", label: "Policy & Government", desc: "I work in policy, public sector, or development finance." },
  { id: "diaspora", label: "Diaspora Engagement", desc: "I'm Ghanaian diaspora connecting resources to home." },
  { id: "other", label: "Other", desc: "My use case is different — I'll explain below." },
];

const IntentStep = ({ data, onChange, isMobile }) => {
  const toggle = (id) => {
    const current = data.intents || [];
    const updated = current.includes(id) ? current.filter(i => i !== id) : [...current, id];
    onChange("intents", updated);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h3 style={{ margin: "0 0 4px", fontSize: "20px", fontFamily: F.sans, fontWeight: "600", color: C.text, letterSpacing: "-.3px" }}>Intent & Use</h3>
        <p style={{ margin: 0, fontSize: "14px", fontFamily: F.body, color: C.muted }}>Help us understand how you plan to use BRIDGE's platform and intelligence.</p>
      </div>

      <div>
        <p style={{ margin: "0 0 12px", fontSize: "13px", fontWeight: "700", fontFamily: F.sans, color: C.text,
          textTransform: "uppercase", letterSpacing: "0.5px" }}>
          Primary reason for Paid Membership <span style={{ color: C.accent }}>*</span>
        </p>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 10 }}>
          {intentOptions.map(opt => {
            const selected = (data.intents || []).includes(opt.id);
            return (
              <button
                key={opt.id}
                onClick={() => toggle(opt.id)}
                style={{
                  textAlign: "left", padding: "14px 16px", borderRadius: 12, cursor: "pointer",
                  border: `2px solid ${selected ? C.primary : C.line}`,
                  backgroundColor: selected ? "rgba(27,77,62,0.05)" : C.white,
                  transition: "all 0.2s",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: "700", fontFamily: F.sans,
                      color: selected ? C.primary : C.text, marginBottom: 4 }}>{opt.label}</div>
                    <div style={{ fontSize: "12px", fontFamily: F.body,
                      color: C.muted, lineHeight: 1.4 }}>{opt.desc}</div>
                  </div>
                  {selected && (
                    <div style={{ width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
                      backgroundColor: C.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Check size={10} color={C.white} strokeWidth={3} />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <Field
        label="How do you plan to use BRIDGE's intelligence and community?"
        as="textarea" rows={4}
        placeholder="Describe your goals, the decisions you're trying to make, or the connections you're hoping to build through BRIDGE..."
        value={data.intentNote}
        onChange={e => onChange("intentNote", e.target.value)}
        required
        hint="Be specific — this helps us understand how to support you best."
      />

      <Field
        label="How did you hear about BRIDGE?"
        value={data.referral}
        onChange={e => onChange("referral", e.target.value)}
        as="select"
        placeholder="Select one"
        options={[
          "BRIDGE website","LinkedIn","Twitter / X","Referred by a member",
          "Conference or event","News / Media","Government connection","Other"
        ]}
      />
    </div>
  );
};

// ─── REVIEW ROW ───────────────────────────────────────────────
const ReviewRow = ({ label, value }) => value ? (
  <div style={{ display: "flex", gap: 12, padding: "8px 0", borderBottom: `1px solid ${C.line}` }}>
    <span style={{ fontSize: "12px", fontWeight: "700", fontFamily: F.sans, color: C.muted,
      textTransform: "uppercase", letterSpacing: "0.5px", minWidth: 130 }}>{label}</span>
    <span style={{ fontSize: "14px", fontFamily: F.body, color: C.text }}>{value}</span>
  </div>
) : null;

// ─── STEP 3: REVIEW ───────────────────────────────────────────
const ReviewStep = ({ profile, intent, onSubmit, submitting, success }) => {
  const [agreed, setAgreed] = useState(false);

  if (success) {
    return (
      <div style={{ textAlign: "center", padding: "20px 0 40px" }}>
        <div style={{
          width: 72, height: 72, borderRadius: "50%",
          backgroundColor: "rgba(184,217,53,0.15)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 24px",
        }}>
          <CheckCircle size={36} color={C.primary} />
        </div>
        <h3 style={{ margin: "0 0 12px", fontSize: "26px", fontFamily: F.sans, fontWeight: "600", color: C.text, letterSpacing: "-.4px" }}>
          Application Submitted
        </h3>
        <p style={{ margin: "0 0 20px", fontSize: "15px", fontFamily: F.body, color: C.muted, lineHeight: 1.7, maxWidth: 380, marginLeft: "auto", marginRight: "auto" }}>
          Thank you, {profile.firstName}. We've received your Paid Membership application. Our team will review it and reach out to you at <strong>{profile.email}</strong> within 3–5 business days.
        </p>
        <div style={{ backgroundColor: "rgba(27,77,62,0.06)", borderRadius: 12, padding: "16px 20px",
          display: "inline-flex", gap: 10, alignItems: "center", marginBottom: 24 }}>
          <Shield size={16} color={C.primary} />
          <span style={{ fontSize: "13px", fontFamily: F.body, color: C.primary, fontWeight: "600" }}>
            Your current Free Member access remains active while we review.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h3 style={{ margin: "0 0 4px", fontSize: "20px", fontFamily: F.sans, fontWeight: "600", color: C.text, letterSpacing: "-.3px" }}>Review & Submit</h3>
        <p style={{ margin: 0, fontSize: "14px", fontFamily: F.body, color: C.muted }}>Confirm your details before submitting your application.</p>
      </div>

      {/* Profile summary */}
      <div>
        <p style={{ margin: "0 0 12px", fontSize: "11px", fontWeight: "700", fontFamily: F.sans,
          color: C.accent, letterSpacing: "1.5px", textTransform: "uppercase" }}>Your Profile</p>
        <ReviewRow label="Name" value={`${profile.firstName} ${profile.lastName}`} />
        <ReviewRow label="Email" value={profile.email} />
        <ReviewRow label="Organization" value={profile.organization} />
        <ReviewRow label="Role" value={profile.role} />
        <ReviewRow label="Country" value={profile.country} />
        <ReviewRow label="Sector Focus" value={profile.sector} />
      </div>

      {/* Intent summary */}
      <div>
        <p style={{ margin: "0 0 12px", fontSize: "11px", fontWeight: "700", fontFamily: F.sans,
          color: C.accent, letterSpacing: "1.5px", textTransform: "uppercase" }}>Your Intent</p>
        <ReviewRow label="Membership Goals"
          value={(intent.intents || []).map(id => intentOptions.find(o => o.id === id)?.label).filter(Boolean).join(", ")} />
        <ReviewRow label="Referral" value={intent.referral} />
        {intent.intentNote && (
          <div style={{ padding: "10px 0" }}>
            <div style={{ fontSize: "12px", fontWeight: "700", fontFamily: F.sans, color: C.muted,
              textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 6 }}>How You Plan to Use BRIDGE</div>
            <div style={{ fontSize: "14px", fontFamily: F.body, color: C.text, lineHeight: 1.6,
              backgroundColor: C.bg, borderRadius: 8, padding: 14 }}>
              {intent.intentNote}
            </div>
          </div>
        )}
      </div>

      {/* Fee notice */}
      <div style={{ backgroundColor: "rgba(27,77,62,0.06)", borderRadius: 12, padding: "16px 20px" }}>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <Star size={16} color={C.primary} style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <p style={{ margin: "0 0 4px", fontSize: "13px", fontWeight: "700", fontFamily: F.sans, color: C.primary }}>
              $10/month · $100/year (save 17%)
            </p>
            <p style={{ margin: 0, fontSize: "13px", fontFamily: F.body, color: C.muted, lineHeight: 1.5 }}>
              Payment is processed only after your application is reviewed and approved. You will not be charged now.
            </p>
          </div>
        </div>
      </div>

      {/* Agreement */}
      <label style={{ display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer" }}>
        <div
          onClick={() => setAgreed(!agreed)}
          style={{
            width: 20, height: 20, borderRadius: 5, flexShrink: 0, marginTop: 1,
            border: `2px solid ${agreed ? C.primary : C.line}`,
            backgroundColor: agreed ? C.primary : "transparent",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", transition: "all 0.2s",
          }}
        >
          {agreed && <Check size={11} color={C.white} strokeWidth={3} />}
        </div>
        <span style={{ fontSize: "13px", fontFamily: F.body, color: C.muted, lineHeight: 1.6 }}>
          I confirm the information above is accurate. I understand that BRIDGE will review my application and contact me at the email provided. I agree to BRIDGE's{" "}
          <a href="#" style={{ color: C.primary, fontWeight: "600" }}>Member Terms</a> and{" "}
          <a href="#" style={{ color: C.primary, fontWeight: "600" }}>Privacy Policy</a>.
        </span>
      </label>

      <button
        onClick={agreed ? onSubmit : undefined}
        disabled={!agreed || submitting}
        style={{
          width: "100%", padding: "15px", borderRadius: 100,
          backgroundColor: agreed ? C.primary : C.line,
          color: agreed ? C.white : C.muted,
          border: "none", fontSize: "14px", fontWeight: "700",
          fontFamily: F.sans, cursor: agreed ? "pointer" : "not-allowed",
          letterSpacing: "0.3px", transition: "all 0.2s",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}
      >
        {submitting ? "Submitting…" : <>Submit Paid Membership Application <ArrowRight size={15} /></>}
      </button>
    </div>
  );
};

// ─── NOT ELIGIBLE SCREEN ──────────────────────────────────────
const NotEligibleScreen = ({ onApplyFree, onClose }) => (
  <div style={{ textAlign: "center", padding: "20px 0 40px" }}>
    <div style={{
      width: 68, height: 68, borderRadius: "50%",
      backgroundColor: C.errorBg,
      display: "flex", alignItems: "center", justifyContent: "center",
      margin: "0 auto 24px",
    }}>
      <Lock size={28} color={C.error} />
    </div>
    <h3 style={{ margin: "0 0 12px", fontSize: "22px", fontWeight: "800", fontFamily: F.sans, color: C.text }}>
      Paid Membership Not Yet Available
    </h3>
    <p style={{ margin: "0 auto 28px", fontSize: "15px", fontFamily: F.body, color: C.muted,
      lineHeight: 1.7, maxWidth: 360 }}>
      You need to spend at least 30 days as a Free Member before applying for Paid Membership. Start your Free Membership today.
    </p>
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <button onClick={onApplyFree} style={{
        width: "100%", padding: "14px", borderRadius: 100,
        backgroundColor: C.primary, color: C.white,
        border: "none", fontSize: "14px", fontWeight: "700",
        fontFamily: F.sans, cursor: "pointer",
      }}>
        Apply for Free Membership
      </button>
      <button onClick={onClose} style={{
        width: "100%", padding: "14px", borderRadius: 100,
        backgroundColor: "transparent", color: C.muted,
        border: `1.5px solid ${C.line}`, fontSize: "14px", fontWeight: "600",
        fontFamily: F.sans, cursor: "pointer",
      }}>
        Close
      </button>
    </div>
  </div>
);

// ─── MAIN MODAL ───────────────────────────────────────────────
export function BRIDGEPaidMemberModal({ isOpen, onClose, onApplyFreeInstead }) {
  const [step, setStep] = useState(0);
  const [notEligible, setNotEligible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [profile, setProfile] = useState({
    firstName: "", lastName: "", email: "", organization: "",
    role: "", country: "", sector: "", linkedin: "",
  });
  const [intent, setIntent] = useState({
    intents: [], intentNote: "", referral: "",
  });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check(); window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(0); setNotEligible(false);
        setSubmitting(false); setSuccess(false);
        setProfile({ firstName: "", lastName: "", email: "", organization: "", role: "", country: "", sector: "", linkedin: "" });
        setIntent({ intents: [], intentNote: "", referral: "" });
      }, 300);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const updateProfile = (key, val) => setProfile(p => ({ ...p, [key]: val }));
  const updateIntent  = (key, val) => setIntent(i  => ({ ...i, [key]: val }));

  const handleSubmit = () => {
    setSubmitting(true);
    // TODO: Replace with real API call — POST application data to backend, await response
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 2000);
  };

  const canNext = () => {
    if (step === 1) return profile.firstName && profile.lastName && profile.email && profile.role && profile.country && profile.sector;
    if (step === 2) return (intent.intents || []).length > 0 && intent.intentNote;
    return true;
  };

  // Sidebar content per step
  const sidebarContent = [
    {
      icon: <Clock size={22} color={C.accent} />,
      title: "Why 30 days?",
      body: "BRIDGE Paid Membership is built on trust. We ask Free Members to spend 30 days engaging with our content — reading reports, attending events, understanding Ghana's opportunity landscape — before applying. The result is a community of genuinely informed, committed stakeholders.",
      note: "Your Free Member start date is the anchor for this calculation.",
    },
    {
      icon: <User size={22} color={C.accent} />,
      title: "Your profile matters",
      body: "We review every Paid Member application. Your background helps us match you with the right resources, introductions, and community conversations from day one.",
      note: "We will never share your personal data with third parties.",
    },
    {
      icon: <FileText size={22} color={C.accent} />,
      title: "Full access unlocked",
      body: "Paid Members access the BRIDGE Intelligence Dashboard, all 12 sector deep-dive reports, the full restricted document library, community forums, and the investment opportunity pipeline.",
      note: "$10/month or $100/year. Payment only after approval.",
    },
    {
      icon: <Shield size={22} color={C.accent} />,
      title: "Manual review",
      body: "Every Paid Membership application is reviewed by the BRIDGE team within 3–5 business days. We're selective — and that's a feature, not a bug. It keeps the community high-trust.",
      note: "You'll receive an email confirmation of our decision.",
    },
  ];

  const sidebar = sidebarContent[step] || sidebarContent[0];

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 200,
          backgroundColor: "rgba(10,20,15,0.6)",
          backdropFilter: "blur(6px)",
        }}
      />

      {/* Modal */}
      <div style={{
        position: "fixed", zIndex: 201,
        ...(isMobile
          ? { bottom: 0, left: 0, right: 0, borderRadius: "20px 20px 0 0", maxHeight: "94vh" }
          : { top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "min(900px, 95vw)", borderRadius: 20 }
        ),
        backgroundColor: C.white,
        overflow: "hidden",
        display: "flex", flexDirection: isMobile ? "column" : "row",
        boxShadow: "0 32px 80px rgba(0,0,0,0.28)",
      }}>

        {/* ── LEFT SIDEBAR (desktop only) ── */}
        {!isMobile && (
          <div style={{
            width: 280, flexShrink: 0,
            backgroundColor: C.primary,
            padding: "36px 28px",
            display: "flex", flexDirection: "column", gap: 0,
          }}>
            <div style={{ marginBottom: 36 }}><BridgeLogo height={24} /></div>
            <div style={{ flex: 1 }}>
              <div style={{ marginBottom: 16 }}>{sidebar.icon}</div>
              <h4 style={{ margin: "0 0 12px", fontSize: "17px", fontWeight: "700", fontFamily: F.sans, color: C.white }}>{sidebar.title}</h4>
              <p style={{ margin: "0 0 16px", fontSize: "13px", fontFamily: F.body, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>{sidebar.body}</p>
              <p style={{ margin: 0, fontSize: "12px", fontFamily: F.body, color: "rgba(184,217,53,0.8)", lineHeight: 1.5, fontStyle: "italic" }}>{sidebar.note}</p>
            </div>
            <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 10 }}>
              {steps.map((label, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 6, height: 6, borderRadius: "50%",
                    backgroundColor: i <= step ? C.accent : "rgba(255,255,255,0.2)",
                    opacity: i === step ? 1 : 0.7,
                  }} />
                  <span style={{
                    fontSize: "12px", fontFamily: F.sans, fontWeight: i === step ? "700" : "400",
                    color: i === step ? C.white : "rgba(255,255,255,0.45)",
                  }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── RIGHT PANEL ── */}
        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          overflow: "hidden", maxHeight: isMobile ? "94vh" : "85vh",
        }}>

          {/* Drag handle — mobile only, always at very top */}
          {isMobile && (
            <div style={{ display: "flex", justifyContent: "center", paddingTop: 12, paddingBottom: 4, flexShrink: 0 }}>
              <div style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: C.line }} />
            </div>
          )}

          {/* Header */}
          <div style={{
            padding: isMobile ? "12px 20px 14px" : "28px 36px 20px",
            borderBottom: `1px solid ${C.line}`,
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexShrink: 0,
          }}>
            {isMobile ? (
              <div>
                <p style={{ margin: "0 0 1px", fontSize: "10px", fontWeight: "700", fontFamily: F.sans,
                  color: C.accent, letterSpacing: "1.5px", textTransform: "uppercase" }}>
                  Step {step + 1} of {steps.length} — {steps[step]}
                </p>
                <p style={{ margin: 0, fontSize: "15px", fontWeight: "700", fontFamily: F.sans, color: C.text }}>
                  Paid Membership Application
                </p>
              </div>
            ) : (
              <div>
                <p style={{ margin: "0 0 2px", fontSize: "11px", fontWeight: "700", fontFamily: F.sans,
                  color: C.accent, letterSpacing: "1.5px", textTransform: "uppercase" }}>Application</p>
                <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "800", fontFamily: F.sans, color: C.text }}>
                  Paid Membership
                </h2>
              </div>
            )}
            <button
              onClick={onClose}
              style={{
                width: 36, height: 36, borderRadius: "50%", border: `1.5px solid ${C.line}`,
                backgroundColor: "transparent", cursor: "pointer", color: C.muted,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}
            ><X size={16} /></button>
          </div>

          {/* Mobile step progress strip */}
          {isMobile && !notEligible && !success && (
            <div style={{ display: "flex", flexShrink: 0 }}>
              {steps.map((_, i) => (
                <div key={i} style={{
                  flex: 1, height: 3,
                  backgroundColor: i <= step ? C.primary : C.line,
                  transition: "background-color 0.3s",
                }} />
              ))}
            </div>
          )}

          {/* Scrollable body */}
          <div style={{ flex: 1, overflowY: "auto", padding: isMobile ? "24px 20px" : "28px 36px" }}>
            {notEligible ? (
              <NotEligibleScreen
                onApplyFree={() => { onClose(); onApplyFreeInstead?.(); }}
                onClose={onClose}
              />
            ) : (
              <>
                {!success && !isMobile && <ProgressBar current={step} />}

                {step === 0 && (
                  <EligibilityStep
                    onPass={() => setStep(1)}
                    onFail={() => setNotEligible(true)}
                  />
                )}
                {step === 1 && <ProfileStep data={profile} onChange={updateProfile} isMobile={isMobile} />}
                {step === 2 && <IntentStep data={intent} onChange={updateIntent} isMobile={isMobile} />}
                {step === 3 && (
                  <ReviewStep
                    profile={profile} intent={intent}
                    onSubmit={handleSubmit}
                    submitting={submitting}
                    success={success}
                  />
                )}
              </>
            )}
          </div>

          {/* Footer nav */}
          {!notEligible && !success && step > 0 && (
            <div style={{
              padding: isMobile ? "14px 20px" : "20px 36px",
              paddingBottom: isMobile ? "calc(14px + env(safe-area-inset-bottom))" : "20px",
              borderTop: `1px solid ${C.line}`,
              display: "flex",
              flexDirection: isMobile ? "column-reverse" : "row",
              justifyContent: "space-between", alignItems: isMobile ? "stretch" : "center",
              gap: 10,
              flexShrink: 0,
            }}>
              <button
                onClick={() => setStep(s => s - 1)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: isMobile ? "center" : "flex-start",
                  gap: 6, backgroundColor: "transparent", color: C.muted,
                  border: isMobile ? `1.5px solid ${C.line}` : "none",
                  borderRadius: isMobile ? 100 : 0,
                  fontSize: "14px", fontWeight: "600",
                  fontFamily: F.sans, cursor: "pointer",
                  padding: isMobile ? "13px" : "10px 0",
                  minHeight: 44,
                }}
              >
                <ArrowLeft size={15} /> Back
              </button>

              {step < 3 && (
                <button
                  onClick={() => canNext() && setStep(s => s + 1)}
                  disabled={!canNext()}
                  style={{
                    padding: "13px 28px", borderRadius: 100,
                    backgroundColor: canNext() ? C.primary : C.line,
                    color: canNext() ? C.white : C.muted,
                    border: "none", fontSize: "14px", fontWeight: "700",
                    fontFamily: F.sans, cursor: canNext() ? "pointer" : "not-allowed",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    gap: 8, transition: "all 0.2s",
                    width: isMobile ? "100%" : "auto",
                    minHeight: 44,
                  }}
                >
                  Continue <ArrowRight size={15} />
                </button>
              )}
            </div>
          )}

          {/* Close button after success */}
          {success && (
            <div style={{
              padding: isMobile ? "14px 20px" : "20px 36px",
              paddingBottom: isMobile ? "calc(14px + env(safe-area-inset-bottom))" : "20px",
              borderTop: `1px solid ${C.line}`, flexShrink: 0,
            }}>
              <button onClick={onClose} style={{
                width: "100%", padding: "14px", borderRadius: 100, minHeight: 44,
                backgroundColor: C.accent, color: C.primary,
                border: "none", fontSize: "14px", fontWeight: "700",
                fontFamily: F.sans, cursor: "pointer",
              }}>Done</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default BRIDGEPaidMemberModal;
