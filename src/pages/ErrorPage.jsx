import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col w-full flex-grow justify-center items-center  ">
      <div className="flex flex-col items-center">
        <div className="flex flex-col text-center gap-[1rem]">
          <h2 className="text-[#565656] font-lato font-bold text-[1.2rem] xs:text-[1.8rem] sm:text-[2.2rem] md:text-[2.4rem] lg:text-[2.8rem]">
            Oops! Page Not Found
          </h2>
          <p className="text-[#565656] text-[0.8rem] xs:text-[1rem] sm:text-[1.2rem] md:text-[1.4rem] lg:text-[1.8rem] font-[600] font-lato">
            The page you’re looking for isn’t found{" "}
          </p>

          <Link to={"/"} className="flex justify-center">
            <button className="bg-[#00006B] text-white rounded-[100px] px-[2rem] py-[0.6rem] sm:py-[0.8rem]">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
