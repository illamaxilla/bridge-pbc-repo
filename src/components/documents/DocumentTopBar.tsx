import { useState, useEffect } from "react";
import { DOC_COLORS as C, DOC_FONTS as F } from "@/lib/document-tokens";
import DocumentLogo from "./DocumentLogo";

/**
 * Shared sticky top bar for document pages.
 * @param {Object} props
 * @param {React.RefObject} props.coverLogoRef - ref to the cover logo element for scroll detection
 * @param {string} props.breadcrumb - full breadcrumb text for desktop (e.g. "Ghana Cannabis Intelligence · Licence 01 · Cultivation · Members Brief")
 * @param {string} props.mobileBreadcrumb - short breadcrumb for mobile (e.g. "01 · Cultivation")
 * @param {string} [props.badge] - optional badge text (e.g. "MEMBERS BRIEF")
 * @param {string} [props.ctaLabel] - CTA button label (default: "Engage BRIDGE →")
 * @param {string} [props.ctaHref] - CTA button href (default: "#")
 */
const DocumentTopBar = ({coverLogoRef, breadcrumb, mobileBreadcrumb, badge="MEMBERS BRIEF", ctaLabel="Engage BRIDGE →", ctaHref="#"}) => {
  const [past, setPast] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const fn = () => {
      if (!coverLogoRef?.current) return;
      setPast(coverLogoRef.current.getBoundingClientRect().bottom < 0);
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0);
    };
    window.addEventListener('scroll', fn, {passive:true});
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <div className="np pad-topbar" style={{position:'sticky',top:0,zIndex:100,background:C.paper,borderBottom:`1px solid ${C.border}`,padding:'10px 40px',display:'flex',justifyContent:'space-between',alignItems:'center',boxShadow:'0 1px 8px rgba(0,0,0,0.06)',overflow:'hidden'}}>
      <div className="progress-bar" style={{width:`${progress}%`}}/>
      <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
        <div style={{overflow:'hidden',maxWidth:past?'200px':'0px',opacity:past?1:0,transition:'max-width 0.35s ease,opacity 0.3s ease',display:'flex',alignItems:'center'}}>
          <DocumentLogo height={20} variant="dark"/>
          <div style={{width:'1px',height:'16px',background:C.border,margin:'0 10px',flexShrink:0}}/>
        </div>
        <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'11px',color:C.muted}}>{breadcrumb}</span>
        <span className="mob-show" style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest}}>{mobileBreadcrumb}</span>
      </div>
      <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
        {badge && <div className="mob-hide" style={{background:C.lime,color:C.ink,padding:'4px 10px',fontFamily:F.sans,fontSize:'8px',fontWeight:800,letterSpacing:'2px',textTransform:'uppercase'}}>{badge}</div>}
        <a href={ctaHref} style={{background:C.forest,color:C.lime,padding:'7px 14px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,textDecoration:'none',letterSpacing:'0.3px'}}>{ctaLabel}</a>
      </div>
    </div>
  );
};

export default DocumentTopBar;
