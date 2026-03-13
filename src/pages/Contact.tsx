import React, { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/Layout";
import { cn } from "@/lib/utils";

// ============================================================================
// BRIDGE PBC — Contact Page (Integrated with Guided Widget)
// ============================================================================

import { colors, layout } from "@/lib/theme";
import { useIsMobile } from "@/hooks/useIsMobile";
const CONTENT_MAX_WIDTH = layout.maxWidth;

// ============================================================================
// SECTOR ICONS — canonical set (SVG inline)
// ============================================================================

const SectorIcons = {
  infrastructure: (c = "currentColor", size = 20) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" />
    </svg>
  ),
  finance: (c = "currentColor", size = 20) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
    </svg>
  ),
  health: (c = "currentColor", size = 20) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h5v5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z" />
    </svg>
  ),
  technology: (c = "currentColor", size = 20) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2" />
    </svg>
  ),
  education: (c = "currentColor", size = 20) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </svg>
  ),
  agriculture: (c = "currentColor", size = 20) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 20h10" />
      <path d="M10 20c5.5-2.5.8-6.4 3-10" />
      <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
      <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
    </svg>
  ),
  creative: (c = "currentColor", size = 20) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  ),
  housing: (c = "currentColor", size = 20) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  tourism: (c = "currentColor", size = 20) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2" />
      <path d="M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14" />
      <path d="M10 20h4" />
      <circle cx="16" cy="20" r="2" />
      <circle cx="8" cy="20" r="2" />
    </svg>
  ),
  energy: (c = "currentColor", size = 20) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" />
      <path d="M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1" />
      <path d="m11 7-3 5h4l-3 5" />
      <line x1="22" x2="22" y1="11" y2="13" />
    </svg>
  ),
  manufacturing: (c = "currentColor", size = 20) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M17 18h1M12 18h1M7 18h1" />
    </svg>
  ),
  transport: (c = "currentColor", size = 20) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  ),
};

// ============================================================================
// SHARED UI ICONS
// ============================================================================

const IconArrowRight = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const IconArrowLeft = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
);
const IconMail = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const IconMapPin = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const IconClock = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);
const IconCheck = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ============================================================================
// LOGO COMPONENTS
// ============================================================================

const BridgeMarkSmall = () => (
  <svg width="28" height="28" viewBox="0 0 924 932" xmlns="http://www.w3.org/2000/svg">
    <rect
      fill="none"
      stroke={colors.primary}
      strokeWidth="80"
      x="40"
      y="40"
      width="843.91"
      height="852.3"
      rx="36.55"
      ry="36.55"
    />
    <polygon
      fill={colors.accent}
      stroke={colors.primary}
      strokeMiterlimit="10"
      points="722.6 322.13 462.28 452.8 201.97 322.75 461.21 192.52 722.6 322.13"
    />
    <path
      fill={colors.primary}
      d="M197.84,426.78c3.86-.53,7.04.85,10.74,1.41l252.53,125.67c84.54-40,167.66-83.83,251.89-124.84,33.14-11.49,50.09,34.15,18.55,49.11l-259.23,129.08c-10.18,3.72-14.14,2.57-23.85-1.31l-264.23-132.98c-17.04-14.4-7.96-43.2,13.61-46.14h0Z"
    />
    <path
      fill={colors.accent}
      d="M195.25,558c3.65-.63,7.4-.4,11.08-.22,86.11,40.47,170.4,85.05,255.95,126.78l252.92-126c29.53-7.22,45.44,28.67,22.29,46.49l-270.42,134.42-8.62.31c-91.6-42.21-181.07-89.86-271.7-134.42-18.72-12.06-13.3-43.58,8.5-47.37h0Z"
    />
  </svg>
);

// ============================================================================
// WIDGET DATA
// ============================================================================

