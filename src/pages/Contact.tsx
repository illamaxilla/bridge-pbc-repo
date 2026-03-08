import React, { useState, useEffect, useRef } from "react";
import SiteHeader from "@/components/SiteHeaderMinimal";
import SiteFooter from "@/components/SiteFooter";

// ============================================================================
// BRIDGE PBC — Contact Page (Integrated with Guided Widget)
// ============================================================================

const colors = {
  primary: "#1B4D3E",
  accent: "#B8D935",
  accentText: "#5C7A1F",
  accentLight: "#E8F5E0",
  background: "#F3F5F2",
  white: "#FFFFFF",
  dark: "#191919",
  line: "#DEDEDE",
  muted: "#8A9E98",
  ctaGreen: "#2E5A4D",
};

const CONTENT_MAX_WIDTH = "1200px";
const MOBILE_BREAKPOINT = 768;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

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

const BridgeLogo = ({ height = 40 }) => (
  <svg height={height} viewBox="0 0 3434.33 932.3" xmlns="http://www.w3.org/2000/svg">
    <g>
      <path fill="#b8d935" d="M2070.26,927.95c-.2.2-.5.4-.7.5h-.3l1-.5Z" />
      <path
        fill="#1b4d3e"
        d="M1853.06,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9h0ZM1894.56,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1v.1Z"
      />
      <path
        fill="#1b4d3e"
        stroke="#000"
        strokeWidth=".5"
        strokeMiterlimit="10"
        d="M1431.68,224.45h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.05c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5l.1.1h0Z"
      />
      <path
        fill="#1b4d3e"
        stroke="#000"
        strokeWidth=".5"
        strokeMiterlimit="10"
        d="M1488.08,578.65v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"
      />
      <rect fill="#b8d935" x="1427.38" y="17.35" width="205.2" height="145" />
      <rect fill="#1b4d3e" x="1427.48" y="221.75" width="205.2" height="693.2" rx="9.6" ry="9.6" />
      <path
        fill="#1b4d3e"
        d="M2757.31,19.09h491.3c5.42,0,9.82,4.4,9.82,9.82v218.7c0,5.42-4.4,9.82-9.82,9.82h-507.36c-56.98,0-108.53,23.02-145.87,60.35-37.34,37.23-60.45,88.79-60.45,145.66,0,113.75,92.37,206.01,206.32,206.01h12.89c2.86,0,5.11,2.25,5.11,5.11v236.7c0,1.13-.92,1.94-1.94,1.94h0c-242.22,0-438.52-195.99-438.52-437.8v-18.51c0-241.81,196.29-437.8,438.52-437.8h0Z"
      />
      <rect fill="#1b4d3e" x="2812.75" y="339.47" width="216.75" height="572.62" rx="9.6" ry="9.6" />
      <rect fill="#b8d935" x="3083.41" y="339.47" width="175.12" height="257.67" />
      <rect fill="#b8d935" x="3083.41" y="654.42" width="175.12" height="257.67" />
      <circle fill="none" stroke="#191919" strokeWidth="5" strokeMiterlimit="10" cx="3385.56" cy="866.94" r="46.27" />
      <path
        fill="#191919"
        d="M3404.8,889.32l-10.31-14.71c.25,0,.38-.13.63-.25,2.89-1.26,5.03-3.02,6.54-5.41s2.26-5.15,2.26-8.55c0-5.03-1.76-8.93-5.16-11.82s-8.05-4.27-14.08-4.27h-18.36v44.89h8.3v-13.08h11.94l9.18,13.08h8.93l.13.13h0ZM3392.85,853.74c1.89,1.51,2.77,3.77,2.77,6.66s-.88,5.03-2.77,6.66-4.65,2.39-8.3,2.39h-9.81v-17.85h9.81c3.65,0,6.41.75,8.3,2.26h0v-.13h0Z"
      />
      <rect
        fill="none"
        stroke="#1b4d3e"
        strokeWidth="80"
        strokeMiterlimit="10"
        x="40"
        y="40"
        width="843.91"
        height="852.3"
        rx="36.55"
        ry="36.55"
      />
      <polygon
        fill="#b8d935"
        stroke="#1b4d3e"
        strokeMiterlimit="10"
        points="722.6 322.13 462.28 452.8 201.97 322.75 461.21 192.52 722.6 322.13"
      />
      <path
        fill="#1b4d3e"
        d="M197.84,426.78c3.86-.53,7.04.85,10.74,1.41l252.53,125.67c84.54-40,167.66-83.83,251.89-124.84,33.14-11.49,50.09,34.15,18.55,49.11l-259.23,129.08c-10.18,3.72-14.14,2.57-23.85-1.31l-264.23-132.98c-17.04-14.4-7.96-43.2,13.61-46.14h0Z"
      />
      <path
        fill="#b8d935"
        d="M195.25,558c3.65-.63,7.4-.4,11.08-.22,86.11,40.47,170.4,85.05,255.95,126.78l252.92-126c29.53-7.22,45.44,28.67,22.29,46.49l-270.42,134.42-8.62.31c-91.6-42.21-181.07-89.86-271.7-134.42-18.72-12.06-13.3-43.58,8.5-47.37h0Z"
      />
    </g>
  </svg>
);

