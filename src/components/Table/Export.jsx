import React from "react";
import downloadIcon from "../../assets/svg/download.svg";

const Export = ({ onExport }) => (
  <button
    className="bg-primary text-sm sm:text-base text-white hover:bg-blue-700 text-white font-bold items-center px-2 sm:py-2 sm:px-4 rounded font-normal h-[35px] sm:h-[42px] flex gap-1 sm:gap-2"
    onClick={(e) => onExport(e.target.value)}
  >
    <img src={downloadIcon} alt="" className=" w-4 h-4 sm:w-6 sm:h-6" />
    <span>Export</span>
  </button>
);

export default Export;
