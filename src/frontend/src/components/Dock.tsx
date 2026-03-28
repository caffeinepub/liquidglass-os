import { useState } from "react";
import DiscordPopup from "./DiscordPopup";
import { GlassEffect, GlassFilter } from "./ui/liquid-glass";

interface DockProps {
  isDark: boolean;
  onScrollTo?: (section: string) => void;
}

// Icon SVG data URIs (colored circles with lucide-style paths)
const ICON_DISCORD = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='32' fill='%235865F2'/%3E%3Cpath d='M43.5 20.5a28.3 28.3 0 0 0-7-2.2 19.7 19.7 0 0 0-.9 1.8 26.2 26.2 0 0 0-7.9 0 19.7 19.7 0 0 0-.9-1.8 28.2 28.2 0 0 0-7 2.2C16.4 28.4 15 36.1 15.7 43.7a28.5 28.5 0 0 0 8.7 4.4 21.3 21.3 0 0 0 1.8-3 18.5 18.5 0 0 1-2.9-1.4l.7-.5a20.3 20.3 0 0 0 17.4 0l.7.5a18.5 18.5 0 0 1-2.9 1.4 21.3 21.3 0 0 0 1.8 3 28.4 28.4 0 0 0 8.7-4.4c.8-8.7-1.5-16.3-6.2-23.2ZM25.5 39.2c-1.7 0-3.2-1.6-3.2-3.6s1.4-3.6 3.2-3.6 3.2 1.6 3.2 3.6-1.4 3.6-3.2 3.6Zm13 0c-1.7 0-3.2-1.6-3.2-3.6s1.4-3.6 3.2-3.6 3.2 1.6 3.2 3.6-1.4 3.6-3.2 3.6Z' fill='white'/%3E%3C/svg%3E`;

const ICON_HOME = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='32' fill='%232A79FF'/%3E%3Cpath d='M32 16 16 30h5v18h12V36h6v12h8V30h5Z' fill='white'/%3E%3C/svg%3E`;

const ICON_DASHBOARD = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='32' fill='%239B3FFF'/%3E%3Crect x='14' y='14' width='14' height='14' rx='3' fill='white'/%3E%3Crect x='36' y='14' width='14' height='14' rx='3' fill='white'/%3E%3Crect x='14' y='36' width='14' height='14' rx='3' fill='white'/%3E%3Crect x='36' y='36' width='14' height='14' rx='3' fill='white'/%3E%3C/svg%3E`;

const ICON_SERVER = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='32' fill='%2334D399'/%3E%3Crect x='14' y='18' width='36' height='10' rx='3' fill='white'/%3E%3Crect x='14' y='32' width='36' height='10' rx='3' fill='white'/%3E%3Ccircle cx='44' cy='23' r='2' fill='%2334D399'/%3E%3Ccircle cx='44' cy='37' r='2' fill='%2334D399'/%3E%3C/svg%3E`;

const ICON_NODES = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='32' fill='%23FF9500'/%3E%3Ccircle cx='32' cy='20' r='5' fill='white'/%3E%3Ccircle cx='20' cy='40' r='5' fill='white'/%3E%3Ccircle cx='44' cy='40' r='5' fill='white'/%3E%3Cline x1='32' y1='25' x2='20' y2='35' stroke='white' stroke-width='2'/%3E%3Cline x1='32' y1='25' x2='44' y2='35' stroke='white' stroke-width='2'/%3E%3C/svg%3E`;

const ICON_BUY = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='32' fill='%23FF2D55'/%3E%3Cpath d='M18 18h4l5 22h18l3-14H25' stroke='white' stroke-width='3' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3Ccircle cx='29' cy='46' r='3' fill='white'/%3E%3Ccircle cx='42' cy='46' r='3' fill='white'/%3E%3C/svg%3E`;

const DOCK_ITEMS = [
  {
    id: "discord",
    src: ICON_DISCORD,
    label: "Discord",
    sublabel: "Join our server",
    color: "#5865F2",
    glow: "rgba(88,101,242,0.5)",
    action: "discord",
  },
  {
    id: "home",
    src: ICON_HOME,
    label: "Home",
    sublabel: "Back to top",
    color: "#2A79FF",
    glow: "rgba(42,121,255,0.5)",
    action: "home",
  },
  {
    id: "dashboard",
    src: ICON_DASHBOARD,
    label: "Dashboard",
    sublabel: "Control panel",
    color: "#9B3FFF",
    glow: "rgba(155,63,255,0.5)",
    action: "dashboard",
  },
  {
    id: "servers",
    src: ICON_SERVER,
    label: "Servers",
    sublabel: "Bare metal",
    color: "#34D399",
    glow: "rgba(52,211,153,0.5)",
    action: "servers",
  },
  {
    id: "nodes",
    src: ICON_NODES,
    label: "180+ Nodes",
    sublabel: "Global network",
    color: "#FF9500",
    glow: "rgba(255,149,0,0.5)",
    action: "nodes",
  },
  {
    id: "buy",
    src: ICON_BUY,
    label: "Buy Now",
    sublabel: "Instant deploy",
    color: "#FF2D55",
    glow: "rgba(255,45,85,0.5)",
    action: "buy",
  },
];

