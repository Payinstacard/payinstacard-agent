import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Task", "Hours per Day"],
  ["Completed", 63],
  ["Pending", 25],
  ["Failed", 12],
];

export const options = {
  colors: ["#00006B", "#6CDE62", "#EFF4FB"],
  legend: "none",
};

function ReportPiehart() {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}

export default ReportPiehart;
