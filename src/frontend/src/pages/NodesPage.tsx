import { motion } from "motion/react";
import { useEffect, useState } from "react";
import BottomDock from "../components/BottomDock";
import Navbar from "../components/Navbar";

function StatBar({ value, delay = 0 }: { value: number; delay?: number }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setWidth(value), 100 + delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return (
    <div className="bg-white/10 rounded-full h-1.5 w-full">
      <div
        className="bg-blue-500/80 rounded-full h-1.5 transition-all duration-1000 ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

export default function NodesPage() {
  return (
    <div className="relative min-h-screen bg-[#050505] overflow-x-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

      <Navbar />

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="w-full max-w-5xl mx-auto bg-black/50 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-6 md:p-8"
          data-ocid="nodes.panel"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Warden Node
              </h1>
              <p className="text-xs text-white/60 mt-1 uppercase tracking-widest">
                EU-West · Frankfurt
              </p>
            </div>
            <div
              data-ocid="nodes.success_state"
              className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
              <span className="text-xs text-emerald-400 font-medium">
                Online
              </span>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div>
              {/* Server Info */}
              <p className="text-xs uppercase tracking-widest text-white/40 mb-4">
                Server Info
              </p>
              <div>
                {[
                  { label: "RAM", value: "16 GB" },
                  { label: "CPU", value: "Ryzen 9 5900X" },
                  { label: "Storage", value: "NVMe SSD 500GB" },
                  { label: "Location", value: "EU / Frankfurt" },
                ].map((row, i, arr) => (
                  <div
                    key={row.label}
                    className={`flex items-center justify-between py-3 ${i < arr.length - 1 ? "border-b border-white/5" : ""}`}
                  >
                    <span className="text-white/60 text-sm">{row.label}</span>
                    <span className="text-white font-medium text-sm">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Live Stats */}
              <div className="mt-8">
                <p className="text-xs uppercase tracking-widest text-white/40 mb-4">
                  Live Stats
                </p>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-white/60 text-sm">CPU Usage</span>
                      <span className="text-white font-medium text-sm">
                        68%
                      </span>
                    </div>
                    <StatBar value={68} delay={0} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-white/60 text-sm">RAM Usage</span>
                      <span className="text-white font-medium text-sm">
                        54%
                      </span>
                    </div>
                    <StatBar value={54} delay={150} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-sm">
                      Ping / Latency
                    </span>
                    <span className="text-white font-medium text-sm">
                      12 ms
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              {/* Controls */}
              <p className="text-xs uppercase tracking-widest text-white/40 mb-4">
                Controls
              </p>
              <div className="flex gap-3">
                {["Start", "Stop", "Restart"].map((label) => (
                  <button
                    type="button"
                    key={label}
                    data-ocid={`nodes.${label.toLowerCase()}_button`}
                    className="flex-1 bg-white/10 hover:bg-white/20 active:scale-95 text-white rounded-xl px-4 py-2 text-sm font-medium transition-all duration-150"
                  >
                    {label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                data-ocid="nodes.primary_button"
                className="mt-4 w-full bg-blue-500 hover:bg-blue-400 text-white rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] active:scale-95"
              >
                Deploy New Node
              </button>

              {/* Config */}
              <div className="mt-8">
                <p className="text-xs uppercase tracking-widest text-white/40 mb-4">
                  Config
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Port", value: "25565" },
                    { label: "Version", value: "1.20.4" },
                    { label: "Max Players", value: "100" },
                    { label: "Auto Restart", value: "Enabled" },
                    { label: "Backup Status", value: "Active", full: true },
                  ].map((block) => (
                    <div
                      key={block.label}
                      data-ocid={`nodes.${block.label.toLowerCase().replace(/ /g, "_")}.card`}
                      className={`bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4 ${block.full ? "col-span-2" : ""}`}
                    >
                      <p className="text-xs uppercase tracking-widest text-white/40 mb-1">
                        {block.label}
                      </p>
                      <p className="text-white font-medium text-sm">
                        {block.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <BottomDock />
    </div>
  );
}
