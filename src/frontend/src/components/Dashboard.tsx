import { RefreshCw, Shield, Terminal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { GlowCard } from "./ui/spotlight-card";

function AnimatedMetricBar({
  label,
  value,
  displayValue,
  color,
}: {
  label: string;
  value: number;
  displayValue: string;
  color: string;
}) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(value), 400);
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref}>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[12px] font-medium" style={{ color: "#B9C3DA" }}>
          {label}
        </span>
        <span className="text-[12px] font-bold" style={{ color }}>
          {displayValue}
        </span>
      </div>
      <div
        className="h-2.5 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.07)" }}
      >
        <div
          className="metric-bar-fill"
          style={{
            width: `${width}%`,
            background: `linear-gradient(90deg, ${color}, ${color}bb)`,
            boxShadow: `0 0 14px ${color}90, 0 0 28px ${color}40`,
          }}
        />
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <section className="py-20 px-4" data-ocid="dashboard.section">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12 fade-up">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill text-xs font-semibold mb-4"
            style={{
              background: "rgba(42,121,255,0.12)",
              border: "1px solid rgba(42,121,255,0.25)",
              color: "#2A79FF",
            }}
          >
            Control Panel
          </div>
          <h2
            className="text-3xl md:text-4xl font-extrabold tracking-tight"
            style={{ color: "#F4F7FF" }}
          >
            Manage Your Servers
          </h2>
          <p
            className="mt-3 text-base max-w-lg mx-auto"
            style={{ color: "#B9C3DA" }}
          >
            Full control from a powerful glass dashboard
          </p>
        </div>

        {/* Dashboard panel — glass-ultra for max depth */}
        <div
          className="neon-border rounded-3xl fade-up"
          style={{ borderRadius: "24px" }}
          data-ocid="dashboard.panel"
        >
          <div
            className="glass-ultra rounded-3xl overflow-hidden"
            style={{
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <div className="p-5 md:p-8">
              {/* Server header */}
              <div
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{
                      background: "rgba(34,230,255,0.12)",
                      border: "1px solid rgba(34,230,255,0.28)",
                      boxShadow: "0 0 20px rgba(34,230,255,0.2)",
                    }}
                  >
                    <Terminal
                      className="w-5 h-5"
                      style={{ color: "#22E6FF" }}
                    />
                  </div>
                  <div>
                    <div
                      className="text-base font-bold"
                      style={{ color: "#F4F7FF" }}
                    >
                      mc-01.darksanta.gg
                    </div>
                    <div
                      className="text-xs mt-0.5"
                      style={{ color: "#7E8AA8" }}
                    >
                      Uptime: 99d 14h 22m
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center gap-2 px-3 py-1.5 rounded-pill text-xs font-bold"
                    style={{
                      background: "rgba(0,255,163,0.10)",
                      border: "1px solid rgba(0,255,163,0.35)",
                      color: "#00FFA3",
                      boxShadow: "0 0 16px rgba(0,255,163,0.2)",
                    }}
                    data-ocid="dashboard.status.panel"
                  >
                    <span
                      className="online-ping"
                      style={{ width: 8, height: 8, display: "inline-block" }}
                    >
                      <span
                        style={{
                          display: "block",
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: "#00FFA3",
                          boxShadow: "0 0 10px #00FFA3",
                          position: "relative",
                          zIndex: 1,
                        }}
                      />
                    </span>
                    Online
                  </div>
                  <div
                    className="px-3 py-1.5 rounded-pill text-xs font-medium"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "#B9C3DA",
                    }}
                  >
                    Frankfurt, DE 🇩🇪
                  </div>
                </div>
              </div>

              {/* Metric panels */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <GlowCard
                  customSize={true}
                  glowColor="blue"
                  className="w-full p-4"
                >
                  <div
                    className="text-xs font-semibold mb-4"
                    style={{ color: "#B9C3DA" }}
                  >
                    Resource Usage
                  </div>
                  <div className="flex flex-col gap-4">
                    <AnimatedMetricBar
                      label="CPU"
                      value={34}
                      displayValue="34%"
                      color="#22E6FF"
                    />
                    <AnimatedMetricBar
                      label="RAM"
                      value={72}
                      displayValue="5.8 / 8 GB"
                      color="#2A79FF"
                    />
                    <AnimatedMetricBar
                      label="Disk"
                      value={42}
                      displayValue="210 / 500 GB"
                      color="#B14CFF"
                    />
                  </div>
                </GlowCard>

                {/* Network stats */}
                <GlowCard
                  customSize={true}
                  glowColor="purple"
                  className="w-full p-4"
                >
                  <div
                    className="text-xs font-semibold mb-4"
                    style={{ color: "#B9C3DA" }}
                  >
                    Network I/O
                  </div>
                  <div className="flex flex-col gap-4">
                    <div>
                      <div
                        className="text-[11px] font-medium mb-1"
                        style={{ color: "#7E8AA8" }}
                      >
                        Inbound
                      </div>
                      <div
                        className="text-2xl font-bold"
                        style={{
                          color: "#22E6FF",
                          textShadow: "0 0 20px rgba(34,230,255,0.5)",
                        }}
                      >
                        1.2 GB/s
                      </div>
                    </div>
                    <div
                      style={{
                        borderTop: "1px solid rgba(255,255,255,0.06)",
                        paddingTop: 12,
                      }}
                    >
                      <div
                        className="text-[11px] font-medium mb-1"
                        style={{ color: "#7E8AA8" }}
                      >
                        Outbound
                      </div>
                      <div
                        className="text-2xl font-bold"
                        style={{
                          color: "#B14CFF",
                          textShadow: "0 0 20px rgba(177,76,255,0.5)",
                        }}
                      >
                        340 MB/s
                      </div>
                    </div>
                  </div>
                </GlowCard>

                {/* Quick actions */}
                <GlowCard
                  customSize={true}
                  glowColor="blue"
                  className="w-full p-4"
                >
                  <div
                    className="text-xs font-semibold mb-4"
                    style={{ color: "#B9C3DA" }}
                  >
                    Quick Actions
                  </div>
                  <div className="flex flex-col gap-3">
                    {[
                      { icon: RefreshCw, label: "Restart", color: "#22E6FF" },
                      { icon: Terminal, label: "Console", color: "#2A79FF" },
                      { icon: Shield, label: "Firewall", color: "#B14CFF" },
                    ].map(({ icon: Icon, label, color }) => (
                      <button
                        key={label}
                        type="button"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.10)",
                          color: "#B9C3DA",
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLButtonElement;
                          el.style.borderColor = `${color}55`;
                          el.style.color = color;
                          el.style.boxShadow = `0 0 18px ${color}30`;
                          el.style.transform = "scale(1.02)";
                          el.style.background = `${color}0d`;
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLButtonElement;
                          el.style.borderColor = "rgba(255,255,255,0.10)";
                          el.style.color = "#B9C3DA";
                          el.style.boxShadow = "none";
                          el.style.transform = "";
                          el.style.background = "rgba(255,255,255,0.05)";
                        }}
                        data-ocid={`dashboard.${label.toLowerCase()}.button`}
                      >
                        <Icon className="w-4 h-4" />
                        {label}
                      </button>
                    ))}
                  </div>
                </GlowCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
