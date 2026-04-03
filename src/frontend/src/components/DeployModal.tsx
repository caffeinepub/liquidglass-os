import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const STEPS = [
  "Allocating resources",
  "Configuring node",
  "Deploying server",
  "Server online",
];

interface DeployModalProps {
  onClose: () => void;
}

export default function DeployModal({ onClose }: DeployModalProps) {
  const [currentStep, setCurrentStep] = useState(-1);
  const [done, setDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Start stepping through
    const startDelay = setTimeout(() => {
      setCurrentStep(0);
      intervalRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          const next = prev + 1;
          if (next >= STEPS.length - 1) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setDone(true);
            // Auto-navigate after 1s
            setTimeout(() => {
              window.location.hash = "#/nodes";
            }, 1000);
          }
          return next;
        });
      }, 700);
    }, 300);

    return () => {
      clearTimeout(startDelay);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !done) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [done, onClose]);

  const progress =
    currentStep < 0 ? 0 : Math.round(((currentStep + 1) / STEPS.length) * 100);

  return (
    <AnimatePresence>
      <motion.div
        data-ocid="deploy.modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[100] flex items-center justify-center px-4"
        onClick={(e) => {
          if (e.target === e.currentTarget && !done) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.97 }}
          transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
          className="w-full max-w-md bg-[#0B0B0F] border border-white/[0.08] rounded-2xl p-8 shadow-2xl"
        >
          {/* Header */}
          <div className="mb-7">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                <span className="text-blue-400 text-sm">⚡</span>
              </div>
              <span className="text-white font-bold text-base tracking-tight">
                Deploying Server
              </span>
            </div>
            <p className="text-white/40 text-sm">
              Your Minecraft server is being provisioned.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-3 mb-7">
            {STEPS.map((step, i) => {
              const isComplete = i <= currentStep;
              const isActive = i === currentStep + 1;
              return (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-400 ${
                      isComplete
                        ? "bg-emerald-500/20 border border-emerald-500/40"
                        : "bg-white/[0.04] border border-white/[0.08]"
                    }`}
                  >
                    {isComplete ? (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 20,
                        }}
                        className="text-emerald-400 text-xs"
                      >
                        ✓
                      </motion.span>
                    ) : (
                      <span
                        className={`text-xs ${
                          isActive ? "text-white/30" : "text-white/20"
                        }`}
                      >
                        ·
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-sm transition-all duration-300 ${
                      isComplete ? "text-white" : "text-white/30"
                    }`}
                  >
                    {step}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="bg-white/[0.06] rounded-full h-1 mb-5 overflow-hidden">
            <motion.div
              className="bg-blue-500 h-1 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            />
          </div>

          {/* Done state */}
          <AnimatePresence>
            {done && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 justify-center py-2"
              >
                <span
                  className="text-emerald-400 font-semibold text-sm"
                  style={{
                    textShadow: "0 0 16px rgba(52,211,153,0.5)",
                  }}
                >
                  ✓ Server Online! Redirecting...
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {!done && (
            <button
              data-ocid="deploy.close_button"
              type="button"
              onClick={onClose}
              className="w-full text-white/30 hover:text-white/60 text-xs transition-colors text-center mt-1"
            >
              Cancel
            </button>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
