import { DOTS, GHANA_X, GHANA_Y, Region } from "./worldMapData";

interface MapVisualizationProps {
  sectorColor: string;
  regions: Region[];
  hovRegion: string | null;
  setHovRegion: (id: string | null) => void;
}

export function MapVisualization({ sectorColor, regions, hovRegion, setHovRegion }: MapVisualizationProps) {
  const gx = GHANA_X;
  const gy = GHANA_Y;

  return (
    <div
      style={{
        flex: 1,
        position: "relative",
        borderRadius: 12,
        overflow: "hidden",
        minHeight: 240,
        background: "linear-gradient(160deg,#e8f4fb 0%,#daeef8 60%,#cce6f4 100%)",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 440"
        preserveAspectRatio="xMidYMid meet"
        style={{ display: "block" }}
      >
        <defs>
          <radialGradient id="oceanGrad" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#daeef8" />
            <stop offset="100%" stopColor="#c8e3f2" />
          </radialGradient>
        </defs>
        {/* Ocean fill */}
        <rect x={0} y={0} width={1000} height={440} fill="url(#oceanGrad)" />
        {/* Grid */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <line
            key={`h${i}`}
            x1={0}
            y1={i * 44}
            x2={1000}
            y2={i * 44}
            stroke="#8aafc4"
            strokeWidth={0.25}
            strokeOpacity={0.35}
          />
        ))}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <line
            key={`v${i}`}
            x1={i * 100}
            y1={0}
            x2={i * 100}
            y2={440}
            stroke="#8aafc4"
            strokeWidth={0.25}
            strokeOpacity={0.35}
          />
        ))}
        {/* Equator */}
        <line
          x1={0}
          y1={250}
          x2={1000}
          y2={250}
          stroke="#5e8fa8"
          strokeWidth={0.8}
          strokeDasharray="6 5"
          strokeOpacity={0.4}
        />
        <text
          x={8}
          y={246}
          fontSize={7.5}
          fill="#7aaabf"
          fontFamily="Inter,sans-serif"
          opacity={0.85}
          fontStyle="italic"
        >
          Equator
        </text>
        {/* Prime meridian */}
        <line
          x1={500}
          y1={0}
          x2={500}
          y2={440}
          stroke="#5e8fa8"
          strokeWidth={0.8}
          strokeDasharray="6 5"
          strokeOpacity={0.4}
        />
        {/* Land dots from EPS */}
        {DOTS.map((d, i) => (
          <circle key={i} cx={d[0]} cy={d[1]} r={Math.max(d[2], 1.2)} fill="#9ab8c8" fillOpacity={0.85} />
        ))}
        {/* Connection lines */}
        {regions.map((r) => (
          <line
            key={`l${r.id}`}
            x1={gx}
            y1={gy}
            x2={r.x}
            y2={r.y}
            stroke={sectorColor}
            strokeWidth={1}
            strokeDasharray="5 4"
            strokeOpacity={0.28}
          />
        ))}
        {/* Region bubbles */}
        {regions.map((r) => {
          const isHov = hovRegion === r.id;
          const rb = isHov ? 22 : 18;
          return (
            <g
              key={r.id}
              onMouseEnter={() => setHovRegion(r.id)}
              onMouseLeave={() => setHovRegion(null)}
              style={{ cursor: "pointer" }}
            >
              <circle cx={r.x} cy={r.y} r={rb + 8} fill={sectorColor} fillOpacity={0.08} />
              <circle
                cx={r.x}
                cy={r.y}
                r={rb}
                fill={sectorColor}
                fillOpacity={isHov ? 0.92 : 0.62}
                stroke="#fff"
                strokeWidth={2}
              />
              <text
                x={r.x}
                y={r.y + 4}
                textAnchor="middle"
                fontSize={isHov ? 10 : 9}
                fill="#fff"
                fontFamily="Inter,sans-serif"
                fontWeight={700}
              >
                {r.pct}%
              </text>
              {isHov && (
                <g>
                  <rect
                    x={r.x - 52}
                    y={r.y - 48}
                    width={104}
                    height={24}
                    rx={5}
                    fill="#111827"
                    fillOpacity={0.92}
                  />
                  <text
                    x={r.x}
                    y={r.y - 32}
                    textAnchor="middle"
                    fontSize={9.5}
                    fill="#fff"
                    fontFamily="Inter,sans-serif"
                    fontWeight={700}
                  >
                    {r.flag} {r.label} · {r.pct}%
                  </text>
                </g>
              )}
            </g>
          );
        })}
        {/* Ghana Hub */}
        <circle cx={gx} cy={gy} r={32} fill={sectorColor} fillOpacity={0.06} />
        <circle cx={gx} cy={gy} r={20} fill={sectorColor} fillOpacity={0.12} />
        <circle cx={gx} cy={gy} r={10} fill={sectorColor} fillOpacity={0.95} stroke="#fff" strokeWidth={2.5} />
        <circle cx={gx} cy={gy} r={4} fill="#fff" />
        <rect x={gx + 14} y={gy - 20} width={76} height={22} rx={5} fill="#111827" fillOpacity={0.9} />
        <text
          x={gx + 52}
          y={gy - 5}
          textAnchor="middle"
          fontSize={9}
          fill="#fff"
          fontFamily="Inter,sans-serif"
          fontWeight={800}
          letterSpacing={0.8}
        >
          GHANA HUB
        </text>
      </svg>
    </div>
  );
}
