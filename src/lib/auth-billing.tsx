import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

export interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, name: string) => Promise<boolean>;
  logout: () => void;
}

const AuthBillingContext = createContext<AuthContextType | undefined>(undefined);

export function AuthBillingProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("saas_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const loggedInUser: User = {
      name: name || email.split("@")[0],
      email,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}`,
    };

    setUser(loggedInUser);
    localStorage.setItem("saas_user", JSON.stringify(loggedInUser));

    setIsLoading(false);
    toast.success(`Welcome back, ${loggedInUser.name}!`);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("saas_user");
    toast.info("Logged out successfully.");
  };

  return (
    <AuthBillingContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
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
