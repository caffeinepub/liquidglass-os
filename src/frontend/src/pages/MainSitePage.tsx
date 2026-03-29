import { Gamepad2, Headphones, Server, Shield, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import BottomDock from "../components/BottomDock";
import Navbar from "../components/Navbar";

// ─── Stats Panel ─────────────────────────────────────────────────────────────
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
      setValue(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return value;
}

function StatsPanel() {
  const servers = useCounter(847);
  return (
    <motion.div
      data-ocid="hero.card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="mt-12 inline-flex items-center gap-8 bg-white/[0.04] border border-white/[0.08] rounded-2xl px-8 py-5 backdrop-blur-sm"
    >
      <div className="text-center">
        <div className="text-2xl font-bold text-white">99.9%</div>
        <div className="text-xs text-white/40 uppercase tracking-widest mt-1">
          Uptime
        </div>
      </div>
      <div className="w-px h-8 bg-white/10" />
      <div className="text-center">
        <div className="text-2xl font-bold text-white">&lt;12ms</div>
        <div className="text-xs text-white/40 uppercase tracking-widest mt-1">
          Avg Ping
        </div>
      </div>
      <div className="w-px h-8 bg-white/10" />
      <div className="text-center">
        <div className="text-2xl font-bold text-white">{servers}</div>
        <div className="text-xs text-white/40 uppercase tracking-widest mt-1">
          Active Servers
        </div>
      </div>
    </motion.div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const { clientX, clientY, currentTarget } = e;
      const t = currentTarget as HTMLElement;
      const rect = t.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width - 0.5) * 5;
      const y = ((clientY - rect.top) / rect.height - 0.5) * 5;
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
      {/* Grid overlay */}
      <div className="hero-grid absolute inset-0 pointer-events-none" />

      {/* Blue glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(59,130,246,0.15), transparent)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium uppercase tracking-widest px-4 py-2 rounded-full mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 pulse-dot" />
          Next-Gen Minecraft Hosting
        </motion.div>

        <motion.h1
          className="hero-heading font-bold text-5xl md:text-7xl tracking-tight text-white leading-[1.05] transition-transform duration-75"
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
          <a
            data-ocid="hero.primary_button"
            href="#plans"
            className="bg-blue-500 hover:bg-blue-400 text-white rounded-xl px-6 py-3 font-medium transition-all duration-200 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] active:scale-95"
          >
            Deploy Server
          </a>
          <a
            data-ocid="hero.secondary_button"
            href="https://login-o9c.caffeine.xyz/"
            className="bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-xl px-6 py-3 font-medium transition-all duration-200"
          >
            View Dashboard
          </a>
        </motion.div>

        <StatsPanel />
      </div>
    </section>
  );
}

// ─── Plan data ────────────────────────────────────────────────────────────────
const plansByTab: Record<
  string,
  {
    name: string;
    ram: string;
    cpu: string;
    storage: string;
    price: string;
    extras: string[];
  }[]
> = {
  Starter: [
    {
      name: "Dirt Plan",
      ram: "2GB",
      cpu: "2 vCPU",
      storage: "20GB SSD",
      price: "$3",
      extras: ["Basic DDoS protection", "Daily backups", "Community support"],
    },
    {
      name: "Stone Plan",
      ram: "4GB",
      cpu: "3 vCPU",
      storage: "40GB SSD",
      price: "$6",
      extras: ["DDoS protection", "Daily backups", "Email support"],
    },
    {
      name: "Iron Plan",
      ram: "8GB",
      cpu: "4 vCPU",
      storage: "60GB SSD",
      price: "$10",
      extras: ["Advanced DDoS", "Hourly backups", "Priority email support"],
    },
  ],
  Pro: [
    {
      name: "Gold Plan",
      ram: "16GB",
      cpu: "6 vCPU",
      storage: "100GB SSD",
      price: "$18",
      extras: ["Enterprise DDoS", "Hourly backups", "Live chat support"],
    },
    {
      name: "Diamond Plan",
      ram: "32GB",
      cpu: "8 vCPU",
      storage: "200GB SSD",
      price: "$32",
      extras: ["Enterprise DDoS", "Real-time backups", "Dedicated support"],
    },
    {
      name: "Netherite Plan",
      ram: "48GB",
      cpu: "12 vCPU",
      storage: "300GB SSD",
      price: "$48",
      extras: ["Enterprise DDoS", "Real-time backups", "SLA guarantee"],
    },
  ],
  Enterprise: [
    {
      name: "Node Alpha",
      ram: "64GB",
      cpu: "16 vCPU",
      storage: "500GB NVMe",
      price: "$80",
      extras: ["Dedicated DDoS", "Continuous backups", "24/7 SLA support"],
    },
    {
      name: "Node Beta",
      ram: "128GB",
      cpu: "32 vCPU",
      storage: "1TB NVMe",
      price: "$150",
      extras: ["Dedicated DDoS", "Continuous backups", "Account manager"],
    },
    {
      name: "Node Omega",
      ram: "256GB",
      cpu: "64 vCPU",
      storage: "2TB NVMe",
      price: "Custom",
      extras: ["Dedicated infra", "Custom SLA", "White-glove onboarding"],
    },
  ],
};

function PlanCard({ plan }: { plan: (typeof plansByTab)["Starter"][0] }) {
  return (
    <div
      data-ocid="plans.card"
      className="plan-card relative flex flex-col bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 group"
    >
      {/* Status dot */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-white/40 uppercase tracking-widest font-medium">
          Server Plan
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-dot" />
          <span className="text-xs text-emerald-500/80">Online</span>
        </span>
      </div>

      <h3 className="text-white font-bold text-xl mb-4">{plan.name}</h3>

      <div className="space-y-2 mb-6">
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

      {/* Extra specs on hover */}
      <div className="extra-specs border-t border-white/[0.06] pt-3 mb-4">
        {plan.extras.map((e) => (
          <div
            key={e}
            className="flex items-center gap-2 text-xs text-white/50 py-1"
          >
            <span className="w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
            {e}
          </div>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between">
        <div>
          <span className="text-3xl font-bold text-white">{plan.price}</span>
          {plan.price !== "Custom" && (
            <span className="text-white/40 text-sm ml-1">/mo</span>
          )}
        </div>
        <button
          type="button"
          data-ocid="plans.primary_button"
          className="bg-blue-500 hover:bg-blue-400 text-white rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] active:scale-95"
        >
          {plan.price === "Custom" ? "Contact" : "Deploy"}
        </button>
      </div>
    </div>
  );
}

function ServerGrid() {
  const tabs = ["Starter", "Pro", "Enterprise"] as const;
  const [active, setActive] = useState<"Starter" | "Pro" | "Enterprise">(
    "Starter",
  );

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
          <h2 className="font-semibold text-3xl md:text-4xl text-white">
            Choose Your Plan
          </h2>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-center gap-2 mb-10"
        >
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab}
              data-ocid="plans.tab"
              onClick={() => setActive(tab)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                active === tab
                  ? "bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                  : "bg-white/[0.05] text-white/60 hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {plansByTab[active].map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <PlanCard plan={plan} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Performance ─────────────────────────────────────────────────────────────
function PerformanceSection() {
  const stats = [
    {
      value: "99.9%",
      label: "Uptime SLA",
      desc: "Our infrastructure runs on enterprise-grade hardware with full redundancy across every region.",
    },
    {
      value: "<12ms",
      label: "Global Latency",
      desc: "Nodes strategically placed across continents for minimal lag regardless of where your players are.",
    },
    {
      value: "18",
      label: "Data Centers",
      desc: "A global network of tier-3 data centers with 100Gbps interconnects and DDoS scrubbing.",
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
            Infrastructure
          </p>
          <h2 className="font-semibold text-3xl md:text-4xl text-white">
            Built for Performance
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-blue-400 text-sm font-medium uppercase tracking-widest mb-4">
                {stat.label}
              </div>
              <div className="text-white/40 text-sm leading-relaxed">
                {stat.desc}
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
      icon: <Gamepad2 className="w-5 h-5 text-blue-400" />,
      title: "Full Control",
      desc: "Complete panel access, custom JARs, mods, plugins — no restrictions.",
    },
    {
      icon: <Headphones className="w-5 h-5 text-blue-400" />,
      title: "24/7 Support",
      desc: "Real humans, not bots. We respond in minutes, not days.",
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
          <h2 className="font-semibold text-3xl md:text-4xl text-white">
            Why DarkSanta
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.12] hover:bg-white/[0.05] transition-all duration-200"
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

// ─── CTA ─────────────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section
      id="cta"
      className="py-32 px-6 relative overflow-hidden border-t border-white/[0.05]"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(59,130,246,0.08), transparent)",
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
          <p className="text-white/60 text-lg mb-10">
            Join thousands of players running on DarkSanta.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              data-ocid="cta.primary_button"
              href="#plans"
              className="bg-blue-500 hover:bg-blue-400 text-white rounded-xl px-8 py-3 font-medium transition-all duration-200 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] active:scale-95"
            >
              Deploy Your Server
            </a>
            <a
              data-ocid="cta.secondary_button"
              href="https://login-o9c.caffeine.xyz/"
              className="bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-xl px-8 py-3 font-medium transition-all duration-200"
            >
              Talk to Sales
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/[0.05] py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
        <div className="flex items-center gap-2">
          <span className="text-white/60 font-semibold">DarkSanta</span>
          <span>·</span>
          <span>© {year}</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="/privacy" className="hover:text-white/60 transition-colors">
            Privacy
          </a>
          <a href="/terms" className="hover:text-white/60 transition-colors">
            Terms
          </a>
          <a
            href="https://discord.gg/darksanta"
            className="hover:text-white/60 transition-colors"
          >
            Discord
          </a>
        </div>
        <div>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white/60 transition-colors"
          >
            Built with ❤️ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function MainSitePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#050505" }}>
      <Navbar />
      <main className="pb-20">
        <HeroSection />
        <ServerGrid />
        <PerformanceSection />
        <WhyDarkSanta />
        <CTASection />
        <Footer />
      </main>
      <BottomDock />
    </div>
  );
}
