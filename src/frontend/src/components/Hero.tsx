import { Activity, Cpu, Gauge, Play, ShieldCheck, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import DiscordPopup from "./DiscordPopup";

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

function AnimatedBar({ target, color }: { target: number; color: string }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTimeout(() => setWidth(target), 300);
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div
      ref={ref}
      className="h-1 rounded-full overflow-hidden"
      style={{ background: "rgba(255,255,255,0.07)" }}
    >
      <div
        className="metric-bar-fill"
        style={{
          width: `${width}%`,
          background: `linear-gradient(90deg, ${color}, ${color}99)`,
          boxShadow: `0 0 10px ${color}90`,
        }}
      />
    </div>
  );
}

function FloatingStat({
  icon: Icon,
  title,
  value,
  sub,
  barValue,
  barColor,
  iconColor,
  className,
  style,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  sub: string;
  barValue?: number;
  barColor?: string;
  iconColor: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`glass-card glass-card-premium p-4 w-[180px] ${className ?? ""}`}
      style={style}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="icon-chip w-7 h-7 rounded-xl">
          <Icon className="w-3.5 h-3.5" style={{ color: iconColor }} />
        </div>
        <span className="text-xs font-medium" style={{ color: "#B9C3DA" }}>
          {title}
        </span>
      </div>
      <div
        className="text-lg font-bold tracking-tight mb-0.5"
        style={{ color: "#F4F7FF" }}
      >
        {value}
      </div>
      <div className="text-xs font-medium mb-2" style={{ color: iconColor }}>
        {sub}
      </div>
      {barValue !== undefined && barColor && (
        <AnimatedBar target={barValue} color={barColor} />
      )}
    </div>
  );
}

const TRUST_BADGES = [
  { label: "Instant Deploy", color: "#FF2D55" },
  { label: "99.9% Uptime", color: "#00DC64" },
  { label: "DDoS Protected", color: "#2A79FF" },
  { label: "180+ Nodes", color: "#7B2FFF" },
];

