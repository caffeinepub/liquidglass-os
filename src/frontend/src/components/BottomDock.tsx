import { House, LayoutDashboard, Search, UserCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { LimelightNav, type NavItem } from "./ui/limelight-nav";

function getActiveIndexFromHash() {
  const hash = window.location.hash;
  if (hash.startsWith("#/nodes") || hash.startsWith("#/node-list")) return 2;
  if (hash.startsWith("#/dashboard")) return 1;
  if (hash.startsWith("#/login")) return 3;
  return 0;
}

export default function BottomDock() {
  const [activeIndex, setActiveIndex] = useState(getActiveIndexFromHash);

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
        }, 80);
      },
    },
    {
      id: "dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: "Dashboard",
      onClick: () => {
        setTimeout(() => {
          window.location.hash = "#/dashboard";
        }, 80);
      },
    },
    {
      id: "nodes",
      icon: <Search className="w-5 h-5" />,
      label: "Nodes",
      onClick: () => {
        setTimeout(() => {
          window.location.hash = "#/nodes";
        }, 80);
      },
    },
    {
      id: "profile",
      icon: <UserCircle className="w-5 h-5" />,
      label: "Profile",
      onClick: () => {
        setTimeout(() => {
          window.location.hash = "#/login";
        }, 80);
      },
    },
  ];

  return (
    <div
      data-ocid="bottom_dock.panel"
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{ willChange: "transform" }}
    >
      {/* Gradient fade above */}
      <div className="absolute -top-12 left-0 right-0 h-12 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

      <div className="bg-black/60 backdrop-blur-xl border-t border-white/[0.07] h-16">
        <div className="max-w-lg mx-auto h-full flex items-center px-2">
          <LimelightNav
            items={items}
            defaultActiveIndex={activeIndex}
            onTabChange={setActiveIndex}
            className="bg-transparent border-none rounded-none w-full h-full"
            limelightClassName="bg-blue-500 shadow-[0_0_16px_rgba(59,130,246,0.5)]"
            iconClassName="text-white"
          />
        </div>
      </div>
    </div>
  );
}
