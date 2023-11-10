import { Navigate, Outlet, useOutlet } from "react-router-dom";
import { useAuth } from "../stores/AuthContext";

export const HomeLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <div>{outlet}</div>;
};
