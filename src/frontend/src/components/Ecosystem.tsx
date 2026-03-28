import { Globe, Headphones, Server, Shield } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AuroraButton } from "./ui/aurora-button";
import { GlowCard } from "./ui/spotlight-card";

const STATS = [
  {
    icon: Server,
    label: "Servers Deployed",
    color: "#22E6FF",
    glow: "rgba(34,230,255,0.20)",
    glowKey: "blue" as const,
    display: "50,000+",
  },
  {
    icon: Shield,
    label: "Uptime",
    color: "#00FFA3",
    glow: "rgba(0,255,163,0.20)",
    glowKey: "green" as const,
    display: "99.99%",
  },
  {
    icon: Globe,
    label: "Global Locations",
    color: "#B14CFF",
    glow: "rgba(177,76,255,0.20)",
    glowKey: "purple" as const,
    display: "180+",
  },
  {
    icon: Headphones,
    label: "Expert Support",
    color: "#22E6FF",
    glow: "rgba(34,230,255,0.20)",
    glowKey: "blue" as const,
    display: "24/7",
  },
];

function StatCard({
  icon: Icon,
  display,
  label,
  color,
  glow,
  glowKey,
  index,
}: {
  icon: React.ElementType;
  display: string;
  label: string;
  color: string;
  glow: string;
  glowKey: "blue" | "green" | "purple";
  index: number;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const floatDelay = `card-float-delay-${(index % 4) + 1}`;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <GlowCard
      customSize={true}
      glowColor={glowKey}
      className={`eco-chip fade-up fade-up-delay-${index + 1} card-float ${floatDelay} flex flex-col items-center gap-3 p-6 w-full`}
      data-ocid={`stats.item.${index + 1}`}
    >
      <div
        ref={ref}
        style={{
          opacity: visible ? undefined : 0,
          transition: "opacity 0.5s ease",
          display: "contents",
        }}
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{
            background: glow,
            border: `1px solid ${color}33`,
            boxShadow: `0 0 24px ${glow}`,
          }}
        >
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
        <div
          className="text-3xl font-black tracking-tight"
          style={{
            background: `linear-gradient(135deg, ${color}, #2A79FF)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: `drop-shadow(0 0 8px ${color}60)`,
          }}
        >
          {display}
        </div>
        <span
          className="text-sm font-semibold text-center"
          style={{ color: "#B9C3DA" }}
        >
          {label}
        </span>
      </div>
    </GlowCard>
  );
}

export default function Ecosystem() {
  return (
    <section className="py-20 px-4" data-ocid="stats.section">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12 fade-up">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill text-xs font-semibold mb-4"
            style={{
              background: "rgba(34,230,255,0.10)",
              border: "1px solid rgba(34,230,255,0.22)",
              color: "#22E6FF",
            }}
          >
            Platform Stats
          </div>
          <h2
            className="text-3xl md:text-4xl font-extrabold tracking-tight"
            style={{ color: "#F4F7FF" }}
          >
            Trusted by Minecraft Players Worldwide
          </h2>
          <p
            className="mt-3 text-base max-w-lg mx-auto"
            style={{ color: "#B9C3DA" }}
          >
            Premium Minecraft hosting trusted by thousands of players and server
            owners worldwide.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((stat, i) => (
            <StatCard
              key={stat.label}
              icon={stat.icon}
              display={stat.display}
              label={stat.label}
              color={stat.color}
              glow={stat.glow}
              glowKey={stat.glowKey}
              index={i}
            />
          ))}
        </div>

        {/* CTA strip */}
        <div className="mt-14 fade-up">
          <div
            className="glass-card p-8 text-center"
            style={{ background: "rgba(10, 14, 32, 0.6)" }}
          >
            <h3
              className="text-2xl font-bold tracking-tight mb-3"
              style={{ color: "#F4F7FF" }}
            >
              Ready to launch your Minecraft server?
            </h3>
            <p
              className="text-sm mb-6 max-w-sm mx-auto"
              style={{ color: "#B9C3DA" }}
            >
              Deploy your Minecraft server in under 60 seconds. Custom mods,
              instant provisioning.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <AuroraButton
                variant="default"
                size="md"
                data-ocid="stats.cta.primary_button"
              >
                Deploy Now
              </AuroraButton>
              <AuroraButton
                variant="blue"
                size="md"
                data-ocid="stats.cta.secondary_button"
              >
                View Pricing
              </AuroraButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
