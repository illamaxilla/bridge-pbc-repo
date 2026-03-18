import { useState, useEffect, useRef } from "react";

const C={ink:'#0D1A10',paper:'#FAF8F3',paperDark:'#F0EDE4',forest:'#1B4D3E',lime:'#B8D935',limeDark:'#8FA825',muted:'#5C6B5E',faint:'#9AAA9C',border:'#D8D4C8',red:'#A8200D',amber:'#B8730A',positive:'#1A6B2F',white:'#FFFFFF'};
const F={display:'"Playfair Display","Georgia",serif',body:'"Source Serif 4","Georgia",serif',sans:'"DM Sans","Helvetica Neue",sans-serif',mono:'"DM Mono","Courier New",monospace'};

const Logo=({height=28,variant='white'})=>{const tf=variant==='white'?'#ffffff':'#1B4D3E';return(<svg height={height} viewBox="0 0 4113.8 932.3" xmlns="http://www.w3.org/2000/svg" style={{display:'block',flexShrink:0}}><polygon fill="#1B4D3E" stroke="#1B4D3E" strokeMiterlimit="10" points="722.6 322.1 462.3 452.8 202 322.8 461.3 192.5 722.6 322.1"/><path fill="#74914a" d="M197.9,426.8c3.9-.5,7,.8,10.7,1.4l252.5,125.7c84.5-40,167.7-83.8,251.9-124.8,33.1-11.5,50.1,34.2,18.5,49.1l-259.2,129.1c-10.2,3.7-14.1,2.6-23.9-1.3l-264.2-133c-17-14.4-8-43.2,13.6-46.1Z"/><path fill="#b8d935" d="M195.3,558c3.7-.6,7.4-.4,11.1-.2,86.1,40.5,170.4,85.1,255.9,126.8l252.9-126c29.5-7.2,45.4,28.7,22.3,46.5l-270.4,134.4-8.6.3c-91.6-42.2-181.1-89.9-271.7-134.4-18.7-12.1-13.3-43.6,8.5-47.4Z"/><path fill={tf} d="M1853.1,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.6,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1Z"/><path fill={tf} d="M1431.7,224.5h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5Z"/><path fill={tf} d="M1488.1,578.7v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6Z"/><rect fill="#b8d935" x="1427.4" y="17.4" width="205.2" height="145"/><rect fill={tf} x="1427.5" y="221.8" width="205.2" height="693.2" rx="9.6" ry="9.6"/><path fill={tf} d="M2757.3,19.1h491.3c5.4,0,9.8,4.4,9.8,9.8v218.7c0,5.4-4.4,9.8-9.8,9.8h-507.4c-57,0-108.5,23-145.9,60.4-37.3,37.2-60.5,88.8-60.5,145.7,0,113.7,92.4,206,206.3,206h12.9c2.9,0,5.1,2.3,5.1,5.1v236.7c0,1.1-.9,1.9-1.9,1.9h0c-242.2,0-438.5-196-438.5-437.8v-18.5c0-241.8,196.3-437.8,438.5-437.8Z"/><rect fill={tf} x="2812.8" y="339.5" width="216.8" height="572.6" rx="9.6" ry="9.6"/><rect fill="#b8d935" x="3083.4" y="339.5" width="175.1" height="257.7"/><rect fill="#b8d935" x="3083.4" y="654.4" width="175.1" height="257.7"/><path fill={tf} d="M3355.1,655.5h31.2v5.7h-31.2v-5.7ZM3355.1,666.9h31.2v11.1h-31.2v-11.1ZM3355.1,683.8h31.2v11.1h-31.2v-11.1ZM3355.1,700.8h31.2v11.1h-31.2v-11.1ZM3355.1,717.7h31.2v11.1h-31.2v-11.1ZM3355.1,734.5h31.2v11.1h-31.2v-11.1ZM3355.1,751.4h31.2v10.8h-31.2v-10.8ZM3355.1,767.9h31.2v11.1h-31.2v-11.1ZM3355.1,784.8h31.2v11.1h-31.2v-11.1ZM3355.1,801.7h31.2v11.1h-31.2v-11.1ZM3355.1,818.5h31.2v11.1h-31.2v-11.1ZM3355.1,835.4h31.2v11.1h-31.2v-11.1ZM3355.1,852.4h31.2v11.1h-31.2v-11.1ZM3355.1,869.2h31.2v11.1h-31.2v-11.1ZM3355.1,886.1h31.2v11.1h-31.2v-11.1ZM3355.1,903h31.2v5.7h-31.2v-5.7ZM3397.5,655.5h61.7c12.5,0,24.3,1.7,35.1,5.7h-96.8v-5.7ZM3397.5,666.9h109.7c5.9,3,11.4,6.7,16.7,11.1h-126.3v-11.1ZM3397.5,801.7h126.3c-5.2,4.4-10.8,8.1-16.7,11.1h-109.7v-11.1ZM3397.5,818.5h96.8c-10.8,4-22.5,6.1-35.1,6.1h-30.5v84h-31.2v-90.2ZM3479.6,739.9c0-17.2-13.5-24.7-28.1-24.7h-23.6v49.3h23.6c14.5,0,28.1-7.5,28.1-24.7ZM3485.5,683.8h44.4c3.4,3,6.6,6.7,9.3,11.1h-37.1c-4.9-4.4-10.8-8.4-16.7-11.1ZM3502.2,784.8h37.1c-2.8,4-5.9,7.8-9.3,11.1h-44.4c5.9-2.7,11.8-6.7,16.7-11.1ZM3507.4,700.8h35.7c2.4,3.4,4.2,7.1,5.6,11.1h-33.6c-2.1-4-4.5-7.8-7.7-11.1ZM3515,767.9h33.6l-5.6,11.1h-35.7c3.1-3.4,5.6-7.1,7.7-11.1ZM3517.8,717.7h32.6c1.3,3.7,2.4,7.5,2.8,11.1h-32.3c-.7-3.7-1.8-7.5-3.1-11.1ZM3520.9,751.4h32.3c-.3,3.7-1.3,7.5-2.8,10.8h-32.6c1.3-3.4,2.4-7.1,3.1-10.8ZM3521.7,734.5h32.3c.3,3.7.3,7.5-.3,11.1h-32c.7-3.7.7-7.5,0-11.1ZM3397.5,689.1h61.7c28.4,0,51.7,23.3,51.7,50.9s-23.2,50.9-51.7,50.9h-61.7v-102Z"/><path fill={tf} d="M3572.3,655.5h31.2v5.7h-31.2v-5.7ZM3572.3,666.9h31.2v11.1h-31.2v-11.1ZM3572.3,683.8h31.2v11.1h-31.2v-11.1ZM3572.3,700.8h31.2v11.1h-31.2v-11.1ZM3572.3,717.7h31.2v11.1h-31.2v-11.1ZM3572.3,734.5h31.2v11.1h-31.2v-11.1ZM3572.3,751.4h31.2v10.8h-31.2v-10.8ZM3572.3,767.9h31.2v11.1h-31.2v-11.1ZM3572.3,784.8h31.2v11.1h-31.2v-11.1ZM3572.3,801.7h31.2v11.1h-31.2v-11.1ZM3572.3,818.5h31.2v11.1h-31.2v-11.1ZM3572.3,835.4h31.2v11.1h-31.2v-11.1ZM3572.3,852.4h31.2v11.1h-31.2v-11.1ZM3572.3,869.2h31.2v11.1h-31.2v-11.1ZM3572.3,886.1h31.2v11.1h-31.2v-11.1ZM3572.3,903h31.2v5.7h-31.2v-5.7ZM3614.6,655.5h45.4c12.5,0,24.6,2.1,35.7,5.7h-81.2v-5.7ZM3614.6,666.9h94.4c5.9,3,11.4,6.7,16,11.1h-110.3v-11.1ZM3614.6,688.9h45.4c23.6,0,42,12.5,42,34.1,0,36.4-42.3,62.5-87.5,72.2v-106.4ZM3685.4,775.1c17.3,9.8,36.4,32.4,36.4,57.1s-16,43.2-46.2,43.2h-61.1v-69.5c24.6-4.8,52.4-15.6,70.8-30.7ZM3614.6,886.1h125.2c-4.5,4.4-10.1,8.1-16,11.1h-109.3v-11.1ZM3614.6,903h96.1c-10.8,3.7-22.5,5.7-35.1,5.7h-61.1v-5.7ZM3674.3,725.4c0-7.5-6.6-12.9-15.6-12.9h-16.3v49c19.8-9.1,32-21.9,32-36.1ZM3686.1,805.8c-13.2,7.5-28.4,13.5-43.7,18.3v27.7h32c19.1,0,27.1-17.5,11.8-45.9ZM3687.5,683.8h43.1c3.1,3.4,5.6,7.1,7.7,11.1h-35.4c-4.2-4.8-9.3-8.4-15.3-11.1ZM3694.7,767.9h38.9c3.8,3.7,7.3,7.5,10.4,11.1h-35.7c-4.2-4.4-9-8.1-13.5-11.1ZM3705.8,751.4h30.5c-2.1,4-4.5,7.8-7.3,10.8h-30.9c2.8-3.4,5.6-7.1,7.7-10.8ZM3718.4,869.2h35.7c-2.4,4-5.2,7.8-8.7,11.1h-42.3c5.9-3,11.1-6.7,15.3-11.1ZM3706.9,700.8h33.6c1.3,2.7,2.8,7.1,3.1,11.1h-32c-1-4-2.8-7.8-4.9-11.1ZM3711.8,734.5h30.9c-.7,4-1.8,7.8-3.4,11.1h-30.5c1.3-3.7,2.4-7.5,3.1-11.1ZM3712.8,717.7h31.2c.3,3.7.3,7.5-.3,11.1h-30.9c.7-3,.7-8.1,0-11.1ZM3713.8,784.8h34.3c2.4,3.4,4.9,7.5,6.6,11.1h-33c-2.4-4-5.2-7.8-8-11.1ZM3729.1,852.4h32.3c-.7,3.7-2.1,7.5-4.2,11.1h-34c2.4-3.4,4.5-7.1,5.9-11.1ZM3724.9,801.7h32.6c1.8,3.7,3.1,7.5,3.8,11.1h-31.5c-1.3-3.7-2.8-7.5-4.9-11.1ZM3732.6,835.4h31.5c0,3.7-.3,7.5-1.3,11.1h-32c1-3.7,1.8-7.5,1.8-11.1ZM3731.3,818.5h31.5c1,3.7,1.3,7.5,1.3,11.1h-31.2c-.3-3.7-.7-7.5-1.8-11.1Z"/><path fill={tf} d="M3774.6,767.9h32l-.7,11.1h-32c0-3.4.3-7.8.7-11.1ZM3773.9,784.8h32c0,3.4.3,7.5.7,11.1h-32c-.3-3.4-.7-7.8-.7-11.1ZM3777.7,751.4h32.3c-1,3.7-1.8,6.7-2.4,10.8h-32.3c.7-3.7,1.3-7.1,2.4-10.8ZM3775.3,801.7h32.3c.7,4,1.3,7.5,2.4,11.1h-32.3c-1-3.7-1.8-7.5-2.4-11.1ZM3783.2,734.5h33c-1.8,3.7-3.1,7.5-4.5,11.1h-32.6c1-3.7,2.4-7.5,4.2-11.1ZM3779.1,818.5h32.6c1.3,3.7,2.8,7.5,4.5,11.1h-33c-1.8-3.7-3.1-7.5-4.2-11.1ZM3791.5,717.7h34.3l-7,11.1h-33.3c1.8-3.7,3.4-7.1,5.9-11.1ZM3785.7,835.4h33.3l7,11.1h-34.3c-2.4-4-4.2-7.5-5.9-11.1ZM3803.4,700.8h37.5c-3.8,3.4-7.7,7.5-10.4,11.1h-35.4c2.1-3.4,5.2-7.5,8.3-11.1ZM3795.1,852.4h35.4c2.8,3.7,6.6,7.8,10.4,11.1h-37.5c-3.1-3.7-6.2-7.8-8.3-11.1ZM3819.7,683.8h45.1c-5.9,3-11.8,6.7-17.3,11.1h-39.2c3.8-4,7.7-7.8,11.4-11.1ZM3808.2,869.2h39.2c5.6,4.4,11.4,8.1,17.3,11.1h-45.1c-3.8-3.4-7.7-7.1-11.4-11.1ZM3817,782.1c0-55.4,43.1-99.3,96.8-99.3s57.9,14.2,75.6,36.8l-18.1,21.9c-12.9-18.9-33.6-31-57.6-31-36.1,0-64.9,31-64.9,71.6s28.8,71.6,64.9,71.6,44.7-12.1,57.6-31l18.1,21.9c-17.7,22.6-44.7,36.8-75.6,36.8-53.7,0-96.8-43.9-96.8-99.3ZM3844.7,666.9h138.1c6.2,3.4,12.1,7.1,17.7,11.1h-51.1c-11.4-4-23.2-6.1-35.7-6.1s-24.3,2.1-35.7,6.1h-51.1c5.6-4,11.4-7.8,17.7-11.1ZM3826.9,886.1h51.1c11.4,4,23.2,6.1,35.7,6.1s24.3-2.1,35.7-6.1h51.1c-5.6,4-11.4,7.8-17.7,11.1h-138.1c-6.2-3.4-12.1-7.1-17.7-11.1ZM3913.8,650.1c20.4,0,39.5,4,56.9,11.1h-113.8c17.3-7.1,36.4-11.1,56.9-11.1ZM3856.8,903h113.8c-17.3,7.1-36.4,11.1-56.9,11.1s-39.5-4-56.9-11.1ZM3962.6,683.8h45.1l5.9,5.4-4.5,5.7h-29.2c-5.6-4.4-11.4-8.1-17.3-11.1ZM3980,869.2h29.2l4.5,5.4c-1.8,2.1-3.8,4-5.9,5.7h-45.1c5.9-3,11.8-6.7,17.3-11.1ZM3986.6,700.8h18.1l-8.3,10.2c-2.8-3.4-6.2-7.1-9.8-10.2ZM3996.3,853.3l8.3,10.2h-18.1c3.4-3,7-6.7,9.8-10.2Z"/></svg>);};

