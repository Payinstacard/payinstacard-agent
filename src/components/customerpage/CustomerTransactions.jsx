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
import { getDateString } from "../../services/helper";
import {
  downloadCSVOfCustomerTransactions,
  downloadCSVOfCustomers,
} from "../../services/customersApis";
import Export from "../common/Table/Export";
import { customStyles, dummyCustomerData } from "../../utils/TableUtils";
import apiClient from "../../services/apiClient";
import { FETCH_CUSTOMER } from "../../services/apiConstant";
import { toast } from "react-toastify";
import View from "../../assets/svg/view.svg";
import downLoadIconAgent from "../../assets/svg/downLoadIconAgent.svg";
import { useSelector } from "react-redux";

function CustomerTransactions(props) {
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

  //dumy data

  const customersData = useSelector(
    (state) => state?.customersData?.singleCustomerData
  );

  console.log("transc==>", customersData);

  const customersDummyData = {
    Agent_objectid: "65570149bd2c450af22378eb",
    BenificaryCollection: [
      {
        Customer_id: "6565c7fbb7b65e21cab03c67",
        beneficiary_address: "diyogi, uttrakhand",
        beneficiary_email: "liodas@gmail.com",
        beneficiary_id: "LIOD773BCFFBADE57",
        beneficiary_name: "PAYINSTA CARD",
        beneficiary_phone: "+919737502747",
        created_at: "1701328516733",
        payment_info: {
          type: "BANK",
          upi_code: "",
          bankAccount: "10000969945",
          ifsc_code: "IDFB0010204",
        },
        updated_at: "1701328516733",
        __v: 0,
        _id: "6568368471c0fde2e7c50581",
      },
    ],
    Customer_data: {
      FirstName: "karan",
      LastName: "harsora",
      Address: "Bhavnagar",
      Pincode: "364001",
      State: "Gujarat",
      // ... other customer data properties
    },
    Customer_id: "AGCUS-x9ObQ8R7J",
    Email: "karan.infinitysoftech@gmail.com",
    created_At: "2023-11-28T10:59:07.091Z",
    disabled: false,
    emailVerified: false,
    mobile: "+919737502747",
    paymentDisabled: false,
    transactions: [
      {
        total_amount: "200",
        transactionId: "T123456789872",
        created_At: "2023-11-08T13:06:49.915Z",
        status: "Successful",
        beneficiary: { mobile: "9876543210", ifsc: "SBIN0025487" },
      },
      {
        total_amount: "150",
        transactionId: "T123456789873",
        created_At: "2023-11-09T14:30:00.000Z",
        status: "Successful",
        beneficiary: { mobile: "8765432109", ifsc: "HDFC0012345" },
      },
      {
        total_amount: "120",
        transactionId: "T123456789874",
        created_At: "2023-11-10T16:45:00.000Z",
        status: "Successful",
        beneficiary: { mobile: "7654321098", ifsc: "ICIC0012345" },
      },
      {
        total_amount: "90",
        transactionId: "T123456789875",
        created_At: "2023-11-12T10:15:00.000Z",
        status: "Successful",
        beneficiary: { mobile: "6543210987", ifsc: "AXIS0012345" },
      },
      {
        total_amount: "80",
        transactionId: "T123456789876",
        created_At: "2023-11-15T12:30:00.000Z",
        status: "Successful",
        beneficiary: { mobile: "5432109876", ifsc: "BOB0012345" },
      },
      {
        total_amount: "70",
        transactionId: "T123456789877",
        created_At: "2023-11-18T09:45:00.000Z",
        status: "Successful",
        beneficiary: { mobile: "4321098765", ifsc: "PNB0012345" },
      },
      {
        total_amount: "60",
        transactionId: "T123456789878",
        created_At: "2023-11-20T14:00:00.000Z",
        status: "Successful",
        beneficiary: { mobile: "3210987654", ifsc: "SBI0012345" },
      },
      {
        total_amount: "50",
        transactionId: "T123456789879",
        created_At: "2023-11-22T11:30:00.000Z",
        status: "Pending",
        beneficiary: { mobile: "2109876543", ifsc: "UBI0012345" },
      },
      {
        total_amount: "40",
        transactionId: "T123456789880",
        created_At: "2023-11-25T15:45:00.000Z",
        status: "Successful",
        beneficiary: { mobile: "1098765432", ifsc: "IDBI0012345" },
      },
      {
        total_amount: "30",
        transactionId: "T123456789881",
        created_At: "2023-11-27T10:00:00.000Z",
        status: "Successful",
        beneficiary: { mobile: "0987654321", ifsc: "RBL0012345" },
      },
      {
        total_amount: "20",
        transactionId: "T123456789882",
        created_At: "2023-11-28T13:15:00.000Z",
        status: "Failed",
        beneficiary: { mobile: "9876543210", ifsc: "HSBC0012345" },
      },
      {
        total_amount: "10",
        transactionId: "T123456789883",
        created_At: "2023-11-30T09:30:00.000Z",
        status: "Successful",
        beneficiary: { mobile: "8765432109", ifsc: "CITI0012345" },
      },
    ],
    transfers: [],
    updated_At: "2023-11-28T10:59:07.091Z",
    verified: false,
    __v: 4,
    _id: "6565c7fbb7b65e21cab03c67",
  };

  React.useEffect(() => {
    let mapData = customersDummyData?.transactions?.map((item, index) => {
      return { ...item, ["Index"]: data.length - index };
    });

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
        console.log("item", item);
        // let name = `${item.Customer_data?.FirstName} ${item?.Customer_data?.LastName}`;
        return (
          item?.total_amount
            ?.toLowerCase()
            .includes(filterText?.toLowerCase()) ||
          item?.beneficiary?.mobile
            ?.toLowerCase()
            .includes(filterText?.toLowerCase()) ||
          item?.transactionId?.toLowerCase().includes(filterText?.toLowerCase())
        );
      });
    }
    // if (currentFilterBy !== false) {
    //   mapData = mapData.filter((item) => {
    //     const currentDate = new Date();
    //     currentDate.setDate(currentDate.getDate() - 30);
    //     let transactions_in_last_month = item?.transactions?.some(
    //       (transaction) => {
    //         const transactionDate = new Date(transaction.created_At);
    //         return transactionDate >= currentDate;
    //       }
    //     );

    //     if (currentFilterBy === "activeuser") {
    //       return transactions_in_last_month;
    //     } else if (currentFilterBy === "totaluser") {
    //       return !item.disabled === true;
    //     } else if (currentFilterBy === "inactiveuser") {
    //       return !transactions_in_last_month && !item.disabled === true;
    //     } else if (currentFilterBy === "suspendeduser") {
    //       return item.disabled === true;
    //     } else if (currentFilterBy === "kycuser") {
    //       return item.kyc_status === true;
    //     } else if (currentFilterBy === "approvalpendinguser") {
    //       return (
    //         item.kyc_status === false &&
    //         item.kyc_details.aadhaarVerified === true &&
    //         item.kyc_details._PANVerified === true &&
    //         !item.disabled === true
    //       );
    //     } else {
    //       return true;
    //     }
    //   });
    // }
    setFilteredItems(mapData.reverse());
  }, [data, filterText, currentFilterBy, dateRange]);

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
              bgColor="bg-[#EFF0F2]"
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
              inputClassName="w-[265px] px-2 py-1 sm:px-3 sm:py-2 text-sm sm:text-base h-[35px] sm:h-[42px] rounded-md border-0 focus:ring-0 font-normal bg-[#EFF0F2] dark:placeholder:text-black-100"
              toggleClassName="absolute bg-primary hover:bg-blue-700 rounded-r-md text-white right-0 h-full px-2 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <Export
              onExport={() =>
                downloadCSVOfCustomerTransactions(filteredItems, selectedRows)
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
    const dateA = Number(rowA.total_amount);
    const dateB = Number(rowB.total_amount);
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
      selector: (row, index) => <span className="mr-10">{index + 1}</span>,
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
          >
            <p className="mb-1 font-bold border-b border-black">
              {/* {row?.Customer_data?.FirstName +
                " " +
                row?.Customer_data?.LastName} */}
              {row?.transactionId}
            </p>
          </NavLink>

          {/* <p>{index}</p> */}
        </div>
      ),
      grow: 1,
      // sortable: true,
      //   sortFunction: caseInsensitiveSort,
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
      name: "Beneficiary",
      grow: 1,
      cell: (row) => (
        <div>
          <p>{row?.beneficiary?.mobile}</p>
          <p>{row?.beneficiary?.ifsc}</p>
        </div>
      ),
      style: { textAlign: "left", display: "block" },
    },
    {
      name: "Amount",
      grow: 0,
      sortable: "true",
      cell: (row) => <div>{row?.total_amount}</div>,
      style: { textAlign: "center", display: "block" },
      sortFunction: amountSortFun,
    },
    {
      name: "Status",
      cell: (row) => {
        if (row?.status === "Successful") {
          return (
            <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-medium bg-green-200 text-green-800">
              <span> &#8226;</span> Successful
            </span>
          );
        } else if (row?.status === "Pending") {
          return (
            <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-medium bg-red-200 text-red-800">
              <span> &#8226;</span> Pending
            </span>
          );
        } else {
          return (
            <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-medium bg-red-200 text-red-800">
              <span> &#8226;</span> Failed
            </span>
          );
        }
      },
      sortable: "true",
      center: "true",
      width: "130px",
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
          <Link
          // to={`add/${row?.Customer_id}`}
          >
            <img src={downLoadIconAgent} alt="" className="w-8 h-8 mr-2" />
          </Link>
        </>
      ),
    },
  ];

  return (
    <div className="mt-10">
      <PageTitle
        buttonText="Make New Transaction"
        title="Transactions"
        url="#"
      />

      <div className="agent-table react-data-table mt-3 sm:mt-10">
        {/* <StyleSheetManager shouldForwardProp={shouldForwardProp}> */}
        <DataTable
          columns={columns}
          data={filteredItems}
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

export default CustomerTransactions;
