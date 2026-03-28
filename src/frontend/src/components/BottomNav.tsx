import {
  Globe,
  Home,
  LayoutDashboard,
  Server,
  ShoppingCart,
} from "lucide-react";
import { LimelightNav, type NavItem } from "./ui/limelight-nav";

const LOGIN_URL =
  "https://promising-white-eki-draft.caffeine.xyz/#caffeineAdminToken=f12ce17017d65b5dd5d901732fb1d643f5031208a4346356ee7e8a9050dc7f80";

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    window.scrollTo({ top: id === "home" ? 0 : 0, behavior: "smooth" });
  }
}

interface BottomNavProps {
  isDark?: boolean;
}

export default function BottomNav({ isDark: _isDark }: BottomNavProps) {
  const navItems: NavItem[] = [
    {
      id: "home",
      icon: <Home />,
      label: "Home",
      onClick: () => scrollToSection("home"),
    },
    {
      id: "servers",
      icon: <Server />,
      label: "Servers",
      onClick: () => {
        window.location.hash = "#/nodes";
      },
    },
    {
      id: "dashboard",
      icon: <LayoutDashboard />,
      label: "Dashboard",
      onClick: () => {
        window.location.href = LOGIN_URL;
      },
    },
    {
      id: "nodes",
      icon: <Globe />,
      label: "Nodes",
      onClick: () => {
        window.location.hash = "#/nodes";
      },
    },
    {
      id: "buy",
      icon: <ShoppingCart />,
      label: "Buy",
      onClick: () => {
        window.location.hash = "#/nodes";
      },
    },
  ];

  return (
    <>
      <style>{`
        @keyframes dock-float {
          0%, 100% { transform: translateX(-50%) translateY(0px); }
          50% { transform: translateX(-50%) translateY(-5px); }
        }
      `}</style>

      {/* SVG Glass Distortion Filter */}
      <svg style={{ display: "none" }} aria-hidden="true">
        <filter
          id="bottom-glass-distortion"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          filterUnits="objectBoundingBox"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.001 0.005"
            numOctaves={1}
            seed={17}
            result="turbulence"
          />
          <feComponentTransfer in="turbulence" result="mapped">
            <feFuncR type="gamma" amplitude={1} exponent={10} offset={0.5} />
            <feFuncG type="gamma" amplitude={0} exponent={1} offset={0} />
            <feFuncB type="gamma" amplitude={0} exponent={1} offset={0.5} />
          </feComponentTransfer>
          <feGaussianBlur in="turbulence" stdDeviation={3} result="softMap" />
          <feSpecularLighting
            in="softMap"
            surfaceScale={5}
            specularConstant={1}
            specularExponent={100}
            lightingColor="white"
            result="specLight"
          >
            <fePointLight x={-200} y={-200} z={300} />
          </feSpecularLighting>
          <feComposite
            in="specLight"
            operator="arithmetic"
            k1={0}
            k2={1}
            k3={1}
            k4={0}
            result="litImage"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softMap"
            scale={200}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <div
        className="fixed bottom-6 left-1/2 z-50"
        style={{
          animation: "dock-float 4s ease-in-out infinite",
          transform: "translateX(-50%)",
        }}
        data-ocid="bottom_nav.panel"
      >
        {/* Liquid glass wrapper */}
        <div
          style={{
            background: "rgba(8,10,22,0.55)",
            backdropFilter: "blur(60px) saturate(220%) brightness(0.78)",
            WebkitBackdropFilter: "blur(60px) saturate(220%) brightness(0.78)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow:
              "0 32px 80px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.4), inset 0 1.5px 0 rgba(255,255,255,0.18), 0 0 40px rgba(14,165,233,0.12)",
            borderRadius: 24,
            padding: "4px 8px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Reflection overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "40%",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, transparent 100%)",
              borderRadius: "24px 24px 0 0",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          <LimelightNav
            items={navItems}
            defaultActiveIndex={0}
            className="bg-transparent border-0 text-white"
            limelightClassName="bg-[#0ea5e9] shadow-[0_50px_15px_rgba(14,165,233,0.6)]"
            iconClassName="text-white"
          />
        </div>

        {/* Discord popup positioned above the dock */}
      </div>
    </>
  );
}