const useIsMobile=()=>{const[m,setM]=useState(()=>typeof window!=='undefined'?window.innerWidth<=600:false);useEffect(()=>{const fn=()=>setM(window.innerWidth<=600);window.addEventListener('resize',fn,{passive:true});return()=>window.removeEventListener('resize',fn);},[]);return m;};

const Gf=()=>(<style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Source+Serif+4:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}html{scroll-behavior:smooth;}body{background:${C.paper};-webkit-font-smoothing:antialiased;overflow-x:hidden;}@keyframes fu{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}.fu{animation:fu 0.7s ease both;}.fu2{animation:fu 0.7s 0.2s ease both;}.fu3{animation:fu 0.7s 0.4s ease both;}@media print{.np{display:none!important;}}@media(max-width:768px){.tc{grid-template-columns:1fr!important;}.ch-grid>div{border-right:none!important;padding-left:0!important;}}@media(max-width:600px){.mob-hide-pub{display:none!important;}.pub-section{padding:32px 18px!important;}.pub-section-dark{padding:32px 18px!important;}}`}</style>);

const TopBar=({coverLogoRef,isMob})=>{
  const[past,setPast]=useState(false);
  useEffect(()=>{const fn=()=>{if(!coverLogoRef?.current)return;setPast(coverLogoRef.current.getBoundingClientRect().bottom<0);};window.addEventListener('scroll',fn,{passive:true});return()=>window.removeEventListener('scroll',fn);},[coverLogoRef]);
  return(<div className="np" style={{position:'sticky',top:0,zIndex:100,background:C.paper,borderBottom:`1px solid ${C.border}`,padding:isMob?'9px 16px':'10px 56px',display:'flex',justifyContent:'space-between',alignItems:'center',boxShadow:'0 1px 8px rgba(0,0,0,0.06)'}}><div style={{display:'flex',alignItems:'center',gap:'10px'}}><div style={{overflow:'hidden',maxWidth:past?'200px':'0px',opacity:past?1:0,transition:'max-width 0.35s ease,opacity 0.3s ease',display:'flex',alignItems:'center'}}><Logo height={18} variant="dark"/><div style={{width:'1px',height:'14px',background:C.border,margin:'0 8px',flexShrink:0}}/></div><span style={{fontFamily:F.sans,fontSize:isMob?'10px':'11px',color:C.muted}}>{isMob?'Annual Review 2025':'Annual Review 2025 · Public Edition'}</span></div><div style={{display:'flex',gap:'10px',alignItems:'center'}}>{!isMob&&<a href="#" style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest,textDecoration:'none'}}>Members Access →</a>}<a href="#mob-cta" style={{background:C.forest,color:C.lime,border:'none',padding:isMob?'7px 12px':'7px 16px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,cursor:'pointer',letterSpacing:'0.3px',textDecoration:'none',display:'block'}}>{isMob?'Join →':'Members Access'}</a></div></div>);
};

const SH=({eyebrow,title,page,light=false})=>(<div style={{marginBottom:'40px'}}><div style={{borderTop:`6px solid ${light?C.paper:C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'16px'}}/><div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline'}}><span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:light?C.lime:C.muted}}>{eyebrow}</span>{page&&<span style={{fontFamily:F.mono,fontSize:'10px',color:light?'rgba(250,248,243,0.35)':C.faint}}>{page}</span>}</div>{title&&<h2 style={{fontFamily:F.display,fontSize:'clamp(24px,3vw,38px)',fontWeight:700,color:light?C.paper:C.ink,lineHeight:1.2,marginTop:'12px',letterSpacing:'-0.5px'}}>{title}</h2>}</div>);

