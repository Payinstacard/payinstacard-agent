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
import { useDispatch } from "react-redux";
import { fetchAgent } from "./AgentRedux";

import _ from "lodash";
import { BASE_URL, GET_USER_ROLE } from "../services/apiConstant";
import { toast } from "react-toastify";

const AuthContext = createContext();

export function AuthContextProvider({ children, userData }) {
  const [userAuthData, setUserAuthData] = useLocalStorage("user", userData);
  const [user, setUser] = useLocalStorage("user", userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoding] = useState(true);

  function getAccessToken() {
    return userAuthData?.getIdToken(true);
  }
  const getUserRoleFunc = async (user) => {
    try {
      const result = await fetch(BASE_URL + GET_USER_ROLE, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      }).then(async (result) => {
        console.log(result);
        return await result.json();
      });
      // const resultJson = await result.json();

      // // console.log(resultJson);
      if (result.status !== true && result.code === 400) {
        logoutCurrentUser();
        toast("You are not authorized user", {
          theme: "dark",
          hideProgressBar: true,
          type: "error",
        });
      }
      if (result.status !== true) {
        throw new Error("Failed to login");
      }

      setUser({ ...user, role: result.response.role });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      let userSessionTimeout = null;
      console.log("user====>", user);
      if (_.isNull(user) && userSessionTimeout) {
        clearTimeout(userSessionTimeout);
        userSessionTimeout = null;
      } else if (!_.isNull(user)) {
        loginCurrentUser(user);
        dispatch(fetchAgent());
        await user.getIdTokenResult().then((idTokenResult) => {
          console.log(idTokenResult);
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
    setUserAuthData(data);
    const userdata = getUserRoleFunc(data);
    // setUser(userdata);
    // navigate("/dashboard/rent-payouts");
  };

  const logoutCurrentUser = (redirect = true) => {
    logout();
    setUser(false);
    if (redirect) navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      logout,
      loginCurrentUser,
      getAccessToken,
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
