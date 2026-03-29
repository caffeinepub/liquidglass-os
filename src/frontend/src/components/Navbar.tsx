import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-ocid="navbar.panel"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/60 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 relative flex items-center justify-between">
        {/* Logo */}
        <a
          data-ocid="navbar.link"
          href="#/home"
          className="flex items-center gap-2 group"
        >
          <span className="text-white font-bold text-lg tracking-tight">
            DarkSanta
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:shadow-[0_0_8px_rgba(59,130,246,0.8)] transition-shadow" />
        </a>

        {/* Center nav — absolutely centered */}
        <nav className="hidden md:flex items-center gap-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {[
            { label: "Home", href: "#/home" },
            { label: "Plans", href: "#plans" },
            { label: "Dashboard", href: "https://login-o9c.caffeine.xyz/" },
          ].map((link) => (
            <a
              key={link.label}
              data-ocid="navbar.link"
              href={link.href}
              className="text-white/60 hover:text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/[0.05] transition-all duration-150"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3">
          <a
            data-ocid="navbar.link"
            href="https://login-o9c.caffeine.xyz/"
            className="text-white/60 hover:text-white text-sm font-medium transition-colors duration-150 hidden md:block"
          >
            Login
          </a>
          <a
            data-ocid="navbar.primary_button"
            href="#plans"
            className="bg-blue-500 hover:bg-blue-400 text-white rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] active:scale-95"
          >
            Deploy Now
          </a>
        </div>
      </div>
    </header>
  );
}