const Bp=({children,light=false})=>(<p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:light?'rgba(250,248,243,0.75)':C.ink,marginBottom:'18px',fontWeight:300}}>{children}</p>);

const Cover=({logoRef})=>(
  <div style={{background:C.ink,display:'flex',flexDirection:'column',position:'relative',overflow:'hidden'}}>
    <div style={{position:'absolute',left:0,right:0,top:'20%',textAlign:'center',fontFamily:F.display,fontSize:'clamp(140px,26vw,300px)',fontWeight:900,color:'rgba(255,255,255,0.025)',lineHeight:1,userSelect:'none',letterSpacing:'-12px',pointerEvents:'none'}}>2025</div>
    <div style={{position:'absolute',left:'56px',top:0,bottom:0,width:'3px',background:C.lime}}/>
    <div ref={logoRef} style={{padding:'24px 56px 24px 80px',borderBottom:`1px solid rgba(255,255,255,0.08)`,display:'flex',justifyContent:'space-between',alignItems:'center',position:'relative'}}>
      <Logo height={30} variant="white"/>
      <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
        <span style={{fontFamily:F.mono,fontSize:'10px',color:'rgba(255,255,255,0.3)',letterSpacing:'1.5px'}}>ANNUAL REVIEW</span>
        <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'2px',textTransform:'uppercase',border:`1px solid rgba(184,217,53,0.4)`,padding:'3px 10px'}}>Public Teaser</span>
      </div>
    </div>
    <div style={{flex:1,display:'flex',flexDirection:'column',padding:'52px 80px 40px 80px',position:'relative'}}>
      <div className="fu" style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',color:C.lime,marginBottom:'24px'}}>The Architecture of Progress — A Year in Review</div>
      <div className="fu2" style={{marginBottom:'32px'}}>
        <h1 style={{fontFamily:F.display,fontSize:'clamp(56px,10vw,120px)',fontWeight:900,color:C.paper,lineHeight:0.92,letterSpacing:'-4px'}}>Year<br/><em style={{color:C.lime,fontStyle:'italic',fontWeight:700}}>One.</em></h1>
      </div>
      <div className="fu3" style={{maxWidth:'520px',fontFamily:F.body,fontSize:'16px',fontStyle:'italic',lineHeight:1.7,color:'rgba(250,248,243,0.5)',marginBottom:'48px'}}>BRIDGE PBC's inaugural Annual Review. 174+ ventures assessed. 12 sectors mapped. One integrated framework for Ghana's development — deployed.</div>
      <div style={{borderTop:`1px solid rgba(255,255,255,0.1)`,paddingTop:'28px',display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'0',marginBottom:'40px'}} className="tc ch-grid">
        {[{pg:'04',ch:'I',title:'The Year in Context',sub:'What 2025 revealed about Ghana\'s opportunity architecture'},{pg:'10',ch:'II',title:'12 Sectors, One Framework',sub:'BRIDGE Impact Score™ — full landscape assessment'},{pg:'18',ch:'III',title:'Capital & Results',sub:'Portfolio performance, partnerships, pipeline'},{pg:'26',ch:'IV',title:'Voices from the Field',sub:'Partners, communities, founders — in their words'},{pg:'34',ch:'V',title:'The Road Ahead',sub:'2026 priorities and the scaling mandate'},{pg:'—',ch:'VI',title:'Full Access',sub:'Members: complete data, venture database, analysis'}].map((c,i)=>(
          <div key={i} style={{paddingRight:'20px',borderRight:i%3<2?`1px solid rgba(255,255,255,0.07)`:'none',paddingLeft:i%3>0?'20px':'0',marginBottom:'20px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'6px'}}><span style={{fontFamily:F.mono,fontSize:'9px',color:C.lime}}>p.{c.pg}</span><span style={{width:'16px',height:'1px',background:'rgba(255,255,255,0.12)',display:'inline-block'}}/><span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:'rgba(255,255,255,0.2)'}}>Ch.{c.ch}</span></div>
            <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.paper,marginBottom:'3px',lineHeight:1.3}}>{c.title}</div>
            <div style={{fontFamily:F.body,fontSize:'10px',color:'rgba(250,248,243,0.32)',fontStyle:'italic',lineHeight:1.4}}>{c.sub}</div>
          </div>
        ))}
      </div>
    </div>
    <div style={{height:'3px',background:C.lime}}/>
  </div>
);

