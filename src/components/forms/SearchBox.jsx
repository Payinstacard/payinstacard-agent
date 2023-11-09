import React from "react";
import { FiSearch } from "react-icons/fi";

function SearchBox(props) {
  return (
    <>
      <form className=" hidden sm:flex w-1/3 flex flex-col  justify-center">
        <div className="relative ">
          <input
            type="serach"
            placeholder="Search in your flow"
            className="border  w-full px-2 py-2.5 rounded-md text-[12px]"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-white p-[3px] rounded-md">
            <FiSearch className="w-[20px] h-[20px]" />
          </button>
        </div>
      </form>
    </>
  );
}

export default SearchBox;
