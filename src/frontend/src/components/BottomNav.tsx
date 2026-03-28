import { Home, Play, Search, User } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const LOGIN_URL =
  "https://promising-white-eki-draft.caffeine.xyz/#caffeineAdminToken=f12ce17017d65b5dd5d901732fb1d643f5031208a4346356ee7e8a9050dc7f80";

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

const NEON_COLORS: Record<string, string> = {
  home: "#00D4FF",
  search: "#00FFA3",
  play: "#FF3CAC",
  profile: "#BF5FFF",
};

interface NavItemDef {
  id: string;
  label: string;
  icon: React.ReactNode;
  bigIcon?: boolean;
  onClick: () => void;
}

interface BottomNavProps {
  isDark?: boolean;
}

export default function BottomNav({ isDark: _isDark }: BottomNavProps) {
  const [activeId, setActiveId] = useState("home");
  const [pressedId, setPressedId] = useState<string | null>(null);
  const [ripplingId, setRipplingId] = useState<string | null>(null);
  const rippleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePress = useCallback((id: string) => {
    setPressedId(id);
  }, []);

  const handleRelease = useCallback(() => {
    setPressedId(null);
  }, []);

  const triggerRipple = useCallback((id: string) => {
    setRipplingId(id);
    if (rippleTimerRef.current) clearTimeout(rippleTimerRef.current);
    rippleTimerRef.current = setTimeout(() => setRipplingId(null), 450);
  }, []);

  useEffect(() => {
    return () => {
      if (rippleTimerRef.current) clearTimeout(rippleTimerRef.current);
    };
  }, []);

  const items: NavItemDef[] = [
    {
      id: "home",
      label: "Home",
      icon: <Home size={22} strokeWidth={1.5} />,
      // Navigate to main website (MainSitePage)
      onClick: () => {
        window.location.hash = "#/home";
      },
    },
    {
      id: "search",
      label: "Search",
      icon: <Search size={22} strokeWidth={1.5} />,
      // Scroll to top of current page (home section)
      onClick: () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        scrollToSection("home");
      },
    },
    {
      id: "play",
      label: "Servers",
      icon: <Play size={30} strokeWidth={1.5} />,
      bigIcon: true,
      onClick: () => {
        window.location.hash = "#/nodes";
      },
    },
    {
      id: "profile",
      label: "Profile",
      icon: <User size={22} strokeWidth={1.5} />,
      onClick: () => {
        window.location.href = LOGIN_URL;
      },
    },
  ];

  const activeColor = NEON_COLORS[activeId] ?? "#00D4FF";

  return (
    <div className="relative" data-ocid="bottom_nav.panel">
      <style>{`
        @keyframes ripple-out {
          0%   { transform: scale(0); opacity: 0.7; }
          100% { transform: scale(2.8); opacity: 0; }
        }
        @keyframes neon-pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 12px var(--pulse-color), 0 0 24px var(--pulse-color); }
          50%       { opacity: 0.6; box-shadow: 0 0 6px var(--pulse-color); }
        }
        .nav-ripple {
          position: absolute;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          pointer-events: none;
          transform: scale(0);
          animation: ripple-out 0.45s ease-out forwards;
        }
        .nav-icon-glow-pulse {
          animation: neon-pulse 2s ease-in-out infinite;
        }
      `}</style>

      {/* Gradient fade above the bar */}
      <div className="fixed bottom-20 left-0 right-0 h-20 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-40" />

      {/* Main bar */}
      <nav
        className="fixed bottom-0 left-0 right-0 w-full z-50 bg-black/70 backdrop-blur-xl border-t border-white/10"
        style={{
          boxShadow:
            "0 -4px 30px rgba(0,0,0,0.5), 0 -1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Neon shimmer top strip */}
        <div
          className="absolute top-0 left-0 right-0"
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, transparent 5%, #00D4FF50 25%, #FF3CAC70 50%, #BF5FFF50 75%, transparent 95%)",
          }}
        />

        {/* Active neon border tint overlay */}
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none transition-all duration-500"
          style={{
            height: "1px",
            background: `linear-gradient(90deg, transparent 10%, ${activeColor}50 50%, transparent 90%)`,
            opacity: 0.8,
          }}
        />

        <div
          className="flex justify-around items-center px-4 h-20"
          style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        >
          {items.map((item) => {
            const isActive = activeId === item.id;
            const isPressed = pressedId === item.id;
            const isRippling = ripplingId === item.id;
            const neon = NEON_COLORS[item.id];

            const iconScale = isPressed ? "scale(0.85)" : "scale(1)";

            return (
              <button
                key={item.id}
                type="button"
                data-ocid={`bottom_nav.${item.id}.button`}
                onClick={() => {
                  setActiveId(item.id);
                  triggerRipple(item.id);
                  item.onClick();
                }}
                onMouseDown={() => handlePress(item.id)}
                onMouseUp={handleRelease}
                onMouseLeave={handleRelease}
                onTouchStart={() => handlePress(item.id)}
                onTouchEnd={handleRelease}
                onTouchCancel={handleRelease}
                className="flex flex-col items-center gap-1 cursor-pointer bg-transparent border-0 outline-none group relative"
                style={{
                  minWidth: item.bigIcon ? 64 : 56,
                  transform: iconScale,
                  transition: "transform 200ms cubic-bezier(0.34,1.56,0.64,1)",
                }}
              >
                {/* Ripple */}
                {isRippling && (
                  <span
                    className="nav-ripple"
                    style={{
                      background: `radial-gradient(circle, ${neon}60 0%, transparent 70%)`,
                      top: "50%",
                      left: "50%",
                      marginTop: "-22px",
                      marginLeft: "-22px",
                    }}
                  />
                )}

                {/* Neon glow background blob when active */}
                {isActive && (
                  <span
                    className={`absolute rounded-full pointer-events-none ${item.bigIcon ? "nav-icon-glow-pulse" : ""}`}
                    style={{
                      width: item.bigIcon ? 56 : 44,
                      height: item.bigIcon ? 56 : 44,
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -62%)",
                      background: `${neon}18`,
                      boxShadow: `0 0 16px ${neon}60, 0 0 32px ${neon}20`,
                      // @ts-ignore
                      "--pulse-color": neon,
                    }}
                  />
                )}

                {/* Icon */}
                <span
                  className="flex items-center justify-center transition-all duration-200 group-hover:scale-110 relative z-10"
                  style={{
                    width: item.bigIcon ? 36 : 26,
                    height: item.bigIcon ? 36 : 26,
                    color: isActive ? neon : "rgba(255,255,255,0.5)",
                    filter: isActive
                      ? `drop-shadow(0 0 8px ${neon}) drop-shadow(0 0 16px ${neon}80)`
                      : "none",
                    transition: "color 250ms ease, filter 250ms ease",
                  }}
                >
                  {item.icon}
                </span>

                {/* Label */}
                <span
                  className="text-xs font-medium leading-none relative z-10 transition-all duration-200"
                  style={{
                    color: isActive ? neon : "rgba(255,255,255,0.45)",
                    textShadow: isActive ? `0 0 8px ${neon}80` : "none",
                  }}
                >
                  {item.label}
                </span>

                {/* Active dot indicator */}
                <span
                  className="rounded-full transition-all duration-300 relative z-10"
                  style={{
                    width: isActive ? 5 : 0,
                    height: isActive ? 5 : 0,
                    background: neon,
                    boxShadow: isActive
                      ? `0 0 8px ${neon}, 0 0 16px ${neon}60`
                      : "none",
                    overflow: "hidden",
                  }}
                />
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
