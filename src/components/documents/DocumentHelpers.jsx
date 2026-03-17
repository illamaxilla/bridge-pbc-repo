import { useState, useRef } from "react";
import { DOC_COLORS as C, DOC_FONTS as F } from "@/lib/document-tokens";

export const SectionRule = () => (
  <div style={{borderTop:`6px solid ${C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'20px'}}/>
);

export const Eyebrow = ({children, light=false}) => (
  <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:light?'rgba(250,248,243,0.4)':C.muted,marginBottom:'8px'}}>{children}</div>
);

export const ScoreBar = ({label, value, onDark}) => (
  <div style={{marginBottom:'11px'}}>
    <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px'}}>
      <span style={{fontFamily:F.sans,fontSize:'10px',color:onDark?'rgba(250,248,243,0.4)':C.muted}}>{label}</span>
      <span style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:onDark?C.lime:C.forest}}>{value}</span>
    </div>
    <div style={{height:'3px',background:onDark?'rgba(255,255,255,0.08)':C.border,borderRadius:'2px',overflow:'hidden'}}>
      <div style={{height:'100%',width:`${value}%`,background:C.lime,borderRadius:'2px'}}/>
    </div>
  </div>
);

export const PullQuote = ({children, author, onDark=false}) => (
  <div style={{borderLeft:`3px solid ${C.lime}`,paddingLeft:'18px',margin:'24px 0'}}>
    <p style={{fontFamily:F.display,fontSize:'17px',fontStyle:'italic',fontWeight:600,color:onDark?'rgba(250,248,243,0.7)':C.forest,lineHeight:1.65,marginBottom:author?'10px':'0'}}>{children}</p>
    {author && <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:onDark?'rgba(250,248,243,0.3)':C.faint}}>{author}</div>}
  </div>
);

export const Tag = ({children, color, bg}) => (
  <div style={{display:'inline-block',background:bg||'transparent',border:`1px solid ${color}`,color:color,padding:'2px 8px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase'}}>{children}</div>
);

export const MobCarousel = ({items, renderCard, onDark=false}) => {
  const [active, setActive] = useState(0);
  const scrollRef = useRef(null);
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const cardW = scrollRef.current.offsetWidth * 0.85 + 12;
    const idx = Math.round(scrollRef.current.scrollLeft / cardW);
    setActive(Math.max(0, Math.min(idx, items.length - 1)));
  };
  const goTo = (i) => {
    if (!scrollRef.current) return;
    const cardW = scrollRef.current.offsetWidth * 0.85 + 12;
    scrollRef.current.scrollTo({left: i * cardW, behavior:'smooth'});
    setActive(i);
  };
  return (
    <div className="mob-show" style={{display:'none',marginTop:'16px'}}>
      <div className="mob-carousel" ref={scrollRef} onScroll={handleScroll}>
        {items.map((item, i) => (
          <div key={i} className="mob-card">
            {renderCard(item, i)}
          </div>
        ))}
      </div>
      <div style={{display:'flex',gap:'6px',justifyContent:'center',marginTop:'14px'}}>
        {items.map((_,i) => (
          <div key={i} onClick={()=>goTo(i)} style={{
            width:i===active?'24px':'8px', height:'8px', borderRadius:'4px',
            background:i===active?C.lime:(onDark?'rgba(255,255,255,0.2)':C.border),
            cursor:'pointer', transition:'all 0.3s ease',
          }}/>
        ))}
      </div>
    </div>
  );
};

export const MobPhaseAccordion = ({phases}) => {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <div className="mob-show" style={{display:'none',marginTop:'8px'}}>
      {phases.map((p, i) => {
        const isOpen = openIdx === i;
        return (
          <div key={i} className={isOpen ? 'mob-phase-open' : ''} style={{borderBottom:`1px solid ${C.border}`}}>
            <button className="mob-phase-hdr" onClick={()=>setOpenIdx(isOpen?null:i)}>
              <div style={{display:'flex',gap:'10px',alignItems:'center'}}>
                <div style={{width:'8px',height:'8px',background:p.color,flexShrink:0}}/>
                <div>
                  <div style={{fontFamily:F.mono,fontSize:'8px',fontWeight:700,color:p.color,letterSpacing:'1px',textAlign:'left'}}>{p.phase}</div>
                  <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink,lineHeight:1.2,textAlign:'left'}}>{p.label}</div>
                </div>
              </div>
              <span style={{fontFamily:F.mono,fontSize:'13px',color:C.faint,transition:'transform 0.2s',transform:isOpen?'rotate(180deg)':'none',flexShrink:0,marginLeft:'8px'}}>↓</span>
            </button>
            <div className="mob-phase-body" style={{paddingBottom:'14px',paddingTop:'8px'}}>
              {p.steps.map((s,j) => (
                <div key={j} style={{display:'flex',gap:'8px',padding:'5px 0',borderBottom:j<p.steps.length-1?`1px solid rgba(0,0,0,0.04)`:'none'}}>
                  <span style={{color:p.color,fontFamily:F.mono,fontSize:'10px',flexShrink:0,marginTop:'2px'}}>→</span>
                  <span style={{fontFamily:F.body,fontSize:'12px',color:C.muted,lineHeight:1.55}}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const MobCountryCards = ({countries}) => {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <div className="mob-show" style={{display:'none',marginTop:'8px'}}>
      {countries.map((r, i) => {
        const isOpen = openIdx === i;
        const isGhana = !!r.hl;
        return (
          <div key={i} style={{borderBottom:`1px solid ${C.border}`,background:isGhana?`rgba(184,217,53,0.06)`:'transparent'}}>
            <button onClick={()=>setOpenIdx(isOpen?null:i)}
              style={{width:'100%',display:'flex',justifyContent:'space-between',alignItems:'center',
                padding:'12px 0',border:'none',background:'transparent',cursor:'pointer',textAlign:'left'}}>
              <div style={{display:'flex',gap:'10px',alignItems:'center'}}>
                <span style={{fontFamily:F.sans,fontSize:'14px',fontWeight:700,color:C.ink}}>{r.country}</span>
                {isGhana && <span style={{background:C.lime,color:C.ink,padding:'2px 7px',fontFamily:F.sans,fontSize:'7px',fontWeight:800,letterSpacing:'1.5px',textTransform:'uppercase'}}>TOP PICK</span>}
              </div>
              <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                <span style={{fontFamily:F.mono,fontSize:'11px',color:C.faint}}>{r.status}</span>
                <span style={{fontFamily:F.mono,fontSize:'13px',color:C.faint,transition:'transform 0.2s',transform:isOpen?'rotate(180deg)':'none'}}>↓</span>
              </div>
            </button>
            {isOpen && (
              <div style={{paddingBottom:'14px'}}>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginBottom:'8px'}}>
                  {[
                    {l:'Agro Fit', v:r.aFit},
                    {l:'Port Access', v:r.port},
                    {l:'Labour Cost', v:r.labour},
                    {l:'Framework', v:r.fw},
                    {l:'Smallholder', v:r.sm},
                  ].map((f,j) => (
                    <div key={j} style={{padding:'8px',background:C.paperDark}}>
                      <div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:C.faint,marginBottom:'3px'}}>{f.l}</div>
                      <div style={{fontFamily:F.sans,fontSize:'13px',color:C.ink}}>{f.v}</div>
                    </div>
                  ))}
                </div>
                <div style={{background:isGhana?C.forest:'transparent',border:isGhana?'none':`1px solid ${C.border}`,padding:'10px 12px'}}>
                  <span style={{fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:isGhana?C.paper:C.muted}}>{r.view}</span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export const MobileCollapse = ({num, title, stat, label, defaultOpen=false, onDark=false, children}) => {
  const [open, setOpen] = useState(defaultOpen);
  const numCol = C.lime;
  const titleCol = onDark ? C.paper : C.ink;
  const statCol = onDark ? C.lime : C.forest;
  const labelCol = onDark ? 'rgba(250,248,243,0.35)' : C.faint;
  const chevCol = onDark ? 'rgba(250,248,243,0.3)' : C.muted;
  return (
    <>
      <button
        className={`mob-show mob-sec-toggle${onDark ? '' : ' mob-sec-toggle-light'}`}
        style={{display:'none'}}
        onClick={() => setOpen(o => !o)}
      >
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:numCol,letterSpacing:'1px',flexShrink:0}}>{num}</span>
          <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:titleCol,lineHeight:1.2}}>{title}</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'10px',flexShrink:0}}>
          <div style={{textAlign:'right'}}>
            <div style={{fontFamily:F.mono,fontSize:'13px',fontWeight:700,color:statCol,lineHeight:1}}>{stat}</div>
            <div style={{fontFamily:F.sans,fontSize:'8px',color:labelCol,letterSpacing:'0.8px',marginTop:'2px'}}>{label}</div>
          </div>
          <span style={{fontFamily:F.mono,fontSize:'14px',color:chevCol,transition:'transform 0.25s ease',transform:open?'rotate(180deg)':'rotate(0deg)',display:'inline-block'}}>↓</span>
        </div>
      </button>
      <div className={open ? '' : 'mob-sec-collapsed'}>
        {children}
      </div>
    </>
  );
};
