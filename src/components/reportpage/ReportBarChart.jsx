import React from "react";
import { useState } from "react";
import { Chart } from "react-google-charts";

function ReportBarChart() {
  const [duration, setduration] = useState("day");
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

  const [chartData, setChartData] = useState([
    ["Days", "Active Customers"],
    ...customersDummyData?.transactions?.map((item) => [
      new Date(new Date(item?.created_At)).getDate(),
      parseInt(item?.total_amount),
    ]),
  ]);
  console.log("data", chartData);

  const options = {
    colors: ["#00006B"],
    legend: { position: "none" },
    visualisation: { spacing: 1 },
    chart: {},
  };

  const getTotalByWeek = (transactions) => {
    const totalsByWeek = [];

    const getWeekNumber = (date) => {
      const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
      const days = Math.floor((date - firstDayOfYear) / (24 * 60 * 60 * 1000));
      return Math.ceil((days + firstDayOfYear.getDay() + 1) / 7);
    };

    transactions.forEach((transaction) => {
      const date = new Date(transaction.created_At);
      const weekNumber = getWeekNumber(date);
      const monthYearKey = `${date.getMonth() + 1}-${date.getFullYear()}`;
      const weekLabel = `${monthYearKey}-Week${weekNumber}`;

      // Find the index of the week label in totalsByWeek
      const weekIndex = totalsByWeek.findIndex(
        ([label]) => label === weekLabel
      );

      if (weekIndex === -1) {
        // If the week label is not found, add a new entry
        totalsByWeek.push([weekLabel, parseFloat(transaction.total_amount)]);
      } else {
        // If the week label is found, update the total amount
        totalsByWeek[weekIndex][1] += parseFloat(transaction.total_amount);
      }
    });

    // Sort by date
    totalsByWeek.sort((a, b) => {
      const [aDate] = a[0].split("-Week");
      const [bDate] = b[0].split("-Week");
      return new Date(aDate) - new Date(bDate);
    });

    // Add the header row
    totalsByWeek.unshift(["Weeks", "Active Customers"]);

    return totalsByWeek;
  };

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const getTotalByMonth = (transactions) => {
    const totalsByMonth = {};

    transactions.forEach((transaction) => {
      const date = new Date(transaction.created_At);
      const monthYearKey = `${monthNames[date.getMonth()]}-${date
        .getFullYear()
        .toString()
        .slice(-2)}`;

      if (!totalsByMonth[monthYearKey]) {
        totalsByMonth[monthYearKey] = 0;
      }

      totalsByMonth[monthYearKey] += parseFloat(transaction.total_amount);
    });

    // Add all 12 months with 0 total if no records for that month
    for (let month = 0; month < 12; month++) {
      const monthYearKey = `${monthNames[month]}-${new Date()
        .getFullYear()
        .toString()
        .slice(-2)}`;
      if (!totalsByMonth[monthYearKey]) {
        totalsByMonth[monthYearKey] = 0;
      }
    }

    // Sort by date
    const sortedMonths = Object.entries(totalsByMonth).sort((a, b) => {
      const [aDate] = a[0].split("-");
      const [bDate] = b[0].split("-");
      return (
        parseInt(monthNames.indexOf(aDate), 10) -
        parseInt(monthNames.indexOf(bDate), 10)
      );
    });

    // Format the result for your chart
    const formattedMonths = sortedMonths.map(([monthYearKey, totalAmount]) => {
      return [monthYearKey, totalAmount];
    });

    // Add the header row
    formattedMonths.unshift(["Months", "Active Customers"]);

    return formattedMonths;
  };

  const handleDayClick = () => {
    // Get the date for 31 days ago
    const thirtyOneDaysAgo = new Date();
    thirtyOneDaysAgo.setDate(thirtyOneDaysAgo.getDate() - 31);

    const dayData = [
      ["Days", "Active Customers"],
      ...customersDummyData?.transactions
        ?.filter((item) => new Date(item?.created_At) >= thirtyOneDaysAgo)
        .map((item) => [
          new Date(new Date(item?.created_At)).getDate(),
          parseInt(item?.total_amount),
        ]),
    ];

    // Update the state with the new data
    setChartData(dayData);
    setduration("day");
  };

  const handleWeekClick = () => {
    const weekData = getTotalByWeek(customersDummyData?.transactions);

    // Update the state with the new data
    setChartData(weekData);
    setduration("week");
  };

  const handleMonthClick = () => {
    const monthData = getTotalByMonth(customersDummyData?.transactions);

    // Update the state with the new data
    setChartData(monthData);
    setduration("month");
  };
  return (
    <div className="p-4 bg-white rounded-lg mb-10">
      <div className="flex flex-col min-[900px]:flex-row items-center justify-between mb-3">
        <h1 className="text-lg font-medium">Customers Report</h1>
        <div className="flex flex-col gap-2 min-[450px]:flex-row items-center p-2 min-[450px]:p-4">
          <div className="flex items-center gap-1">
            <div className="w-[10px] h-[10px] bg-[#00006B] rounded-[2px]"></div>
            <div className="mr-4 ">Customers</div>
          </div>
          <div className="flex bg-gray-100">
            <button
              className={`py-1 px-6 mr-2 ${
                duration === "day" && "bg-primary text-white rounded"
              }`}
              onClick={handleDayClick}
            >
              Day
            </button>
            <button
              className={`py-1 px-4 mr-2 ${
                duration === "week" && "bg-primary text-white rounded"
              }`}
              onClick={handleWeekClick}
            >
              Week
            </button>
            <button
              className={`py-1 px-4 ${
                duration === "month" && "bg-primary text-white rounded"
              }`}
              onClick={handleMonthClick}
            >
              Month
            </button>
          </div>
        </div>
      </div>
      <Chart
        chartType="Bar"
        width="100%"
        height="400px"
        data={chartData}
        options={options}
      />
    </div>
  );
}
export default ReportBarChart;
