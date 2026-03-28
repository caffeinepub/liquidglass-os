import { Cpu, HardDrive, MemoryStick, Star, Zap } from "lucide-react";
import type React from "react";
import { useRef, useState } from "react";
import SectionRow from "./SectionRow";
import type { ServerCardData } from "./ui/ServerCard";
import { AuroraButton } from "./ui/aurora-button";

function ripple(e: React.MouseEvent<HTMLButtonElement>) {
  const btn = e.currentTarget;
  const circle = document.createElement("span");
  const diameter = Math.max(btn.clientWidth, btn.clientHeight);
  const radius = diameter / 2;
  const rect = btn.getBoundingClientRect();
  circle.style.cssText = `position:absolute;width:${diameter}px;height:${diameter}px;left:${e.clientX - rect.left - radius}px;top:${e.clientY - rect.top - radius}px;border-radius:50%;background:rgba(255,255,255,0.28);transform:scale(0);animation:ripple-anim 0.6s linear;pointer-events:none;z-index:10;`;
  btn.appendChild(circle);
  setTimeout(() => circle.remove(), 600);
}

// ── Data ──────────────────────────────────────────────────────────────────────

const POPULAR_PLANS: ServerCardData[] = [
  {
    name: "Starter",
    badge: "Entry Level",
    badgeColor: "#FF2D55",
    ram: "2 GB RAM",
    cpu: "2 vCPU",
    price: "$5",
    storage: "50 GB SSD",
    iconColor: "#FF2D55",
    glowColor: "rgba(255,45,85,0.15)",
  },
  {
    name: "Pro Minecraft",
    badge: "⭐ Most Popular",
    badgeColor: "#FFD700",
    ram: "8 GB RAM",
    cpu: "4 vCPU",
    price: "$20",
    storage: "200 GB SSD",
    iconColor: "#2A79FF",
    glowColor: "rgba(42,121,255,0.18)",
    popular: true,
  },
  {
    name: "Business",
    badge: "Power User",
    badgeColor: "#7B2FFF",
    ram: "32 GB RAM",
    cpu: "8 vCPU",
    price: "$79",
    storage: "1 TB SSD",
    iconColor: "#7B2FFF",
    glowColor: "rgba(123,47,255,0.15)",
  },
  {
    name: "Dedicated",
    badge: "Enterprise",
    badgeColor: "#00DC64",
    ram: "128 GB RAM",
    cpu: "32 vCPU",
    price: "$299",
    storage: "4 TB NVMe",
    iconColor: "#00DC64",
    glowColor: "rgba(0,220,100,0.15)",
  },
  {
    name: "Ultra",
    badge: "Extreme",
    badgeColor: "#FF6B00",
    ram: "256 GB RAM",
    cpu: "64 vCPU",
    price: "$699",
    storage: "8 TB NVMe",
    iconColor: "#FF6B00",
    glowColor: "rgba(255,107,0,0.15)",
  },
];

const HIGH_PERF_NODES: ServerCardData[] = [
  {
    name: "EU Frankfurt",
    badge: "Low Latency",
    badgeColor: "#00DC64",
    ram: "64 GB RAM",
    cpu: "16 vCPU",
    price: "$49",
    storage: "500 GB NVMe",
    latency: "~1.2ms avg",
    iconColor: "#00DC64",
    glowColor: "rgba(0,220,100,0.15)",
  },
  {
    name: "US New York",
    badge: "High Speed",
    badgeColor: "#2A79FF",
    ram: "64 GB RAM",
    cpu: "16 vCPU",
    price: "$49",
    storage: "500 GB NVMe",
    latency: "~0.9ms avg",
    iconColor: "#2A79FF",
    glowColor: "rgba(42,121,255,0.18)",
  },
  {
    name: "Asia Tokyo",
    badge: "Ultra Fast",
    badgeColor: "#FF2D55",
    ram: "32 GB RAM",
    cpu: "12 vCPU",
    price: "$39",
    storage: "250 GB NVMe",
    latency: "~2.1ms avg",
    iconColor: "#FF2D55",
    glowColor: "rgba(255,45,85,0.15)",
  },
  {
    name: "AU Sydney",
    badge: "Pacific Hub",
    badgeColor: "#BF5FFF",
    ram: "32 GB RAM",
    cpu: "12 vCPU",
    price: "$39",
    storage: "250 GB NVMe",
    latency: "~3.2ms avg",
    iconColor: "#BF5FFF",
    glowColor: "rgba(191,95,255,0.15)",
  },
];

