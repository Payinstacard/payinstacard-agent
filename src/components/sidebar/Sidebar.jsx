import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import MenuItem from "./MenuItem";

import { ReactComponent as DashboardSvg } from "../../assets/svg/ProtectedLayoutImages/sidebar/DashBoard.svg";
import { ReactComponent as Customers } from "../../assets/svg/ProtectedLayoutImages/sidebar/Sales.svg";
import { ReactComponent as Profile } from "../../assets/svg/ProtectedLayoutImages/sidebar/Profiles.svg";
import { ReactComponent as LogOut } from "../../assets/svg/ProtectedLayoutImages/sidebar/logout.svg";
import { useAuth } from "../../stores/AuthContext";
import { BsArrowLeftCircle } from "react-icons/bs";
// import DashboardSvg from "../svgcomponents/DashboardSvg";

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
      icon: <DashboardSvg />,
    },
    {
      title: "Customers",
      path: "/dashboard/customers",
      icon: <Customers />,
    },
    {
      title: "profile",
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
    <>
      {/* <div className="flex flex-col justify-between h-full"> */}
      <div
        className={`${
          isSideBarExpand ? "w-60 p-4" : "w-fit p-3"
        } bg-white shadow-lg h-[calc(100vh-100px)] sticky top-0 hidden sm:block relative duration-300 border-r max-h-[1017px]`}
      >
        <BsArrowLeftCircle
          className={`${
            !isSideBarExpand && "rotate-180"
          } absolute text-2xl  cursor-pointer top-6 -right-3`}
          onClick={() => setIsSideBarExpand(!isSideBarExpand)}
        />
        <div className="h-full flex flex-col justify-between">
          <ul
            // className="py-10 px-6"
            className={`${isSideBarExpand ? "py-0" : "py-0 px-3"}`}
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
              isSideBarExpand ? "py-5 px-6 flex item-bottom" : "py-0 px-3"
            } border-[#EFF0F2] border-t-[1px]`}
          >
            <li
              // className="flex w-full gap-2 hover:bg-primary text-[#6A727A] hover:text-white py-3 pl-3 rounded-lg cursor-pointer mt-2"
              className={`${
                isSideBarExpand ? "pl-3 min-w-[144.17px]" : "p-5 min-w-[66px]"
              } flex w-full gap-2 hover:bg-primary text-[#6A727A] hover:text-white py-3 rounded-lg cursor-pointer `}
              onClick={logout}
            >
              <span>
                {/* <img src={LogOut} alt="" className="min-w-min" /> */}
                <LogOut />
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
