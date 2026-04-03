import { useEffect, useState } from "react";

interface NavbarProps {
  onDeploy?: () => void;
}

export default function Navbar({ onDeploy }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleDeploy = (e: React.MouseEvent) => {
    e.preventDefault();
    onDeploy?.();
  };

  const goTo = (hash: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = hash;
  };

  return (
    <header
      data-ocid="navbar.panel"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/60 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 h-16 relative flex items-center justify-between">
        {/* Logo */}
        <button
          data-ocid="navbar.link"
          type="button"
          onClick={goTo("#/")}
          className="flex items-center gap-2 group z-10 bg-transparent border-none cursor-pointer"
        >
          <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
            <span className="text-blue-400 text-xs">⚡</span>
          </div>
          <span className="text-white font-bold text-base tracking-tight">
            DarkSanta
          </span>
        </button>

        {/* Center nav */}
        <nav className="hidden md:flex items-center gap-0.5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <button
            data-ocid="navbar.link"
            type="button"
            onClick={goTo("#/")}
            className="text-white/60 hover:text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/[0.05] transition-all duration-150 bg-transparent border-none cursor-pointer"
          >
            Home
          </button>
          <a
            data-ocid="navbar.link"
            href="#plans"
            className="text-white/60 hover:text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/[0.05] transition-all duration-150"
          >
            Plans
          </a>
          <button
            data-ocid="navbar.link"
            type="button"
            onClick={goTo("#/dashboard")}
            className="text-white/60 hover:text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/[0.05] transition-all duration-150 bg-transparent border-none cursor-pointer"
          >
            Dashboard
          </button>
        </nav>

        {/* Right */}
        <div className="flex items-center gap-2.5 z-10">
          <button
            data-ocid="navbar.link"
            type="button"
            onClick={goTo("#/login")}
            className="text-white/50 hover:text-white text-sm font-medium transition-colors duration-150 hidden md:block bg-transparent border-none cursor-pointer"
          >
            Login
          </button>
          <button
            data-ocid="navbar.primary_button"
            type="button"
            onClick={handleDeploy}
            className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] active:scale-95"
          >
            Deploy Now
          </button>
        </div>
      </div>
    </header>
  );
}
