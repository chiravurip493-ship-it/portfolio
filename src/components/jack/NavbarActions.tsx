import React, { useState, useRef, useEffect } from "react";
import { useAuthBilling } from "@/lib/auth-billing";
import { AuthModal } from "./AuthModal";
import { PricingModal } from "./PricingModal";
import { motion, AnimatePresence } from "framer-motion";
import { FiLogOut, FiCreditCard, FiAward, FiChevronDown, FiPlusCircle, FiMinusCircle } from "react-icons/fi";

export function NavbarActions() {
  const {
    user,
    tier,
    isSandbox,
    logout,
    openBillingPortal,
    simulateWebhookPurchase,
    simulateWebhookCancellation,
  } = useAuthBilling();

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-4 relative z-50">
      {!user ? (
        <>
          <button
            onClick={() => setIsAuthOpen(true)}
            className="
              text-[#D7E2EA]/80 hover:text-white
              font-semibold uppercase tracking-wider
              text-xs sm:text-sm
              transition-colors duration-200
              cursor-pointer
            "
          >
            Sign In
          </button>

          <button
            onClick={() => setIsPricingOpen(true)}
            className="
              relative overflow-hidden
              px-4 sm:px-5 py-2 sm:py-2.5
              rounded-full
              bg-white text-black hover:bg-[#EAEAEA]
              text-xs sm:text-sm font-bold uppercase tracking-wider
              transition-all duration-200
              active:scale-[0.98]
              cursor-pointer
              shadow-[0_0_20px_rgba(255,255,255,0.08)]
              hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]
            "
          >
            Go Pro
          </button>
        </>
      ) : (
        <div className="relative" ref={menuRef}>
          {/* User Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="
              flex items-center gap-2 sm:gap-3
              px-3.5 py-1.5 rounded-full
              bg-white/[0.04] hover:bg-white/[0.08]
              border border-white/10
              transition-all duration-200
              cursor-pointer
            "
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-white/10"
            />
            <span className="text-white font-medium text-xs sm:text-sm hidden sm:block">
              {user.name}
            </span>
            <FiChevronDown className={`text-white/60 w-4 h-4 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* User Menu Dropdown */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="
                  absolute right-0 mt-3
                  w-64
                  rounded-[20px]
                  border border-white/10
                  bg-[#0C0C0C]/95 backdrop-blur-xl
                  p-4
                  shadow-2xl
                  text-[#D7E2EA]
                  flex flex-col gap-3.5
                "
              >
                {/* Header Profile Section */}
                <div className="flex flex-col border-b border-white/5 pb-3">
                  <span className="text-white font-bold text-sm tracking-tight">{user.name}</span>
                  <span className="text-white/40 text-xs truncate mb-2">{user.email}</span>
                  
                  {/* Active Tier Tag */}
                  <div className="flex items-center mt-1">
                    {tier === "pro" ? (
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-extrabold text-emerald-400 bg-emerald-400/10 border border-emerald-400/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        PRO Member
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsPricingOpen(true);
                        }}
                        className="
                          flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-extrabold text-[#D7E2EA]/60 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 hover:border-white/10 transition-colors duration-200 cursor-pointer
                        "
                      >
                        Free Tier — Go Pro
                      </button>
                    )}
                  </div>
                </div>

                {/* Main Menu Links */}
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      openBillingPortal();
                    }}
                    className="
                      flex items-center gap-2.5 px-2.5 py-2 rounded-xl
                      hover:bg-white/[0.04] text-white/80 hover:text-white text-sm font-semibold
                      transition-all duration-200 cursor-pointer text-left
                    "
                  >
                    <FiCreditCard className="w-4 h-4 text-white/50" />
                    Billing Portal
                  </button>

                  {/* Sandbox Dev Settings */}
                  {isSandbox && (
                    <div className="flex flex-col gap-1.5 border-t border-b border-white/5 my-1.5 py-2">
                      <div className="text-[10px] font-bold text-amber-400 uppercase tracking-widest px-2.5 mb-1">
                        Developer Tools
                      </div>
                      
                      <button
                        onClick={() => {
                          setIsMenuOpen(false);
                          simulateWebhookPurchase();
                        }}
                        className="
                          flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg
                          hover:bg-amber-400/5 text-amber-300 hover:text-amber-200 text-xs font-semibold
                          transition-all duration-200 cursor-pointer text-left
                        "
                      >
                        <FiPlusCircle className="w-3.5 h-3.5 text-amber-400/70" />
                        Simulate Purchase
                      </button>

                      <button
                        onClick={() => {
                          setIsMenuOpen(false);
                          simulateWebhookCancellation();
                        }}
                        className="
                          flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg
                          hover:bg-amber-400/5 text-amber-300 hover:text-amber-200 text-xs font-semibold
                          transition-all duration-200 cursor-pointer text-left
                        "
                      >
                        <FiMinusCircle className="w-3.5 h-3.5 text-amber-400/70" />
                        Simulate Cancel
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      logout();
                    }}
                    className="
                      flex items-center gap-2.5 px-2.5 py-2 rounded-xl
                      hover:bg-red-500/10 text-red-400/80 hover:text-red-400 text-sm font-semibold
                      transition-all duration-200 cursor-pointer text-left
                    "
                  >
                    <FiLogOut className="w-4 h-4 text-red-400/60" />
                    Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Render Modals Inline */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
        onOpenAuth={() => {
          setIsPricingOpen(false);
          setIsAuthOpen(true);
        }}
      />
    </div>
  );
}
