import { default as React } from "react";
import { FiSearch } from "react-icons/fi";

const TableFilterComponent = ({ filterText, onFilter, onClear, bgColor }) => {
  return (
    <>
      <div className="">
        <div className="relative flex w-full items-stretch">
          <input
            id="search"
            type="text"
            placeholder="Search"
            aria-label="Search"
            value={filterText}
            onChange={onFilter}
            className={` ${bgColor} relative m-0 block flex-auto rounded-[5px] border-0 active:border-0  pl-7 py-2 text-sm sm:text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-0 focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-0 dark:text-neutral-200 dark:placeholder:text-black-100 dark:focus:border-0`}
          />

          <FiSearch
            size={18}
            className="absolute left-2 top-0 bottom-0 m-auto text-neutral-700 z-10"
          />
          {filterText !== "" && (
            <button
              className="absolute right-0 z-10 flex items-center rounded-r bg-primary hover:bg-blue-700 px-2 py-2 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
              type="button"
              id="button-addon1"
              data-te-ripple-init
              data-te-ripple-color="light"
              onClick={onClear}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      {/* <button className=" sm:hidden bg-primary text-white hover:bg-blue-700 text-white font-bold py-2 px-4 rounded font-normal h-[40px]  flex gap-2">
          <FiSearch size={23} />
        </button> */}
    </>
  );
};
export default TableFilterComponent;
