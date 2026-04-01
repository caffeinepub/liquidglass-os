import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import BottomDock from "../components/BottomDock";
import Navbar from "../components/Navbar";
import { BeamsBackground } from "../components/ui/beams-background";
import { EtheralShadow } from "../components/ui/etheral-shadow";

// ─── Animated counter ─────────────────────────────────────────────────────────
function useCounter(target: number, duration = 1800) {
  const [value, setValue] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      setValue(Math.round(progress * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return value;
}

// ─── CPU bar with color thresholds + breathing pulse ──────────────────────────
function CpuBar({ value, delay = 0 }: { value: number; delay?: number }) {
  const [width, setWidth] = useState(0);
  const displayValue = useCounter(value, 1600);

  useEffect(() => {
    const t = setTimeout(() => setWidth(value), 120 + delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  const barColor =
    value >= 80
      ? "bg-red-500/80"
      : value >= 50
        ? "bg-yellow-500/80"
        : "bg-green-500/80";

  const glowColor =
    value >= 80
      ? "rgba(239,68,68,0.4)"
      : value >= 50
        ? "rgba(234,179,8,0.4)"
        : "rgba(34,197,94,0.4)";

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-white/60 text-sm">CPU Usage</span>
        <motion.span
          className="text-white font-medium text-sm"
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {displayValue}%
        </motion.span>
      </div>
      <div className="bg-white/10 rounded-full h-2 w-full overflow-hidden">
        <motion.div
          className={`${barColor} rounded-full h-2 transition-all duration-1000 ease-out`}
          style={{ width: `${width}%`, boxShadow: `0 0 8px ${glowColor}` }}
          animate={{ opacity: [1, 0.75, 1] }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
}

// ─── RAM bar with breathing pulse ─────────────────────────────────────────────
function RamBar({ value, delay = 0 }: { value: number; delay?: number }) {
  const [width, setWidth] = useState(0);
  const displayValue = useCounter(value, 1800);

  useEffect(() => {
    const t = setTimeout(() => setWidth(value), 120 + delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-white/60 text-sm">RAM Usage</span>
        <motion.span
          className="text-white font-medium text-sm"
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          {displayValue}%
        </motion.span>
      </div>
      <div className="bg-white/10 rounded-full h-2 w-full overflow-hidden">
        <motion.div
          className="bg-blue-500/80 rounded-full h-2 transition-all duration-1000 ease-out"
          style={{
            width: `${width}%`,
            boxShadow: "0 0 8px rgba(59,130,246,0.4)",
          }}
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </div>
    </div>
  );
}

const configBlocks = [
  { label: "Port", value: "25565" },
  { label: "Version", value: "1.20.4" },
  { label: "Max Players", value: "100" },
  { label: "Auto Restart", value: "Enabled" },
  { label: "Backup Status", value: "Active", full: true },
];

export default function NodesPage() {
  return (
    <div className="relative min-h-screen bg-[#050505] overflow-x-hidden">
      {/* ── Animated background layers — hidden on mobile to save GPU ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* BeamsBackground: desktop only */}
        <div className="hidden md:block absolute inset-0">
          <BeamsBackground intensity="subtle" className="absolute inset-0" />
        </div>
        {/* EtheralShadow: desktop only */}
        <div className="hidden md:block absolute inset-0 opacity-30">
          <EtheralShadow
            color="rgba(30,64,175,0.6)"
            animation={{ scale: 60, speed: 60 }}
            noise={{ opacity: 0.4, scale: 1.2 }}
            sizing="fill"
          />
        </div>
        {/* Aurora glow blobs — lightweight CSS, always visible */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-purple-600/6 rounded-full blur-[120px]" />
        {/* Bottom dark fade */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      <Navbar />

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          className="w-full max-w-5xl mx-4 md:mx-auto bg-black/70 backdrop-blur-[60px] saturate-150 border border-white/15 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_40px_rgba(0,0,0,0.8)] p-4 md:p-8"
          data-ocid="nodes.panel"
        >
          {/* ── Minecraft banner image ── */}
          <div className="relative w-full h-24 md:h-36 rounded-xl overflow-hidden mb-8 border border-emerald-500/20">
            <img
              src="https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&q=80"
              alt="Minecraft server"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute inset-0 bg-emerald-900/10" />
          </div>

          {/* ── Header ── */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold font-mono text-white tracking-tight flex items-center gap-2">
                <span>⛏️</span> Warden Node
              </h1>
              <p className="text-xs text-white/60 mt-1 uppercase tracking-widest">
                EU-West · Frankfurt
              </p>
            </div>
            <motion.div
              data-ocid="nodes.success_state"
              className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1.5"
              animate={{
                boxShadow: [
                  "0 0 0px rgba(52,211,153,0)",
                  "0 0 12px rgba(52,211,153,0.2)",
                  "0 0 0px rgba(52,211,153,0)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <motion.span
                className="w-2 h-2 rounded-full bg-emerald-400"
                animate={{
                  opacity: [1, 0.4, 1],
                  boxShadow: [
                    "0 0 4px rgba(52,211,153,0.6)",
                    "0 0 10px rgba(52,211,153,1)",
                    "0 0 4px rgba(52,211,153,0.6)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <span className="text-xs text-emerald-400 font-medium">
                Online
              </span>
            </motion.div>
          </div>

          {/* ── Content Grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
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
                    className={`flex items-center justify-between py-3 ${
                      i < arr.length - 1 ? "border-b border-white/5" : ""
                    }`}
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
                <div className="space-y-5">
                  <CpuBar value={68} delay={0} />
                  <RamBar value={54} delay={150} />
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-sm">
                      Ping / Latency
                    </span>
                    <motion.span
                      className="text-white font-medium text-sm"
                      animate={{ opacity: [1, 0.6, 1] }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      12 ms
                    </motion.span>
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
              {/* Stack vertically on mobile, row on sm+ */}
              <div className="flex flex-col sm:flex-row gap-3">
                {["Start", "Stop", "Restart"].map((label) => (
                  <button
                    type="button"
                    key={label}
                    data-ocid={`nodes.${label.toLowerCase()}_button`}
                    className="flex-1 bg-white/10 hover:bg-white/20 active:scale-95 text-white rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-150"
                  >
                    {label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                data-ocid="nodes.primary_button"
                className="mt-4 w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:shadow-[0_0_20px_rgba(16,185,129,0.35)] active:scale-95"
              >
                Deploy New Node
              </button>

              {/* Config */}
              <div className="mt-8">
                <p className="text-xs uppercase tracking-widest text-white/40 mb-4">
                  Config
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <AnimatePresence>
                    {configBlocks.map((block, idx) => (
                      <motion.div
                        key={block.label}
                        data-ocid={`nodes.${block.label.toLowerCase().replace(/ /g, "_")}.card`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.3 + idx * 0.1,
                          ease: "easeOut",
                        }}
                        className={`bg-black/50 backdrop-blur-[30px] border border-white/10 rounded-xl p-4 ${
                          block.full ? "col-span-full" : ""
                        }`}
                      >
                        <p className="text-xs uppercase tracking-widest text-white/40 mb-1">
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
            </div>
          </div>
        </motion.div>
      </main>

      <BottomDock />
    </div>
  );
}
