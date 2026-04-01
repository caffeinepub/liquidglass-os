import { motion } from "motion/react";
import BottomDock from "../components/BottomDock";
import Navbar from "../components/Navbar";
import { BeamsBackground } from "../components/ui/beams-background";
import { EtheralShadow } from "../components/ui/etheral-shadow";

interface NodeCard {
  id: string;
  name: string;
  region: string;
  status: "online" | "offline";
  ram: string;
  cpu: string;
  cpuUsage: number;
  ramUsage: number;
}

const NODES: NodeCard[] = [
  {
    id: "warden",
    name: "Warden Node",
    region: "EU-West · Frankfurt",
    status: "online",
    ram: "16 GB",
    cpu: "Ryzen 9 5900X",
    cpuUsage: 68,
    ramUsage: 54,
  },
  {
    id: "shadow",
    name: "Shadow Node",
    region: "US-East · New York",
    status: "online",
    ram: "32 GB",
    cpu: "Ryzen 9 7950X",
    cpuUsage: 41,
    ramUsage: 72,
  },
  {
    id: "specter",
    name: "Specter Node",
    region: "Asia · Mumbai",
    status: "offline",
    ram: "8 GB",
    cpu: "Ryzen 7 5800X",
    cpuUsage: 0,
    ramUsage: 0,
  },
  {
    id: "ghost",
    name: "Ghost Node",
    region: "EU-North · Stockholm",
    status: "online",
    ram: "64 GB",
    cpu: "EPYC 7742",
    cpuUsage: 22,
    ramUsage: 38,
  },
];

function MiniBar({ value }: { value: number }) {
  return (
    <div className="bg-white/10 rounded-full h-1 w-full">
      <div
        className="bg-blue-500/70 rounded-full h-1 transition-all duration-1000 ease-out"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export default function NodeListPage() {
  const handleNavigateToNode = () => {
    window.location.hash = "#/nodes";
  };

  return (
    <div className="relative min-h-screen bg-[#050505] overflow-x-hidden">
      {/* ── Animated background layers ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* BeamsBackground + EtheralShadow: desktop only */}
        <div className="hidden md:block absolute inset-0">
          <BeamsBackground intensity="subtle" className="absolute inset-0" />
        </div>
        <div className="hidden md:block absolute inset-0 opacity-30">
          <EtheralShadow
            color="rgba(30,64,175,0.6)"
            animation={{ scale: 60, speed: 60 }}
            noise={{ opacity: 0.4, scale: 1.2 }}
            sizing="fill"
          />
        </div>
        {/* Aurora glow blobs — lightweight, work on mobile too */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-600/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-[350px] h-[350px] bg-purple-600/6 rounded-full blur-[120px]" />
        {/* Bottom dark fade */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      <Navbar />

      <main className="relative z-10 min-h-screen px-4 pt-28 pb-32">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-5xl mx-auto mb-8"
        >
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Your Nodes
          </h1>
          <p className="text-sm text-white/50 mt-1">
            Manage and monitor your active server nodes
          </p>
        </motion.div>

        {/* Node cards grid */}
        <div
          className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5"
          data-ocid="node_list.list"
        >
          {NODES.map((node, i) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: i * 0.07,
                ease: [0.4, 0, 0.2, 1],
              }}
              data-ocid={`node_list.item.${i + 1}`}
              className="group bg-black/50 backdrop-blur-md md:backdrop-blur-[60px] border border-white/10 rounded-2xl p-5 cursor-pointer hover:border-white/20 hover:bg-black/60 transition-all duration-200"
              onClick={handleNavigateToNode}
            >
              {/* Card header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-base font-semibold text-white tracking-tight">
                    {node.name}
                  </h2>
                  <p className="text-xs text-white/50 mt-0.5 uppercase tracking-widest">
                    {node.region}
                  </p>
                </div>
                {node.status === "online" ? (
                  <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2.5 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.8)]" />
                    <span className="text-xs text-emerald-400 font-medium">
                      Online
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 rounded-full px-2.5 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    <span className="text-xs text-red-400 font-medium">
                      Offline
                    </span>
                  </div>
                )}
              </div>

              {/* Quick specs */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-black/40 border border-white/5 rounded-xl p-3">
                  <p className="text-xs uppercase tracking-widest text-white/30 mb-0.5">
                    RAM
                  </p>
                  <p className="text-white text-sm font-medium">{node.ram}</p>
                </div>
                <div className="bg-black/40 border border-white/5 rounded-xl p-3">
                  <p className="text-xs uppercase tracking-widest text-white/30 mb-0.5">
                    CPU
                  </p>
                  <p className="text-white text-sm font-medium truncate">
                    {node.cpu}
                  </p>
                </div>
              </div>

              {/* Mini stat bars */}
              {node.status === "online" && (
                <div className="space-y-2.5 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-white/40 w-8 shrink-0">
                      CPU
                    </span>
                    <MiniBar value={node.cpuUsage} />
                    <span className="text-xs text-white/60 w-8 text-right shrink-0">
                      {node.cpuUsage}%
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-white/40 w-8 shrink-0">
                      RAM
                    </span>
                    <MiniBar value={node.ramUsage} />
                    <span className="text-xs text-white/60 w-8 text-right shrink-0">
                      {node.ramUsage}%
                    </span>
                  </div>
                </div>
              )}

              {/* Manage button */}
              <button
                type="button"
                data-ocid={`node_list.manage_button.${i + 1}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigateToNode();
                }}
                className="w-full mt-1 bg-white/8 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white rounded-xl px-4 py-2 text-sm font-medium transition-all duration-150 active:scale-95"
              >
                Manage
              </button>
            </motion.div>
          ))}
        </div>
      </main>

      <BottomDock />
    </div>
  );
}
