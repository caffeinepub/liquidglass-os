import { House, LayoutDashboard, Server, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { LimelightNav, type NavItem } from "./ui/limelight-nav";

function getActiveIndexFromHash() {
  const hash = window.location.hash;
  if (hash.startsWith("#/nodes")) return 3;
  if (hash.startsWith("#/") && hash !== "#/") return 0;
  return 0;
}

export default function BottomDock() {
  const [activeIndex, setActiveIndex] = useState(getActiveIndexFromHash);

  // Sync active index when hash changes (e.g. back/forward navigation)
  useEffect(() => {
    const onHashChange = () => setActiveIndex(getActiveIndexFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const items: NavItem[] = [
    {
      id: "home",
      icon: <House className="w-5 h-5" />,
      label: "Home",
      onClick: () => {
        setTimeout(() => {
          window.location.hash = "#/";
        }, 180);
      },
    },
    {
      id: "plans",
      icon: <Server className="w-5 h-5" />,
      label: "Plans",
      onClick: () => {
        setTimeout(() => {
          const el = document.getElementById("plans");
          el?.scrollIntoView({ behavior: "smooth" });
        }, 180);
      },
    },
    {
      id: "dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: "Dashboard",
      onClick: () => {
        setTimeout(() => {
          window.open("https://login-o9c.caffeine.xyz/", "_blank");
        }, 180);
      },
    },
    {
      id: "nodes",
      icon: <Zap className="w-5 h-5" />,
      label: "Nodes",
      onClick: () => {
        setTimeout(() => {
          window.location.hash = "#/nodes";
        }, 180);
      },
    },
  ];

  return (
    <div
      data-ocid="bottom_dock.panel"
      className="fixed bottom-0 left-0 right-0 z-50 will-change-transform"
    >
      {/* Gradient fade above dock */}
      <div className="absolute -top-12 left-0 right-0 h-12 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

      <div className="bg-black/70 backdrop-blur-[60px] saturate-150 border-t border-white/[0.08] h-16">
        <div className="max-w-lg mx-auto h-full flex items-center">
          <LimelightNav
            items={items}
            defaultActiveIndex={activeIndex}
            onTabChange={setActiveIndex}
            className="bg-transparent border-none rounded-none w-full h-full"
            limelightClassName="bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
            iconClassName="text-white"
          />
        </div>
      </div>
    </div>
  );
}
