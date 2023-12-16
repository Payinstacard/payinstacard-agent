import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  [
    { type: "string", label: "year" },
    { type: "number", label: "sales" },
    { type: "string", role: "tooltip", p: { html: true } },
  ],
  ["Jan", 1000, createCustomHTMLContent("Jan", 1000)],
  ["Feb", 1170, createCustomHTMLContent("Feb", 1170)],
  ["Mar", 660, createCustomHTMLContent("Mar", 660)],
  ["Apr", 1030, createCustomHTMLContent("Apr", 1030)],
  ["May", 789, createCustomHTMLContent("May", 789)],
  ["Jun", 900, createCustomHTMLContent("Jun", 900)],
  ["Jul", 365, createCustomHTMLContent("Jul", 365)],
  ["Aug", 1300, createCustomHTMLContent("Aug", 1300)],
  ["Sep", 630, createCustomHTMLContent("Sep", 630)],
  ["Oct", 950, createCustomHTMLContent("Oct", 950)],
  ["Nov", 850, createCustomHTMLContent("Nov", 850)],
  ["Dec", 50, createCustomHTMLContent("Dec", 50)],
];

function createCustomHTMLContent(month, num) {
  return `<div><div style="font-size: 12px; padding:5px 15px;  background-color: #00006B; color:#fff;">
  ${month}
  </div>
  <div style="padding:5px 15px; white-space: nowrap;">
    <span style=" color:#00006B; margin-right:12px">&#8226;</span><span style="">Total Amount : ₹${num}</span>
  </div></div>`;
}

export const options = {
  curveType: "function",
  legend: "none",
  colors: ["#00006B"],
  lineWidth: 3,
  tooltip: {
    isHtml: true,
  },
  vAxis: { format: "₹" },
  chartArea: { left: 50, top: 90, height: "70%", width: "100%" },
};

function ReportLineChart() {
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
