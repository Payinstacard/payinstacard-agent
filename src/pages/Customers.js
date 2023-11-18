import React, { useState } from "react";
import PageTitle from "./../components/model/PageTitle";

import Card from "../components/model/Card";
import { NavLink } from "react-router-dom";
import Delete from "../assets/svg/delete.svg";
import Edit from "../assets/svg/delete.svg";
import { getDateString } from "../services/helper";
import DataTable from "react-data-table-component";
import _ from "lodash";
import Pagination from "../components/Pagination/Pagination";
import Loader from "../components/Loader/Loader";
import Datepicker from "react-tailwindcss-datepicker";
import downloadIcon from "../assets/svg/download.svg";
import { downloadCSVOfUsers } from "./../services/usersApis";

export const FilterComponent = ({ filterText, onFilter, onClear }) => (
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
          className="relative  m-0 block flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding sm:px-3 sm:py-2 text-sm sm:text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-black-100 dark:focus:border-primary"
        />

        <button
          className="relative z-[2] flex items-center rounded-r bg-primary hover:bg-blue-700 px-2 py-2 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
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
      </div>
    </div>
    {/* <button className=" sm:hidden bg-primary text-white hover:bg-blue-700 text-white font-bold py-2 px-4 rounded font-normal h-[40px]  flex gap-2">
        <FiSearch size={23} />
      </button> */}
  </>
);

const Export = ({ onExport }) => (
  <button
    className="bg-primary text-sm sm:text-base text-white hover:bg-blue-700 text-white font-bold items-center px-2 sm:py-2 sm:px-4 rounded font-normal h-[35px] sm:h-[42px] flex gap-1 sm:gap-2"
    onClick={(e) => onExport(e.target.value)}
  >
    <img src={downloadIcon} alt="" className=" w-4 h-4 sm:w-6 sm:h-6" />
    <span>Export</span>
  </button>
);

