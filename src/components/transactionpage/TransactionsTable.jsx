import React, { useEffect, useState } from "react";
import PageTitle from "../common/PageTitle/PageTitle";

import _ from "lodash";
import DataTable from "react-data-table-component";
import { Link, NavLink } from "react-router-dom";
import Datepicker from "react-tailwindcss-datepicker";
import Delete from "../../assets/svg/delete.svg";
import Edit from "../../assets/svg/edit.svg";
import Loader from "../common/Loader/Loader";
import Pagination from "../common/Table/Pagination";
import TableFilterComponent from "../common/Table/TableFilterComponent";
import Card from "../common/Card/Card";
import { getDateString, maskString } from "../../services/helper";
import {
  downloadCSVOfCustomerTransactions,
  downloadCSVOfCustomers,
  downloadCSVOfTransactions,
} from "../../services/customersApis";
import Export from "../common/Table/Export";
import { customStyles, dummyCustomerData } from "../../utils/TableUtils";
import apiClient from "../../services/apiClient";
import { FETCH_CUSTOMER } from "../../services/apiConstant";
import { toast } from "react-toastify";
import View from "../../assets/svg/view.svg";
import downLoadIconAgent from "../../assets/svg/downLoadIconAgent.svg";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineDotsVertical } from "react-icons/hi";
import transactionWatch from "../../assets/svg/view.svg";
import { downloadTrasactionReceipt } from "./../common/models/htmlTopdf";
import { fetchCustomers } from "../../stores/CustomerRedux";
import PaymentStatusPopUp from "./PaymentStatusPopUp";

