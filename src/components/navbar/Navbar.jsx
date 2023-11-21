import React from "react";
import BellIcon from "../../assets/svg/ProtectedLayoutImages/Bell_Icon.svg";
import SearchIcon from "../../assets/svg/ProtectedLayoutImages/SearchIcon.svg";
import PayinstaLogo from "../../assets/svg/payinstaLogo.svg";
import Profile from "./Profile";

function Navbar(props) {
  return (
    <div className="flex px-10 py-[17px] border-b">
      <div className="w-[196px]">
        <img src={PayinstaLogo} alt="" className="w-[63px]" />
      </div>
      <div className="grow flex justify-between items-center">
        <div className="relative ">
          <input
            type="search"
            placeholder="Search.."
            className="bg-[#F6F6F8] rounded-lg text-sm border-0 w-[300px] py-3 px-4 pl-[35px] "
          />
          <span className="absolute left-[12px] top-[16px]">
            <img src={SearchIcon} alt="" />
          </span>
        </div>
        <div>
          <div className="flex gap-4">
            <span>
              <img src={BellIcon} alt="" />
            </span>

            <Profile />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
