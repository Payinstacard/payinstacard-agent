import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import MenuItem from "./MenuItem";

import DashboardIcon from "../../assets/svg/ProtectedLayoutImages/sidebar/DashBoard.svg";
import Sales from "../../assets/svg/ProtectedLayoutImages/sidebar/Sales.svg";
import LogOut from "../../assets/svg/ProtectedLayoutImages/sidebar/logout.svg";

function Sidebar() {
  const [isSideBarExpand, setIsSideBarExpand] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation();

  const Menus = [
    {
      title: "Dashboard",
      path: "/dashboard",
      src: DashboardIcon,
    },
    {
      title: "Sales",
      path: "/dashboard/sales",
      src: Sales,
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
      <div className="flex flex-col justify-between">
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
        {/* <div className="flex">
          <span>
            <img src={LogOut} alt="" />
          </span>
          <span className="text-sm">Log Out</span>
        </div> */}
      </div>
    </>
  );
}

export default Sidebar;
