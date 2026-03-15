import { useState, useEffect, useRef } from "react";

import { C, F } from '../theme';
/* ─────────────────────────────────────────────────────────────────────────
   BRIDGE GHANA INTELLIGENCE  ·  Q1 2026  ·  FREE PUBLIC EDITION
   Editorial aesthetic: The Economist × African Business Review
   Typography: Playfair Display (headlines) + Source Serif Pro (body)
              + DM Mono (data/figures)
   Palette: Ink (#0D1A10), Paper (#FAF8F3), Forest (#1B4D3E), Lime (#B8D935)
───────────────────────────────────────────────────────────────────────── */

/* ── BRIDGE SVG LOGO ─────────────────────────────────────────────────────── */
// white = logo on dark backgrounds | dark = logo on light backgrounds
const BridgeLogo = ({ height = 28, variant = 'white' }) => {
  const textFill = variant === 'white' ? '#ffffff' : '#1B4D3E';
  const chevronStroke = variant === 'white' ? '#ffffff' : '#1B4D3E';
  return (
    <svg
      height={height}
      viewBox="0 0 4113.8 932.3"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', flexShrink: 0 }}
    >
      {/* Chevron / diamond mark */}
      <polygon fill="#1B4D3E" stroke="#1B4D3E" strokeMiterlimit="10"
        points="722.6 322.1 462.3 452.8 202 322.8 461.3 192.5 722.6 322.1"/>
      <path fill="#74914a"
        d="M197.9,426.8c3.9-.5,7,.8,10.7,1.4l252.5,125.7c84.5-40,167.7-83.8,251.9-124.8,33.1-11.5,50.1,34.2,18.5,49.1l-259.2,129.1c-10.2,3.7-14.1,2.6-23.9-1.3l-264.2-133c-17-14.4-8-43.2,13.6-46.1Z"/>
      <path fill="#b8d935"
        d="M195.3,558c3.7-.6,7.4-.4,11.1-.2,86.1,40.5,170.4,85.1,255.9,126.8l252.9-126c29.5-7.2,45.4,28.7,22.3,46.5l-270.4,134.4-8.6.3c-91.6-42.2-181.1-89.9-271.7-134.4-18.7-12.1-13.3-43.6,8.5-47.4Z"/>
      {/* BRIDGE wordmark letters */}
      <path fill={textFill}
        d="M1853.1,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.6,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1Z"/>
      <path fill={textFill}
        d="M1431.7,224.5h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5Z"/>
      <path fill={textFill}
        d="M1488.1,578.7v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6Z"/>
      <rect fill="#b8d935" x="1427.4" y="17.4" width="205.2" height="145"/>
      <rect fill={textFill} x="1427.5" y="221.8" width="205.2" height="693.2" rx="9.6" ry="9.6"/>
      <path fill={textFill}
        d="M2757.3,19.1h491.3c5.4,0,9.8,4.4,9.8,9.8v218.7c0,5.4-4.4,9.8-9.8,9.8h-507.4c-57,0-108.5,23-145.9,60.4-37.3,37.2-60.5,88.8-60.5,145.7,0,113.7,92.4,206,206.3,206h12.9c2.9,0,5.1,2.3,5.1,5.1v236.7c0,1.1-.9,1.9-1.9,1.9h0c-242.2,0-438.5-196-438.5-437.8v-18.5c0-241.8,196.3-437.8,438.5-437.8Z"/>
      <rect fill={textFill} x="2812.8" y="339.5" width="216.8" height="572.6" rx="9.6" ry="9.6"/>
      <rect fill="#b8d935" x="3083.4" y="339.5" width="175.1" height="257.7"/>
      <rect fill="#b8d935" x="3083.4" y="654.4" width="175.1" height="257.7"/>
      <path fill={textFill}
        d="M3355.1,655.5h31.2v5.7h-31.2v-5.7ZM3355.1,666.9h31.2v11.1h-31.2v-11.1ZM3355.1,683.8h31.2v11.1h-31.2v-11.1ZM3355.1,700.8h31.2v11.1h-31.2v-11.1ZM3355.1,717.7h31.2v11.1h-31.2v-11.1ZM3355.1,734.5h31.2v11.1h-31.2v-11.1ZM3355.1,751.4h31.2v10.8h-31.2v-10.8ZM3355.1,767.9h31.2v11.1h-31.2v-11.1ZM3355.1,784.8h31.2v11.1h-31.2v-11.1ZM3355.1,801.7h31.2v11.1h-31.2v-11.1ZM3355.1,818.5h31.2v11.1h-31.2v-11.1ZM3355.1,835.4h31.2v11.1h-31.2v-11.1ZM3355.1,852.4h31.2v11.1h-31.2v-11.1ZM3355.1,869.2h31.2v11.1h-31.2v-11.1ZM3355.1,886.1h31.2v11.1h-31.2v-11.1ZM3355.1,903h31.2v5.7h-31.2v-5.7ZM3397.5,655.5h61.7c12.5,0,24.3,1.7,35.1,5.7h-96.8v-5.7ZM3397.5,666.9h109.7c5.9,3,11.4,6.7,16.7,11.1h-126.3v-11.1ZM3397.5,801.7h126.3c-5.2,4.4-10.8,8.1-16.7,11.1h-109.7v-11.1ZM3397.5,818.5h96.8c-10.8,4-22.5,6.1-35.1,6.1h-30.5v84h-31.2v-90.2ZM3479.6,739.9c0-17.2-13.5-24.7-28.1-24.7h-23.6v49.3h23.6c14.5,0,28.1-7.5,28.1-24.7ZM3485.5,683.8h44.4c3.4,3,6.6,6.7,9.3,11.1h-37.1c-4.9-4.4-10.8-8.4-16.7-11.1ZM3502.2,784.8h37.1c-2.8,4-5.9,7.8-9.3,11.1h-44.4c5.9-2.7,11.8-6.7,16.7-11.1ZM3507.4,700.8h35.7c2.4,3.4,4.2,7.1,5.6,11.1h-33.6c-2.1-4-4.5-7.8-7.7-11.1ZM3515,767.9h33.6l-5.6,11.1h-35.7c3.1-3.4,5.6-7.1,7.7-11.1ZM3517.8,717.7h32.6c1.3,3.7,2.4,7.5,2.8,11.1h-32.3c-.7-3.7-1.8-7.5-3.1-11.1ZM3520.9,751.4h32.3c-.3,3.7-1.3,7.5-2.8,10.8h-32.6c1.3-3.4,2.4-7.1,3.1-10.8ZM3521.7,734.5h32.3c.3,3.7.3,7.5-.3,11.1h-32c.7-3.7.7-7.5,0-11.1ZM3397.5,689.1h61.7c28.4,0,51.7,23.3,51.7,50.9s-23.2,50.9-51.7,50.9h-61.7v-102Z"/>
      <path fill={textFill}
        d="M3572.3,655.5h31.2v5.7h-31.2v-5.7ZM3572.3,666.9h31.2v11.1h-31.2v-11.1ZM3572.3,683.8h31.2v11.1h-31.2v-11.1ZM3572.3,700.8h31.2v11.1h-31.2v-11.1ZM3572.3,717.7h31.2v11.1h-31.2v-11.1ZM3572.3,734.5h31.2v11.1h-31.2v-11.1ZM3572.3,751.4h31.2v10.8h-31.2v-10.8ZM3572.3,767.9h31.2v11.1h-31.2v-11.1ZM3572.3,784.8h31.2v11.1h-31.2v-11.1ZM3572.3,801.7h31.2v11.1h-31.2v-11.1ZM3572.3,818.5h31.2v11.1h-31.2v-11.1ZM3572.3,835.4h31.2v11.1h-31.2v-11.1ZM3572.3,852.4h31.2v11.1h-31.2v-11.1ZM3572.3,869.2h31.2v11.1h-31.2v-11.1ZM3572.3,886.1h31.2v11.1h-31.2v-11.1ZM3572.3,903h31.2v5.7h-31.2v-5.7ZM3614.6,655.5h45.4c12.5,0,24.6,2.1,35.7,5.7h-81.2v-5.7ZM3614.6,666.9h94.4c5.9,3,11.4,6.7,16,11.1h-110.3v-11.1ZM3614.6,688.9h45.4c23.6,0,42,12.5,42,34.1,0,36.4-42.3,62.5-87.5,72.2v-106.4ZM3685.4,775.1c17.3,9.8,36.4,32.4,36.4,57.1s-16,43.2-46.2,43.2h-61.1v-69.5c24.6-4.8,52.4-15.6,70.8-30.7ZM3614.6,886.1h125.2c-4.5,4.4-10.1,8.1-16,11.1h-109.3v-11.1ZM3614.6,903h96.1c-10.8,3.7-22.5,5.7-35.1,5.7h-61.1v-5.7ZM3674.3,725.4c0-7.5-6.6-12.9-15.6-12.9h-16.3v49c19.8-9.1,32-21.9,32-36.1ZM3686.1,805.8c-13.2,7.5-28.4,13.5-43.7,18.3v27.7h32c19.1,0,27.1-17.5,11.8-45.9ZM3687.5,683.8h43.1c3.1,3.4,5.6,7.1,7.7,11.1h-35.4c-4.2-4.8-9.3-8.4-15.3-11.1ZM3694.7,767.9h38.9c3.8,3.7,7.3,7.5,10.4,11.1h-35.7c-4.2-4.4-9-8.1-13.5-11.1ZM3705.8,751.4h30.5c-2.1,4-4.5,7.8-7.3,10.8h-30.9c2.8-3.4,5.6-7.1,7.7-10.8ZM3718.4,869.2h35.7c-2.4,4-5.2,7.8-8.7,11.1h-42.3c5.9-3,11.1-6.7,15.3-11.1ZM3706.9,700.8h33.6c1.3,2.7,2.8,7.1,3.1,11.1h-32c-1-4-2.8-7.8-4.9-11.1ZM3711.8,734.5h30.9c-.7,4-1.8,7.8-3.4,11.1h-30.5c1.3-3.7,2.4-7.5,3.1-11.1ZM3712.8,717.7h31.2c.3,3.7.3,7.5-.3,11.1h-30.9c.7-3,.7-8.1,0-11.1ZM3713.8,784.8h34.3c2.4,3.4,4.9,7.5,6.6,11.1h-33c-2.4-4-5.2-7.8-8-11.1ZM3729.1,852.4h32.3c-.7,3.7-2.1,7.5-4.2,11.1h-34c2.4-3.4,4.5-7.1,5.9-11.1ZM3724.9,801.7h32.6c1.8,3.7,3.1,7.5,3.8,11.1h-31.5c-1.3-3.7-2.8-7.5-4.9-11.1ZM3732.6,835.4h31.5c0,3.7-.3,7.5-1.3,11.1h-32c1-3.7,1.8-7.5,1.8-11.1ZM3731.3,818.5h31.5c1,3.7,1.3,7.5,1.3,11.1h-31.2c-.3-3.7-.7-7.5-1.8-11.1Z"/>
      <path fill={textFill}
        d="M3774.6,767.9h32l-.7,11.1h-32c0-3.4.3-7.8.7-11.1ZM3773.9,784.8h32c0,3.4.3,7.5.7,11.1h-32c-.3-3.4-.7-7.8-.7-11.1ZM3777.7,751.4h32.3c-1,3.7-1.8,6.7-2.4,10.8h-32.3c.7-3.7,1.3-7.1,2.4-10.8ZM3775.3,801.7h32.3c.7,4,1.3,7.5,2.4,11.1h-32.3c-1-3.7-1.8-7.5-2.4-11.1ZM3783.2,734.5h33c-1.8,3.7-3.1,7.5-4.5,11.1h-32.6c1-3.7,2.4-7.5,4.2-11.1ZM3779.1,818.5h32.6c1.3,3.7,2.8,7.5,4.5,11.1h-33c-1.8-3.7-3.1-7.5-4.2-11.1ZM3791.5,717.7h34.3l-7,11.1h-33.3c1.8-3.7,3.4-7.1,5.9-11.1ZM3785.7,835.4h33.3l7,11.1h-34.3c-2.4-4-4.2-7.5-5.9-11.1ZM3803.4,700.8h37.5c-3.8,3.4-7.7,7.5-10.4,11.1h-35.4c2.1-3.4,5.2-7.5,8.3-11.1ZM3795.1,852.4h35.4c2.8,3.7,6.6,7.8,10.4,11.1h-37.5c-3.1-3.7-6.2-7.8-8.3-11.1ZM3819.7,683.8h45.1c-5.9,3-11.8,6.7-17.3,11.1h-39.2c3.8-4,7.7-7.8,11.4-11.1ZM3808.2,869.2h39.2c5.6,4.4,11.4,8.1,17.3,11.1h-45.1c-3.8-3.4-7.7-7.1-11.4-11.1ZM3817,782.1c0-55.4,43.1-99.3,96.8-99.3s57.9,14.2,75.6,36.8l-18.1,21.9c-12.9-18.9-33.6-31-57.6-31-36.1,0-64.9,31-64.9,71.6s28.8,71.6,64.9,71.6,44.7-12.1,57.6-31l18.1,21.9c-17.7,22.6-44.7,36.8-75.6,36.8-53.7,0-96.8-43.9-96.8-99.3ZM3844.7,666.9h138.1c6.2,3.4,12.1,7.1,17.7,11.1h-51.1c-11.4-4-23.2-6.1-35.7-6.1s-24.3,2.1-35.7,6.1h-51.1c5.6-4,11.4-7.8,17.7-11.1ZM3826.9,886.1h51.1c11.4,4,23.2,6.1,35.7,6.1s24.3-2.1,35.7-6.1h51.1c-5.6,4-11.4,7.8-17.7,11.1h-138.1c-6.2-3.4-12.1-7.1-17.7-11.1ZM3913.8,650.1c20.4,0,39.5,4,56.9,11.1h-113.8c17.3-7.1,36.4-11.1,56.9-11.1ZM3856.8,903h113.8c-17.3,7.1-36.4,11.1-56.9,11.1s-39.5-4-56.9-11.1ZM3962.6,683.8h45.1l5.9,5.4-4.5,5.7h-29.2c-5.6-4.4-11.4-8.1-17.3-11.1ZM3980,869.2h29.2l4.5,5.4c-1.8,2.1-3.8,4-5.9,5.7h-45.1c5.9-3,11.8-6.7,17.3-11.1ZM3986.6,700.8h18.1l-8.3,10.2c-2.8-3.4-6.2-7.1-9.8-10.2ZM3996.3,853.3l8.3,10.2h-18.1c3.4-3,7-6.7,9.8-10.2Z"/>
    </svg>
  );
};

