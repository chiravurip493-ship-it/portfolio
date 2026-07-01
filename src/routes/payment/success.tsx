import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuthBilling } from "@/lib/auth-billing";
import { motion } from "framer-motion";
import { FiCheck, FiArrowRight } from "react-icons/fi";

export const Route = createFileRoute("/payment/success")({
  component: PaymentSuccess,
});

function PaymentSuccess() {
  const { user, simulateWebhookPurchase } = useAuthBilling();
  const [sessionId, setSessionId] = useState<string>("");
  const [plan, setPlan] = useState<string>("");

  useEffect(() => {
    // Extract query parameters
    const params = new URLSearchParams(window.location.search);
    setSessionId(params.get("session_id") || "cs_test_default");
    setPlan(params.get("plan") || "monthly");

    // In sandbox mode (or if we are just completing a mock checkout), 
    // automatically run the sandbox webhook simulator to grant access!
    // We add a tiny delay to simulate database synchronization latency.
    const timer = setTimeout(() => {
      simulateWebhookPurchase();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-[#0C0C0C] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Visual background lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

      {/* Main Success Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="
          w-full max-w-lg
          rounded-[40px]
          border border-white/10
          bg-white/[0.01] backdrop-blur-xl
          p-8 sm:p-12
          shadow-2xl
          text-center
          text-[#D7E2EA]
          relative
          z-10
        "
      >
        {/* Animated Check Circle */}
        <div className="flex justify-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.15)]"
          >
            <FiCheck className="w-10 h-10" />
          </motion.div>
        </div>

        {/* Text */}
        <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-3">
          Payment Successful!
        </h2>
        <p className="text-white/60 text-sm sm:text-base mb-8 max-w-xs mx-auto">
          Thank you for upgrading! Your subscription is active and all premium features are now unlocked.
        </p>

        {/* Details Box */}
        <div className="bg-white/[0.03] border border-white/5 rounded-[20px] p-5 mb-8 text-left text-xs sm:text-sm flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-white/40 uppercase tracking-wider">Account</span>
            <span className="text-white font-medium">{user?.email || "pranav@example.com"}</span>
          </div>
          <div className="flex justify-between items-center border-t border-white/5 pt-2.5">
            <span className="text-white/40 uppercase tracking-wider">Tier Status</span>
            <span className="text-emerald-400 font-bold uppercase tracking-wider">PRO Member</span>
          </div>
          <div className="flex justify-between items-center border-t border-white/5 pt-2.5">
            <span className="text-white/40 uppercase tracking-wider">Plan Selected</span>
            <span className="text-white font-medium capitalize">{plan} Plan</span>
          </div>
          <div className="flex flex-col gap-1 border-t border-white/5 pt-2.5">
            <span className="text-white/40 uppercase tracking-wider mb-0.5">Session ID</span>
            <span className="text-white/50 text-[10px] sm:text-xs font-mono select-all truncate">{sessionId}</span>
          </div>
        </div>

        {/* Action Button */}
        <Link
          to="/"
          hash="projects"
          className="
            inline-flex items-center justify-center gap-2
            w-full py-4 rounded-[15px]
            bg-white text-black font-bold uppercase tracking-wider text-sm
            hover:bg-[#EAEAEA] active:scale-[0.98]
            transition-all duration-200
            shadow-[0_0_30px_rgba(255,255,255,0.05)]
          "
        >
          Explore Unlocked Projects
          <FiArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </main>
  );
}
