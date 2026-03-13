import { useState, useEffect, useRef } from "react";

const C={ink:'#0D1A10',paper:'#FAF8F3',paperDark:'#F0EDE4',forest:'#1B4D3E',lime:'#B8D935',limeDark:'#8FA825',muted:'#5C6B5E',faint:'#9AAA9C',border:'#D8D4C8',red:'#A8200D',amber:'#B8730A',positive:'#1A6B2F',white:'#FFFFFF'};
const F={display:'"Playfair Display","Georgia",serif',body:'"Source Serif 4","Georgia",serif',sans:'"DM Sans","Helvetica Neue",sans-serif',mono:'"DM Mono","Courier New",monospace'};

const Logo=({height=28,variant='white'})=>{const tf=variant==='white'?'#ffffff':'#1B4D3E';return(<svg height={height} viewBox="0 0 4113.8 932.3" xmlns="http://www.w3.org/2000/svg" style={{display:'block',flexShrink:0}}><polygon fill="#1B4D3E" stroke="#1B4D3E" strokeMiterlimit="10" points="722.6 322.1 462.3 452.8 202 322.8 461.3 192.5 722.6 322.1"/><path fill="#74914a" d="M197.9,426.8c3.9-.5,7,.8,10.7,1.4l252.5,125.7c84.5-40,167.7-83.8,251.9-124.8,33.1-11.5,50.1,34.2,18.5,49.1l-259.2,129.1c-10.2,3.7-14.1,2.6-23.9-1.3l-264.2-133c-17-14.4-8-43.2,13.6-46.1Z"/><path fill="#b8d935" d="M195.3,558c3.7-.6,7.4-.4,11.1-.2,86.1,40.5,170.4,85.1,255.9,126.8l252.9-126c29.5-7.2,45.4,28.7,22.3,46.5l-270.4,134.4-8.6.3c-91.6-42.2-181.1-89.9-271.7-134.4-18.7-12.1-13.3-43.6,8.5-47.4Z"/><path fill={tf} d="M1853.1,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.6,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1Z"/><path fill={tf} d="M1431.7,224.5h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5Z"/><path fill={tf} d="M1488.1,578.7v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6Z"/><rect fill="#b8d935" x="1427.4" y="17.4" width="205.2" height="145"/><rect fill={tf} x="1427.5" y="221.8" width="205.2" height="693.2" rx="9.6" ry="9.6"/><path fill={tf} d="M2757.3,19.1h491.3c5.4,0,9.8,4.4,9.8,9.8v218.7c0,5.4-4.4,9.8-9.8,9.8h-507.4c-57,0-108.5,23-145.9,60.4-37.3,37.2-60.5,88.8-60.5,145.7,0,113.7,92.4,206,206.3,206h12.9c2.9,0,5.1,2.3,5.1,5.1v236.7c0,1.1-.9,1.9-1.9,1.9h0c-242.2,0-438.5-196-438.5-437.8v-18.5c0-241.8,196.3-437.8,438.5-437.8Z"/><rect fill={tf} x="2812.8" y="339.5" width="216.8" height="572.6" rx="9.6" ry="9.6"/><rect fill="#b8d935" x="3083.4" y="339.5" width="175.1" height="257.7"/><rect fill="#b8d935" x="3083.4" y="654.4" width="175.1" height="257.7"/><path fill={tf} d="M3355.1,655.5h31.2v5.7h-31.2v-5.7ZM3355.1,666.9h31.2v11.1h-31.2v-11.1ZM3355.1,683.8h31.2v11.1h-31.2v-11.1ZM3355.1,700.8h31.2v11.1h-31.2v-11.1ZM3355.1,717.7h31.2v11.1h-31.2v-11.1ZM3355.1,734.5h31.2v11.1h-31.2v-11.1ZM3355.1,751.4h31.2v10.8h-31.2v-10.8ZM3355.1,767.9h31.2v11.1h-31.2v-11.1ZM3355.1,784.8h31.2v11.1h-31.2v-11.1ZM3355.1,801.7h31.2v11.1h-31.2v-11.1ZM3355.1,818.5h31.2v11.1h-31.2v-11.1ZM3355.1,835.4h31.2v11.1h-31.2v-11.1ZM3355.1,852.4h31.2v11.1h-31.2v-11.1ZM3355.1,869.2h31.2v11.1h-31.2v-11.1ZM3355.1,886.1h31.2v11.1h-31.2v-11.1ZM3355.1,903h31.2v5.7h-31.2v-5.7ZM3397.5,655.5h61.7c12.5,0,24.3,1.7,35.1,5.7h-96.8v-5.7ZM3397.5,666.9h109.7c5.9,3,11.4,6.7,16.7,11.1h-126.3v-11.1ZM3397.5,801.7h126.3c-5.2,4.4-10.8,8.1-16.7,11.1h-109.7v-11.1ZM3397.5,818.5h96.8c-10.8,4-22.5,6.1-35.1,6.1h-30.5v84h-31.2v-90.2ZM3479.6,739.9c0-17.2-13.5-24.7-28.1-24.7h-23.6v49.3h23.6c14.5,0,28.1-7.5,28.1-24.7ZM3485.5,683.8h44.4c3.4,3,6.6,6.7,9.3,11.1h-37.1c-4.9-4.4-10.8-8.4-16.7-11.1ZM3502.2,784.8h37.1c-2.8,4-5.9,7.8-9.3,11.1h-44.4c5.9-2.7,11.8-6.7,16.7-11.1ZM3507.4,700.8h35.7c2.4,3.4,4.2,7.1,5.6,11.1h-33.6c-2.1-4-4.5-7.8-7.7-11.1ZM3515,767.9h33.6l-5.6,11.1h-35.7c3.1-3.4,5.6-7.1,7.7-11.1ZM3517.8,717.7h32.6c1.3,3.7,2.4,7.5,2.8,11.1h-32.3c-.7-3.7-1.8-7.5-3.1-11.1ZM3520.9,751.4h32.3c-.3,3.7-1.3,7.5-2.8,10.8h-32.6c1.3-3.4,2.4-7.1,3.1-10.8ZM3521.7,734.5h32.3c.3,3.7.3,7.5-.3,11.1h-32c.7-3.7.7-7.5,0-11.1ZM3397.5,689.1h61.7c28.4,0,51.7,23.3,51.7,50.9s-23.2,50.9-51.7,50.9h-61.7v-102Z"/><path fill={tf} d="M3572.3,655.5h31.2v5.7h-31.2v-5.7ZM3572.3,666.9h31.2v11.1h-31.2v-11.1ZM3572.3,683.8h31.2v11.1h-31.2v-11.1ZM3572.3,700.8h31.2v11.1h-31.2v-11.1ZM3572.3,717.7h31.2v11.1h-31.2v-11.1ZM3572.3,734.5h31.2v11.1h-31.2v-11.1ZM3572.3,751.4h31.2v10.8h-31.2v-10.8ZM3572.3,767.9h31.2v11.1h-31.2v-11.1ZM3572.3,784.8h31.2v11.1h-31.2v-11.1ZM3572.3,801.7h31.2v11.1h-31.2v-11.1ZM3572.3,818.5h31.2v11.1h-31.2v-11.1ZM3572.3,835.4h31.2v11.1h-31.2v-11.1ZM3572.3,852.4h31.2v11.1h-31.2v-11.1ZM3572.3,869.2h31.2v11.1h-31.2v-11.1ZM3572.3,886.1h31.2v11.1h-31.2v-11.1ZM3572.3,903h31.2v5.7h-31.2v-5.7ZM3614.6,655.5h45.4c12.5,0,24.6,2.1,35.7,5.7h-81.2v-5.7ZM3614.6,666.9h94.4c5.9,3,11.4,6.7,16,11.1h-110.3v-11.1ZM3614.6,688.9h45.4c23.6,0,42,12.5,42,34.1,0,36.4-42.3,62.5-87.5,72.2v-106.4ZM3685.4,775.1c17.3,9.8,36.4,32.4,36.4,57.1s-16,43.2-46.2,43.2h-61.1v-69.5c24.6-4.8,52.4-15.6,70.8-30.7ZM3614.6,886.1h125.2c-4.5,4.4-10.1,8.1-16,11.1h-109.3v-11.1ZM3614.6,903h96.1c-10.8,3.7-22.5,5.7-35.1,5.7h-61.1v-5.7ZM3674.3,725.4c0-7.5-6.6-12.9-15.6-12.9h-16.3v49c19.8-9.1,32-21.9,32-36.1ZM3686.1,805.8c-13.2,7.5-28.4,13.5-43.7,18.3v27.7h32c19.1,0,27.1-17.5,11.8-45.9ZM3687.5,683.8h43.1c3.1,3.4,5.6,7.1,7.7,11.1h-35.4c-4.2-4.8-9.3-8.4-15.3-11.1ZM3694.7,767.9h38.9c3.8,3.7,7.3,7.5,10.4,11.1h-35.7c-4.2-4.4-9-8.1-13.5-11.1ZM3705.8,751.4h30.5c-2.1,4-4.5,7.8-7.3,10.8h-30.9c2.8-3.4,5.6-7.1,7.7-10.8ZM3718.4,869.2h35.7c-2.4,4-5.2,7.8-8.7,11.1h-42.3c5.9-3,11.1-6.7,15.3-11.1ZM3706.9,700.8h33.6c1.3,2.7,2.8,7.1,3.1,11.1h-32c-1-4-2.8-7.8-4.9-11.1ZM3711.8,734.5h30.9c-.7,4-1.8,7.8-3.4,11.1h-30.5c1.3-3.7,2.4-7.5,3.1-11.1ZM3712.8,717.7h31.2c.3,3.7.3,7.5-.3,11.1h-30.9c.7-3,.7-8.1,0-11.1ZM3713.8,784.8h34.3c2.4,3.4,4.9,7.5,6.6,11.1h-33c-2.4-4-5.2-7.8-8-11.1ZM3729.1,852.4h32.3c-.7,3.7-2.1,7.5-4.2,11.1h-34c2.4-3.4,4.5-7.1,5.9-11.1ZM3724.9,801.7h32.6c1.8,3.7,3.1,7.5,3.8,11.1h-31.5c-1.3-3.7-2.8-7.5-4.9-11.1ZM3732.6,835.4h31.5c0,3.7-.3,7.5-1.3,11.1h-32c1-3.7,1.8-7.5,1.8-11.1ZM3731.3,818.5h31.5c1,3.7,1.3,7.5,1.3,11.1h-31.2c-.3-3.7-.7-7.5-1.8-11.1Z"/><path fill={tf} d="M3774.6,767.9h32l-.7,11.1h-32c0-3.4.3-7.8.7-11.1ZM3773.9,784.8h32c0,3.4.3,7.5.7,11.1h-32c-.3-3.4-.7-7.8-.7-11.1ZM3777.7,751.4h32.3c-1,3.7-1.8,6.7-2.4,10.8h-32.3c.7-3.7,1.3-7.1,2.4-10.8ZM3775.3,801.7h32.3c.7,4,1.3,7.5,2.4,11.1h-32.3c-1-3.7-1.8-7.5-2.4-11.1ZM3783.2,734.5h33c-1.8,3.7-3.1,7.5-4.5,11.1h-32.6c1-3.7,2.4-7.5,4.2-11.1ZM3779.1,818.5h32.6c1.3,3.7,2.8,7.5,4.5,11.1h-33c-1.8-3.7-3.1-7.5-4.2-11.1ZM3791.5,717.7h34.3l-7,11.1h-33.3c1.8-3.7,3.4-7.1,5.9-11.1ZM3785.7,835.4h33.3l7,11.1h-34.3c-2.4-4-4.2-7.5-5.9-11.1ZM3803.4,700.8h37.5c-3.8,3.4-7.7,7.5-10.4,11.1h-35.4c2.1-3.4,5.2-7.5,8.3-11.1ZM3795.1,852.4h35.4c2.8,3.7,6.6,7.8,10.4,11.1h-37.5c-3.1-3.7-6.2-7.8-8.3-11.1ZM3819.7,683.8h45.1c-5.9,3-11.8,6.7-17.3,11.1h-39.2c3.8-4,7.7-7.8,11.4-11.1ZM3808.2,869.2h39.2c5.6,4.4,11.4,8.1,17.3,11.1h-45.1c-3.8-3.4-7.7-7.1-11.4-11.1ZM3817,782.1c0-55.4,43.1-99.3,96.8-99.3s57.9,14.2,75.6,36.8l-18.1,21.9c-12.9-18.9-33.6-31-57.6-31-36.1,0-64.9,31-64.9,71.6s28.8,71.6,64.9,71.6,44.7-12.1,57.6-31l18.1,21.9c-17.7,22.6-44.7,36.8-75.6,36.8-53.7,0-96.8-43.9-96.8-99.3ZM3844.7,666.9h138.1c6.2,3.4,12.1,7.1,17.7,11.1h-51.1c-11.4-4-23.2-6.1-35.7-6.1s-24.3,2.1-35.7,6.1h-51.1c5.6-4,11.4-7.8,17.7-11.1ZM3826.9,886.1h51.1c11.4,4,23.2,6.1,35.7,6.1s24.3-2.1,35.7-6.1h51.1c-5.6,4-11.4,7.8-17.7,11.1h-138.1c-6.2-3.4-12.1-7.1-17.7-11.1ZM3913.8,650.1c20.4,0,39.5,4,56.9,11.1h-113.8c17.3-7.1,36.4-11.1,56.9-11.1ZM3856.8,903h113.8c-17.3,7.1-36.4,11.1-56.9,11.1s-39.5-4-56.9-11.1ZM3962.6,683.8h45.1l5.9,5.4-4.5,5.7h-29.2c-5.6-4.4-11.4-8.1-17.3-11.1ZM3980,869.2h29.2l4.5,5.4c-1.8,2.1-3.8,4-5.9,5.7h-45.1c5.9-3,11.8-6.7,17.3-11.1ZM3986.6,700.8h18.1l-8.3,10.2c-2.8-3.4-6.2-7.1-9.8-10.2ZM3996.3,853.3l8.3,10.2h-18.1c3.4-3,7-6.7,9.8-10.2Z"/></svg>);};

