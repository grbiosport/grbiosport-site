import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { db } from "@/api/base44Client";
import { supabase } from "@/lib/supabaseClient";

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  isLoadingAuth: false,
  authChecked: false,
  isLoadingPublicSettings: false,
  authError: null,
  appPublicSettings: null,
  logout: async () => {},
  navigateToLogin: () => {},
  checkUserAuth: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [authError, setAuthError] = useState(null);

  const checkUserAuth = useCallback(async () => {
    setIsLoadingAuth(true);
    setAuthError(null);
    try {
      const currentUser = await db.auth.me();
      setUser(currentUser);
      setIsAuthenticated(Boolean(currentUser));
    } catch (err) {
      setUser(null);
      setIsAuthenticated(false);
      setAuthError({ type: "auth_error", message: err?.message || "Erro ao verificar sessão" });
    } finally {
      setIsLoadingAuth(false);
      setAuthChecked(true);
    }
  }, []);

  useEffect(() => {
    checkUserAuth();

    if (!supabase) return undefined;

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      checkUserAuth();
    });

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, [checkUserAuth]);

  const logout = useCallback(async (redirectTo) => {
    await db.auth.logout(redirectTo);
    setUser(null);
    setIsAuthenticated(false);
    setAuthChecked(true);
  }, []);

  const navigateToLogin = useCallback(() => {
    window.location.href = "/login";
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoadingAuth,
        authChecked,
        isLoadingPublicSettings: false,
        authError,
        appPublicSettings: null,
        logout,
        navigateToLogin,
        checkUserAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