const BridgeLogoWhite = () => (
  <div style={{ display: "flex", alignItems: "center", height: "40px" }}>
    <svg height="36" viewBox="0 0 4113.8 932.3" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <path
        fill="#fff"
        d="M3355.1,655.5h31.2v5.7h-31.2v-5.7ZM3355.1,666.9h31.2v11.1h-31.2v-11.1ZM3355.1,683.8h31.2v11.1h-31.2v-11.1ZM3355.1,700.8h31.2v11.1h-31.2v-11.1ZM3355.1,717.7h31.2v11.1h-31.2v-11.1ZM3355.1,734.5h31.2v11.1h-31.2v-11.1ZM3355.1,751.4h31.2v10.8h-31.2v-10.8ZM3355.1,767.9h31.2v11.1h-31.2v-11.1ZM3355.1,784.8h31.2v11.1h-31.2v-11.1ZM3355.1,801.7h31.2v11.1h-31.2v-11.1ZM3355.1,818.5h31.2v11.1h-31.2v-11.1ZM3355.1,835.4h31.2v11.1h-31.2v-11.1ZM3355.1,852.4h31.2v11.1h-31.2v-11.1ZM3355.1,869.2h31.2v11.1h-31.2v-11.1ZM3355.1,886.1h31.2v11.1h-31.2v-11.1ZM3355.1,903h31.2v5.7h-31.2v-5.7ZM3397.5,655.5h61.7c12.5,0,24.3,1.7,35.1,5.7h-96.8v-5.7h0ZM3397.5,666.9h109.7c5.9,3,11.4,6.7,16.7,11.1h-126.3v-11.1h-.1ZM3397.5,801.7h126.3c-5.2,4.4-10.8,8.1-16.7,11.1h-109.7v-11.1h.1ZM3397.5,818.5h96.8c-10.8,4-22.5,6.1-35.1,6.1h-30.5v84h-31.2v-90.2h0v.1ZM3479.6,739.9c0-17.2-13.5-24.7-28.1-24.7h-23.6v49.3h23.6c14.5,0,28.1-7.5,28.1-24.7h0v.1ZM3485.5,683.8h44.4c3.4,3,6.6,6.7,9.3,11.1h-37.1c-4.9-4.4-10.8-8.4-16.7-11.1h.1ZM3502.2,784.8h37.1c-2.8,4-5.9,7.8-9.3,11.1h-44.4c5.9-2.7,11.8-6.7,16.7-11.1h-.1ZM3507.4,700.8h35.7c2.4,3.4,4.2,7.1,5.6,11.1h-33.6c-2.1-4-4.5-7.8-7.7-11.1ZM3515,767.9h33.6l-5.6,11.1h-35.7c3.1-3.4,5.6-7.1,7.7-11.1ZM3517.8,717.7h32.6c1.3,3.7,2.4,7.5,2.8,11.1h-32.3c-.7-3.7-1.8-7.5-3.1-11.1h0ZM3520.9,751.4h32.3c-.3,3.7-1.3,7.5-2.8,10.8h-32.6c1.3-3.4,2.4-7.1,3.1-10.8h0ZM3521.7,734.5h32.3c.3,3.7.3,7.5-.3,11.1h-32c.7-3.7.7-7.5,0-11.1h0ZM3397.5,689.1h61.7c28.4,0,51.7,23.3,51.7,50.9s-23.2,50.9-51.7,50.9h-61.7v-102h0v.2Z"
      />
      <path
        fill="#fff"
        d="M3572.3,655.5h31.2v5.7h-31.2v-5.7ZM3572.3,666.9h31.2v11.1h-31.2v-11.1ZM3572.3,683.8h31.2v11.1h-31.2v-11.1ZM3572.3,700.8h31.2v11.1h-31.2v-11.1ZM3572.3,717.7h31.2v11.1h-31.2v-11.1ZM3572.3,734.5h31.2v11.1h-31.2v-11.1ZM3572.3,751.4h31.2v10.8h-31.2v-10.8ZM3572.3,767.9h31.2v11.1h-31.2v-11.1ZM3572.3,784.8h31.2v11.1h-31.2v-11.1ZM3572.3,801.7h31.2v11.1h-31.2v-11.1ZM3572.3,818.5h31.2v11.1h-31.2v-11.1ZM3572.3,835.4h31.2v11.1h-31.2v-11.1ZM3572.3,852.4h31.2v11.1h-31.2v-11.1ZM3572.3,869.2h31.2v11.1h-31.2v-11.1ZM3572.3,886.1h31.2v11.1h-31.2v-11.1ZM3572.3,903h31.2v5.7h-31.2v-5.7ZM3614.6,655.5h45.4c12.5,0,24.6,2.1,35.7,5.7h-81.2v-5.7h.1ZM3614.6,666.9h94.4c5.9,3,11.4,6.7,16,11.1h-110.3v-11.1h-.1ZM3614.6,688.9h45.4c23.6,0,42,12.5,42,34.1,0,36.4-42.3,62.5-87.5,72.2v-106.4h.1v.1ZM3685.4,775.1c17.3,9.8,36.4,32.4,36.4,57.1s-16,43.2-46.2,43.2h-61.1v-69.5c24.6-4.8,52.4-15.6,70.8-30.7h.1v-.1ZM3614.6,886.1h125.2c-4.5,4.4-10.1,8.1-16,11.1h-109.3v-11.1h.1ZM3614.6,903h96.1c-10.8,3.7-22.5,5.7-35.1,5.7h-61.1v-5.7h.1ZM3674.3,725.4c0-7.5-6.6-12.9-15.6-12.9h-16.3v49c19.8-9.1,32-21.9,32-36.1h-.1ZM3686.1,805.8c-13.2,7.5-28.4,13.5-43.7,18.3v27.7h32c19.1,0,27.1-17.5,11.8-45.9h-.1v-.1ZM3687.5,683.8h43.1c3.1,3.4,5.6,7.1,7.7,11.1h-35.4c-4.2-4.8-9.3-8.4-15.3-11.1h-.1ZM3694.7,767.9h38.9c3.8,3.7,7.3,7.5,10.4,11.1h-35.7c-4.2-4.4-9-8.1-13.5-11.1h-.1ZM3705.8,751.4h30.5c-2.1,4-4.5,7.8-7.3,10.8h-30.9c2.8-3.4,5.6-7.1,7.7-10.8h0ZM3718.4,869.2h35.7c-2.4,4-5.2,7.8-8.7,11.1h-42.3c5.9-3,11.1-6.7,15.3-11.1h.1-.1ZM3706.9,700.8h33.6c1.3,2.7,2.8,7.1,3.1,11.1h-32c-1-4-2.8-7.8-4.9-11.1h.2ZM3711.8,734.5h30.9c-.7,4-1.8,7.8-3.4,11.1h-30.5c1.3-3.7,2.4-7.5,3.1-11.1h-.1ZM3712.8,717.7h31.2c.3,3.7.3,7.5-.3,11.1h-30.9c.7-3,.7-8.1,0-11.1h0ZM3713.8,784.8h34.3c2.4,3.4,4.9,7.5,6.6,11.1h-33c-2.4-4-5.2-7.8-8-11.1h.1ZM3729.1,852.4h32.3c-.7,3.7-2.1,7.5-4.2,11.1h-34c2.4-3.4,4.5-7.1,5.9-11.1h0ZM3724.9,801.7h32.6c1.8,3.7,3.1,7.5,3.8,11.1h-31.5c-1.3-3.7-2.8-7.5-4.9-11.1ZM3732.6,835.4h31.5c0,3.7-.3,7.5-1.3,11.1h-32c1-3.7,1.8-7.5,1.8-11.1h0ZM3731.3,818.5h31.5c1,3.7,1.3,7.5,1.3,11.1h-31.2c-.3-3.7-.7-7.5-1.8-11.1h.2Z"
      />
      <path
        fill="#fff"
        d="M3774.6,767.9h32l-.7,11.1h-32c0-3.4.3-7.8.7-11.1ZM3773.9,784.8h32c0,3.4.3,7.5.7,11.1h-32c-.3-3.4-.7-7.8-.7-11.1ZM3777.7,751.4h32.3c-1,3.7-1.8,6.7-2.4,10.8h-32.3c.7-3.7,1.3-7.1,2.4-10.8ZM3775.3,801.7h32.3c.7,4,1.3,7.5,2.4,11.1h-32.3c-1-3.7-1.8-7.5-2.4-11.1ZM3783.2,734.5h33c-1.8,3.7-3.1,7.5-4.5,11.1h-32.6c1-3.7,2.4-7.5,4.2-11.1h-.1ZM3779.1,818.5h32.6c1.3,3.7,2.8,7.5,4.5,11.1h-33c-1.8-3.7-3.1-7.5-4.2-11.1h.1ZM3791.5,717.7h34.3l-7,11.1h-33.3c1.8-3.7,3.4-7.1,5.9-11.1h.1ZM3785.7,835.4h33.3l7,11.1h-34.3c-2.4-4-4.2-7.5-5.9-11.1h-.1ZM3803.4,700.8h37.5c-3.8,3.4-7.7,7.5-10.4,11.1h-35.4c2.1-3.4,5.2-7.5,8.3-11.1ZM3795.1,852.4h35.4c2.8,3.7,6.6,7.8,10.4,11.1h-37.5c-3.1-3.7-6.2-7.8-8.3-11.1ZM3819.7,683.8h45.1c-5.9,3-11.8,6.7-17.3,11.1h-39.2c3.8-4,7.7-7.8,11.4-11.1ZM3808.2,869.2h39.2c5.6,4.4,11.4,8.1,17.3,11.1h-45.1c-3.8-3.4-7.7-7.1-11.4-11.1ZM3817,782.1c0-55.4,43.1-99.3,96.8-99.3s57.9,14.2,75.6,36.8l-18.1,21.9c-12.9-18.9-33.6-31-57.6-31-36.1,0-64.9,31-64.9,71.6s28.8,71.6,64.9,71.6,44.7-12.1,57.6-31l18.1,21.9c-17.7,22.6-44.7,36.8-75.6,36.8-53.7,0-96.8-43.9-96.8-99.3ZM3844.7,666.9h138.1c6.2,3.4,12.1,7.1,17.7,11.1h-51.1c-11.4-4-23.2-6.1-35.7-6.1s-24.3,2.1-35.7,6.1h-51.1c5.6-4,11.4-7.8,17.7-11.1h-.1.2ZM3826.9,886.1h51.1c11.4,4,23.2,6.1,35.7,6.1s24.3-2.1,35.7-6.1h51.1c-5.6,4-11.4,7.8-17.7,11.1h-138.1c-6.2-3.4-12.1-7.1-17.7-11.1h.1-.2ZM3913.8,650.1c20.4,0,39.5,4,56.9,11.1h-113.8c17.3-7.1,36.4-11.1,56.9-11.1h.1-.1ZM3856.8,903h113.8c-17.3,7.1-36.4,11.1-56.9,11.1s-39.5-4-56.9-11.1h-.1.1ZM3962.6,683.8h45.1l5.9,5.4-4.5,5.7h-29.2c-5.6-4.4-11.4-8.1-17.3-11.1h-.1.1ZM3980,869.2h29.2l4.5,5.4c-1.8,2.1-3.8,4-5.9,5.7h-45.1c5.9-3,11.8-6.7,17.3-11.1h.1-.1ZM3986.6,700.8h18.1l-8.3,10.2c-2.8-3.4-6.2-7.1-9.8-10.2h0ZM3996.3,853.3l8.3,10.2h-18.1c3.4-3,7-6.7,9.8-10.2h0Z"
      />
      <path
        fill="#fff"
        d="M1853.1,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.6,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1h0v.1Z"
      />
      <path
        fill="#fff"
        stroke="none"
        d="M1431.7,224.5h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5h.1v.1Z"
      />
      <path
        fill="#fff"
        stroke="none"
        d="M1488.1,578.7v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"
      />
      <rect fill="#b8d935" x="1427.4" y="17.4" width="205.2" height="145" />
      <rect fill="#fff" x="1427.5" y="221.8" width="205.2" height="693.2" rx="9.6" ry="9.6" />
      <path
        fill="#fff"
        d="M2757.3,19.1h491.3c5.4,0,9.8,4.4,9.8,9.8v218.7c0,5.4-4.4,9.8-9.8,9.8h-507.4c-57,0-108.5,23-145.9,60.4-37.3,37.2-60.5,88.8-60.5,145.7,0,113.7,92.4,206,206.3,206h12.9c2.9,0,5.1,2.3,5.1,5.1v236.7c0,1.1-.9,1.9-1.9,1.9h0c-242.2,0-438.5-196-438.5-437.8v-18.5c0-241.8,196.3-437.8,438.5-437.8h.1Z"
      />
      <rect fill="#fff" x="2812.8" y="339.5" width="216.8" height="572.6" rx="9.6" ry="9.6" />
      <rect fill="#b8d935" x="3083.4" y="339.5" width="175.1" height="257.7" />
      <rect fill="#b8d935" x="3083.4" y="654.4" width="175.1" height="257.7" />
      <circle fill="none" stroke="#fff" strokeWidth="5" strokeMiterlimit="10" cx="4078.5" cy="661.2" r="32.8" />
      <path
        fill="#fff"
        d="M4092.2,677.1l-7.3-10.4c.2,0,.3,0,.4-.2,2-.9,3.6-2.1,4.6-3.8s1.6-3.6,1.6-6.1c0-3.6-1.2-6.3-3.6-8.4s-5.7-3-10-3h-13v31.8h5.9v-9.3h8.5l6.5,9.3h6.4v.1ZM4083.7,651.9c1.3,1.1,2,2.7,2,4.7s-.6,3.6-2,4.7-3.3,1.7-5.9,1.7h-6.9v-12.6h6.9c2.6,0,4.5.5,5.9,1.6h0v-.1Z"
      />
      <rect
        fill="none"
        stroke="#fff"
        strokeWidth="80"
        strokeMiterlimit="10"
        x="40"
        y="40"
        width="843.9"
        height="852.3"
        rx="36.6"
        ry="36.6"
      />
      <polygon
        fill="#b8d935"
        stroke="#1b4d3e"
        strokeMiterlimit="10"
        points="722.6 322.1 462.3 452.8 202 322.8 461.3 192.5 722.6 322.1"
      />
      <path
        fill="#74914a"
        d="M197.9,426.8c3.9-.5,7,.8,10.7,1.4l252.5,125.7c84.5-40,167.7-83.8,251.9-124.8,33.1-11.5,50.1,34.2,18.5,49.1l-259.2,129.1c-10.2,3.7-14.1,2.6-23.9-1.3l-264.2-133c-17-14.4-8-43.2,13.6-46.1h.1v-.1Z"
      />
      <path
        fill="#b8d935"
        d="M195.3,558c3.7-.6,7.4-.4,11.1-.2,86.1,40.5,170.4,85.1,255.9,126.8l252.9-126c29.5-7.2,45.4,28.7,22.3,46.5l-270.4,134.4-8.6.3c-91.6-42.2-181.1-89.9-271.7-134.4-18.7-12.1-13.3-43.6,8.5-47.4h0Z"
      />
    </svg>
  </div>
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

  let lines = [];
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
  <div style={{ display: "flex", gap: "5px", flex: 1 }}>
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        style={{
          height: "3px",
          flex: 1,
          borderRadius: "2px",
          backgroundColor: i <= step ? colors.accent : colors.line,
          transition: "background-color 0.4s ease",
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
      <div style={{ marginBottom: isMobile ? "16px" : "28px" }}>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "11px",
            fontWeight: "700",
            color: colors.accent,
            textTransform: "uppercase",
            letterSpacing: "2px",
            margin: "0 0 8px",
          }}
        >
          Step 1 of 4
        </p>
        <h2
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: isMobile ? "20px" : "26px",
            fontWeight: "300",
            color: colors.primary,
            letterSpacing: "-0.5px",
            margin: "0 0 4px",
            lineHeight: "1.2",
          }}
        >
          Who are you reaching out <strong style={{ fontWeight: "700" }}>as?</strong>
        </h2>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: colors.muted, margin: 0 }}>
          This routes your message to the right BRIDGE team.
        </p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
          gap: isMobile ? "6px" : "8px",
          marginBottom: isMobile ? "8px" : "10px",
        }}
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
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "10px",
                padding: "14px 14px",
                borderRadius: "12px",
                border: `1.5px solid ${sel ? colors.primary : hovered ? "rgba(27,77,62,0.3)" : colors.line}`,
                backgroundColor: sel ? colors.primary : hovered ? "rgba(27,77,62,0.02)" : colors.white,
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.2s ease",
                transform: !sel && hovered ? "translateY(-1px)" : "none",
                boxShadow: sel ? "0 8px 24px rgba(27,77,62,0.15)" : hovered ? "0 4px 12px rgba(27,77,62,0.06)" : "none",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  flexShrink: 0,
                  backgroundColor: sel ? "rgba(184,217,53,0.18)" : colors.background,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: sel ? colors.accent : colors.primary,
                  transition: "all 0.2s ease",
                }}
              >
                {opt.icon(sel ? colors.accent : colors.primary)}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: sel ? colors.white : colors.primary,
                    marginBottom: "3px",
                    lineHeight: "1.3",
                  }}
                >
                  {opt.title}
                </div>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "10px",
                    color: sel ? "rgba(255,255,255,0.6)" : colors.muted,
                    lineHeight: "1.45",
                  }}
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
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: "14px 16px",
          borderRadius: "12px",
          border: `1.5px solid ${colors.line}`,
          backgroundColor: colors.white,
          fontFamily: "Inter, sans-serif",
          fontSize: "13px",
          color: colors.primary,
          outline: "none",
          transition: "border-color 0.2s ease",
          resize: "none",
          lineHeight: "1.6",
        }}
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
      <div style={{ marginBottom: isMobile ? "14px" : "28px" }}>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "11px",
            fontWeight: "700",
            color: colors.accent,
            textTransform: "uppercase",
            letterSpacing: "2px",
            margin: "0 0 8px",
          }}
        >
          Step 2 of 4
        </p>
        <h2
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: isMobile ? "20px" : "26px",
            fontWeight: "300",
            color: colors.primary,
            letterSpacing: "-0.5px",
            margin: "0 0 4px",
            lineHeight: "1.2",
          }}
        >
          Which sectors are you <strong style={{ fontWeight: "700" }}>focused on?</strong>
        </h2>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: colors.muted, margin: 0 }}>
          Select up to 4 — or skip if you're not sure yet.
        </p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(3, 1fr)" : "repeat(4, 1fr)",
          gap: "6px",
          marginBottom: "8px",
        }}
      >
        {SECTOR_OPTIONS.map((opt, i) => {
          const sel = values.includes(opt.id);
          const disabled = !sel && values.length >= 4;
          const iconFn = SectorIcons[opt.id];
          return (
            <button
              key={opt.id}
              onClick={() => !disabled && toggle(opt.id)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                padding: "8px 6px",
                height: "64px",
                borderRadius: "10px",
                border: `1.5px solid ${sel ? colors.primary : colors.line}`,
                backgroundColor: sel ? colors.primary : disabled ? "rgba(243,245,242,0.4)" : colors.white,
                cursor: disabled ? "not-allowed" : "pointer",
                opacity: disabled ? 0.4 : 1,
                transition: "all 0.25s ease",
                animation: mounted ? `chipIn 0.35s cubic-bezier(0.175,0.885,0.32,1.275) ${i * 30}ms both` : "none",
                textAlign: "center",
              }}
            >
              <span style={{ color: sel ? colors.accent : colors.primary, display: "flex", flexShrink: 0 }}>
                {iconFn ? iconFn(sel ? colors.accent : colors.primary, 14) : null}
              </span>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "10px",
                  fontWeight: sel ? "600" : "500",
                  color: sel ? colors.white : colors.primary,
                  lineHeight: "1.2",
                }}
              >
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>
      {values.length > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: "7px", marginTop: "4px", marginBottom: "10px" }}>
          <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: colors.accent }} />
          <span
            style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: colors.accentText, fontWeight: "600" }}
          >
            {values.length} sector{values.length > 1 ? "s" : ""} selected
          </span>
        </div>
      )}
      {!values.length && <div style={{ marginTop: "10px" }} />}
      <textarea
        placeholder="Or describe the sectors or topics you care about…"
        value={freeText || ""}
        onChange={(e) => onFreeText && onFreeText(e.target.value)}
        rows={2}
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: "14px 16px",
          borderRadius: "12px",
          border: `1.5px solid ${colors.line}`,
          backgroundColor: colors.white,
          fontFamily: "Inter, sans-serif",
          fontSize: "13px",
          color: colors.primary,
          outline: "none",
          transition: "border-color 0.2s ease",
          resize: "none",
          lineHeight: "1.6",
        }}
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
      <div style={{ marginBottom: isMobile ? "14px" : "28px" }}>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "11px",
            fontWeight: "700",
            color: colors.accent,
            textTransform: "uppercase",
            letterSpacing: "2px",
            margin: "0 0 8px",
          }}
        >
          Step 3 of 4
        </p>
        <h2
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: isMobile ? "20px" : "26px",
            fontWeight: "300",
            color: colors.primary,
            letterSpacing: "-0.5px",
            margin: "0 0 4px",
            lineHeight: "1.2",
          }}
        >
          What's your <strong style={{ fontWeight: "700" }}>primary goal?</strong>
        </h2>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: colors.muted, margin: 0 }}>
          Pick the one that best describes what you're here for.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: "8px" }}>
        {options.map((opt) => {
          const sel = value === opt.id;
          const hovered = hov === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onChange(opt.id)}
              onMouseEnter={() => setHov(opt.id)}
              onMouseLeave={() => setHov(null)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 14px",
                borderRadius: "10px",
                border: `1.5px solid ${sel ? colors.primary : hovered ? "rgba(27,77,62,0.25)" : colors.line}`,
                backgroundColor: sel ? colors.primary : hovered ? "rgba(27,77,62,0.02)" : colors.white,
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.2s ease",
                boxShadow: sel ? "0 6px 20px rgba(27,77,62,0.12)" : "none",
              }}
            >
              <span style={{ color: sel ? colors.accent : colors.primary, display: "flex", flexShrink: 0 }}>
                {typeof opt.icon === "function" ? opt.icon(sel ? colors.accent : colors.primary) : opt.icon}
              </span>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "12px",
                  fontWeight: sel ? "600" : "500",
                  color: sel ? colors.white : colors.primary,
                  flex: 1,
                  lineHeight: "1.35",
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
        style={{
          width: "100%",
          boxSizing: "border-box",
          marginTop: "10px",
          padding: "14px 16px",
          borderRadius: "12px",
          border: `1.5px solid ${colors.line}`,
          backgroundColor: colors.white,
          fontFamily: "Inter, sans-serif",
          fontSize: "13px",
          color: colors.primary,
          outline: "none",
          transition: "border-color 0.2s ease",
          resize: "none",
          lineHeight: "1.6",
        }}
        onFocus={(e) => (e.target.style.borderColor = colors.primary)}
        onBlur={(e) => (e.target.style.borderColor = colors.line)}
      />
    </div>
  );
};