const GLOBAL_LOCATIONS: ServerCardData[] = [
  {
    name: "EU Region",
    flag: "🇪🇺",
    location: "Europe",
    badge: "6 Datacenters",
    badgeColor: "#00DC64",
    ram: "Up to 256 GB",
    cpu: "Up to 64 vCPU",
    price: "From $5",
    latency: "~1.5ms avg",
    iconColor: "#00DC64",
    glowColor: "rgba(0,220,100,0.15)",
  },
  {
    name: "US Region",
    flag: "🇺🇸",
    location: "United States",
    badge: "8 Datacenters",
    badgeColor: "#2A79FF",
    ram: "Up to 256 GB",
    cpu: "Up to 64 vCPU",
    price: "From $5",
    latency: "~0.9ms avg",
    iconColor: "#2A79FF",
    glowColor: "rgba(42,121,255,0.18)",
  },
  {
    name: "Asia Region",
    flag: "🌏",
    location: "Asia Pacific",
    badge: "5 Datacenters",
    badgeColor: "#FF2D55",
    ram: "Up to 128 GB",
    cpu: "Up to 32 vCPU",
    price: "From $5",
    latency: "~2.5ms avg",
    iconColor: "#FF2D55",
    glowColor: "rgba(255,45,85,0.15)",
  },
  {
    name: "Oceania",
    flag: "🇦🇺",
    location: "Australia",
    badge: "3 Datacenters",
    badgeColor: "#BF5FFF",
    ram: "Up to 128 GB",
    cpu: "Up to 32 vCPU",
    price: "From $5",
    latency: "~3.2ms avg",
    iconColor: "#BF5FFF",
    glowColor: "rgba(191,95,255,0.15)",
  },
];

// ── Featured Banner ────────────────────────────────────────────────────────────

function FeaturedBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = bannerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setGlowPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      ref={bannerRef}
      className="relative overflow-hidden rounded-3xl mb-12 fade-up"
      style={{
        background:
          "linear-gradient(135deg, rgba(42,121,255,0.08) 0%, rgba(8,10,24,0.65) 40%, rgba(123,47,255,0.06) 100%)",
        border: "1px solid rgba(42,121,255,0.22)",
        boxShadow:
          "0 0 60px rgba(42,121,255,0.12), 0 20px 60px rgba(0,0,0,0.4)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
      onMouseMove={handleMouseMove}
      data-ocid="featured.banner"
    >
      {/* Mouse glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(42,121,255,0.12) 0%, transparent 70%)",
          transform: `translate(calc(${glowPos.x}% - 200px), calc(${glowPos.y}% - 200px))`,
          transition: "transform 0.1s ease",
          pointerEvents: "none",
        }}
      />

      {/* Top gradient accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, #2A79FF, #7B2FFF, transparent)",
          boxShadow: "0 0 20px rgba(42,121,255,0.6)",
        }}
      />

      <div className="flex flex-col md:flex-row items-center gap-8 p-8 md:p-12">
        {/* Left content */}
        <div className="flex-1">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4"
            style={{
              background: "rgba(255,215,0,0.12)",
              border: "1px solid rgba(255,215,0,0.35)",
              color: "#FFD700",
            }}
          >
            <Star className="w-3 h-3" fill="#FFD700" />
            Featured Plan
          </div>

          <h2
            className="text-3xl md:text-4xl font-black tracking-tight mb-2"
            style={{ color: "#F4F7FF" }}
          >
            Pro Minecraft
          </h2>
          <p className="text-sm mb-5" style={{ color: "#B9C3DA" }}>
            Our most popular plan — optimized for large multiplayer worlds,
            custom modpacks, and always-on performance.
          </p>

          {/* Specs row */}
          <div className="flex flex-wrap gap-4 mb-6">
            {[
              { icon: Cpu, label: "4 vCPU", color: "#FF2D55" },
              { icon: MemoryStick, label: "8 GB RAM", color: "#2A79FF" },
              { icon: HardDrive, label: "200 GB SSD", color: "#7B2FFF" },
              { icon: Zap, label: "5 TB BW", color: "#00DC64" },
            ].map(({ icon: Icon, label, color }) => (
              <div key={label} className="flex items-center gap-1.5">
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center"
                  style={{ background: `${color}22` }}
                >
                  <Icon className="w-3 h-3" style={{ color }} />
                </div>
                <span className="text-sm" style={{ color: "#B9C3DA" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <div className="flex items-baseline gap-1">
              <span
                className="text-4xl font-black tracking-tight"
                style={{
                  background: "linear-gradient(135deg, #2A79FF, #7B2FFF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                $20
              </span>
              <span className="text-sm" style={{ color: "#7E8AA8" }}>
                /mo
              </span>
            </div>
            <AuroraButton
              variant="default"
              size="md"
              data-ocid="featured.deploy.primary_button"
              onClick={ripple as React.MouseEventHandler<HTMLButtonElement>}
            >
              🚀 Deploy Now
            </AuroraButton>
          </div>
        </div>

        {/* Right: decorative animated server visual */}
        <div
          className="hidden md:flex flex-col items-center justify-center gap-3 flex-shrink-0"
          style={{ minWidth: 220 }}
        >
          <div
            className="glass-card glass-card-premium p-5 text-center w-full card-float card-float-delay-2"
            style={{
              background: "rgba(42,121,255,0.06)",
              border: "1px solid rgba(42,121,255,0.2)",
            }}
          >
            <div className="text-3xl mb-2">⚡</div>
            <div className="text-sm font-bold" style={{ color: "#2A79FF" }}>
              Instant Boot
            </div>
            <div className="text-xs mt-1" style={{ color: "#B9C3DA" }}>
              ~3 second deploy
            </div>
          </div>
          <div
            className="glass-card glass-card-premium p-5 text-center w-full card-float card-float-delay-3"
            style={{
              background: "rgba(0,220,100,0.06)",
              border: "1px solid rgba(0,220,100,0.2)",
            }}
          >
            <div className="text-3xl mb-2">🛡️</div>
            <div className="text-sm font-bold" style={{ color: "#00DC64" }}>
              DDoS Shield
            </div>
            <div className="text-xs mt-1" style={{ color: "#B9C3DA" }}>
              Always-on protection
            </div>
          </div>
          <div
            className="glass-card glass-card-premium p-5 text-center w-full card-float card-float-delay-1"
            style={{
              background: "rgba(255,45,85,0.06)",
              border: "1px solid rgba(255,45,85,0.2)",
            }}
          >
            <div className="text-3xl mb-2">🌍</div>
            <div className="text-sm font-bold" style={{ color: "#FF2D55" }}>
              Global Network
            </div>
            <div className="text-xs mt-1" style={{ color: "#B9C3DA" }}>
              180+ edge nodes
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Cards Component ────────────────────────────────────────────────────────

export default function Cards() {
  return (
    <section className="py-16 px-4" data-ocid="plans.section">
      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <div className="flex items-center justify-between mb-8 fade-up">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-pill text-xs font-semibold mb-2"
              style={{
                background: "rgba(42,121,255,0.1)",
                border: "1px solid rgba(42,121,255,0.25)",
                color: "#7BA8FF",
              }}
            >
              Minecraft Server Plans
            </div>
            <h2
              className="text-2xl md:text-3xl font-extrabold tracking-tight"
              style={{ color: "#F4F7FF" }}
            >
              Choose Your Server
            </h2>
          </div>
        </div>

        {/* OTT Featured Banner */}
        <FeaturedBanner />

        {/* Section rows */}
        <SectionRow title="🔥 Popular Plans" cards={POPULAR_PLANS} />
        <SectionRow title="⚡ High Performance Nodes" cards={HIGH_PERF_NODES} />
        <SectionRow title="🌍 Global Locations" cards={GLOBAL_LOCATIONS} />
      </div>
    </section>
  );
}
