import { Activity, ArrowRight, Cpu, Gauge, Zap } from "lucide-react";
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
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(target), 300);
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div
      ref={ref}
      className="h-1.5 rounded-full overflow-hidden"
      style={{ background: "rgba(255,255,255,0.07)" }}
    >
      <div
        className="metric-bar-fill"
        style={{
          width: `${width}%`,
          background: `linear-gradient(90deg, ${color}, ${color}99)`,
          boxShadow: `0 0 12px ${color}90`,
        }}
      />
    </div>
  );
}

function ServerMetricCard({
  className,
  style,
  icon: Icon,
  title,
  value,
  sub,
  barValue,
  barColor,
  iconColor,
}: {
  className?: string;
  style?: React.CSSProperties;
  icon: React.ElementType;
  title: string;
  value: string;
  sub?: string;
  barValue?: number;
  barColor?: string;
  iconColor?: string;
}) {
  return (
    <div
      className={`glass-card glass-card-premium p-4 w-[170px] sm:w-[190px] ${className ?? ""}`}
      style={style}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="icon-chip w-8 h-8 rounded-xl">
          <Icon className="w-4 h-4" style={{ color: iconColor ?? "#FF2D55" }} />
        </div>
        <span className="text-xs font-medium" style={{ color: "#B9C3DA" }}>
          {title}
        </span>
      </div>
      <div
        className="text-xl font-bold tracking-tight mb-1"
        style={{ color: "#F4F7FF" }}
      >
        {value}
      </div>
      {sub && (
        <div
          className="text-xs font-medium mb-2"
          style={{ color: iconColor ?? "#FF2D55" }}
        >
          {sub}
        </div>
      )}
      {barValue !== undefined && barColor && (
        <AnimatedBar target={barValue} color={barColor} />
      )}
    </div>
  );
}

export default function Hero() {
  const panelsRef = useRef<HTMLDivElement>(null);
  const [showDiscord, setShowDiscord] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (panelsRef.current) {
        panelsRef.current.style.transform = `translateY(${scrollY * 0.12}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-20 px-4">
      {/* Background glow — blue + purple + pink */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 20% 80%, rgba(255,45,85,0.1) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 20%, rgba(42,121,255,0.12) 0%, transparent 60%), radial-gradient(ellipse 40% 30% at 50% 10%, rgba(139,92,246,0.1) 0%, transparent 60%), radial-gradient(ellipse 30% 25% at 85% 80%, rgba(236,72,153,0.08) 0%, transparent 55%)",
        }}
      />

      {/* Floating server metric cards */}
      <div
        ref={panelsRef}
        className="relative w-full max-w-4xl flex justify-center items-end gap-4 mb-[-40px] z-10 px-4"
        style={{ transition: "transform 0.1s linear" }}
      >
        <ServerMetricCard
          icon={Cpu}
          title="CPU Usage"
          value="23%"
          sub="4 vCPU active"
          barValue={23}
          barColor="#FF2D55"
          iconColor="#FF2D55"
          className="fade-up fade-up-delay-1 hidden sm:block card-float card-float-delay-1"
          style={{ transform: "rotate(-3deg) translateY(10px)" }}
        />
        <ServerMetricCard
          icon={Activity}
          title="RAM"
          value="4.2 / 8 GB"
          sub="52% utilized"
          barValue={52}
          barColor="#2A79FF"
          iconColor="#2A79FF"
          className="fade-up fade-up-delay-2 scale-110 card-float card-float-delay-2"
          style={{ zIndex: 2 }}
        />
        <ServerMetricCard
          icon={Gauge}
          title="Latency"
          value="1.2ms"
          sub="Frankfurt, DE"
          barValue={12}
          barColor="#7B2FFF"
          iconColor="#7B2FFF"
          className="fade-up fade-up-delay-3 hidden sm:block card-float card-float-delay-3"
          style={{ transform: "rotate(3deg) translateY(10px)" }}
        />
      </div>

      {/* Main hero card — glass-ultra + glass-card-premium */}
      <div
        className="glass-card glass-ultra glass-card-premium w-full max-w-3xl p-8 md:p-14 text-center z-20 fade-up"
        data-ocid="hero.card"
        style={{
          background:
            "linear-gradient(135deg, rgba(42,121,255,0.04) 0%, rgba(8,10,24,0.42) 40%, rgba(139,92,246,0.03) 70%, rgba(34,211,238,0.02) 100%)",
        }}
      >
        {/* Badge pill */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill text-xs font-semibold mb-6"
          style={{
            background: "rgba(255,45,85,0.12)",
            border: "1px solid rgba(255,45,85,0.28)",
            color: "#FF6B7A",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{
              background: "#FF2D55",
              boxShadow: "0 0 8px #FF2D55",
            }}
          />
          Instant Deploy — 99.9% Uptime
        </div>

        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.05] tracking-[-0.02em] mb-6"
          style={{ color: "#F4F7FF" }}
        >
          High Performance <br className="hidden sm:block" />
          Minecraft Servers{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #FF6B7A, #2A79FF, #7B2FFF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Deploy in Seconds.
          </span>
        </h1>

        <p
          className="text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-8"
          style={{ color: "#B9C3DA" }}
        >
          Buy powerful Minecraft nodes with instant deploy. DDoS protection,
          custom mods, and global locations.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary button with glow halo */}
          <div style={{ position: "relative" }}>
            {/* Glow halo behind button */}
            <div
              style={{
                position: "absolute",
                inset: "-8px",
                background: "rgba(42,121,255,0.2)",
                filter: "blur(20px)",
                borderRadius: "999px",
                zIndex: -1,
                opacity: btnHovered ? 1 : 0,
                transition: "opacity 0.2s ease-in-out",
                pointerEvents: "none",
              }}
            />
            <button
              type="button"
              className="btn-glow flex items-center gap-2 px-8 py-3.5 rounded-pill text-sm font-bold w-full sm:w-auto justify-center"
              data-ocid="hero.cta.primary_button"
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
              onClick={(e) => {
                ripple(e);
                setShowDiscord((v) => !v);
              }}
            >
              <Zap className="w-4 h-4" fill="currentColor" />
              Buy Server
            </button>
            {showDiscord && (
              <DiscordPopup onClose={() => setShowDiscord(false)} />
            )}
          </div>
          <button
            type="button"
            className="btn-glass flex items-center gap-2 px-8 py-3.5 rounded-pill text-sm font-semibold w-full sm:w-auto justify-center"
            data-ocid="hero.cta.secondary_button"
            onClick={ripple}
          >
            View Plans
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Trust badges */}
        <div
          className="flex flex-wrap items-center justify-center gap-6 mt-8 pt-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          {(
            [
              "Instant Deploy",
              "99.9% Uptime",
              "180+ Minecraft Nodes",
              "DDoS Protected",
            ] as string[]
          ).map((badge) => (
            <div
              key={badge}
              className="flex items-center gap-1.5 text-sm font-medium"
              style={{ color: "#FF6B7A" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#FF2D55", boxShadow: "0 0 6px #FF2D55" }}
              />
              {badge}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
