import { useLayoutEffect, useRef, useState } from "react";
import type React from "react";

const DefaultHomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    role="img"
    aria-label="Home"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>
);
const DefaultCompassIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    role="img"
    aria-label="Explore"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
  </svg>
);
const DefaultBellIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    role="img"
    aria-label="Notifications"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

export type NavItem = {
  id: string | number;
  icon: React.ReactElement;
  label?: string;
  onClick?: () => void;
};

const defaultNavItems: NavItem[] = [
  { id: "default-home", icon: <DefaultHomeIcon />, label: "Home" },
  { id: "default-explore", icon: <DefaultCompassIcon />, label: "Explore" },
  {
    id: "default-notifications",
    icon: <DefaultBellIcon />,
    label: "Notifications",
  },
];

export type LimelightNavProps = {
  items?: NavItem[];
  defaultActiveIndex?: number;
  onTabChange?: (index: number) => void;
  className?: string;
  limelightClassName?: string;
  iconContainerClassName?: string;
  iconClassName?: string;
};

export const LimelightNav = ({
  items = defaultNavItems,
  defaultActiveIndex = 0,
  onTabChange,
  className,
  limelightClassName,
  iconContainerClassName,
  iconClassName,
}: LimelightNavProps) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [isReady, setIsReady] = useState(false);
  const navItemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const limelightRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (items.length === 0) return;
    const limelight = limelightRef.current;
    const activeItem = navItemRefs.current[activeIndex];
    if (limelight && activeItem) {
      const newLeft =
        activeItem.offsetLeft +
        activeItem.offsetWidth / 2 -
        limelight.offsetWidth / 2;
      limelight.style.left = `${newLeft}px`;
      if (!isReady) {
        setTimeout(() => setIsReady(true), 50);
      }
    }
  }, [activeIndex, isReady, items]);

  if (items.length === 0) return null;

  const handleItemClick = (index: number, itemOnClick?: () => void) => {
    setActiveIndex(index);
    onTabChange?.(index);
    itemOnClick?.();
  };

  return (
    <nav
      className={`relative flex w-full items-center h-16 rounded-lg bg-card text-foreground border px-2 ${className ?? ""}`}
    >
      {items.map(({ id, icon, label, onClick }, index) => {
        const ref = (el: HTMLButtonElement | null) => {
          navItemRefs.current[index] = el;
        };
        const isActive = activeIndex === index;
        return (
          <button
            key={id}
            ref={ref}
            type="button"
            className={`relative z-20 flex flex-1 h-full cursor-pointer items-center justify-center p-5 ${iconContainerClassName ?? ""}`}
            onClick={() => handleItemClick(index, onClick)}
            aria-label={label}
          >
            <span
              className={`w-6 h-6 flex items-center justify-center transition-[opacity,transform] duration-200 ease-out ${
                isActive ? "opacity-100 scale-110" : "opacity-40 scale-100"
              } ${iconClassName ?? ""}`}
            >
              {icon}
            </span>
          </button>
        );
      })}
      <div
        ref={limelightRef}
        className={`absolute top-0 z-10 w-11 h-[5px] rounded-full ${
          isReady
            ? "transition-[left] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            : ""
        } ${limelightClassName ?? "bg-primary shadow-[0_50px_15px_var(--primary)]"}`}
        style={{ left: "-999px", willChange: "transform" }}
      >
        <div className="absolute left-[-30%] top-[5px] w-[160%] h-14 [clip-path:polygon(5%_100%,25%_0,75%_0,95%_100%)] bg-gradient-to-b from-primary/30 to-transparent opacity-80 pointer-events-none transition-opacity duration-200" />
      </div>
    </nav>
  );
};
