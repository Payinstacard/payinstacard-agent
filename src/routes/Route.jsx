import { createBrowserRouter, defer } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import { HomeLayout } from "../layouts/HomeLayout";
import HomePage from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import AgentsLayout from "../layouts/AgentsLayout";
import { ProtectedLayout } from "../layouts/ProtectedLayout";
import ErrorPage from "../pages/ErrorPage";
// import { defer } from "lodash";
import Customers from "./../pages/Customers";
import AddNewCustomer from "../components/customerpage/AddNewCustomer";
import CustomersDetailsLayout from "../layouts/CustomerDetailLayout";
import BeneficiaryAccounts from "../components/customerpage/BeneficiaryAccounts";
import CustomerTransactions from "../components/customerpage/CustomerTransactions";
import CustomersTable from "../components/customerpage/CustomersTable";
import ProfileLayout from "../layouts/ProfileLayout";
import PersonalInfo from "../components/profilepage/PersonalInfo";
import BankInfo from "../components/profilepage/BankInfo";
import CustomerDetails from "../components/customerpage/CustomerDetails";
import MakeCustomerTransaction from "../components/customerpage/MakeNewCustomerTransaction";
import Transactions from "../components/transactionpage/Transactions";
import TransactionsTable from "../components/transactionpage/TransactionsTable";

const getUserData = async () => {
  const user = await window.localStorage.getItem("user");
  return user;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    loader: () => defer({ userPromise: getUserData() }),
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
          {
            path: "customers",
            element: <Customers />,
            children: [
              {
                path: "",
                element: <CustomersTable />,
              },
              {
                path: "add",
                element: <AddNewCustomer />,
              },
              // {
              //   path: "customer-details/:id",
              //   element: <CustomersDetailsLayout />,
              //   children: [
              //     {
              //       path: "",
              //       element: <BeneficiaryAccounts />,
              //     },
              //     {
              //       path: "transactions",
              //       element: <CustomerTransactions />,
              //     },
              //   ],
              // },
              {
                path: "customer-details/:id",
                element: <CustomersDetailsLayout />,
                children: [
                  {
                    path: "",
                    element: <CustomerDetails />,
                    children: [
                      {
                        path: "",
                        element: <BeneficiaryAccounts />,
                      },
                      {
                        path: "transactions",
                        element: <CustomerTransactions />,
                      },
                    ],
                  },
                  {
                    path: "make-new-transaction",
                    element: <MakeCustomerTransaction />,
                  },
                ],
              },
              // temporary remove edit customer functionality
              // {
              //   path: "edit/:id",
              //   element: <AddNewCustomer />,
              // },
            ],
          },
          {
            path: "transactions",
            element: <Transactions />,
            children: [
              {
                path: "",
                element: <TransactionsTable />,
              },
              // {
              //   path: "",
              //   element: <AddNewCustomer />,
              // },
            ],
          },
          {
            path: "profile",
            element: <ProfileLayout />,
            children: [
              {
                path: "",
                element: <PersonalInfo />,
              },
              {
                path: "bankinfo",
                element: <BankInfo />,
              },
            ],
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
