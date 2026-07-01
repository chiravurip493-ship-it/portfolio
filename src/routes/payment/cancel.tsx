import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FiXCircle, FiArrowLeft, FiMail } from "react-icons/fi";

export const Route = createFileRoute("/payment/cancel")({
  component: PaymentCancel,
});

function PaymentCancel() {
  return (
    <main className="min-h-screen bg-[#0C0C0C] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Visual background lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-red-500/5 blur-[120px] pointer-events-none" />

      {/* Main Cancel Dialog */}
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
        {/* Animated Cancel Circle */}
        <div className="flex justify-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center border border-red-500/30 shadow-[0_0_40px_rgba(239,68,68,0.15)]"
          >
            <FiXCircle className="w-10 h-10" />
          </motion.div>
        </div>

        {/* Text */}
        <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-3">
          Checkout Cancelled
        </h2>
        <p className="text-white/60 text-sm sm:text-base mb-8 max-w-xs mx-auto">
          The payment checkout process was aborted. No funds have been deducted from your account.
        </p>

        {/* Assistance box */}
        <div className="bg-white/[0.02] border border-white/5 rounded-[20px] p-5 mb-8 text-center text-xs sm:text-sm">
          <p className="text-white/50 leading-relaxed">
            Need help or encountered an issue during checkout? You can reach out directly or try subscribing again.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/"
            hash="projects"
            className="
              inline-flex items-center justify-center gap-2
              py-4 rounded-[15px]
              bg-white text-black font-bold uppercase tracking-wider text-xs sm:text-sm
              hover:bg-[#EAEAEA] active:scale-[0.98]
              transition-all duration-200
              cursor-pointer
            "
          >
            <FiArrowLeft className="w-4 h-4" />
            Try Again
          </Link>

          <a
            href="mailto:pranav@example.com"
            className="
              inline-flex items-center justify-center gap-2
              py-4 rounded-[15px]
              border border-white/15 hover:border-white/20
              bg-white/[0.02] hover:bg-white/[0.04] text-white font-bold uppercase tracking-wider text-xs sm:text-sm
              active:scale-[0.98]
              transition-all duration-200
              cursor-pointer
            "
          >
            <FiMail className="w-4 h-4 text-white/70" />
            Contact Support
          </a>
        </div>
      </motion.div>
    </main>
  );
}
