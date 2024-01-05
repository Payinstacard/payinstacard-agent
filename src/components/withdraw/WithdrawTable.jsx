import React, { useEffect, useState } from "react";
import PageTitle from "../common/PageTitle/PageTitle";

import _ from "lodash";
import DataTable from "react-data-table-component";
import { Link, NavLink } from "react-router-dom";
import Datepicker from "react-tailwindcss-datepicker";

import Loader from "../common/Loader/Loader";
import Pagination from "../common/Table/Pagination";
import TableFilterComponent from "../common/Table/TableFilterComponent";
import { getDateString, maskString } from "../../services/helper";
import {
  downloadCSVOfCustomerTransactions,
  downloadCSVOfWithdrawTransactions,
} from "../../services/customersApis";
import Export from "../common/Table/Export";
import { customStyles, dummyCustomerData } from "../../utils/TableUtils";
import downLoadIconAgent from "../../assets/svg/downLoadIconAgent.svg";
import { useDispatch, useSelector } from "react-redux";
import footerImg from "../../assets/img/Footer_cleanup.png";
import headerImg from "../../assets/img/Header_cleanup.png";
import logo from "../../assets/img/Logo.png";
import html2pdf from "html2pdf.js";
import { HiOutlineDotsVertical } from "react-icons/hi";
import transactionWatch from "../../assets/svg/view.svg";
import withdrawArrowIcon from "../../assets/svg/withdrawArrowIcon.svg";
// import calanderIcon from "../../assets/svg/calanderIcon.svg";
import ReloadIcon from "../../assets/svg/reloadIcon.svg";
import WithdrawPopup from "./WithdrawPopup";
import { toast } from "react-toastify";
import {
  CHECK_AGENT_BALANCE,
  WITHDRAWALS,
  WITHDRAW_PAYMENT,
} from "../../services/apiConstant";
import apiClient from "../../services/apiClient";
import { fetchAgent } from "../../stores/AgentRedux";
import { fetchCustomers } from "../../stores/CustomerRedux";

