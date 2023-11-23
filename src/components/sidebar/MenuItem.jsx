import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

function MenuItem(props) {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const activeButtonStyles = "active bg-primary text-white";
  const buttonStyles =
    "flex items-center gap-x-2 p-2 text-base font-normal rounded-r-full cursor-pointer hover:bg-primary hover:text-white";

  const handleClick = () => {
    setOpen(!open);
    props.setIsSideBarExpand(true);
  };

  return (
    <li>
      <NavLink
        to={props.menu.path}
        // className={({ isActive, isPending }) => {
        //   let linkClass = "";
        //   if (
        //     location.pathname === "/dashboard" &&
        //     props.menu.path === "/dashboard"
        //   ) {
        //     linkClass = activeButtonStyles;
        //   }
        //   return `${
        //     isPending ? "pending" : isActive ? activeButtonStyles : ""
        //   } ${linkClass} ${buttonStyles} mt-2
        //   `;
        // }}
        // className="flex gap-2 hover:bg-primary text-[#6A727A] hover:text-white py-3 pl-3 rounded-lg cursor-pointer mt-2"
        className={`${
          props.isSideBarExpand ? "pl-3" : "p-5"
        } flex gap-2 hover:bg-primary text-[#6A727A] hover:text-white py-3 rounded-lg cursor-pointer mt-2 `}
      >
        <span className="">
          <img src={props.menu.src} alt="" className="" />
        </span>
        {/* <span className="text-base">{props.menu.title}</span> */}
        {props.isSideBarExpand ? (
          <span className={`origin-left  text-base hover:block`}>
            {props.menu.title}
          </span>
        ) : null}
      </NavLink>
    </li>
  );
}

export default MenuItem;
