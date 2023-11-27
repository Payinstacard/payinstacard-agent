import React, { useEffect, useState } from "react";
import PageTitle from "../../components/model/PageTitle";

import _ from "lodash";
import DataTable from "react-data-table-component";
import { Link, NavLink } from "react-router-dom";
import Datepicker from "react-tailwindcss-datepicker";
import Delete from "../../assets/svg/delete.svg";
import Edit from "../../assets/svg/edit.svg";
import Loader from "../../components/Loader/Loader";
import Pagination from "../../components/Table/Pagination";
import TableFilterComponent from "../../components/Table/TableFilterComponent";
import Card from "../../components/model/Card";
import { getDateString } from "../../services/helper";
import { downloadCSVOfCustomers } from "../../services/customersApis";
import Export from "../../components/Table/Export";
import { customStyles, dummyCustomerData } from "../../utils/TableUtils";
import apiClient from "../../services/apiClient";
import { FETCH_CUSTOMER } from "../../services/apiConstant";
import { toast } from "react-toastify";
import View from "../../assets/svg/view.svg";
import downLoadIconAgent from "../../assets/svg/downLoadIconAgent.svg";

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
  const dummyCustomerTransactions = [
    {
      transactionId: "T123456789872",
      created_At: "2023-11-08T13:06:49.915Z",
      status: "Successful",
      beneficiary: {
        mobile: "9876543210",
        ifsc: "SBIN0025487",
      },
      transactedAmount: "10,000",
    },
    {
      transactionId: "T987654321001",
      created_At: "2023-11-09T14:30:00.000Z",
      status: "Pending",
      beneficiary: {
        mobile: "9876543222",
        ifsc: "ICIC0012345",
      },
      transactedAmount: "5,000",
    },
    {
      transactionId: "T567890123456",
      created_At: "2023-11-10T10:45:00.000Z",
      status: "Failed",
      beneficiary: {
        mobile: "9876543333",
        ifsc: "HDFC0056789",
      },
      transactedAmount: "2,000",
    },
    // Add 7 more entries...
    {
      transactionId: "T123456789801",
      created_At: "2023-11-11T12:15:00.000Z",
      status: "Successful",
      beneficiary: {
        mobile: "9876543444",
        ifsc: "AXIS0098765",
      },
      transactedAmount: "8,000",
    },
    {
      transactionId: "T987654321002",
      created_At: "2023-11-12T16:00:00.000Z",
      status: "Pending",
      beneficiary: {
        mobile: "9876543555",
        ifsc: "KOTAK0023456",
      },
      transactedAmount: "15,000",
    },
    {
      transactionId: "T567890123457",
      created_At: "2023-11-13T09:30:00.000Z",
      status: "Successful",
      beneficiary: {
        mobile: "9876543666",
        ifsc: "IDBI0087654",
      },
      transactedAmount: "12,000",
    },
    {
      transactionId: "T123456789802",
      created_At: "2023-11-14T11:45:00.000Z",
      status: "Failed",
      beneficiary: {
        mobile: "9876543777",
        ifsc: "SBI0012345",
      },
      transactedAmount: "3,000",
    },
    {
      transactionId: "T987654321003",
      created_At: "2023-11-15T14:00:00.000Z",
      status: "Successful",
      beneficiary: {
        mobile: "9876543888",
        ifsc: "PNB0076543",
      },
      transactedAmount: "7,000",
    },
    {
      transactionId: "T567890123458",
      created_At: "2023-11-16T08:00:00.000Z",
      status: "Pending",
      beneficiary: {
        mobile: "9876543999",
        ifsc: "CANARA0032109",
      },
      transactedAmount: "9,000",
    },
  ];
  const fetchAllCustomers = async () => {
    // await apiClient
    //   .get(FETCH_CUSTOMER)
    //   .then((response) => {
    //     setData([...response?.data?.response?.AgentCustomers_array]);
    //   })
    //   .catch((error) => {
    //     // console.log(error);
    //   });
    setData(dummyCustomerTransactions);
  };
  useEffect(() => {
    fetchAllCustomers();
  }, []);

  React.useEffect(() => {
    let mapData = data.map((item, index) => {
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
        let name = `${item.Customer_data?.FirstName} ${item?.Customer_data?.LastName}`;
        return (
          name?.toLowerCase().includes(filterText?.toLowerCase()) ||
          item?.mobile?.toLowerCase().includes(filterText?.toLowerCase())
        );
      });
    }
    if (currentFilterBy !== false) {
      mapData = mapData.filter((item) => {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 30);
        let transactions_in_last_month = item?.transactions?.some(
          (transaction) => {
            const transactionDate = new Date(transaction.created_At);
            return transactionDate >= currentDate;
          }
        );

        if (currentFilterBy === "activeuser") {
          return transactions_in_last_month;
        } else if (currentFilterBy === "totaluser") {
          return !item.disabled === true;
        } else if (currentFilterBy === "inactiveuser") {
          return !transactions_in_last_month && !item.disabled === true;
        } else if (currentFilterBy === "suspendeduser") {
          return item.disabled === true;
        } else if (currentFilterBy === "kycuser") {
          return item.kyc_status === true;
        } else if (currentFilterBy === "approvalpendinguser") {
          return (
            item.kyc_status === false &&
            item.kyc_details.aadhaarVerified === true &&
            item.kyc_details._PANVerified === true &&
            !item.disabled === true
          );
        } else {
          return true;
        }
      });
    }
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
              onExport={
                () => console.log("downloadCSVofcCustomers")
                // downloadCSVOfCustomers(filteredItems, selectedRows)
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

  const columns = [
    {
      name: "SL",
      grow: 1,
      selector: (row, index) => <span className="mr-10">{index + 1}</span>,
      style: { textAlign: "right", display: "block" },
    },
    {
      name: "Transaction ID",
      sortable: "true",
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
      grow: 1.7,
      sortable: true,
      //   sortFunction: caseInsensitiveSort,
    },
    {
      name: "Transaction Date",
      grow: 2,
      selector: (row) => getDateString(row.created_At),
      sortable: "true",
      // width: "140px",
      sortFunction: dateSortFun,
    },
    {
      name: "Beneficiary",
      grow: 1.2,
      cell: (row) => (
        <div>
          <p>{row?.beneficiary?.mobile}</p>
          <p>{row?.beneficiary?.ifsc}</p>
        </div>
      ),
      style: { textAlign: "center", display: "block" },
    },
    {
      name: "Amount",
      grow: 1.2,
      cell: (row) => <div>{row?.transactedAmount}</div>,
      style: { textAlign: "center", display: "block" },
    },
    {
      name: "Status",
      cell: (row) => {
        if (row?.status === "Successful") {
          return (
            <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-green-200 text-green-800">
              <span> &#8226;</span> Successful
            </span>
          );
        } else if (row?.status === "Pending") {
          return (
            <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-red-200 text-red-800">
              <span> &#8226;</span> Pending
            </span>
          );
        } else {
          return (
            <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-red-200 text-red-800">
              <span> &#8226;</span> Failed
            </span>
          );
        }
      },
      center: "true",
      width: "130px",
    },
    {
      name: "Actions",
      grow: 2,
      style: {
        textAlign: "center",
      },
      // button: "true",
      cell: (row) => (
        <>
          <button
            className="bg-primary text-white py-1.5 px-3.5 mr-2 rounded"
            onClick={() => console.log("clicked")}
          >
            Repeat
          </button>
          {/* <button>
            <img src={Edit} alt="" className="w-8 h-8 mr-2" />
          </button> */}
          <Link
          // to={`add/${row?.Customer_id}`}
          >
            <img src={View} alt="" className="w-8 h-8 mr-2" />
          </Link>
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
