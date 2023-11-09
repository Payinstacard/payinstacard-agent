import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import { HomeLayout } from "../layouts/HomeLayout";
import HomePage from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import AgentsLayout from "../layouts/AgentsLayout";
import { ProtectedLayout } from "../layouts/ProtectedLayout";
import ErrorPage from "./../model/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: <HomeLayout />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/forgotpassword",
            element: <ForgotPassword />,
          },
        ],
      },
      {
        path: "/dashboard",
        element: <ProtectedLayout />,
        children: [
          {
            path: "",
            element: <AgentsLayout />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
