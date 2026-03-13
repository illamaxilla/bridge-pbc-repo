import React, { useState, useEffect } from "react";
import { SECTORS } from "../../components/intelligence/market/data";
import { DesktopDashboard } from "../../components/intelligence/market/DesktopComponents";
import { MobileDashboard } from "../../components/intelligence/market/MobilePages";

export default function BridgeMarketOverview() {
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile ? <MobileDashboard /> : <DesktopDashboard />;
}
