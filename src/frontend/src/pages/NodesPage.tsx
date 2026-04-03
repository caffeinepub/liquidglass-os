import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import BottomDock from "../components/BottomDock";
import DeployModal from "../components/DeployModal";
import Navbar from "../components/Navbar";
import { BeamsBackground } from "../components/ui/beams-background";
import { EtheralShadow } from "../components/ui/etheral-shadow";

const NODE_DATA: Record<
  string,
  {
    name: string;
    region: string;
    cpu: string;
    ram: string;
    storage: string;
    location: string;
    status: "online" | "offline";
  }
> = {
  warden: {
    name: "Warden Node",
    region: "EU-West · Frankfurt",
    cpu: "Ryzen 9 5900X",
    ram: "16 GB",
    storage: "500 GB NVMe",
    location: "EU / Frankfurt",
    status: "online",
  },
  phantom: {
    name: "Phantom Node",
    region: "US-East · New York",
    cpu: "Ryzen 7 5800X",
    ram: "8 GB",
    storage: "250 GB NVMe",
    location: "US / New York",
    status: "offline",
  },
  ember: {
    name: "Ember Node",
    region: "Asia · Singapore",
    cpu: "Ryzen 5 5600X",
    ram: "4 GB",
    storage: "120 GB NVMe",
    location: "Asia / Singapore",
    status: "online",
  },
  overlord: {
    name: "Overlord Node",
    region: "EU-North · Stockholm",
    cpu: "EPYC 7742",
    ram: "32 GB",
    storage: "1 TB NVMe",
    location: "EU / Stockholm",
    status: "online",
  },
};

const DEFAULT_NODE = NODE_DATA.warden;

const TERMINAL_LINES = [
  "> Initializing DarkSanta server...",
  "> Loading world data...",
  "> Binding to port 25565...",
  "> Starting world generation...",
  "> Done. Server is online.",
];

function Terminal() {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (currentLine >= TERMINAL_LINES.length) {
      setDone(true);
      return;
    }
    const target = TERMINAL_LINES[currentLine];
    if (currentChar < target.length) {
      const t = setTimeout(() => {
        setLines((prev) => {
          const next = [...prev];
          next[currentLine] = (next[currentLine] ?? "") + target[currentChar];
          return next;
        });
        setCurrentChar((c) => c + 1);
      }, 28);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setCurrentLine((l) => l + 1);
      setCurrentChar(0);
    }, 200);
    return () => clearTimeout(t);
  }, [currentLine, currentChar]);

  return (
    <div className="bg-black/70 border border-white/10 rounded-xl p-4 font-mono text-sm">
      <div className="flex items-center gap-2 mb-3 border-b border-white/[0.06] pb-3">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        <span className="text-white/30 text-xs ml-2">console</span>
      </div>
      <div className="space-y-1 min-h-[120px]">
        {lines.map((line, i) => (
          // Using index is fine here — lines are append-only and never reordered
          // biome-ignore lint/suspicious/noArrayIndexKey: terminal lines are append-only
          <div key={i} className="text-green-400/80 text-xs">
            {line}
          </div>
        ))}
        {!done && (
          <span className="inline-block w-2 h-3.5 bg-green-400/60 animate-blink" />
        )}
      </div>
    </div>
  );
}

function LiveBar({
  value,
  label,
  unit = "%",
}: { value: number; label: string; unit?: string }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(value), 150);
    return () => clearTimeout(t);
  }, [value]);

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-white/60 text-sm">{label}</span>
        <motion.span
          className="text-white font-medium text-sm"
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {value}
          {unit}
        </motion.span>
      </div>
      <div className="bg-white/10 rounded-full h-1.5 overflow-hidden">
        <div
          className="bg-blue-500/80 rounded-full h-1.5 transition-all duration-1000 ease-out"
          style={{
            width: `${width}%`,
            boxShadow: "0 0 8px rgba(59,130,246,0.4)",
          }}
        />
      </div>
    </div>
  );
}

