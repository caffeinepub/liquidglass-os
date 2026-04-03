import { motion } from "motion/react";
import { useEffect, useState } from "react";
import BottomDock from "../components/BottomDock";
import DeployModal from "../components/DeployModal";
import Navbar from "../components/Navbar";

interface Server {
  id: string;
  name: string;
  status: "online" | "offline";
  plan: string;
  region: string;
  cpu: number;
  ram: number;
  action?: string;
}

const MOCK_SERVERS: Server[] = [
  {
    id: "warden",
    name: "Warden Node",
    status: "online",
    plan: "Warden · 16GB Ryzen 9",
    region: "EU-West · Frankfurt",
    cpu: 62,
    ram: 54,
  },
  {
    id: "phantom",
    name: "Phantom Node",
    status: "offline",
    plan: "Phantom · 8GB Ryzen 7",
    region: "US-East · New York",
    cpu: 0,
    ram: 0,
  },
  {
    id: "ember",
    name: "Ember Node",
    status: "online",
    plan: "Ember · 4GB Ryzen 5",
    region: "Asia · Singapore",
    cpu: 28,
    ram: 41,
  },
];

function ProgressBar({
  value,
  color = "bg-blue-500",
}: { value: number; color?: string }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(value), 100);
    return () => clearTimeout(t);
  }, [value]);
  return (
    <div className="bg-white/10 rounded-full h-1.5 w-full overflow-hidden">
      <div
        className={`${color} rounded-full h-1.5 transition-all duration-1000 ease-out`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-black/40 border border-white/[0.06] rounded-2xl p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="shimmer rounded-lg h-4 w-32 mb-2" />
          <div className="shimmer rounded h-3 w-24" />
        </div>
        <div className="shimmer rounded-full h-6 w-16" />
      </div>
      <div className="space-y-3 mb-5">
        <div className="shimmer rounded h-2 w-full" />
        <div className="shimmer rounded h-2 w-3/4" />
      </div>
      <div className="flex gap-2">
        <div className="shimmer rounded-xl h-8 w-16" />
        <div className="shimmer rounded-xl h-8 w-16" />
        <div className="shimmer rounded-xl h-8 w-20" />
      </div>
    </div>
  );
}

function ServerCard({
  server,
  index,
}: {
  server: Server;
  index: number;
}) {
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const handleAction = (action: string) => {
    setActionLoading(action);
    setTimeout(() => setActionLoading(null), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: [0.25, 1, 0.5, 1],
      }}
      data-ocid={`dashboard.item.${index + 1}`}
      className="bg-black/40 backdrop-blur-md border border-white/[0.08] rounded-2xl p-6 hover:border-white/[0.14] transition-all duration-200"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-white font-semibold text-base tracking-tight">
            {server.name}
          </h3>
          <p className="text-white/40 text-xs mt-0.5 uppercase tracking-widest">
            {server.region}
          </p>
        </div>
        {server.status === "online" ? (
          <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2.5 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
            <span className="text-xs text-emerald-400 font-medium">Online</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 rounded-full px-2.5 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
            <span className="text-xs text-red-400 font-medium">Offline</span>
          </div>
        )}
      </div>

      {/* Plan badge */}
      <p className="text-xs text-white/30 mb-4">{server.plan}</p>

      {/* Usage bars */}
      <div className="space-y-3 mb-5">
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-white/40">CPU</span>
            <span className="text-white/60">{server.cpu}%</span>
          </div>
          <ProgressBar value={server.cpu} />
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-white/40">RAM</span>
            <span className="text-white/60">{server.ram}%</span>
          </div>
          <ProgressBar value={server.ram} color="bg-blue-500/70" />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {["Start", "Stop", "Restart"].map((action) => (
          <button
            key={action}
            type="button"
            data-ocid={`dashboard.${action.toLowerCase()}_button.${index + 1}`}
            onClick={() => handleAction(action)}
            disabled={actionLoading !== null}
            className="flex-1 bg-white/[0.05] hover:bg-white/[0.1] disabled:opacity-50 border border-white/[0.08] text-white/70 hover:text-white rounded-xl px-3 py-2 text-xs font-medium transition-all duration-150 active:scale-95"
          >
            {actionLoading === action ? (
              <span className="flex items-center justify-center gap-1">
                <span className="w-2.5 h-2.5 border border-white/30 border-t-white rounded-full animate-spin" />
              </span>
            ) : (
              action
            )}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [showDeploy, setShowDeploy] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505]">
      <Navbar onDeploy={() => setShowDeploy(true)} />

      <main className="relative z-10 min-h-screen px-4 pt-28 pb-28">
        <div className="max-w-5xl mx-auto">
          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                My Servers
              </h1>
              <p className="text-sm text-white/40 mt-1">
                Manage and monitor your active instances
              </p>
            </div>
            <button
              data-ocid="dashboard.primary_button"
              type="button"
              onClick={() => setShowDeploy(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] active:scale-95"
            >
              Deploy Server
            </button>
          </motion.div>

          {/* Content */}
          {loading ? (
            <div
              data-ocid="dashboard.loading_state"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {[0, 1, 2].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : MOCK_SERVERS.length === 0 ? (
            <div
              data-ocid="dashboard.empty_state"
              className="flex flex-col items-center justify-center py-32 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-5">
                <span className="text-3xl">🖥️</span>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                No servers yet
              </h3>
              <p className="text-white/40 text-sm mb-6">
                Deploy your first server to get started
              </p>
              <button
                data-ocid="dashboard.empty_state"
                type="button"
                onClick={() => setShowDeploy(true)}
                className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] active:scale-95"
              >
                Deploy Server
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {MOCK_SERVERS.map((server, i) => (
                <ServerCard key={server.id} server={server} index={i} />
              ))}
            </div>
          )}
        </div>
      </main>

      <BottomDock />

      {showDeploy && <DeployModal onClose={() => setShowDeploy(false)} />}
    </div>
  );
}
