import { Home, Play, Search, User } from "lucide-react";
import { useState } from "react";

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

  const items: NavItemDef[] = [
    {
      id: "home",
      label: "Home",
      icon: <Home />,
      onClick: () => scrollToSection("home"),
    },
    {
      id: "search",
      label: "Search",
      icon: <Search />,
      onClick: () => scrollToSection("plans"),
    },
    {
      id: "play",
      label: "Servers",
      icon: <Play />,
      bigIcon: true,
      onClick: () => {
        window.location.hash = "#/nodes";
      },
    },
    {
      id: "profile",
      label: "Profile",
      icon: <User />,
      onClick: () => {
        window.location.href = LOGIN_URL;
      },
    },
  ];

  return (
    <div className="relative" data-ocid="bottom_nav.panel">
      {/* Gradient fade above the bar */}
      <div className="fixed bottom-16 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-40" />

      {/* Main bar */}
      <nav
        className="fixed bottom-0 left-0 right-0 w-full z-50 bg-black/60 backdrop-blur-lg border-t border-white/10"
        style={{
          boxShadow: "0 -4px 20px rgba(0,0,0,0.4)",
        }}
      >
        <div
          className="flex justify-around items-center px-4 h-16"
          style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        >
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                data-ocid={`bottom_nav.${item.id}.button`}
                onClick={() => {
                  setActiveId(item.id);
                  item.onClick();
                }}
                className="flex flex-col items-center gap-1 transition-all duration-200 hover:scale-105 cursor-pointer bg-transparent border-0 outline-none"
                style={{
                  color: isActive
                    ? "rgba(255,255,255,1)"
                    : "rgba(255,255,255,0.5)",
                  minWidth: 56,
                }}
              >
                {/* Icon */}
                <span
                  className="flex items-center justify-center transition-all duration-200"
                  style={{
                    width: item.bigIcon ? 28 : 20,
                    height: item.bigIcon ? 28 : 20,
                    filter: isActive
                      ? "drop-shadow(0 0 6px rgba(255,255,255,0.6))"
                      : "none",
                  }}
                >
                  {item.icon}
                </span>

                {/* Label */}
                <span className="text-xs font-medium leading-none">
                  {item.label}
                </span>

                {/* Active dot indicator */}
                <span
                  className="rounded-full transition-all duration-200"
                  style={{
                    width: isActive ? 4 : 0,
                    height: isActive ? 4 : 0,
                    background: "rgba(255,255,255,0.9)",
                    boxShadow: isActive
                      ? "0 0 6px rgba(255,255,255,0.8)"
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