const Fonts = () => (
  <style>{`


    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background: ${C.paper};
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    /* The rule — used everywhere like The Economist's red stripe */
    .rule-top    { border-top:    3px solid ${C.rule}; }
    .rule-bottom { border-bottom: 1px solid ${C.border}; }
    .rule-thick  { border-top: 6px solid ${C.ink}; border-bottom: 1px solid ${C.rule}; padding-bottom: 2px; }

    /* Drop cap for feature articles */
    .drop-cap::first-letter {
      font-family: ${F.display};
      font-size: 5em;
      font-weight: 900;
      float: left;
      line-height: 0.75;
      margin: 0.08em 0.1em 0 0;
      color: ${C.forest};
    }

    /* Column rule dividers */
    .col-rule {
      border-right: 1px solid ${C.border};
    }

    /* Print optimization */
    @media print {
      .no-print { display: none !important; }
      body { background: white; }
      .page-break { page-break-before: always; }
    }

    /* Subtle paper texture */
    .paper-texture {
      background-image:
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
    }

    /* Hover effects for interactive elements */
    .hover-lift {
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .hover-lift:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(13,26,16,0.12);
    }

    a { color: inherit; text-decoration: none; }

    /* Animated entrance */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .fade-up { animation: fadeUp 0.6s ease forwards; }
    .fade-up-2 { animation: fadeUp 0.6s 0.15s ease both; }
    .fade-up-3 { animation: fadeUp 0.6s 0.3s ease both; }
    .fade-up-4 { animation: fadeUp 0.6s 0.45s ease both; }

    /* Section separator ornament */
    .ornament::before {
      content: '◆';
      display: block;
      text-align: center;
      color: ${C.lime};
      font-size: 10px;
      margin: 32px 0;
      letter-spacing: 12px;
    }

    /* Responsive */
    @media (max-width: 900px) {
      .two-col   { grid-template-columns: 1fr !important; }
      .three-col { grid-template-columns: 1fr !important; }
    }
    @media (max-width: 600px) {
      .two-col   { grid-template-columns: 1fr !important; }
      .three-col { grid-template-columns: 1fr !important; }
      .hide-mobile  { display: none !important; }
      .mob-hide     { display: none !important; }
      .mob-show     { display: block !important; }

      /* TopBar */
      .pad-topbar   { padding: 9px 16px !important; }

      /* All body sections */
      .pad-section  { padding: 40px 20px !important; }

      /* Cover */
      .cover-masthead { padding: 0 16px !important; }
      .cover-body     { padding: 32px 20px 40px !important; }
      .cover-headline { font-size: clamp(36px, 10vw, 52px) !important; }
      .cover-index    { grid-template-columns: 1fr 1fr !important; }
      .cover-index-item { border-right: none !important; padding-left: 0 !important; padding-right: 0 !important; padding-bottom: 14px !important; margin-bottom: 14px !important; border-bottom: 1px solid rgba(184,217,53,0.12) !important; }
      .cover-index-item:last-child { border-bottom: none !important; margin-bottom: 0 !important; }

      /* Macro data strip */
      .macro-strip { grid-template-columns: 1fr 1fr !important; }
      .macro-cell-br { border-right: none !important; }

      /* Indicators table — hide BRIDGE Signal column */
      .ind-row    { grid-template-columns: 2fr 1fr 1fr !important; gap: 8px !important; }
      .ind-signal { display: none !important; }

      /* Sector row — hide score bar column, tighten grid */
      .sector-row { grid-template-columns: 26px 1fr 52px 28px !important; gap: 8px !important; }
      .sector-bar  { display: none !important; }

      /* Gate layout */
      .gate-grid  { grid-template-columns: 1fr !important; }

      /* Colophon */
      .pad-colophon { padding: 20px 16px !important; }
      .colophon-links { display: none !important; }
      .colophon-inner { flex-direction: column !important; align-items: flex-start !important; gap: 14px !important; }
    }
  `}</style>
);