const Gf=()=>(<style>{`*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}body{background:${C.paper};-webkit-font-smoothing:antialiased;}.dc::first-letter{font-family:${F.display};font-size:5em;font-weight:900;float:left;line-height:0.75;margin:0.08em 0.1em 0 0;color:${C.forest};}@keyframes fu{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}.fu{animation:fu 0.7s ease both;}.fu2{animation:fu 0.7s 0.2s ease both;}.fu3{animation:fu 0.7s 0.4s ease both;}@media print{.np{display:none!important;}}@media(max-width:900px){.tc{grid-template-columns:1fr!important;}}
  @media(max-width:600px){
    .tc{grid-template-columns:1fr!important;}
    .mob-hide{display:none!important;}
    .mob-show{display:block!important;}
    .pad-topbar{padding:9px 16px!important;}
    .pad-footer{padding:20px 16px!important;}
    .pad-cover-top{padding:12px 16px!important;}
    .pad-section{padding:36px 20px!important;}
    .cover-body{padding:36px 20px 44px!important;}
    .cover-stripe{display:none!important;}
    .stats-strip-ar{grid-template-columns:1fr 1fr!important;}
    .stats-strip-ar>div{border-right:none!important;}
    .stat-br{border-right:none!important;}
    .toc-grid{grid-template-columns:1fr!important;}
    .toc-item{border-right:none!important;padding-left:0!important;}
    .cta-row{flex-direction:column!important;}
    .cta-row a{width:100%!important;text-align:center!important;box-sizing:border-box!important;}
    .yr-body{gap:32px!important;}
    .kej-grid{gap:28px!important;}
    .wi-grid{gap:28px!important;}
  }`}</style>);

