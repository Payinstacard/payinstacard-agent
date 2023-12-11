import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

function MenuItem(props) {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const activeButtonStyles = "active bg-primary text-white";
  const buttonStyles =
    "flex gap-2 hover:bg-primary text-[#6A727A] hover:text-white py-3 rounded-lg cursor-pointer";

  const handleClick = () => {
    setOpen(!open);
    props.setIsSideBarExpand(true);
  };

  return (
    <li className="mt-2">
      <NavLink
        // end
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

        // className={`${
        //   props.isSideBarExpand ? "pl-3 min-w-[144.17px]" : "p-5 min-w-[66px]"
        // } flex gap-2 hover:bg-primary text-[#6A727A] hover:text-white py-3 rounded-lg cursor-pointer`}

        className={({ isActive, isPending }) => {
          let linkClass = "";
          if (
            props.menu.path === "/dashboard" &&
            location.pathname !== props.menu.path
          ) {
            isActive = false;
          }

          return `${
            isPending ? "pending" : isActive ? activeButtonStyles : ""
          } ${linkClass} ${buttonStyles}
          ${
            props.isSideBarExpand ? "pl-3 min-w-[144.17px]" : "p-5 min-w-[66px]"
          } `;
        }}
      >
        <span className="">
          {/* <img src={props.menu.src} alt="" className="min-w-min" /> */}
          {props.menu.icon}
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