/* ── UTILITY COMPONENTS ──────────────────────────────────────────────────── */

const RuleHeading = ({ eyebrow, children, light = false, center = false }) => (
  <div style={{ textAlign: center ? 'center' : 'left' }}>
    <div style={{
      borderTop: `6px solid ${C.ink}`,
      borderBottom: `2px solid ${C.rule}`,
      paddingBottom: '4px',
      marginBottom: '14px',
      display: 'inline-block',
      width: '100%',
    }} />
    {eyebrow && (
      <div style={{
        fontFamily: F.sans,
        fontSize: '10px', fontWeight: 700,
        letterSpacing: '2.5px', textTransform: 'uppercase',
        color: C.muted, marginBottom: '8px',
      }}>{eyebrow}</div>
    )}
    <h2 style={{
      fontFamily: F.display,
      fontSize: 'clamp(22px, 2.8vw, 32px)',
      fontWeight: 700,
      lineHeight: 1.2,
      color: light ? C.paper : C.ink,
      letterSpacing: '-0.3px',
    }}>{children}</h2>
  </div>
);

const Byline = ({ author, date, readTime }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: '16px',
    padding: '10px 0',
    borderTop: `1px solid ${C.border}`,
    borderBottom: `1px solid ${C.border}`,
    margin: '16px 0 24px',
    flexWrap: 'wrap',
  }}>
    <span style={{ fontFamily: F.sans, fontSize: '11px', fontWeight: 700, color: C.muted, letterSpacing: '0.5px' }}>{author}</span>
    <span style={{ color: C.border, fontSize: '10px' }}>|</span>
    <span style={{ fontFamily: F.sans, fontSize: '11px', color: C.faint }}>{date}</span>
    {readTime && <>
      <span style={{ color: C.border, fontSize: '10px' }}>|</span>
      <span style={{ fontFamily: F.sans, fontSize: '11px', color: C.faint }}>{readTime} min read</span>
    </>}
  </div>
);

const PullQuote = ({ children, attribution, light = false }) => (
  <div style={{
    borderLeft: `4px solid ${C.lime}`,
    paddingLeft: '24px',
    margin: '32px 0',
  }}>
    <div style={{
      fontFamily: F.display,
      fontSize: 'clamp(18px, 2.2vw, 22px)',
      fontStyle: 'italic',
      fontWeight: 600,
      lineHeight: 1.5,
      color: light ? 'rgba(250,248,243,0.88)' : C.forest,
    }}>
      <span style={{ color: C.lime, fontSize: '2em', lineHeight: 0, verticalAlign: '-0.4em', marginRight: '4px' }}>"</span>
      {children}
    </div>
    {attribution && (
      <div style={{
        marginTop: '10px',
        fontFamily: F.sans, fontSize: '10px', fontWeight: 700,
        letterSpacing: '1.5px', textTransform: 'uppercase',
        color: light ? 'rgba(184,217,53,0.7)' : C.muted,
      }}>— {attribution}</div>
    )}
  </div>
);

const DataFigure = ({ value, label, sub, trend, inverse = false }) => (
  <div style={{ padding: '0' }}>
    <div style={{
      fontFamily: F.mono,
      fontSize: 'clamp(28px, 4vw, 44px)',
      fontWeight: 500,
      color: inverse ? C.lime : C.forest,
      lineHeight: 1,
      letterSpacing: '-1px',
    }}>{value}</div>
    {trend && (
      <div style={{
        fontFamily: F.sans, fontSize: '11px', fontWeight: 700,
        color: trend === 'up' ? C.positive : trend === 'down' ? C.red : C.muted,
        marginTop: '4px',
      }}>
        {trend === 'up' ? '▲' : trend === 'down' ? '▼' : '→'} {sub}
      </div>
    )}
    <div style={{
      fontFamily: F.sans, fontSize: '11px', fontWeight: 600,
      color: inverse ? 'rgba(255,255,255,0.55)' : C.muted,
      marginTop: trend ? '2px' : '6px',
      lineHeight: 1.4,
    }}>{label}</div>
  </div>
);

const BodyText = ({ children, style = {} }) => (
  <p style={{
    fontFamily: F.body,
    fontSize: '15px',
    lineHeight: 1.85,
    color: C.ink,
    marginBottom: '18px',
    fontWeight: 300,
    ...style,
  }}>{children}</p>
);

const SectionFolio = ({ section, pageNum }) => (
  <div style={{
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    borderTop: `1px solid ${C.border}`,
    paddingTop: '8px',
    marginTop: '8px',
  }}>
    <span style={{ fontFamily: F.sans, fontSize: '10px', fontWeight: 700, color: C.faint, letterSpacing: '1px', textTransform: 'uppercase' }}>{section}</span>
    <span style={{ fontFamily: F.mono, fontSize: '10px', color: C.faint }}>{pageNum}</span>
  </div>
);

/* ── COVER ───────────────────────────────────────────────────────────────── */