const YearNumbers=()=>(
  <div style={{background:C.paper,padding:'64px 80px',borderBottom:`1px solid ${C.border}`}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <SH eyebrow="The Year in Numbers" title="2025: the founding year, quantified" page="p.04"/>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1px',background:C.border,marginBottom:'48px'}} className="tc">
        {[{v:'174+',l:'Ventures assessed',s:'across 12 integrated sectors'},{v:'12',l:'Sectors mapped',s:'infrastructure to creative industries'},{v:'$15B+',l:'Unrealised potential',s:'identified in BRIDGE pipeline'},{v:'4',l:'Engagement models',s:'direct, portfolio, partnership, incubation'}].map((d,i)=>(
          <div key={i} style={{padding:'32px 24px 24px',background:C.paper,borderBottom:`2px solid ${C.ink}`}}>
            <div style={{fontFamily:F.mono,fontSize:'clamp(28px,4vw,48px)',fontWeight:500,color:C.forest,lineHeight:1,letterSpacing:'-2px',marginBottom:'8px'}}>{d.v}</div>
            <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink,marginBottom:'3px'}}>{d.l}</div>
            <div style={{fontFamily:F.body,fontSize:'11px',color:C.muted,fontStyle:'italic'}}>{d.s}</div>
          </div>
        ))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'56px'}} className="tc">
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
  <div style={{background:C.forest,padding:'64px 80px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <SH eyebrow="Flagship Initiative" title="Kejetia Market: West Africa's largest market meets its digital moment" page="p.14" light/>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'56px'}} className="tc">
        <div>
          <Bp light>West Africa's largest market. 10,000+ vendors. Entirely paper-based — opaque, fragmented, and operating far below its economic potential.</Bp>
          <Bp light>BRIDGE's flagship infrastructure investment targets Kejetia Market in Kumasi: payment processing, inventory management, vendor analytics, and marketplace connectivity. Traditional commerce made intelligent, without displacing its cultural character.</Bp>
          <Bp light>This is an amplification story. The market's vitality exists. The infrastructure to scale it does not. BRIDGE builds the latter.</Bp>
          <div style={{borderLeft:`4px solid ${C.lime}`,paddingLeft:'24px',marginTop:'28px'}}><p style={{fontFamily:F.display,fontSize:'18px',fontStyle:'italic',color:C.paper,lineHeight:1.5}}>"The goal is not to modernise the market. The goal is to make every vendor in it more powerful."</p></div>
        </div>
        <div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'2px',marginBottom:'24px'}}>
            {[{v:'10,000+',l:'Vendors in scope',c:C.lime},{v:'GHS 3T',l:'Ecosystem transaction volume',c:'rgba(250,248,243,0.85)'},{v:'0%',l:'Currently digitised',c:'rgba(220,80,60,0.9)'},{v:'15–25%',l:'Transaction cost reduction target',c:C.lime}].map((d,i)=>(
              <div key={i} style={{background:'rgba(0,0,0,0.22)',padding:'20px 18px'}}>
                <div style={{fontFamily:F.mono,fontSize:'24px',color:d.c,lineHeight:1,marginBottom:'6px'}}>{d.v}</div>
                <div style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(250,248,243,0.45)',lineHeight:1.4}}>{d.l}</div>
              </div>
            ))}
          </div>
          <div style={{border:`1px solid rgba(184,217,53,0.3)`,padding:'20px'}}>
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

