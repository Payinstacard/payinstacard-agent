import React, { Children, Suspense } from "react";
import { AuthContextProvider } from "../stores/AuthContext";
import { Await, useLoaderData, useOutlet } from "react-router-dom";
import Loader from "../components/common/Loader/Loader";

function AuthLayout() {
  const outlet = useOutlet();

  const { userPromise } = useLoaderData();

  return (
    <Suspense fallback={<Loader />}>
      <Await
        resolve={userPromise}
        errorElement={
          <div
            className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
            role="alert"
          >
            Something went wrong
          </div>
        }
        children={(user) => (
          <AuthContextProvider userData={user}>{outlet} </AuthContextProvider>
        )}
      />
    </Suspense>
  );
}

export default AuthLayout;
