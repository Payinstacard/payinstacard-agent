import React from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

function ProfileLayout(props) {
  let url = useLocation();
  //   console.log(url.pathname);

  return (
    <div className="mt-4 sm:mt-10">
      {/* <div className=" flex flex-wrap justify-between gap-3 mt-8 bg-white rounded-md h-full flex-1 px-10 py-10 pt-14"> */}
      <div className="bg-white rounded-md">
        {/* <div className="bg-white p-9 rounded-lg"> */}
        <div className="">
          {/* <div className="border-b border-[#989898] text-lg py-4"> */}
          <div className=" border-b p-[19px] text-[#989898] flex flex-col md:flex-row items-center">
            <div className="text-[#989898] text-sm sm:text-base">
              <NavLink
                to=""
                className={
                  url.pathname === `/dashboard/profile`
                    ? "content_border text-primary font-bold mr-3 sm:mr-14 py-4"
                    : ""
                }
              >
                Personal Information
              </NavLink>
              <NavLink
                to="bankinfo"
                className={
                  url.pathname === `/dashboard/profile/bankinfo`
                    ? "content_border text-primary font-bold ml-3 sm:ml-14 py-4"
                    : ""
                }
              >
                Bank Information
              </NavLink>
            </div>
          </div>

          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}

export default ProfileLayout;
