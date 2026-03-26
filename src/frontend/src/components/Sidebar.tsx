import {
  BarChart2,
  Bell,
  Compass,
  HelpCircle,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageCircle,
  Settings,
  User,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

const MENU_ITEMS = [
  { icon: Home, label: "Home", color: "#22e6ff" },
  { icon: Compass, label: "Explore", color: "#2a79ff" },
  { icon: LayoutDashboard, label: "Dashboard", color: "#b14cff" },
  { icon: BarChart2, label: "Analytics", color: "#22e6ff" },
  { icon: MessageCircle, label: "Messages", color: "#2a79ff" },
  { icon: Bell, label: "Notifications", color: "#b14cff" },
  { icon: Settings, label: "Settings", color: "#22e6ff" },
  { icon: User, label: "Profile", color: "#2a79ff" },
  { icon: HelpCircle, label: "Help", color: "#b14cff" },
  { icon: LogOut, label: "Logout", color: "#ff4c6a" },
];

interface SidebarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export default function Sidebar({ isDark, onToggleTheme }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Floating trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        data-ocid="sidebar.open_modal_button"
        className="sidebar-trigger"
        style={{
          position: "fixed",
          left: "16px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 9999,
          width: "48px",
          height: "48px",
          borderRadius: "999px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: isDark
            ? "rgba(255,255,255,0.06)"
            : "rgba(255,255,255,0.06)",
          backdropFilter: "blur(30px) saturate(200%)",
          WebkitBackdropFilter: "blur(30px) saturate(200%)",
          border: "1px solid rgba(34,230,255,0.38)",
          boxShadow:
            "0 0 24px rgba(34,230,255,0.3), 0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
          cursor: "pointer",
          transition:
            "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease",
          color: isDark ? "#f4f7ff" : "#e8edf8",
        }}
      >
        <span
          style={{
            display: "flex",
            transition:
              "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease",
            transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
          }}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </span>
      </button>

      {/* Backdrop */}
      <div
        role="button"
        tabIndex={-1}
        onClick={() => setIsOpen(false)}
        onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9000,
          background: "rgba(0,0,0,0.65)",
          backdropFilter: isOpen ? "blur(6px)" : "blur(0px)",
          WebkitBackdropFilter: isOpen ? "blur(6px)" : "blur(0px)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.35s ease, backdrop-filter 0.35s ease",
        }}
      />

      {/* Sidebar Panel */}
      <aside
        data-ocid="sidebar.panel"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          width: "310px",
          zIndex: 9100,
          display: "flex",
          flexDirection: "column",
          background: isDark ? "rgba(6, 8, 20, 0.08)" : "rgba(28, 36, 70, 0.1)",
          backdropFilter: "blur(80px) saturate(220%)",
          WebkitBackdropFilter: "blur(80px) saturate(220%)",
          borderRight: isDark
            ? "1px solid rgba(139,92,246,0.2)"
            : "1px solid rgba(255,255,255,0.12)",
          boxShadow: isDark
            ? "4px 0 80px rgba(0,0,0,0.7), inset -1px 0 0 rgba(139,92,246,0.1), 0 0 40px rgba(139,92,246,0.06)"
            : "4px 0 40px rgba(0,0,0,0.4), inset -1px 0 0 rgba(255,255,255,0.07)",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.42s cubic-bezier(0.34,1.56,0.64,1)",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {/* Inner reflection */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "200px",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Sidebar Header */}
        <div
          style={{
            padding: "28px 24px 20px",
            borderBottom: isDark
              ? "1px solid rgba(255,255,255,0.08)"
              : "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #22E6FF, #2A79FF)",
                boxShadow: "0 0 24px rgba(34,230,255,0.55)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Zap
                className="w-5 h-5"
                style={{ color: "#060713" }}
                fill="currentColor"
              />
            </div>
            <div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: "16px",
                  letterSpacing: "-0.3px",
                  color: isDark ? "#f4f7ff" : "#e8edf8",
                  textShadow: isDark
                    ? "0 0 24px rgba(34,230,255,0.45)"
                    : "none",
                }}
              >
                DarkSanta
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: isDark
                    ? "rgba(185,195,218,0.6)"
                    : "rgba(185,195,218,0.5)",
                  marginTop: "1px",
                }}
              >
                v2.0 · Liquid Interface
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav
          style={{
            flex: 1,
            padding: "16px 12px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {MENU_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeItem === item.label;
            const isLogout = item.label === "Logout";
            const isDashboardItem = item.label === "Dashboard";
            return (
              <button
                key={item.label}
                type="button"
                data-ocid={`sidebar.${item.label.toLowerCase()}.link`}
                onClick={() => {
                  if (!isLogout) setActiveItem(item.label);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "11px 14px",
                  borderRadius: "14px",
                  border: "none",
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "left",
                  transition: "all 0.25s ease",
                  background: isActive
                    ? isDark
                      ? `${item.color}18`
                      : "rgba(34,230,255,0.15)"
                    : isDashboardItem
                      ? "rgba(177,76,255,0.1)"
                      : "transparent",
                  color: isLogout
                    ? "#ff4c6a"
                    : isActive
                      ? isDark
                        ? "#f4f7ff"
                        : "#0a0a1a"
                      : isDark
                        ? "rgba(185,195,218,0.85)"
                        : "rgba(185,195,218,0.85)",
                  borderLeft: isActive
                    ? `3px solid ${item.color}`
                    : isDashboardItem
                      ? "3px solid rgba(177,76,255,0.5)"
                      : "3px solid transparent",
                  boxShadow: isActive
                    ? `0 0 24px ${item.color}30, inset 0 1px 0 rgba(255,255,255,0.06)`
                    : isDashboardItem
                      ? "0 0 20px rgba(177,76,255,0.25), inset 0 1px 0 rgba(255,255,255,0.04)"
                      : "none",
                  opacity: mounted ? 1 : 0,
                  transform:
                    mounted && isOpen ? "translateX(0)" : "translateX(-20px)",
                  transitionDelay: `${idx * 45}ms`,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.background = isDark
                      ? `${item.color}10`
                      : `${item.color}10`;
                    el.style.borderLeftColor = item.color;
                    el.style.boxShadow = `0 0 20px ${item.color}22`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.background = isDashboardItem
                      ? "rgba(177,76,255,0.1)"
                      : "transparent";
                    el.style.borderLeftColor = isDashboardItem
                      ? "rgba(177,76,255,0.5)"
                      : "transparent";
                    el.style.boxShadow = isDashboardItem
                      ? "0 0 20px rgba(177,76,255,0.25), inset 0 1px 0 rgba(255,255,255,0.04)"
                      : "none";
                  }
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: isActive
                      ? `${item.color}22`
                      : isDashboardItem
                        ? "rgba(177,76,255,0.18)"
                        : isDark
                          ? "rgba(255,255,255,0.06)"
                          : "rgba(255,255,255,0.06)",
                    border: isActive
                      ? `1px solid ${item.color}55`
                      : isDashboardItem
                        ? "1px solid rgba(177,76,255,0.45)"
                        : "1px solid transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "all 0.25s ease",
                    boxShadow: isActive
                      ? `0 0 16px ${item.color}40`
                      : isDashboardItem
                        ? "0 0 20px rgba(177,76,255,0.4)"
                        : "none",
                  }}
                >
                  <Icon
                    className="w-4 h-4"
                    style={{
                      color: isActive
                        ? item.color
                        : isDashboardItem
                          ? "#b14cff"
                          : isLogout
                            ? "#ff4c6a"
                            : isDark
                              ? "rgba(185,195,218,0.7)"
                              : "rgba(185,195,218,0.6)",
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: isDashboardItem ? 700 : isActive ? 600 : 500,
                  }}
                >
                  {item.label}
                </span>
                {isDashboardItem && (
                  <span
                    style={{
                      marginLeft: "auto",
                      background: "linear-gradient(135deg,#b14cff,#2a79ff)",
                      color: "#fff",
                      fontSize: "9px",
                      fontWeight: 700,
                      borderRadius: "999px",
                      padding: "2px 7px",
                      boxShadow: "0 0 10px rgba(177,76,255,0.5)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    MAIN
                  </span>
                )}
                {item.label === "Notifications" && (
                  <span
                    style={{
                      marginLeft: "auto",
                      background: "linear-gradient(135deg,#22e6ff,#2a79ff)",
                      color: "#060713",
                      fontSize: "10px",
                      fontWeight: 700,
                      borderRadius: "999px",
                      padding: "1px 7px",
                      boxShadow: "0 0 12px rgba(34,230,255,0.5)",
                    }}
                  >
                    3
                  </span>
                )}
                {item.label === "Messages" && (
                  <span
                    style={{
                      marginLeft: "auto",
                      background: "#b14cff",
                      color: "#fff",
                      fontSize: "10px",
                      fontWeight: 700,
                      borderRadius: "999px",
                      padding: "1px 7px",
                      boxShadow: "0 0 12px rgba(177,76,255,0.5)",
                    }}
                  >
                    7
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Theme Toggle at bottom */}
        <div
          style={{
            padding: "20px 24px 28px",
            borderTop: isDark
              ? "1px solid rgba(255,255,255,0.08)"
              : "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: isDark ? "rgba(185,195,218,0.5)" : "rgba(185,195,218,0.5)",
              marginBottom: "12px",
            }}
          >
            Theme
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              type="button"
              data-ocid="sidebar.theme.toggle"
              onClick={onToggleTheme}
              aria-label={
                isDark ? "Switch to light mode" : "Switch to dark mode"
              }
              style={{
                position: "relative",
                width: "72px",
                height: "36px",
                borderRadius: "999px",
                border: isDark
                  ? "1px solid rgba(255,255,255,0.15)"
                  : "1px solid rgba(0,0,0,0.15)",
                background: isDark
                  ? "rgba(14,18,35,0.7)"
                  : "rgba(255,220,80,0.25)",
                cursor: "pointer",
                transition:
                  "background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
                boxShadow: isDark
                  ? "inset 0 2px 6px rgba(0,0,0,0.4)"
                  : "inset 0 2px 6px rgba(0,0,0,0.1), 0 0 16px rgba(255,200,50,0.3)",
                padding: 0,
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isDark ? "flex-end" : "flex-start",
                  padding: "0 10px",
                  fontSize: "12px",
                  opacity: 0.5,
                  pointerEvents: "none",
                  transition: "all 0.4s ease",
                }}
              >
                {isDark ? "🌙" : "☀️"}
              </span>
              <span
                style={{
                  position: "absolute",
                  top: "4px",
                  left: isDark ? "38px" : "4px",
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: isDark
                    ? "linear-gradient(135deg,#1a1e3a,#2a2e50)"
                    : "linear-gradient(135deg,#ffe066,#ffb800)",
                  boxShadow: isDark
                    ? "0 2px 8px rgba(0,0,0,0.5), 0 0 12px rgba(100,120,255,0.2)"
                    : "0 2px 8px rgba(0,0,0,0.2), 0 0 16px rgba(255,200,50,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  transition:
                    "left 0.42s cubic-bezier(0.34,1.56,0.64,1), background 0.4s ease, box-shadow 0.4s ease",
                  zIndex: 1,
                  lineHeight: 1,
                }}
              >
                {isDark ? "🌙" : "☀️"}
              </span>
            </button>
            <span
              style={{
                fontSize: "13px",
                fontWeight: 500,
                color: isDark
                  ? "rgba(185,195,218,0.75)"
                  : "rgba(10,10,30,0.65)",
                transition: "color 0.3s ease",
              }}
            >
              {isDark ? "Dark Mode" : "Light Mode"}
            </span>
          </div>
        </div>
      </aside>

      <style>{`
        .sidebar-trigger:hover {
          box-shadow: 0 0 36px rgba(34,230,255,0.55), 0 6px 20px rgba(0,0,0,0.4) !important;
          transform: translateY(-50%) scale(1.1) !important;
        }
        .sidebar-trigger:active {
          transform: translateY(-50%) scale(0.93) !important;
        }
        @keyframes sidebar-pulse {
          0%, 100% { box-shadow: 0 0 24px rgba(34,230,255,0.3), 0 4px 16px rgba(0,0,0,0.3); }
          50% { box-shadow: 0 0 40px rgba(34,230,255,0.6), 0 4px 16px rgba(0,0,0,0.3); }
        }
        .sidebar-trigger {
          animation: sidebar-pulse 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
