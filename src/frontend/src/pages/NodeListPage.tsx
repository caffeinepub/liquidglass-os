import { motion } from "motion/react";
import { useState } from "react";
import BottomDock from "../components/BottomDock";
import DeployModal from "../components/DeployModal";
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
    id: "phantom",
    name: "Phantom Node",
    region: "US-East · New York",
    status: "offline",
    ram: "8 GB",
    cpu: "Ryzen 7 5800X",
    cpuUsage: 0,
    ramUsage: 0,
  },
  {
    id: "ember",
    name: "Ember Node",
    region: "Asia · Singapore",
    status: "online",
    ram: "4 GB",
    cpu: "Ryzen 5 5600X",
    cpuUsage: 28,
    ramUsage: 41,
  },
  {
    id: "overlord",
    name: "Overlord Node",
    region: "EU-North · Stockholm",
    status: "online",
    ram: "32 GB",
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
  const [showDeploy, setShowDeploy] = useState(false);

  const handleNavigateToNode = (nodeId: string) => {
    window.location.hash = `#/nodes/${nodeId}`;
  };

  return (
    <div className="relative min-h-screen bg-[#050505] overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
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
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-600/6 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-[350px] h-[350px] bg-purple-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      <Navbar onDeploy={() => setShowDeploy(true)} />

      <main className="relative z-10 min-h-screen px-4 pt-28 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
          className="max-w-5xl mx-auto mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Your Nodes
            </h1>
            <p className="text-sm text-white/40 mt-1">
              Manage and monitor your active server nodes
            </p>
          </div>
          <button
            data-ocid="node_list.primary_button"
            type="button"
            onClick={() => setShowDeploy(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] active:scale-95"
          >
            Deploy Node
          </button>
        </motion.div>

        <div
          className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5"
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
                ease: [0.25, 1, 0.5, 1],
              }}
              data-ocid={`node_list.item.${i + 1}`}
              className="group bg-black/50 backdrop-blur-md md:backdrop-blur-[50px] border border-white/10 rounded-2xl p-5 cursor-pointer hover:border-white/[0.18] hover:bg-black/60 transition-all duration-200"
              onClick={() => handleNavigateToNode(node.id)}
            >
              {/* Card header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-base font-semibold text-white tracking-tight">
                    {node.name}
                  </h2>
                  <p className="text-xs text-white/40 mt-0.5 uppercase tracking-widest">
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

              {/* Specs */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-black/40 border border-white/[0.05] rounded-xl p-3">
                  <p className="text-[10px] uppercase tracking-widest text-white/30 mb-0.5">
                    RAM
                  </p>
                  <p className="text-white text-sm font-medium">{node.ram}</p>
                </div>
                <div className="bg-black/40 border border-white/[0.05] rounded-xl p-3">
                  <p className="text-[10px] uppercase tracking-widest text-white/30 mb-0.5">
                    CPU
                  </p>
                  <p className="text-white text-sm font-medium truncate">
                    {node.cpu}
                  </p>
                </div>
              </div>

              {/* Mini bars */}
              {node.status === "online" && (
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-white/40 w-8 shrink-0">
                      CPU
                    </span>
                    <MiniBar value={node.cpuUsage} />
                    <span className="text-[10px] text-white/50 w-8 text-right shrink-0">
                      {node.cpuUsage}%
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-white/40 w-8 shrink-0">
                      RAM
                    </span>
                    <MiniBar value={node.ramUsage} />
                    <span className="text-[10px] text-white/50 w-8 text-right shrink-0">
                      {node.ramUsage}%
                    </span>
                  </div>
                </div>
              )}

              <button
                type="button"
                data-ocid={`node_list.edit_button.${i + 1}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigateToNode(node.id);
                }}
                className="w-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] text-white/70 hover:text-white rounded-xl px-4 py-2 text-sm font-medium transition-all duration-150 active:scale-95"
              >
                Manage
              </button>
            </motion.div>
          ))}
        </div>
      </main>

      <BottomDock />
      {showDeploy && <DeployModal onClose={() => setShowDeploy(false)} />}
    </div>
  );
}
