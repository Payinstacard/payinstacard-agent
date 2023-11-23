import React, { useState } from "react";
import HamburgerButton from "../HamburgerMenuButton/HamburgerButton";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import DashboardIcon from "../../assets/svg/ProtectedLayoutImages/sidebar/DashBoard.svg";
import Customers from "../../assets/svg/ProtectedLayoutImages/sidebar/Sales.svg";
import Transactions from "../../assets/svg/ProtectedLayoutImages/sidebar/Transactions.svg";
import { useAuth } from "../../stores/AuthContext";

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
      src: DashboardIcon,
    },
    {
      title: "Customers",
      path: "/dashboard/customers",
      src: Customers,
    },
    {
      title: "Transactions",
      path: "/dashboard/transactions",
      src: Transactions,
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
