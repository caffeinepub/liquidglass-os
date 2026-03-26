import { useEffect, useState } from "react";
import BottomNav from "../components/BottomNav";
import Cards from "../components/Cards";
import Dashboard from "../components/Dashboard";
import Ecosystem from "../components/Ecosystem";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { BeamsBackground } from "../components/ui/beams-background";

export default function MainSitePage() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
    }
  }, [isDark]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    for (const el of document.querySelectorAll(".fade-up")) {
      observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{
        color: isDark ? "#f4f7ff" : "#e8edf8",
        transition: "color 0.4s ease",
      }}
    >
      <BeamsBackground intensity="strong" />

      {/* Premium background glow blobs — fixed, behind everything */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <div
          className="glow-blob glow-blob-blue"
          style={{ top: "-10%", left: "-8%" }}
        />
        <div
          className="glow-blob glow-blob-purple"
          style={{ top: "30%", right: "-5%" }}
        />
        <div
          className="glow-blob glow-blob-pink"
          style={{ bottom: "5%", left: "5%" }}
        />
        <div
          className="glow-blob glow-blob-teal"
          style={{ top: "5%", right: "15%" }}
        />
        <div
          className="glow-blob glow-blob-aurora"
          style={{ top: "40%", left: "30%" }}
        />
        <div
          className="glow-blob glow-blob-green"
          style={{ bottom: "30%", right: "20%" }}
        />
      </div>

      <Sidebar isDark={isDark} onToggleTheme={() => setIsDark((v) => !v)} />
      <Navbar isDark={isDark} onToggleTheme={() => setIsDark((v) => !v)} />
      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <Cards />
        <Dashboard />
        <Ecosystem />
      </main>
      <Footer />
      <BottomNav isDark={isDark} />
    </div>
  );
}
