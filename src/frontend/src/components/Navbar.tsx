import { Menu, Moon, Server, Sun, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import DiscordPopup from "./DiscordPopup";
import { MetalButton } from "./ui/liquid-glass-button";

const NAV_LINKS = ["Home", "Plans", "Servers", "Pricing", "Dashboard", "Login"];
const LOGIN_URL =
  "https://promising-white-eki-draft.caffeine.xyz/#caffeineAdminToken=f12ce17017d65b5dd5d901732fb1d643f5031208a4346356ee7e8a9050dc7f80";

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export default function Navbar({ isDark, onToggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDiscord, setShowDiscord] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      {/* Soft aura glow layer above the navbar */}
      <div
        style={{
          position: "absolute",
          top: "-20px",
          left: 0,
          right: 0,
          height: "80px",
          background:
            "linear-gradient(180deg, rgba(42,121,255,0.06) 0%, rgba(139,92,246,0.04) 50%, transparent 100%)",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />
      <nav
        className="glass-nav rounded-pill flex items-center justify-between gap-4 px-5 h-[62px] w-full max-w-[780px] transition-all duration-200"
        style={{
          boxShadow: scrolled
            ? "0 12px 48px rgba(0,0,0,0.5), 0 0 60px rgba(42,121,255,0.12), inset 0 1px 0 rgba(255,255,255,0.14)"
            : undefined,
          animation: "nav-glow-pulse 3s ease-in-out infinite",
        }}
        data-ocid="nav.panel"
      >
        {/* Brand */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #FF2D55, #2A79FF)",
              boxShadow: "0 0 16px rgba(255,45,85,0.45)",
            }}
          >
            <Server className="w-4 h-4 text-white" />
          </div>
          <span
            className="font-bold text-[15px] tracking-tight"
            style={{ color: isDark ? "#F4F7FF" : "#e8edf8" }}
          >
            DarkSanta
          </span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link, i) => {
            const isDashboard = link === "Dashboard";
            const isLogin = link === "Login";
            const isHovered = hoveredLink === link;
            return isDashboard ? (
              <button
                key={link}
                type="button"
                className="nav-link-dashboard"
                data-ocid="nav.dashboard.link"
                style={{
                  animation: "nav-link-in 0.4s ease forwards",
                  animationDelay: `${i * 60}ms`,
                  opacity: 0,
                }}
              >
                <span style={{ color: "#2A79FF", fontWeight: 700 }}>
                  {link}
                </span>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#00FFA3",
                    boxShadow: "0 0 8px #00FFA3",
                    display: "inline-block",
                    marginLeft: 5,
                    verticalAlign: "middle",
                  }}
                />
              </button>
            ) : (
              <button
                key={link}
                type="button"
                className="nav-link"
                data-ocid={`nav.${link.toLowerCase()}.link`}
                onMouseEnter={() => setHoveredLink(link)}
                onMouseLeave={() => setHoveredLink(null)}
                onClick={
                  isLogin
                    ? () => {
                        window.location.href = LOGIN_URL;
                      }
                    : undefined
                }
                style={{
                  animation: "nav-link-in 0.4s ease forwards",
                  animationDelay: `${i * 60}ms`,
                  opacity: 0,
                }}
              >
                {link}
                {isHovered && <span className="nav-active-dot" />}
              </button>
            );
          })}
        </div>

        {/* Theme toggle + CTA */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            data-ocid="nav.theme.toggle"
            className="relative flex items-center rounded-pill transition-all duration-200 flex-shrink-0"
            style={{
              width: 52,
              height: 28,
              background: isDark
                ? "rgba(255,45,85,0.15)"
                : "rgba(255,180,0,0.18)",
              border: isDark
                ? "1px solid rgba(255,45,85,0.3)"
                : "1px solid rgba(255,180,0,0.4)",
              boxShadow: isDark
                ? "0 0 12px rgba(255,45,85,0.2)"
                : "0 0 12px rgba(255,180,0,0.25)",
              padding: 2,
            }}
          >
            <span
              className="flex items-center justify-center rounded-full text-xs transition-all duration-200"
              style={{
                width: 22,
                height: 22,
                transform: isDark ? "translateX(0px)" : "translateX(24px)",
                background: isDark
                  ? "linear-gradient(135deg, #FF2D55, #2A79FF)"
                  : "linear-gradient(135deg, #FFB400, #FF7A00)",
                boxShadow: isDark
                  ? "0 0 8px rgba(255,45,85,0.6)"
                  : "0 0 8px rgba(255,180,0,0.7)",
              }}
            >
              {isDark ? (
                <Moon className="w-3 h-3 text-white" />
              ) : (
                <Sun className="w-3 h-3 text-[#1a1a00]" />
              )}
            </span>
          </button>

          <div ref={ctaRef} style={{ position: "relative" }}>
            <MetalButton
              data-ocid="nav.cta.button"
              onClick={() => setShowDiscord((v) => !v)}
              className="hidden sm:inline-flex"
            >
              Buy Server
            </MetalButton>
            {showDiscord && (
              <DiscordPopup onClose={() => setShowDiscord(false)} />
            )}
          </div>

          <button
            type="button"
            className="md:hidden btn-glass p-2 rounded-xl"
            onClick={() => setMenuOpen(!menuOpen)}
            data-ocid="nav.menu.button"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="glass-nav absolute top-[72px] left-4 right-4 rounded-3xl p-4 flex flex-col gap-2"
          data-ocid="nav.mobile.panel"
        >
          {NAV_LINKS.map((link) => {
            const isDashboard = link === "Dashboard";
            const isLogin = link === "Login";
            return (
              <button
                key={link}
                type="button"
                onClick={() => {
                  if (isLogin) {
                    window.location.href = LOGIN_URL;
                  } else {
                    setMenuOpen(false);
                  }
                }}
                className={
                  isDashboard
                    ? "nav-link-dashboard text-base py-3 text-center"
                    : "nav-link text-base py-3 text-center"
                }
              >
                {isDashboard ? (
                  <span style={{ color: "#2A79FF", fontWeight: 700 }}>
                    {link}
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#00FFA3",
                        boxShadow: "0 0 8px #00FFA3",
                        display: "inline-block",
                        marginLeft: 5,
                        verticalAlign: "middle",
                      }}
                    />
                  </span>
                ) : (
                  link
                )}
              </button>
            );
          })}
          <div className="mt-2 w-full flex justify-center">
            <MetalButton data-ocid="nav.mobile.cta.button">
              Buy Server
            </MetalButton>
          </div>
        </div>
      )}
    </header>
  );
}