function TransactionsTable(props) {
  const [dateRange, setDateRange] = React.useState({
    startDate: null,
    endDate: null,
  });
  // const [load, setLoad] = useState(false);
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const [currentFilterBy, setCurrentFilterBy] = useState("totaluser");
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const { agentData } = useSelector((state) => state.agentData);
  const [showPopup, setShowPopup] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState();
  const dispatch = useDispatch();
  const loading = useSelector(
    (state) => state?.customersData?.customersLoading
  );
  const [load, setLoad] = useState(true);
  // fetching customer details

  React.useEffect(() => {
    console.log(
      "------------------karn---------------",
      agentData?.firebase_uid
    );
    if (agentData?.firebase_uid) {
      setLoad(true);
      dispatch(fetchCustomers());
      setLoad(false);
    }
  }, [agentData?.firebase_uid]);

  const agentDataWithTransactions = useSelector(
    (state) => state?.customersData?.agentDataWithTransactions
  );

  React.useEffect(() => {
    let mapData;
    if (agentDataWithTransactions?.transactions) {
      mapData = agentDataWithTransactions?.transactions?.map((item, index) => {
        return {
          ...item,
          ["Index"]: agentDataWithTransactions?.transactions.length - index,
        };
      }, []);
    }

    if (!_.isEmpty(dateRange.startDate) && !_.isEmpty(dateRange.endDate)) {
      const startDate = new Date(dateRange.startDate);
      startDate.setUTCHours(0, 0, 0, 0);
      const endDate = new Date(dateRange.endDate);
      endDate.setUTCHours(23, 59, 59, 999);
      mapData = mapData.filter((item) => {
        const itemDate = new Date(item.created_At);
        return (
          startDate.getTime() <= itemDate.getTime() &&
          itemDate.getTime() <= endDate.getTime()
        );
      });
    }
    if (filterText !== "") {
      mapData = mapData.filter((item) => {
        // let name = `${item.Customer_data?.FirstName} ${item?.Customer_data?.LastName}`;
        return (
          item?.OrderAmount?.toLowerCase().includes(
            filterText?.toLowerCase()
          ) ||
          item?.benificary_details?.paymentInfo?.beneficier_id
            ?.toLowerCase()
            .includes(filterText?.toLowerCase()) ||
          item?.transactionId?.toLowerCase().includes(filterText?.toLowerCase())
        );
      });
    }

    setFilteredItems(mapData?.reverse());
  }, [agentDataWithTransactions, filterText, currentFilterBy, dateRange]);

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
      <div className="w-full flex flex-col xl:flex-row justify-between items-center mb-8 p-0">
        <h3 className="mb-2 sm:mb-0">List</h3>

        {/* <div className="w-10/11 flex flex-col sm:flex-row item-stratch gap-2 sm:gap-5 justify-end items-center"> */}

        <div className="flex flex-col lg:flex-row flex-wrap lg:items-start item-stratch gap-3 sm:gap-4 md:gap-5 items-center">
          <div>
            <TableFilterComponent
              onFilter={(e) => setFilterText(e.target.value)}
              onClear={handleClear}
              filterText={filterText}
              bgColor="bg-white"
            />
          </div>
          <div className="w-[290px]">
            <Datepicker
              placeholder={"Select Date"}
              value={dateRange}
              onChange={handleValueChange}
              useRange={false}
              maxDate={new Date()}
              primaryColor={"blue"}
              inputClassName="w-[265px] px-2 py-1 sm:px-3 sm:py-2 text-sm sm:text-base h-[35px] sm:h-[42px] rounded-md border-0 focus:ring-0 font-normal bg-white dark:placeholder:text-black-100"
              toggleClassName="absolute bg-primary hover:bg-blue-700 rounded-r-md text-white right-0 h-full px-2 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <Export
              onExport={() =>
                downloadCSVOfTransactions(filteredItems, selectedRows)
              }
            />
          </div>
        </div>
      </div>
    );
  }, [filterText, resetPaginationToggle, filteredItems, selectedRows]);

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
  const amountSortFun = (rowA, rowB) => {
    const dateA = Number(rowA.OrderAmount);
    const dateB = Number(rowB.OrderAmount);
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
      grow: 0,
      selector: (row, index) => <span className="mr">{row.Index}</span>,
      style: { textAlign: "center", display: "block" },
    },
    {
      name: "Transaction ID",
      // sortable: "true",
      cell: (row, index) => (
        <div>
          <NavLink
            // to={`/dashboard/users/${row?.Customer_id}/${row?.mobile}`}
            // to="customer-details"
            className=""
            title="View"
            onClick={() => openModelWithSatus(row)}
          >
            <p className="mb-1 font-bold border-b border-black w-max">
              {/* {row?.Customer_data?.FirstName +
                " " +
                row?.Customer_data?.LastName} */}
              {row?.paymentDetails?.TRANSACTIONID}
            </p>
          </NavLink>

          {/* <p>{index}</p> */}
        </div>
      ),
      grow: 1,
      width: "230px",

      // sortable: true,
      //   sortFunction: caseInsensitiveSort,
    },
    {
      name: "Contact Information",
      grow: 1,
      cell: (row) => (
        <div>
          <p className="mb-1">
            {row?.customerData?.FirstName} {row?.customerData?.LastName}
          </p>
          <p>{row?.customerData?.MobileNo}</p>
        </div>
      ),
      style: { textAlign: "left", display: "block" },
    },
    {
      name: "Beneficiary",
      grow: 1,
      cell: (row) => (
        <div>
          <p className="mb-1 ">
            {row?.benificary_details?.paymentInfo?.beneficier_id}
          </p>
        </div>
      ),
      style: { textAlign: "left", display: "block" },
    },
    {
      name: "Amount",
      grow: 0,
      sortable: "true",
      cell: (row) => <div className="">&#8377;{row?.OrderAmount}</div>,
      style: { textAlign: "", display: "block" },
      sortFunction: amountSortFun,
    },
    {
      name: "Transaction Date",
      grow: 1,
      selector: (row) => getDateString(row.created_At),
      sortable: "true",
      // width: "140px",
      sortFunction: dateSortFun,
      style: { textAlign: "left", display: "block" },
    },
    {
      name: "Status",
      grow: 1,
      cell: (row) => {
        if (
          row?.OrderPaymentStatus === "200" ||
          row?.OrderPaymentStatus === "201"
        ) {
          return (
            <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg  font-medium bg-green-200 text-green-800 text-base">
              <span className="text-[20px]"> &#8226;</span> Successful
            </span>
          );
        } else if (row?.status === "Pending") {
          return (
            <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg font-medium bg-yellow-200 text-yellow-800 text-base">
              <span className="text-[20px]"> &#8226;</span> Pending
            </span>
          );
        } else {
          return (
            <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg font-medium bg-red-200 text-red-800 text-base">
              <span className="text-[20px]"> &#8226;</span> Failed
            </span>
          );
        }
      },
      // sortable: "true",
      center: "true",
      width: "140px",
    },
    {
      name: "Actions",
      grow: 0,
      style: {
        textAlign: "center",
      },
      // button: "true",
      cell: (row) => (
        <>
          <Link onClick={() => openModelWithSatus(row)}>
            <img src={transactionWatch} alt="" className="w-8 h-8 mr-2" />
          </Link>
          <Link
          // to={`add/${row?.Customer_id}`}
          >
            <img
              src={downLoadIconAgent}
              alt=""
              className="w-8 h-8 mr-2"
              onClick={() => downloadTrasactionReceipt(row)}
            />
          </Link>
        </>
      ),
    },
  ];

  const openModelWithSatus = (data) => {
    setPaymentInfo(data);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="mt-10">
      {load && <Loader />}
      <PageTitle
        buttonText="Make New Transaction"
        title="Transactions"
        // url={`/dashboard/customers/customer-details/${customersData?.Customer_id}/make-new-transaction`}
        // url="../make-new-transaction"
      />
      <div className="flex flex-wrap justify-center min-[430px]:justify-start gap-3 sm:gap-6 mb-2 mt-4 sm:mb-6 sm:mt-6">
        {/** CARD #1 */}
        <div className="w-[45%] min-[430px]:w-1/3 min-[900px]:w-1/4 rounded-lg  px-2 min-[510px]:px-4 py-[6px] min-[510px]:py-3 bg-white min-w-fit">
          <div className="mr-0 min-[510px]:mr-3">
            <div className="flex justify-between">
              <p className="text-xs sm:text-sm text-[#464748] py-3">
                Total Transactions
              </p>
              <button>
                <HiOutlineDotsVertical className="text-[#464748]" />
              </button>
            </div>
            <p className="text-lg sm:text-2xl font-semibold color mb-1 sm:mb-3">
              {agentDataWithTransactions?.transactions?.length}
            </p>
          </div>
        </div>
        {/** CARD #2 */}
        <div className="w-[45%] min-[430px]:w-1/3 min-[900px]:w-1/4 rounded-lg  px-2 min-[510px]:px-4 py-[6px] min-[510px]:py-3 bg-white min-w-fit">
          <div className="mr-0 min-[510px]:mr-3">
            <div className="flex justify-between">
              <p className="text-xs sm:text-sm text-[#464748] py-3">
                Total Payments
              </p>
              <button>
                <HiOutlineDotsVertical className="text-[#464748]" />
              </button>
            </div>
            <p className="text-lg sm:text-2xl font-semibold color mb-1 sm:mb-3">
              {/* {props?.number
            ? props?.data.toFixed(2).replace(thousandSeparatorRegex, "$1,")
            : props?.data} */}
              {/* &#8377;{getTotalPayment()} */}
              &#8377;
              {agentDataWithTransactions?.transactions
                ?.filter(
                  (data) =>
                    data?.OrderPaymentStatus === "200" ||
                    data?.OrderPaymentStatus === "201"
                )
                .reduce(
                  (total, transaction) =>
                    total +
                    parseInt(transaction.benificary_details.TotalAmount),
                  0
                )}
            </p>
          </div>
          {/* <img src={props.icon} alt="" className="w-7 sm:w-10" /> */}
        </div>
      </div>

      <div className="agent-table react-data-table mt-3 sm:mt-10">
        {/* <StyleSheetManager shouldForwardProp={shouldForwardProp}> */}
        <DataTable
          columns={columns}
          data={filteredItems}
          pagination
          paginationComponent={Pagination}
          // progressPending={load}
          // progressComponent={<Loader />}
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

      {/* Display Popup */}
      {showPopup && (
        <PaymentStatusPopUp data={paymentInfo} onClose={closePopup} />
      )}
    </div>
  );
}

export default TransactionsTable;
