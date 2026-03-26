import { CinematicHero } from "../components/ui/cinematic-landing-hero";
import { MetalButton } from "../components/ui/liquid-glass-button";

const PARTICLES = [
  {
    id: "p0",
    left: "5%",
    top: "10%",
    size: 4,
    color: "#00d4ff",
    glow: 6,
    dur: 4,
    delay: 0,
    opacity: 0.6,
  },
  {
    id: "p1",
    left: "9.7%",
    top: "17.3%",
    size: 2,
    color: "#bf5fff",
    glow: 9,
    dur: 5,
    delay: 0.4,
    opacity: 0.75,
  },
  {
    id: "p2",
    left: "14.4%",
    top: "24.6%",
    size: 3,
    color: "#1bffd5",
    glow: 12,
    dur: 6,
    delay: 0.8,
    opacity: 0.9,
  },
  {
    id: "p3",
    left: "19.1%",
    top: "31.9%",
    size: 4,
    color: "#ff3cac",
    glow: 15,
    dur: 7,
    delay: 1.2,
    opacity: 0.6,
  },
  {
    id: "p4",
    left: "23.8%",
    top: "39.2%",
    size: 2,
    color: "#00d4ff",
    glow: 6,
    dur: 8,
    delay: 1.6,
    opacity: 0.75,
  },
  {
    id: "p5",
    left: "28.5%",
    top: "46.5%",
    size: 3,
    color: "#bf5fff",
    glow: 9,
    dur: 4,
    delay: 2.0,
    opacity: 0.9,
  },
  {
    id: "p6",
    left: "33.2%",
    top: "53.8%",
    size: 4,
    color: "#1bffd5",
    glow: 12,
    dur: 5,
    delay: 2.4,
    opacity: 0.6,
  },
  {
    id: "p7",
    left: "37.9%",
    top: "61.1%",
    size: 2,
    color: "#ff3cac",
    glow: 15,
    dur: 6,
    delay: 2.8,
    opacity: 0.75,
  },
  {
    id: "p8",
    left: "42.6%",
    top: "68.4%",
    size: 3,
    color: "#00d4ff",
    glow: 6,
    dur: 7,
    delay: 3.2,
    opacity: 0.9,
  },
  {
    id: "p9",
    left: "47.3%",
    top: "75.7%",
    size: 4,
    color: "#bf5fff",
    glow: 9,
    dur: 8,
    delay: 3.6,
    opacity: 0.6,
  },
  {
    id: "p10",
    left: "52%",
    top: "10%",
    size: 2,
    color: "#1bffd5",
    glow: 12,
    dur: 4,
    delay: 0,
    opacity: 0.75,
  },
  {
    id: "p11",
    left: "56.7%",
    top: "17.3%",
    size: 3,
    color: "#ff3cac",
    glow: 15,
    dur: 5,
    delay: 0.4,
    opacity: 0.9,
  },
  {
    id: "p12",
    left: "61.4%",
    top: "24.6%",
    size: 4,
    color: "#00d4ff",
    glow: 6,
    dur: 6,
    delay: 0.8,
    opacity: 0.6,
  },
  {
    id: "p13",
    left: "66.1%",
    top: "31.9%",
    size: 2,
    color: "#bf5fff",
    glow: 9,
    dur: 7,
    delay: 1.2,
    opacity: 0.75,
  },
  {
    id: "p14",
    left: "70.8%",
    top: "39.2%",
    size: 3,
    color: "#1bffd5",
    glow: 12,
    dur: 8,
    delay: 1.6,
    opacity: 0.9,
  },
  {
    id: "p15",
    left: "75.5%",
    top: "46.5%",
    size: 4,
    color: "#ff3cac",
    glow: 15,
    dur: 4,
    delay: 2.0,
    opacity: 0.6,
  },
  {
    id: "p16",
    left: "80.2%",
    top: "53.8%",
    size: 2,
    color: "#00d4ff",
    glow: 6,
    dur: 5,
    delay: 2.4,
    opacity: 0.75,
  },
  {
    id: "p17",
    left: "84.9%",
    top: "61.1%",
    size: 3,
    color: "#bf5fff",
    glow: 9,
    dur: 6,
    delay: 2.8,
    opacity: 0.9,
  },
  {
    id: "p18",
    left: "89.6%",
    top: "68.4%",
    size: 4,
    color: "#1bffd5",
    glow: 12,
    dur: 7,
    delay: 3.2,
    opacity: 0.6,
  },
  {
    id: "p19",
    left: "94.3%",
    top: "75.7%",
    size: 2,
    color: "#ff3cac",
    glow: 15,
    dur: 8,
    delay: 3.6,
    opacity: 0.75,
  },
];

interface LandingPageProps {
  onEnter: () => void;
}

