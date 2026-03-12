import { useState } from "react";
import { SECTORS, ALL, MB } from "./data";
import { MobileHeader, MobileBottomNav } from "./MobileComponents";
import { FeedPage, PlayersPage, ScoresPage, SignalsPage, PortfolioPage } from "./MobilePages";
import { MobileDetailSheet } from "./MobileDetailSheet";

export function MobileApp() {
  const [sector, setSector] = useState(SECTORS[0]);
  const [page, setPage] = useState("feed");
  const [selId, setSelId] = useState(null);
  const handleSetSector = (s) => {
    setSector(s);
    setSelId(null);
  };
  const selectedItem = selId ? ALL.find((i) => i.id === selId) : null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
        background: MB.bg,
        fontFamily: "'DM Sans',Inter,sans-serif",
      }}
    >
      <style>{`
      .sp{animation:spin 1s linear infinite}
      .drawer{animation:slideUp 0.25s ease}
      .hs::-webkit-scrollbar{display:none}.hs{scrollbar-width:none}
      *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
    `}</style>
      <MobileHeader sector={sector} setSector={handleSetSector} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minHeight: 0 }}>
        {page === "feed" && (
          <div className="hs" style={{ flex: 1, overflowY: "auto" }}>
            <FeedPage sector={sector} setSelId={setSelId} />
          </div>
        )}
        {page === "companies" && (
          <div className="hs" style={{ flex: 1, overflowY: "auto" }}>
            <PlayersPage sector={sector} setSelId={setSelId} />
          </div>
        )}
        {page === "scores" && (
          <div className="hs" style={{ flex: 1, overflowY: "auto" }}>
            <ScoresPage sector={sector} />
          </div>
        )}
        {page === "signals" && (
          <div className="hs" style={{ flex: 1, overflowY: "auto" }}>
            <SignalsPage sector={sector} />
          </div>
        )}
        {page === "portfolio" && (
          <div className="hs" style={{ flex: 1, overflowY: "auto" }}>
            <PortfolioPage sector={sector} />
          </div>
        )}
      </div>
      <MobileBottomNav page={page} setPage={setPage} />
      {selectedItem && <MobileDetailSheet item={selectedItem} onClose={() => setSelId(null)} />}
    </div>
  );
}
