import { Home, Play, Search, User } from "lucide-react";
import { useState } from "react";
import { LimelightNav } from "./ui/limelight-nav";
import type { NavItem } from "./ui/limelight-nav";

function getDefaultIndex(): number {
  const hash = window.location.hash;
  if (hash.includes("#/nodes")) return 2;
  return 0;
}

interface BottomNavProps {
  isDark?: boolean;
}

export default function BottomNav({ isDark: _isDark }: BottomNavProps) {
  const [activeIndex, setActiveIndex] = useState(getDefaultIndex);

  const items: NavItem[] = [
    {
      id: "home",
      label: "Home",
      icon: <Home size={22} strokeWidth={1.5} />,
      onClick: () => {
        window.location.hash = "#/home";
      },
    },
    {
      id: "search",
      label: "Search",
      icon: <Search size={22} strokeWidth={1.5} />,
      onClick: () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
    },
    {
      id: "play",
      label: "Servers",
      icon: <Play size={26} strokeWidth={1.5} />,
      onClick: () => {
        window.location.hash = "#/nodes";
      },
    },
    {
      id: "profile",
      label: "Profile",
      icon: <User size={22} strokeWidth={1.5} />,
      onClick: () => {
        window.location.href = "https://login-o9c.caffeine.xyz/";
      },
    },
  ];

  return (
    <div data-ocid="bottom_nav.panel">
      {/* Gradient fade above the bar */}
      <div className="fixed bottom-16 left-0 right-0 h-14 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-40" />

      {/* Main bar */}
      <nav
        className="fixed bottom-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md border-t border-white/10"
        style={{ boxShadow: "0 -4px 24px rgba(0,0,0,0.5)" }}
      >
        <div
          className="max-w-lg mx-auto flex items-center justify-around h-16"
          style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        >
          <LimelightNav
            items={items}
            defaultActiveIndex={activeIndex}
            onTabChange={(index) => {
              setActiveIndex(index);
            }}
            className="bg-transparent border-0 w-full justify-around h-16"
            limelightClassName="bg-white shadow-[0_0_12px_rgba(255,255,255,0.6),0_0_24px_rgba(255,255,255,0.3)]"
            iconContainerClassName="flex-1 flex items-center justify-center hover:scale-105 transition-transform duration-200"
            iconClassName="text-white"
          />
        </div>
      </nav>
    </div>
  );
}
