import React from "react";
import { useAuth } from "../stores/AuthContext";
import { useNavigate } from "react-router-dom";

function AgentsLayout(props) {
  const auth = useAuth();
  const navigation = useNavigate();

  const logout = () => {
    auth.logoutCurrentUser();
    navigation("/");
  };
  return (
    <>
      <h1>welcome to Agent dashboard layout</h1>

      <p>for logout</p>
      <button onClick={logout}>logout</button>
    </>
  );
}

export default AgentsLayout;
