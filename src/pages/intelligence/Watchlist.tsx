import { useState } from "react";
import { C } from "../../components/intelligence/constants";
import { SECTORS, ALL } from "../../components/intelligence/watchlist/data";
import { useWindowWidth } from "../../components/intelligence/watchlist/MobileComponents";
import { Sidebar } from "../../components/intelligence/watchlist/Sidebar";
import { LeftPanel } from "../../components/intelligence/watchlist/LeftPanel";
import { RightPanel } from "../../components/intelligence/watchlist/RightPanel";
import { TopNav } from "../../components/intelligence/watchlist/TopNav";
import { StatusBar } from "../../components/intelligence/watchlist/StatusBar";
import { MobileApp } from "../../components/intelligence/watchlist/MobileApp";

export default function App() {
  const w = useWindowWidth();
  const [sector, setSector] = useState(SECTORS[0]);
  const [collapsed, setCollapsed] = useState(false);
  const [listTab, setListTab] = useState("listed");
  const [selId, setSelId] = useState(ALL[0]?.id || null);
  const [syncing, setSyncing] = useState(false);

  const handleSetSector = (sec) => {
    setSector(sec);
    const first = ALL.find((i) => i.sectorObj.id === sec.id);
    if (first) setSelId(first.id);
  };

  // Render mobile layout when viewport < 768 OR when in narrow artifact preview
  if (w < 900) return <MobileApp />;

  return (
    <div
      className="flex h-screen overflow-hidden font-['DM_Sans',Inter,sans-serif]"
      style={{ background: C.bg }}
    >
      <style>{`*{box-sizing:border-box}::-webkit-scrollbar{width:4px;height:4px}::-webkit-scrollbar-thumb{background:#E5E7EB;border-radius:4px}`}</style>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} active={sector} setActive={handleSetSector} />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <TopNav sector={sector} syncing={syncing} setSyncing={setSyncing} />
        <div className="flex-1 flex overflow-hidden">
          <LeftPanel sector={sector} selId={selId} setSelId={setSelId} tab={listTab} setTab={setListTab} />
          <RightPanel selId={selId} setSelId={setSelId} />
        </div>
        <StatusBar activeLabel={sector.full} />
      </div>
    </div>
  );
}
