import React, { useState } from "react";
import HamburgerButton from "../common/HamburgerMenuButton/HamburgerButton";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../stores/AuthContext";
import { ReactComponent as DashboardSvg } from "../../assets/svg/ProtectedLayoutImages/sidebar/DashBoard.svg";
import { ReactComponent as Customers } from "../../assets/svg/ProtectedLayoutImages/sidebar/Sales.svg";
import { ReactComponent as Profile } from "../../assets/svg/ProtectedLayoutImages/sidebar/Profiles.svg";
import { ReactComponent as LogOut } from "../../assets/svg/ProtectedLayoutImages/sidebar/logout.svg";
import { ReactComponent as Withdraw } from "../../assets/svg/withdrawIcon.svg";

import { ReactComponent as Transaction } from "../../assets/svg/transactionIcon.svg";
import { ReactComponent as Report } from "../../assets/svg/reportsIcon.svg";

function MobileMenu(props) {
  const [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation();

  const auth = useAuth();
  const navigation = useNavigate();

  const logout = () => {
    auth.logoutCurrentUser();
    navigation("/");
  };

  const Menus = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <DashboardSvg />,
    },
    {
      title: "Customers",
      path: "/dashboard/customers",
      icon: <Customers />,
    },
    {
      title: "Transactions",
      path: "/dashboard/transactions",
      icon: <Transaction />,
    },
    {
      title: "Withdraw",
      path: "/dashboard/withdraw",
      icon: <Withdraw />,
    },
    // {
    //   title: "Reports",
    //   path: "/dashboard/reports",
    //   icon: <Report />,
    // },
    {
      title: "Profile",
      path: "/dashboard/profile",
      icon: <Profile />,
    },
    // { title: "Users", path: "/dashboard/users", src: <CgProfile /> },
    // {
    //   title: "Transactions",
    //   path: "/dashboard/transactions",
    //   src: <MdUsb />,
    // },
    // {
    //   title: "Agents Management",
    //   path: "/dashboard/agentsmanagement",
    //   src: <PiUserListDuotone />,
    // },
    // {
    //   title: "Banking",
    //   path: "/dashboard/banking",
    //   src: <BsBank2 />,
    // },
  ];
  return (
    <div className="block sm:hidden mt-2">
      <div className="">
        <HamburgerButton
          setMobileMenu={setMobileMenu}
          mobileMenu={mobileMenu}
        />
      </div>
      <div className="sm:hidden">
        <div
          className={`${
            mobileMenu ? "flex" : "hidden"
          } absolute z-50 flex-col items-center self-end py-8 mt-8 space-y-6 font-bold sm:w-auto left-6 right-6 dark:text-white  bg-primary dark:bg-primary drop-shadow md rounded-xl`}
        >
          {Menus.map((menu, index) => (
            <NavLink
              to={menu.path}
              key={index}
              onClick={() => setMobileMenu(false)}
            >
              <span
                className={` ${
                  location.pathname === menu.path &&
                  "bg-gray-200 dark:bg-gray-700"
                } p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700`}
              >
                {menu.title}
              </span>
            </NavLink>
          ))}
          <NavLink onClick={logout}>
            {" "}
            <span
              className={` p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700`}
            >
              Log Out
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