const Cover = ({ logoRef }) => (
  <div style={{
    background: C.forest,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
  }}>
    {/* Fine grid texture overlay */}
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      backgroundImage: `
        linear-gradient(rgba(184,217,53,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(184,217,53,0.04) 1px, transparent 1px)
      `,
      backgroundSize: '32px 32px',
    }} />

    {/* Oversized background numeral — like The Economist's watermark */}
    <div style={{
      position: 'absolute',
      right: '-40px', bottom: '-60px',
      fontFamily: F.display,
      fontSize: 'clamp(200px, 35vw, 380px)',
      fontWeight: 900,
      color: 'rgba(255,255,255,0.025)',
      lineHeight: 1,
      userSelect: 'none',
      letterSpacing: '-20px',
    }}>2026</div>

    {/* Masthead bar */}
    <div className="cover-masthead" style={{
      borderBottom: `1px solid rgba(184,217,53,0.25)`,
      padding: '0 56px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'stretch',
      position: 'relative',
    }}>
      {/* Logo / masthead */}
      <div ref={logoRef} style={{ padding: '20px 0', display: 'flex', alignItems: 'center', gap: '20px' }}>
        <BridgeLogo height={32} variant="white" />
        <div style={{ width: '1px', height: '28px', background: 'rgba(255,255,255,0.15)' }} />
        <div style={{ fontFamily: F.sans, fontSize: '10px', fontWeight: 600, color: C.lime, letterSpacing: '2px', textTransform: 'uppercase', lineHeight: 1.4 }}>
          Ghana<br />Intelligence
        </div>
      </div>

      {/* Right meta */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 700, color: C.lime, letterSpacing: '2px', textTransform: 'uppercase' }}>Free Public Edition</div>
          <div style={{ fontFamily: F.mono, fontSize: '11px', color: 'rgba(255,255,255,0.45)', marginTop: '2px' }}>Vol. I  ·  Q1 2026</div>
        </div>
      </div>
    </div>

    {/* Lime stripe — The Economist signature element */}
    <div style={{ height: '4px', background: C.lime }} />

    {/* Main cover content */}
    <div className="cover-body" style={{
      flex: 1,
      padding: '56px 56px 48px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
    }}>
      {/* Issue theme */}
      <div className="fade-up" style={{
        fontFamily: F.sans, fontSize: '10px', fontWeight: 700,
        letterSpacing: '3px', textTransform: 'uppercase',
        color: C.lime, marginBottom: '28px',
      }}>
        This Edition: The Architecture of Opportunity
      </div>

      {/* Headline — the centrepiece */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="fade-up-2" style={{
          borderLeft: `4px solid ${C.lime}`,
          paddingLeft: '28px',
          marginBottom: '32px',
        }}>
          <h1 className="cover-headline" style={{
            fontFamily: F.display,
            fontSize: 'clamp(40px, 7vw, 80px)',
            fontWeight: 900,
            color: C.paper,
            lineHeight: 1.0,
            letterSpacing: '-2px',
          }}>
            Ghana stands<br />
            at its<br />
            <em style={{ color: C.lime, fontStyle: 'italic', fontWeight: 700 }}>
              inflection
            </em><br />
            point.
          </h1>
        </div>

        <div className="fade-up-3" style={{
          maxWidth: '460px',
          fontFamily: F.body,
          fontSize: '16px',
          fontStyle: 'italic',
          lineHeight: 1.7,
          color: 'rgba(250,248,243,0.65)',
          marginBottom: '40px',
        }}>
          A survey of 12 integrated sectors, 174+ ventures assessed,
          and the gap between where Ghana is and where it structurally can be.
        </div>
      </div>

      {/* Cover story index — like The Economist's cover contents */}
      <div className="fade-up-4 cover-index" style={{
        borderTop: `1px solid rgba(184,217,53,0.25)`,
        paddingTop: '28px',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '0',
      }}>
        {[
          { pg: '03', title: 'The Ghana Thesis', desc: 'Why the gap between condition and potential is the opportunity' },
          { pg: '06', title: 'Macro Survey', desc: 'Key indicators across the economy in numbers' },
          { pg: '10', title: '12-Sector Map', desc: 'BRIDGE Impact Score™ across every vertical' },
          { pg: '14', title: 'Sector Spotlight', desc: 'Agriculture: $1.9B in value leaking upstream' },
        ].map((item, i) => (
          <div key={i} className="cover-index-item" style={{
            paddingRight: '24px',
            borderRight: i < 3 ? `1px solid rgba(184,217,53,0.15)` : 'none',
            paddingLeft: i > 0 ? '24px' : '0',
          }}>
            <div style={{ fontFamily: F.mono, fontSize: '9px', color: C.lime, letterSpacing: '1px', marginBottom: '6px' }}>p.{item.pg}</div>
            <div style={{ fontFamily: F.sans, fontSize: '11px', fontWeight: 700, color: C.paper, marginBottom: '4px', lineHeight: 1.3 }}>{item.title}</div>
            <div style={{ fontFamily: F.body, fontSize: '10px', color: 'rgba(250,248,243,0.45)', lineHeight: 1.5, fontStyle: 'italic' }}>{item.desc}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Bottom lime rule */}
    <div style={{ height: '3px', background: `linear-gradient(90deg, ${C.lime}, ${C.limeDark})` }} />
  </div>
);

/* ── EDITOR'S LETTER / FEATURE INTRO ────────────────────────────────────── */

const EditorsLetter = () => (
  <div className="pad-section paper-texture" style={{ background: C.paper, padding: '72px 56px' }}>
    <div style={{ maxWidth: '860px', margin: '0 auto' }}>

      {/* Section header in classic editorial style */}
      <div style={{ marginBottom: '48px' }}>
        <div style={{
          borderTop: `6px solid ${C.ink}`,
          borderBottom: `2px solid ${C.lime}`,
          paddingBottom: '3px',
          marginBottom: '16px',
        }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontFamily: F.sans, fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: C.muted }}>
            The Ghana Thesis
          </span>
          <span style={{ fontFamily: F.mono, fontSize: '10px', color: C.faint }}>p.03</span>
        </div>
      </div>

      {/* Two-column editorial layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'start' }} className="two-col">

        {/* Left column */}
        <div>
          <h2 style={{
            fontFamily: F.display,
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            fontWeight: 700,
            lineHeight: 1.15,
            color: C.ink,
            letterSpacing: '-0.5px',
            marginBottom: '8px',
          }}>
            The gap between<br />
            condition and<br />
            <em style={{ color: C.forest, fontStyle: 'italic' }}>potential</em><br />
            is the opportunity.
          </h2>

          <Byline author="BRIDGE Intelligence Desk" date="Q1 2026" readTime="8" />

          <div className="drop-cap">
            <BodyText>
              Ghana confronts a paradox familiar to development economists but rarely
              articulated with precision: the country's most acute constraints and its
              most compelling opportunities are not opposing forces — they are the
              same phenomenon observed from different vantage points.
            </BodyText>
          </div>

          <BodyText>
            A $4–6 billion SME credit gap, observed from one angle, represents a
            failure of financial systems. Observed from another, it is a $4–6 billion
            lending market — proven demand, constrained supply, compressed margins
            awaiting the institutional capacity to serve it.
          </BodyText>

          <BodyText>
            Post-harvest agricultural losses exceeding 40% represent both a
            catastrophic inefficiency for farmers and an equally sized infrastructure
            investment opportunity for those who would build the cold chain, storage,
            and processing facilities that eliminate the loss.
          </BodyText>

          <PullQuote attribution="BRIDGE Intelligence Framework, 2026">
            The frame determines the action. Those who see only constraint
            will disinvest. Those who see structural opportunity will compound.
          </PullQuote>
        </div>

        {/* Right column */}
        <div>
          <BodyText>
            This publication — the first in BRIDGE's Ghana Intelligence series —
            does not catalogue problems. It maps opportunities: their scale, their
            interdependencies, the capital required to unlock them, and the
            development outcomes that follow when they are.
          </BodyText>

          <BodyText>
            Our analysis spans 12 integrated sectors and 174+ ventures assessed
            through BRIDGE's proprietary Impact Score™ framework. The methodology
            is deliberately multi-dimensional: financial returns, development impact,
            implementation feasibility, and policy alignment are evaluated together,
            not in sequence. We have found, consistently, that the highest-returning
            opportunities in Ghana are also those with the deepest human development
            potential — a finding that challenges the conventional trade-off narrative.
          </BodyText>

          {/* Inset data box — Economist-style fact box */}
          <div style={{
            background: C.forest,
            padding: '24px 24px 20px',
            borderRadius: '2px',
            marginTop: '28px',
          }}>
            <div style={{
              fontFamily: F.sans, fontSize: '9px', fontWeight: 700,
              letterSpacing: '2px', textTransform: 'uppercase',
              color: C.lime, marginBottom: '16px',
            }}>Five numbers that frame the argument</div>
            {[
              { v: '$50B+', l: 'diaspora savings seeking productive deployment at home' },
              { v: '174+',  l: 'ventures assessed across 12 sectors in BRIDGE pipeline' },
              { v: '40%',   l: 'of Ghana\'s workforce in agriculture — capturing 25% of value' },
              { v: '3M',    l: 'Ghanaian citizens in diaspora — one in every ten' },
              { v: '$15B+', l: 'estimated unrealised potential across BRIDGE\'s sector map' },
            ].map((d, i) => (
              <div key={i} style={{
                display: 'flex', gap: '16px', alignItems: 'baseline',
                paddingBottom: i < 4 ? '12px' : 0,
                marginBottom: i < 4 ? '12px' : 0,
                borderBottom: i < 4 ? '1px solid rgba(184,217,53,0.12)' : 'none',
              }}>
                <span style={{ fontFamily: F.mono, fontSize: '18px', color: C.lime, minWidth: '68px', lineHeight: 1 }}>{d.v}</span>
                <span style={{ fontFamily: F.body, fontSize: '12px', color: 'rgba(250,248,243,0.6)', fontStyle: 'italic', lineHeight: 1.4 }}>{d.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SectionFolio section="The Ghana Thesis · BRIDGE Ghana Intelligence" pageNum="03–05" />
    </div>
  </div>
);

/* ── MACRO INDICATORS ────────────────────────────────────────────────────── */

const MacroIndicators = () => (
  <div className="pad-section" style={{ background: C.paperDark, padding: '72px 56px', borderTop: `1px solid ${C.border}` }}>
    <div style={{ maxWidth: '860px', margin: '0 auto' }}>

      <div style={{ marginBottom: '40px' }}>
        <div style={{ borderTop: `6px solid ${C.ink}`, borderBottom: `2px solid ${C.lime}`, paddingBottom: '3px', marginBottom: '16px' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontFamily: F.sans, fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: C.muted }}>Macro Survey</span>
          <span style={{ fontFamily: F.mono, fontSize: '10px', color: C.faint }}>p.06</span>
        </div>
        <h2 style={{
          fontFamily: F.display, fontSize: 'clamp(24px, 3vw, 36px)',
          fontWeight: 700, color: C.ink, lineHeight: 1.2, marginTop: '12px',
          letterSpacing: '-0.3px',
        }}>
          Ghana in numbers
        </h2>
      </div>

      {/* Oversize figures — magazine data spread */}
      <div className="macro-strip" style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '0',
        borderTop: `2px solid ${C.ink}`,
        marginBottom: '48px',
      }}>
        {[
          { v: '33M',    l: 'Population', sub: '~2.5% annual growth', trend: 'up' },
          { v: '$70B',   l: 'GDP 2024',   sub: 'Upper-middle income trajectory', trend: 'up' },
          { v: '18.4%',  l: 'Inflation',  sub: '−8.2pp from prior year', trend: 'down' },
          { v: '60%',    l: 'Financially included', sub: '+3pp per year', trend: 'up' },
        ].map((d, i) => (
          <div key={i} className="macro-cell-br" style={{
            padding: '32px 24px 24px',
            borderRight: i < 3 ? `1px solid ${C.border}` : 'none',
            borderBottom: `1px solid ${C.border}`,
          }}>
            <DataFigure {...d} />
          </div>
        ))}
      </div>

      {/* Indicators table — The Economist-style */}
      <div style={{ marginBottom: '40px' }}>
        <div className="ind-row" style={{
          display: 'grid', gridTemplateColumns: '2.5fr 1.2fr 1fr 1.5fr',
          padding: '8px 0', borderBottom: `2px solid ${C.ink}`,
          gap: '16px',
        }}>
          {['Economic Indicator', 'Reading', 'Change', 'BRIDGE Signal'].map((h, hi) => (
            <div key={h} className={hi === 3 ? 'ind-signal' : ''} style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: C.muted }}>{h}</div>
          ))}
        </div>

        {[
          { ind: 'GDP Growth Rate',         val: '2.8%',    chg: '+0.6pp',  dir: 'up',      signal: 'Expanding',      signalC: C.positive },
          { ind: 'Inflation (CPI)',          val: '18.4%',   chg: '−8.2pp',  dir: 'down',    signal: 'Stabilising',    signalC: C.positive },
          { ind: 'Policy Rate (BoG)',        val: '27.0%',   chg: 'Held',    dir: 'neutral', signal: 'Watch',          signalC: C.amber },
          { ind: 'FDI Inflows',             val: '$2.1B',   chg: 'Flat',    dir: 'neutral', signal: 'Below potential', signalC: C.amber },
          { ind: 'Diaspora Remittances',    val: '$6.65B',  chg: '+8% YoY', dir: 'up',      signal: 'Underleveraged', signalC: C.forest },
          { ind: 'SME Credit Penetration',  val: '~18%',    chg: 'Stagnant', dir: 'neutral', signal: 'Structural gap', signalC: C.red },
          { ind: 'Youth Unemployment',      val: '21.4%',   chg: 'Structural', dir: 'neutral', signal: 'Priority',     signalC: C.red },
          { ind: 'Fintech Transaction Vol.',val: 'GHS 3T',  chg: '+22% YoY', dir: 'up',     signal: 'Proven market',  signalC: C.positive },
        ].map((r, i) => (
          <div key={i} className="ind-row" style={{
            display: 'grid', gridTemplateColumns: '2.5fr 1.2fr 1fr 1.5fr',
            padding: '11px 0', gap: '16px', alignItems: 'center',
            borderBottom: `1px solid ${C.border}`,
            background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.015)',
          }}>
            <div style={{ fontFamily: F.body, fontSize: '13px', color: C.ink, fontWeight: 300 }}>{r.ind}</div>
            <div style={{ fontFamily: F.mono, fontSize: '14px', fontWeight: 500, color: C.forest }}>{r.val}</div>
            <div style={{
              fontFamily: F.sans, fontSize: '11px', fontWeight: 600,
              color: r.dir === 'up' ? C.positive : r.dir === 'down' ? C.red : C.muted,
            }}>
              {r.dir === 'up' ? '▲ ' : r.dir === 'down' ? '▼ ' : '— '}{r.chg}
            </div>
            <div className="ind-signal" style={{
              fontFamily: F.sans, fontSize: '10px', fontWeight: 700,
              color: r.signalC, letterSpacing: '0.3px',
            }}>{r.signal}</div>
          </div>
        ))}
      </div>

      <div style={{
        fontFamily: F.body, fontSize: '11px', fontStyle: 'italic',
        color: C.faint, lineHeight: 1.6,
      }}>
        Sources: Bank of Ghana, Ghana Statistical Service, World Bank, BRIDGE research. Figures reflect Q4 2025 / Q1 2026 readings where available.
      </div>

      <SectionFolio section="Macro Survey · BRIDGE Ghana Intelligence" pageNum="06–09" />
    </div>
  </div>
);

