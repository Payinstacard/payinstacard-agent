import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";

function Card(props) {
  const thousandSeparatorRegex = /(\d)(?=(\d{3})+(?!\d))/g;
  console.log("props==>", props);
  return (
    //   <div className="w-1/5 bg-gray-300 px-1 py-2 sm:px-3 sm:py-4 rounded-lg min-w-fit	">
    //     <h5 className="text-xs sm:text-sm font-semibold pb-0 sm:pb-2">
    //       {props?.title}
    //     </h5>
    //     <p className="font-bold text-md sm:text-2xl">
    //       {props?.number
    //         ? props?.data.toFixed(2).replace(thousandSeparatorRegex, "$1,")
    //         : props?.data}
    //     </p>?
    //   </div>
    <div
      //  className="w-1/4 rounded-lg custom-box-shadow px-4 py-3 bg-white min-w-fit"
      className={`${props.width} rounded-lg custom-box-shadow px-4 py-3 bg-white min-w-fit`}
    >
      <div className="mr-3">
        <div className="flex justify-between">
          <p className="text-xs sm:text-sm text-[#464748] py-3">
            {props?.title}
          </p>
          <button>
            <HiOutlineDotsVertical className="text-[#464748]" />
          </button>
        </div>
        <p className="text-lg sm:text-2xl font-semibold color mb-1 sm:mb-3">
          {/* {props?.number
            ? props?.data.toFixed(2).replace(thousandSeparatorRegex, "$1,")
            : props?.data} */}
          {props?.data ? props?.data : "0"}
        </p>
      </div>
      {/* <img src={props.icon} alt="" className="w-7 sm:w-10" /> */}
    </div>
  );
}

export default Card;
