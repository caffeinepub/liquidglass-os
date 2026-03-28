import { Info, LayoutDashboard, Play, Plus, Server } from "lucide-react";
import { useState } from "react";

const DOCK_BUTTONS = [
  { icon: Play, label: "Play", id: "play" },
  { icon: Plus, label: "Add", id: "add" },
  { icon: Info, label: "Info", id: "info" },
  { icon: Server, label: "Servers", id: "servers" },
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
];

export default function RightDock() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClick = (index: number, label: string) => {
    setActiveIndex(index);
    setTimeout(() => setActiveIndex(null), 400);
    if (label === "Servers") {
      window.location.hash = "#/nodes";
    }
  };

  return (
    <>
      <style>{`
        @keyframes dockSlideIn {
          from { opacity: 0; transform: translateX(80px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes dockFloat {
          0%, 100% { margin-top: 0px; }
          50%       { margin-top: -8px; }
        }
        @keyframes shineSweep {
          0%   { left: -150%; }
          100% { left: 200%; }
        }
        @keyframes tooltipFadeIn {
          from { opacity: 0; transform: translateY(-50%) translateX(6px); }
          to   { opacity: 1; transform: translateY(-50%) translateX(0); }
        }
      `}</style>

      {/* Fixed outer wrapper — handles positioning */}
      <div
        style={{
          position: "fixed",
          right: 20,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 9990,
          animation: "dockSlideIn 0.7s cubic-bezier(0.34,1.56,0.64,1) both",
        }}
      >
        {/* Float wrapper — only handles vertical bob */}
        <div
          style={{
            animation: "dockFloat 4s ease-in-out infinite",
          }}
        >
          {/* Pill container */}
          <div
            style={{
              borderRadius: 9999,
              background: "rgba(0,0,0,0.30)",
              backdropFilter: "blur(40px) saturate(200%)",
              WebkitBackdropFilter: "blur(40px) saturate(200%)",
              border: "1px solid rgba(255,255,255,0.10)",
              boxShadow:
                "0 0 40px rgba(99,102,241,0.30), 0 0 80px rgba(168,85,247,0.15), 0 20px 60px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.08)",
              padding: "12px 10px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              alignItems: "center",
            }}
          >
            {DOCK_BUTTONS.map((btn, index) => {
              const Icon = btn.icon;
              const isHovered = hoveredIndex === index;
              const isActive = activeIndex === index;

              return (
                <div
                  key={btn.id}
                  style={{ position: "relative" }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Tooltip */}
                  {isHovered && (
                    <div
                      style={{
                        position: "absolute",
                        right: "calc(100% + 12px)",
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                        animation: "tooltipFadeIn 0.2s ease both",
                        whiteSpace: "nowrap",
                        background: "rgba(0,0,0,0.75)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: 8,
                        padding: "4px 10px",
                        fontSize: 11,
                        color: "white",
                        fontWeight: 500,
                        letterSpacing: "0.04em",
                        zIndex: 10,
                      }}
                    >
                      {btn.label}
                    </div>
                  )}

                  {/* Button */}
                  <button
                    type="button"
                    data-ocid={`dock.${btn.id}.button`}
                    aria-label={btn.label}
                    onClick={() => handleClick(index, btn.label)}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 9999,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      overflow: "hidden",
                      cursor: "pointer",
                      border: isHovered
                        ? "1px solid rgba(168,85,247,0.5)"
                        : "1px solid rgba(255,255,255,0.15)",
                      background: isHovered
                        ? "rgba(255,255,255,0.15)"
                        : isActive
                          ? "rgba(255,255,255,0.22)"
                          : "rgba(255,255,255,0.08)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      boxShadow: isActive
                        ? "inset 0 1px 0 rgba(255,255,255,0.35), 0 0 28px rgba(99,102,241,0.95), 0 0 50px rgba(168,85,247,0.6)"
                        : isHovered
                          ? "inset 0 1px 0 rgba(255,255,255,0.30), 0 0 20px rgba(99,102,241,0.70), 0 0 40px rgba(168,85,247,0.40)"
                          : "inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.20), 0 0 0 rgba(99,102,241,0)",
                      outline: isActive
                        ? "2px solid rgba(168,85,247,0.7)"
                        : "none",
                      color: "rgba(255,255,255,0.85)",
                      transform: isActive
                        ? "scale(0.95)"
                        : isHovered
                          ? "scale(1.12)"
                          : "scale(1)",
                      transition: "all 350ms cubic-bezier(0.34,1.56,0.64,1)",
                    }}
                  >
                    {/* Top gradient highlight overlay */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "60%",
                        background:
                          "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 100%)",
                        borderRadius: "9999px 9999px 0 0",
                        pointerEvents: "none",
                      }}
                    />

                    {/* Shine sweep on hover */}
                    {isHovered && (
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          width: "40%",
                          height: "100%",
                          background:
                            "linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.28) 50%, transparent 100%)",
                          animation: "shineSweep 0.65s ease both",
                          pointerEvents: "none",
                        }}
                      />
                    )}

                    <Icon
                      size={18}
                      style={{ position: "relative", zIndex: 2 }}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