const StepDetails = ({ values, onChange }) => {
  const isMobile = useIsMobile();
  const inp: React.CSSProperties = {
    width: "100%",
    padding: "13px 15px",
    borderRadius: "12px",
    border: `1.5px solid ${colors.line}`,
    backgroundColor: colors.white,
    fontSize: "14px",
    fontFamily: "Inter, sans-serif",
    color: colors.dark,
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s ease",
  };
  const lbl: React.CSSProperties = {
    fontFamily: "Inter, sans-serif",
    fontSize: "11px",
    fontWeight: "700",
    color: colors.primary,
    display: "block",
    marginBottom: "7px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  };
  return (
    <div>
      <div style={{ marginBottom: isMobile ? "16px" : "28px" }}>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "11px",
            fontWeight: "700",
            color: colors.accent,
            textTransform: "uppercase",
            letterSpacing: "2px",
            margin: "0 0 8px",
          }}
        >
          Step 4 of 4
        </p>
        <h2
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: isMobile ? "20px" : "26px",
            fontWeight: "300",
            color: colors.primary,
            letterSpacing: "-0.5px",
            margin: "0 0 4px",
            lineHeight: "1.2",
          }}
        >
          Almost there — <strong style={{ fontWeight: "700" }}>your details</strong>
        </h2>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: colors.muted, margin: 0 }}>
          We'll use this to send you a tailored follow-up.
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "12px" }}>
          <div>
            <label style={lbl}>Full Name *</label>
            <input
              type="text"
              placeholder="e.g. Kwame Asante"
              value={values.name}
              onChange={(e) => onChange({ ...values, name: e.target.value })}
              style={inp}
            />
          </div>
          <div>
            <label style={lbl}>Email *</label>
            <input
              type="email"
              placeholder="kwame@example.com"
              value={values.email}
              onChange={(e) => onChange({ ...values, email: e.target.value })}
              style={inp}
            />
          </div>
        </div>
        <div>
          <label style={lbl}>
            Organization <span style={{ fontWeight: "400", textTransform: "none", opacity: 0.6 }}>— optional</span>
          </label>
          <input
            type="text"
            placeholder="Your company, ministry, or institution"
            value={values.organization}
            onChange={(e) => onChange({ ...values, organization: e.target.value })}
            style={inp}
          />
        </div>
        <div>
          <label style={lbl}>
            Additional context{" "}
            <span style={{ fontWeight: "400", textTransform: "none", opacity: 0.6 }}>— optional</span>
          </label>
          <textarea
            placeholder="Any context, constraints, or questions for BRIDGE..."
            rows={3}
            value={values.note}
            onChange={(e) => onChange({ ...values, note: e.target.value })}
            style={{ ...inp, resize: "vertical", lineHeight: "1.6" }}
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
      <div style={{ marginBottom: "24px" }}>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "11px",
            fontWeight: "700",
            color: colors.accent,
            textTransform: "uppercase",
            letterSpacing: "2px",
            margin: "0 0 10px",
          }}
        >
          Email Preview
        </p>
        <h2
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "26px",
            fontWeight: "300",
            color: colors.primary,
            letterSpacing: "-0.5px",
            margin: "0 0 6px",
            lineHeight: "1.2",
          }}
        >
          Here's exactly <strong style={{ fontWeight: "700" }}>what we'll send</strong>
        </h2>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: colors.muted, margin: 0 }}>
          Auto-routed to <span style={{ color: colors.primary, fontWeight: "600" }}>{routing.team}</span> at BRIDGE.
          Review before sending.
        </p>
      </div>

      {/* Mock email client */}
      <div
        style={{
          borderRadius: "16px",
          border: `1.5px solid ${colors.line}`,
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(27,77,62,0.07)",
        }}
      >
        {/* Email toolbar */}
        <div
          style={{
            backgroundColor: "#f6f6f6",
            borderBottom: `1px solid ${colors.line}`,
            padding: "10px 16px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#FF5F57" }} />
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#FEBC2E" }} />
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#28C840" }} />
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "11px",
              color: colors.muted,
              marginLeft: "10px",
              letterSpacing: "0.3px",
            }}
          >
            New Message — BRIDGE PBC
          </span>
        </div>

        {/* Email metadata */}
        <div style={{ backgroundColor: colors.white, borderBottom: `1px solid ${colors.line}`, padding: "16px 20px" }}>
          {[
            { label: "To", value: `${routing.team} <${routing.email}>` },
            {
              label: "From",
              value: details.email ? `${details.name || "Sender"} <${details.email}>` : "Awaiting your details",
            },
            { label: "Subject", value: routing.subject },
          ].map((row) => (
            <div key={row.label} style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "6px" }}>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "11px",
                  fontWeight: "700",
                  color: colors.muted,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  width: "52px",
                  flexShrink: 0,
                }}
              >
                {row.label}
              </span>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "13px",
                  color: colors.primary,
                  fontWeight: row.label === "Subject" ? "600" : "400",
                }}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>

        {/* Email body */}
        <div style={{ backgroundColor: colors.white, padding: "24px 20px" }}>
          {/* BRIDGE letterhead */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "20px",
              paddingBottom: "16px",
              borderBottom: `1px solid ${colors.line}`,
            }}
          >
            <BridgeMarkSmall />
            <div>
              <div
                style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: "700", color: colors.primary }}
              >
                BRIDGE PBC — Inquiry
              </div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: colors.muted }}>
                Blending Resources and Innovation to Drive Ghana's Empowerment
              </div>
            </div>
          </div>

          {/* Profile tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
            {whoOption && (
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "11px",
                  fontWeight: "700",
                  padding: "3px 10px",
                  borderRadius: "50px",
                  backgroundColor: colors.primary,
                  color: colors.white,
                }}
              >
                {whoOption.title}
              </span>
            )}
            {sectorLabels.map((s) => (
              <span
                key={s}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "11px",
                  fontWeight: "600",
                  padding: "3px 10px",
                  borderRadius: "50px",
                  backgroundColor: colors.accentLight,
                  color: colors.accentText,
                }}
              >
                {s}
              </span>
            ))}
            {goalOption && (
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "11px",
                  fontWeight: "600",
                  padding: "3px 10px",
                  borderRadius: "50px",
                  border: `1px solid ${colors.line}`,
                  color: colors.primary,
                }}
              >
                {goalOption.icon}{" "}
                {goalOption.label.length > 30 ? goalOption.label.slice(0, 30) + "…" : goalOption.label}
              </span>
            )}
          </div>

          {/* Message body */}
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "13px",
              color: "#3a4e48",
              lineHeight: "1.8",
              whiteSpace: "pre-line",
            }}
          >
            {message}
          </div>

          {/* Org line */}
          {details.organization && (
            <div
              style={{
                marginTop: "16px",
                paddingTop: "14px",
                borderTop: `1px solid ${colors.line}`,
                fontFamily: "Inter, sans-serif",
                fontSize: "12px",
                color: colors.muted,
              }}
            >
              Organization: <span style={{ color: colors.primary, fontWeight: "600" }}>{details.organization}</span>
            </div>
          )}

          {/* Footer */}
          <div
            style={{
              marginTop: "20px",
              paddingTop: "14px",
              borderTop: `1px solid ${colors.line}`,
              fontFamily: "Inter, sans-serif",
              fontSize: "11px",
              color: colors.muted,
            }}
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
    <div style={{ paddingTop: "8px" }}>
      {/* Success header */}
      <div style={{ textAlign: "center", marginBottom: "36px" }}>
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            backgroundColor: colors.accentLight,
            border: `2.5px solid ${colors.accent}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
            animation: "popIn 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          }}
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
        <h2
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "26px",
            fontWeight: "700",
            color: colors.primary,
            margin: "0 0 8px",
            letterSpacing: "-0.5px",
          }}
        >
          Message sent, {firstName}.
        </h2>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
            color: colors.muted,
            margin: 0,
            lineHeight: "1.6",
            maxWidth: "320px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Your inquiry is now with the {routing.team} team. Here's what to expect next.
        </p>
      </div>

      {/* Timeline */}
      <div style={{ position: "relative" }}>
        {/* Vertical line */}
        <div
          style={{
            position: "absolute",
            left: "19px",
            top: "24px",
            width: "2px",
            bottom: "24px",
            background: `linear-gradient(to bottom, ${colors.accent}, rgba(184,217,53,0.1))`,
            borderRadius: "2px",
          }}
        />

        {steps.map((step, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: "16px",
              marginBottom: i < steps.length - 1 ? "24px" : "0",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(12px)",
              transition: `opacity 0.45s ease ${i * 120 + 100}ms, transform 0.45s ease ${i * 120 + 100}ms`,
            }}
          >
            {/* Node */}
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                flexShrink: 0,
                backgroundColor: colors.white,
                border: `2px solid ${colors.accent}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                lineHeight: 1,
                zIndex: 1,
                boxShadow: `0 0 0 4px ${colors.accentLight}`,
              }}
            >
              {step.icon}
            </div>
            {/* Content */}
            <div
              style={{
                flex: 1,
                backgroundColor: colors.background,
                borderRadius: "14px",
                padding: "14px 18px",
                border: `1px solid ${colors.line}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    fontWeight: "700",
                    color: colors.primary,
                  }}
                >
                  {step.title}
                </span>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "10px",
                    fontWeight: "700",
                    color: colors.accentText,
                    backgroundColor: colors.accentLight,
                    padding: "2px 8px",
                    borderRadius: "50px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {step.time}
                </span>
              </div>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "13px",
                  color: "#5a6a64",
                  lineHeight: "1.6",
                  margin: 0,
                }}
              >
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
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState("fwd");
  const [anim, setAnim] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hovBtn, setHovBtn] = useState(false);

  const [who, setWho] = useState(null);
  const [whoFreeText, setWhoFreeText] = useState("");
  const [sectors, setSectors] = useState([]);
  const [sectorFreeText, setSectorFreeText] = useState("");
  const [goal, setGoal] = useState(null);
  const [goalFreeText, setGoalFreeText] = useState("");
  const [details, setDetails] = useState({ name: "", email: "", organization: "", note: "" });

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
      style={{
        backgroundColor: colors.background,
        padding: isMobile ? "22px 18px" : "44px 44px 32px",
        display: "flex",
        flexDirection: "column",
        minHeight: isMobile ? "480px" : "560px",
      }}
    >
      {/* Top bar */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
        <BridgeMarkSmall />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px" }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: "600", color: colors.muted }}>
              {submitted ? "Complete" : step < 5 ? stepLabels[step] : "Done"}
            </span>
            <span
              style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: "700", color: colors.primary }}
            >
              {Math.min(step + 1, 5)}/5
            </span>
          </div>
          <ProgressBar step={submitted ? 4 : step} total={5} />
        </div>
      </div>

      {/* Step content */}
      <div
        style={{
          flex: 1,
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
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
            marginTop: "28px",
            paddingTop: "20px",
            borderTop: `1px solid ${colors.line}`,
          }}
        >
          {step > 0 ? (
            <button
              onClick={() => go("bk")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "11px 18px",
                borderRadius: "50px",
                border: `1.5px solid ${colors.line}`,
                backgroundColor: "transparent",
                color: colors.primary,
                fontFamily: "Inter, sans-serif",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              <IconArrowLeft /> Back
            </button>
          ) : (
            <div />
          )}

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {step < 4 ? (
              <button
                onClick={() => canNext() && go("fwd")}
                onMouseEnter={() => setHovBtn(true)}
                onMouseLeave={() => setHovBtn(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "9px",
                  padding: "13px 24px",
                  borderRadius: "50px",
                  border: "none",
                  backgroundColor: canNext() ? colors.primary : colors.line,
                  color: canNext() ? colors.white : colors.muted,
                  fontFamily: "Inter, sans-serif",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: canNext() ? "pointer" : "not-allowed",
                  transition: "all 0.25s ease",
                  transform: canNext() && hovBtn ? "translateY(-1px)" : "none",
                  boxShadow: canNext() && hovBtn ? "0 6px 18px rgba(27,77,62,0.2)" : "none",
                }}
              >
                {step === 3 ? "Preview Email" : "Continue"}
                <span
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    backgroundColor: canNext() ? colors.accent : "rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconArrowRight size={11} />
                </span>
              </button>
            ) : (
              <button
                onClick={() => setSubmitted(true)}
                onMouseEnter={() => setHovBtn(true)}
                onMouseLeave={() => setHovBtn(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "9px",
                  padding: "13px 24px",
                  borderRadius: "50px",
                  border: "none",
                  backgroundColor: hovBtn ? colors.accent : colors.primary,
                  color: hovBtn ? colors.primary : colors.white,
                  fontFamily: "Inter, sans-serif",
                  fontSize: "13px",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  transform: hovBtn ? "translateY(-1px)" : "none",
                  boxShadow: hovBtn ? "0 8px 24px rgba(184,217,53,0.3)" : "0 4px 14px rgba(27,77,62,0.15)",
                }}
              >
                Send to BRIDGE
                <span
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    backgroundColor: hovBtn ? colors.primary : colors.accent,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background-color 0.25s",
                  }}
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
      style={{
        backgroundColor: colors.ctaGreen,
        padding: isMobile ? "28px 22px" : "44px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Top: contact info — original style */}
      <div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "50px",
            padding: "7px 14px",
            marginBottom: "24px",
            backgroundColor: "rgba(255,255,255,0.07)",
          }}
        >
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "10px",
              fontWeight: "700",
              color: colors.accent,
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            Contact Information
          </span>
        </div>
        <h3
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "22px",
            fontWeight: "300",
            color: colors.white,
            lineHeight: "1.3",
            letterSpacing: "-0.3px",
            margin: "0 0 28px",
          }}
        >
          Reach us <strong style={{ fontWeight: "700" }}>directly</strong>
        </h3>

        {[
          { icon: <IconMail size={18} />, label: "General Inquiries", value: "info@bridgepbc.com" },
          { icon: <IconMapPin size={18} />, label: "Location", value: "Accra, Ghana" },
          { icon: <IconClock size={18} />, label: "Response Time", value: "Within 48 business hours" },
        ].map((item) => (
          <div
            key={item.label}
            style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "20px" }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "9px",
                backgroundColor: "rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                color: colors.accent,
              }}
            >
              {item.icon}
            </div>
            <div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "10px",
                  fontWeight: "700",
                  color: "rgba(255,255,255,0.45)",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: "2px",
                }}
              >
                {item.label}
              </div>
              <div
                style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: "500", color: colors.white }}
              >
                {item.value}
              </div>
            </div>
          </div>
        ))}

        <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.1)", margin: "24px 0" }} />

        {/* What to expect */}
        <div>
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "10px",
              fontWeight: "700",
              color: colors.accent,
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              marginBottom: "14px",
            }}
          >
            What to Expect
          </div>
          {[
            "Personal response from the relevant team lead",
            "A focused 30-min alignment call",
            "Tailored proposal or pathway within 2 weeks",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "10px" }}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  flexShrink: 0,
                  marginTop: "1px",
                  backgroundColor: "rgba(184,217,53,0.18)",
                  border: `1.5px solid ${colors.accent}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: colors.accent,
                }}
              >
                <IconCheck size={9} />
              </div>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.72)",
                  lineHeight: "1.55",
                }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: inquiry card carousel */}
      <div style={{ marginTop: "28px" }}>
        <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.1)", marginBottom: "20px" }} />

        {/* Card content */}
        <div
          style={{
            animation: cardAnim
              ? cardDir === "fwd"
                ? "slideOutFwd 0.18s ease forwards"
                : "slideOutBk 0.18s ease forwards"
              : cardDir === "fwd"
                ? "slideInFwd 0.22s ease forwards"
                : "slideInBk 0.22s ease forwards",
            marginBottom: "16px",
            minHeight: "88px",
          }}
        >
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              fontWeight: "700",
              color: colors.white,
              marginBottom: "7px",
              lineHeight: "1.3",
            }}
          >
            {INQUIRY_CARDS[cardIndex].title}
          </div>
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "13px",
              color: "rgba(255,255,255,0.55)",
              lineHeight: "1.65",
              marginBottom: "10px",
            }}
          >
            {INQUIRY_CARDS[cardIndex].description}
          </div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: "600", color: colors.accent }}>
            {INQUIRY_CARDS[cardIndex].email}
          </div>
        </div>

        {/* Nav row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
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
                style={{
                  width: i === cardIndex ? "16px" : "5px",
                  height: "5px",
                  borderRadius: "3px",
                  backgroundColor: i === cardIndex ? colors.accent : "rgba(255,255,255,0.25)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
          <div style={{ display: "flex", gap: "6px" }}>
            {[
              { d: "bk", path: "M19 12H5M12 5l-7 7 7 7" },
              { d: "fwd", path: "M5 12h14M12 5l7 7-7 7" },
            ].map((btn) => (
              <button
                key={btn.d}
                onClick={() => cycleCard(btn.d)}
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.2)",
                  backgroundColor: "rgba(255,255,255,0.07)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "rgba(255,255,255,0.7)",
                  transition: "all 0.2s ease",
                }}
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
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1.15fr 0.85fr",
        borderRadius: "28px",
        overflow: "hidden",
        boxShadow: "0 24px 80px rgba(0,0,0,0.14)",
      }}
    >
      {leftPanel}
      {!isMobile && rightPanel}
      {isMobile && (
        <div
          style={{
            backgroundColor: colors.ctaGreen,
            padding: "18px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>
            Questions?
          </span>
          <a
            href="mailto:info@bridgepbc.com"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "13px",
              fontWeight: "600",
              color: colors.accent,
              textDecoration: "none",
            }}
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
      style={{
        backgroundColor: colors.white,
        padding: isMobile ? "64px 20px 40px" : "100px 80px 120px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-60px",
          right: "-60px",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(184,217,53,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto", position: "relative" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: colors.white,
            border: `1px solid ${colors.line}`,
            borderRadius: "50px",
            padding: "10px 20px",
            marginBottom: "32px",
          }}
        >
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: colors.accent }} />
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "11px",
              fontWeight: "700",
              color: colors.primary,
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            Contact Us
          </span>
        </div>
        <div style={{ maxWidth: isMobile ? "100%" : "680px" }}>
          <h1
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "36px" : "60px",
              fontWeight: "300",
              color: colors.primary,
              lineHeight: "1.1",
              letterSpacing: "-1px",
              margin: "0 0 24px",
            }}
          >
            Let's build something <strong style={{ fontWeight: "700" }}>meaningful</strong> together
          </h1>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "16px" : "18px",
              color: "#5a6a64",
              lineHeight: "1.75",
              margin: 0,
            }}
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
    <section style={{ backgroundColor: colors.background, padding: isMobile ? "40px 20px" : "56px 80px" }}>
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: "12px" }}>
          {inquiryTypes.map((item, i) => (
            <div
              key={i}
              onMouseEnter={() => setHov(i)}
              onMouseLeave={() => setHov(null)}
              style={{
                backgroundColor: colors.white,
                borderRadius: "16px",
                padding: "22px 24px",
                border: `1px solid ${hov === i ? "rgba(27,77,62,0.25)" : colors.line}`,
                transition: "all 0.2s ease",
                boxShadow: hov === i ? "0 6px 24px rgba(27,77,62,0.07)" : "none",
                cursor: "default",
              }}
            >
              {/* Icon + Title inline */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    flexShrink: 0,
                    backgroundColor: colors.background,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: colors.primary,
                  }}
                >
                  {item.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: colors.primary,
                    margin: 0,
                    lineHeight: "1.2",
                  }}
                >
                  {item.title}
                </h3>
              </div>
              {/* Description */}
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "13px",
                  color: "#6a7e78",
                  lineHeight: "1.65",
                  margin: "0 0 14px",
                  paddingLeft: "42px",
                }}
              >
                {item.description}
              </p>
              {/* Email */}
              <div style={{ display: "flex", alignItems: "center", gap: "7px", paddingLeft: "42px" }}>
                <span style={{ color: colors.muted, display: "flex", opacity: 0.7 }}>
                  <IconMail size={14} />
                </span>
                <span
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: "600", color: colors.muted }}
                >
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
    <section style={{ backgroundColor: colors.white, paddingTop: isMobile ? "0" : "200px" }}>
      <div
        style={{
          backgroundColor: colors.primary,
          paddingTop: isMobile ? "32px" : "260px",
          paddingBottom: isMobile ? "48px" : "240px",
          position: "relative",
          overflow: isMobile ? "visible" : "visible",
        }}
      >
        {/* Floating widget card */}
        <div
          style={{
            position: isMobile ? "relative" : "absolute",
            top: isMobile ? undefined : "-180px",
            marginTop: isMobile ? undefined : undefined,
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
          style={{
            maxWidth: CONTENT_MAX_WIDTH,
            margin: "0 auto",
            display: isMobile ? "none" : "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "32px",
          }}
        >
          {[
            { number: "12", label: "Integrated Sectors", sub: "Agriculture to Transportation" },
            { number: "174+", label: "Ventures in Pipeline", sub: "$135–259M potential capital" },
            { number: "48h", label: "Response Commitment", sub: "Every inquiry, every time" },
          ].map((stat) => (
            <div key={stat.number} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "48px",
                  fontWeight: "700",
                  color: colors.accent,
                  lineHeight: "1",
                  marginBottom: "8px",
                }}
              >
                {stat.number}
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: colors.white,
                  marginBottom: "4px",
                }}
              >
                {stat.label}
              </div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.45)" }}>
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
// FOOTER — exact spec build
// ============================================================================

