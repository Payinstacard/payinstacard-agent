import React from "react";

import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import DropdownMenu from "../forms/DropdownMenu";

const Pagination = ({
  rowsPerPage,
  rowCount,
  onChangePage,
  onChangeRowsPerPage,
  currentPage,
}) => {
  const pageLength = Math.ceil(rowCount / rowsPerPage);
  return (
    <div className="flex items-stretch justify-end py-2 text-gray-500">
      <DropdownMenu
        classes="px-2"
        options={Array.from({ length: pageLength }, (_, index) => index + 1)}
        selectedOption={currentPage}
        setSelectedOption={(page) => onChangePage(page)}
      />
      <div className="p-2">
        {currentPage} of {pageLength} {pageLength > 1 ? "Pages" : "Page"}
      </div>
      <button
        onClick={() => {
          if (currentPage > 1) {
            onChangePage(currentPage - 1);
          }
        }}
      >
        <BiChevronLeft
          className={`text-2xl ${
            currentPage > 1 ? "text-gray-500" : "text-gray-300"
          }`}
        />
      </button>
      <button
        onClick={() => {
          if (currentPage < pageLength) {
            onChangePage(currentPage + 1);
          }
        }}
      >
        <BiChevronRight
          className={`text-2xl ${
            currentPage < pageLength ? "text-gray-500" : "text-gray-300"
          }`}
        />
      </button>
    </div>
  );
};

export default Pagination;
