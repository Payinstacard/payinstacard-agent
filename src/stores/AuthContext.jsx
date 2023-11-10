import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { auth, logout } from "../Firebase";

import _ from "lodash";

const AuthContext = createContext();

export function AuthContextProvider({ children, userData }) {
  const [user, setUser] = useLocalStorage("user", userData);
  const navigate = useNavigate();

  const [loading, setLoding] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      let userSessionTimeout = null;

      if (_.isNull(user) && userSessionTimeout) {
        clearTimeout(userSessionTimeout);
        userSessionTimeout = null;
      } else if (!_.isNull(user)) {
        loginCurrentUser(user);
        await user.getIdTokenResult().then((idTokenResult) => {
          const authTime = idTokenResult.claims.auth_time * 1000;
          const sessionDurationInMilliseconds = 2 * 60 * 60 * 1000; // 120 min
          const expirationInMilliseconds =
            sessionDurationInMilliseconds - (Date.now() - authTime);
          if (expirationInMilliseconds <= 0) {
            clearTimeout(userSessionTimeout);
            userSessionTimeout = null;
            logoutCurrentUser(false);
          } else {
            userSessionTimeout = setTimeout(() => {
              logoutCurrentUser(false);
            }, expirationInMilliseconds);
          }
        });
      }
      setLoding(false);
    });
    return () => unsubscribe();
  }, []);

  const loginCurrentUser = async (data) => {
    setUser(data);
    // navigate("/dashboard/rent-payouts");
  };

  const logoutCurrentUser = () => {
    logout();
    setUser(false);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      logout,
      loginCurrentUser,
      logoutCurrentUser,
      loading,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