function WithdrawTable(props) {
  const [dateRange, setDateRange] = React.useState({
    startDate: null,
    endDate: null,
  });
  // const [load, setLoad] = useState(false);
  const loading = useSelector(
    (state) => state?.customersData?.customersLoading
  );
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const [currentFilterBy, setCurrentFilterBy] = useState("totaluser");
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [withdrawals, setWithdrawals] = useState([]);
  const [status, setStatus] = useState(false);
  const dispatch = useDispatch();

  const { agentData } = useSelector((state) => state.agentData);
  const [load, setLoad] = useState(true);

  const [bankBalLoad, setBankBalLoad] = useState(false);
  const [bankBal, setBankBal] = useState(0);

  React.useEffect(() => {
    if (agentData?.firebase_uid) {
      setLoad(true);
      dispatch(fetchCustomers());
      setLoad(false);
    }
  }, [agentData?.firebase_uid, status]);

  const agentDataWithTransactions = useSelector(
    (state) => state?.customersData?.agentDataWithTransactions
  );

  //dumy data

  // const customersData = useSelector(
  //   (state) => state?.customersData?.singleCustomerData
  // );

  // const agentData = useSelector((state) => state?.agentData?.agentData);
  // console.log("agentData", agentData?.withdrawals);

  // React.useEffect(() => {
  //   console.log("-----------it run==================");
  //   const fetchData = async () => {
  //     try {
  //       dispatch(fetchCustomers());
  //       setLoad(false);
  //     } catch (error) {
  //       setLoad(false);
  //       console.error("Error fetching agent data:", error);
  //     }
  //   };

  //   if (agentData?.withdrawals) {
  //     setWithdrawals(agentData?.withdrawals);
  //     fetchData();
  //   }
  // }, [agentData, status, dispatch]);

  // React.useEffect(() => {
  //   console.log("-----------it run==================");
  //   if (agentData?.withdrawals) {
  //     setWithdrawals(agentData?.withdrawals);
  //     setLoad(true);
  //     dispatch(fetchAgent());
  //     setLoad(false);
  //   }
  // }, [status]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoad(true);
  //       const response = await apiClient.get(WITHDRAWALS);
  //       // console.log("res======>", response);
  //       setWithdrawals(response?.data?.response?.data);
  //       let message = response.data.message;
  //       const type = response.data.code;

  //       if (type === 200) {
  //         setLoad(false);
  //         const message =
  //           response?.data?.response?.message || response?.data?.message;
  //         // toast(message, {
  //         //   theme: "dark",
  //         //   hideProgressBar: true,
  //         //   type: "success",
  //         // });
  //       } else {
  //         setLoad(false);
  //         // toast(message, {
  //         //   theme: "dark",
  //         //   hideProgressBar: true,
  //         //   type: "warning",
  //         // });
  //       }
  //     } catch (error) {
  //       setLoad(false);
  //       console.log(error);
  //       toast("Something wrong", {
  //         theme: "dark",
  //         hideProgressBar: true,
  //         type: "error",
  //       });
  //     }
  //   };

  //   fetchData();
  // }, [status]);

  //
  React.useEffect(() => {
    let mapData = [];
    if (agentDataWithTransactions?.withdrawals) {
      mapData = agentDataWithTransactions?.withdrawals.map((item, index) => {
        return {
          ...item,
          ["Index"]: agentDataWithTransactions?.withdrawals.length - index,
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
        // console.log("item", item);
        // let name = `${item.Customer_data?.FirstName} ${item?.Customer_data?.LastName}`;
        return (
          item?.withdrawalId
            ?.toLowerCase()
            .includes(filterText?.toLowerCase()) ||
          item?.amount?.toLowerCase().includes(filterText?.toLowerCase()) ||
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
                downloadCSVOfWithdrawTransactions(filteredItems, selectedRows)
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

  const downloadTrasactionReceipt = (row) => {
    // Convert the ISO timestamp to a Date object
    const date = new Date(row?.created_At);

    // Define an array of month names
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Get the month, day, and year from the Date object
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    // Create the formatted date string
    const formattedDate = `${month} ${day}, ${year}`;

    //creating html file for invoice

    const element = document.createElement("div");
    element.innerHTML = "";
    let elementTwo = `<div style="width: 100%; margin: 0 auto;"><style>* {box-sizing : border-box;}</style>
            <header style="position: relative; padding: 60px 40px 0">
                <img src="${logo}" width="112" alt="payinstacard" style="">
              <img src="${headerImg}" alt="heder" style="position: absolute; top: 0; left:0; right: 0; bottom: 0; z-index: -1; width: 100%;">
              <div style="display: block; box-sizing: border-box; position: absolute; top: 40px; right: 130px; box-shadow: 0px 2px 4px grey; font-size: 16px; line-height: 20px; border-radius: 20px; padding: 0 10px 13px; background-color: #FFFFFF;">INVOICE NO: #${row.withdrawalId}</div>
          </header>
          <div style=" margin: 40px;">
            <div style="display: flex; justify-content: space-between;">
              <div style="flex: 1; margin-right: 20px; font-size: 14px;">
                <h6 style="margin-bottom: 10px;"><span style="border-radius: 4px; background: rgba(0, 0, 107, 0.10);color: #00006B; font-size: 12px; padding: 0 10px 13px;">Transaction Information</span></h6>
               
                <div style="font-size: 13px;">
                    <p style="color: #19213D;"><span style="color: #5D6481;">Transaction Id: </span> ${row?.withdrawalId}</p>
                    <p style="color: #19213D;"><span style="color: #5D6481;">Transaction Date:
                    </span> ${formattedDate}</p>
                    <p style="color: #19213D;"><span style="color: #5D6481;">Amount: </span> ${row?.amount}</p>                  
                    <p style="color: #19213D;"><span style="color: #5D6481;">Status: </span> ${row?.status}
                    </p>
                </div>
              </div>
          
              <div style="font-size: 14px;">
                <h6 style="margin-bottom: 10px;"><span style="border-radius: 4px; background: rgba(0, 0, 107, 0.10);color: #00006B; font-size: 12px; padding: 0 10px 13px;">Beneficiary Information</span></h6>
                <div style="font-size: 13px;">
                    <p style="color: #19213D;"><span style="color: #5D6481;">Account No: </span> ${row?.accountNumber}</p>
                    <p style="color: #19213D;"><span style="color: #5D6481;">IFSC:
                    </span> ${row?.ifscCode}</p>
                </div>
              </div>
            </div>
          
          </div>
          <footer style="position: relative; padding: 40px; font-size: 14px;">
            <img src="${footerImg}" alt="footer" style="position: absolute; top: 0; left:0; right: 0; bottom: 0; width: 100%; " />
            <div style="">
              <h5 style="font-weight: 600;">Payinstacard</h5>
              <p style="color: #5D6481; font-size: 13px; "><a href="www.payinstacard.com">www.payinstacard.com</a></p>
              <p style="color: #5D6481; font-size: 13px; "><a href="mailto:info@payinstacard.com">info@payinstacard.com</a> / <a href="tel:919100420520">+91 9100 420 520</a></p>
            </div>
          </footer></div>
          `;
    element.innerHTML = "<body>" + elementTwo + "</body>";

    html2pdf()
      .from(element)
      .set({
        filename: "transactionInvoice.pdf",
        image: { type: "jpeg", quality: 0.95 },
        html2canvas: {
          scale: 2,
          logging: true,
          dpi: 300,
          letterRendering: true,
        },
      })
      .toPdf()
      .get("pdf")
      .save();
  };

  const columns = [
    {
      name: "SL",
      grow: 0,
      selector: (row, index) => <span className="mr-10">{row.Index}</span>,
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
              {row?.withdrawalId}
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
      name: "Type",
      grow: 1,
      cell: (row) => <p>{row?.type ? row?.type : "REQUEST"}</p>,
      style: { textAlign: "left", display: "block" },
    },
    {
      name: "Status",
      grow: 1,
      cell: (row) => {
        if (row?.status === "APPROVED") {
          return (
            <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg  font-medium bg-green-200 text-green-800 text-base">
              <span className="text-[20px]"> &#8226;</span> Successful
            </span>
          );
        } else if (row?.status === "AWAITING") {
          return (
            <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg font-medium bg-yellow-200 text-yellow-800 text-base">
              <span className="text-[20px]"> &#8226;</span> Awaiting
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
      sortable: "true",
      center: "true",
      width: "140px",
    },
    {
      name: "Amount",
      grow: 1,
      sortable: "true",
      cell: (row) => {
        if (row?.status === "Successful") {
          return (
            <div className="text-[#25BF17]">
              <span>&#8377;</span>
              {row?.amount}
            </div>
          );
        }

        return (
          <div className="text-yellow-800">
            <span>&#8377;</span>
            {row?.amount}
          </div>
        );
      },
      style: { textAlign: "center", display: "block" },
      sortFunction: amountSortFun,
      center: true,
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
      name: "Actions",
      grow: 0,
      center: true,
      style: {
        textAlign: "center",
      },
      // button: "true",
      cell: (row) => (
        <>
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

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };
  const handleWithdraw = async (amount) => {
    if (bankBal === 0) {
      toast("Withdrawal balance is zero", {
        theme: "dark",
        hideProgressBar: true,
        type: "warning",
      });
      return;
    } else if (amount > bankBal) {
      toast("Amount should be less than balance amount", {
        theme: "dark",
        hideProgressBar: true,
        type: "warning",
      });
      return;
    }
    if (bankBal - amount < 0) {
      toast("Please enter valid amount", {
        theme: "dark",
        hideProgressBar: true,
        type: "warning",
      });
      return;
    }
    // Implement your withdrawal logic here
    // console.log("Withdrawal amount:", amount, typeof amount);
    try {
      const response = await apiClient.post(WITHDRAW_PAYMENT, {
        amount: amount,
        agentId: agentData?._id,
        accountNumber: agentData?.bank_details?.account?.accountNo,
        ifscCode: agentData?.bank_details?.account?.ifsc,
      });
      console.log("res===>", response);
      let message = response.data.message;
      const type = response.data.code;
      if (type === 200) {
        setStatus(!status);
        const message =
          response?.data?.response?.message || response?.data?.message;
        toast(message, {
          theme: "dark",
          hideProgressBar: true,
          type: "success",
        });
      } else {
        toast(message, {
          theme: "dark",
          hideProgressBar: true,
          type: "warning",
        });
      }
    } catch (error) {
      console.log(error);
      const msg = error?.response?.data?.message;
      toast(msg || "Something wrong", {
        theme: "dark",
        hideProgressBar: true,
        type: "error",
      });
      window.location.reload();
    }
  };

  const checkAgentBalance = async () => {
    setBankBalLoad(true);
    await apiClient
      .post(CHECK_AGENT_BALANCE, {
        agentId: agentData?._id,
      })
      .then((response) => {
        setBankBalLoad(false);
        const status = response.status;

        if (status === 200) {
          setBankBal(response.data.response.Balance);
        }
      })
      .catch((error) => {
        setBankBalLoad(false);
        setBankBal("ERROR OCCURED");

        if (!error.status) {
          toast("server busy", {
            theme: "dark",
            hideProgressBar: true,
            type: "error",
          });
          return;
        }
        const status = error.response.status;
        const message = error.response.data.message;

        if (status === 400) {
          toast(message, {
            theme: "dark",
            hideProgressBar: true,
            type: "error",
          });
        }
      });
  };

  useEffect(() => {
    checkAgentBalance();
  }, [agentData]);
  return (
    <div className="mt-6 sm:mt-10">
      {load && <Loader />}
      <h2 className="text-xl font-semibold mb-2 sm:mb-0">Withdraw</h2>
      {/* Withdraw card */}
      <div className="mt-4 min-[425px]:mt-8">
        <div className="w-[100%] min-[768px]:w-[70%] min-[900px]:w-[60%] min-[1000px]:w-[50%] flex justify-between bg-[#0444ff] rounded-[20px] p-4 min-[435px]:p-8 bg-image">
          <div>
            <div className="flex gap-2 mb-5 text-white">
              <div>
                <span className="mb-2">Balance:</span>
                {/* <p className="text-[28px]">&#8377;10,000</p> */}
                {/* <p className="text-[28px]">
                  &#8377;{agentData?.total_earnings}
                </p> */}
                {bankBalLoad ? (
                  <p className="text-[28px]"> &#8377;LOADING...</p>
                ) : (
                  <p className="text-[28px]">&#8377;{bankBal || 0}</p>
                )}
              </div>
              <div className="cursor-pointer">
                <img src={ReloadIcon} alt="" onClick={checkAgentBalance} />
              </div>
            </div>
            <button
              className="flex items-center gap-2 px-[18.5px] min-[425px]:px-[37px] py-2 min-[425px]:py-4 bg-[#00006B] text-[14px] text-white rounded-lg "
              onClick={openPopup}
            >
              <span>Withdraw</span>
              <span>
                <img src={withdrawArrowIcon} alt="" />
              </span>
            </button>
          </div>
          {/* <div>
            <button className="flex items-center gap-2 bg-white px-3 min-[425px]:px-6 py-1.5 min-[425px]:py-3 rounded">
              <span className="text-[#7B7B7B] text-[14px]">Date</span>
              <span>
                <img src={calanderIcon} alt="" />
              </span>
            </button>
          </div> */}
        </div>
      </div>
      {isPopupOpen && (
        <WithdrawPopup onClose={closePopup} onWithdraw={handleWithdraw} />
      )}
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
    </div>
  );
}

export default WithdrawTable;
