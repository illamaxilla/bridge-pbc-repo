import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SECTORS } from "@/components/intelligence/dashboard/data";
import { MobileDashboard } from "@/components/intelligence/dashboard";
import DesktopDashboard from "@/components/intelligence/dashboard/DesktopDashboard";

export default function BridgeDashboard() {
  const [isMobile, setMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);
  const [searchParams] = useSearchParams();
  const [s, setS] = useState(() => {
    const id = searchParams.get("sector");
    return SECTORS.find(sec => sec.id === id) || SECTORS[0];
  });

  useEffect(() => {
    const id = searchParams.get("sector");
    if (id) {
      const found = SECTORS.find(sec => sec.id === id);
      if (found) setS(found);
    }
  }, [searchParams]);

  useState(() => {
    const h = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  });
  if (isMobile) return <MobileDashboard s={s} setS={setS} />;
  return <DesktopDashboard />;
}
