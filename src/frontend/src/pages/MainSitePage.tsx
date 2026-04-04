import { MinimalFooter } from "@/components/ui/minimal-footer";
import { Gamepad2, Headphones, Server, Shield, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import BottomDock from "../components/BottomDock";
import DeployModal from "../components/DeployModal";
import Navbar from "../components/Navbar";

// ─── Counter hook ─────────────────────────────────────────────────────────────
function useCounter(target: number, duration = 2000) {
  const [value, setValue] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - (1 - progress) ** 3;
      setValue(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return value;
}

// ─── CountUp (intersection-based) ────────────────────────────────────────────
function CountUp({
  end,
  suffix = "",
  prefix = "",
  decimals = 0,
}: {
  end: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const start = Date.now();
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - (1 - progress) ** 3;
            setVal(Number((ease * end).toFixed(decimals)));
            if (progress < 1) requestAnimationFrame(tick);
            else setVal(end);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, decimals]);
  return (
    <div ref={ref}>
      {prefix}
      {decimals > 0 ? val.toFixed(decimals) : val}
      {suffix}
    </div>
  );
}

// ─── Stats Panel ─────────────────────────────────────────────────────────────
function StatsPanel() {
  const servers = useCounter(847);
  return (
    <motion.div
      data-ocid="hero.card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.9 }}
      className="mt-12 inline-flex flex-wrap items-center justify-center gap-8 bg-black/40 border border-white/[0.08] rounded-2xl px-8 py-5 backdrop-blur-md float-gentle"
    >
      <div className="text-center">
        <div className="text-2xl font-bold text-white">{servers}</div>
        <div className="text-[10px] text-white/40 uppercase tracking-widest mt-1">
          Active Servers
        </div>
      </div>
      <div className="w-px h-8 bg-white/10" />
      <div className="text-center">
        <div className="text-2xl font-bold text-white">&lt;12ms</div>
        <div className="text-[10px] text-white/40 uppercase tracking-widest mt-1">
          Avg Ping
        </div>
      </div>
      <div className="w-px h-8 bg-white/10" />
      <div className="text-center">
        <div className="text-2xl font-bold text-white">99.9%</div>
        <div className="text-[10px] text-white/40 uppercase tracking-widest mt-1">
          Uptime
        </div>
      </div>
    </motion.div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection({ onDeploy }: { onDeploy: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 5;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 5;
      const heading = el.querySelector<HTMLElement>(".hero-heading");
      if (heading) heading.style.transform = `translate(${x}px, ${y}px)`;
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16 pb-32 overflow-hidden"
    >
      {/* Background hero image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/minecraft-hero-bg.dim_1920x1080.jpg"
          alt=""
          className="w-full h-full object-cover opacity-20"
          style={{ filter: "saturate(0.6) brightness(0.5)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 100% 80% at 50% 100%, #050505 30%, transparent 70%)",
          }}
        />
      </div>

      <div className="hero-grid absolute inset-0 pointer-events-none z-[1]" />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] pointer-events-none z-[1]">
        <div
          className="absolute inset-0 animate-gradient-bg"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(59,130,246,0.12), transparent)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium uppercase tracking-widest px-4 py-2 rounded-full mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 pulse-dot" />
          Next-Gen Minecraft Hosting
        </motion.div>

        <motion.h1
          className="hero-heading font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight text-white leading-[1.05] transition-transform duration-75"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Deploy.
          <br />
          Control.
          <br />
          <span className="text-blue-400">Dominate.</span>
        </motion.h1>

        <motion.p
          className="mt-6 text-white/60 text-lg md:text-xl max-w-xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Next-generation Minecraft hosting built for performance.
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <button
            data-ocid="hero.primary_button"
            type="button"
            onClick={onDeploy}
            className="btn-premium ripple-effect bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-6 py-3 font-semibold hover:shadow-[0_0_24px_rgba(59,130,246,0.5)] active:scale-95"
          >
            Deploy Server
          </button>
          <button
            data-ocid="hero.secondary_button"
            type="button"
            onClick={() => {
              window.location.hash = "#/dashboard";
            }}
            className="btn-premium bg-white/10 hover:bg-white/[0.15] border border-white/10 text-white rounded-xl px-6 py-3 font-semibold active:scale-95"
          >
            View Dashboard
          </button>
        </motion.div>

        <StatsPanel />
      </div>
    </section>
  );
}

// ─── Plans ─────────────────────────────────────────────────────────────────────
const PLANS = [
  {
    name: "Ember",
    ram: "4GB RAM",
    cpu: "Ryzen 5",
    storage: "80GB NVMe",
    price: "$4",
    popular: false,
    extras: ["NVMe SSD", "DDoS Protection", "Instant Setup"],
  },
  {
    name: "Phantom",
    ram: "8GB RAM",
    cpu: "Ryzen 7",
    storage: "160GB NVMe",
    price: "$9",
    popular: false,
    extras: [
      "NVMe SSD",
      "DDoS Protection",
      "Instant Setup",
      "Priority Support",
    ],
  },
  {
    name: "Warden",
    ram: "16GB RAM",
    cpu: "Ryzen 9",
    storage: "320GB NVMe",
    price: "$18",
    popular: true,
    extras: [
      "NVMe SSD",
      "Enterprise DDoS",
      "Instant Setup",
      "Priority Support",
      "Daily Backups",
    ],
  },
  {
    name: "Overlord",
    ram: "32GB RAM",
    cpu: "Dedicated CPU",
    storage: "640GB NVMe",
    price: "$35",
    popular: false,
    extras: [
      "NVMe SSD",
      "Enterprise DDoS",
      "Instant Setup",
      "24/7 Support",
      "Hourly Backups",
      "SLA Guarantee",
    ],
  },
];

function PlanCard({
  plan,
  onDeploy,
}: { plan: (typeof PLANS)[0]; onDeploy: () => void }) {
  return (
    <div
      data-ocid="plans.card"
      className={`plan-card relative flex flex-col bg-black/40 backdrop-blur-md border rounded-2xl p-6 ${
        plan.popular
          ? "border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.06)]"
          : "border-white/[0.08]"
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-blue-600 text-white text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-white/40 uppercase tracking-widest font-medium">
          {plan.cpu}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-dot" />
          <span className="text-xs text-emerald-500/80">Online</span>
        </span>
      </div>

      <h3 className="text-white font-bold text-xl mb-4">{plan.name}</h3>

      <div className="space-y-2 mb-5">
        <div className="flex justify-between text-sm">
          <span className="text-white/40">RAM</span>
          <span className="text-white/80">{plan.ram}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/40">CPU</span>
          <span className="text-white/80">{plan.cpu}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/40">Storage</span>
          <span className="text-white/80">{plan.storage}</span>
        </div>
      </div>

      <div className="extra-specs border-t border-white/[0.05] pt-3 mb-4 transition-all">
        {plan.extras.map((e) => (
          <div
            key={e}
            className="flex items-center gap-2 text-xs text-white/50 py-0.5"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
            {e}
          </div>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between">
        <div>
          <span className="text-3xl font-bold text-white">{plan.price}</span>
          <span className="text-white/40 text-sm ml-1">/mo</span>
        </div>
        <button
          type="button"
          data-ocid="plans.primary_button"
          onClick={onDeploy}
          className="btn-premium ripple-effect bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-4 py-2 text-sm font-semibold hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] active:scale-95"
        >
          Deploy
        </button>
      </div>
    </div>
  );
}

function ServerGrid({ onDeploy }: { onDeploy: () => void }) {
  return (
    <section id="plans" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs text-white/40 uppercase tracking-widest font-medium mb-4">
            Pricing
          </p>
          <h2 className="font-bold text-3xl md:text-4xl text-white tracking-tight">
            Choose Your Plan
          </h2>
          <p className="text-white/50 text-base mt-3 max-w-md mx-auto">
            From small communities to enterprise deployments — we have a plan
            for every server.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <PlanCard plan={plan} onDeploy={onDeploy} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Performance ─────────────────────────────────────────────────────────────
function PerformanceSection() {
  return (
    <section className="py-24 px-6 border-t border-white/[0.05]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs text-white/40 uppercase tracking-widest font-medium mb-4">
            Infrastructure
          </p>
          <h2 className="font-bold text-3xl md:text-4xl text-white tracking-tight">
            Built for Performance
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Uptime SLA", end: 99.9, suffix: "%", decimals: 1 },
            { label: "Global Latency", prefix: "<", end: 12, suffix: "ms" },
            { label: "Data Centers", end: 18 },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-center bg-black/30 border border-white/[0.06] rounded-2xl p-8"
            >
              <div className="text-5xl font-bold text-white mb-2">
                <CountUp
                  end={stat.end}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  decimals={stat.decimals ?? 0}
                />
              </div>
              <div className="text-blue-400 text-xs font-medium uppercase tracking-widest">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why DarkSanta ───────────────────────────────────────────────────────────
function WhyDarkSanta() {
  const features = [
    {
      icon: <Zap className="w-5 h-5 text-blue-400" />,
      title: "Instant Deploy",
      desc: "Launch a server in under 30 seconds. No configuration headaches.",
    },
    {
      icon: <Shield className="w-5 h-5 text-blue-400" />,
      title: "DDoS Protected",
      desc: "Multi-layer protection on every node. Your server stays online.",
    },
    {
      icon: <Server className="w-5 h-5 text-blue-400" />,
      title: "Full Control",
      desc: "Complete panel access, custom JARs, mods, plugins — no restrictions.",
    },
    {
      icon: <Headphones className="w-5 h-5 text-blue-400" />,
      title: "24/7 Support",
      desc: "Real humans, not bots. We respond in minutes, not days.",
    },
    {
      icon: <Gamepad2 className="w-5 h-5 text-blue-400" />,
      title: "Game Optimized",
      desc: "Tuned for Minecraft — no lag, pure performance at every tick.",
    },
    {
      icon: <Zap className="w-5 h-5 text-blue-400" />,
      title: "NVMe Storage",
      desc: "Blazing-fast NVMe SSDs ensure instant world loads and saves.",
    },
  ];
  return (
    <section className="py-24 px-6 border-t border-white/[0.05]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs text-white/40 uppercase tracking-widest font-medium mb-4">
            Advantages
          </p>
          <h2 className="font-bold text-3xl md:text-4xl text-white tracking-tight">
            Why DarkSanta
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-hover bg-black/30 border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.12] hover:bg-black/40 transition-colors duration-200"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h3 className="text-white font-semibold mb-2">{f.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Global Presence ─────────────────────────────────────────────────────────
const MAP_NODES = [
  { name: "New York", ping: "9ms", cx: 215, cy: 145 },
  { name: "London", ping: "6ms", cx: 450, cy: 110 },
  { name: "Frankfurt", ping: "8ms", cx: 480, cy: 118 },
  { name: "Singapore", ping: "18ms", cx: 730, cy: 210 },
  { name: "Mumbai", ping: "22ms", cx: 645, cy: 190 },
  { name: "São Paulo", ping: "15ms", cx: 270, cy: 290 },
];

function GlobalPresence() {
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <section className="py-24 px-6 border-t border-white/[0.05]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs text-white/40 uppercase tracking-widest font-medium mb-4">
            Network
          </p>
          <h2 className="font-bold text-3xl md:text-4xl text-white tracking-tight">
            Global Infrastructure
          </h2>
          <p className="text-white/40 text-base mt-3">
            Low-latency nodes across the world
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative bg-black/40 border border-white/[0.08] rounded-2xl overflow-hidden"
        >
          <svg
            viewBox="0 0 960 500"
            className="w-full h-auto"
            style={{ background: "#080810" }}
            aria-label="Global server presence map"
            role="img"
          >
            <title>Global server presence map showing node locations</title>
            <g opacity="0.08" fill="rgba(255,255,255,0.6)">
              <path d="M80 80 L280 70 L310 100 L320 160 L280 200 L240 220 L200 210 L160 240 L130 260 L100 240 L80 180 Z" />
              <path d="M220 250 L290 240 L310 280 L305 350 L280 380 L250 390 L225 360 L210 310 L205 270 Z" />
              <path d="M430 80 L530 75 L545 100 L540 130 L510 145 L480 140 L450 130 L425 110 Z" />
              <path d="M450 145 L530 140 L545 170 L550 230 L530 290 L500 310 L470 305 L450 270 L440 210 L445 170 Z" />
              <path d="M540 70 L820 65 L840 100 L830 140 L800 160 L760 170 L720 165 L680 180 L640 175 L600 165 L560 155 L545 130 L540 100 Z" />
              <path d="M720 260 L800 255 L820 280 L810 310 L780 320 L745 310 L730 290 Z" />
            </g>

            {MAP_NODES.map((node, i) =>
              MAP_NODES.slice(i + 1, i + 3).map((target) => (
                <line
                  key={`${node.name}-${target.name}`}
                  x1={node.cx}
                  y1={node.cy}
                  x2={target.cx}
                  y2={target.cy}
                  stroke="rgba(59,130,246,0.12)"
                  strokeWidth="1"
                  strokeDasharray="4 8"
                />
              )),
            )}

            {MAP_NODES.map((node) => (
              <g
                key={node.name}
                className="cursor-pointer"
                onMouseEnter={() => setHovered(node.name)}
                onMouseLeave={() => setHovered(null)}
              >
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r="10"
                  fill="rgba(59,130,246,0.08)"
                  className="map-dot-pulse"
                />
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r="4"
                  fill="#3B82F6"
                  style={{
                    filter: "drop-shadow(0 0 6px rgba(59,130,246,0.8))",
                  }}
                />
                {hovered === node.name && (
                  <g>
                    <rect
                      x={node.cx - 55}
                      y={node.cy - 36}
                      width="110"
                      height="24"
                      rx="5"
                      fill="rgba(11,11,15,0.9)"
                      stroke="rgba(255,255,255,0.1)"
                    />
                    <text
                      x={node.cx}
                      y={node.cy - 20}
                      textAnchor="middle"
                      fill="white"
                      fontSize="10"
                      fontFamily="Inter, sans-serif"
                    >
                      {node.name} · {node.ping}
                    </text>
                  </g>
                )}
              </g>
            ))}
          </svg>
        </motion.div>
      </div>
    </section>
  );
}

// ─── CTA ─────────────────────────────────────────────────────────────────────
function CTASection({ onDeploy }: { onDeploy: () => void }) {
  return (
    <section className="py-32 px-6 relative overflow-hidden border-t border-white/[0.05]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(59,130,246,0.06), transparent)",
        }}
      />
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs text-white/40 uppercase tracking-widest font-medium mb-6">
            Get Started
          </p>
          <h2 className="font-bold text-4xl md:text-5xl text-white tracking-tight mb-4">
            Ready to Deploy?
          </h2>
          <p className="text-white/50 text-lg mb-10">
            Start your server in under 60 seconds.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              data-ocid="cta.primary_button"
              type="button"
              onClick={onDeploy}
              className="btn-premium ripple-effect bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-8 py-3.5 font-semibold hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] active:scale-95"
            >
              Deploy Now
            </button>
            <button
              data-ocid="cta.secondary_button"
              type="button"
              onClick={() => {
                window.location.hash = "#/login";
              }}
              className="btn-premium bg-white/[0.08] hover:bg-white/[0.14] border border-white/10 text-white rounded-xl px-8 py-3.5 font-semibold active:scale-95"
            >
              Sign In
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function MainSitePage() {
  const [showDeploy, setShowDeploy] = useState(false);
  return (
    <div className="min-h-screen">
      <Navbar onDeploy={() => setShowDeploy(true)} />
      <main className="pb-20">
        <HeroSection onDeploy={() => setShowDeploy(true)} />
        <ServerGrid onDeploy={() => setShowDeploy(true)} />
        <PerformanceSection />
        <WhyDarkSanta />
        <GlobalPresence />
        <CTASection onDeploy={() => setShowDeploy(true)} />
        <MinimalFooter />
      </main>
      <BottomDock />
      {showDeploy && <DeployModal onClose={() => setShowDeploy(false)} />}
    </div>
  );
}
