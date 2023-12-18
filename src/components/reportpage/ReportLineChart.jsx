import React from "react";
import { Chart } from "react-google-charts";
import { dummyCustomerData } from "../../utils/TableUtils";

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
      created_At: "2023-01-08T13:06:49.915Z",
      status: "Successful",
      beneficiary: { mobile: "9876543210", ifsc: "SBIN0025487" },
      contact_info: {
        fullName: "Manikanta Putta",
        mobile: "9876543210",
      },
    },
    {
      total_amount: "150",
      transactionId: "T123456789873",
      created_At: "2023-02-09T14:30:00.000Z",
      status: "Successful",
      beneficiary: { mobile: "8765432109", ifsc: "HDFC0012345" },
      contact_info: {
        fullName: "Manikanta Putta",
        mobile: "9876543210",
      },
    },
    {
      total_amount: "120",
      transactionId: "T123456789874",
      created_At: "2023-03-10T16:45:00.000Z",
      status: "Successful",
      beneficiary: { mobile: "7654321098", ifsc: "ICIC0012345" },
      contact_info: {
        fullName: "Manikanta Putta",
        mobile: "9876543210",
      },
    },
    // ... (more records for different months)
    {
      total_amount: "40",
      transactionId: "T123456789880",
      created_At: "2023-11-25T15:45:00.000Z",
      status: "Successful",
      beneficiary: { mobile: "1098765432", ifsc: "IDBI0012345" },
      contact_info: {
        fullName: "Manikanta Putta",
        mobile: "9876543210",
      },
    },
    {
      total_amount: "30",
      transactionId: "T123456789881",
      created_At: "2023-12-27T10:00:00.000Z",
      status: "Successful",
      beneficiary: { mobile: "0987654321", ifsc: "RBL0012345" },
      contact_info: {
        fullName: "Manikanta Putta",
        mobile: "9876543210",
      },
    },
    {
      total_amount: "20",
      transactionId: "T123456789882",
      created_At: "2023-12-28T13:15:00.000Z",
      status: "Failed",
      beneficiary: { mobile: "9876543210", ifsc: "HSBC0012345" },
      contact_info: {
        fullName: "Manikanta Putta",
        mobile: "9876543210",
      },
    },
    {
      total_amount: "10",
      transactionId: "T123456789883",
      created_At: "2023-12-30T09:30:00.000Z",
      status: "Successful",
      beneficiary: { mobile: "8765432109", ifsc: "CITI0012345" },
      contact_info: {
        fullName: "Manikanta Putta",
        mobile: "9876543210",
      },
    },
  ],
  transfers: [],
  updated_At: "2023-11-28T10:59:07.091Z",
  verified: false,
  __v: 4,
  _id: "6565c7fbb7b65e21cab03c67",
};

function getTotalAmountForMonth(transactions, targetMonth) {
  // Filter transactions for the target month
  const transactionsInMonth = transactions.filter((transaction) => {
    const transactionMonth = new Date(transaction.created_At).getMonth() + 1;
    return transactionMonth === targetMonth;
  });

  // Calculate the sum of total_amount for the target month
  const totalAmountForMonth = transactionsInMonth.reduce((sum, transaction) => {
    return sum + parseFloat(transaction.total_amount);
  }, 0);

  return totalAmountForMonth;
}

// export const data = [
//   [
//     { type: "string", label: "year" },
//     { type: "number", label: "sales" },
//     { type: "string", role: "tooltip", p: { html: true } },
//   ],
//   ["Jan", 1000, createCustomHTMLContent("Jan", 1000)],
//   ["Feb", 1170, createCustomHTMLContent("Feb", 1170)],
//   ["Mar", 660, createCustomHTMLContent("Mar", 660)],
//   ["Apr", 1030, createCustomHTMLContent("Apr", 1030)],
//   ["May", 789, createCustomHTMLContent("May", 789)],
//   ["Jun", 900, createCustomHTMLContent("Jun", 900)],
//   ["Jul", 365, createCustomHTMLContent("Jul", 365)],
//   ["Aug", 1300, createCustomHTMLContent("Aug", 1300)],
//   ["Sep", 630, createCustomHTMLContent("Sep", 630)],
//   ["Oct", 950, createCustomHTMLContent("Oct", 950)],
//   ["Nov", 850, createCustomHTMLContent("Nov", 850)],
//   ["Dec", 50, createCustomHTMLContent("Dec", 50)],
// ];