const WHO_OPTIONS = [
  {
    id: "government",
    title: "Government Partner",
    subtitle: "National or local government, policy body, or public institution",
    icon: (c) => (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="3" y1="22" x2="21" y2="22" />
        <line x1="6" y1="18" x2="6" y2="11" />
        <line x1="10" y1="18" x2="10" y2="11" />
        <line x1="14" y1="18" x2="14" y2="11" />
        <line x1="18" y1="18" x2="18" y2="11" />
        <polygon points="12 2 20 8 4 8" />
      </svg>
    ),
  },
  {
    id: "investor",
    title: "Investor or Funder",
    subtitle: "Capital deployer, DFI, fund manager, or impact investor",
    icon: (c) => (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
  {
    id: "partner",
    title: "Practitioner or Partner",
    subtitle: "NGO, operator, technical expert, or sector specialist",
    icon: (c) => (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: "entrepreneur",
    title: "Entrepreneur or Founder",
    subtitle: "Early-stage venture, startup, or business building in Ghana",
    icon: (c) => (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    id: "diaspora",
    title: "Diaspora Professional",
    subtitle: "Ghanaian diaspora contributing expertise or capital",
    icon: (c) => (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    id: "media",
    title: "Researcher or Media",
    subtitle: "Academic, journalist, analyst, or policy researcher",
    icon: (c) => (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
];

const SECTOR_OPTIONS = [
  { id: "infrastructure", label: "Infrastructure" },
  { id: "finance", label: "Financial Inclusion" },
  { id: "health", label: "Health Systems" },
  { id: "technology", label: "Technology" },
  { id: "education", label: "Education & Skills" },
  { id: "agriculture", label: "Agriculture" },
  { id: "creative", label: "Sports & Creative" },
  { id: "housing", label: "Housing" },
  { id: "tourism", label: "Tourism" },
  { id: "energy", label: "Energy & Renewables" },
  { id: "manufacturing", label: "Manufacturing" },
  { id: "transport", label: "Transportation" },
];

const GOAL_OPTIONS = {
  government: [
    {
      id: "policy",
      label: "Align with a national policy or programme",
      icon: (c) => (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
    },
    {
      id: "coInvest",
      label: "Explore co-investment or PPP structures",
      icon: (c) => (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      id: "mou",
      label: "Establish an MOU or formal partnership",
      icon: (c) => (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
    },
    {
      id: "sector",
      label: "Commission a sector study or assessment",
      icon: (c) => (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      ),
    },
    {
      id: "data",
      label: "Access sector data and investment reports",
      icon: (c) => (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },
    {
      id: "capacity",
      label: "Build institutional capacity in a key sector",
      icon: (c) => (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
    },
  ],
  investor: [
    {
      id: "portfolio",
      label: "Access BRIDGE's vetted venture pipeline",
      icon: (c) => (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
    },
    {
      id: "fund",
      label: "Understand fund structure and terms",
      icon: (c) => (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
    },
    {
      id: "impact",
      label: "Assess impact returns and ESG alignment",
      icon: (c) => (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4l3 3" />
        </svg>
      ),
    },
    {
      id: "coinvest",
      label: "Co-invest in a specific sector or venture",
      icon: (c) => (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
          <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
          <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
        </svg>
      ),
    },
    {
      id: "diligence",
      label: "Review due diligence materials for a venture",
      icon: (c) => (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      ),
    },
    {
      id: "anchor",
      label: "Become an anchor investor across multiple sectors",
      icon: (c) => (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="5" r="3" />
          <line x1="12" y1="8" x2="12" y2="21" />
          <path d="M5 16H2a10 10 0 0 0 20 0h-3" />
        </svg>
      ),
    },
  ],
  partner: [
    {
      id: "codev",
      label: "Co-develop a venture or programme",
      icon: (c) => (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      ),
    },
    {
      id: "advisory",
      label: "Provide technical advisory to a sector initiative",
      icon: (c) => (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      ),
    },
    {
      id: "research",
      label: "Contribute to sector research or data",
      icon: (c) => (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      ),
    },
    {
      id: "scale",
      label: "Scale a programme through BRIDGE",
      icon: (c) => (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      ),
    },
    {
      id: "embed",
      label: "Embed our tools or platform in BRIDGE initiatives",
      icon: (c) => (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
    },
    {
      id: "capacity2",
      label: "Deliver training or capacity building",
      icon: (c) => (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
          <path d="M22 10v6" />
          <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
        </svg>
      ),
    },
  ],
  entrepreneur: [
    {
      id: "support",
      label: "Get BRIDGE support for my venture",
      icon: (c) => (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
    },
    {
      id: "capital",
      label: "Connect with impact capital",
      icon: (c) => (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
    {
      id: "network",
      label: "Access BRIDGE's partner and government network",
      icon: (c) => (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
    },
    {
      id: "incubate",
      label: "Join an incubation or acceleration pathway",
      icon: (c) => (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
    },
    {
      id: "mentor",
      label: "Connect with a sector mentor or advisor",
      icon: (c) => (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      id: "market",
      label: "Explore market linkages and off-take agreements",
      icon: (c) => (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      ),
    },
  ],
  diaspora: [
    {
      id: "skills",
      label: "Contribute skills or expertise to a sector",
      icon: (c) => (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="8" r="6" />
          <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
        </svg>
      ),
    },
    {
      id: "invest",
      label: "Invest capital in Ghana-based ventures",
      icon: (c) => (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
          <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
          <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
        </svg>
      ),
    },
    {
      id: "connect",
      label: "Connect my network to BRIDGE opportunities",
      icon: (c) => (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      ),
    },
    {
      id: "engage",
      label: "Explore engagement models and return pathways",
      icon: (c) => (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="17 1 21 5 17 9" />
          <path d="M3 11V9a4 4 0 0 1 4-4h14" />
          <polyline points="7 23 3 19 7 15" />
          <path d="M21 13v2a4 4 0 0 1-4 4H3" />
        </svg>
      ),
    },
    {
      id: "property",
      label: "Explore real estate or property investment",
      icon: (c) => (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      id: "mentorD",
      label: "Mentor an early-stage Ghanaian entrepreneur",
      icon: (c) => (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
          <path d="M22 10v6" />
          <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
        </svg>
      ),
    },
  ],
  media: [
    {
      id: "interview",
      label: "Interview a BRIDGE team member",
      icon: (c) => (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="23" />
          <line x1="8" y1="23" x2="16" y2="23" />
        </svg>
      ),
    },
    {
      id: "data",
      label: "Access sector data and research reports",
      icon: (c) => (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },
    {
      id: "collab",
      label: "Explore a research collaboration",
      icon: (c) => (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      ),
    },
    {
      id: "story",
      label: "Cover a BRIDGE initiative or venture",
      icon: (c) => (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0-1.5 2z" />
          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        </svg>
      ),
    },
    {
      id: "embed2",
      label: "Embed BRIDGE content in a publication",
      icon: (c) => (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
    },
    {
      id: "whitepaper",
      label: "Co-author a sector brief or white paper",
      icon: (c) => (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
    },
    {
      id: "event",
      label: "Cover or attend a BRIDGE sector event",
      icon: (c) => (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      id: "podcast",
      label: "Feature BRIDGE in a podcast or media series",
      icon: (c) => (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <polygon points="10 8 16 12 10 16 10 8" />
        </svg>
      ),
    },
  ],
};

const ROUTING = {
  government: { email: "gov@bridgepbc.com", team: "Government Relations", subject: "Government Partnership Inquiry" },
  investor: { email: "invest@bridgepbc.com", team: "Capital & Investments", subject: "Investment Inquiry" },
  partner: { email: "partners@bridgepbc.com", team: "Partnerships", subject: "Partnership & Advisory Inquiry" },
  entrepreneur: { email: "ventures@bridgepbc.com", team: "Venture Development", subject: "Venture Support Inquiry" },
  diaspora: { email: "diaspora@bridgepbc.com", team: "Diaspora Engagement", subject: "Diaspora Engagement Inquiry" },
  media: { email: "media@bridgepbc.com", team: "Research & Communications", subject: "Research / Media Inquiry" },
};

// ============================================================================
// GENERATE MESSAGE
// ============================================================================

const buildMessage = ({ who, sectors, goal, details }) => {
  const whoOption = WHO_OPTIONS.find((o) => o.id === who);
  const goalOptions = GOAL_OPTIONS[who] || [];
  const goalOption = goalOptions.find((o) => o.id === goal);
  const sectorLabels = sectors.map((s) => SECTOR_OPTIONS.find((o) => o.id === s)?.label).filter(Boolean);
  const firstName = details.name ? details.name.split(" ")[0] : null;

  const lines = [];
  lines.push(`I am reaching out as a ${whoOption?.title?.toLowerCase() || "professional"}.`);
  if (sectorLabels.length > 0) {
    lines.push(
      sectorLabels.length === 1
        ? `My focus area is ${sectorLabels[0]}.`
        : `My focus spans ${sectorLabels.slice(0, -1).join(", ")} and ${sectorLabels[sectorLabels.length - 1]}.`,
    );
  }
  if (goalOption) lines.push(`My primary goal is to ${goalOption.label.toLowerCase()}.`);
  if (details.note) lines.push(details.note);
  lines.push("I would welcome the opportunity to discuss how BRIDGE can support this.");
  return lines.join("\n\n");
};

// ============================================================================
// PROGRESS BAR
// ============================================================================

const ProgressBar = ({ step, total }) => (
  <div className="flex gap-[5px] flex-1">
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        className="h-[3px] flex-1 rounded-sm transition-colors duration-[400ms] ease-in-out"
        style={{
          backgroundColor: i <= step ? colors.accent : colors.line,
        }}
      />
    ))}
  </div>
);

// ============================================================================
// STEP COMPONENTS
// ============================================================================

const StepWho = ({ value, onChange, freeText, onFreeText }) => {
  const [hov, setHov] = useState(null);
  const isMobile = useIsMobile();
  return (
    <div>
      <div className={cn(isMobile ? "mb-4" : "mb-7")}>
        <p className="font-[Inter,sans-serif] text-[11px] font-bold text-[#B8D935] uppercase tracking-[2px] mb-2 mt-0 mx-0">
          Step 1 of 4
        </p>
        <h2
          className={cn("font-[Inter,sans-serif] font-light text-[#1B4D3E] tracking-[-0.5px] mb-1 mt-0 leading-[1.2]", isMobile ? "text-[20px]" : "text-[26px]")}
        >
          Who are you reaching out <strong className="font-bold">as?</strong>
        </h2>
        <p className="font-[Inter,sans-serif] text-xs text-[#8A9E98] m-0">
          This routes your message to the right BRIDGE team.
        </p>
      </div>
      <div
        className={cn("grid", isMobile ? "grid-cols-2 gap-1.5 mb-2" : "grid-cols-3 gap-2 mb-2.5")}
      >
        {WHO_OPTIONS.map((opt) => {
          const sel = value === opt.id;
          const hovered = hov === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onChange(opt.id)}
              onMouseEnter={() => setHov(opt.id)}
              onMouseLeave={() => setHov(null)}
              className="flex flex-col items-start gap-2.5 p-3.5 rounded-xl cursor-pointer text-left transition-all duration-200 ease-in-out"
              style={{
                border: `1.5px solid ${sel ? colors.primary : hovered ? "rgba(27,77,62,0.3)" : colors.line}`,
                backgroundColor: sel ? colors.primary : hovered ? "rgba(27,77,62,0.02)" : colors.white,
                transform: !sel && hovered ? "translateY(-1px)" : "none",
                boxShadow: sel ? "0 8px 24px rgba(27,77,62,0.15)" : hovered ? "0 4px 12px rgba(27,77,62,0.06)" : "none",
              }}
            >
              <div
                className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center transition-all duration-200 ease-in-out"
                style={{
                  backgroundColor: sel ? "rgba(184,217,53,0.18)" : colors.background,
                  color: sel ? colors.accent : colors.primary,
                }}
              >
                {opt.icon(sel ? colors.accent : colors.primary)}
              </div>
              <div>
                <div
                  className="font-[Inter,sans-serif] text-xs font-semibold mb-[3px] leading-[1.3]"
                  style={{ color: sel ? colors.white : colors.primary }}
                >
                  {opt.title}
                </div>
                <div
                  className="font-[Inter,sans-serif] text-[10px] leading-[1.45]"
                  style={{ color: sel ? "rgba(255,255,255,0.6)" : colors.muted }}
                >
                  {opt.subtitle}
                </div>
              </div>
            </button>
          );
        })}
      </div>
      <textarea
        placeholder="Or describe your context in your own words…"
        value={freeText || ""}
        onChange={(e) => onFreeText && onFreeText(e.target.value)}
        rows={2}
        className="w-full box-border py-3.5 px-4 rounded-xl font-[Inter,sans-serif] text-[13px] text-[#1B4D3E] outline-none transition-[border-color] duration-200 ease-in-out resize-none leading-[1.6] bg-white"
        style={{ border: `1.5px solid ${colors.line}` }}
        onFocus={(e) => (e.target.style.borderColor = colors.primary)}
        onBlur={(e) => (e.target.style.borderColor = colors.line)}
      />
    </div>
  );
};

const StepSectors = ({ values, onChange, freeText, onFreeText }) => {
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);
  const toggle = (id) => {
    if (values.includes(id)) onChange(values.filter((v) => v !== id));
    else if (values.length < 4) onChange([...values, id]);
  };
  return (
    <div>
      <div className={cn(isMobile ? "mb-3.5" : "mb-7")}>
        <p className="font-[Inter,sans-serif] text-[11px] font-bold text-[#B8D935] uppercase tracking-[2px] mb-2 mt-0 mx-0">
          Step 2 of 4
        </p>
        <h2
          className={cn("font-[Inter,sans-serif] font-light text-[#1B4D3E] tracking-[-0.5px] mb-1 mt-0 leading-[1.2]", isMobile ? "text-[20px]" : "text-[26px]")}
        >
          Which sectors are you <strong className="font-bold">focused on?</strong>
        </h2>
        <p className="font-[Inter,sans-serif] text-xs text-[#8A9E98] m-0">
          Select up to 4 — or skip if you're not sure yet.
        </p>
      </div>
      <div
        className={cn("grid gap-1.5 mb-2", isMobile ? "grid-cols-3" : "grid-cols-4")}
      >
        {SECTOR_OPTIONS.map((opt, i) => {
          const sel = values.includes(opt.id);
          const disabled = !sel && values.length >= 4;
          const iconFn = SectorIcons[opt.id];
          return (
            <button
              key={opt.id}
              onClick={() => !disabled && toggle(opt.id)}
              className="flex flex-col items-center justify-center gap-1.5 py-2 px-1.5 h-16 rounded-[10px] text-center transition-all duration-[250ms] ease-in-out"
              style={{
                border: `1.5px solid ${sel ? colors.primary : colors.line}`,
                backgroundColor: sel ? colors.primary : disabled ? "rgba(243,245,242,0.4)" : colors.white,
                cursor: disabled ? "not-allowed" : "pointer",
                opacity: disabled ? 0.4 : 1,
                animation: mounted ? `chipIn 0.35s cubic-bezier(0.175,0.885,0.32,1.275) ${i * 30}ms both` : "none",
              }}
            >
              <span className="flex shrink-0" style={{ color: sel ? colors.accent : colors.primary }}>
                {iconFn ? iconFn(sel ? colors.accent : colors.primary, 14) : null}
              </span>
              <span
                className="font-[Inter,sans-serif] text-[10px] leading-[1.2]"
                style={{
                  fontWeight: sel ? "600" : "500",
                  color: sel ? colors.white : colors.primary,
                }}
              >
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>
      {values.length > 0 && (
        <div className="flex items-center gap-[7px] mt-1 mb-2.5">
          <span className="w-[5px] h-[5px] rounded-full bg-[#B8D935]" />
          <span className="font-[Inter,sans-serif] text-[11px] text-[#5C7A1F] font-semibold">
            {values.length} sector{values.length > 1 ? "s" : ""} selected
          </span>
        </div>
      )}
      {!values.length && <div className="mt-2.5" />}
      <textarea
        placeholder="Or describe the sectors or topics you care about…"
        value={freeText || ""}
        onChange={(e) => onFreeText && onFreeText(e.target.value)}
        rows={2}
        className="w-full box-border py-3.5 px-4 rounded-xl font-[Inter,sans-serif] text-[13px] text-[#1B4D3E] outline-none transition-[border-color] duration-200 ease-in-out resize-none leading-[1.6] bg-white"
        style={{ border: `1.5px solid ${colors.line}` }}
        onFocus={(e) => (e.target.style.borderColor = colors.primary)}
        onBlur={(e) => (e.target.style.borderColor = colors.line)}
      />
    </div>
  );
};

const StepGoal = ({ whoId, value, onChange, freeText, onFreeText }) => {
  const [hov, setHov] = useState(null);
  const isMobile = useIsMobile();
  const options = GOAL_OPTIONS[whoId] || GOAL_OPTIONS["partner"];
  return (
    <div>
      <div className={cn(isMobile ? "mb-3.5" : "mb-7")}>
        <p className="font-[Inter,sans-serif] text-[11px] font-bold text-[#B8D935] uppercase tracking-[2px] mb-2 mt-0 mx-0">
          Step 3 of 4
        </p>
        <h2
          className={cn("font-[Inter,sans-serif] font-light text-[#1B4D3E] tracking-[-0.5px] mb-1 mt-0 leading-[1.2]", isMobile ? "text-[20px]" : "text-[26px]")}
        >
          What's your <strong className="font-bold">primary goal?</strong>
        </h2>
        <p className="font-[Inter,sans-serif] text-xs text-[#8A9E98] m-0">
          Pick the one that best describes what you're here for.
        </p>
      </div>
      <div className={cn("grid gap-2", isMobile ? "grid-cols-1" : "grid-cols-2")}>
        {options.map((opt) => {
          const sel = value === opt.id;
          const hovered = hov === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onChange(opt.id)}
              onMouseEnter={() => setHov(opt.id)}
              onMouseLeave={() => setHov(null)}
              className="flex items-center gap-2.5 py-3 px-3.5 rounded-[10px] cursor-pointer text-left transition-all duration-200 ease-in-out"
              style={{
                border: `1.5px solid ${sel ? colors.primary : hovered ? "rgba(27,77,62,0.25)" : colors.line}`,
                backgroundColor: sel ? colors.primary : hovered ? "rgba(27,77,62,0.02)" : colors.white,
                boxShadow: sel ? "0 6px 20px rgba(27,77,62,0.12)" : "none",
              }}
            >
              <span className="flex shrink-0" style={{ color: sel ? colors.accent : colors.primary }}>
                {typeof opt.icon === "function" ? opt.icon(sel ? colors.accent : colors.primary) : opt.icon}
              </span>
              <span
                className="font-[Inter,sans-serif] text-xs flex-1 leading-[1.35]"
                style={{
                  fontWeight: sel ? "600" : "500",
                  color: sel ? colors.white : colors.primary,
                }}
              >
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>
      <textarea
        placeholder="Or describe your goal in your own words…"
        value={freeText || ""}
        onChange={(e) => onFreeText && onFreeText(e.target.value)}
        rows={3}
        className="w-full box-border mt-2.5 py-3.5 px-4 rounded-xl font-[Inter,sans-serif] text-[13px] text-[#1B4D3E] outline-none transition-[border-color] duration-200 ease-in-out resize-none leading-[1.6] bg-white"
        style={{ border: `1.5px solid ${colors.line}` }}
        onFocus={(e) => (e.target.style.borderColor = colors.primary)}
        onBlur={(e) => (e.target.style.borderColor = colors.line)}
      />
    </div>
  );
};

const StepDetails = ({ values, onChange }) => {
  const isMobile = useIsMobile();
  const inpClassName = "w-full py-[13px] px-[15px] rounded-xl text-sm font-[Inter,sans-serif] outline-none box-border transition-[border-color] duration-200 ease-in-out";
  const inpStyle: React.CSSProperties = {
    border: `1.5px solid ${colors.line}`,
    backgroundColor: colors.white,
    color: colors.dark,
  };
  const lblClassName = "font-[Inter,sans-serif] text-[11px] font-bold block mb-[7px] uppercase tracking-[0.5px]";
  const lblStyle: React.CSSProperties = {
    color: colors.primary,
  };
  return (
    <div>
      <div className={cn(isMobile ? "mb-4" : "mb-7")}>
        <p className="font-[Inter,sans-serif] text-[11px] font-bold text-[#B8D935] uppercase tracking-[2px] mb-2 mt-0 mx-0">
          Step 4 of 4
        </p>
        <h2
          className={cn("font-[Inter,sans-serif] font-light text-[#1B4D3E] tracking-[-0.5px] mb-1 mt-0 leading-[1.2]", isMobile ? "text-[20px]" : "text-[26px]")}
        >
          Almost there — <strong className="font-bold">your details</strong>
        </h2>
        <p className="font-[Inter,sans-serif] text-xs text-[#8A9E98] m-0">
          We'll use this to send you a tailored follow-up.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <div className={cn("grid gap-3", isMobile ? "grid-cols-1" : "grid-cols-2")}>
          <div>
            <label className={lblClassName} style={lblStyle}>Full Name *</label>
            <input
              type="text"
              placeholder="e.g. Kwame Asante"
              value={values.name}
              onChange={(e) => onChange({ ...values, name: e.target.value })}
              className={inpClassName} style={inpStyle}
            />
          </div>
          <div>
            <label className={lblClassName} style={lblStyle}>Email *</label>
            <input
              type="email"
              placeholder="kwame@example.com"
              value={values.email}
              onChange={(e) => onChange({ ...values, email: e.target.value })}
              className={inpClassName} style={inpStyle}
            />
          </div>
        </div>
        <div>
          <label className={lblClassName} style={lblStyle}>
            Organization <span className="font-normal normal-case opacity-60">— optional</span>
          </label>
          <input
            type="text"
            placeholder="Your company, ministry, or institution"
            value={values.organization}
            onChange={(e) => onChange({ ...values, organization: e.target.value })}
            className={inpClassName} style={inpStyle}
          />
        </div>
        <div>
          <label className={lblClassName} style={lblStyle}>
            Additional context{" "}
            <span className="font-normal normal-case opacity-60">— optional</span>
          </label>
          <textarea
            placeholder="Any context, constraints, or questions for BRIDGE..."
            rows={3}
            value={values.note}
            onChange={(e) => onChange({ ...values, note: e.target.value })}
            className={cn(inpClassName, "resize-y leading-[1.6]")}
            style={inpStyle}
          />
        </div>
      </div>
    </div>
  );
};

// ── Email Preview ──────────────────────────────────────────────────────────

const EmailPreview = ({ who, sectors, goal, details }) => {
  const routing = ROUTING[who] || { email: "info@bridgepbc.com", team: "BRIDGE Team", subject: "New Inquiry" };
  const whoOption = WHO_OPTIONS.find((o) => o.id === who);
  const goalOptions = GOAL_OPTIONS[who] || [];
  const goalOption = goalOptions.find((o) => o.id === goal);
  const sectorLabels = sectors.map((s) => SECTOR_OPTIONS.find((o) => o.id === s)?.label).filter(Boolean);
  const message = buildMessage({ who, sectors, goal, details });

  return (
    <div>
      <div className="mb-6">
        <p className="font-[Inter,sans-serif] text-[11px] font-bold text-[#B8D935] uppercase tracking-[2px] mt-0 mx-0 mb-2.5">
          Email Preview
        </p>
        <h2 className="font-[Inter,sans-serif] text-[26px] font-light text-[#1B4D3E] tracking-[-0.5px] mt-0 mb-1.5 leading-[1.2]">
          Here's exactly <strong className="font-bold">what we'll send</strong>
        </h2>
        <p className="font-[Inter,sans-serif] text-[13px] text-[#8A9E98] m-0">
          Auto-routed to <span className="text-[#1B4D3E] font-semibold">{routing.team}</span> at BRIDGE.
          Review before sending.
        </p>
      </div>

      {/* Mock email client */}
      <div
        className="rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(27,77,62,0.07)]"
        style={{ border: `1.5px solid ${colors.line}` }}
      >
        {/* Email toolbar */}
        <div
          className="bg-[#f6f6f6] py-2.5 px-4 flex items-center gap-1.5"
          style={{ borderBottom: `1px solid ${colors.line}` }}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          <span className="font-[Inter,sans-serif] text-[11px] text-[#8A9E98] ml-2.5 tracking-[0.3px]">
            New Message — BRIDGE PBC
          </span>
        </div>

        {/* Email metadata */}
        <div className="bg-white py-4 px-5" style={{ borderBottom: `1px solid ${colors.line}` }}>
          {[
            { label: "To", value: `${routing.team} <${routing.email}>` },
            {
              label: "From",
              value: details.email ? `${details.name || "Sender"} <${details.email}>` : "Awaiting your details",
            },
            { label: "Subject", value: routing.subject },
          ].map((row) => (
            <div key={row.label} className="flex items-baseline gap-3 mb-1.5">
              <span className="font-[Inter,sans-serif] text-[11px] font-bold text-[#8A9E98] uppercase tracking-[0.5px] w-[52px] shrink-0">
                {row.label}
              </span>
              <span
                className="font-[Inter,sans-serif] text-[13px] text-[#1B4D3E]"
                style={{ fontWeight: row.label === "Subject" ? "600" : "400" }}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>

        {/* Email body */}
        <div className="bg-white p-5 pt-6">
          {/* BRIDGE letterhead */}
          <div
            className="flex items-center gap-2.5 mb-5 pb-4"
            style={{ borderBottom: `1px solid ${colors.line}` }}
          >
            <BridgeMarkSmall />
            <div>
              <div className="font-[Inter,sans-serif] text-xs font-bold text-[#1B4D3E]">
                BRIDGE PBC — Inquiry
              </div>
              <div className="font-[Inter,sans-serif] text-[11px] text-[#8A9E98]">
                Blending Resources and Innovation to Drive Ghana's Empowerment
              </div>
            </div>
          </div>

          {/* Profile tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {whoOption && (
              <span className="font-[Inter,sans-serif] text-[11px] font-bold py-[3px] px-2.5 rounded-full bg-[#1B4D3E] text-white">
                {whoOption.title}
              </span>
            )}
            {sectorLabels.map((s) => (
              <span
                key={s}
                className="font-[Inter,sans-serif] text-[11px] font-semibold py-[3px] px-2.5 rounded-full bg-[#E8F5E0] text-[#5C7A1F]"
              >
                {s}
              </span>
            ))}
            {goalOption && (
              <span
                className="font-[Inter,sans-serif] text-[11px] font-semibold py-[3px] px-2.5 rounded-full text-[#1B4D3E]"
                style={{ border: `1px solid ${colors.line}` }}
              >
                {goalOption.icon}{" "}
                {goalOption.label.length > 30 ? goalOption.label.slice(0, 30) + "…" : goalOption.label}
              </span>
            )}
          </div>

          {/* Message body */}
          <div className="font-[Inter,sans-serif] text-[13px] text-[#3a4e48] leading-[1.8] whitespace-pre-line">
            {message}
          </div>

          {/* Org line */}
          {details.organization && (
            <div
              className="mt-4 pt-3.5 font-[Inter,sans-serif] text-xs text-[#8A9E98]"
              style={{ borderTop: `1px solid ${colors.line}` }}
            >
              Organization: <span className="text-[#1B4D3E] font-semibold">{details.organization}</span>
            </div>
          )}

          {/* Footer */}
          <div
            className="mt-5 pt-3.5 font-[Inter,sans-serif] text-[11px] text-[#8A9E98]"
            style={{ borderTop: `1px solid ${colors.line}` }}
          >
            Submitted via bridgepbc.com/contact ·{" "}
            {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── What Happens Next (post-success timeline) ─────────────────────────────

const WhatHappensNext = ({ name, who }) => {
  const routing = ROUTING[who] || { team: "BRIDGE Team" };
  const firstName = name ? name.split(" ")[0] : "there";
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  const steps = [
    {
      icon: "📬",
      time: "Within 48 hours",
      title: "Personal response",
      body: `${routing.team} will review your inquiry and send a personal reply — not a template.`,
    },
    {
      icon: "🎯",
      time: "Days 3–7",
      title: "Alignment call",
      body: "We schedule a focused 30-minute call to understand your specific context and goals.",
    },
    {
      icon: "📄",
      time: "Within 2 weeks",
      title: "Tailored proposal",
      body: "You receive a tailored engagement pathway — whether that's a partnership, investment brief, or next step.",
    },
  ];

  return (
    <div className="pt-2">
      {/* Success header */}
      <div className="text-center mb-9">
        <div
          className="w-[72px] h-[72px] rounded-full bg-[#E8F5E0] flex items-center justify-center mx-auto mb-5 animate-[popIn_0.45s_cubic-bezier(0.175,0.885,0.32,1.275)]"
          style={{ border: `2.5px solid ${colors.accent}` }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke={colors.primary}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="font-[Inter,sans-serif] text-[26px] font-bold text-[#1B4D3E] mt-0 mb-2 tracking-[-0.5px]">
          Message sent, {firstName}.
        </h2>
        <p className="font-[Inter,sans-serif] text-sm text-[#8A9E98] m-0 leading-[1.6] max-w-[320px] mx-auto">
          Your inquiry is now with the {routing.team} team. Here's what to expect next.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div
          className="absolute left-[19px] top-6 w-0.5 bottom-6 rounded-sm"
          style={{ background: `linear-gradient(to bottom, ${colors.accent}, rgba(184,217,53,0.1))` }}
        />

        {steps.map((step, i) => (
          <div
            key={i}
            className="flex gap-4"
            style={{
              marginBottom: i < steps.length - 1 ? "24px" : "0",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(12px)",
              transition: `opacity 0.45s ease ${i * 120 + 100}ms, transform 0.45s ease ${i * 120 + 100}ms`,
            }}
          >
            {/* Node */}
            <div
              className="w-10 h-10 rounded-full shrink-0 bg-white flex items-center justify-center text-base leading-none z-[1]"
              style={{
                border: `2px solid ${colors.accent}`,
                boxShadow: `0 0 0 4px ${colors.accentLight}`,
              }}
            >
              {step.icon}
            </div>
            {/* Content */}
            <div
              className="flex-1 bg-[#F3F5F2] rounded-[14px] py-3.5 px-[18px]"
              style={{ border: `1px solid ${colors.line}` }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="font-[Inter,sans-serif] text-[13px] font-bold text-[#1B4D3E]">
                  {step.title}
                </span>
                <span className="font-[Inter,sans-serif] text-[10px] font-bold text-[#5C7A1F] bg-[#E8F5E0] py-0.5 px-2 rounded-full uppercase tracking-[0.5px]">
                  {step.time}
                </span>
              </div>
              <p className="font-[Inter,sans-serif] text-[13px] text-[#5a6a64] leading-[1.6] m-0">
                {step.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// GUIDED WIDGET (embedded into the floating card)
// ============================================================================

const GuidedWidget = () => {
  const isMobile = useIsMobile();
  // Steps: 0=who, 1=sectors, 2=goal, 3=details, 4=emailPreview, 5=success
  const TOTAL_STEPS = 5;

  // Pre-fill from URL params (e.g. from Intelligence Pro Access CTA)
  const isProAccess = typeof window !== "undefined"
    ? new URLSearchParams(window.location.search).get("note") === "BRIDGE Intelligence Pro Access Request"
    : false;
  const prefillNote = typeof window !== "undefined"
    ? new URLSearchParams(window.location.search).get("note") || ""
    : "";

  const [step, setStep] = useState(() => isProAccess ? 1 : 0);
  const [dir, setDir] = useState("fwd");
  const [anim, setAnim] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hovBtn, setHovBtn] = useState(false);

  const [who, setWho] = useState<string | null>(isProAccess ? "investor" : null);
  const [whoFreeText, setWhoFreeText] = useState("");
  const [sectors, setSectors] = useState([]);
  const [sectorFreeText, setSectorFreeText] = useState("");
  const [goal, setGoal] = useState(null);
  const [goalFreeText, setGoalFreeText] = useState("");
  const [details, setDetails] = useState({ name: "", email: "", organization: "", note: prefillNote });

  const canNext = () => {
    if (step === 0) return !!who || whoFreeText.trim().length > 0;
    if (step === 1) return sectors.length > 0 || sectorFreeText.trim().length > 0;
    if (step === 2) return !!goal || goalFreeText.trim().length > 0;
    if (step === 3) return !!(details.name && details.email);
    return true;
  };

  const go = (d) => {
    if (anim) return;
    setDir(d);
    setAnim(true);
    setTimeout(() => {
      if (d === "fwd" && step < TOTAL_STEPS - 1) setStep((s) => s + 1);
      if (d === "bk" && step > 0) setStep((s) => s - 1);
      setAnim(false);
    }, 200);
  };

  const stepLabels = ["Who you are", "Your focus", "Your goal", "Your details", "Email preview"];

  const leftPanel = (
    <div
      className={cn("bg-[#F3F5F2] flex flex-col", isMobile ? "py-[22px] px-[18px] min-h-[480px]" : "pt-11 px-11 pb-8 min-h-[560px]")}
    >
      {/* Top bar */}
      <div className="flex items-center gap-3 mb-7">
        <BridgeMarkSmall />
        <div className="flex-1">
          <div className="flex justify-between items-center mb-[5px]">
            <span className="font-[Inter,sans-serif] text-[11px] font-semibold text-[#8A9E98]">
              {submitted ? "Complete" : step < 5 ? stepLabels[step] : "Done"}
            </span>
            <span className="font-[Inter,sans-serif] text-[11px] font-bold text-[#1B4D3E]">
              {Math.min(step + 1, 5)}/5
            </span>
          </div>
          <ProgressBar step={submitted ? 4 : step} total={5} />
        </div>
      </div>

      {/* Step content */}
      <div
        className="flex-1"
        style={{
          animation: anim
            ? dir === "fwd"
              ? "slideOutFwd 0.2s ease forwards"
              : "slideOutBk 0.2s ease forwards"
            : dir === "fwd"
              ? "slideInFwd 0.28s ease forwards"
              : "slideInBk 0.28s ease forwards",
        }}
      >
        {submitted ? (
          <WhatHappensNext name={details.name} who={who} />
        ) : step === 0 ? (
          <StepWho value={who} onChange={setWho} freeText={whoFreeText} onFreeText={setWhoFreeText} />
        ) : step === 1 ? (
          <StepSectors
            values={sectors}
            onChange={setSectors}
            freeText={sectorFreeText}
            onFreeText={setSectorFreeText}
          />
        ) : step === 2 ? (
          <StepGoal whoId={who} value={goal} onChange={setGoal} freeText={goalFreeText} onFreeText={setGoalFreeText} />
        ) : step === 3 ? (
          <StepDetails values={details} onChange={setDetails} />
        ) : (
          <EmailPreview who={who} sectors={sectors} goal={goal} details={details} />
        )}
      </div>

      {/* Navigation */}
      {!submitted && (
        <div
          className="flex items-center justify-between gap-2.5 mt-7 pt-5"
          style={{ borderTop: `1px solid ${colors.line}` }}
        >
          {step > 0 ? (
            <button
              onClick={() => go("bk")}
              className="flex items-center gap-1.5 py-[11px] px-[18px] rounded-full bg-transparent text-[#1B4D3E] font-[Inter,sans-serif] text-[13px] font-semibold cursor-pointer"
              style={{ border: `1.5px solid ${colors.line}` }}
            >
              <IconArrowLeft /> Back
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2.5">
            {step < 4 ? (
              <button
                onClick={() => canNext() && go("fwd")}
                onMouseEnter={() => setHovBtn(true)}
                onMouseLeave={() => setHovBtn(false)}
                className="flex items-center gap-[9px] py-[13px] px-6 rounded-full border-none font-[Inter,sans-serif] text-[13px] font-semibold transition-all duration-[250ms] ease-in-out"
                style={{
                  backgroundColor: canNext() ? colors.primary : colors.line,
                  color: canNext() ? colors.white : colors.muted,
                  cursor: canNext() ? "pointer" : "not-allowed",
                  transform: canNext() && hovBtn ? "translateY(-1px)" : "none",
                  boxShadow: canNext() && hovBtn ? "0 6px 18px rgba(27,77,62,0.2)" : "none",
                }}
              >
                {step === 3 ? "Preview Email" : "Continue"}
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: canNext() ? colors.accent : "rgba(255,255,255,0.2)" }}
                >
                  <IconArrowRight size={11} />
                </span>
              </button>
            ) : (
              <button
                onClick={() => setSubmitted(true)}
                onMouseEnter={() => setHovBtn(true)}
                onMouseLeave={() => setHovBtn(false)}
                className="flex items-center gap-[9px] py-[13px] px-6 rounded-full border-none font-[Inter,sans-serif] text-[13px] font-bold cursor-pointer transition-all duration-[250ms] ease-in-out"
                style={{
                  backgroundColor: hovBtn ? colors.accent : colors.primary,
                  color: hovBtn ? colors.primary : colors.white,
                  transform: hovBtn ? "translateY(-1px)" : "none",
                  boxShadow: hovBtn ? "0 8px 24px rgba(184,217,53,0.3)" : "0 4px 14px rgba(27,77,62,0.15)",
                }}
              >
                Send to BRIDGE
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-[250ms]"
                  style={{ backgroundColor: hovBtn ? colors.primary : colors.accent }}
                >
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={hovBtn ? colors.white : colors.primary}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                </span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const INQUIRY_CARDS = [
    {
      title: "Government & Institutional",
      description:
        "Policy implementation, co-investment frameworks, and sector initiatives aligned with Ghana's national development agenda.",
      email: "gov@bridgepbc.com",
    },
    {
      title: "Investors & Capital Partners",
      description:
        "Portfolio pipeline, fund structures, and impact investment opportunities across all 12 integrated sectors.",
      email: "invest@bridgepbc.com",
    },
    {
      title: "Partners & Practitioners",
      description:
        "Co-develop ventures, provide technical advisory, or bring specialized expertise to active sector initiatives.",
      email: "partners@bridgepbc.com",
    },
    {
      title: "Communities & Citizens",
      description:
        "Sector programs in your area, community ventures, and how BRIDGE's work creates opportunity in your region.",
      email: "community@bridgepbc.com",
    },
  ];
  const [cardIndex, setCardIndex] = useState(0);
  const [cardAnim, setCardAnim] = useState(false);
  const [cardDir, setCardDir] = useState("fwd");

  const cycleCard = (d) => {
    if (cardAnim) return;
    setCardDir(d);
    setCardAnim(true);
    setTimeout(() => {
      setCardIndex((i) =>
        d === "fwd" ? (i + 1) % INQUIRY_CARDS.length : (i - 1 + INQUIRY_CARDS.length) % INQUIRY_CARDS.length,
      );
      setCardAnim(false);
    }, 180);
  };

  const rightPanel = (
    <div
      className={cn("bg-[#2E5A4D] flex flex-col justify-between", isMobile ? "py-7 px-[22px]" : "p-11")}
    >
      {/* Top: contact info — original style */}
      <div>
        <div className="inline-flex items-center gap-[7px] border border-white/15 rounded-full py-[7px] px-3.5 mb-6 bg-white/[0.07]">
          <span className="font-[Inter,sans-serif] text-[10px] font-bold text-[#B8D935] uppercase tracking-[2px]">
            Contact Information
          </span>
        </div>
        <h3 className="font-[Inter,sans-serif] text-[22px] font-light text-white leading-[1.3] tracking-[-0.3px] mt-0 mb-7">
          Reach us <strong className="font-bold">directly</strong>
        </h3>

        {[
          { icon: <IconMail size={18} />, label: "General Inquiries", value: "info@bridgepbc.com" },
          { icon: <IconMapPin size={18} />, label: "Location", value: "Accra, Ghana" },
          { icon: <IconClock size={18} />, label: "Response Time", value: "Within 48 business hours" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-start gap-3.5 mb-5"
          >
            <div className="w-9 h-9 rounded-[9px] bg-white/10 flex items-center justify-center shrink-0 text-[#B8D935]">
              {item.icon}
            </div>
            <div>
              <div className="font-[Inter,sans-serif] text-[10px] font-bold text-white/45 uppercase tracking-[0.5px] mb-0.5">
                {item.label}
              </div>
              <div className="font-[Inter,sans-serif] text-[13px] font-medium text-white">
                {item.value}
              </div>
            </div>
          </div>
        ))}

        <div className="h-px bg-white/10 my-6" />

        {/* What to expect */}
        <div>
          <div className="font-[Inter,sans-serif] text-[10px] font-bold text-[#B8D935] uppercase tracking-[1.5px] mb-3.5">
            What to Expect
          </div>
          {[
            "Personal response from the relevant team lead",
            "A focused 30-min alignment call",
            "Tailored proposal or pathway within 2 weeks",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2.5 mb-2.5">
              <div
                className="w-5 h-5 rounded-full shrink-0 mt-px bg-[rgba(184,217,53,0.18)] flex items-center justify-center text-[#B8D935]"
                style={{ border: `1.5px solid ${colors.accent}` }}
              >
                <IconCheck size={9} />
              </div>
              <span className="font-[Inter,sans-serif] text-[13px] text-white/[0.72] leading-[1.55]">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: inquiry card carousel */}
      <div className="mt-7">
        <div className="h-px bg-white/10 mb-5" />

        {/* Card content */}
        <div
          className="mb-4 min-h-[88px]"
          style={{
            animation: cardAnim
              ? cardDir === "fwd"
                ? "slideOutFwd 0.18s ease forwards"
                : "slideOutBk 0.18s ease forwards"
              : cardDir === "fwd"
                ? "slideInFwd 0.22s ease forwards"
                : "slideInBk 0.22s ease forwards",
          }}
        >
          <div className="font-[Inter,sans-serif] text-sm font-bold text-white mb-[7px] leading-[1.3]">
            {INQUIRY_CARDS[cardIndex].title}
          </div>
          <div className="font-[Inter,sans-serif] text-[13px] text-white/55 leading-[1.65] mb-2.5">
            {INQUIRY_CARDS[cardIndex].description}
          </div>
          <div className="font-[Inter,sans-serif] text-xs font-semibold text-[#B8D935]">
            {INQUIRY_CARDS[cardIndex].email}
          </div>
        </div>

        {/* Nav row */}
        <div className="flex items-center justify-between">
          <div className="flex gap-[5px] items-center">
            {INQUIRY_CARDS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (i !== cardIndex) {
                    setCardDir(i > cardIndex ? "fwd" : "bk");
                    setCardAnim(true);
                    setTimeout(() => {
                      setCardIndex(i);
                      setCardAnim(false);
                    }, 180);
                  }
                }}
                className="h-[5px] rounded-[3px] border-none cursor-pointer p-0 transition-all duration-300 ease-in-out"
                style={{
                  width: i === cardIndex ? "16px" : "5px",
                  backgroundColor: i === cardIndex ? colors.accent : "rgba(255,255,255,0.25)",
                }}
              />
            ))}
          </div>
          <div className="flex gap-1.5">
            {[
              { d: "bk", path: "M19 12H5M12 5l-7 7 7 7" },
              { d: "fwd", path: "M5 12h14M12 5l7 7-7 7" },
            ].map((btn) => (
              <button
                key={btn.d}
                onClick={() => cycleCard(btn.d)}
                className="w-7 h-7 rounded-full border border-white/20 bg-white/[0.07] flex items-center justify-center cursor-pointer text-white/70 transition-all duration-200 ease-in-out"
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={btn.path} />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={cn("grid rounded-[28px] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.14)]", isMobile ? "grid-cols-1" : "grid-cols-[1.15fr_0.85fr]")}
    >
      {leftPanel}
      {!isMobile && rightPanel}
      {isMobile && (
        <div className="bg-[#2E5A4D] py-[18px] px-5 flex items-center justify-between">
          <span className="font-[Inter,sans-serif] text-xs text-white/70">
            Questions?
          </span>
          <a
            href="mailto:info@bridgepbc.com"
            className="font-[Inter,sans-serif] text-[13px] font-semibold text-[#B8D935] no-underline"
          >
            info@bridgepbc.com
          </a>
        </div>
      )}
    </div>
  );
};

// ── Header is now shared (SiteHeader)

// ============================================================================
// FOOTER — exact spec build
// ============================================================================

const HeroSection = () => {
  const isMobile = useIsMobile();
  return (
    <section
      className={cn("bg-white relative overflow-hidden", isMobile ? "pt-16 px-5 pb-10" : "pt-[100px] px-20 pb-[120px]")}
    >
      <div
        className="absolute -top-[60px] -right-[60px] w-[480px] h-[480px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(184,217,53,0.08)_0%,transparent_70%)]"
      />
      <div className="relative mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        <div
          className="inline-flex items-center gap-2 bg-white rounded-full py-2.5 px-5 mb-8"
          style={{ border: `1px solid ${colors.line}` }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#B8D935]" />
          <span className="font-[Inter,sans-serif] text-[11px] font-bold text-[#1B4D3E] uppercase tracking-[2px]">
            Contact Us
          </span>
        </div>
        <div className={cn(isMobile ? "max-w-full" : "max-w-[680px]")}>
          <h1
            className={cn("font-[Inter,sans-serif] font-light text-[#1B4D3E] leading-[1.1] tracking-[-1px] mt-0 mb-6", isMobile ? "text-4xl" : "text-[60px]")}
          >
            Let's build something <strong className="font-bold">meaningful</strong> together
          </h1>
          <p
            className={cn("font-[Inter,sans-serif] text-[#5a6a64] leading-[1.75] m-0", isMobile ? "text-base" : "text-lg")}
          >
            Whether you're a government partner, investor, practitioner, or community leader — BRIDGE is built for
            collaboration. Tell us who you are and we'll route you to exactly the right team.
          </p>
        </div>
      </div>
    </section>
  );
};

const InquiryTypesSection = () => {
  const isMobile = useIsMobile();
  const [hov, setHov] = useState(null);
  const inquiryTypes = [
    {
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="22" x2="21" y2="22" />
          <line x1="6" y1="18" x2="6" y2="11" />
          <line x1="10" y1="18" x2="10" y2="11" />
          <line x1="14" y1="18" x2="14" y2="11" />
          <line x1="18" y1="18" x2="18" y2="11" />
          <polygon points="12 2 20 8 4 8" />
        </svg>
      ),
      title: "Government & Institutional",
      description:
        "Policy implementation, co-investment frameworks, and sector initiatives aligned with Ghana's national development agenda.",
      email: "gov@bridgepbc.com",
    },
    {
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </svg>
      ),
      title: "Investors & Capital Partners",
      description:
        "Portfolio pipeline, fund structures, and impact investment opportunities across all 12 integrated sectors.",
      email: "invest@bridgepbc.com",
    },
    {
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: "Partners & Practitioners",
      description:
        "Co-develop ventures, provide technical advisory, or bring specialized expertise to active sector initiatives.",
      email: "partners@bridgepbc.com",
    },
    {
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: "Communities & Citizens",
      description:
        "Sector programs in your area, community ventures, and how BRIDGE's work creates opportunity in your region.",
      email: "community@bridgepbc.com",
    },
  ];
  return (
    <section className={cn("bg-[#F3F5F2]", isMobile ? "py-10 px-5" : "py-14 px-20")}>
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        <div className={cn("grid gap-3", isMobile ? "grid-cols-1" : "grid-cols-2")}>
          {inquiryTypes.map((item, i) => (
            <div
              key={i}
              onMouseEnter={() => setHov(i)}
              onMouseLeave={() => setHov(null)}
              className="bg-white rounded-2xl py-[22px] px-6 transition-all duration-200 ease-in-out cursor-default"
              style={{
                border: `1px solid ${hov === i ? "rgba(27,77,62,0.25)" : colors.line}`,
                boxShadow: hov === i ? "0 6px 24px rgba(27,77,62,0.07)" : "none",
              }}
            >
              {/* Icon + Title inline */}
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-8 h-8 rounded-lg shrink-0 bg-[#F3F5F2] flex items-center justify-center text-[#1B4D3E]">
                  {item.icon}
                </div>
                <h3 className="font-[Inter,sans-serif] text-[15px] font-semibold text-[#1B4D3E] m-0 leading-[1.2]">
                  {item.title}
                </h3>
              </div>
              {/* Description */}
              <p className="font-[Inter,sans-serif] text-[13px] text-[#6a7e78] leading-[1.65] mt-0 mb-3.5 mx-0 pl-[42px]">
                {item.description}
              </p>
              {/* Email */}
              <div className="flex items-center gap-[7px] pl-[42px]">
                <span className="text-[#8A9E98] flex opacity-70">
                  <IconMail size={14} />
                </span>
                <span className="font-[Inter,sans-serif] text-xs font-semibold text-[#8A9E98]">
                  {item.email}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Embedded Widget Section ──────────────────────────────────────────────

const WidgetSection = () => {
  const isMobile = useIsMobile();
  return (
    <section className={cn("bg-white", isMobile ? "pt-0" : "pt-[200px]")}>
      <div
        className={cn("bg-[#1B4D3E] relative overflow-visible", isMobile ? "pt-8 pb-12" : "pt-[260px] pb-[240px]")}
      >
        {/* Floating widget card */}
        <div
          style={{
            position: isMobile ? "relative" : "absolute",
            top: isMobile ? undefined : "-180px",
            left: isMobile ? undefined : "50%",
            transform: isMobile ? undefined : "translateX(-50%)",
            width: isMobile ? "calc(100% - 32px)" : `min(${CONTENT_MAX_WIDTH}, calc(100% - 160px))`,
            margin: isMobile ? "0 auto" : undefined,
          }}
        >
          <GuidedWidget />
        </div>

        {/* Stats row */}
        <div
          className={cn("mx-auto grid grid-cols-3 gap-8", isMobile ? "hidden" : "grid")}
          style={{ maxWidth: CONTENT_MAX_WIDTH }}
        >
          {[
            { number: "12", label: "Integrated Sectors", sub: "Agriculture to Transportation" },
            { number: "174+", label: "Ventures in Pipeline", sub: "$135–259M potential capital" },
            { number: "48h", label: "Response Commitment", sub: "Every inquiry, every time" },
          ].map((stat) => (
            <div key={stat.number} className="text-center">
              <div className="font-[Inter,sans-serif] text-[48px] font-bold text-[#B8D935] leading-none mb-2">
                {stat.number}
              </div>
              <div className="font-[Inter,sans-serif] text-sm font-semibold text-white mb-1">
                {stat.label}
              </div>
              <div className="font-[Inter,sans-serif] text-xs text-white/45">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function ContactPage() {
  return (
    <Layout>
    <div className="font-[Inter,sans-serif] m-0 p-0">
      <style>{`

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { margin: 0; }
        input:focus, select:focus, textarea:focus {
          border-color: #1B4D3E !important;
          outline: none;
          box-shadow: 0 0 0 3px rgba(27,77,62,0.08);
        }
        @keyframes slideInFwd {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideOutFwd {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(-20px); }
        }
        @keyframes slideInBk {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideOutBk {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(20px); }
        }
        @keyframes chipIn {
          from { opacity: 0; transform: scale(0.8) translateY(6px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes popIn {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <HeroSection />
      <WidgetSection />
    </div>
    </Layout>
  );
}