export default function Dock({ isDark, onScrollTo }: DockProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [pressedId, setPressedId] = useState<string | null>(null);
  const [showDiscord, setShowDiscord] = useState(false);

  const handleClick = (action: string) => {
    if (action === "discord" || action === "buy") {
      setShowDiscord((v) => !v);
    } else if (onScrollTo) {
      onScrollTo(action);
    } else {
      const el = document.getElementById(action);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <GlassFilter />
      <style>{`
        @keyframes dock-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes dock-enter {
          from { opacity: 0; transform: translateY(40px) scale(0.9); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes icon-enter {
          from { opacity: 0; transform: scale(0.6) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes tooltip-slide {
          from { opacity: 0; transform: translateY(-50%) translateX(-8px); }
          to   { opacity: 1; transform: translateY(-50%) translateX(0); }
        }
        .dock-icon-0 { animation: icon-enter 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.05s both; }
        .dock-icon-1 { animation: icon-enter 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.1s both; }
        .dock-icon-2 { animation: icon-enter 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.15s both; }
        .dock-icon-3 { animation: icon-enter 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.2s both; }
        .dock-icon-4 { animation: icon-enter 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.25s both; }
        .dock-icon-5 { animation: icon-enter 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.3s both; }
      `}</style>

      <div
        data-ocid="dock.panel"
        style={{
          position: "fixed",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 40,
          animation:
            "dock-enter 0.7s cubic-bezier(0.34,1.56,0.64,1) both, dock-float 5s ease-in-out 0.7s infinite",
        }}
      >
        <GlassEffect
          className="rounded-3xl"
          style={{
            background: isDark
              ? "rgba(4, 6, 22, 0.58)"
              : "rgba(255,255,255,0.52)",
            backdropFilter: isDark
              ? "blur(50px) saturate(260%) brightness(0.82)"
              : "blur(50px) saturate(200%) brightness(1.08)",
            WebkitBackdropFilter: isDark
              ? "blur(50px) saturate(260%) brightness(0.82)"
              : "blur(50px) saturate(200%) brightness(1.08)",
            border: isDark
              ? "1px solid rgba(255,255,255,0.12)"
              : "1px solid rgba(255,255,255,0.82)",
            boxShadow: isDark
              ? "0 12px 48px rgba(0,0,0,0.65), 0 0 60px rgba(34,211,238,0.12), 0 0 100px rgba(42,121,255,0.08), inset 0 1.5px 0 rgba(255,255,255,0.18), inset 0 -1.5px 0 rgba(0,0,0,0.22)"
              : "0 24px 64px rgba(100,120,200,0.2), inset 0 1.5px 0 rgba(255,255,255,0.95)",
            padding: "10px 16px",
            transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.2)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            {DOCK_ITEMS.map((item, idx) => {
              const isHovered = hoveredId === item.id;
              const isPressed = pressedId === item.id;

              return (
                <div
                  key={item.id}
                  className={`dock-icon-${idx}`}
                  style={{ position: "relative" }}
                >
                  <button
                    type="button"
                    data-ocid={`dock.${item.id}`}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => {
                      setHoveredId(null);
                      setPressedId(null);
                    }}
                    onMouseDown={() => setPressedId(item.id)}
                    onMouseUp={() => setPressedId(null)}
                    onClick={() => handleClick(item.action)}
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 18,
                      border: "none",
                      background: "transparent",
                      padding: 0,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transform: isPressed
                        ? "scale(0.88) translateY(2px)"
                        : isHovered
                          ? "scale(1.25) translateY(-6px)"
                          : "scale(1) translateY(0)",
                      filter: isHovered
                        ? `drop-shadow(0 0 12px ${item.glow}) drop-shadow(0 4px 16px rgba(0,0,0,0.4))`
                        : "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                      transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                    }}
                  >
                    <img
                      src={item.src}
                      alt={item.label}
                      style={{ width: 52, height: 52, borderRadius: 16 }}
                    />
                  </button>

                  {/* Hover tooltip — above icon */}
                  {isHovered && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: "calc(100% + 12px)",
                        left: "50%",
                        transform: "translateX(-50%)",
                        whiteSpace: "nowrap",
                        animation: "tooltip-slide 180ms ease forwards",
                        zIndex: 100,
                        pointerEvents: "none",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          bottom: -4,
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: 0,
                          height: 0,
                          borderLeft: "5px solid transparent",
                          borderRight: "5px solid transparent",
                          borderTop: "5px solid rgba(8,10,22,0.9)",
                        }}
                      />
                      <div
                        style={{
                          background: "rgba(8,10,22,0.9)",
                          backdropFilter: "blur(20px) saturate(180%)",
                          WebkitBackdropFilter: "blur(20px) saturate(180%)",
                          border: `1px solid ${item.color}44`,
                          borderRadius: 10,
                          overflow: "hidden",
                          boxShadow: `0 8px 24px rgba(0,0,0,0.5), 0 0 16px ${item.glow}`,
                        }}
                      >
                        <div
                          style={{
                            height: 2,
                            background: `linear-gradient(90deg, ${item.color}, ${item.color}66)`,
                          }}
                        />
                        <div style={{ padding: "6px 12px" }}>
                          <div
                            style={{
                              color: "#FFFFFF",
                              fontWeight: 700,
                              fontSize: 13,
                              lineHeight: 1.2,
                            }}
                          >
                            {item.label}
                          </div>
                          <div
                            style={{
                              color: "rgba(180,190,220,0.75)",
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
        </GlassEffect>

        {showDiscord && (
          <div
            style={{
              position: "absolute",
              bottom: "calc(100% + 16px)",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <DiscordPopup onClose={() => setShowDiscord(false)} />
          </div>
        )}
      </div>
    </>
  );
}
