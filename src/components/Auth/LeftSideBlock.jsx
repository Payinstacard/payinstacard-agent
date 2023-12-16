import React from "react";
import LoginCard1 from "../../assets/img/LoginCard1.png";
import UsersAvatars from "../../assets/img/UsersAvatars.png";

const LeftSideBlock = () => {
  return (
    <div className="flex-1 flex items-center relative hidden md:flex flex-col md:flex-row w-[100%] md:w-[50%]">
      <img
        className="absolute left-0 top-0 w-full h-full z-1 object-cover"
        src={LoginCard1}
        alt=""
      />
      <div className="text-white text-lg text-center md:text-left z-10 my-10 md:my-20 mx-5 md:mx-10 lg:mx-28">
        <h1 className="font-bold text-2xl md:text-5xl mb-8 leading-tight w-[100%] md:w-[300px]">
          Start your new journey.
        </h1>
        <p className="leading-5 w-[100%] sm:w-[200px] md:w-[340px]">
          Use these awesome forms to login or create new account in your project
          for free
        </p>
        <div className="mt-6 flex gap-2 item-center justify-center md:justify-start">
          <img src={UsersAvatars} alt="usersAvatars" />
          <p>Join 2.5M+ users</p>
        </div>
      </div>
      <p className="relative md:absolute md:bottom-14 text-white z-10  mb-3 mx-5 md:mx-10 lg:mx-28">
        All rights reserved. Copyright © 2023PAYINSTACARD PRIVATE LIMITED
      </p>
    </div>
  );
};

export default LeftSideBlock;