const footerSectorIconsSpec = [
  {
    key: "infra",
    label: "Infrastructure & Basic Services",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="7" height="7" x="14" y="3" rx="1" />
        <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" />
      </svg>
    ),
  },
  {
    key: "fin",
    label: "Financial Inclusion",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
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
    key: "health",
    label: "Health Systems",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h5v5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z" />
      </svg>
    ),
  },
  {
    key: "tech",
    label: "Technology & Innovation",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2" />
      </svg>
    ),
  },
  {
    key: "edu",
    label: "Education & Skills",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
        <path d="M22 10v6" />
        <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
      </svg>
    ),
  },
  {
    key: "agri",
    label: "Agriculture & Value Chains",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 20h10" />
        <path d="M10 20c5.5-2.5.8-6.4 3-10" />
        <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
        <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
      </svg>
    ),
  },
  {
    key: "creative",
    label: "Sports & Creative",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
        <circle cx="12" cy="13" r="3" />
      </svg>
    ),
  },
  {
    key: "housing",
    label: "Housing & Real Estate",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    key: "tourism",
    label: "Tourism & Hospitality",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
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
  },
  {
    key: "energy",
    label: "Energy & Renewables",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" />
        <path d="M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1" />
        <path d="m11 7-3 5h4l-3 5" />
        <line x1="22" x2="22" y1="11" y2="13" />
      </svg>
    ),
  },
  {
    key: "mfg",
    label: "Manufacturing",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
        <path d="M17 18h1M12 18h1M7 18h1" />
      </svg>
    ),
  },
  {
    key: "transport",
    label: "Transportation",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
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
  },
];

