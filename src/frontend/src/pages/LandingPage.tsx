import { CinematicHero } from "../components/ui/cinematic-landing-hero";

export default function LandingPage() {
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
    </div>
  );
}