export default function NodesPage({ nodeId }: { nodeId?: string }) {
  const node = nodeId && NODE_DATA[nodeId] ? NODE_DATA[nodeId] : DEFAULT_NODE;

  const [cpuUsage, setCpuUsage] = useState(62);
  const [ramUsage, setRamUsage] = useState(54);
  const [ping, setPing] = useState(12);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [showDeploy, setShowDeploy] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage((v) =>
        Math.min(90, Math.max(20, v + (Math.random() - 0.5) * 10)),
      );
      setRamUsage((v) =>
        Math.min(85, Math.max(30, v + (Math.random() - 0.5) * 6)),
      );
      setPing((v) => Math.min(30, Math.max(6, v + (Math.random() - 0.5) * 4)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleAction = (action: string) => {
    setActionLoading(action);
    setTimeout(() => setActionLoading(null), 1500);
  };

  const configBlocks = [
    { label: "Port", value: "25565" },
    { label: "Version", value: "1.21.1" },
    { label: "Max Players", value: "100" },
    { label: "Auto Restart", value: "Enabled" },
    { label: "Backup", value: "Daily" },
    { label: "Gamemode", value: "Survival" },
  ];

  return (
    <div className="relative min-h-screen bg-[#050505] overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="hidden md:block absolute inset-0">
          <BeamsBackground intensity="subtle" className="absolute inset-0" />
        </div>
        <div className="hidden md:block absolute inset-0 opacity-25">
          <EtheralShadow
            color="rgba(30,64,175,0.6)"
            animation={{ scale: 55, speed: 55 }}
            noise={{ opacity: 0.3, scale: 1.2 }}
            sizing="fill"
          />
        </div>
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/6 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      <Navbar onDeploy={() => setShowDeploy(true)} />

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          className="w-full max-w-5xl mx-auto"
          data-ocid="nodes.panel"
        >
          {/* Back */}
          <button
            type="button"
            onClick={() => {
              window.location.hash = "#/nodes";
            }}
            className="flex items-center gap-2 text-white/40 hover:text-white/70 text-sm mb-5 transition-colors duration-150 bg-transparent border-none cursor-pointer"
          >
            <span>←</span>
            <span>All Nodes</span>
          </button>

          {/* Main panel */}
          <div className="bg-black/50 backdrop-blur-[60px] saturate-150 border border-white/[0.1] rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)] p-6 md:p-8">
            {/* Banner */}
            <div className="relative w-full h-20 md:h-32 rounded-xl overflow-hidden mb-7 border border-white/[0.06]">
              <img
                src="https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=900&q=75"
                alt="Minecraft server"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Header */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  {node.name}
                </h1>
                <p className="text-xs text-white/40 mt-1 uppercase tracking-widest">
                  {node.region}
                </p>
              </div>
              {node.status === "online" ? (
                <motion.div
                  data-ocid="nodes.success_state"
                  className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1.5"
                  animate={{
                    boxShadow: [
                      "0 0 0px rgba(52,211,153,0)",
                      "0 0 12px rgba(52,211,153,0.15)",
                      "0 0 0px rgba(52,211,153,0)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  <motion.span
                    className="w-2 h-2 rounded-full bg-emerald-400"
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                  <span className="text-xs text-emerald-400 font-medium">
                    Online
                  </span>
                </motion.div>
              ) : (
                <div
                  data-ocid="nodes.error_state"
                  className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-3 py-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  <span className="text-xs text-red-400 font-medium">
                    Offline
                  </span>
                </div>
              )}
            </div>

            {/* Content grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Left */}
              <div className="space-y-6">
                <div className="bg-black/40 backdrop-blur-md border border-white/[0.08] rounded-xl p-5">
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mb-4">
                    Server Info
                  </p>
                  <div className="space-y-0">
                    {[
                      { label: "RAM", value: node.ram },
                      { label: "CPU", value: node.cpu },
                      { label: "Storage", value: node.storage },
                      { label: "Location", value: node.location },
                    ].map((row, i, arr) => (
                      <div
                        key={row.label}
                        className={`flex items-center justify-between py-2.5 ${
                          i < arr.length - 1
                            ? "border-b border-white/[0.05]"
                            : ""
                        }`}
                      >
                        <span className="text-white/50 text-sm">
                          {row.label}
                        </span>
                        <span className="text-white font-medium text-sm">
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-black/40 backdrop-blur-md border border-white/[0.08] rounded-xl p-5">
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mb-4">
                    Live Stats
                  </p>
                  <div className="space-y-5">
                    <LiveBar value={Math.round(cpuUsage)} label="CPU Usage" />
                    <LiveBar value={Math.round(ramUsage)} label="RAM Usage" />
                    <div className="flex justify-between">
                      <span className="text-white/60 text-sm">Ping</span>
                      <motion.span
                        className="text-white font-medium text-sm"
                        animate={{ opacity: [1, 0.6, 1] }}
                        transition={{
                          duration: 4,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      >
                        {Math.round(ping)} ms
                      </motion.span>
                    </div>
                  </div>
                </div>

                <div className="bg-black/40 backdrop-blur-md border border-white/[0.08] rounded-xl p-5">
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mb-4">
                    Controls
                  </p>
                  <div className="flex gap-2.5 mb-3">
                    {["Start", "Stop", "Restart"].map((action) => (
                      <button
                        key={action}
                        type="button"
                        data-ocid={`nodes.${action.toLowerCase()}_button`}
                        onClick={() => handleAction(action)}
                        disabled={actionLoading !== null}
                        className="flex-1 bg-white/[0.06] hover:bg-white/[0.12] disabled:opacity-50 border border-white/[0.08] text-white/80 hover:text-white rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 active:scale-95"
                      >
                        {actionLoading === action ? (
                          <span className="flex items-center justify-center">
                            <span className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin" />
                          </span>
                        ) : (
                          action
                        )}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    data-ocid="nodes.primary_button"
                    onClick={() => setShowDeploy(true)}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] active:scale-95"
                  >
                    Deploy New Node
                  </button>
                </div>
              </div>

              {/* Right */}
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mb-4">
                    Config
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <AnimatePresence>
                      {configBlocks.map((block, idx) => (
                        <motion.div
                          key={block.label}
                          data-ocid="nodes.config.card"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.35,
                            delay: 0.3 + idx * 0.06,
                          }}
                          className="bg-black/40 backdrop-blur-md border border-white/[0.08] rounded-xl p-4"
                        >
                          <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">
                            {block.label}
                          </p>
                          <p className="text-white font-medium text-sm">
                            {block.value}
                          </p>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mb-4">
                    Console
                  </p>
                  <Terminal />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <BottomDock />
      {showDeploy && <DeployModal onClose={() => setShowDeploy(false)} />}
    </div>
  );
}