function createCustomHTMLContent(month, num) {
  return `<div><div style="font-size: 12px; padding:5px 15px;  background-color: #00006B; color:#fff;">
  ${month}
  </div>
  <div style="padding:5px 15px; white-space: nowrap;">
    <span style=" color:#00006B; margin-right:12px">&#8226;</span><span style="">Total Amount : ₹${num}</span>
  </div></div>`;
}

export const options = {
  curveType: "none",
  legend: "none",
  colors: ["#00006B"],
  lineWidth: 3,
  tooltip: {
    isHtml: true,
  },
  vAxis: { format: "₹" },
  chartArea: { left: 50, top: 90, height: "70%", width: "100%" },
};

function ReportLineChart({ startDate, endDate }) {
  console.log(startDate, endDate);
  let filterTransaction;

  if (startDate !== "" && endDate !== "") {
    const startTimestamp = new Date(startDate).getTime();
    const endTimestamp = new Date(endDate).getTime();

    filterTransaction = customersDummyData?.transactions.filter(
      (transaction) => {
        const transactionTimestamp = new Date(transaction.created_At).getTime();
        return (
          transactionTimestamp >= startTimestamp &&
          transactionTimestamp <= endTimestamp
        );
      }
    );
  } else {
    filterTransaction = customersDummyData.transactions;
  }

  const data = [
    [
      { type: "string", label: "year" },
      { type: "number", label: "sales" },
      { type: "string", role: "tooltip", p: { html: true } },
    ],
    // ...customersDummyData.transactions.map((item, index) => [
    //   getAbbreviatedMonthName(item.created_At),
    //   item.total_amount,
    //   createCustomHTMLContent(
    //     getAbbreviatedMonthName(item.created_At),
    //     item.total_amount
    //   ),
    // ]),

    [
      "Jan",
      getTotalAmountForMonth(filterTransaction, 1),
      createCustomHTMLContent(
        "Jan",
        getTotalAmountForMonth(filterTransaction, 1)
      ),
    ],
    [
      "Feb",
      getTotalAmountForMonth(filterTransaction, 2),
      createCustomHTMLContent(
        "Feb",
        getTotalAmountForMonth(filterTransaction, 2)
      ),
    ],
    [
      "Mar",
      getTotalAmountForMonth(filterTransaction, 3),
      createCustomHTMLContent(
        "Mar",
        getTotalAmountForMonth(filterTransaction, 3)
      ),
    ],
    [
      "Apr",
      getTotalAmountForMonth(filterTransaction, 4),
      createCustomHTMLContent(
        "Apr",
        getTotalAmountForMonth(filterTransaction, 4)
      ),
    ],
    [
      "May",
      getTotalAmountForMonth(filterTransaction, 5),
      createCustomHTMLContent(
        "May",
        getTotalAmountForMonth(filterTransaction, 5)
      ),
    ],
    [
      "Jun",
      getTotalAmountForMonth(filterTransaction, 6),
      createCustomHTMLContent(
        "Jun",
        getTotalAmountForMonth(filterTransaction, 6)
      ),
    ],
    [
      "Jul",
      getTotalAmountForMonth(filterTransaction, 7),
      createCustomHTMLContent(
        "Jul",
        getTotalAmountForMonth(filterTransaction, 7)
      ),
    ],
    [
      "Aug",
      getTotalAmountForMonth(filterTransaction, 8),
      createCustomHTMLContent(
        "Aug",
        getTotalAmountForMonth(filterTransaction, 8)
      ),
    ],
    [
      "Sep",
      getTotalAmountForMonth(filterTransaction, 9),
      createCustomHTMLContent(
        "Sep",
        getTotalAmountForMonth(filterTransaction, 9)
      ),
    ],
    [
      "Oct",
      getTotalAmountForMonth(filterTransaction, 10),
      createCustomHTMLContent(
        "Oct",
        getTotalAmountForMonth(filterTransaction, 10)
      ),
    ],
    [
      "Nov",
      getTotalAmountForMonth(filterTransaction, 11),
      createCustomHTMLContent(
        "Nov",
        getTotalAmountForMonth(filterTransaction, 11)
      ),
    ],
    [
      "Dec",
      getTotalAmountForMonth(filterTransaction, 12),
      createCustomHTMLContent(
        "Dec",
        getTotalAmountForMonth(filterTransaction, 12)
      ),
    ],
  ];

  return (
    <div className="p-4 bg-white rounded-lg mb-10">
      <Chart
        chartType="LineChart"
        width="100%"
        height="450px"
        data={data}
        options={options}
        className=""
      />
    </div>
  );
}
export default ReportLineChart;
