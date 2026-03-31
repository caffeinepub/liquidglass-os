import { House, LayoutDashboard, Server, Zap } from "lucide-react";
import { useState } from "react";
import { LimelightNav, type NavItem } from "./ui/limelight-nav";

export default function BottomDock() {
  const [activeIndex, setActiveIndex] = useState(0);

  const items: NavItem[] = [
    {
      id: "home",
      icon: <House className="w-5 h-5" />,
      label: "Home",
      onClick: () => {
        window.location.hash = "#/";
      },
    },
    {
      id: "plans",
      icon: <Server className="w-5 h-5" />,
      label: "Plans",
      onClick: () => {
        const el = document.getElementById("plans");
        el?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: "Dashboard",
      onClick: () => {
        window.open("https://login-o9c.caffeine.xyz/", "_blank");
      },
    },
    {
      id: "nodes",
      icon: <Zap className="w-5 h-5" />,
      label: "Nodes",
      onClick: () => {
        window.location.hash = "#/nodes";
      },
    },
  ];

  return (
    <div
      data-ocid="bottom_dock.panel"
      className="fixed bottom-0 left-0 right-0 z-50"
    >
      {/* Gradient fade above dock */}
      <div className="absolute -top-12 left-0 right-0 h-12 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

      <div className="bg-black/60 backdrop-blur-md border-t border-white/[0.08] h-16">
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
