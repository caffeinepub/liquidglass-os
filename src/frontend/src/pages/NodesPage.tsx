import { ArrowLeft, Cpu, HardDrive, MapPin, Server, Wifi } from "lucide-react";
import { motion } from "motion/react";
import BottomDock from "../components/BottomDock";
import Navbar from "../components/Navbar";

const nodes = [
  {
    id: 1,
    name: "Node US-East",
    location: "New York, USA",
    flag: "🇺🇸",
    ram: "512GB",
    cpu: "64 vCPU",
    storage: "10TB NVMe",
    ping: "8ms",
    capacity: 78,
    status: "online" as const,
  },
  {
    id: 2,
    name: "Node EU-Central",
    location: "Frankfurt, Germany",
    flag: "🇩🇪",
    ram: "512GB",
    cpu: "64 vCPU",
    storage: "10TB NVMe",
    ping: "5ms",
    capacity: 62,
    status: "online" as const,
  },
  {
    id: 3,
    name: "Node AS-Southeast",
    location: "Singapore",
    flag: "🇸🇬",
    ram: "256GB",
    cpu: "32 vCPU",
    storage: "5TB NVMe",
    ping: "12ms",
    capacity: 45,
    status: "online" as const,
  },
];

function NodeCard({ node, index }: { node: (typeof nodes)[0]; index: number }) {
  return (
    <motion.div
      data-ocid={`nodes.card.${index + 1}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 hover:border-white/[0.15] hover:bg-white/[0.05] transition-all duration-250 group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{node.flag}</span>
            <h3 className="text-white font-bold text-xl">{node.name}</h3>
          </div>
          <div className="flex items-center gap-1.5 text-white/40 text-sm">
            <MapPin className="w-3.5 h-3.5" />
            {node.location}
          </div>
        </div>
        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-dot" />
          <span className="text-emerald-400 text-xs font-medium">Online</span>
        </div>
      </div>

      {/* Specs grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/[0.03] rounded-xl p-4">
          <div className="flex items-center gap-2 text-white/40 text-xs mb-2">
            <Cpu className="w-3.5 h-3.5" />
            CPU
          </div>
          <div className="text-white font-semibold">{node.cpu}</div>
        </div>
        <div className="bg-white/[0.03] rounded-xl p-4">
          <div className="flex items-center gap-2 text-white/40 text-xs mb-2">
            <Server className="w-3.5 h-3.5" />
            RAM
          </div>
          <div className="text-white font-semibold">{node.ram}</div>
        </div>
        <div className="bg-white/[0.03] rounded-xl p-4">
          <div className="flex items-center gap-2 text-white/40 text-xs mb-2">
            <HardDrive className="w-3.5 h-3.5" />
            Storage
          </div>
          <div className="text-white font-semibold">{node.storage}</div>
        </div>
        <div className="bg-white/[0.03] rounded-xl p-4">
          <div className="flex items-center gap-2 text-white/40 text-xs mb-2">
            <Wifi className="w-3.5 h-3.5" />
            Ping
          </div>
          <div className="text-white font-semibold">{node.ping}</div>
        </div>
      </div>

      {/* Capacity bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-white/40 uppercase tracking-widest">
            Node Capacity
          </span>
          <span className="text-white/60">{node.capacity}% used</span>
        </div>
        <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${node.capacity}%` }}
            transition={{ duration: 1, delay: 0.5 + index * 0.15 }}
            className="h-full bg-blue-500 rounded-full"
          />
        </div>
      </div>

      {/* Deploy button */}
      <button
        type="button"
        data-ocid={`nodes.primary_button.${index + 1}`}
        className="w-full bg-blue-500 hover:bg-blue-400 text-white rounded-xl py-3 font-medium transition-all duration-200 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] active:scale-95"
      >
        Deploy on this Node
      </button>
    </motion.div>
  );
}

export default function NodesPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-28 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10"
          >
            <a
              data-ocid="nodes.link"
              href="#/home"
              className="inline-flex items-center gap-2 text-white/40 hover:text-white/80 text-sm transition-colors duration-150"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </a>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
          >
            <p className="text-xs text-white/40 uppercase tracking-widest font-medium mb-4">
              Infrastructure
            </p>
            <h1 className="font-bold text-4xl md:text-5xl text-white tracking-tight mb-4">
              Global Nodes
            </h1>
            <p className="text-white/60 text-lg">
              Choose a node location for the lowest latency to your players.
            </p>
          </motion.div>

          {/* Nodes grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nodes.map((node, i) => (
              <NodeCard key={node.id} node={node} index={i} />
            ))}
          </div>
        </div>
      </main>
      <BottomDock />
    </div>
  );
}
