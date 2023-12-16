import React, { useState } from "react";
import BellIcon from "../../assets/svg/ProtectedLayoutImages/Bell_Icon.svg";
import SearchIcon from "../../assets/svg/ProtectedLayoutImages/SearchIcon.svg";
import PayinstaLogo from "../../assets/svg/payinstaLogo.svg";
import Profile from "./Profile";
import MobileMenu from "./MobileMenu";
import NotificationPopup from "./NotificationPopup";

function Navbar(props) {
  const [IsNotificationPopupOpen, setIsNotificationPopupOpen] = useState(false);
  return (
    <div className="flex px-5 sm:px-10 py-[10px] sm:py-[17px] border-b">
      <div className="w-[196px] hidden sm:block">
        <img src={PayinstaLogo} alt="" className="w-[63px]" />
      </div>
      <MobileMenu />
      <div className="grow flex justify-end  min-[834px]:justify-between items-center">
        <div className="relative hidden min-[834px]:block ">
          <input
            type="search"
            placeholder="Search.."
            className="bg-[#F6F6F8] rounded-lg text-sm border-0 w-[300px] py-3 px-4 pl-[35px] "
          />
          <span className="absolute left-[12px] top-[16px]">
            <img src={SearchIcon} alt="" />
          </span>
        </div>
        <div className="scroll">
          <div className="flex gap-4 cursor-pointer">
            <span>
              <img
                src={BellIcon}
                alt=""
                onClick={() =>
                  setIsNotificationPopupOpen(!IsNotificationPopupOpen)
                }
                className={`${
                  IsNotificationPopupOpen
                    ? "border-2 border-[#00006b] rounded-[50%]"
                    : ""
                }`}
              />
            </span>
            <Profile />
          </div>
          {IsNotificationPopupOpen ? <NotificationPopup /> : <></>}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