/* ── 12-SECTOR MAP ───────────────────────────────────────────────────────── */

const sectors = [
  { n:'01', name:'Infrastructure',             short:'Infra',       score:87, tier:'Core',     cap:'$25–30M', key:'Market digitisation, logistics, connectivity' },
  { n:'02', name:'Financial Inclusion',        short:'FinInc',      score:84, tier:'Core',     cap:'$30–35M', key:'$4–6B credit gap; 40% adult exclusion rate' },
  { n:'03', name:'Health Systems',             short:'Health',      score:79, tier:'Core',     cap:'$10–15M', key:'1:6,000 doctor ratio; diaspora telemedicine' },
  { n:'04', name:'Technology & Innovation',    short:'Tech',        score:76, tier:'Emerging', cap:'$10–15M', key:'5–10 seed/Series A; digital infrastructure' },
  { n:'05', name:'Education & Skills',         short:'Edu',         score:72, tier:'Emerging', cap:'$5–10M',  key:'TVET expansion; 500 diaspora scholarships' },
  { n:'06', name:'Agriculture & Value Chains', short:'Agri',        score:83, tier:'Core',     cap:'$10–15M', key:'40% post-harvest loss; processing gap' },
  { n:'07', name:'Sports & Creative Ind.',     short:'Creative',    score:61, tier:'Growth',   cap:'$5–8M',   key:'Talent export economy; IP infrastructure' },
  { n:'08', name:'Housing & Real Estate',      short:'Housing',     score:70, tier:'Growth',   cap:'$15–20M', key:'Affordable housing deficit; commercial demand' },
  { n:'09', name:'Tourism & Hospitality',      short:'Tourism',     score:68, tier:'Growth',   cap:'$8–12M',  key:'Diaspora return travel; heritage tourism' },
  { n:'10', name:'Energy & Renewables',        short:'Energy',      score:74, tier:'Emerging', cap:'$12–18M', key:'Distributed solar; mini-grid rural access' },
  { n:'11', name:'Manufacturing & Industry',   short:'Mfg',         score:65, tier:'Growth',   cap:'$10–15M', key:'Light industry; agro-processing; export' },
  { n:'12', name:'Transportation & Logistics', short:'Transport',   score:71, tier:'Emerging', cap:'$8–12M',  key:'Last-mile delivery; cold chain; fleet mgmt' },
];

const TIER_COLORS = { Core: C.forest, Emerging: '#2D6B4F', Growth: '#5C7A3E' };

