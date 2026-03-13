import { M } from "../constants";

export function MobileMap({ s }) {
  const continents = [
    {
      id: "NA",
      pts: "33,83 83,56 167,28 250,39 333,56 375,83 347,119 314,128 278,181 250,194 208,194 172,161 172,128 156,114 83,89",
    },
    { id: "GL", pts: "333,28 389,14 417,28 403,56 361,61 333,50" },
    {
      id: "SA",
      pts: "222,194 278,183 328,194 375,217 403,261 403,272 389,306 361,328 333,389 306,403 292,389 278,356 264,317 256,261 250,228 222,211",
    },
    {
      id: "EU",
      pts: "444,78 472,61 514,53 528,61 550,50 578,53 600,72 583,89 561,94 536,100 514,92 500,100 486,111 472,106 458,100 444,89",
    },
    {
      id: "AF",
      pts: "458,100 528,94 583,100 617,128 628,150 636,167 642,194 628,228 617,261 597,317 583,350 567,367 544,372 519,361 500,356 481,350 464,328 453,294 447,261 450,228 453,194 453,161 458,128",
    },
    {
      id: "AS",
      pts: "583,89 617,78 650,56 700,39 750,28 833,28 900,39 944,56 967,78 961,100 922,119 883,133 861,150 833,161 806,167 778,194 750,211 722,222 700,228 667,217 650,194 628,172 617,128 583,100",
    },
    { id: "AU", pts: "806,272 861,261 900,267 933,283 939,306 928,328 906,344 872,350 844,344 817,328 806,306" },
  ];
  const regions = [
    { f: "\u{1F1FA}\u{1F1F8}", l: "North America", pct: 42 },
    { f: "\u{1F1EA}\u{1F1FA}", l: "Europe", pct: 28 },
    { f: "\u{1F30F}", l: "Asia Pacific", pct: 21 },
    { f: "\u{1F30E}", l: "Latam", pct: 5 },
    { f: "\u{1F30D}", l: "Other", pct: 4 },
  ];
  const gx = 499,
    gy = 228;
  return (
    <div>
      <div
        style={{
          background: M.card,
          borderRadius: 14,
          border: `1px solid ${M.border}`,
          overflow: "hidden",
          marginBottom: 10,
        }}
      >
        <div
          style={{ padding: "12px 14px 8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          <span style={{ fontSize: 13, fontWeight: 700, color: M.text }}>Global Investor Distribution</span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: M.accent,
              fontFamily: "Inter,sans-serif",
              background: M.accentDim,
              padding: "2px 8px",
              borderRadius: 20,
            }}
          >
            5 Regions
          </span>
        </div>
        <svg viewBox="0 0 1000 500" style={{ width: "100%", display: "block" }}>
          <rect width="1000" height="500" fill="#0A1510" />
          {continents.map((c) => (
            <polygon key={c.id} points={c.pts} fill="#172318" stroke="#1E3328" strokeWidth="1.5" />
          ))}
          <circle cx={gx} cy={gy} r="16" fill={`${s.color}15`} />
          <circle cx={gx} cy={gy} r="9" fill={`${s.color}30`} />
          <circle cx={gx} cy={gy} r="5" fill={s.color} />
          <text x={gx + 12} y={gy - 8} fill={s.color} fontSize="18" fontWeight="800" fontFamily="Inter,sans-serif">
            GH
          </text>
        </svg>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {regions.map((r, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 14px",
              borderRadius: 10,
              background: M.card,
              border: `1px solid ${M.border}`,
            }}
          >
            <span style={{ fontSize: 18 }}>{r.f}</span>
            <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: M.text }}>{r.l}</span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 60,
                  height: 4,
                  background: "rgba(255,255,255,0.07)",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <div style={{ height: "100%", width: `${r.pct}%`, background: s.color, borderRadius: 2 }} />
              </div>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: M.accent,
                  fontFamily: "Inter,sans-serif",
                  minWidth: 28,
                  textAlign: "right",
                }}
              >
                {r.pct}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
