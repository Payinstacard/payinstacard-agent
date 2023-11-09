import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../stores/AuthContext";

export const HomeLayout = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet></Outlet>;
};