const WhatsInside=()=>{
  const[openObj,setOpenObj]=useState(null);
  const WHAT_LOCKED=[
    {ch:'II', title:'12-Sector Full Analysis',       pp:'48pp', note:'Complete BRIDGE Impact Score™ data — all 12 sectors with sub-sector breakdowns, risk matrices, and deployment parameters.'},
    {ch:'III',title:'Venture Pipeline Database',     pp:'36pp', note:'All 174+ ventures scored, ranked, and sequenced. Capital ranges, IRR targets, payback periods, and implementation timelines.'},
    {ch:'IV', title:'Capital & Partnership Results', pp:'22pp', note:'Full portfolio performance data, co-investor landscape, blended finance structures, and DFI alignment maps.'},
    {ch:'V',  title:'Voices from the Field',         pp:'18pp', note:'Primary research from Ghanaian communities, entrepreneurs, and policymakers — the qualitative layer beneath the scores.'},
    {ch:'VI', title:'2026 Deployment Strategy',      pp:'20pp', note:'Priority investment roadmap ranked by urgency, feasibility, and integration value. The actionable mandate for the year ahead.'},
    {ch:'VII',title:'Methodology & Disclosures',     pp:'18pp', note:'Full BRIDGE Impact Score™ methodology, data sources, scoring weights, and analytical frameworks.'},
  ];
  const OBJECTIONS=[
    {q:'What does "Members" actually mean?',a:'BRIDGE Network Membership gives you year-round access — not just this Annual Review, but all 12 sector briefs, quarterly updates as the data changes, and the full venture pipeline database. It is an ongoing intelligence subscription, not a one-time purchase.'},
    {q:'Is this relevant if I\'m not based in Ghana?',a:'Members include diaspora professionals in North America and Europe, institutional investors, DFI representatives, and development practitioners globally. Ghana is the lens. The intelligence is built for anyone whose work intersects with Ghanaian development — wherever they are.'},
    {q:'How is BRIDGE different from a standard research report?',a:'Standard reports describe. BRIDGE prescribes. Every brief includes venture-level investment theses, deployment parameters, risk matrices with mitigations, and cross-sector integration maps. It is actionable intelligence, not background reading.'},
  ];
  return(
    <div style={{background:C.ink,position:'relative',overflow:'hidden'}}>

      {/* ── Gate strip — what you're missing ── */}
      <div style={{background:`${C.forest}`,padding:'56px 80px 0',position:'relative'}}>
        <div style={{position:'absolute',top:'3px',left:0,right:0,height:'3px',background:C.lime}}/>
        <div style={{maxWidth:'900px',margin:'0 auto'}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'56px',alignItems:'start'}} className="tc">
            {/* Left — what's in the full review */}
            <div>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.lime,marginBottom:'14px'}}>FULL ANNUAL REVIEW · MEMBERS ONLY</div>
              <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,36px)',fontWeight:700,fontStyle:'italic',color:C.paper,lineHeight:1.2,marginBottom:'20px'}}>You've seen the framework.<br/>Members see the whole picture.</h2>
              <p style={{fontFamily:F.body,fontSize:'14px',lineHeight:1.8,color:'rgba(250,248,243,0.55)',marginBottom:'28px',fontStyle:'italic'}}>This public edition covers Year One context and the Kejetia flagship. The complete Annual Review — 174 pages, 12 sector deep-dives, and the full venture pipeline — is available exclusively to Intelligence Members.</p>
              {/* Page count callout */}
              <div style={{display:'flex',gap:'2px',marginBottom:'28px'}}>
                {[{v:'174',l:'Total pages'},  {v:'12',l:'Sector deep-dives'},{v:'174+',l:'Ventures scored'}].map((s,i)=>(
                  <div key={i} style={{flex:1,background:'rgba(255,255,255,0.06)',padding:'16px 14px'}}>
                    <div style={{fontFamily:F.mono,fontSize:'22px',fontWeight:500,color:C.lime,lineHeight:1,marginBottom:'4px'}}>{s.v}</div>
                    <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:600,color:'rgba(250,248,243,0.35)',letterSpacing:'0.5px'}}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Right — locked chapter list */}
            <div>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(250,248,243,0.3)',marginBottom:'10px',paddingBottom:'8px',borderBottom:'1px solid rgba(255,255,255,0.08)'}}>Full Review Contents</div>
              {/* Public chapter */}
              <div style={{display:'grid',gridTemplateColumns:'20px 1fr auto',gap:'10px',padding:'10px 0',borderBottom:'1px solid rgba(255,255,255,0.06)',alignItems:'center',opacity:0.9}}>
                <span style={{fontFamily:F.mono,fontSize:'9px',color:C.lime}}>I</span>
                <div><div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.paper}}>The Year in Context</div><div style={{fontFamily:F.body,fontSize:'10px',color:'rgba(250,248,243,0.35)',fontStyle:'italic'}}>12pp · This document</div></div>
                <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.positive,whiteSpace:'nowrap'}}>✓ Public</span>
              </div>
              {WHAT_LOCKED.map((c,i)=>(
                <div key={i} style={{display:'grid',gridTemplateColumns:'20px 1fr auto',gap:'10px',padding:'10px 0',borderBottom:i<WHAT_LOCKED.length-1?'1px solid rgba(255,255,255,0.06)':'none',alignItems:'center'}}>
                  <span style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(255,255,255,0.2)'}}>{c.ch}</span>
                  <div>
                    <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:'rgba(250,248,243,0.5)'}}>{c.title}</div>
                    <div style={{fontFamily:F.body,fontSize:'10px',color:'rgba(250,248,243,0.28)',fontStyle:'italic'}}>{c.pp}</div>
                  </div>
                  <div style={{display:'flex',alignItems:'center',gap:'5px',whiteSpace:'nowrap'}}>
                    <div style={{width:'10px',height:'10px',background:'rgba(255,255,255,0.1)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                      <div style={{width:'6px',height:'1px',background:'rgba(255,255,255,0.3)'}}/>
                    </div>
                    <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:'rgba(255,255,255,0.2)'}}>Members</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Tier comparison ── */}
      <div style={{padding:'0 80px 0',background:C.forest}}>
        <div style={{maxWidth:'900px',margin:'0 auto',paddingTop:'48px',paddingBottom:'56px',borderTop:'1px solid rgba(255,255,255,0.08)'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:'rgba(255,255,255,0.3)',marginBottom:'24px'}}>Membership Tiers</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'2px'}} className="tc">
            {[
              {label:'General Community',price:'Free',note:'Always free',desc:'Public briefings, macro updates, and community access.',items:['Annual Opportunity Report (public edition)','Quarterly macro indicator updates','BRIDGE newsletter — monthly','Big Ideas Challenge eligibility'],cta:'Download Free Report',primary:false,outline:false},
              {label:'Network Member',price:'$100–$500',note:'per year',desc:'Full platform and complete intelligence suite — everything serious analysts need.',items:['Complete Annual Review (all 174 pages)','All 12 full sector briefs','174+ venture scoring matrices','Quarterly intelligence updates (4×/yr)','2026 Priority Investment Roadmap','Member directory + opportunity access'],cta:'Apply for Network Membership →',primary:true,tag:'Most Popular'},
              {label:'Professional Contributor',price:'$500–$2,000',note:'per year or time commit',desc:'Full intelligence plus advisory matching, deal flow access, and BRIDGE leadership engagement.',items:['Everything in Network Member tier','Advisory & mentorship matching','Deal flow access (observer basis)','Contributor retreats & convenings','OR: 10+ hrs/quarter contribution'],cta:'Discuss Contribution',primary:false,outline:true},
            ].map((tier,i)=>(
              <div key={i} style={{background:tier.primary?'rgba(255,255,255,0.08)':'rgba(255,255,255,0.03)',border:`1px solid ${tier.primary?C.lime:'rgba(255,255,255,0.08)'}`,padding:'22px',position:'relative'}}>
                {tier.tag&&<div style={{position:'absolute',top:'-1px',left:'50%',transform:'translateX(-50%)',background:C.lime,color:C.ink,fontFamily:F.sans,fontSize:'8px',fontWeight:800,letterSpacing:'1.5px',textTransform:'uppercase',padding:'3px 10px',whiteSpace:'nowrap'}}>{tier.tag}</div>}
                <div style={{marginTop:tier.tag?'12px':0}}>
                  <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'8px'}}>{tier.label}</div>
                  <div style={{display:'flex',alignItems:'baseline',gap:'5px',marginBottom:'6px'}}>
                    <span style={{fontFamily:F.mono,fontSize:'26px',fontWeight:500,color:C.paper,lineHeight:1}}>{tier.price}</span>
                    <span style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(250,248,243,0.3)'}}>{tier.note}</span>
                  </div>
                  <p style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:'rgba(250,248,243,0.4)',lineHeight:1.5,marginBottom:'14px'}}>{tier.desc}</p>
                  <div style={{marginBottom:'18px'}}>
                    {tier.items.map((item,ii)=>(
                      <div key={ii} style={{display:'flex',gap:'7px',alignItems:'flex-start',padding:'4px 0',borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
                        <span style={{color:C.lime,fontSize:'9px',flexShrink:0,marginTop:'3px',fontWeight:700}}>✓</span>
                        <span style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(250,248,243,0.55)',lineHeight:1.4}}>{item}</span>
                      </div>
                    ))}
                  </div>
                  <a href="#" style={{display:'flex',alignItems:'center',justifyContent:'center',padding:tier.primary?'12px 16px':'10px 16px',background:tier.primary?C.lime:'transparent',border:`1px solid ${tier.primary?C.lime:'rgba(255,255,255,0.2)'}`,color:tier.primary?C.ink:'rgba(250,248,243,0.6)',fontFamily:F.sans,fontSize:'11px',fontWeight:800,textDecoration:'none',letterSpacing:'0.3px'}}>{tier.cta}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Objection accordion ── */}
      <div style={{background:'rgba(255,255,255,0.02)',padding:'40px 80px'}}>
        <div style={{maxWidth:'900px',margin:'0 auto'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',marginBottom:'16px'}}>Common Questions</div>
          {OBJECTIONS.map((obj,i)=>{
            const isOpen=openObj===i;
            return(
              <div key={i} style={{borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
                <button onClick={()=>setOpenObj(isOpen?null:i)} style={{display:'flex',width:'100%',justifyContent:'space-between',alignItems:'center',padding:'14px 0',background:'transparent',border:'none',cursor:'pointer',textAlign:'left',gap:'16px'}}>
                  <span style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:isOpen?C.lime:'rgba(250,248,243,0.7)',transition:'color 0.15s ease',lineHeight:1.4}}>{obj.q}</span>
                  <span style={{fontFamily:F.mono,fontSize:'14px',color:C.lime,flexShrink:0,transform:isOpen?'rotate(45deg)':'none',transition:'transform 0.2s ease'}}>+</span>
                </button>
                {isOpen&&<p style={{fontFamily:F.body,fontSize:'13px',lineHeight:1.8,color:'rgba(250,248,243,0.5)',paddingBottom:'16px',fontWeight:300}}>{obj.a}</p>}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Primary CTA ── */}
      <div style={{padding:'56px 80px 64px',background:C.forest,position:'relative',overflow:'hidden',borderTop:'1px solid rgba(255,255,255,0.08)'}}>
        <div style={{position:'absolute',top:0,left:0,right:0,height:'3px',background:C.lime}}/>
        <div style={{position:'absolute',right:'-20px',bottom:'-40px',fontFamily:F.display,fontSize:'clamp(80px,16vw,200px)',fontWeight:900,color:'rgba(255,255,255,0.03)',pointerEvents:'none',userSelect:'none',letterSpacing:'-6px',lineHeight:1}}>2026</div>
        <div style={{maxWidth:'900px',margin:'0 auto',position:'relative',textAlign:'center'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'rgba(184,217,53,0.1)',border:'1px solid rgba(184,217,53,0.25)',padding:'6px 16px',marginBottom:'24px'}}>
            <div style={{width:'6px',height:'6px',borderRadius:'50%',background:C.lime}}/>
            <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime}}>2026 Intelligence Cycle Now Open</span>
          </div>
          <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,4vw,48px)',fontWeight:900,color:C.paper,lineHeight:1.05,letterSpacing:'-1.5px',marginBottom:'16px'}}>
            Ghana's development decade<br/><em style={{color:C.lime,fontStyle:'italic'}}>is already underway.</em>
          </h2>
          <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.75,color:'rgba(250,248,243,0.5)',maxWidth:'480px',margin:'0 auto 32px',fontStyle:'italic'}}>The capital is being allocated. The ventures are being built. The question is whether you have the intelligence to act with precision.</p>
          <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap',marginBottom:'20px'}}>
            <a href="#" style={{display:'inline-flex',alignItems:'center',gap:'10px',background:C.lime,color:C.ink,padding:'15px 32px',fontFamily:F.sans,fontSize:'13px',fontWeight:800,textDecoration:'none',letterSpacing:'0.3px'}}>Apply for Network Membership <span style={{fontSize:'15px',fontWeight:900}}>→</span></a>
            <a href="#" style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'transparent',border:'1px solid rgba(255,255,255,0.2)',color:'rgba(250,248,243,0.7)',padding:'15px 24px',fontFamily:F.sans,fontSize:'13px',fontWeight:700,textDecoration:'none'}}>Discuss Contribution</a>
          </div>
          <div style={{display:'flex',justifyContent:'center',gap:'20px',flexWrap:'wrap'}}>
            {['No automatic renewal','Cancel any time','Reply within 48 hours'].map((s,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:'5px'}}>
                <span style={{color:C.lime,fontSize:'10px',fontWeight:700}}>✓</span>
                <span style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(250,248,243,0.3)'}}>{s}</span>
              </div>
            ))}
          </div>
          <p style={{marginTop:'20px',fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:'rgba(250,248,243,0.2)'}}>Not ready? <a href="#" style={{color:'rgba(184,217,53,0.45)',textDecoration:'underline'}}>Stay on the free tier</a> — quarterly macro updates and the public report, always free.</p>
        </div>
      </div>

    </div>
  );
};