export default function LandingPage({ onEnter }: LandingPageProps) {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Rich gradient base */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          background:
            "linear-gradient(135deg, #050d1f 0%, #0c1a3a 25%, #0f2460 50%, #1a0a3e 75%, #050d1f 100%)",
        }}
      />

      {/* Large vibrant glow orbs */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        {/* Top-left cyan mega orb */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "-5%",
            width: 800,
            height: 800,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,212,255,0.25) 0%, rgba(14,165,233,0.12) 40%, transparent 70%)",
            filter: "blur(40px)",
            animation: "floatA 9s ease-in-out infinite",
          }}
        />
        {/* Bottom-right purple mega orb */}
        <div
          style={{
            position: "absolute",
            bottom: "-15%",
            right: "-10%",
            width: 900,
            height: 900,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.3) 0%, rgba(109,40,217,0.15) 40%, transparent 70%)",
            filter: "blur(50px)",
            animation: "floatB 11s ease-in-out infinite",
          }}
        />
        {/* Center electric cyan orb */}
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "35%",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(34,211,238,0.18) 0%, transparent 65%)",
            filter: "blur(60px)",
            animation: "floatC 7s ease-in-out infinite 1.5s",
          }}
        />
        {/* Top-right hot pink accent */}
        <div
          style={{
            position: "absolute",
            top: "5%",
            right: "10%",
            width: 350,
            height: 350,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,0,128,0.2) 0%, transparent 70%)",
            filter: "blur(50px)",
            animation: "floatA 13s ease-in-out infinite 3s",
          }}
        />
        {/* Bottom-left teal */}
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "5%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(27,255,213,0.15) 0%, transparent 70%)",
            filter: "blur(55px)",
            animation: "floatB 15s ease-in-out infinite 5s",
          }}
        />
      </div>

      {/* Floating particles */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 3,
          pointerEvents: "none",
        }}
      >
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: p.color,
              boxShadow: `0 0 ${p.glow}px ${p.color}`,
              animation: `particleFloat ${p.dur}s ease-in-out infinite ${p.delay}s`,
              opacity: p.opacity,
            }}
          />
        ))}
      </div>

      {/* Rotating gradient rings */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 700,
            height: 700,
            borderRadius: "50%",
            border: "1px solid transparent",
            background:
              "linear-gradient(#050d1f, #050d1f) padding-box, conic-gradient(from 0deg, rgba(0,212,255,0.4), rgba(139,92,246,0.4), rgba(255,0,128,0.3), rgba(0,212,255,0.4)) border-box",
            animation: "spinRing 20s linear infinite",
            opacity: 0.4,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            border: "1px solid transparent",
            background:
              "linear-gradient(#050d1f, #050d1f) padding-box, conic-gradient(from 180deg, rgba(34,211,238,0.5), rgba(109,40,217,0.4), rgba(34,211,238,0.5)) border-box",
            animation: "spinRing 14s linear infinite reverse",
            opacity: 0.35,
          }}
        />
      </div>

      {/* Shimmer beams */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 3,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "42%",
            left: "-100%",
            width: "60%",
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(0,212,255,0.8), rgba(255,255,255,0.4), rgba(0,212,255,0.8), transparent)",
            animation: "beamSweep 6s ease-in-out infinite",
            filter: "blur(1px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "55%",
            left: "-100%",
            width: "40%",
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(139,92,246,0.6), rgba(255,255,255,0.3), rgba(139,92,246,0.6), transparent)",
            animation: "beamSweep 8s ease-in-out infinite 2s",
            filter: "blur(1px)",
          }}
        />
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes floatA {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -40px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.97); }
        }
        @keyframes floatB {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40% { transform: translate(-40px, -30px) scale(1.08); }
          70% { transform: translate(25px, 35px) scale(0.95); }
        }
        @keyframes floatC {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.8; }
          50% { transform: translate(20px, -25px) scale(1.1); opacity: 1; }
        }
        @keyframes particleFloat {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.6; }
          50% { transform: translateY(-20px) scale(1.3); opacity: 1; }
        }
        @keyframes spinRing {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes beamSweep {
          0% { left: -100%; opacity: 0; }
          10% { opacity: 1; }
          80% { opacity: 1; }
          100% { left: 150%; opacity: 0; }
        }
        @keyframes btnGlow {
          0%, 100% { box-shadow: 0 0 30px rgba(0,212,255,0.4), 0 0 60px rgba(0,212,255,0.15), inset 0 1px 1px rgba(255,255,255,0.2); }
          50% { box-shadow: 0 0 50px rgba(0,212,255,0.7), 0 0 100px rgba(0,212,255,0.3), inset 0 1px 1px rgba(255,255,255,0.25); }
        }
      `}</style>

      {/* Subtle scrim */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 4,
          pointerEvents: "none",
          background: "rgba(5,13,31,0.15)",
        }}
      />

      {/* CinematicHero on top */}
      <div style={{ position: "relative", zIndex: 5 }}>
        <CinematicHero
          brandName="DarkSanta"
          tagline1="Host with power,"
          tagline2="play without limits."
          cardHeading="Minecraft hosting, redefined."
          cardDescription={
            <>
              <span className="text-white font-semibold">DarkSanta</span>{" "}
              delivers premium Minecraft server hosting with instant setup,
              ultra-low latency, and 99.9% uptime — built for serious players.
            </>
          }
          metricValue={247}
          metricLabel="Servers Online"
          ctaHeading="Premium Minecraft Servers"
          ctaDescription="Join DarkSanta — the most powerful Minecraft server hosting platform."
        />
      </div>

      {/* Enter Site button */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] pointer-events-auto">
        <MetalButton data-ocid="landing.enter_site_button" onClick={onEnter}>
          Enter DarkSanta
          <svg
            className="w-5 h-5"
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
        </MetalButton>
      </div>
    </div>
  );
}
