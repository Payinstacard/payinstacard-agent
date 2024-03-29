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
import { downloadCSVOfCustomers } from "../../services/customersApis";
import Export from "../common/Table/Export";
import { customStyles, dummyCustomerData } from "../../utils/TableUtils";
import apiClient from "../../services/apiClient";
import { FETCH_CUSTOMER } from "../../services/apiConstant";
import { toast } from "react-toastify";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../../stores/CustomerRedux";
import { FiBriefcase } from "react-icons/fi";
import { type } from "@testing-library/user-event/dist/type";

function CustomersTable(props) {
  const { agentData } = useSelector((state) => state.agentData);
  const [data, setData] = useState([]);
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
  const dispatch = useDispatch();
  const loading = useSelector(
    (state) => state?.customersData?.customersLoading
  );
  // const fetchAllCustomers = async () => {
  //   setLoad(true);

  //   await apiClient
  //     .get(FETCH_CUSTOMER)
  //     .then((response) => {
  //       setLoad(false);
  //       const status = response.status;
  //       const message = response.data.message;
  //       console.log(response);

  //       if (status === 200) {
  //         setData([...response?.data?.response?.AgentCustomers_array]);
  //         return;
  //       }

  //       toast(message, {
  //         theme: "dark",
  //         hideProgressBar: true,
  //         type: "error",
  //       });
  //       // setData([...response?.data?.response?.AgentCustomers_array]);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setLoad(false);
  //       const message = "Something Went Wong !";
  //       toast(message, {
  //         theme: "dark",
  //         hideProgressBar: true,
  //         type: "error",
  //       });
  //     });
  // };
  // useEffect(() => {
  //   fetchAllCustomers();
  // }, []);

  React.useEffect(() => {
    if (agentData?.firebase_uid) {
      dispatch(fetchCustomers(agentData?.firebase_uid));
    }
  }, [agentData?.firebase_uid]);

  const customersData = useSelector(
    (state) => state?.customersData?.customersData
  );
  const agentDataWithTransactions = useSelector(
    (state) => state?.customersData?.agentDataWithTransactions
  );

  // const customersData = [
  //   {
  //     Agent_objectid: "65570149bd2c450af22378eb",
  //     BenificaryCollection: [],
  //     Customer_data: {
  //       FirstName: "John",
  //       LastName: "Doe",
  //       Address: "123 Main St",
  //       Pincode: "12345",
  //       State: "California",
  //     },
  //     Customer_id: "AGCUS-sKZRrLSt5",
  //     Email: "john.doe@example.com",
  //     created_At: "2023-11-27T10:13:10.632Z",
  //     disabled: false,
  //     emailVerified: false,
  //     mobile: "+1234567890",
  //     paymentDisabled: false,
  //     transactions: [{ total_amount: 150 }, { total_amount: 300 }],
  //     transfers: [],
  //     updated_At: "2023-11-27T10:13:10.632Z",
  //     verified: false,
  //     __v: 0,
  //     _id: "65646bb6a20923abe59c0bdb",
  //   },
  //   {
  //     Agent_objectid: "78901234abcd567890efghij",
  //     BenificaryCollection: [],
  //     Customer_data: {
  //       FirstName: "Jane",
  //       LastName: "Smith",
  //       Address: "456 Oak St",
  //       Pincode: "54321",
  //       State: "New York",
  //     },
  //     Customer_id: "AGCUS-uVYXwNp2r",
  //     Email: "jane.smith@example.com",
  //     created_At: "2023-11-28T08:45:20.123Z",
  //     disabled: false,
  //     emailVerified: true,
  //     mobile: "+9876543210",
  //     paymentDisabled: false,
  //     transactions: [{ total_amount: 200 }, { total_amount: 250 }],
  //     transfers: [],
  //     updated_At: "2023-11-28T08:45:20.123Z",
  //     verified: true,
  //     __v: 0,
  //     _id: "78901234abcd567890efghij",
  //   },
  //   {
  //     Agent_objectid: "xyz987654321abc123def456",
  //     BenificaryCollection: [],
  //     Customer_data: {
  //       FirstName: "Alice",
  //       LastName: "Johnson",
  //       Address: "789 Pine St",
  //       Pincode: "67890",
  //       State: "Texas",
  //     },
  //     Customer_id: "AGCUS-qWenFp8r7",
  //     Email: "alice.johnson@example.com",
  //     created_At: "2023-11-29T15:20:45.567Z",
  //     disabled: true,
  //     emailVerified: true,
  //     mobile: "+1122334455",
  //     paymentDisabled: true,
  //     transactions: [{ total_amount: 50 }, { total_amount: 100 }],
  //     transfers: [],
  //     updated_At: "2023-11-29T15:20:45.567Z",
  //     verified: true,
  //     __v: 0,
  //     _id: "xyz987654321abc123def456",
  //   },
  // ];
  React.useEffect(() => {
    let mapData = customersData.map((item, index) => {
      return { ...item, ["Index"]: customersData.length - index };
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
        let name = `${item.Customer_data.FirstName} ${item.Customer_data.LastName}`;
        return (
          name.toLowerCase().includes(filterText.toLowerCase()) ||
          item.mobile.toLowerCase().includes(filterText.toLowerCase())
        );
      });
    }

    setFilteredItems(mapData.reverse());
  }, [customersData, filterText, currentFilterBy, dateRange]);

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
      <div className="w-full flex flex-col xl:flex-row justify-between items-center mb-4 sm:mb-8 p-0">
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
              popoverDirection="down"
              primaryColor={"blue"}
              inputClassName="w-[265px] px-2 py-1 sm:px-3 sm:py-2 text-sm sm:text-base h-[35px] sm:h-[42px] rounded-md border-0 focus:ring-0 font-normal bg-white-100 dark:placeholder:text-black-100"
              toggleClassName="absolute bg-primary hover:bg-blue-700 rounded-r-md text-white right-0 h-full px-2 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <Export
              onExport={() =>
                downloadCSVOfCustomers(filteredItems, selectedRows)
              }
            />
          </div>
        </div>
      </div>
    );
  }, [filterText, resetPaginationToggle, filteredItems, selectedRows]);

  //sort functon for date column
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
  //sort function for name column
  const caseInsensitiveSort = (rowA, rowB) => {
    const nameA = `${rowA.Customer_data.FirstName} ${rowA.Customer_data.LastName}`;
    const nameB = `${rowB.Customer_data.FirstName} ${rowB.Customer_data.LastName}`;
    const a = nameA.toLowerCase();
    const b = nameB.toLowerCase();

    if (a > b) {
      return 1;
    }

    if (b > a) {
      return -1;
    }

    return 0;
  };

  const columns = [
    {
      name: "SL",
      grow: 1,
      selector: (row, index) => <span className="mr-10">{index + 1}</span>,
      style: { textAlign: "center", display: "block" },
    },
    {
      name: "Customer Name",
      sortable: "true",
      cell: (row, index) => (
        <div>
          <NavLink
            // to={`/dashboard/users/${row?.Customer_id}/${row?.mobile}`}
            to={`customer-details/${row?.Customer_id}`}
            className=""
            title="View"
          >
            <p className="mb-1 font-bold border-b border-black">
              {row?.Customer_data?.FirstName +
                " " +
                row?.Customer_data?.LastName}
            </p>
          </NavLink>

          {/* <p>{index}</p> */}
        </div>
      ),
      grow: 1.7,
      sortable: true,
      sortFunction: caseInsensitiveSort,
    },
    {
      name: "Contact Information",
      grow: 3,
      cell: (row) => (
        <div>
          <p className="mb-1">{row?.mobile}</p>
          <p>{row?.Email}</p>
        </div>
      ),
    },
    {
      name: "Beneficiaries",
      grow: 1.2,
      cell: (row) => (
        <div>
          <p>{row?.BenificaryCollection.length}</p>
        </div>
      ),
      style: { textAlign: "center", display: "block" },
    },
    {
      name: "Date Of Onboarded",
      grow: 2,
      selector: (row) => getDateString(row.created_At),
      sortable: "true",
      // width: "140px",
      sortFunction: dateSortFun,
    },
    {
      name: "Total Transactions",
      grow: 2,
      cell: (row) => (
        <div>
          <p className="mb-1">Transactions :- {row.transactions.length}</p>
          <p>
            Amount :-
            {row.transactions.length -
              row.transactions.filter(
                (item) =>
                  item.OrderPaymentStatus !== "200" &&
                  item.OrderPaymentStatus !== "201"
              ).length}
          </p>
        </div>
      ),
      // width: "150px",
      // sortable: true,
    },
    {
      name: "Actions",
      grow: 1,
      style: {
        textAlign: "center",
      },
      // button: "true",
      cell: (row) => (
        <>
          <NavLink
            to={`customer-details/${row?.Customer_id}/make-new-transaction`}
          >
            <button
              className="bg-primary text-white py-1.5 px-3.5 mr-2 rounded"
              onClick={() => console.log("clicked")}
            >
              Pay
            </button>
          </NavLink>
          {/* <button>
            <img src={Edit} alt="" className="w-8 h-8 mr-2" />
          </button> */}
          {/* <Link to={`add/${row?.Customer_id}`}>
            <img src={Edit} alt="" className="w-8 h-8 mr-2" />
          </Link> */}
          {/* <Link>
            <img src={Edit} alt="" className="w-8 h-8 mr-2" />
          </Link> */}
        </>
      ),
    },
  ];

  const getTotalPayment = () => {
    let totalPayment = 0;
    if (!_.isEmpty(agentDataWithTransactions?.transactions)) {
      agentDataWithTransactions?.transactions.forEach((transaction) => {
        totalPayment += Number(transaction?.OrderAmount);
      });
      return totalPayment;
    }
    return totalPayment;
  };

  return (
    <div className="">
      {/* <PageTitle buttonText="Add New Customer" title="Customers" url="add" /> */}
      <PageTitle buttonText="Add New Customer" title="Customers" url="add" />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-wrap justify-center min-[430px]:justify-start gap-3 sm:gap-6 mb-2 mt-4 sm:mb-6 sm:mt-6">
            {/** CARD #1 */}
            <div className="w-[45%] min-[430px]:w-1/3 min-[900px]:w-1/4 rounded-lg  px-2 min-[510px]:px-4 py-[6px] min-[510px]:py-3 bg-white min-w-fit">
              <div className="mr-0 min-[510px]:mr-3">
                <div className="flex justify-between">
                  <p className="text-xs sm:text-sm text-[#464748] py-3">
                    Total Customers
                  </p>
                </div>
                <p className="text-lg sm:text-2xl font-semibold color mb-1 sm:mb-3">
                  {customersData.length}
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
                </div>
                <p className="text-lg sm:text-2xl font-semibold color mb-1 sm:mb-3">
                  {/* {props?.number
            ? props?.data.toFixed(2).replace(thousandSeparatorRegex, "$1,")
            : props?.data} */}
                  &#8377;{getTotalPayment()}
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
              progressPending={loading}
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
        </>
      )}
    </div>
  );
}

export default CustomersTable;
