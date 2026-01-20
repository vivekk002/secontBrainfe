import { useState, useEffect } from "react";
import { validateToken, logout } from "../utils/auth";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const isValid = validateToken();
      setIsAuthenticated(isValid);
    } else {
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "token") {
        checkAuth();
      }
    };

    const handleAuthStateChange = () => {
      checkAuth();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("authStateChanged", handleAuthStateChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("authStateChanged", handleAuthStateChange);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
  };

  const refreshAuth = () => {
    checkAuth();
  };

  return {
    isAuthenticated,
    isLoading,
    logout: handleLogout,
    refreshAuth,
  };
};
