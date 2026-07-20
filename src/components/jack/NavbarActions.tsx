import React, { useState, useRef, useEffect } from "react";
import { useAuthBilling } from "@/lib/auth-billing";
import { AuthModal } from "./AuthModal";
import { motion, AnimatePresence } from "framer-motion";
import { FiLogOut, FiChevronDown } from "react-icons/fi";

export function NavbarActions() {
  const {
    user,
    logout,
  } = useAuthBilling();

  const [isAuthOpen, setIsAuthOpen] = useState(false);
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
                </div>

                {/* Main Menu Links */}
                <div className="flex flex-col gap-1">

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
    </div>
  );
}
