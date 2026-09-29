import { createContext, useContext, useEffect, useState } from "react";

import { getCurrentUser, logout as logoutUser } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  async function checkAuth() {
    try {
      const currentUser = await getCurrentUser();

      setUser(currentUser);
    } catch (error) {
      console.error("Authentication check failed:", error);

      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      await logoutUser();

      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);

      throw error;
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        checkAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
