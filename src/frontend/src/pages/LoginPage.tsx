import { motion } from "motion/react";
import { useState } from "react";
import BottomDock from "../components/BottomDock";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      window.location.hash = "#/dashboard";
    }, 1200);
  };

  return (
    <div className="relative min-h-screen bg-[#050505] flex items-center justify-center px-4 py-16">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 30%, rgba(59,130,246,0.08), transparent)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        className="w-full max-w-md"
      >
        <div
          data-ocid="login.panel"
          className="bg-black/50 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 shadow-2xl"
          style={{
            boxShadow:
              "0 0 80px rgba(59,130,246,0.04), 0 0 0 1px rgba(255,255,255,0.05), 0 25px 50px rgba(0,0,0,0.5)",
          }}
        >
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
              <span className="text-blue-400 text-lg">⚡</span>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">
              DarkSanta
            </span>
          </div>

          <h1 className="text-white font-bold text-2xl tracking-tight mb-1">
            Welcome back
          </h1>
          <p className="text-white/40 text-sm mb-8">
            Sign in to your hosting panel
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="login-email"
                className="block text-xs uppercase tracking-wider text-white/40 mb-2"
              >
                Email
              </label>
              <input
                id="login-email"
                data-ocid="login.input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:border-blue-500/50 focus:bg-white/[0.07] focus:outline-none transition-all duration-300"
              />
            </div>

            <div>
              <label
                htmlFor="login-password"
                className="block text-xs uppercase tracking-wider text-white/40 mb-2"
              >
                Password
              </label>
              <input
                id="login-password"
                data-ocid="login.input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:border-blue-500/50 focus:bg-white/[0.07] focus:outline-none transition-all duration-300"
              />
            </div>

            <button
              data-ocid="login.submit_button"
              type="submit"
              disabled={loading}
              className="btn-premium ripple-effect w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl px-6 py-3 text-sm font-semibold hover:shadow-[0_0_24px_rgba(59,130,246,0.4)] active:scale-[0.98] mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-white/30 mt-6">
            Don&apos;t have an account?{" "}
            <button
              data-ocid="login.link"
              type="button"
              onClick={() => {
                window.location.hash = "#/";
              }}
              className="text-blue-400 hover:text-blue-300 transition-colors bg-transparent border-none cursor-pointer"
            >
              Deploy now
            </button>
          </p>
        </div>
      </motion.div>

      <BottomDock />
    </div>
  );
}
