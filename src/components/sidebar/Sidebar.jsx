import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import MenuItem from "./MenuItem";

import DashboardIcon from "../../assets/svg/ProtectedLayoutImages/sidebar/DashBoard.svg";
import Customers from "../../assets/svg/ProtectedLayoutImages/sidebar/Sales.svg";
import Transactions from "../../assets/svg/ProtectedLayoutImages/sidebar/Transactions.svg";
import LogOut from "../../assets/svg/ProtectedLayoutImages/sidebar/logout.svg";
import { useAuth } from "../../stores/AuthContext";
import { BsArrowLeftCircle } from "react-icons/bs";

function Sidebar() {
  const [isSideBarExpand, setIsSideBarExpand] = useState(false);
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
      {/* <div className="flex flex-col justify-between h-full"> */}
      <div
        className={`${
          isSideBarExpand ? "w-60 p-4" : "w-fit p-3"
        } bg-white shadow-lg h-screen sticky top-0 hidden sm:block relative duration-300 border-r  `}
      >
        <BsArrowLeftCircle
          className={`${
            !isSideBarExpand && "rotate-180"
          } absolute text-2xl bg-white  cursor-pointer top-6 -right-3`}
          onClick={() => setIsSideBarExpand(!isSideBarExpand)}
        />
        <div className="h-4/5 flex flex-col justify-between">
          <ul
            // className="py-10 px-6"
            className={`${isSideBarExpand ? "py-0 px-6" : "py-0 px-3"}`}
          >
            {Menus.map((menu, index) => (
              <MenuItem
                menu={menu}
                src={menu.src}
                title={menu.title}
                path={menu.path}
                key={index}
                setIsSideBarExpand={setIsSideBarExpand}
                isSideBarExpand={isSideBarExpand}
              />
            ))}
          </ul>
          <ul
            // className="px-6 pb-10 flex item-bottom"
            className={`${
              isSideBarExpand ? "py-10 px-6 flex item-bottom" : "py-0 px-3"
            }`}
          >
            <li
              // className="flex w-full gap-2 hover:bg-primary text-[#6A727A] hover:text-white py-3 pl-3 rounded-lg cursor-pointer mt-2"
              className={`${
                isSideBarExpand ? "pl-3" : "p-5"
              } flex w-full gap-2 hover:bg-primary text-[#6A727A] hover:text-white py-3 rounded-lg cursor-pointer mt-2`}
              onClick={logout}
            >
              <span>
                <img src={LogOut} alt="" />
              </span>
              {/* <span className="text-base">Log Out</span> */}
              {isSideBarExpand ? (
                <span className={`origin-left text-base hover:block`}>
                  {/* {props.menu.title} */}Log Out
                </span>
              ) : null}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