const FooterSectorGrid = () => {
  const [hovered, setHovered] = useState(null);
  return (
    <div>
      <div
        style={{
          fontSize: "12px",
          fontWeight: "600",
          color: hovered !== null ? colors.accent : "rgba(255,255,255,0.4)",
          fontFamily: "'DM Sans', sans-serif",
          textTransform: "uppercase",
          letterSpacing: "1.5px",
          marginBottom: "12px",
          transition: "color 0.25s ease",
          lineHeight: "1",
          minHeight: "12px",
        }}
      >
        {hovered !== null ? footerSectorIconsSpec[hovered].label : "Explore 12 Sectors"}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {footerSectorIconsSpec.map((sector, i) => {
          const isH = hovered === i;
          return (
            <a
              key={sector.key}
              href="#"
              title={sector.label}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                backgroundColor: isH ? "rgba(184,217,53,0.12)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${isH ? "rgba(184,217,53,0.35)" : "rgba(255,255,255,0.07)"}`,
                cursor: "pointer",
                textDecoration: "none",
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: isH ? "translateY(-2px)" : "none",
                boxShadow: isH ? "0 6px 16px rgba(0,0,0,0.2), 0 0 0 1px rgba(184,217,53,0.15)" : "none",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  opacity: isH ? 1 : 0.5,
                  transition: "opacity 0.25s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {sector.icon(isH ? colors.accent : "rgba(255,255,255,0.85)")}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

const footerSocialIcons = [
  <svg key="li" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>,
  <svg key="tw" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>,
  <svg key="fb" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>,
];

const footerLinkHref = (link: string): string => {
  const map: Record<string, string> = {
    "About BRIDGE": "/about", "Our Approach": "/methodology", "Sectors": "/sectors", "Contact Us": "/contact",
    "Research & Guidance": "/services", "Venture Development": "/services", "Direct Investment": "/services", "Strategic Partnerships": "/services",
    "White Paper": "/resources", "Case Studies": "/resources", "Research Library": "/resources", "Data & Reports": "/resources",
    "Insights & Analysis": "/insights", "Sector Briefs": "/insights", "Policy Updates": "/insights", "Annual Review": "/insights",
  };
  return map[link] || "#";
};

const Footer = () => {
  const isMobile = useIsMobile();
  return (
    <footer style={{ backgroundColor: colors.primary, padding: "0" }}>
      {/* Top separator */}
      <div style={{ padding: "0 80px" }}>
        <div style={{ height: "0.5px", backgroundColor: "rgba(255,255,255,0.08)" }} />
      </div>

      {isMobile ? (
        /* ── MOBILE FOOTER ── */
        <div style={{ padding: "32px 20px 16px", display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Row 1: Logo + Nav labels */}
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <div style={{ flexShrink: 0 }}>
              <BridgeLogoWhite />
            </div>
            <div
              style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginLeft: "auto", justifyContent: "flex-end" }}
            >
              {["Company", "Services", "Resources", "Insights"].map((label) => (
                <a
                  key={label}
                  href={{ Company: "/about", Services: "/services", Resources: "/resources", Insights: "/insights" }[label] || "#"}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "rgba(255,255,255,0.5)",
                    letterSpacing: "0.5px",
                    textDecoration: "none",
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Row 2: Subscribe */}
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              placeholder="Subscribe to insights"
              style={{
                flex: 1,
                padding: "11px 14px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.12)",
                backgroundColor: "rgba(255,255,255,0.05)",
                color: colors.white,
                fontSize: "12px",
                fontFamily: "'DM Sans', sans-serif",
                outline: "none",
              }}
            />
            <button
              style={{
                backgroundColor: colors.accent,
                color: colors.primary,
                border: "none",
                padding: "11px 18px",
                fontSize: "12px",
                fontWeight: "700",
                fontFamily: "'DM Sans', sans-serif",
                cursor: "pointer",
                borderRadius: "8px",
              }}
            >
              →
            </button>
          </div>

          {/* Row 3: Contact + Social */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif" }}>
                Accra, Ghana
              </span>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.15)" }}>·</span>
              <span
                style={{
                  fontSize: "12px",
                  color: colors.accent,
                  fontWeight: "600",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                info@bridgepbc.com
              </span>
            </div>
            <div style={{ display: "flex", gap: "6px" }}>
              {footerSocialIcons.map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "6px",
                    backgroundColor: "rgba(255,255,255,0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  <span style={{ transform: "scale(0.8125)", display: "flex" }}>{icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ── DESKTOP FOOTER ── */
        <>
          {/* Row 1: Logo/Info + Nav columns */}
          <div style={{ padding: "64px 80px 32px", display: "grid", gridTemplateColumns: "325px 1fr", gap: "220px" }}>
            {/* Left: Logo + description + contact */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ marginBottom: "24px" }}>
                  <BridgeLogoWhite />
                </div>
                <p
                  style={{
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.5)",
                    fontFamily: "'DM Sans', sans-serif",
                    lineHeight: "1.8",
                    margin: "0 0 28px",
                    maxWidth: "320px",
                  }}
                >
                  Blending resources and innovation across the integrated sectors for development, growth, and
                  empowerment.
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.55)",
                    fontFamily: "'DM Sans', sans-serif",
                    margin: "0 0 4px",
                    lineHeight: "1.7",
                  }}
                >
                  Accra, Ghana
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    color: colors.accent,
                    fontFamily: "'DM Sans', sans-serif",
                    margin: "0",
                    fontWeight: "600",
                  }}
                >
                  info@bridgepbc.com
                </p>
              </div>
            </div>

            {/* Right: 4 nav columns */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {[
                  { title: "Company", links: ["About BRIDGE", "Our Approach", "Sectors", "Contact Us"] },
                  {
                    title: "Services",
                    links: [
                      "Research & Guidance",
                      "Venture Development",
                      "Direct Investment",
                      "Strategic Partnerships",
                    ],
                  },
                  { title: "Resources", links: ["White Paper", "Case Studies", "Research Library", "Data & Reports"] },
                  {
                    title: "Insights",
                    links: ["Insights & Analysis", "Sector Briefs", "Policy Updates", "Annual Review"],
                  },
                ].map((col) => (
                  <div key={col.title}>
                    <h4
                      style={{
                        fontSize: "12px",
                        fontWeight: "700",
                        color: colors.accent,
                        fontFamily: "'DM Sans', sans-serif",
                        textTransform: "uppercase",
                        letterSpacing: "1.5px",
                        marginBottom: "24px",
                      }}
                    >
                      {col.title}
                    </h4>
                     {col.links.map((link) => (
                       <a
                         key={link}
                         href={footerLinkHref(link)}
                         style={{
                           display: "block",
                           fontSize: "14px",
                           color: "rgba(255,255,255,0.6)",
                           fontFamily: "'DM Sans', sans-serif",
                           textDecoration: "none",
                           marginBottom: "14px",
                         }}
                       >
                         {link}
                       </a>
                     ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Subscribe + Sector grid */}
          <div
            style={{
              padding: "0 80px 20px",
              display: "grid",
              gridTemplateColumns: "325px 1fr",
              gap: "220px",
              alignItems: "start",
            }}
          >
            {/* Left: Subscribe + Social */}
            <div>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "rgba(255,255,255,0.4)",
                  fontFamily: "'DM Sans', sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  display: "block",
                  marginBottom: "12px",
                  lineHeight: "1",
                }}
              >
                Subscribe to Insights
              </span>
              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  placeholder="Your email address"
                  style={{
                    flex: 1,
                    padding: "12px 16px",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.12)",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: colors.white,
                    fontSize: "13px",
                    fontFamily: "'DM Sans', sans-serif",
                    outline: "none",
                    height: "44px",
                    boxSizing: "border-box",
                  }}
                />
                <button
                  style={{
                    backgroundColor: colors.accent,
                    color: colors.primary,
                    border: "none",
                    padding: "12px 20px",
                    fontSize: "13px",
                    fontWeight: "700",
                    fontFamily: "'DM Sans', sans-serif",
                    cursor: "pointer",
                    borderRadius: "8px",
                    height: "44px",
                    boxSizing: "border-box",
                  }}
                >
                  →
                </button>
              </div>
              <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
                {footerSocialIcons.map((icon, i) => (
                  <a
                    key={i}
                    href="#"
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "8px",
                      backgroundColor: "rgba(255,255,255,0.06)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: "rgba(255,255,255,0.45)",
                    }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Right: Sector grid */}
            <div>
              <FooterSectorGrid />
            </div>
          </div>
        </>
      )}

      {/* Bottom bar */}
      <div
        style={{
          padding: isMobile ? "16px 20px" : "20px 80px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", fontFamily: "'DM Sans', sans-serif" }}>
          © 2026 BRIDGE PBC
        </span>
        <div style={{ display: "flex", gap: isMobile ? "12px" : "20px" }}>
          {["Terms", "Privacy", "Accessibility"].map((link) => (
            <a
              key={link}
              href="#"
              style={{
                fontSize: "11px",
                color: "rgba(255,255,255,0.25)",
                fontFamily: "'DM Sans', sans-serif",
                textDecoration: "none",
              }}
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function ContactPage() {
  return (
    <div style={{ fontFamily: "Inter, sans-serif", margin: 0, padding: 0 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');
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

      <SiteHeader />
      <HeroSection />
      <WidgetSection />
      <SiteFooter />
    </div>
  );
}