const Footer=()=>(
  <div style={{background:C.forest,padding:'20px 80px',borderTop:`1px solid rgba(184,217,53,0.25)`}}>
    <div style={{maxWidth:'900px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'12px'}}>
      <div style={{display:'flex',alignItems:'center',gap:'16px'}}><Logo height={20} variant="white"/><div style={{width:'1px',height:'18px',background:'rgba(255,255,255,0.15)'}}/><div style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(250,248,243,0.4)'}}>Annual Review 2025 · Public Edition · bridgepbc.com/annual-review</div></div>
      <div style={{display:'flex',gap:'16px'}}>{['About','Members','Contact','bridgepbc.com'].map((l,i)=>(<a key={i} href="#" style={{fontFamily:F.sans,fontSize:'10px',fontWeight:600,color:'rgba(250,248,243,0.4)',textDecoration:'none'}}>{l}</a>))}</div>
    </div>
  </div>
);

const MobYearNumbers=()=>{
  const[o,setO]=useState(true);
  return(
    <div style={{background:C.paper,borderBottom:`1px solid ${C.border}`}}>
      <button onClick={()=>setO(x=>!x)} style={{width:'100%',background:'transparent',border:'none',padding:'16px 18px',display:'flex',alignItems:'center',gap:'12px',cursor:'pointer',textAlign:'left'}}>
        <div style={{width:'28px',height:'28px',flexShrink:0,background:o?C.lime:C.paperDark,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:o?C.ink:C.faint,transition:'all 0.2s ease'}}>01</div>
        <div style={{flex:1}}>
          <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:C.ink}}>The Year in Numbers</div>
          {!o&&<div style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.faint,marginTop:'2px'}}>174+ ventures · 12 sectors · $15B+ pipeline</div>}
        </div>
        <div style={{fontSize:'14px',color:o?C.lime:C.faint,transform:o?'rotate(0deg)':'rotate(-90deg)',transition:'transform 0.25s ease'}}>↓</div>
      </button>
      {o&&<div style={{padding:'0 18px 20px'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1px',background:C.border,marginBottom:'16px'}}>
          {[{v:'174+',l:'Ventures assessed',s:'12 integrated sectors'},{v:'12',l:'Sectors mapped',s:'Infra to creative industries'},{v:'$15B+',l:'Unrealised potential',s:'Identified in BRIDGE pipeline'},{v:'4',l:'Engagement models',s:'Direct, portfolio, partnership, incubation'}].map((d,i)=>(
            <div key={i} style={{padding:'14px 12px',background:C.paper,position:'relative'}}>
              <div style={{position:'absolute',top:0,left:'15%',right:'15%',height:'2px',background:C.lime}}/>
              <div style={{fontFamily:F.mono,fontSize:'20px',fontWeight:500,color:C.forest,lineHeight:1,marginBottom:'4px'}}>{d.v}</div>
              <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.ink,marginBottom:'2px'}}>{d.l}</div>
              <div style={{fontFamily:F.body,fontSize:'10px',color:C.muted,fontStyle:'italic'}}>{d.s}</div>
            </div>
          ))}
        </div>
        <div style={{borderLeft:`3px solid ${C.lime}`,paddingLeft:'14px',margin:'16px 0'}}>
          <p style={{fontFamily:F.display,fontSize:'14px',fontStyle:'italic',fontWeight:600,color:C.forest,lineHeight:1.55}}>"Year One was not about proving concepts. It was about building the intelligence infrastructure that makes every year after it compoundable."</p>
          <div style={{marginTop:'6px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.muted,letterSpacing:'1px',textTransform:'uppercase'}}>— BRIDGE Founding Statement, 2025</div>
        </div>
        <p style={{fontFamily:F.body,fontSize:'13px',lineHeight:1.8,color:C.ink,fontWeight:300,marginBottom:'12px'}}>Before capital could be deployed with precision, the full landscape had to be mapped — sector by sector, venture by venture, constraint by constraint.</p>
        <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px',paddingTop:'12px',borderTop:`1px solid ${C.border}`}}>2025 Milestones</div>
        {[{q:'Q1',e:'BRIDGE PBC incorporated; founding framework established',t:'Foundation'},{q:'Q2',e:'12-sector architecture finalised; Impact Score™ locked',t:'Architecture'},{q:'Q2',e:'174+ ventures assessed across all 12 sectors',t:'Intelligence'},{q:'Q3',e:'Kejetia Market digitisation: pilot initiated',t:'Flagship'},{q:'Q4',e:'Website launched; public intelligence programme initiated',t:'Platform'}].map((m,i)=>(
          <div key={i} style={{display:'flex',gap:'12px',padding:'8px 0',borderBottom:i<4?`1px solid ${C.border}`:'none',alignItems:'flex-start'}}>
            <div style={{fontFamily:F.mono,fontSize:'9px',color:C.lime,fontWeight:700,minWidth:'20px',paddingTop:'2px'}}>{m.q}</div>
            <div style={{flex:1}}>
              <div style={{fontFamily:F.body,fontSize:'12px',color:C.ink,lineHeight:1.5,marginBottom:'3px'}}>{m.e}</div>
              <span style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,color:C.forest,border:`1px solid ${C.border}`,padding:'1px 5px'}}>{m.t}</span>
            </div>
          </div>
        ))}
      </div>}
    </div>
  );
};

