import {
  Activity,
  ArrowLeft,
  MapPin,
  Settings,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import BottomNav from "../components/BottomNav";
import { BeamsBackground } from "../components/ui/beams-background";

interface NodeConfig {
  ddosProtection: boolean;
  autoScaling: boolean;
  firewallRules: boolean;
}

interface NodeData {
  id: number;
  name: string;
  location: string;
  flag: string;
  status: "Online" | "Maintenance";
  ping: number;
  players: number;
  maxPlayers: number;
  cpu: number;
  ram: number;
  uptime: string;
  accent: string;
  accentRgb: string;
  config: NodeConfig;
}

const NODES: NodeData[] = [
  {
    id: 1,
    name: "EU-Central Node",
    location: "Frankfurt, Germany",
    flag: "🇩🇪",
    status: "Online",
    ping: 12,
    players: 47,
    maxPlayers: 100,
    cpu: 34,
    ram: 58,
    uptime: "99.98%",
    accent: "#0ea5e9",
    accentRgb: "14,165,233",
    config: { ddosProtection: true, autoScaling: false, firewallRules: true },
  },
  {
    id: 2,
    name: "NA-East Node",
    location: "New York, USA",
    flag: "🇺🇸",
    status: "Online",
    ping: 8,
    players: 82,
    maxPlayers: 100,
    cpu: 61,
    ram: 72,
    uptime: "99.95%",
    accent: "#a855f7",
    accentRgb: "168,85,247",
    config: { ddosProtection: true, autoScaling: false, firewallRules: true },
  },
  {
    id: 3,
    name: "ASIA-Pacific Node",
    location: "Singapore",
    flag: "🇸🇬",
    status: "Maintenance",
    ping: 24,
    players: 0,
    maxPlayers: 100,
    cpu: 5,
    ram: 12,
    uptime: "97.20%",
    accent: "#22c55e",
    accentRgb: "34,197,94",
    config: { ddosProtection: true, autoScaling: false, firewallRules: true },
  },
];

function AnimatedBar({
  value,
  accent,
  accentRgb,
  delay = 0,
}: {
  value: number;
  accent: string;
  accentRgb: string;
  delay?: number;
}) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(value), 120 + delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return (
    <div
      style={{
        height: 8,
        borderRadius: 999,
        background: "rgba(255,255,255,0.07)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${width}%`,
          borderRadius: 999,
          background: `linear-gradient(90deg, ${accent}aa, ${accent})`,
          boxShadow: `0 0 10px rgba(${accentRgb},0.7), 0 0 4px rgba(${accentRgb},0.4)`,
          transition: "width 700ms cubic-bezier(0.34,1.56,0.64,1)",
        }}
      />
    </div>
  );
}

function ConfigToggle({
  label,
  icon,
  value,
  accent,
  accentRgb,
  onChange,
}: {
  label: string;
  icon: React.ReactNode;
  value: boolean;
  accent: string;
  accentRgb: string;
  onChange: (v: boolean) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 14px",
        borderRadius: 12,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.07)",
        marginBottom: 8,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          color: "rgba(255,255,255,0.8)",
          fontSize: 13,
        }}
      >
        <span style={{ color: accent, opacity: 0.9 }}>{icon}</span>
        {label}
      </div>
      {/* Pill Toggle */}
      <button
        type="button"
        onClick={() => onChange(!value)}
        aria-pressed={value}
        style={{
          width: 44,
          height: 24,
          borderRadius: 999,
          border: "none",
          cursor: "pointer",
          position: "relative",
          background: value
            ? `linear-gradient(90deg, ${accent}99, ${accent})`
            : "rgba(255,255,255,0.12)",
          boxShadow: value ? `0 0 12px rgba(${accentRgb},0.6)` : "none",
          transition: "all 300ms cubic-bezier(0.34,1.56,0.64,1)",
          outline: "none",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 3,
            left: value ? "calc(100% - 21px)" : 3,
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "white",
            boxShadow: "0 1px 4px rgba(0,0,0,0.4)",
            transition: "left 300ms cubic-bezier(0.34,1.56,0.64,1)",
          }}
        />
      </button>
    </div>
  );
}

