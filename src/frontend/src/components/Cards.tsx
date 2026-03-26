import { Cpu, Globe, HardDrive, MemoryStick, Zap } from "lucide-react";
import type React from "react";
import { useRef } from "react";
import { MetalButton } from "./ui/liquid-glass-button";

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

const PLANS = [
  {
    name: "Starter",
    price: "$5",
    period: "/mo",
    vcpu: "2 vCPU",
    ram: "2 GB RAM",
    storage: "50 GB SSD",
    bandwidth: "1 TB Bandwidth",
    iconColor: "#FF2D55",
    glowColor: "rgba(255,45,85,0.15)",
    glowKey: "red" as const,
    popular: false,
  },
  {
    name: "Pro",
    price: "$20",
    period: "/mo",
    vcpu: "4 vCPU",
    ram: "8 GB RAM",
    storage: "200 GB SSD",
    bandwidth: "5 TB Bandwidth",
    iconColor: "#2A79FF",
    glowColor: "rgba(42,121,255,0.2)",
    glowKey: "blue" as const,
    popular: true,
    popularBorder: "rgba(42,121,255,0.45)",
  },
  {
    name: "Business",
    price: "$79",
    period: "/mo",
    vcpu: "8 vCPU",
    ram: "32 GB RAM",
    storage: "1 TB SSD",
    bandwidth: "Unlimited BW",
    iconColor: "#7B2FFF",
    glowColor: "rgba(123,47,255,0.15)",
    glowKey: "purple" as const,
    popular: false,
  },
  {
    name: "Dedicated",
    price: "$299",
    period: "/mo",
    vcpu: "32 vCPU",
    ram: "128 GB RAM",
    storage: "4 TB NVMe",
    bandwidth: "Unlimited BW",
    iconColor: "#FF2D55",
    glowColor: "rgba(255,45,85,0.12)",
    glowKey: "orange" as const,
    popular: false,
    gradientPrice: true,
  },
];

function PlanCard({
  plan,
  index,
}: {
  plan: (typeof PLANS)[0] & { popularBorder?: string; gradientPrice?: boolean };
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const floatDelay = `card-float-delay-${(index % 4) + 1}`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -8;
    const rotY = ((x - cx) / cx) * 8;
    card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "";
  };

  return (
    <div
      className={`w-full glass-card glass-card-premium fade-up fade-up-delay-${index + 1} card-float ${floatDelay}`}
      data-ocid={`plans.item.${index + 1}`}
    >
      {/* Colored top halo line */}
      <div
        className="plan-halo"
        style={{
          background: `linear-gradient(90deg, transparent, ${plan.iconColor}80, transparent)`,
          boxShadow: `0 0 20px ${plan.iconColor}40`,
        }}
      />
      <div
        ref={cardRef}
        className="p-6 md:p-8 relative w-full h-full"
        style={{
          cursor: "default",
          border: plan.popular
            ? `1px solid ${"popularBorder" in plan ? plan.popularBorder : "rgba(42,121,255,0.45)"}`
            : undefined,
          boxShadow: plan.popular
            ? "0 0 40px rgba(42,121,255,0.2), 0 0 70px rgba(123,47,255,0.1), inset 0 1px 0 rgba(42,121,255,0.12)"
            : undefined,
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {plan.popular && (
          <div
            className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[11px] font-bold"
            style={{
              background: "rgba(255,215,0,0.15)",
              border: "1px solid rgba(255,215,0,0.4)",
              color: "#FFD700",
            }}
          >
            Most Popular
          </div>
        )}

        <div className="mb-5">
          <div className="text-lg font-bold mb-1" style={{ color: "#F4F7FF" }}>
            {plan.name}
          </div>
          <div className="flex items-baseline gap-1">
            <span
              className="text-4xl font-black tracking-tight"
              style={{
                background:
                  "gradientPrice" in plan && plan.gradientPrice
                    ? "linear-gradient(135deg, #FF2D55, #2A79FF)"
                    : `linear-gradient(135deg, ${plan.iconColor}, #7B2FFF)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {plan.price}
            </span>
            <span className="text-sm" style={{ color: "#7E8AA8" }}>
              {plan.period}
            </span>
          </div>
        </div>

        <ul className="flex flex-col gap-3 mb-6">
          <li className="flex items-center gap-3">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: plan.glowColor }}
            >
              <Cpu className="w-3.5 h-3.5" style={{ color: plan.iconColor }} />
            </div>
            <span className="text-sm" style={{ color: "#B9C3DA" }}>
              {plan.vcpu}
            </span>
          </li>
          <li className="flex items-center gap-3">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: plan.glowColor }}
            >
              <MemoryStick
                className="w-3.5 h-3.5"
                style={{ color: plan.iconColor }}
              />
            </div>
            <span className="text-sm" style={{ color: "#B9C3DA" }}>
              {plan.ram}
            </span>
          </li>
          <li className="flex items-center gap-3">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: plan.glowColor }}
            >
              <HardDrive
                className="w-3.5 h-3.5"
                style={{ color: plan.iconColor }}
              />
            </div>
            <span className="text-sm" style={{ color: "#B9C3DA" }}>
              {plan.storage}
            </span>
          </li>
          <li className="flex items-center gap-3">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: plan.glowColor }}
            >
              <Globe
                className="w-3.5 h-3.5"
                style={{ color: plan.iconColor }}
              />
            </div>
            <span className="text-sm" style={{ color: "#B9C3DA" }}>
              {plan.bandwidth}
            </span>
          </li>
        </ul>

        <div className="w-full flex justify-center">
          <MetalButton
            data-ocid={`plans.buy.button.${index + 1}`}
            onClick={ripple as React.MouseEventHandler<HTMLButtonElement>}
          >
            <Zap className="w-4 h-4" fill="currentColor" />
            Buy Now
          </MetalButton>
        </div>
      </div>
    </div>
  );
}

export default function Cards() {
  return (
    <section className="py-20 px-4" data-ocid="plans.section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 fade-up">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill text-xs font-semibold mb-4"
            style={{
              background: "rgba(42,121,255,0.1)",
              border: "1px solid rgba(42,121,255,0.25)",
              color: "#7BA8FF",
            }}
          >
            Minecraft Server Plans
          </div>
          <h2
            className="text-3xl md:text-4xl font-extrabold tracking-tight"
            style={{ color: "#F4F7FF" }}
          >
            Minecraft Server Plans
          </h2>
          <p
            className="mt-3 text-base max-w-lg mx-auto"
            style={{ color: "#B9C3DA" }}
          >
            Choose the right plan for your Minecraft world
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
