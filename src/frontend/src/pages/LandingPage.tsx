import { CinematicHero } from "../components/ui/cinematic-landing-hero";

interface LandingPageProps {
  onEnter: () => void;
}

export default function LandingPage({ onEnter }: LandingPageProps) {
  return (
    <div className="relative w-screen h-screen overflow-x-hidden">
      <CinematicHero
        brandName="DarkSanta"
        tagline1="Host with power,"
        tagline2="play without limits."
        cardHeading="Minecraft hosting, redefined."
        cardDescription={
          <>
            <span className="text-white font-semibold">DarkSanta</span> delivers
            premium Minecraft server hosting with instant setup, ultra-low
            latency, and 99.9% uptime — built for serious players.
          </>
        }
        metricValue={247}
        metricLabel="Servers Online"
        ctaHeading="Premium Minecraft Servers"
        ctaDescription="Join DarkSanta — the most powerful Minecraft server hosting platform."
      />
      {/* Enter Site overlay button — appears after CTA section fades in */}
      <div
        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] pointer-events-auto"
        style={{ mixBlendMode: "normal" }}
      >
        <button
          type="button"
          data-ocid="landing.enter_site_button"
          onClick={onEnter}
          className="group relative flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg text-white overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(14,165,233,0.15) 0%, rgba(139,92,246,0.15) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(14,165,233,0.4)",
            boxShadow:
              "0 0 30px rgba(14,165,233,0.3), 0 0 60px rgba(14,165,233,0.1), inset 0 1px 1px rgba(255,255,255,0.15)",
            transition: "all 0.2s ease-in-out",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.transform = "translateY(-3px) scale(1.04)";
            el.style.boxShadow =
              "0 0 50px rgba(14,165,233,0.5), 0 0 100px rgba(14,165,233,0.2), inset 0 1px 1px rgba(255,255,255,0.2)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.transform = "";
            el.style.boxShadow =
              "0 0 30px rgba(14,165,233,0.3), 0 0 60px rgba(14,165,233,0.1), inset 0  1px 1px rgba(255,255,255,0.15)";
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = "scale(0.97)";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = "translateY(-3px) scale(1.04)";
          }}
        >
          {/* Shine sweep */}
          <span
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)",
              transition: "opacity 0.3s ease",
            }}
            aria-hidden="true"
          />
          <span className="relative z-10">Enter DarkSanta</span>
          <svg
            className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 12h14M12 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
