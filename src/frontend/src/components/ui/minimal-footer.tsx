import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  Server,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";

export function MinimalFooter() {
  const year = new Date().getFullYear();

  const company = [
    { title: "About Us", href: "#" },
    { title: "Careers", href: "#" },
    { title: "Brand Assets", href: "#" },
    { title: "Privacy Policy", href: "#" },
    { title: "Terms of Service", href: "#" },
  ];

  const resources = [
    { title: "Blog", href: "#" },
    { title: "Help Center", href: "#" },
    { title: "Contact Support", href: "#" },
    { title: "Community", href: "#" },
    { title: "Security", href: "#" },
  ];

  const socialLinks = [
    { id: "facebook", icon: <FacebookIcon className="size-4" />, link: "#" },
    { id: "github", icon: <GithubIcon className="size-4" />, link: "#" },
    { id: "instagram", icon: <InstagramIcon className="size-4" />, link: "#" },
    { id: "linkedin", icon: <LinkedinIcon className="size-4" />, link: "#" },
    { id: "twitter", icon: <TwitterIcon className="size-4" />, link: "#" },
    { id: "youtube", icon: <YoutubeIcon className="size-4" />, link: "#" },
  ];

  return (
    <footer className="relative">
      <div
        className="mx-auto max-w-4xl md:border-x"
        style={{
          background:
            "radial-gradient(35% 80% at 30% 0%, rgba(34,230,255,0.07), transparent)",
          borderColor: "rgba(255,255,255,0.1)",
        }}
      >
        <div
          className="absolute inset-x-0 h-px w-full"
          style={{ background: "rgba(255,255,255,0.08)" }}
        />
        <div className="grid max-w-4xl grid-cols-6 gap-6 p-6 pt-8">
          {/* Brand column */}
          <div className="col-span-6 flex flex-col gap-5 md:col-span-4">
            <div className="flex items-center gap-2">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #22E6FF, #2A79FF)",
                  boxShadow: "0 0 16px rgba(34,230,255,0.4)",
                }}
              >
                <Server className="size-5 text-[#060713]" />
              </div>
              <span
                className="font-bold text-base tracking-tight"
                style={{ color: "#F4F7FF" }}
              >
                DarkSanta
              </span>
            </div>
            <p
              className="max-w-sm font-mono text-sm"
              style={{ color: "#7E8AA8" }}
            >
              Premium Minecraft server hosting for players and communities
              worldwide. Instant deploy, 99.9% uptime.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((item) => (
                <a
                  key={item.id}
                  className="rounded-md p-1.5 transition-all"
                  style={{
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "#7E8AA8",
                    background: "rgba(255,255,255,0.05)",
                  }}
                  target="_blank"
                  rel="noreferrer"
                  href={item.link}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "#22E6FF";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      "rgba(34,230,255,0.35)";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                      "0 0 10px rgba(34,230,255,0.2)";
                    (e.currentTarget as HTMLAnchorElement).style.background =
                      "rgba(34,230,255,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "#7E8AA8";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      "rgba(255,255,255,0.12)";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                      "none";
                    (e.currentTarget as HTMLAnchorElement).style.background =
                      "rgba(255,255,255,0.05)";
                  }}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Resources column */}
          <div className="col-span-3 w-full md:col-span-1">
            <span
              className="mb-2 block text-xs font-semibold uppercase tracking-widest"
              style={{ color: "#7E8AA8" }}
            >
              Resources
            </span>
            <div className="flex flex-col gap-1">
              {resources.map(({ href, title }) => (
                <a
                  key={title}
                  className="w-max py-1 text-sm transition-colors duration-200"
                  style={{ color: "#A9B3CC" }}
                  href={href}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "#F4F7FF";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "#A9B3CC";
                  }}
                >
                  {title}
                </a>
              ))}
            </div>
          </div>

          {/* Company column */}
          <div className="col-span-3 w-full md:col-span-1">
            <span
              className="mb-2 block text-xs font-semibold uppercase tracking-widest"
              style={{ color: "#7E8AA8" }}
            >
              Company
            </span>
            <div className="flex flex-col gap-1">
              {company.map(({ href, title }) => (
                <a
                  key={title}
                  className="w-max py-1 text-sm transition-colors duration-200"
                  style={{ color: "#A9B3CC" }}
                  href={href}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "#F4F7FF";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "#A9B3CC";
                  }}
                >
                  {title}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          className="absolute inset-x-0 h-px w-full"
          style={{ background: "rgba(255,255,255,0.08)" }}
        />
        <div className="flex max-w-4xl flex-col justify-between gap-2 px-6 pt-4 pb-8">
          <p
            className="text-center text-sm font-thin"
            style={{ color: "#7E8AA8" }}
          >
            © {year} DarkSanta. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
