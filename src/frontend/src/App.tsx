import {
  type MotionValue,
  type Transition,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import Hls from "hls.js";
import { Instagram, Linkedin, Twitter } from "lucide-react";
import { useEffect, useRef } from "react";

// ─── Animation helper ─────────────────────────────────────────────────────────
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" } as const,
  transition: { duration: 0.6, delay, ease: "easeOut" } as Transition,
});

// ─── WordReveal component (defined outside App to comply with hooks rules) ────
function WordReveal({
  word,
  progress,
  start,
  end,
  className,
}: {
  word: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
  className?: string;
}) {
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className={className}>
      {word}{" "}
    </motion.span>
  );
}

// ─── Feature card items ────────────────────────────────────────────────────────
const features = [
  {
    title: "Curated Feed",
    desc: "Handpicked stories tailored to your intellectual curiosity.",
  },
  {
    title: "Writer Tools",
    desc: "Powerful publishing tools built for depth and clarity.",
  },
  {
    title: "Community",
    desc: "Connect with readers and thinkers who share your passions.",
  },
  {
    title: "Distribution",
    desc: "Reach the right audience through smart content delivery.",
  },
];

// ─── Platform cards ────────────────────────────────────────────────────────────
const platforms = [
  {
    icon: "/assets/generated/icon-chatgpt.dim_200x200.png",
    name: "ChatGPT",
    desc: "AI-powered answers replacing traditional search results.",
  },
  {
    icon: "/assets/generated/icon-perplexity.dim_200x200.png",
    name: "Perplexity",
    desc: "Real-time AI synthesis from across the web.",
  },
  {
    icon: "/assets/generated/icon-google.dim_200x200.png",
    name: "Google AI",
    desc: "Search reimagined with generative intelligence.",
  },
];

// ─── Nav links ────────────────────────────────────────────────────────────────
const navLinks = ["Home", "How It Works", "Philosophy", "Use Cases"];
const socialIcons = [
  { Icon: Instagram, label: "Instagram" },
  { Icon: Linkedin, label: "LinkedIn" },
  { Icon: Twitter, label: "Twitter" },
] as const;
const footerLinks = ["Privacy", "Terms", "Contact"];

// ─── Mission paragraphs ────────────────────────────────────────────────────────
const missionP1 =
  "We're building a space where curiosity meets clarity — where readers find depth, writers find reach, and every newsletter becomes a conversation worth having.";
const missionP2 =
  "A platform where content, community, and insight flow together — with less noise, less friction, and more meaning for everyone involved.";

