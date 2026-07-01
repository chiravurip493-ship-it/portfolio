import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthBilling } from "@/lib/auth-billing";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { login } = useAuthBilling();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (isSignUp && !name) {
      toast.error("Please enter your name.");
      return;
    }

    setIsLoading(true);
    try {
      await login(email, name);
      onClose();
    } catch (err) {
      toast.error("Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    toast.loading(`Connecting to ${provider}...`, { id: "social-login" });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.dismiss("social-login");
    await login(`demo_${provider.toLowerCase()}@example.com`, `Developer ${provider}`);
    setIsLoading(false);
    onClose();
  };

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
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="
              relative z-10
              w-full max-w-md
              rounded-[30px]
              border border-white/10
              bg-[#0C0C0C]
              p-8 sm:p-10
              shadow-2xl
              text-[#D7E2EA]
            "
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="
                absolute top-6 right-6
                text-white/60 hover:text-white
                bg-white/5 hover:bg-white/10
                p-2 rounded-full
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
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-2">
                {isSignUp ? "Create Account" : "Welcome Back"}
              </h3>
              <p className="text-sm text-white/50">
                {isSignUp
                  ? "Sign up to access premium components & downloads"
                  : "Sign in to manage your premium access"}
              </p>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                type="button"
                onClick={() => handleSocialLogin("Google")}
                className="
                  flex items-center justify-center gap-2
                  py-3 rounded-[15px]
                  border border-white/10
                  bg-white/[0.02] hover:bg-white/[0.05]
                  transition-all duration-200
                  text-sm font-medium
                  cursor-pointer
                "
              >
                <FcGoogle className="w-5 h-5" />
                Google
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin("GitHub")}
                className="
                  flex items-center justify-center gap-2
                  py-3 rounded-[15px]
                  border border-white/10
                  bg-white/[0.02] hover:bg-white/[0.05]
                  transition-all duration-200
                  text-sm font-medium
                  cursor-pointer
                "
              >
                <FaGithub className="w-5 h-5 text-white" />
                GitHub
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="h-[1px] bg-white/10 flex-1"></div>
              <span className="text-xs text-white/35 uppercase tracking-widest">or email</span>
              <div className="h-[1px] bg-white/10 flex-1"></div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {isSignUp && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase tracking-wider text-white/50 font-medium">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Pranav"
                    className="
                      w-full px-4 py-3 rounded-[15px]
                      bg-white/[0.03] border border-white/10
                      focus:border-white/20 focus:outline-none
                      transition-colors duration-200
                      placeholder:text-white/20
                    "
                  />
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-wider text-white/50 font-medium">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="
                    w-full px-4 py-3 rounded-[15px]
                    bg-white/[0.03] border border-white/10
                    focus:border-white/20 focus:outline-none
                    transition-colors duration-200
                    placeholder:text-white/20
                  "
                />
              </div>

              <div className="flex flex-col gap-1.5 mb-2">
                <label className="text-xs uppercase tracking-wider text-white/50 font-medium">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="
                    w-full px-4 py-3 rounded-[15px]
                    bg-white/[0.03] border border-white/10
                    focus:border-white/20 focus:outline-none
                    transition-colors duration-200
                    placeholder:text-white/20
                  "
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="
                  w-full py-4 rounded-[15px]
                  bg-white text-black font-semibold uppercase tracking-wider
                  hover:bg-[#EAEAEA]
                  active:scale-[0.98]
                  transition-all duration-200
                  disabled:opacity-50
                  mt-4
                  cursor-pointer
                  flex items-center justify-center
                "
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-black" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : isSignUp ? (
                  "Create Account"
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Toggle Footer */}
            <div className="text-center mt-6 text-sm">
              <span className="text-white/40">
                {isSignUp ? "Already have an account? " : "New to our platform? "}
              </span>
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-white font-medium hover:underline cursor-pointer"
              >
                {isSignUp ? "Sign In" : "Create one now"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
