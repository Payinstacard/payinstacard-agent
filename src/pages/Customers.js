import React, { useEffect, useState } from "react";
import PageTitle from "./../components/model/PageTitle";

import _ from "lodash";
import DataTable from "react-data-table-component";
import { Link, NavLink } from "react-router-dom";
import Datepicker from "react-tailwindcss-datepicker";
import Delete from "../assets/svg/delete.svg";
import Edit from "../assets/svg/edit.svg";
import Loader from "../components/Loader/Loader";
import Pagination from "../components/Table/Pagination";
import TableFilterComponent from "../components/Table/TableFilterComponent";
import Card from "../components/model/Card";
import { getDateString } from "../services/helper";
import { downloadCSVOfUsers } from "./../services/usersApis";
import Export from "../components/Table/Export";
import { customStyles, dummyCustomerData } from "../utils/TableUtils";
import apiClient from "../services/apiClient";
import { DELETE_CUSTOMER, FETCH_CUSTOMER } from "../services/apiConstant";

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

  const fetchAllCustomers = async () => {
    await apiClient
      .get(FETCH_CUSTOMER)
      .then((response) => {
        setData([...response?.data?.response?.AgentCustomers_array]);
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  useEffect(() => {
    fetchAllCustomers();
  }, []);

  async function deleteCustomer(id) {
    console.log("id", id);
    await apiClient
      .post(DELETE_CUSTOMER, id)
      .then((response) => {
        console.log("response", response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
        let name = `${item.Customer_data.FirstName} ${item.Customer_data.LastName}`;
        return (
          name.toLowerCase().includes(filterText.toLowerCase()) ||
          item.mobile.toLowerCase().includes(filterText.toLowerCase())
        );
      });
    }
    if (currentFilterBy !== false) {
      mapData = mapData.filter((item) => {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 30);
        let transactions_in_last_month = item.transactions.some(
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
              inputClassName="w-[265px] px-2 py-1 sm:px-3 sm:py-2 text-sm sm:text-base h-[35px] sm:h-[42px] rounded-md border-0 focus:ring-0 font-normal bg-white-100 dark:placeholder:text-black-100"
              toggleClassName="absolute bg-primary hover:bg-blue-700 rounded-r-md text-white right-0 h-full px-2 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <Export
              onExport={() => downloadCSVOfUsers(filteredItems, selectedRows)}
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
      name: "Customer Name",
      sortable: "true",
      cell: (row, index) => (
        <div>
          <NavLink
            to={`/dashboard/users/${row?.Customer_id}/${row?.mobile}`}
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
      //   sortFunction: caseInsensitiveSort,
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
      sortable: true,
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
            Pay
          </button>
          {/* <button>
            <img src={Edit} alt="" className="w-8 h-8 mr-2" />
          </button> */}
          <Link to={`add/${row?.Customer_data?.Customer_id}`}>
            <img src={Edit} alt="" className="w-8 h-8 mr-2" />
          </Link>
          <button onClick={() => deleteCustomer(row?._id)}>
            <img src={Delete} alt="" className="w-8 h-8" />
          </button>
        </>
      ),
    },
  ];
  return (
    <div>
      <PageTitle buttonText="Add New Customer" title="Customers" url="add" />
      <div className="flex flex-wrap justify-start gap-3 sm:gap-6 mb-2 mt-4 sm:mb-6 sm:mt-6">
        <Card data={data.length} title={"Total Customers"} />
        <Card data="&#8377;20,000" title={"Total Payments"} />
      </div>
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

export default Customers;
