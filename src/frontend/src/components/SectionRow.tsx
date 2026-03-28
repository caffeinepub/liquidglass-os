import { ChevronRight } from "lucide-react";
import type { ServerCardData } from "./ui/ServerCard";
import ServerCard from "./ui/ServerCard";

interface SectionRowProps {
  title: string;
  cards: ServerCardData[];
  onCardBuy?: (card: ServerCardData) => void;
}

export default function SectionRow({
  title,
  cards,
  onCardBuy,
}: SectionRowProps) {
  return (
    <div className="mb-10">
      {/* Row header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <h3
          className="text-lg font-bold tracking-tight"
          style={{ color: "#F4F7FF" }}
        >
          {title}
        </h3>
        <button
          type="button"
          className="flex items-center gap-1 text-sm font-medium transition-opacity hover:opacity-70"
          style={{ color: "#2A79FF" }}
          data-ocid="section_row.see_all.button"
        >
          See All
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Scrollable row */}
      <div
        className="flex gap-4 overflow-x-auto pb-3"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {cards.map((card, i) => (
          <ServerCard
            key={card.name}
            card={card}
            index={i}
            onBuy={() => onCardBuy?.(card)}
          />
        ))}
      </div>
    </div>
  );
}
