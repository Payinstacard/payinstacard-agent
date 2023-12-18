import React from "react";
import { Chart } from "react-google-charts";
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
      contact_info: {
        fullName: "Manikanta Putta",
        mobile: "9876543210",
      },
    },
    {
      total_amount: "150",
      transactionId: "T123456789873",
      created_At: "2023-11-09T14:30:00.000Z",
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
      created_At: "2023-11-10T16:45:00.000Z",
      status: "Successful",
      beneficiary: { mobile: "7654321098", ifsc: "ICIC0012345" },
      contact_info: {
        fullName: "Manikanta Putta",
        mobile: "9876543210",
      },
    },
    {
      total_amount: "90",
      transactionId: "T123456789875",
      created_At: "2023-11-12T10:15:00.000Z",
      status: "Successful",
      beneficiary: { mobile: "6543210987", ifsc: "AXIS0012345" },
      contact_info: {
        fullName: "Manikanta Putta",
        mobile: "9876543210",
      },
    },
    {
      total_amount: "80",
      transactionId: "T123456789876",
      created_At: "2023-11-15T12:30:00.000Z",
      status: "Successful",
      beneficiary: { mobile: "5432109876", ifsc: "BOB0012345" },
      contact_info: {
        fullName: "Manikanta Putta",
        mobile: "9876543210",
      },
    },
    {
      total_amount: "70",
      transactionId: "T123456789877",
      created_At: "2023-11-18T09:45:00.000Z",
      status: "Successful",
      beneficiary: { mobile: "4321098765", ifsc: "PNB0012345" },
      contact_info: {
        fullName: "Manikanta Putta",
        mobile: "9876543210",
      },
    },
    {
      total_amount: "60",
      transactionId: "T123456789878",
      created_At: "2023-11-20T14:00:00.000Z",
      status: "Successful",
      beneficiary: { mobile: "3210987654", ifsc: "SBI0012345" },
      contact_info: {
        fullName: "Manikanta Putta",
        mobile: "9876543210",
      },
    },
    {
      total_amount: "50",
      transactionId: "T123456789879",
      created_At: "2023-11-22T11:30:00.000Z",
      status: "Pending",
      beneficiary: { mobile: "2109876543", ifsc: "UBI0012345" },
      contact_info: {
        fullName: "Manikanta Putta",
        mobile: "9876543210",
      },
    },
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
      created_At: "2023-11-27T10:00:00.000Z",
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
      created_At: "2023-11-28T13:15:00.000Z",
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
      created_At: "2023-11-30T09:30:00.000Z",
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

export const data = [
  ["Task", "Hours per Day"],
  ["Completed", customersDummyData?.transactions.filter((items) => items.status === 'Successful').length],
  ["Pending", customersDummyData?.transactions.filter((items) => items.status === 'Pending').length],
  ["Failed", customersDummyData?.transactions.filter((items) => items.status === 'Failed').length],
];

export const options = {
  colors: ["#00006B", "#6CDE62", "#EFF4FB"],
  legend: "none",
};

function ReportPiehart() {
  return (
    <div className="p-4 bg-white rounded-lg ">
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"300px"}
        className=" "
      />
    </div>
  );
}

export default ReportPiehart;
