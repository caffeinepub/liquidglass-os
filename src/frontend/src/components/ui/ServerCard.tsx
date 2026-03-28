import { Cpu, Globe, HardDrive, MemoryStick } from "lucide-react";
import { useRef, useState } from "react";
import { AuroraButton } from "./aurora-button";

export interface ServerCardData {
  name: string;
  badge?: string;
  badgeColor?: string;
  ram: string;
  cpu: string;
  price: string;
  period?: string;
  storage?: string;
  bandwidth?: string;
  iconColor: string;
  glowColor: string;
  popular?: boolean;
  flag?: string;
  latency?: string;
  location?: string;
}

interface ServerCardProps {
  card: ServerCardData;
  index?: number;
  onBuy?: () => void;
}

export default function ServerCard({
  card,
  index = 0,
  onBuy,
}: ServerCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -7;
    const rotY = ((x - cx) / cx) * 7;
    el.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.04) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "";
    setHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className="relative flex-shrink-0 w-[220px] sm:w-[240px] glass-card glass-card-premium p-5 cursor-pointer"
      data-ocid={`server_card.item.${index + 1}`}
      style={{
        transition: "transform 0.22s ease, box-shadow 0.22s ease",
        boxShadow: hovered
          ? `0 0 28px ${card.iconColor}55, 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12)`
          : "0 4px 20px rgba(0,0,0,0.3)",
        border: hovered ? `1px solid ${card.iconColor}60` : undefined,
        willChange: "transform",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Top glow line */}
      <div
        className="plan-halo"
        style={{
          background: `linear-gradient(90deg, transparent, ${card.iconColor}80, transparent)`,
          boxShadow: `0 0 16px ${card.iconColor}40`,
        }}
      />

      {/* Badge */}
      {card.badge && (
        <div
          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold mb-3"
          style={{
            background: `${card.badgeColor ?? card.iconColor}22`,
            border: `1px solid ${card.badgeColor ?? card.iconColor}50`,
            color: card.badgeColor ?? card.iconColor,
          }}
        >
          {card.badge}
        </div>
      )}

      {/* Flag + location for location cards */}
      {card.flag && (
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">{card.flag}</span>
          {card.location && (
            <span
              className="text-sm font-semibold"
              style={{ color: "#F4F7FF" }}
            >
              {card.location}
            </span>
          )}
        </div>
      )}

      {/* Name + price */}
      <div className="mb-4">
        <div className="text-sm font-bold mb-1" style={{ color: "#F4F7FF" }}>
          {card.name}
        </div>
        <div className="flex items-baseline gap-1">
          <span
            className="text-2xl font-black tracking-tight"
            style={{
              background: `linear-gradient(135deg, ${card.iconColor}, #7B2FFF)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {card.price}
          </span>
          <span className="text-xs" style={{ color: "#7E8AA8" }}>
            {card.period ?? "/mo"}
          </span>
        </div>
      </div>

      {/* Specs */}
      <ul className="flex flex-col gap-2 mb-4">
        <li className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: card.glowColor }}
          >
            <Cpu className="w-3 h-3" style={{ color: card.iconColor }} />
          </div>
          <span className="text-xs" style={{ color: "#B9C3DA" }}>
            {card.cpu}
          </span>
        </li>
        <li className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: card.glowColor }}
          >
            <MemoryStick
              className="w-3 h-3"
              style={{ color: card.iconColor }}
            />
          </div>
          <span className="text-xs" style={{ color: "#B9C3DA" }}>
            {card.ram}
          </span>
        </li>
        {card.storage && (
          <li className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: card.glowColor }}
            >
              <HardDrive
                className="w-3 h-3"
                style={{ color: card.iconColor }}
              />
            </div>
            <span className="text-xs" style={{ color: "#B9C3DA" }}>
              {card.storage}
            </span>
          </li>
        )}
        {card.latency && (
          <li className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: card.glowColor }}
            >
              <Globe className="w-3 h-3" style={{ color: card.iconColor }} />
            </div>
            <span className="text-xs" style={{ color: "#B9C3DA" }}>
              {card.latency}
            </span>
          </li>
        )}
      </ul>

      <AuroraButton
        variant="green"
        size="sm"
        data-ocid={`server_card.buy.button.${String(index + 1)}`}
        onClick={onBuy}
        className="w-full justify-center"
      >
        Deploy Now
      </AuroraButton>
    </div>
  );
}
