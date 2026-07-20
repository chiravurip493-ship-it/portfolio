import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthBilling } from "@/lib/auth-billing";
import { toast } from "sonner";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAuth: () => void;
}

export function PricingModal({ isOpen, onClose, onOpenAuth }: PricingModalProps) {
  const { user, triggerCheckout, isSandbox } = useAuthBilling();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "lifetime">("monthly");
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleSubscribe = async () => {
    if (!user) {
      toast.error("Please sign in or create an account to upgrade.");
      onOpenAuth();
      return;
    }

    setIsRedirecting(true);
    try {
      await triggerCheckout(billingCycle);
    } catch (err) {
      toast.error("Error creating checkout session. Please try again.");
    } finally {
      setIsRedirecting(false);
    }
  };

  const features = [
    "Full access to 3D Lamborghini source code",
    "Interactive Web & Custom Web templates library",
    "E-Commerce Game-Style design elements",
    "Premium support and setup walkthroughs",
    "Commercial usage rights for all templates",
    "Future premium project releases included",
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="
              relative z-10
              w-full max-w-2xl
              rounded-[40px]
              border border-white/10
              bg-[#0C0C0C]/95
              p-6 sm:p-10 md:p-12
              shadow-2xl
              text-[#D7E2EA]
              max-h-[90vh]
              overflow-y-auto
            "
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="
                absolute top-6 right-6
                text-white/60 hover:text-white
                bg-white/5 hover:bg-white/10
                p-2.5 rounded-full
                transition-all duration-200
                cursor-pointer
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="text-center mb-8 sm:mb-10">
              <span className="text-white/50 uppercase tracking-[0.25em] text-xs sm:text-sm font-semibold">
                PRANAV PORTFOLIO PRO
              </span>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mt-2 mb-3">
                Unlock Premium Access
              </h3>
              <p className="text-sm sm:text-base text-white/60 max-w-md mx-auto">
                Get full access to highly custom, interactive 3D Web Templates & complete commercial source code.
              </p>
            </div>

            {/* Billing Cycle Switcher */}
            <div className="flex justify-center mb-8">
              <div className="relative flex bg-white/5 p-1.5 rounded-[20px] border border-white/5">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`
                    px-6 py-2.5 rounded-[15px] text-sm font-semibold uppercase tracking-wider transition-all duration-300 relative z-10 cursor-pointer
                    ${billingCycle === "monthly" ? "text-black" : "text-white/60 hover:text-white"}
                  `}
                >
                  Monthly Plan
                </button>
                <button
                  onClick={() => setBillingCycle("lifetime")}
                  className={`
                    px-6 py-2.5 rounded-[15px] text-sm font-semibold uppercase tracking-wider transition-all duration-300 relative z-10 cursor-pointer
                    ${billingCycle === "lifetime" ? "text-black" : "text-white/60 hover:text-white"}
                  `}
                >
                  Lifetime Access
                </button>

                {/* Animated sliding background pill */}
                <motion.div
                  className="absolute top-1.5 bottom-1.5 left-1.5 bg-white rounded-[15px]"
                  animate={{
                    x: billingCycle === "monthly" ? 0 : "100%",
                    width: billingCycle === "monthly" ? 134 : 156,
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Features List (Left) */}
              <div className="md:col-span-7 flex flex-col gap-4">
                <h4 className="text-xs uppercase tracking-[0.2em] text-white/40 font-bold mb-1">
                  What's Included
                </h4>
                <ul className="flex flex-col gap-3">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm sm:text-base">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mt-0.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-3.5 h-3.5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price & Checkout Card (Right) */}
              <div className="md:col-span-5 w-full">
                <div
                  className="
                    rounded-[30px]
                    border border-white/10
                    bg-white/[0.02]
                    p-6 sm:p-8
                    text-center
                    relative
                    overflow-hidden
                    shadow-lg
                  "
                >
                  {/* Subtle Gradient Glow behind price */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.01] to-white/[0.04] pointer-events-none" />

                  <span className="text-xs uppercase tracking-[0.2em] text-white/50 font-bold block mb-1">
                    {billingCycle === "monthly" ? "Recurring" : "One-Time"}
                  </span>

                  <div className="flex items-baseline justify-center gap-1 mb-4">
                    <span className="text-4xl sm:text-5xl font-black text-white">
                      {billingCycle === "monthly" ? "$9" : "$49"}
                    </span>
                    <span className="text-white/50 text-sm">
                      {billingCycle === "monthly" ? "/month" : " USD"}
                    </span>
                  </div>

                  <p className="text-xs text-white/40 mb-6 leading-relaxed">
                    {billingCycle === "monthly"
                      ? "Cancel anytime. Safe Stripe processing."
                      : "Lifetime access. All updates included."}
                  </p>

                  <button
                    onClick={handleSubscribe}
                    disabled={isRedirecting}
                    className="
                      w-full py-3.5 rounded-[15px]
                      bg-white text-black font-bold uppercase tracking-wider text-sm
                      hover:bg-[#EAEAEA]
                      active:scale-[0.98]
                      transition-all duration-200
                      disabled:opacity-50
                      cursor-pointer
                      flex items-center justify-center
                      gap-2
                    "
                  >
                    {isRedirecting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Securing Link...
                      </>
                    ) : (
                      "Subscribe Now"
                    )}
                  </button>

                  {isSandbox && (
                    <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-wider text-amber-400 font-bold bg-amber-400/10 py-1.5 px-3 rounded-[10px] border border-amber-400/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      Sandbox Developer Mode Active
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
