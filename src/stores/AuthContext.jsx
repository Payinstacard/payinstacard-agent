import React, { createContext, useContext, useMemo } from "react";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const login = () => {
    // Simulate login logic
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Simulate logout logic
    setIsAuthenticated(false);
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      logout,
      login,
    }),
    [isAuthenticated]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