function NodeCard({ node, index }: { node: NodeData; index: number }) {
  const [configOpen, setConfigOpen] = useState(false);
  const [config, setConfig] = useState<NodeConfig>(node.config);
  const [visible, setVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80 + index * 160);
    return () => clearTimeout(t);
  }, [index]);

  const isOnline = node.status === "Online";

  return (
    <div
      ref={cardRef}
      data-ocid={`nodes.item.${index + 1}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1)"
          : "translateY(40px) scale(0.95)",
        transition:
          "opacity 600ms ease, transform 600ms cubic-bezier(0.34,1.56,0.64,1)",
        transitionDelay: `${index * 80}ms`,
        backdropFilter: "blur(40px) saturate(200%)",
        WebkitBackdropFilter: "blur(40px) saturate(200%)",
        background: "rgba(8,10,22,0.52)",
        border: `1px solid rgba(${node.accentRgb},0.35)`,
        borderRadius: 24,
        boxShadow: `0 8px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(${node.accentRgb},0.12), 0 0 40px rgba(${node.accentRgb},0.12), inset 0 1px 0 rgba(255,255,255,0.1)`,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Inner reflection */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 60,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 1,
          borderRadius: "24px 24px 0 0",
        }}
      />

      {/* Accent glow top edge */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "20%",
          right: "20%",
          height: 1,
          background: `linear-gradient(90deg, transparent, ${node.accent}, transparent)`,
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      <div style={{ padding: 24, position: "relative", zIndex: 3 }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 4,
              }}
            >
              <span style={{ fontSize: 22 }}>{node.flag}</span>
              <h3
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "white",
                  letterSpacing: "0.03em",
                  margin: 0,
                  textShadow: `0 0 20px rgba(${node.accentRgb},0.5)`,
                }}
              >
                {node.name}
              </h3>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                color: "rgba(255,255,255,0.5)",
                fontSize: 12,
              }}
            >
              <MapPin size={12} />
              {node.location}
            </div>
          </div>

          {/* Status badge */}
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 12px",
              borderRadius: 999,
              background: isOnline
                ? "rgba(34,197,94,0.12)"
                : "rgba(251,191,36,0.12)",
              border: isOnline
                ? "1px solid rgba(34,197,94,0.35)"
                : "1px solid rgba(251,191,36,0.35)",
              backdropFilter: "blur(12px)",
              fontSize: 11,
              fontWeight: 600,
              color: isOnline ? "#4ade80" : "#fbbf24",
              boxShadow: isOnline
                ? "0 0 14px rgba(34,197,94,0.3)"
                : "0 0 14px rgba(251,191,36,0.3)",
            }}
          >
            {/* Pulsing ring */}
            <span style={{ position: "relative", display: "inline-flex" }}>
              <span
                style={{
                  position: "absolute",
                  inset: -3,
                  borderRadius: "50%",
                  border: isOnline
                    ? "1px solid rgba(34,197,94,0.6)"
                    : "1px solid rgba(251,191,36,0.6)",
                  animation: "node-ping 1.8s ease-out infinite",
                }}
              />
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: isOnline ? "#4ade80" : "#fbbf24",
                  boxShadow: isOnline ? "0 0 6px #4ade80" : "0 0 6px #fbbf24",
                  display: "block",
                }}
              />
            </span>
            {node.status}
          </div>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 12,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              textAlign: "center",
              padding: "10px 8px",
              borderRadius: 12,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 4,
              }}
            >
              <Zap size={14} style={{ color: node.accent }} />
            </div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "white",
                fontFamily: "'Orbitron', sans-serif",
              }}
            >
              {node.ping}
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>
                ms
              </span>
            </div>
            <div
              style={{
                fontSize: 10,
                color: "rgba(255,255,255,0.4)",
                marginTop: 2,
              }}
            >
              PING
            </div>
          </div>
          <div
            style={{
              textAlign: "center",
              padding: "10px 8px",
              borderRadius: 12,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 4,
              }}
            >
              <Users size={14} style={{ color: node.accent }} />
            </div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "white",
                fontFamily: "'Orbitron', sans-serif",
              }}
            >
              {node.players}
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>
                /{node.maxPlayers}
              </span>
            </div>
            <div
              style={{
                fontSize: 10,
                color: "rgba(255,255,255,0.4)",
                marginTop: 2,
              }}
            >
              PLAYERS
            </div>
          </div>
          <div
            style={{
              textAlign: "center",
              padding: "10px 8px",
              borderRadius: 12,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 4,
              }}
            >
              <Activity size={14} style={{ color: node.accent }} />
            </div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "white",
                fontFamily: "'Orbitron', sans-serif",
              }}
            >
              {node.uptime}
            </div>
            <div
              style={{
                fontSize: 10,
                color: "rgba(255,255,255,0.4)",
                marginTop: 2,
              }}
            >
              UPTIME
            </div>
          </div>
        </div>

        {/* CPU */}
        <div style={{ marginBottom: 14 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 11,
              color: "rgba(255,255,255,0.5)",
              marginBottom: 6,
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 2,
                  background: node.accent,
                  display: "inline-block",
                  boxShadow: `0 0 6px ${node.accent}`,
                }}
              />
              CPU
            </span>
            <span style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>
              {node.cpu}%
            </span>
          </div>
          <AnimatedBar
            value={node.cpu}
            accent={node.accent}
            accentRgb={node.accentRgb}
            delay={200}
          />
        </div>

        {/* RAM */}
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 11,
              color: "rgba(255,255,255,0.5)",
              marginBottom: 6,
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 2,
                  background: node.accent,
                  display: "inline-block",
                  boxShadow: `0 0 6px ${node.accent}`,
                  opacity: 0.7,
                }}
              />
              RAM
            </span>
            <span style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>
              {node.ram}%
            </span>
          </div>
          <AnimatedBar
            value={node.ram}
            accent={node.accent}
            accentRgb={node.accentRgb}
            delay={350}
          />
        </div>

        {/* Configure button */}
        <button
          type="button"
          onClick={() => setConfigOpen((v) => !v)}
          data-ocid={`nodes.item.${index + 1}.button`}
          style={{
            width: "100%",
            background: "transparent",
            border: `1px solid rgba(${node.accentRgb}, 0.25)`,
            borderRadius: 10,
            padding: "9px 0",
            color: node.accent,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            transition: "all 250ms ease",
            backdropFilter: "blur(8px)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              `rgba(${node.accentRgb}, 0.1)`;
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              `0 0 16px rgba(${node.accentRgb}, 0.25)`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "transparent";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
          }}
        >
          <Settings size={13} />
          {configOpen ? "Close Config" : "Configure Node"}
          <span
            style={{
              display: "inline-block",
              transform: configOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 300ms cubic-bezier(0.34,1.56,0.64,1)",
              marginLeft: 2,
            }}
          >
            ▾
          </span>
        </button>

        {/* Config panel */}
        <div
          style={{
            maxHeight: configOpen ? 280 : 0,
            opacity: configOpen ? 1 : 0,
            overflow: "hidden",
            transition:
              "max-height 420ms cubic-bezier(0.34,1.56,0.64,1), opacity 300ms ease",
          }}
        >
          <div
            style={{
              marginTop: 16,
              padding: "16px",
              borderRadius: 16,
              background: `rgba(${node.accentRgb},0.05)`,
              border: `1px solid rgba(${node.accentRgb},0.15)`,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: node.accent,
                marginBottom: 12,
                textTransform: "uppercase",
              }}
            >
              Node Configuration
            </div>
            <ConfigToggle
              label="DDoS Protection"
              icon={<Shield size={13} />}
              value={config.ddosProtection}
              accent={node.accent}
              accentRgb={node.accentRgb}
              onChange={(v) => setConfig((c) => ({ ...c, ddosProtection: v }))}
            />
            <ConfigToggle
              label="Auto-Scaling"
              icon={<Activity size={13} />}
              value={config.autoScaling}
              accent={node.accent}
              accentRgb={node.accentRgb}
              onChange={(v) => setConfig((c) => ({ ...c, autoScaling: v }))}
            />
            <ConfigToggle
              label="Firewall Rules"
              icon={<Zap size={13} />}
              value={config.firewallRules}
              accent={node.accent}
              accentRgb={node.accentRgb}
              onChange={(v) => setConfig((c) => ({ ...c, firewallRules: v }))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NodesPage() {
  const [pageVisible, setPageVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setPageVisible(true), 40);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        background: "#020617",
        overflow: "hidden",
      }}
      data-ocid="nodes.page"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');

        @keyframes node-ping {
          0% { opacity: 1; transform: scale(1); }
          70%, 100% { opacity: 0; transform: scale(2.4); }
        }

      `}</style>

      {/* Cinematic background */}
      <div className="cinematic-bg">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
          alt=""
          aria-hidden="true"
          className="cinematic-bg-img"
          style={{ filter: "blur(3px) brightness(0.55) saturate(1.1)" }}
        />
        <div className="cinematic-overlay-lr" />
        <div className="cinematic-vignette" />
        <div className="cinematic-overlay-bottom" />
      </div>

      {/* Same aurora background as main page */}
      <BeamsBackground intensity="strong" />

      {/* Same glow blobs as main page */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <div
          className="glow-blob glow-blob-blue"
          style={{ top: "-10%", left: "-8%" }}
        />
        <div
          className="glow-blob glow-blob-purple"
          style={{ top: "30%", right: "-5%" }}
        />
        <div
          className="glow-blob glow-blob-pink"
          style={{ bottom: "5%", left: "5%" }}
        />
        <div
          className="glow-blob glow-blob-teal"
          style={{ top: "5%", right: "15%" }}
        />
        <div
          className="glow-blob glow-blob-aurora"
          style={{ top: "40%", left: "30%" }}
        />
        <div
          className="glow-blob glow-blob-green"
          style={{ bottom: "30%", right: "20%" }}
        />
      </div>

      {/* Main content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "32px 24px 120px",
          opacity: pageVisible ? 1 : 0,
          transform: pageVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 500ms ease, transform 500ms ease",
        }}
      >
        {/* Back button */}
        <button
          type="button"
          onClick={() => {
            window.location.hash = "#/home";
          }}
          data-ocid="nodes.back.button"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 10,
            padding: "8px 16px",
            color: "rgba(255,255,255,0.7)",
            fontSize: 13,
            cursor: "pointer",
            marginBottom: 40,
            backdropFilter: "blur(12px)",
            transition: "all 200ms ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(255,255,255,0.1)";
            (e.currentTarget as HTMLButtonElement).style.color = "white";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(255,255,255,0.06)";
            (e.currentTarget as HTMLButtonElement).style.color =
              "rgba(255,255,255,0.7)";
          }}
        >
          <ArrowLeft size={14} />
          Back
        </button>

        {/* Page header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "#0ea5e9",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Node Network
          </div>
          <h1
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 900,
              color: "white",
              margin: "0 0 16px",
              textShadow:
                "0 0 60px rgba(14,165,233,0.3), 0 0 120px rgba(168,85,247,0.15)",
              letterSpacing: "-0.01em",
            }}
          >
            Infrastructure
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: 15,
              maxWidth: 480,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Real-time monitoring across all DarkSanta server nodes
          </p>

          {/* Decorative line */}
          <div
            style={{
              width: 120,
              height: 1,
              background:
                "linear-gradient(90deg, transparent, #0ea5e9, #a855f7, transparent)",
              margin: "24px auto 0",
              boxShadow: "0 0 10px rgba(14,165,233,0.4)",
            }}
          />
        </div>

        {/* Node cards grid */}
        <div
          data-ocid="nodes.list"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 24,
          }}
        >
          {NODES.map((node, i) => (
            <NodeCard key={node.id} node={node} index={i} />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