const SectorMap = () => {
  const [active, setActive] = useState(null);
  const coreSectors = sectors.filter(s => s.tier === 'Core');
  const otherSectors = sectors.filter(s => s.tier !== 'Core');

  return (
    <div className="pad-section" style={{ background: C.paper, padding: '72px 56px', borderTop: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>

        <div style={{ marginBottom: '40px' }}>
          <div style={{ borderTop: `6px solid ${C.ink}`, borderBottom: `2px solid ${C.lime}`, paddingBottom: '3px', marginBottom: '16px' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontFamily: F.sans, fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: C.muted }}>12-Sector Map</span>
            <span style={{ fontFamily: F.mono, fontSize: '10px', color: C.faint }}>p.10</span>
          </div>
          <h2 style={{ fontFamily: F.display, fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: C.ink, lineHeight: 1.2, marginTop: '12px', letterSpacing: '-0.3px' }}>
            Twelve integrated sectors.<br />
            <em style={{ color: C.forest, fontStyle: 'italic' }}>One opportunity architecture.</em>
          </h2>
          <p style={{ fontFamily: F.body, fontSize: '14px', color: C.muted, marginTop: '12px', fontStyle: 'italic', lineHeight: 1.6 }}>
            BRIDGE Impact Score™ — composite of Market Opportunity (30%), Development Impact (30%),
            Implementation Feasibility (25%), Financial Sustainability (15%). Select a sector to view detail.
          </p>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {Object.entries(TIER_COLORS).map(([tier, color]) => (
            <div key={tier} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '12px', height: '3px', background: color, borderRadius: '2px' }} />
              <span style={{ fontFamily: F.sans, fontSize: '10px', fontWeight: 700, color: C.muted, letterSpacing: '1px', textTransform: 'uppercase' }}>{tier}</span>
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
            <span style={{ fontFamily: F.sans, fontSize: '10px', color: C.faint }}>Bar = BRIDGE Score™</span>
          </div>
        </div>

        {/* Sector rows */}
        <div style={{ borderTop: `2px solid ${C.ink}` }}>
          {sectors.map((s, i) => {
            const isActive = active === i;
            const color = TIER_COLORS[s.tier];
            return (
              <div
                key={i}
                onClick={() => setActive(isActive ? null : i)}
                style={{
                  borderBottom: `1px solid ${C.border}`,
                  cursor: 'pointer',
                  background: isActive ? `rgba(27,77,62,0.04)` : 'transparent',
                  transition: 'background 0.2s',
                }}
              >
                {/* Row */}
                <div className="sector-row" style={{
                  display: 'grid',
                  gridTemplateColumns: '32px 2fr 1fr 80px 40px',
                  gap: '16px',
                  padding: '12px 0',
                  alignItems: 'center',
                }}>
                  <span style={{ fontFamily: F.mono, fontSize: '10px', color: C.faint }}>{s.n}</span>
                  <div>
                    <div style={{ fontFamily: F.sans, fontSize: '13px', fontWeight: 700, color: C.ink }}>{s.name}</div>
                    <div style={{ fontFamily: F.body, fontSize: '11px', color: C.faint, fontStyle: 'italic', marginTop: '2px' }}>{s.key}</div>
                  </div>
                  {/* Score bar */}
                  <div className="sector-bar" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ flex: 1, height: '4px', background: C.border, borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ width: `${s.score}%`, height: '100%', background: color, borderRadius: '2px' }} />
                    </div>
                  </div>
                  <div style={{ fontFamily: F.mono, fontSize: '16px', fontWeight: 500, color: color, textAlign: 'right' }}>{s.score}</div>
                  <div style={{ textAlign: 'right', fontSize: '12px', color: isActive ? C.lime : C.faint }}>
                    {isActive ? '▲' : '▼'}
                  </div>
                </div>

                {/* Expanded detail */}
                {isActive && (
                  <div style={{
                    padding: '0 0 20px 48px',
                    display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
                    gap: '16px',
                  }} className="three-col">
                    <div>
                      <div style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: C.faint, marginBottom: '4px' }}>Capital Range</div>
                      <div style={{ fontFamily: F.mono, fontSize: '16px', color: C.forest }}>{s.cap}</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: C.faint, marginBottom: '4px' }}>Tier</div>
                      <div style={{ fontFamily: F.sans, fontSize: '12px', fontWeight: 700, color: color }}>{s.tier} Priority</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: C.faint, marginBottom: '4px' }}>Full Analysis</div>
                      <div style={{ fontFamily: F.sans, fontSize: '11px', color: C.muted, fontStyle: 'italic' }}>Members Intelligence Suite ›</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <SectionFolio section="12-Sector Map · BRIDGE Ghana Intelligence" pageNum="10–13" />
      </div>
    </div>
  );
};

/* ── SECTOR SPOTLIGHT: AGRICULTURE ─────────────────────────────────────── */

const SectorSpotlight = () => (
  <div className="pad-section" style={{ background: C.forest, padding: '72px 56px' }}>
    <div style={{ maxWidth: '860px', margin: '0 auto' }}>

      {/* Dark section header */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ borderTop: `6px solid ${C.paper}`, borderBottom: `2px solid ${C.lime}`, paddingBottom: '3px', marginBottom: '16px' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontFamily: F.sans, fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: C.lime }}>Sector Spotlight</span>
          <span style={{ fontFamily: F.mono, fontSize: '10px', color: 'rgba(250,248,243,0.35)' }}>p.14</span>
        </div>
        <h2 style={{ fontFamily: F.display, fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 700, color: C.paper, lineHeight: 1.15, marginTop: '12px', letterSpacing: '-0.5px' }}>
          Agriculture &amp; Value Chains:<br />
          <em style={{ color: C.lime, fontStyle: 'italic' }}>$1.9 billion vanishing upstream</em>
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'start' }} className="two-col">

        {/* Left */}
        <div>
          <p style={{ fontFamily: F.body, fontSize: '15px', lineHeight: 1.85, color: 'rgba(250,248,243,0.8)', marginBottom: '20px', fontWeight: 300 }}>
            Ghana's agricultural sector employs 40% of the national workforce and
            produces commodities of global significance — cocoa, shea, cashews,
            fresh produce. Yet a structural failure in the value chain means that
            Ghana exports raw commodities at commodity prices while importing
            processed foods it could produce domestically.
          </p>
          <p style={{ fontFamily: F.body, fontSize: '15px', lineHeight: 1.85, color: 'rgba(250,248,243,0.8)', marginBottom: '28px', fontWeight: 300 }}>
            Farmers receive as little as 25 cents of every consumer cedi.
            Post-harvest losses exceed 40% for perishables — crops destroyed in
            transit, in inadequate storage, at the farm gate. The value does not
            disappear. It is simply captured elsewhere, by structures BRIDGE
            is designed to replace.
          </p>

          {/* Value capture chart — editorial bar chart */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: C.lime, marginBottom: '16px' }}>
              Value distribution — farm to consumer
            </div>
            {[
              { label: 'Farm Gate (producer)', pct: 25, alert: true },
              { label: 'Aggregation / Middlemen', pct: 18, alert: false },
              { label: 'Processing (minimal domestic)', pct: 20, alert: true },
              { label: 'Distribution & Logistics', pct: 17, alert: false },
              { label: 'Retail / Export',  pct: 20, alert: false },
            ].map((s, i) => (
              <div key={i} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontFamily: F.sans, fontSize: '11px', color: s.alert ? 'rgba(250,248,243,0.95)' : 'rgba(250,248,243,0.55)', fontWeight: s.alert ? 700 : 400 }}>{s.label}</span>
                  <span style={{ fontFamily: F.mono, fontSize: '11px', color: s.alert ? C.lime : 'rgba(250,248,243,0.4)' }}>{s.pct}%</span>
                </div>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${s.pct * 4}%`, height: '100%', background: s.alert ? C.lime : 'rgba(255,255,255,0.25)', borderRadius: '3px' }} />
                </div>
              </div>
            ))}
          </div>

          <PullQuote attribution="BRIDGE Sector Analysis, Agriculture" light>
            The processing gap is not a supply problem. It is a capital problem.
            The demand exists. The crops exist. What is missing is the facility.
          </PullQuote>
        </div>

        {/* Right — data callouts */}
        <div>
          {/* Oversized key figures */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', marginBottom: '24px' }}>
            {[
              { v: '40%',   l: 'Post-harvest loss rate',         c: 'rgba(168,32,13,0.85)' },
              { v: '$1.9B', l: 'Annual value leakage estimate',   c: C.lime },
              { v: '25%',   l: 'Producer share of final price',   c: 'rgba(168,32,13,0.85)' },
              { v: '40–60%',l: 'Farmer income uplift potential',  c: C.lime },
            ].map((d, i) => (
              <div key={i} style={{
                background: 'rgba(0,0,0,0.2)',
                padding: '20px 18px',
                borderRadius: '2px',
              }}>
                <div style={{ fontFamily: F.mono, fontSize: '26px', fontWeight: 500, color: d.c, lineHeight: 1, marginBottom: '6px' }}>{d.v}</div>
                <div style={{ fontFamily: F.sans, fontSize: '10px', color: 'rgba(250,248,243,0.5)', lineHeight: 1.4 }}>{d.l}</div>
              </div>
            ))}
          </div>

          {/* BRIDGE thesis box */}
          <div style={{
            border: `1px solid ${C.lime}`,
            padding: '24px',
            borderRadius: '2px',
            marginBottom: '24px',
          }}>
            <div style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: C.lime, marginBottom: '12px' }}>
              BRIDGE Investment Thesis
            </div>
            <p style={{ fontFamily: F.body, fontSize: '13px', lineHeight: 1.7, color: 'rgba(250,248,243,0.7)', fontStyle: 'italic' }}>
              $10–15M deployed across 3–5 processing nodes, cold chain infrastructure,
              and cooperative capital. Target: increase farmer capture from 25% to 40%+
              of final consumer prices. 10,000 farmers in scope. Projected portfolio
              IRR: 12–18%.
            </p>
          </div>

          {/* What members see */}
          <div style={{
            background: 'rgba(184,217,53,0.08)',
            border: `1px solid rgba(184,217,53,0.2)`,
            padding: '18px 20px',
            borderRadius: '2px',
          }}>
            <div style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(184,217,53,0.7)', marginBottom: '10px' }}>
              Members see full analysis
            </div>
            {['Venture-level scoring across 18 agriculture opportunities', 'Processing facility site analysis & co-investor terms', 'Cooperative development pipeline & financing structures', 'Policy alignment: 2026 Budget agriculture allocations'].map((item, i) => (
              <div key={i} style={{
                display: 'flex', gap: '10px',
                marginBottom: i < 3 ? '8px' : 0,
                fontFamily: F.body, fontSize: '12px',
                color: 'rgba(250,248,243,0.5)', fontStyle: 'italic', lineHeight: 1.4,
              }}>
                <span style={{ color: C.lime, flexShrink: 0 }}>›</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        borderTop: `1px solid rgba(184,217,53,0.2)`,
        paddingTop: '8px', marginTop: '48px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ fontFamily: F.sans, fontSize: '10px', fontWeight: 700, color: 'rgba(184,217,53,0.5)', letterSpacing: '1px', textTransform: 'uppercase' }}>
          Sector Spotlight · BRIDGE Ghana Intelligence
        </span>
        <span style={{ fontFamily: F.mono, fontSize: '10px', color: 'rgba(250,248,243,0.25)' }}>14–17</span>
      </div>
    </div>
  </div>
);

/* ── METHODOLOGY PANEL ───────────────────────────────────────────────────── */

const Methodology = () => (
  <div className="pad-section" style={{ background: C.paperDark, padding: '72px 56px', borderTop: `1px solid ${C.border}` }}>
    <div style={{ maxWidth: '860px', margin: '0 auto' }}>

      <div style={{ marginBottom: '48px' }}>
        <div style={{ borderTop: `6px solid ${C.ink}`, borderBottom: `2px solid ${C.lime}`, paddingBottom: '3px', marginBottom: '16px' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontFamily: F.sans, fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: C.muted }}>How We Work</span>
          <span style={{ fontFamily: F.mono, fontSize: '10px', color: C.faint }}>p.18</span>
        </div>
        <h2 style={{ fontFamily: F.display, fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: C.ink, lineHeight: 1.2, marginTop: '12px', letterSpacing: '-0.3px' }}>
          Intelligence first.<br />
          <em style={{ color: C.forest, fontStyle: 'italic' }}>Then capital. Then action.</em>
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px' }} className="two-col">
        <div>
          <BodyText>
            BRIDGE operates a four-phase cycle across all 12 sectors: deep landscape analysis,
            scoring through the BRIDGE Impact Score™ framework, structured investment across
            four engagement models, and continuous measurement tied to human outcomes — not
            financial metrics alone.
          </BodyText>
          <BodyText>
            The methodology is deliberately multi-dimensional. Our finding — consistent across
            174+ ventures — is that the highest-returning opportunities in Ghana are also those
            with the deepest development potential. The conventional trade-off narrative does
            not hold in this market.
          </BodyText>

          {/* Four engagement models */}
          <div style={{ marginTop: '28px' }}>
            <div style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: C.muted, marginBottom: '16px', borderBottom: `1px solid ${C.border}`, paddingBottom: '8px' }}>
              Four Engagement Models
            </div>
            {[
              { m: 'Direct Investment',    pct: '20–30%', d: 'Controlling stakes in flagship demonstrations' },
              { m: 'Portfolio Investment', pct: '50–60%', d: 'Minority stakes with board representation' },
              { m: 'Strategic Partnership', pct: '5–10%', d: 'Catalyst and co-investor in government-led initiatives' },
              { m: 'Incubation',           pct: '10–20%', d: 'Concept to proof-of-concept, then spin-out' },
            ].map((e, i) => (
              <div key={i} style={{
                display: 'flex', gap: '16px', alignItems: 'flex-start',
                padding: '12px 0', borderBottom: `1px solid ${C.border}`,
              }}>
                <div style={{ fontFamily: F.mono, fontSize: '13px', color: C.forest, minWidth: '56px', fontWeight: 500 }}>{e.pct}</div>
                <div>
                  <div style={{ fontFamily: F.sans, fontSize: '12px', fontWeight: 700, color: C.ink, marginBottom: '2px' }}>{e.m}</div>
                  <div style={{ fontFamily: F.body, fontSize: '11px', color: C.muted, fontStyle: 'italic' }}>{e.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Score dimensions */}
        <div>
          <div style={{
            border: `1px solid ${C.border}`,
            borderRadius: '2px',
            overflow: 'hidden',
          }}>
            <div style={{ background: C.forest, padding: '16px 20px' }}>
              <div style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: C.lime, marginBottom: '4px' }}>
                BRIDGE Impact Score™
              </div>
              <div style={{ fontFamily: F.body, fontSize: '12px', color: 'rgba(250,248,243,0.6)', fontStyle: 'italic' }}>
                Four weighted dimensions · Evaluated across 174+ ventures
              </div>
            </div>
            {[
              { d: 'Market Opportunity',       w: 30, desc: 'Market size, growth rate, competitive dynamics' },
              { d: 'Development Impact',       w: 30, desc: 'Households served, jobs created, income uplift' },
              { d: 'Implementation Feasibility', w: 25, desc: 'Team, regulatory pathway, capital availability' },
              { d: 'Financial Sustainability', w: 15, desc: 'Revenue model, unit economics, path to profit' },
            ].map((dim, i) => (
              <div key={i} style={{
                padding: '18px 20px',
                borderBottom: i < 3 ? `1px solid ${C.border}` : 'none',
                background: i % 2 === 0 ? C.paper : C.paperDark,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                  <div>
                    <div style={{ fontFamily: F.sans, fontSize: '13px', fontWeight: 700, color: C.ink, marginBottom: '3px' }}>{dim.d}</div>
                    <div style={{ fontFamily: F.body, fontSize: '11px', color: C.muted, fontStyle: 'italic' }}>{dim.desc}</div>
                  </div>
                  <div style={{
                    fontFamily: F.mono, fontSize: '20px', fontWeight: 500,
                    color: C.forest, minWidth: '44px', textAlign: 'right',
                  }}>{dim.w}%</div>
                </div>
                {/* Weight bar */}
                <div style={{ marginTop: '10px', height: '3px', background: C.border, borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: `${dim.w * 3}%`, height: '100%', background: C.lime, borderRadius: '2px' }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '20px', fontFamily: F.body, fontSize: '12px', color: C.muted, fontStyle: 'italic', lineHeight: 1.6 }}>
            Scores above 75 indicate core investment priority. Full scoring methodology,
            venture database, and analysis available exclusively to Members.
          </div>
        </div>
      </div>

      <SectionFolio section="How We Work · BRIDGE Ghana Intelligence" pageNum="18–19" />
    </div>
  </div>
);

/* ── MEMBERS GATE ────────────────────────────────────────────────────────── */

const MembersGate = () => (
  <div className="pad-section" style={{
    background: C.ink,
    padding: '72px 56px',
    position: 'relative',
    overflow: 'hidden',
  }}>
    {/* Large typographic background element */}
    <div style={{
      position: 'absolute', right: '-20px', top: '50%',
      transform: 'translateY(-50%)',
      fontFamily: F.display,
      fontSize: 'clamp(120px, 20vw, 200px)',
      fontWeight: 900,
      color: 'rgba(184,217,53,0.04)',
      lineHeight: 1, userSelect: 'none',
      letterSpacing: '-8px',
    }}>MEMBERS</div>

    <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative' }}>

      <div style={{ marginBottom: '48px' }}>
        <div style={{ borderTop: `6px solid ${C.paper}`, borderBottom: `2px solid ${C.lime}`, paddingBottom: '3px', marginBottom: '16px' }} />
        <div style={{ fontFamily: F.sans, fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: C.lime }}>
          Intelligence Suite
        </div>
        <h2 style={{
          fontFamily: F.display, fontSize: 'clamp(28px, 4vw, 52px)',
          fontWeight: 700, color: C.paper, lineHeight: 1.1,
          marginTop: '12px', letterSpacing: '-1px',
        }}>
          This edition shows<br />the surface.<br />
          <em style={{ color: C.lime, fontStyle: 'italic' }}>Members go deeper.</em>
        </h2>
      </div>

      <div className="gate-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '56px', alignItems: 'start' }}>
        <div>
          <p style={{ fontFamily: F.body, fontSize: '15px', lineHeight: 1.85, color: 'rgba(250,248,243,0.65)', marginBottom: '20px', fontWeight: 300 }}>
            The public edition of Ghana Intelligence presents the macro landscape
            and a single sector spotlight. Members receive the full suite: 12 deep-dive
            sector briefs, venture-level scoring across 174+ opportunities, policy
            alignment analysis, and quarterly updates.
          </p>

          {/* What members receive — in editorial list style */}
          <div style={{ borderTop: `2px solid rgba(250,248,243,0.1)` }}>
            {[
              { title: '12 Full Sector Intelligence Briefs',         desc: 'Complete analysis, venture pipeline, and investment thesis for every sector' },
              { title: 'BRIDGE Annual Intelligence Review',          desc: 'The flagship 40+ page institutional report, published annually' },
              { title: 'Venture-Level Scoring Database',             desc: 'Full BRIDGE Impact Score™ across 174+ assessed opportunities' },
              { title: 'Government Policy Alignment Maps',           desc: '2026 Budget and regulatory alignment for capital deployment' },
              { title: 'Quarterly Snapshot Updates',                 desc: 'Rolling indicator updates, new ventures, sector developments' },
              { title: 'Analyst Q&A Access',                        desc: 'Direct access to the BRIDGE Intelligence team for context' },
            ].map((item, i) => (
              <div key={i} style={{
                padding: '16px 0',
                borderBottom: `1px solid rgba(250,248,243,0.07)`,
                display: 'grid', gridTemplateColumns: '20px 1fr',
                gap: '16px',
              }}>
                <span style={{ fontFamily: F.mono, fontSize: '10px', color: C.lime, paddingTop: '3px' }}>›</span>
                <div>
                  <div style={{ fontFamily: F.sans, fontSize: '13px', fontWeight: 700, color: C.paper, marginBottom: '3px' }}>{item.title}</div>
                  <div style={{ fontFamily: F.body, fontSize: '12px', color: 'rgba(250,248,243,0.4)', fontStyle: 'italic', lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA box */}
        <div>
          <div style={{
            border: `1px solid rgba(184,217,53,0.3)`,
            padding: '36px 28px',
            borderRadius: '2px',
            background: 'rgba(184,217,53,0.04)',
          }}>
            <div style={{ fontFamily: F.display, fontSize: '22px', fontWeight: 700, color: C.paper, marginBottom: '8px', lineHeight: 1.2 }}>
              Members Intelligence<br />Access
            </div>
            <div style={{ fontFamily: F.body, fontSize: '13px', color: 'rgba(250,248,243,0.5)', fontStyle: 'italic', marginBottom: '28px', lineHeight: 1.6 }}>
              Individual, institutional, and government partner tiers available. Applied for and approved.
            </div>

            <a href="#" style={{
              display: 'block',
              background: C.lime, color: C.ink,
              padding: '14px 24px', borderRadius: '2px',
              fontFamily: F.sans, fontSize: '13px', fontWeight: 800,
              textAlign: 'center', marginBottom: '12px',
              letterSpacing: '0.5px',
              textDecoration: 'none',
            }}>
              Apply for Members Access
            </a>

            <a href="#" style={{
              display: 'block',
              border: `1px solid rgba(184,217,53,0.3)`,
              color: C.lime, padding: '12px 24px', borderRadius: '2px',
              fontFamily: F.sans, fontSize: '12px', fontWeight: 600,
              textAlign: 'center', textDecoration: 'none', letterSpacing: '0.5px',
            }}>
              View Membership Tiers →
            </a>

            <a href="#" onClick={(e)=>{e.preventDefault();window.print();}} style={{
              display: 'block',
              border: `1px solid rgba(250,248,243,0.1)`,
              color: 'rgba(250,248,243,0.4)', padding: '11px 24px', borderRadius: '2px',
              fontFamily: F.sans, fontSize: '11px', fontWeight: 600,
              textAlign: 'center', textDecoration: 'none', letterSpacing: '0.5px',
              marginTop: '8px',
            }}>
              ↓ Download Free Edition (PDF)
            </a>

            <div style={{
              marginTop: '20px', paddingTop: '20px',
              borderTop: `1px solid rgba(250,248,243,0.08)`,
              fontFamily: F.body, fontSize: '11px',
              color: 'rgba(250,248,243,0.3)', fontStyle: 'italic',
              lineHeight: 1.6,
            }}>
              BRIDGE Intelligence is produced by BRIDGE PBC, a Ghana-first Public Benefit Corporation. This publication does not constitute investment advice. Full disclosures at bridgepbc.com
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ── BACK MATTER / COLOPHON ─────────────────────────────────────────────── */

const Colophon = () => (
  <div className="pad-colophon" style={{
    background: C.forest,
    padding: '28px 56px',
    borderTop: `3px solid ${C.lime}`,
  }}>
    <div className="colophon-inner" style={{ maxWidth: '860px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <div style={{ fontFamily: F.display, fontSize: '14px', fontWeight: 900, color: C.paper, letterSpacing: '2px' }}>
          <BridgeLogo height={22} variant="white" />
        </div>
        <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.15)' }} />
        <div style={{ fontFamily: F.sans, fontSize: '10px', color: 'rgba(250,248,243,0.45)', lineHeight: 1.5 }}>
          Ghana Intelligence · Vol. I · Q1 2026 · Free Public Edition<br />
          Published quarterly · bridgepbc.com/intelligence
        </div>
      </div>
      <div className="colophon-links" style={{ display: 'flex', gap: '20px' }}>
        {['About', 'Members', 'Contact', 'bridgepbc.com'].map((link, i) => (
          <a key={i} href="#" style={{ fontFamily: F.sans, fontSize: '10px', fontWeight: 600, color: 'rgba(250,248,243,0.45)', letterSpacing: '0.5px', textDecoration: 'none' }}>
            {link}
          </a>
        ))}
      </div>
    </div>
  </div>
);

/* ── PRINT/DOWNLOAD BAR ─────────────────────────────────────────────────── */

const TopBar = ({ coverLogoRef }) => {
  const [pastLogo, setPastLogo] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!coverLogoRef?.current) return;
      const rect = coverLogoRef.current.getBoundingClientRect();
      // Show logo once the cover masthead logo has scrolled above the viewport
      setPastLogo(rect.bottom < 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [coverLogoRef]);

  return (
    <div className="no-print pad-topbar" style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: C.paper,
      borderBottom: `1px solid ${C.border}`,
      padding: '10px 56px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          overflow: 'hidden',
          maxWidth: pastLogo ? '180px' : '0px',
          opacity: pastLogo ? 1 : 0,
          transition: 'max-width 0.35s ease, opacity 0.3s ease',
          display: 'flex', alignItems: 'center',
        }}>
          <BridgeLogo height={18} variant="dark" />
          <div style={{ width: '1px', height: '14px', background: C.border, margin: '0 10px', flexShrink: 0 }} />
        </div>
        <span style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: C.forest, background: 'rgba(27,77,62,0.08)', padding: '3px 8px' }}>
          Ghana Intelligence
        </span>
        <span className="mob-hide" style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: C.muted, background: C.paperDark, padding: '3px 8px' }}>
          Q1 2026 · Free Edition
        </span>
      </div>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <span className="mob-hide" style={{ fontFamily: F.sans, fontSize: '9px', color: C.faint }}>bridgepbc.com/intelligence</span>
        <a href="#" style={{
          background: C.forest, color: C.lime,
          padding: '7px 14px',
          fontFamily: F.sans, fontSize: '10px', fontWeight: 700,
          textDecoration: 'none', letterSpacing: '0.3px',
        }}>Members</a>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   ROOT EXPORT
═══════════════════════════════════════════════════════════════════════════ */

export default function BRIDGEGhanaIntelligence() {
  const coverLogoRef = useRef(null);
  return (
    <div style={{ fontFamily: F.body, background: C.paper }}>
      <Fonts />
      <TopBar coverLogoRef={coverLogoRef} />
      <Cover logoRef={coverLogoRef} />
      <EditorsLetter />
      <MacroIndicators />
      <SectorMap />
      <SectorSpotlight />
      <Methodology />
      <MembersGate />
      <Colophon />
    </div>
  );
}