const customStyles = {
  rows: {
    style: {},
  },
  headCells: {
    style: {
      fontSize: "16px",
      fontWeight: "bold",
    },
  },
  cells: {
    style: {},
  },
};
function Customers(props) {
  const [data, setData] = useState([]);
  const [dateRange, setDateRange] = React.useState({
    startDate: null,
    endDate: null,
  });
  const [load, setLoad] = useState(false);
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const [currentFilterBy, setCurrentFilterBy] = useState("totaluser");
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [filteredItems, setFilteredItems] = useState([]);

  let filteredData = [...data].reverse();
  if (!_.isEmpty(dateRange.startDate) && !_.isEmpty(dateRange.endDate)) {
    const startDate = new Date(dateRange.startDate);
    startDate.setUTCHours(0, 0, 0, 0);
    const endDate = new Date(dateRange.endDate);
    endDate.setUTCHours(23, 59, 59, 999);
    filteredData = filteredData.filter((item) => {
      const itemDate = new Date(item.created_At);
      return (
        startDate.getTime() <= itemDate.getTime() &&
        itemDate.getTime() <= endDate.getTime()
      );
    });
  }

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };
    const handleValueChange = (newValue) => {
      setDateRange(newValue);
    };

    return (
      <div className="w-full flex flex-col row justify-between items-center mb-5 p-0">
        <h3 className="mb-2 sm:mb-0">List</h3>

        {/* <div className="w-10/11 flex flex-col sm:flex-row item-stratch gap-2 sm:gap-5 justify-end items-center"> */}

        <div className="flex flex-col row item-stratch gap-3 sm:gap-4 md:gap-5 items-center">
          <div className="w-[290px]">
            <Datepicker
              placeholder={"Select Date"}
              value={dateRange}
              onChange={handleValueChange}
              useRange={false}
              maxDate={new Date()}
              primaryColor={"blue"}
              inputClassName="w-[265px] px-2 py-1 sm:px-3 sm:py-2 text-sm sm:text-base h-[35px] sm:h-[42px] rounded-md focus:ring-0 font-normal bg-white-100 dark:placeholder:text-black-100"
              toggleClassName="absolute bg-primary hover:bg-blue-700 rounded-r-md text-white right-0 h-full px-2 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <FilterComponent
              onFilter={(e) => setFilterText(e.target.value)}
              onClear={handleClear}
              filterText={filterText}
            />
          </div>
          <div>
            <Export
              onExport={() => downloadCSVOfUsers(filteredData, selectedRows)}
            />
          </div>
        </div>
      </div>
    );
  }, [
    filterText,
    resetPaginationToggle,
    filteredItems,
    selectedRows,
    filteredData,
  ]);

  const dateSortFun = (rowA, rowB) => {
    const dateA = new Date(rowA.created_At);
    const dateB = new Date(rowB.created_At);
    if (dateA > dateB) {
      return 1;
    }
    if (dateB > dateA) {
      return -1;
    }

    return 0;
  };

  const columns = [
    {
      name: "SL",
      selector: (row, index) => index + 1,
      width: "55px",
    },
    {
      name: "Customer Name",
      cell: (row, index) => (
        <div>
          {/* <NavLink
            to={`/dashboard/users/${row.Customer_data.Customer_id}/${row.mobile}`}
            className=""
            title="View"
          >
            <p className="mb-1 font-bold border-b border-black">
              {row.Customer_data.Customer_id}
            </p>
          </NavLink> */}

          <p>{index}</p>
        </div>
      ),
      width: "180px",
      sortable: true,
      //   sortFunction: caseInsensitiveSort,
    },
    // {
    //   name: "Contact Information",
    //   cell: (row) => (
    //     <div>
    //       <p className="mb-1">{row.mobile}</p>
    //       <p>{row.Customer_data.Email}</p>
    //     </div>
    //   ),
    //   width: "250px",
    // },
    // {
    //   name: "Beneficiaries",
    //   cell: (row) => (
    //     <div>
    //       <p className="mb-1">{row.mobile}</p>
    //       <p>{row.Customer_data.Email}</p>
    //     </div>
    //   ),
    //   width: "250px",
    // },
    // {
    //   name: "Date Of Onboarded",
    //   selector: (row) => getDateString(row.created_At),
    //   sortable: "true",
    //   width: "140px",
    //   sortFunction: dateSortFun,
    // },
    // {
    //   name: "Total Transactions",
    //   cell: (row) => (
    //     <div>
    //       <p className="mb-1">Total :- {row.transactions.length}</p>
    //       <p>
    //         Amount :-
    //         {row.transactions.length -
    //           row.transactions.filter(
    //             (item) =>
    //               item.OrderPaymentStatus !== "200" &&
    //               item.OrderPaymentStatus !== "201"
    //           ).length}
    //       </p>
    //     </div>
    //   ),
    //   width: "150px",
    //   sortable: true,
    // },
    // {
    //   name: "Actions",
    //   button: "true",
    //   Cell: ({ row }) => (
    //     <div className="flex justify-between">
    //       <button
    //         onClick={() => console.log("Pay clicked for row", row.original)}
    //       >
    //         Pay
    //       </button>
    //       <button
    //         onClick={() => console.log("Edit clicked for row", row.original)}
    //       >
    //         <Edit />
    //       </button>
    //       <button
    //         onClick={() => console.log("Delete clicked for row", row.original)}
    //       >
    //         <Delete />
    //       </button>
    //     </div>
    //   ),
    // },
  ];
  return (
    <div>
      <PageTitle buttonText="Add New Customer" title="Customers" url="add" />
      <div className="flex flex-wrap justify-start gap-3 sm:gap-6 mb-2 mt-4 sm:mb-6 sm:mt-6">
        <Card data={100} title={"Total Customers"} />
        <Card data="&#8377;20,000" title={"Total Payments"} />
      </div>
      <div className="agent-table mt-3 sm:mt-10">
        {/* <StyleSheetManager shouldForwardProp={shouldForwardProp}> */}
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          paginationComponent={Pagination}
          progressPending={load}
          progressComponent={<Loader />}
          fixedHeader
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          customStyles={customStyles}
          selectableRows
          onSelectedRowsChange={handleRowSelected}
          clearSelectedRows={toggleCleared}
        />
        {/* </StyleSheetManager> */}
      </div>
    </div>
  );
}

export default Customers;