export default function Hero() {
  const [showDiscord, setShowDiscord] = useState(false);

  return (
    <section
      className="relative min-h-screen flex items-center pt-24 pb-20 px-4 overflow-hidden"
      data-ocid="hero.section"
    >
      {/* Cinematic multi-layer background */}
      <div className="cinematic-bg">
        <img
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&q=85"
          alt=""
          aria-hidden="true"
          className="cinematic-bg-img"
        />
        <div className="cinematic-overlay-lr" />
        <div className="cinematic-vignette" />
        <div className="cinematic-overlay-bottom" />
        <div
          className="absolute inset-0 pointer-events-none z-[5]"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 80% 40%, rgba(34,211,238,0.07) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 15% 60%, rgba(255,45,85,0.06) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-12 lg:gap-16">
          {/* ── LEFT: Content ── */}
          <div
            className="flex-1 flex flex-col justify-center fade-up"
            style={{ maxWidth: 620 }}
          >
            {/* Live badge */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pill text-xs font-bold mb-6 self-start"
              style={{
                background: "rgba(255,45,85,0.12)",
                border: "1px solid rgba(255,45,85,0.3)",
                color: "#FF6B7A",
              }}
              data-ocid="hero.live.badge"
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "#FF2D55", boxShadow: "0 0 8px #FF2D55" }}
              />
              🔴 LIVE · 247 Servers Online
            </div>

            {/* Title */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-[-0.02em] mb-4"
              style={{ color: "#F4F7FF" }}
              data-ocid="hero.title"
            >
              High Performance <br className="hidden sm:block" />
              Minecraft Servers
            </h1>

            {/* Gradient subtitle */}
            <div
              className="text-3xl sm:text-4xl font-extrabold mb-5 tracking-tight"
              style={{
                background:
                  "linear-gradient(135deg, #FF2D55 0%, #2A79FF 50%, #00DC64 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Deploy in Seconds.
            </div>

            {/* Description */}
            <p
              className="text-base md:text-lg leading-relaxed mb-8 max-w-lg"
              style={{ color: "#B9C3DA" }}
            >
              Launch powerful Minecraft servers with instant deploy, DDoS
              protection, and full control. Global nodes, custom mods, and 99.9%
              uptime.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
              <div style={{ position: "relative" }}>
                <button
                  type="button"
                  data-ocid="hero.deploy.primary_button"
                  onClick={(e) => {
                    ripple(e as React.MouseEvent<HTMLButtonElement>);
                    setShowDiscord((v) => !v);
                  }}
                  className="btn-glow relative overflow-hidden inline-flex items-center gap-2 px-6 py-2.5 h-11 rounded-full text-sm font-bold"
                >
                  🚀 Deploy Server
                </button>
                {showDiscord && (
                  <DiscordPopup onClose={() => setShowDiscord(false)} />
                )}
              </div>

              <button
                type="button"
                data-ocid="hero.dashboard.secondary_button"
                onClick={ripple as React.MouseEventHandler<HTMLButtonElement>}
                className="btn-glass relative overflow-hidden inline-flex items-center gap-2 px-6 py-2.5 h-11 rounded-full text-sm font-bold"
              >
                📊 Dashboard
              </button>
            </div>

            {/* Trust row */}
            <div
              className="flex flex-wrap items-center gap-5 pt-5"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
              {TRUST_BADGES.map((b) => (
                <div
                  key={b.label}
                  className="flex items-center gap-1.5 text-sm font-medium"
                  style={{ color: b.color }}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {b.label}
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Stats + Play button ── */}
          <div
            className="hidden lg:flex flex-col items-center justify-center gap-4 flex-shrink-0 fade-up"
            style={{ minWidth: 260, position: "relative" }}
          >
            <FloatingStat
              icon={Cpu}
              title="CPU Usage"
              value="23%"
              sub="4 vCPU active"
              barValue={23}
              barColor="#FF2D55"
              iconColor="#FF2D55"
              className="card-float card-float-delay-1 self-start"
              style={{ transform: "rotate(-3deg) translateX(-20px)" }}
            />

            {/* Large circular play button */}
            <button
              type="button"
              className="relative flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 card-float card-float-delay-2"
              style={{
                width: 88,
                height: 88,
                background: "rgba(34,211,238,0.08)",
                border: "2px solid rgba(34,211,238,0.45)",
                boxShadow:
                  "0 0 32px rgba(34,211,238,0.35), 0 0 60px rgba(34,211,238,0.15), inset 0 1px 0 rgba(255,255,255,0.15)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
              data-ocid="hero.explore.button"
              aria-label="Explore servers"
            >
              <Play
                className="w-9 h-9"
                style={{
                  color: "#22D3EE",
                  filter: "drop-shadow(0 0 8px #22D3EE)",
                  marginLeft: 4,
                }}
                fill="#22D3EE"
              />
              <span
                className="absolute inset-0 rounded-full animate-ping"
                style={{
                  border: "1px solid rgba(34,211,238,0.3)",
                  animationDuration: "2s",
                }}
              />
            </button>

            <FloatingStat
              icon={Activity}
              title="RAM"
              value="4.2 / 8 GB"
              sub="52% utilized"
              barValue={52}
              barColor="#2A79FF"
              iconColor="#2A79FF"
              className="card-float card-float-delay-3 self-end"
              style={{ transform: "rotate(3deg) translateX(20px)" }}
            />

            <FloatingStat
              icon={Gauge}
              title="Latency"
              value="1.2ms"
              sub="Frankfurt, DE"
              barValue={12}
              barColor="#7B2FFF"
              iconColor="#7B2FFF"
              className="card-float card-float-delay-4 self-start"
              style={{ transform: "rotate(-2deg) translateX(-10px)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
