import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

export interface User {
  name: string;
  email: string;
  avatar?: string;
}

export type SubscriptionTier = "free" | "pro";

interface AuthBillingContextType {
  user: User | null;
  tier: SubscriptionTier;
  isSandbox: boolean;
  isLoading: boolean;
  login: (email: string, name: string) => Promise<boolean>;
  logout: () => void;
  triggerCheckout: (plan: "monthly" | "lifetime") => Promise<void>;
  openBillingPortal: () => Promise<void>;
  simulateWebhookPurchase: () => void;
  simulateWebhookCancellation: () => void;
}

const AuthBillingContext = createContext<AuthBillingContextType | undefined>(undefined);

export function AuthBillingProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [tier, setTier] = useState<SubscriptionTier>("free");
  const [isLoading, setIsLoading] = useState(true);

  // Read environment variable if defined. Fallback to sandbox if not.
  // In pure client-side build, we check if keys are configured.
  const isSandbox = !import.meta.env.VITE_LEMON_SQUEEZY_STORE_ID;

  useEffect(() => {
    // Load persisted state from localStorage for Sandbox mode persistence
    const savedUser = localStorage.getItem("saas_user");
    const savedTier = localStorage.getItem("saas_tier");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedTier) {
      setTier(savedTier as SubscriptionTier);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call latency
    await new Promise((resolve) => setTimeout(resolve, 800));

    const loggedInUser: User = {
      name: name || email.split("@")[0],
      email,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}`,
    };

    setUser(loggedInUser);
    localStorage.setItem("saas_user", JSON.stringify(loggedInUser));
    
    // Check if user has active pro subscription in DB (simulated via key)
    const existingTier = localStorage.getItem(`saas_tier_${email}`) || "free";
    setTier(existingTier as SubscriptionTier);
    localStorage.setItem("saas_tier", existingTier);

    setIsLoading(false);
    toast.success(`Welcome back, ${loggedInUser.name}!`);
    return true;
  };

  const logout = () => {
    setUser(null);
    setTier("free");
    localStorage.removeItem("saas_user");
    localStorage.removeItem("saas_tier");
    toast.info("Logged out successfully.");
  };

  const triggerCheckout = async (plan: "monthly" | "lifetime") => {
    if (!user) {
      toast.error("Please log in first to purchase a subscription.");
      return;
    }

    setIsLoading(true);
    toast.loading("Redirecting to checkout...", { id: "checkout" });

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (isSandbox) {
      toast.dismiss("checkout");
      setIsLoading(false);
      // In sandbox mode, redirect to our success route with mock session details
      const mockSessionId = `ls_test_${Math.random().toString(36).substr(2, 9)}`;
      window.location.href = `/payment/success?session_id=${mockSessionId}&plan=${plan}`;
    } else {
      // Production path: hit our server endpoint
      try {
        const response = await fetch("/api/lemonsqueezy/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            name: user.name,
            plan: plan,
            successUrl: `${window.location.origin}/payment/success?session_id={checkout_id}&plan=${plan}`,
            cancelUrl: `${window.location.origin}/payment/cancel`,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to create Lemon Squeezy checkout session");
        }

        const data = await response.json();
        if (data.url) {
          window.location.href = data.url;
        } else {
          throw new Error("No URL returned from checkout API");
        }
      } catch (err) {
        toast.dismiss("checkout");
        setIsLoading(false);
        toast.error("Error connecting to Lemon Squeezy. Please try again.");
        console.error(err);
      }
    }
  };

  const openBillingPortal = async () => {
    if (!user) return;
    setIsLoading(true);
    toast.loading("Opening billing portal...", { id: "billing-portal" });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.dismiss("billing-portal");
    setIsLoading(false);

    if (isSandbox) {
      // Sandbox warning
      toast.success("Billing portal is simulated in sandbox mode.");
    } else {
      // Production redirect to customer portal API
      try {
        const response = await fetch("/api/lemonsqueezy/portal", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email }),
        });
        const data = await response.json();
        if (data.url) {
          window.location.href = data.url;
        }
      } catch (err) {
        console.error(err);
        toast.error("Could not load billing portal.");
      }
    }
  };

  // Helper sandbox actions to test gating visual states directly
  const simulateWebhookPurchase = () => {
    if (!user) {
      toast.error("You must be logged in to simulate a webhook purchase.");
      return;
    }
    setTier("pro");
    localStorage.setItem("saas_tier", "pro");
    localStorage.setItem(`saas_tier_${user.email}`, "pro");
    toast.success("Sandbox Webhook: User account upgraded to PRO!", {
      description: "checkout.session.completed handled successfully.",
      duration: 5000,
    });
  };

  const simulateWebhookCancellation = () => {
    if (!user) return;
    setTier("free");
    localStorage.setItem("saas_tier", "free");
    localStorage.setItem(`saas_tier_${user.email}`, "free");
    toast.error("Sandbox Webhook: User subscription cancelled.", {
      description: "customer.subscription.deleted processed.",
      duration: 5000,
    });
  };

  return (
    <AuthBillingContext.Provider
      value={{
        user,
        tier,
        isSandbox,
        isLoading,
        login,
        logout,
        triggerCheckout,
        openBillingPortal,
        simulateWebhookPurchase,
        simulateWebhookCancellation,
      }}
    >
      {children}
    </AuthBillingContext.Provider>
  );
}

export function useAuthBilling() {
  const context = useContext(AuthBillingContext);
  if (context === undefined) {
    throw new Error("useAuthBilling must be used within an AuthBillingProvider");
  }
  return context;
}