const MobKejetia=()=>{
  const[o,setO]=useState(false);
  return(
    <div style={{background:C.forest,borderBottom:'1px solid rgba(255,255,255,0.08)'}}>
      <button onClick={()=>setO(x=>!x)} style={{width:'100%',background:'transparent',border:'none',padding:'16px 18px',display:'flex',alignItems:'center',gap:'12px',cursor:'pointer',textAlign:'left'}}>
        <div style={{width:'28px',height:'28px',flexShrink:0,background:o?C.lime:'rgba(255,255,255,0.1)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:o?C.ink:'rgba(255,255,255,0.4)',transition:'all 0.2s ease'}}>02</div>
        <div style={{flex:1}}>
          <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:C.paper}}>Kejetia Market: Flagship Initiative</div>
          {!o&&<div style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:'rgba(250,248,243,0.4)',marginTop:'2px'}}>West Africa's largest market · 10,000+ vendors · 0% digitised</div>}
        </div>
        <div style={{fontSize:'14px',color:o?C.lime:'rgba(255,255,255,0.3)',transform:o?'rotate(0deg)':'rotate(-90deg)',transition:'transform 0.25s ease'}}>↓</div>
      </button>
      {o&&<div style={{padding:'0 18px 20px'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'2px',marginBottom:'16px'}}>
          {[{v:'10,000+',l:'Vendors in scope',c:C.lime},{v:'GHS 3T',l:'Ecosystem transactions',c:'rgba(250,248,243,0.85)'},{v:'0%',l:'Currently digitised',c:'rgba(220,80,60,0.9)'},{v:'15–25%',l:'Cost reduction target',c:C.lime}].map((d,i)=>(
            <div key={i} style={{background:'rgba(0,0,0,0.22)',padding:'14px 12px'}}>
              <div style={{fontFamily:F.mono,fontSize:'20px',color:d.c,lineHeight:1,marginBottom:'5px'}}>{d.v}</div>
              <div style={{fontFamily:F.sans,fontSize:'9px',color:'rgba(250,248,243,0.45)',lineHeight:1.4}}>{d.l}</div>
            </div>
          ))}
        </div>
        <p style={{fontFamily:F.body,fontSize:'13px',lineHeight:1.8,color:'rgba(250,248,243,0.7)',fontWeight:300,marginBottom:'10px'}}>West Africa's largest market. 10,000+ vendors. Entirely paper-based — opaque, fragmented, and far below its economic potential.</p>
        <p style={{fontFamily:F.body,fontSize:'13px',lineHeight:1.8,color:'rgba(250,248,243,0.7)',fontWeight:300,marginBottom:'14px'}}>BRIDGE's flagship investment targets payment processing, inventory management, vendor analytics, and marketplace connectivity. Traditional commerce made intelligent.</p>
        <div style={{borderLeft:`3px solid ${C.lime}`,paddingLeft:'14px',marginBottom:'16px'}}>
          <p style={{fontFamily:F.display,fontSize:'14px',fontStyle:'italic',color:C.paper,lineHeight:1.55}}>"The goal is not to modernise the market. The goal is to make every vendor in it more powerful."</p>
        </div>
        <div style={{border:'1px solid rgba(184,217,53,0.25)',padding:'14px'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'10px'}}>Digitisation Roadmap</div>
          {[{ph:'Phase 1',d:'Payment infrastructure & vendor onboarding'},{ph:'Phase 2',d:'Inventory management & business intelligence'},{ph:'Phase 3',d:'Marketplace connectivity & export linkages'}].map((p,i)=>(
            <div key={i} style={{display:'flex',gap:'10px',padding:'7px 0',borderBottom:i<2?'1px solid rgba(184,217,53,0.1)':'none'}}>
              <span style={{fontFamily:F.mono,fontSize:'10px',color:C.lime,minWidth:'56px',flexShrink:0}}>{p.ph}</span>
              <span style={{fontFamily:F.body,fontSize:'12px',color:'rgba(250,248,243,0.6)',fontStyle:'italic'}}>{p.d}</span>
            </div>
          ))}
        </div>
      </div>}
    </div>
  );
};

