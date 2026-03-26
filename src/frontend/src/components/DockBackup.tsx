// BACKUP of original Dock.tsx — created before liquid-glass integration
import { Activity, Server, ShoppingCart } from "lucide-react";
import { useState } from "react";
import DiscordPopup from "./DiscordPopup";

interface DockProps {
  isDark: boolean;
}

const DOCK_ITEMS = [
  {
    id: "buy",
    icon: ShoppingCart,
    label: "Buy Now",
    sublabel: "Instant deploy",
    color: "#FF2D55",
    glow: "rgba(255,45,85,0.45)",
    glowHover: "rgba(255,45,85,0.65)",
  },
  {
    id: "nodes",
    icon: Activity,
    label: "180+ Nodes",
    sublabel: "Global network",
    color: "#34D399",
    glow: "rgba(52,211,153,0.45)",
    glowHover: "rgba(52,211,153,0.65)",
  },
  {
    id: "servers",
    icon: Server,
    label: "Bare Metal",
    sublabel: "Full root access",
    color: "#2A79FF",
    glow: "rgba(42,121,255,0.45)",
    glowHover: "rgba(42,121,255,0.65)",
  },
];

export default function DockBackup({ isDark }: DockProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [pressedId, setPressedId] = useState<string | null>(null);
  const [showDiscord, setShowDiscord] = useState(false);

  const dockBg = isDark ? "rgba(8,10,22,0.70)" : "rgba(255,255,255,0.58)";
  const dockFilter = isDark
    ? "blur(48px) saturate(220%) brightness(0.82)"
    : "blur(48px) saturate(200%) brightness(1.06)";
  const dockBorder = isDark
    ? "1px solid rgba(255,255,255,0.10)"
    : "1px solid rgba(255,255,255,0.78)";
  const dockShadow = isDark
    ? "0 32px 80px rgba(0,0,0,0.65), 0 8px 24px rgba(0,0,0,0.5), inset 0 1.5px 0 rgba(255,255,255,0.18), inset 0 -1.5px 0 rgba(0,0,0,0.35), inset 1px 0 0 rgba(255,255,255,0.06)"
    : "0 24px 64px rgba(100,120,200,0.18), inset 0 1.5px 0 rgba(255,255,255,0.95)";

  return (
    <>
      <style>{`
        @keyframes dock-breathe {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        @keyframes tooltip-in {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes dot-pulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
      `}</style>

      <div
        data-ocid="dock.panel"
        style={{
          position: "fixed",
          bottom: 24,
          left: 24,
          zIndex: 40,
          animation: "dock-breathe 4s ease-in-out infinite",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            padding: "12px 10px",
            borderRadius: 28,
            background: dockBg,
            backdropFilter: dockFilter,
            WebkitBackdropFilter: dockFilter,
            border: dockBorder,
            boxShadow: dockShadow,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 28,
              pointerEvents: "none",
              background:
                "linear-gradient(160deg, rgba(255,255,255,0.09) 0%, rgba(255,45,85,0.04) 40%, rgba(42,121,255,0.05) 70%, transparent 100%)",
            }}
          />
          {DOCK_ITEMS.map((item, idx) => {
            const isHovered = hoveredId === item.id;
            const isPressed = pressedId === item.id;
            const isBuyItem = item.id === "buy";
            const Icon = item.icon;
            return (
              <div key={item.id} style={{ position: "relative", zIndex: 1 }}>
                {idx > 0 && (
                  <div
                    style={{
                      height: 1,
                      width: 32,
                      margin: "0 auto 4px",
                      background:
                        "linear-gradient(90deg, rgba(255,45,85,0.15), rgba(255,255,255,0.07), transparent)",
                    }}
                  />
                )}
                <button
                  type="button"
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => {
                    setHoveredId(null);
                    setPressedId(null);
                  }}
                  onMouseDown={() => setPressedId(item.id)}
                  onMouseUp={() => setPressedId(null)}
                  onClick={() => {
                    if (isBuyItem) setShowDiscord((v) => !v);
                  }}
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 16,
                    border: isHovered
                      ? `1px solid ${item.color}55`
                      : "1px solid transparent",
                    background: isHovered
                      ? "rgba(255,255,255,0.12)"
                      : "rgba(255,255,255,0.05)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transform: isPressed
                      ? "scale(0.92)"
                      : isHovered
                        ? "scale(1.12)"
                        : "scale(1)",
                    boxShadow: isHovered
                      ? `0 0 20px ${item.glow}, 0 4px 16px rgba(0,0,0,0.3)`
                      : "none",
                    transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
                    position: "relative",
                  }}
                >
                  {isHovered && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: 15,
                        background: `radial-gradient(circle at 40% 30%, ${item.color}22, transparent 70%)`,
                        pointerEvents: "none",
                      }}
                    />
                  )}
                  <Icon
                    style={{
                      width: 22,
                      height: 22,
                      color: item.color,
                      filter: isHovered
                        ? `drop-shadow(0 0 6px ${item.glow})`
                        : "none",
                      transition: "all 0.2s ease",
                    }}
                  />
                </button>
                {isHovered && (
                  <div
                    style={{
                      position: "absolute",
                      left: 68,
                      top: "50%",
                      transform: "translateY(-50%)",
                      whiteSpace: "nowrap",
                      animation: "tooltip-in 200ms ease forwards",
                      zIndex: 100,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "stretch",
                        background: "rgba(8,10,22,0.88)",
                        backdropFilter: "blur(20px) saturate(180%)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: 12,
                        overflow: "hidden",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                      }}
                    >
                      <div
                        style={{
                          width: 2,
                          background: `linear-gradient(180deg, ${item.color}, ${item.color}66)`,
                          flexShrink: 0,
                        }}
                      />
                      <div style={{ padding: "8px 12px" }}>
                        <div
                          style={{
                            color: "#FFFFFF",
                            fontWeight: 700,
                            fontSize: 13,
                          }}
                        >
                          {item.label}
                        </div>
                        <div
                          style={{
                            color: "rgba(180,190,220,0.8)",
                            fontSize: 11,
                            marginTop: 2,
                          }}
                        >
                          {item.sublabel}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {showDiscord && (
          <div
            style={{
              position: "absolute",
              bottom: "100%",
              left: 0,
              marginBottom: 12,
            }}
          >
            <DiscordPopup onClose={() => setShowDiscord(false)} />
          </div>
        )}
      </div>
    </>
  );
}