export default function App() {
  // HLS video ref
  const ctaVideoRef = useRef<HTMLVideoElement>(null);

  // Scroll-driven mission section
  const missionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: missionRef,
    offset: ["start end", "end start"],
  });

  // CTA HLS setup
  useEffect(() => {
    const video = ctaVideoRef.current;
    if (!video) return;
    const hlsUrl =
      "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8";
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(hlsUrl);
      hls.attachMedia(video);
      return () => hls.destroy();
    }
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = hlsUrl;
    }
  }, []);

  // Build word arrays for mission text
  const p1Words = missionP1.split(" ");
  const p2Words = missionP2.split(" ");
  const totalWords = p1Words.length + p2Words.length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ─── NAVBAR ──────────────────────────────────────────────────────── */}
      <header className="fixed top-0 z-50 w-full px-8 md:px-28 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          className="flex items-center gap-3 cursor-pointer bg-transparent border-0 p-0"
          data-ocid="nav.link"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="relative w-7 h-7 flex items-center justify-center">
            <div className="w-7 h-7 rounded-full border-2 border-foreground/60 absolute" />
            <div className="w-3 h-3 rounded-full border border-foreground/60" />
          </div>
          <span className="font-bold text-foreground text-sm">Mindloop</span>
        </button>

        {/* Nav links */}
        <nav
          className="hidden md:flex items-center gap-3 text-sm"
          aria-label="Main navigation"
        >
          {navLinks.map((link, i) => (
            <span key={link} className="flex items-center gap-3">
              {i > 0 && (
                <span
                  className="text-muted-foreground/40 select-none"
                  aria-hidden="true"
                >
                  •
                </span>
              )}
              <button
                type="button"
                className="text-muted-foreground hover:text-foreground transition-colors bg-transparent border-0 p-0 cursor-pointer"
                data-ocid="nav.link"
              >
                {link}
              </button>
            </span>
          ))}
        </nav>

        {/* Social icons */}
        <div className="flex items-center gap-2">
          {socialIcons.map(({ Icon, label }) => (
            <motion.button
              key={label}
              type="button"
              aria-label={label}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="liquid-glass w-10 h-10 rounded-full flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
              data-ocid="nav.button"
            >
              <Icon size={16} />
            </motion.button>
          ))}
        </div>
      </header>

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative h-screen overflow-hidden">
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          tabIndex={-1}
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_120549_0cd82c36-56b3-4dd9-b190-069cfc3a623f.mp4"
            type="video/mp4"
          />
        </video>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background to-transparent z-[1]" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full pt-28 md:pt-32 text-center px-4">
          {/* Avatar row */}
          <motion.div
            {...fadeUp(0)}
            className="flex items-center mb-6"
            data-ocid="hero.section"
          >
            <div className="flex -space-x-2">
              <img
                src="/assets/generated/avatar-1.dim_64x64.png"
                alt="Subscriber"
                className="w-8 h-8 rounded-full border-2 border-background object-cover"
              />
              <img
                src="/assets/generated/avatar-2.dim_64x64.png"
                alt="Subscriber"
                className="w-8 h-8 rounded-full border-2 border-background object-cover"
              />
              <img
                src="/assets/generated/avatar-3.dim_64x64.png"
                alt="Subscriber"
                className="w-8 h-8 rounded-full border-2 border-background object-cover"
              />
            </div>
            <span className="text-muted-foreground text-sm ml-3">
              7,000+ people already subscribed
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            {...fadeUp(0.1)}
            className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-2px] mb-6 max-w-4xl leading-tight"
          >
            Get <em className="font-serif italic font-normal">Inspired</em> with
            Us
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            {...fadeUp(0.2)}
            className="text-lg mb-10 max-w-2xl leading-relaxed"
            style={{ color: "hsl(var(--hero-subtitle))" }}
          >
            Join our feed for meaningful updates, news around technology and a
            shared journey toward depth and direction.
          </motion.p>

          {/* Subscribe form */}
          <motion.div {...fadeUp(0.3)} className="w-full max-w-lg">
            <div className="liquid-glass rounded-full p-2 flex items-center gap-2">
              <label htmlFor="hero-email" className="sr-only">
                Email address
              </label>
              <input
                id="hero-email"
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent px-4 text-foreground text-sm outline-none placeholder:text-muted-foreground min-w-0"
                data-ocid="hero.input"
              />
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-foreground text-background rounded-full px-8 py-3 text-sm font-semibold whitespace-nowrap"
                data-ocid="hero.submit_button"
              >
                SUBSCRIBE
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SEARCH HAS CHANGED ─────────────────────────────────────────── */}
      <section className="text-center px-4 pt-52 md:pt-64 pb-6 md:pb-9">
        <motion.h2
          {...fadeUp(0)}
          className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-2px] mb-6"
        >
          Search has <em className="font-serif italic font-normal">changed.</em>{" "}
          Have you?
        </motion.h2>

        <motion.p
          {...fadeUp(0.1)}
          className="text-muted-foreground text-lg max-w-2xl mx-auto mb-24"
        >
          The way people discover information has shifted dramatically. AI is
          answering the questions your audience is asking — are you part of that
          answer?
        </motion.p>

        {/* Platform cards */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-20 max-w-4xl mx-auto">
          {platforms.map((platform) => (
            <motion.div
              key={platform.name}
              {...fadeUp(0.1)}
              className="flex flex-col items-center"
            >
              <img
                src={platform.icon}
                alt={platform.name}
                className="w-24 h-24 mx-auto mb-4 object-contain"
              />
              <h3 className="font-semibold text-base mb-2">{platform.name}</h3>
              <p className="text-muted-foreground text-sm">{platform.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          {...fadeUp(0.3)}
          className="text-muted-foreground text-sm text-center"
        >
          If you don&apos;t answer the questions, someone else will.
        </motion.p>
      </section>

      {/* ─── MISSION ────────────────────────────────────────────────────── */}
      <section ref={missionRef} className="pt-0 pb-32 md:pb-44 px-4">
        {/* Mission video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full max-w-[800px] h-auto mx-auto block mb-16 rounded-2xl"
          tabIndex={-1}
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_132944_a0d124bb-eaa1-4082-aa30-2310efb42b4b.mp4"
            type="video/mp4"
          />
        </video>

        {/* Scroll-driven word reveal — paragraph 1 */}
        <p className="text-2xl md:text-4xl lg:text-5xl font-medium tracking-[-1px] max-w-4xl mx-auto leading-relaxed">
          {p1Words.map((word, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: word positions are stable
            <WordReveal
              key={`p1-${i}`}
              word={word}
              progress={scrollYProgress}
              start={i / totalWords}
              end={(i + 1) / totalWords}
            />
          ))}
        </p>

        {/* Scroll-driven word reveal — paragraph 2 */}
        <p className="text-xl md:text-2xl lg:text-3xl font-medium mt-10 max-w-4xl mx-auto leading-relaxed">
          {p2Words.map((word, i) => {
            const globalIndex = p1Words.length + i;
            return (
              // biome-ignore lint/suspicious/noArrayIndexKey: word positions are stable
              <WordReveal
                key={`p2-${i}`}
                word={word}
                progress={scrollYProgress}
                start={globalIndex / totalWords}
                end={(globalIndex + 1) / totalWords}
              />
            );
          })}
        </p>
      </section>

      {/* ─── SOLUTION ───────────────────────────────────────────────────── */}
      <section className="py-32 md:py-44 border-t border-border/30 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.p
            {...fadeUp(0)}
            className="text-xs tracking-[3px] uppercase text-muted-foreground mb-4 text-center"
          >
            SOLUTION
          </motion.p>

          <motion.h2
            {...fadeUp(0.1)}
            className="text-4xl md:text-6xl font-medium tracking-[-1px] mb-12 text-center"
          >
            The platform for{" "}
            <em className="font-serif italic font-normal">meaningful</em>{" "}
            content
          </motion.h2>

          {/* Solution video */}
          <motion.div {...fadeUp(0.2)} className="mb-16">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full rounded-2xl aspect-[3/1] object-cover"
              tabIndex={-1}
            >
              <source
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_125119_8e5ae31c-0021-4396-bc08-f7aebeb877a2.mp4"
                type="video/mp4"
              />
            </video>
          </motion.div>

          {/* Feature grid */}
          <div className="grid md:grid-cols-4 gap-8">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                {...fadeUp(0.1)}
                className="space-y-2"
              >
                <h3 className="font-semibold text-base">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ────────────────────────────────────────────────────────── */}
      <section className="relative py-32 md:py-44 border-t border-border/30 overflow-hidden text-center">
        {/* HLS background video */}
        <video
          ref={ctaVideoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          tabIndex={-1}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-background/45 z-[1]" />

        {/* Content */}
        <div className="relative z-10 px-4">
          {/* Concentric circles logo */}
          <div className="w-10 h-10 rounded-full border-2 border-foreground/60 flex items-center justify-center mx-auto mb-8">
            <div className="w-5 h-5 rounded-full border border-foreground/60" />
          </div>

          <motion.h2
            {...fadeUp(0)}
            className="text-4xl md:text-6xl font-medium tracking-[-1px] mb-4"
          >
            <em className="font-serif italic font-normal">
              Start Your Journey
            </em>
          </motion.h2>

          <motion.p
            {...fadeUp(0.1)}
            className="text-muted-foreground text-lg mb-8 max-w-md mx-auto"
          >
            Join thousands of curious minds. Get the newsletter that goes
            deeper.
          </motion.p>

          <motion.div
            {...fadeUp(0.2)}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-foreground text-background rounded-lg px-8 py-3.5 font-semibold text-sm"
              data-ocid="cta.primary_button"
            >
              Subscribe Now
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="liquid-glass rounded-lg px-8 py-3.5 text-foreground font-semibold text-sm"
              data-ocid="cta.secondary_button"
            >
              Start Writing
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─────────────────────────────────────────────────────── */}
      <footer className="py-12 px-8 md:px-28 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/30">
        <p className="text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} Mindloop. All rights reserved.
        </p>
        <nav aria-label="Footer" className="flex gap-6">
          {footerLinks.map((link) => (
            <button
              key={link}
              type="button"
              className="text-muted-foreground text-sm hover:text-foreground transition-colors cursor-pointer bg-transparent border-0 p-0"
              data-ocid="footer.link"
            >
              {link}
            </button>
          ))}
        </nav>
      </footer>
    </div>
  );
}
