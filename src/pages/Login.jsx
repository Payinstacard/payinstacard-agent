import React, { useState } from "react";
import LeftSideBlock from "../components/Auth/LeftSideBlock";
import Loader from "../components/Loader/Loader";
import LoginForm from "../components/Auth/LoginForm";

function Login() {
  const [load, setLoad] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [accountLock, setAccountLock] = useState(false);
  const [lockoutDuration, setLockOutDuration] = useState(0);

  return (
    <>
      {accountLock ? (
        <div
          class="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
          role="alert"
        >
          <span class="font-medium">Account is locked!</span> Please try again
          after.{Math.ceil(lockoutDuration / 60000)} minutes.
        </div>
      ) : (
        <div>
          {load ? (
            <Loader />
          ) : (
            <>
              <div class="min-h-screen text-gray-900 flex justify-center flex-col md:flex-row">
                <LeftSideBlock />
                <LoginForm
                  setLockOutDuration={setLockOutDuration}
                  loginAttempts={loginAttempts}
                  setLoginAttempts={setLoginAttempts}
                  accountLock={accountLock}
                  setAccountLock={setAccountLock}
                  setLoad={setLoad}
                />
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Login;