const SH=({eyebrow,title,page,light=false})=>(<div style={{marginBottom:'40px'}}><div style={{borderTop:`6px solid ${light?C.paper:C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'16px'}}/><div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline'}}><span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:light?C.lime:C.muted}}>{eyebrow}</span>{page&&<span style={{fontFamily:F.mono,fontSize:'10px',color:light?'rgba(250,248,243,0.35)':C.faint}}>{page}</span>}</div>{title&&<h2 style={{fontFamily:F.display,fontSize:'clamp(24px,3vw,38px)',fontWeight:700,color:light?C.paper:C.ink,lineHeight:1.2,marginTop:'12px',letterSpacing:'-0.5px'}}>{title}</h2>}</div>);

const Bp=({children,light=false})=>(<p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:light?'rgba(250,248,243,0.75)':C.ink,marginBottom:'18px',fontWeight:300}}>{children}</p>);

const TopBar=({coverLogoRef})=>{
  const[past,setPast]=useState(false);
  useEffect(()=>{const fn=()=>{if(!coverLogoRef?.current)return;setPast(coverLogoRef.current.getBoundingClientRect().bottom<0);};window.addEventListener('scroll',fn,{passive:true});return()=>window.removeEventListener('scroll',fn);},[coverLogoRef]);
  return(
    <div className="np pad-topbar" style={{position:'sticky',top:0,zIndex:100,background:C.paper,borderBottom:`1px solid ${C.border}`,padding:'10px 56px',display:'flex',justifyContent:'space-between',alignItems:'center',boxShadow:'0 1px 8px rgba(0,0,0,0.06)'}}>
      <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
        <div style={{overflow:'hidden',maxWidth:past?'180px':'0px',opacity:past?1:0,transition:'max-width 0.35s ease,opacity 0.3s ease',display:'flex',alignItems:'center'}}>
          <Logo height={18} variant="dark"/>
          <div style={{width:'1px',height:'14px',background:C.border,margin:'0 10px',flexShrink:0}}/>
        </div>
        <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.forest,background:'rgba(27,77,62,0.08)',padding:'3px 8px'}}>Annual Review</span>
        <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.muted,background:C.paperDark,padding:'3px 8px'}}>2025 · Public Teaser</span>
      </div>
      <div style={{display:'flex',gap:'10px',alignItems:'center'}}>
        <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'9px',color:C.faint}}>bridgepbc.com/annual-review</span>
        <a href="#" style={{background:C.forest,color:C.lime,padding:'7px 14px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,textDecoration:'none',letterSpacing:'0.3px'}}>Members</a>
      </div>
    </div>
  );
};

const Cover=({logoRef})=>(
  <div style={{background:C.ink,minHeight:'100vh',display:'flex',flexDirection:'column',position:'relative',overflow:'hidden'}}>
    <div style={{position:'absolute',left:0,right:0,top:'50%',transform:'translateY(-60%)',textAlign:'center',fontFamily:F.display,fontSize:'clamp(140px,26vw,300px)',fontWeight:900,color:'rgba(255,255,255,0.035)',lineHeight:1,userSelect:'none',letterSpacing:'-12px',pointerEvents:'none'}}>2025</div>
    <div className="cover-stripe" style={{position:'absolute',left:'56px',top:0,bottom:0,width:'3px',background:`linear-gradient(to bottom,transparent,${C.lime} 20%,${C.lime} 80%,transparent)`}}/>
    <div ref={logoRef} className="pad-cover-top" style={{padding:'20px 56px 20px 80px',borderBottom:`1px solid rgba(255,255,255,0.08)`,display:'flex',justifyContent:'space-between',alignItems:'center',position:'relative'}}>
      <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
        <Logo height={26} variant="white"/>
        <div className="mob-hide" style={{width:'1px',height:'18px',background:'rgba(255,255,255,0.15)'}}/>
        <span className="mob-hide" style={{fontFamily:F.mono,fontSize:'10px',color:'rgba(255,255,255,0.3)',letterSpacing:'1.5px'}}>ANNUAL REVIEW</span>
      </div>
      <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'2px',textTransform:'uppercase',border:`1px solid rgba(184,217,53,0.4)`,padding:'3px 10px'}}>Public Teaser</span>
    </div>
    <div className="cover-body" style={{flex:1,display:'flex',flexDirection:'column',justifyContent:'flex-end',padding:'0 80px 64px 80px',position:'relative'}}>
      <div className="fu" style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',color:C.lime,marginBottom:'24px'}}>The Architecture of Progress — A Year in Review</div>
      <div className="fu2" style={{marginBottom:'32px'}}>
        <h1 style={{fontFamily:F.display,fontSize:'clamp(56px,10vw,120px)',fontWeight:900,color:C.paper,lineHeight:0.92,letterSpacing:'-4px'}}>Year<br/><em style={{color:C.lime,fontStyle:'italic',fontWeight:700}}>One.</em></h1>
      </div>
      <div className="fu3" style={{maxWidth:'520px',fontFamily:F.body,fontSize:'16px',fontStyle:'italic',lineHeight:1.7,color:'rgba(250,248,243,0.5)',marginBottom:'48px'}}>BRIDGE PBC's inaugural Annual Review. 174+ ventures assessed. 12 sectors mapped. One integrated framework for Ghana's development — deployed.</div>
      <div style={{borderTop:`1px solid rgba(255,255,255,0.1)`,paddingTop:'28px',display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'0'}} className="tc">
        {[{pg:'04',ch:'I',title:'The Year in Context',sub:'What 2025 revealed about Ghana\'s opportunity architecture'},{pg:'10',ch:'II',title:'12 Sectors, One Framework',sub:'BRIDGE Impact Score™ — full landscape assessment'},{pg:'18',ch:'III',title:'Capital & Results',sub:'Portfolio performance, partnerships, pipeline'},{pg:'26',ch:'IV',title:'Voices from the Field',sub:'Partners, communities, founders — in their words'},{pg:'34',ch:'V',title:'The Road Ahead',sub:'2026 priorities and the scaling mandate'},{pg:'—',ch:'VI',title:'Full Access',sub:'Members: complete data, venture database, analysis'}].map((c,i)=>(
          <div key={i} className="toc-item" style={{paddingRight:'20px',borderRight:i%3<2?`1px solid rgba(255,255,255,0.07)`:'none',paddingLeft:i%3>0?'20px':'0',marginBottom:'20px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'6px'}}><span style={{fontFamily:F.mono,fontSize:'9px',color:C.lime}}>p.{c.pg}</span><span style={{width:'16px',height:'1px',background:'rgba(255,255,255,0.12)',display:'inline-block'}}/><span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:'rgba(255,255,255,0.2)'}}>Ch.{c.ch}</span></div>
            <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.paper,marginBottom:'3px',lineHeight:1.3}}>{c.title}</div>
            <div style={{fontFamily:F.body,fontSize:'10px',color:'rgba(250,248,243,0.32)',fontStyle:'italic',lineHeight:1.4}}>{c.sub}</div>
          </div>
        ))}
      </div>
    </div>
    <div style={{height:'4px',background:`linear-gradient(90deg,${C.lime},${C.limeDark})`}}/>
  </div>
);

const YearNumbers=()=>(
  <div className="pad-section" style={{background:C.paper,padding:'72px 80px',borderBottom:`1px solid ${C.border}`}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <SH eyebrow="The Year in Numbers" title="2025: the founding year, quantified" page="p.04"/>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',borderTop:`2px solid ${C.ink}`,marginBottom:'48px'}} className="tc">
        {[{v:'174+',l:'Ventures assessed',s:'across 12 integrated sectors'},{v:'12',l:'Sectors mapped',s:'infrastructure to creative industries'},{v:'$15B+',l:'Unrealised potential',s:'identified in BRIDGE pipeline'},{v:'4',l:'Engagement models',s:'direct, portfolio, partnership, incubation'}].map((d,i)=>(
          <div key={i} className="stat-br" style={{padding:'32px 24px 24px',borderRight:i<3?`1px solid ${C.border}`:'none',borderBottom:`1px solid ${C.border}`}}>
            <div style={{fontFamily:F.mono,fontSize:'clamp(28px,4vw,48px)',fontWeight:500,color:C.forest,lineHeight:1,letterSpacing:'-2px',marginBottom:'8px'}}>{d.v}</div>
            <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink,marginBottom:'3px'}}>{d.l}</div>
            <div style={{fontFamily:F.body,fontSize:'11px',color:C.muted,fontStyle:'italic'}}>{d.s}</div>
          </div>
        ))}
      </div>
      <div className="tc yr-body" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'56px'}}>
        <div>
          <div style={{borderLeft:`4px solid ${C.lime}`,paddingLeft:'24px',marginBottom:'28px'}}>
            <p style={{fontFamily:F.display,fontSize:'20px',fontStyle:'italic',fontWeight:600,lineHeight:1.5,color:C.forest}}>"Year One was not about proving concepts. It was about building the intelligence infrastructure that makes every year after it compoundable."</p>
            <div style={{marginTop:'10px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.muted}}>— BRIDGE Founding Statement, 2025</div>
          </div>
          <Bp>BRIDGE's inaugural year was an intelligence operation. Before capital could be deployed with precision, the full landscape had to be mapped — sector by sector, venture by venture, constraint by constraint.</Bp>
          <Bp>The result: a proprietary database of 174+ assessed opportunities, scored across four dimensions, sequenced by impact and implementation readiness.</Bp>
        </div>
        <div>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'16px',borderBottom:`1px solid ${C.border}`,paddingBottom:'8px'}}>2025 Milestones</div>
          {[{q:'Q1',e:'BRIDGE PBC incorporated; founding framework established',t:'Foundation'},{q:'Q2',e:'White paper published; 12-sector architecture finalised',t:'Architecture'},{q:'Q2',e:'BRIDGE Impact Score™ methodology locked; 174+ ventures assessed',t:'Intelligence'},{q:'Q3',e:'Kejetia Market digitisation platform: pilot initiated',t:'Flagship'},{q:'Q3',e:'Government Partnership Strategy; 2026 Budget alignment mapped',t:'Policy'},{q:'Q4',e:'Website launched; public intelligence programme initiated',t:'Platform'},{q:'Q4',e:'Agriculture Crisis response strategy developed',t:'Response'}].map((m,i)=>(
            <div key={i} style={{display:'flex',gap:'16px',paddingBottom:'14px',marginBottom:'14px',borderBottom:i<6?`1px solid ${C.border}`:'none',alignItems:'flex-start'}}>
              <div style={{minWidth:'24px',fontFamily:F.mono,fontSize:'10px',color:C.lime,fontWeight:500,paddingTop:'2px'}}>{m.q}</div>
              <div style={{flex:1}}>
                <div style={{fontFamily:F.body,fontSize:'12px',color:C.ink,lineHeight:1.5,marginBottom:'3px'}}>{m.e}</div>
                <div style={{display:'inline-block',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1px',color:C.forest,border:`1px solid ${C.border}`,padding:'1px 6px'}}>{m.t}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Kejetia=()=>(
  <div className="pad-section" style={{background:C.forest,padding:'72px 80px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <SH eyebrow="Flagship Initiative" title="Kejetia Market: West Africa's largest market meets its digital moment" page="p.14" light/>
      <div className="tc kej-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'56px'}}>
        <div>
          <Bp light>West Africa's largest market. 10,000+ vendors. Entirely paper-based — opaque, fragmented, and operating far below its economic potential.</Bp>
          <Bp light>BRIDGE's flagship infrastructure investment targets Kejetia Market in Kumasi: payment processing, inventory management, vendor analytics, and marketplace connectivity. Traditional commerce made intelligent, without displacing its cultural character.</Bp>
          <Bp light>This is an amplification story. The market's vitality exists. The infrastructure to scale it does not. BRIDGE builds the latter.</Bp>
          <div style={{borderLeft:`4px solid ${C.lime}`,paddingLeft:'24px',marginTop:'28px'}}><p style={{fontFamily:F.display,fontSize:'18px',fontStyle:'italic',color:C.paper,lineHeight:1.5}}>"The goal is not to modernise the market. The goal is to make every vendor in it more powerful."</p></div>
        </div>
        <div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'2px',marginBottom:'24px'}}>
            {[{v:'10,000+',l:'Vendors in scope',c:C.lime},{v:'GHS 3T',l:'Ecosystem transaction volume',c:'rgba(250,248,243,0.85)'},{v:'0%',l:'Currently digitised',c:'rgba(220,80,60,0.9)'},{v:'15–25%',l:'Transaction cost reduction target',c:C.lime}].map((d,i)=>(
              <div key={i} style={{background:'rgba(0,0,0,0.22)',padding:'20px 18px',borderRadius:'2px'}}>
                <div style={{fontFamily:F.mono,fontSize:'24px',color:d.c,lineHeight:1,marginBottom:'6px'}}>{d.v}</div>
                <div style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(250,248,243,0.45)',lineHeight:1.4}}>{d.l}</div>
              </div>
            ))}
          </div>
          <div style={{border:`1px solid rgba(184,217,53,0.3)`,padding:'20px',borderRadius:'2px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'12px'}}>Digitisation Roadmap</div>
            {[{ph:'Phase 1',d:'Payment infrastructure & vendor onboarding'},{ph:'Phase 2',d:'Inventory management & business intelligence'},{ph:'Phase 3',d:'Marketplace connectivity & export linkages'}].map((p,i)=>(
              <div key={i} style={{display:'flex',gap:'12px',paddingBottom:i<2?'10px':'0',marginBottom:i<2?'10px':'0',borderBottom:i<2?'1px solid rgba(184,217,53,0.12)':'none'}}>
                <span style={{fontFamily:F.mono,fontSize:'11px',color:C.lime,minWidth:'64px'}}>{p.ph}</span>
                <span style={{fontFamily:F.body,fontSize:'12px',color:'rgba(250,248,243,0.6)',fontStyle:'italic'}}>{p.d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{borderTop:`1px solid rgba(184,217,53,0.15)`,paddingTop:'8px',marginTop:'48px',display:'flex',justifyContent:'space-between'}}>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:'rgba(184,217,53,0.4)',letterSpacing:'1px',textTransform:'uppercase'}}>Flagship · Annual Review 2025</span>
        <span style={{fontFamily:F.mono,fontSize:'10px',color:'rgba(250,248,243,0.2)'}}>14–17</span>
      </div>
    </div>
  </div>
);

const WhatsInside=()=>(
  <div className="pad-section" style={{background:C.paperDark,padding:'72px 80px',borderTop:`1px solid ${C.border}`}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <SH eyebrow="Full Annual Review" title="Members receive the complete picture" page="p.38"/>
      <div className="tc wi-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'56px'}}>
        <div>
          <Bp>The public edition presents the founding framework, year in numbers, and the Kejetia flagship. The full review — exclusive to Members — goes substantially deeper.</Bp>
          <Bp>174 pages. 12 sector deep-dives. Venture-level scoring across every assessed opportunity. Government policy maps. Financial projections. And a forward-looking 2026 deployment mandate.</Bp>
          <div style={{background:C.forest,padding:'24px',borderRadius:'2px',marginTop:'8px'}}>
            <div style={{fontFamily:F.mono,fontSize:'48px',color:C.lime,marginBottom:'8px',lineHeight:1}}>174</div>
            <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:C.paper,marginBottom:'4px'}}>Pages in the full Annual Review</div>
            <div style={{fontFamily:F.body,fontSize:'12px',color:'rgba(250,248,243,0.5)',fontStyle:'italic'}}>Available exclusively to Members</div>
          </div>
        </div>
        <div>
          <div style={{borderTop:`2px solid ${C.ink}`}}>
            {[{ch:'I',title:'The Year in Context',pp:'12pp',pub:true},{ch:'II',title:'12-Sector Full Analysis',pp:'48pp',pub:false},{ch:'III',title:'Venture Pipeline Database',pp:'36pp',pub:false},{ch:'IV',title:'Capital & Partnership Results',pp:'22pp',pub:false},{ch:'V',title:'Voices from the Field',pp:'18pp',pub:false},{ch:'VI',title:'2026 Deployment Strategy',pp:'20pp',pub:false},{ch:'VII',title:'Methodology & Disclosures',pp:'18pp',pub:false}].map((c,i)=>(
              <div key={i} style={{display:'grid',gridTemplateColumns:'20px 1fr auto',gap:'12px',padding:'12px 0',borderBottom:`1px solid ${C.border}`,alignItems:'center'}}>
                <span style={{fontFamily:F.mono,fontSize:'10px',color:C.faint}}>{c.ch}</span>
                <div><div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:c.pub?C.forest:C.ink}}>{c.title}</div><div style={{fontFamily:F.body,fontSize:'10px',color:C.faint,fontStyle:'italic'}}>{c.pp}</div></div>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:c.pub?C.positive:C.faint,textAlign:'right',whiteSpace:'nowrap'}}>{c.pub?'Public preview':'Members only'}</div>
              </div>
            ))}
          </div>
          <div className="cta-row" style={{marginTop:'20px',display:'flex',gap:'10px'}}>
            <a href="#" style={{flex:1,background:C.forest,color:C.lime,padding:'13px',fontFamily:F.sans,fontSize:'12px',fontWeight:800,textAlign:'center',textDecoration:'none',borderRadius:'2px',letterSpacing:'0.5px',display:'block'}}>Apply for Members Access</a>
            <a href="#" style={{padding:'13px 16px',border:`1px solid ${C.border}`,color:C.forest,fontFamily:F.sans,fontSize:'12px',fontWeight:700,textDecoration:'none',borderRadius:'2px',display:'flex',alignItems:'center',justifyContent:'center',whiteSpace:'nowrap'}}>View Tiers →</a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Footer=()=>{
  const bt='3px solid '+C.lime;
  return(
  <div className="pad-footer" style={{background:C.forest,padding:'20px 80px',borderTop:bt}}>
    <div style={{maxWidth:'900px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'12px'}}>
      <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
        <Logo height={18} variant="white"/>
        <div style={{width:'1px',height:'16px',background:'rgba(255,255,255,0.15)'}}/>
        <div style={{fontFamily:F.sans,fontSize:'9px',color:'rgba(250,248,243,0.4)'}}>Annual Review 2025 &middot; Public Teaser &middot; bridgepbc.com/annual-review</div>
      </div>
      <div className="mob-hide" style={{display:'flex',gap:'16px'}}>
        {['About','Members','Contact','bridgepbc.com'].map((l,i)=>(<a key={i} href="#" style={{fontFamily:F.sans,fontSize:'10px',fontWeight:600,color:'rgba(250,248,243,0.4)',textDecoration:'none'}}>{l}</a>))}
      </div>
    </div>
  </div>
  );
};

export default function AnnualReview2025(){
  const r=useRef(null);
  return(<div style={{fontFamily:F.body,background:C.paper}}><Gf/><TopBar coverLogoRef={r}/><Cover logoRef={r}/><YearNumbers/><Kejetia/><WhatsInside/><Footer/></div>);
}
