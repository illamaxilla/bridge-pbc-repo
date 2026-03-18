import { DOC_COLORS as C, DOC_FONTS as F } from "@/lib/document-tokens";

/**
 * Shared global styles for document pages — replaces the per-page Gf/GS component.
 * Accepts optional `extraCss` for page-specific style additions.
 */
const DocumentGlobalStyles = ({ extraCss = "" }) => (
  <style>{`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Source+Serif+4:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{background:${C.paper};-webkit-font-smoothing:antialiased;overflow-x:hidden;}
  .dc::first-letter{font-family:${F.display};font-size:4em;font-weight:900;float:left;line-height:0.82;margin:0.08em 0.14em 0 0;color:${C.forest};}
  .mob-show{display:none;}
  .mob-risk-body{display:block;}
  .chain-scroll{display:flex;gap:8px;overflow-x:auto;padding-bottom:10px;-webkit-overflow-scrolling:touch;scroll-snap-type:x mandatory;}
  .chain-scroll > *{scroll-snap-align:start;}
  .chain-scroll::-webkit-scrollbar{height:3px;}
  .chain-scroll::-webkit-scrollbar-track{background:${C.border};}
  .chain-scroll::-webkit-scrollbar-thumb{background:${C.limeDark};}
  .progress-bar{position:absolute;bottom:0;left:0;height:2px;background:${C.lime};transition:width 0.1s linear;pointer-events:none;}
  @media print{
    .np{display:none!important;}
    body{background:#fff;}
    .pad-section{padding:32px 48px!important;}
    .pad-gate{background:${C.ink}!important;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
    .pad-cover{-webkit-print-color-adjust:exact;print-color-adjust:exact;}
    a{text-decoration:none!important;}
  }
  @media(max-width:900px){
    .tc{grid-template-columns:1fr!important;}
    .tc2{grid-template-columns:1fr 1fr!important;}
    .tc3{grid-template-columns:1fr 1fr!important;}
    .hm{display:none!important;}
    .pad-section{padding:40px 32px!important;}
    .pad-cover{padding:28px 32px 0!important;}
    .pad-gate{padding:40px 32px!important;}
    .pad-footer{padding:14px 32px!important;}
    .pad-topbar{padding:10px 24px!important;}
  }
  @media(max-width:600px){
    .tc{grid-template-columns:1fr!important;}
    .tc2{grid-template-columns:1fr!important;}
    .tc3{grid-template-columns:1fr!important;}
    .pad-section{padding:24px 18px!important;}
    .pad-cover{padding:20px 18px 0!important;}
    .pad-gate{padding:24px 18px!important;}
    .pad-footer{padding:16px 18px!important;}
    .pad-topbar{padding:10px 18px!important;}
    .mob-hide{display:none!important;}
    .mob-show{display:block!important;}
    .mob-stack{flex-direction:column!important;align-items:flex-start!important;gap:8px!important;}
    .mob-full{width:100%!important;}
    .mob-item-hidden{display:none!important;}
    .mob-toggle{display:flex!important;align-items:center;justify-content:space-between;width:100%;
      padding:10px 0;border:none;border-bottom:1px solid ${C.border};background:transparent;
      cursor:pointer;font-family:${F.sans};font-size:10px;font-weight:700;
      letter-spacing:1.5px;text-transform:uppercase;color:${C.muted};}
    .mob-toggle-dark{border-color:rgba(255,255,255,0.12)!important;color:rgba(250,248,243,0.35)!important;}
    .mob-toggle-hdr{border-color:rgba(255,255,255,0.1)!important;color:rgba(250,248,243,0.5)!important;background:rgba(255,255,255,0.04)!important;padding:10px 14px!important;}
    .gate-value-line{display:none!important;}
    .gate-cta-row{flex-direction:column!important;}
    .footer-links{display:none!important;}
    .footer-inner{justify-content:center!important;}
    .toc-grid{grid-template-columns:1fr!important;}
    .mob-sec-toggle{display:flex!important;width:100%;align-items:center;justify-content:space-between;
      padding:16px 0;border:none;border-bottom:1px solid rgba(255,255,255,0.08);background:transparent;
      cursor:pointer;text-align:left;}
    .mob-sec-toggle-light{border-bottom-color:${C.border}!important;}
    .mob-sec-collapsed{display:none!important;}
    .stats-row>div{flex:0 0 50%!important;border-right:none!important;border-bottom:1px solid rgba(255,255,255,0.07)!important;}
    .stats-row>div:nth-child(odd){border-right:1px solid rgba(255,255,255,0.07)!important;}
    .mob-nav-clearance{padding-bottom:72px!important;}
    .mob-risk-body{display:none!important;}
    .mob-risk-open .mob-risk-body{display:block!important;}
    .mob-carousel{display:flex!important;gap:12px;overflow-x:auto;padding-bottom:4px;
      -webkit-overflow-scrolling:touch;scroll-snap-type:x mandatory;scrollbar-width:none;}
    .mob-carousel::-webkit-scrollbar{display:none;}
    .mob-carousel>.mob-card{scroll-snap-align:start;flex:0 0 85%;min-width:0;}
    .mob-carousel>.mob-card-wide{scroll-snap-align:start;flex:0 0 92%;min-width:0;}
    .mob-phase-body{display:none!important;}
    .mob-phase-open .mob-phase-body{display:block!important;}
    .mob-phase-hdr{display:flex!important;width:100%;align-items:center;justify-content:space-between;
      padding:12px 0;border:none;border-bottom:1px solid ${C.border};background:transparent;
      cursor:pointer;text-align:left;}
    .mob-country-list{display:flex!important;flex-direction:column;gap:0;}
    .stats-row>div:last-child{flex:0 0 100%!important;border-right:none!important;}
    .toc-sub{display:none!important;}
    .toc-item{cursor:pointer;}
    .toc-item:active{background:rgba(184,217,53,0.06);}
    .mob-dim-body{display:none!important;}
    .mob-dim-open .mob-dim-body{display:block!important;}
    .mob-dim-hdr{display:flex!important;width:100%;align-items:center;justify-content:space-between;
      padding:12px 0;border:none;border-bottom:1px solid rgba(255,255,255,0.08);background:transparent;
      cursor:pointer;text-align:left;}
    .mob-cap-hidden{display:none!important;}
    .mob-cost-row{display:grid!important;grid-template-columns:1fr!important;gap:0px!important;padding:10px 0!important;}
    .mob-cost-meta{display:flex!important;gap:12px;margin-top:3px;}
  }
  ${extraCss}
`}</style>
);

export default DocumentGlobalStyles;
