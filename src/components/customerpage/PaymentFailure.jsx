import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import CardWrapper from "./CardWrapper";
import failure from "../../assets/svg/failure.svg";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";
import { MdOutlineArrowBack } from "react-icons/md";
import { getStatusText } from "../../utils/paygutils";

const PaymentFailure = (props) => {
  return (
    <CardWrapper
      className={
        "px-[1rem] xs:max-sm:px-[1.5rem] sm:max-md:px-[2.5rem] md:px-[1rem] lg:px-[1.5rem] xl:px-[2.5rem] flex flex-col gap-[2rem] py-[2rem] min-h-[420px] xs:min-h-[500px]"
      }
    >
      <p className="flex flex-row gap-[1rem] justify-between items-center text-black text-[1.2rem] xs:text-[1.5rem] font-bold">
        <Link to="/dashboard/customers">
          <MdOutlineArrowBack size={30} />
        </Link>
        <Link onClick={() => console.log("help page")}>
          <HiOutlineQuestionMarkCircle size={30} />
        </Link>
      </p>
      <div className="xs:max-md:px-[2.5rem] md:px-[1rem] lg:px-[2.5rem] flex flex-col gap-[1.5rem]">
        <div className="flex justify-center items-center flex-col">
          <div className="w-fit">
            <img src={failure} alt="" />
          </div>
          <hr className=" border-[#263238] w-[60%]" />
        </div>
        <div className="flex flex-col gap-[0.5rem]">
          <p className="text-[#FF4F5B] text-[1rem] sm:text-[1.2rem] font-bold text-center">
            Your payment of ₹{props?.amount || 0} was Unsuccessful.
          </p>
          <p className="text-[#FF4F5B] text-[1rem] sm:text-[1.2rem] font-bold text-center">
            Reason: {getStatusText(props?.reasonStatus) || "N/A"}
          </p>
          <p className="text-[0.8rem] sm:text-[1rem] font-[600] text-center">
            Transaction ID:{" "}
            <span className="text-[#7D7D7D]"> {props?.keyid || 0}</span>
          </p>
        </div>
        {/* <button
          type="submit"
          className={`
            bg-[#00006B]
           text-center w-full max-lg:text-[0.8rem] rounded-[30px] text-white py-[0.8rem] font-[800] flex flex-row items-center justify-center gap-[0.5rem]`}
        >
          Retry
        </button> */}
      </div>
    </CardWrapper>
  );
};

export default PaymentFailure;
