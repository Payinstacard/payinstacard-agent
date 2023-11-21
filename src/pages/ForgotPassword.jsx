import React from "react";
import ForgotPasswordForm from "../components/Auth/ForgotPasswordForm";
import LeftSideBlock from "../components/Auth/LeftSideBlock";

function ForgotPassword() {
  return (
    <div class="min-h-screen text-gray-900 flex justify-center flex-col md:flex-row">
      <LeftSideBlock />
      <ForgotPasswordForm />
    </div>
  );
}

export default ForgotPassword;
