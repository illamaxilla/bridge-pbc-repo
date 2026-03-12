import { useParams, Navigate } from "react-router-dom";
import ReportViewer from "@/components/ReportViewer";

const SECTOR_BRIEFS: Record<string, { file: string; title: string }> = {
  infrastructure: { file: "infrastructure-sector-brief-2026.html", title: "Infrastructure & Basic Services" },
  financial:      { file: "financial-sector-brief-2026.html",      title: "Financial Inclusion & Economic Security" },
  health:         { file: "health-sector-brief-2026.html",         title: "Health Systems & Wellbeing" },
  technology:     { file: "technology-sector-brief-2026.html",     title: "Technology & Innovation" },
  education:      { file: "education-sector-brief-2026.html",      title: "Education & Skills" },
  agriculture:    { file: "agriculture-sector-brief-2026.html",    title: "Agriculture & Value Chains" },
  sports:         { file: "sports-sector-brief-2026.html",         title: "Sports, Entertainment & Creative" },
  housing:        { file: "housing-sector-brief-2026.html",        title: "Housing & Real Estate" },
  tourism:        { file: "tourism-sector-brief-2026.html",        title: "Tourism & Hospitality" },
  energy:         { file: "energy-sector-brief-2026.html",         title: "Energy & Renewable Resources" },
  manufacturing:  { file: "manufacturing-sector-brief-2026.html",  title: "Manufacturing & Light Industry" },
  transport:      { file: "transport-sector-brief-2026.html",      title: "Transportation & Logistics" },
};

export default function SectorBriefViewer() {
  const { slug } = useParams<{ slug: string }>();
  const brief = slug ? SECTOR_BRIEFS[slug] : null;

  if (!brief) return <Navigate to="/resources" replace />;

  return (
    <ReportViewer
      src={`/reports/${brief.file}`}
      title={`BRIDGE Sector Brief: ${brief.title}`}
      backTo="/resources"
      backLabel="Back to Resources"
    />
  );
}