const MobilePublicLayout=()=>{
  const[openObj,setOpenObj]=useState(null);
  const OBJECTIONS=[
    {q:'What does "Members" actually mean?',a:'BRIDGE Network Membership gives you year-round access — all 12 sector briefs, quarterly updates, and the full venture pipeline database. An ongoing intelligence subscription, not a one-time purchase.'},
    {q:'Is this relevant outside Ghana?',a:'Members include diaspora professionals in North America and Europe, institutional investors, DFI representatives, and development practitioners globally. Ghana is the lens — the intelligence is built for anyone whose work intersects with Ghanaian development.'},
    {q:'How is BRIDGE different from a standard research report?',a:'Standard reports describe. BRIDGE prescribes. Every brief includes venture-level investment theses, deployment parameters, risk matrices, and cross-sector integration maps. Actionable intelligence, not background reading.'},
  ];
  const TIERS_MOB=[
    {label:'General Community',price:'Free',note:'Always free',desc:'Public briefings and community access.',items:['Annual Opportunity Report (public)','Quarterly macro updates','BRIDGE newsletter'],cta:'Download Free Report',primary:false},
    {label:'Network Member',price:'$100–$500',note:'per year',desc:'Full platform and complete intelligence suite.',items:['Complete Annual Review (174 pages)','All 12 full sector briefs','174+ venture scoring matrices','Quarterly updates (4×/yr)','2026 Priority Roadmap'],cta:'Apply for Network Membership →',primary:true,tag:'Most Popular'},
    {label:'Professional Contributor',price:'$500–$2,000',note:'per year or time',desc:'Intelligence plus advisory and deal flow access.',items:['Everything in Network Member','Advisory & mentorship matching','Deal flow access (observer basis)','OR: 10+ hrs/quarter contribution'],cta:'Discuss Contribution',primary:false},
  ];
  const LOCKED_CHAPTERS=[
    {ch:'II',title:'12-Sector Full Analysis',pp:'48pp'},
    {ch:'III',title:'Venture Pipeline Database',pp:'36pp'},
    {ch:'IV',title:'Capital & Partnership Results',pp:'22pp'},
    {ch:'V',title:'Voices from the Field',pp:'18pp'},
    {ch:'VI',title:'2026 Deployment Strategy',pp:'20pp'},
  ];
  return(
    <div style={{fontFamily:F.body,background:C.paper}}>
      {/* Cover */}
      <div style={{background:C.ink,padding:'28px 18px 0',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',right:'-15px',bottom:'10px',fontFamily:F.display,fontSize:'130px',fontWeight:900,color:'rgba(255,255,255,0.04)',lineHeight:1,userSelect:'none',letterSpacing:'-6px',pointerEvents:'none'}}>2025</div>
        <div style={{position:'relative'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'28px'}}>
            <Logo height={20} variant="white"/>
            <span style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,color:C.lime,letterSpacing:'2px',textTransform:'uppercase',border:'1px solid rgba(184,217,53,0.4)',padding:'3px 8px'}}>Public Edition</span>
          </div>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.lime,marginBottom:'12px'}}>The Architecture of Progress</div>
          <h1 style={{fontFamily:F.display,fontSize:'54px',fontWeight:900,color:C.paper,lineHeight:0.9,letterSpacing:'-2.5px',marginBottom:'16px'}}>Year<br/><em style={{color:C.lime,fontStyle:'italic'}}>One.</em></h1>
          <p style={{fontFamily:F.body,fontSize:'13px',fontStyle:'italic',lineHeight:1.6,color:'rgba(250,248,243,0.45)',marginBottom:'24px'}}>BRIDGE PBC's inaugural Annual Review. 174+ ventures assessed. 12 sectors mapped. Ghana's development framework — deployed.</p>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1px',background:'rgba(255,255,255,0.06)',borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:'1px',marginBottom:'20px'}}>
            {[{v:'174+',l:'Ventures assessed'},{v:'12',l:'Sectors mapped'},{v:'$15B+',l:'Unrealised potential'},{v:'4',l:'Engagement models'}].map((s,i)=>(
              <div key={i} style={{padding:'14px 12px',background:C.ink}}>
                <div style={{fontFamily:F.mono,fontSize:'20px',fontWeight:500,color:C.lime,lineHeight:1,marginBottom:'3px'}}>{s.v}</div>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:600,color:'rgba(255,255,255,0.3)'}}>{s.l}</div>
              </div>
            ))}
          </div>
          <a href="#mob-cta" style={{display:'block',background:C.lime,color:C.ink,padding:'13px',fontFamily:F.sans,fontSize:'11px',fontWeight:800,textAlign:'center',textDecoration:'none',marginBottom:'20px'}}>Apply for Network Membership →</a>
        </div>
        <div style={{height:'3px',background:C.lime,margin:'0 -18px'}}/>
      </div>
      <MobYearNumbers/>
      <MobKejetia/>
      {/* Gate */}
      <div id="mob-cta" style={{background:C.ink}}>
        <div style={{background:C.forest,padding:'24px 18px',position:'relative'}}>
          <div style={{position:'absolute',top:0,left:0,right:0,height:'3px',background:C.lime}}/>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'12px'}}>Full Annual Review · Members Only</div>
          <h2 style={{fontFamily:F.display,fontSize:'28px',fontWeight:700,fontStyle:'italic',color:C.paper,lineHeight:1.15,marginBottom:'14px'}}>You've seen the framework.<br/>Members see the whole picture.</h2>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'1px',background:'rgba(255,255,255,0.08)',marginBottom:'16px'}}>
            {[{v:'174',l:'Pages'},{v:'12',l:'Sectors'},{v:'174+',l:'Ventures'}].map((s,i)=>(
              <div key={i} style={{padding:'12px 10px',background:'rgba(255,255,255,0.06)'}}>
                <div style={{fontFamily:F.mono,fontSize:'20px',color:C.lime,lineHeight:1,marginBottom:'3px'}}>{s.v}</div>
                <div style={{fontFamily:F.sans,fontSize:'9px',color:'rgba(250,248,243,0.35)'}}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',marginBottom:'8px',paddingBottom:'6px',borderBottom:'1px solid rgba(255,255,255,0.08)'}}>Locked in public edition</div>
          {LOCKED_CHAPTERS.map((c,i)=>(
            <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'7px 0',borderBottom:i<4?'1px solid rgba(255,255,255,0.06)':'none'}}>
              <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
                <span style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(255,255,255,0.2)'}}>{c.ch}</span>
                <span style={{fontFamily:F.sans,fontSize:'11px',color:'rgba(250,248,243,0.45)'}}>{c.title}</span>
              </div>
              <span style={{fontFamily:F.sans,fontSize:'9px',color:'rgba(255,255,255,0.2)',flexShrink:0}}>{c.pp} · Members</span>
            </div>
          ))}
        </div>
        {TIERS_MOB.map((tier,i)=>{
          const ip=tier.primary;
          return(
            <div key={i} style={{padding:'20px 18px',background:ip?'rgba(255,255,255,0.04)':'transparent',borderBottom:`1px solid ${ip?'rgba(184,217,53,0.15)':'rgba(255,255,255,0.06)'}`}}>
              {tier.tag&&<div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:800,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,marginBottom:'8px'}}>★ {tier.tag}</div>}
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'10px'}}>
                <div>
                  <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,marginBottom:'4px'}}>{tier.label}</div>
                  <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:'rgba(250,248,243,0.4)',lineHeight:1.4,maxWidth:'180px'}}>{tier.desc}</p>
                </div>
                <div style={{textAlign:'right',flexShrink:0}}>
                  <div style={{fontFamily:F.mono,fontSize:'20px',fontWeight:500,color:C.paper,lineHeight:1}}>{tier.price}</div>
                  <div style={{fontFamily:F.sans,fontSize:'9px',color:'rgba(250,248,243,0.3)'}}>{tier.note}</div>
                </div>
              </div>
              <div style={{marginBottom:'14px'}}>
                {tier.items.map((item,ii)=>(
                  <div key={ii} style={{display:'flex',gap:'6px',alignItems:'flex-start',padding:'3px 0'}}>
                    <span style={{color:C.lime,fontSize:'9px',flexShrink:0,marginTop:'2px'}}>✓</span>
                    <span style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(250,248,243,0.55)',lineHeight:1.4}}>{item}</span>
                  </div>
                ))}
              </div>
              <a href="#" style={{display:'block',textAlign:'center',padding:'11px',background:ip?C.lime:'rgba(255,255,255,0.06)',border:`1px solid ${ip?C.lime:'rgba(255,255,255,0.15)'}`,color:ip?C.ink:'rgba(250,248,243,0.6)',fontFamily:F.sans,fontSize:'11px',fontWeight:800,textDecoration:'none'}}>{tier.cta}</a>
            </div>
          );
        })}
        <div style={{padding:'20px 18px 0',background:'rgba(255,255,255,0.02)'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(255,255,255,0.2)',marginBottom:'12px'}}>Common Questions</div>
          {OBJECTIONS.map((obj,i)=>{
            const isOpen=openObj===i;
            return(
              <div key={i} style={{borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
                <button onClick={()=>setOpenObj(isOpen?null:i)} style={{display:'flex',width:'100%',justifyContent:'space-between',alignItems:'center',padding:'13px 0',background:'transparent',border:'none',cursor:'pointer',textAlign:'left',gap:'12px'}}>
                  <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:isOpen?C.lime:'rgba(250,248,243,0.7)',transition:'color 0.15s ease',lineHeight:1.4}}>{obj.q}</span>
                  <span style={{fontFamily:F.mono,fontSize:'14px',color:C.lime,flexShrink:0,transform:isOpen?'rotate(45deg)':'none',transition:'transform 0.2s ease'}}>+</span>
                </button>
                {isOpen&&<p style={{fontFamily:F.body,fontSize:'12px',lineHeight:1.75,color:'rgba(250,248,243,0.5)',paddingBottom:'14px',fontWeight:300}}>{obj.a}</p>}
              </div>
            );
          })}
        </div>
        <div style={{padding:'28px 18px',textAlign:'center',borderTop:'1px solid rgba(255,255,255,0.08)'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:'6px',marginBottom:'16px'}}>
            <div style={{width:'6px',height:'6px',background:C.lime}}/>
            <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime}}>2026 Membership Cycle Now Open</span>
          </div>
          <h2 style={{fontFamily:F.display,fontSize:'26px',fontWeight:900,color:C.paper,lineHeight:1.05,letterSpacing:'-1px',marginBottom:'12px'}}>Ghana's development decade<br/><em style={{color:C.lime,fontStyle:'italic'}}>is already underway.</em></h2>
          <p style={{fontFamily:F.body,fontSize:'13px',lineHeight:1.7,color:'rgba(250,248,243,0.45)',marginBottom:'20px',fontStyle:'italic'}}>The capital is being allocated. The ventures are being built.</p>
          <a href="#" style={{display:'block',background:C.lime,color:C.ink,padding:'14px',fontFamily:F.sans,fontSize:'12px',fontWeight:800,textDecoration:'none',marginBottom:'10px'}}>Apply for Network Membership →</a>
          <a href="#" style={{display:'block',background:'transparent',border:'1px solid rgba(255,255,255,0.15)',color:'rgba(250,248,243,0.6)',padding:'12px',fontFamily:F.sans,fontSize:'12px',fontWeight:700,textDecoration:'none',marginBottom:'16px'}}>Discuss Contribution</a>
          <div style={{display:'flex',justifyContent:'center',gap:'14px',flexWrap:'wrap',marginBottom:'14px'}}>
            {['No auto-renewal','Cancel any time','48hr response'].map((s,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:'4px'}}>
                <span style={{color:C.lime,fontSize:'9px',fontWeight:700}}>✓</span>
                <span style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(250,248,243,0.3)'}}>{s}</span>
              </div>
            ))}
          </div>
          <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:'rgba(250,248,243,0.2)'}}>Not ready? <a href="#" style={{color:'rgba(184,217,53,0.4)',textDecoration:'underline'}}>Stay on the free tier</a> — always free.</p>
        </div>
      </div>
    </div>
  );
};

export default function AnnualReview2025(){
  const r=useRef(null);
  const isMob=useIsMobile();
  return(
    <div style={{fontFamily:F.body,background:C.paper}}>
      <Gf/>
      <TopBar coverLogoRef={r} isMob={isMob}/>
      {isMob?(
        <MobilePublicLayout/>
      ):(
        <>
          <Cover logoRef={r}/>
          <YearNumbers/>
          <Kejetia/>
          <WhatsInside/>
          <Footer/>
        </>
      )}
    </div>
  );
}
