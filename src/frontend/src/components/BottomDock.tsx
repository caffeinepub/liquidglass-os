import { House, LayoutDashboard, Search, UserCircle } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { LimelightNav, type NavItem } from "./ui/limelight-nav";

function getActiveIndexFromHash() {
  const hash = window.location.hash;
  if (hash.startsWith("#/nodes") || hash.startsWith("#/node-list")) return 2;
  if (hash.startsWith("#/dashboard")) return 1;
  if (hash.startsWith("#/login")) return 3;
  return 0;
}

const ICON_DEFINITIONS = [
  { id: "home", Icon: House, label: "Home", hash: "#/" },
  {
    id: "dashboard",
    Icon: LayoutDashboard,
    label: "Dashboard",
    hash: "#/dashboard",
  },
  { id: "nodes", Icon: Search, label: "Nodes", hash: "#/nodes" },
  { id: "profile", Icon: UserCircle, label: "Profile", hash: "#/login" },
];

export default function BottomDock() {
  const [activeIndex, setActiveIndex] = useState(getActiveIndexFromHash);

  useEffect(() => {
    const onHashChange = () => setActiveIndex(getActiveIndexFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const items: NavItem[] = ICON_DEFINITIONS.map(
    ({ id, Icon, label, hash }, i) => ({
      id,
      label,
      icon: (
        <motion.span
          whileTap={{ scale: 0.88 }}
          whileHover={{ scale: 1.12 }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon className="w-5 h-5" />
        </motion.span>
      ),
      onClick: () => {
        setActiveIndex(i);
        // Immediate navigation — no setTimeout delay
        window.location.hash = hash;
      },
    }),
  );

  return (
    <div
      data-ocid="bottom_dock.panel"
      className="fixed bottom-0 left-0 right-0 z-50 gpu-layer"
    >
      {/* Taller cinematic gradient fade above dock */}
      <div className="absolute -top-16 left-0 right-0 h-16 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

      {/* Dock with deep OTT glass */}
      <div className="dock-glass h-16">
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
