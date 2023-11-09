import React, { Children } from "react";
import { AuthContextProvider } from "../stores/AuthContext";
import { Outlet } from "react-router-dom";
import validate from "./../schemas/AgentValidation";

function AuthLayout() {
  return (
    <AuthContextProvider>
      <Outlet></Outlet>
    </AuthContextProvider>
  );
}

export default AuthLayout;
