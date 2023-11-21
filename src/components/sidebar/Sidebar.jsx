import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import MenuItem from "./MenuItem";

import DashboardIcon from "../../assets/svg/ProtectedLayoutImages/sidebar/DashBoard.svg";
import Customers from "../../assets/svg/ProtectedLayoutImages/sidebar/Sales.svg";
import Transactions from "../../assets/svg/ProtectedLayoutImages/sidebar/Transactions.svg";
import LogOut from "../../assets/svg/ProtectedLayoutImages/sidebar/logout.svg";
import { useAuth } from "../../stores/AuthContext";

function Sidebar() {
  const [isSideBarExpand, setIsSideBarExpand] = useState(true);
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
    <>
      <div className="flex flex-col justify-between h-full">
        <ul className="py-10 px-6">
          {Menus.map((menu, index) => (
            <MenuItem
              menu={menu}
              src={menu.src}
              title={menu.title}
              path={menu.path}
              key={index}
            />
          ))}
        </ul>
        <ul className="px-6 pb-10 flex item-bottom">
          <li
            className="flex w-full gap-2 hover:bg-primary text-[#6A727A] hover:text-white py-3 pl-3 rounded-lg cursor-pointer mt-2"
            onClick={logout}
          >
            <span>
              <img src={LogOut} alt="" />
            </span>
            <span className="text-base">Log Out</span>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
