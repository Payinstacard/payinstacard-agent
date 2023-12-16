import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Loader from "../common/Loader/Loader";

function Reports(props) {
  const customersLoading = useSelector(
    (state) => state?.customersData?.customersLoading
  );
  return (
    <>
      {customersLoading && <Loader />}
      <div className="mx-2 sm:mx-0">
        <Outlet />
      </div>
    </>
  );
}

export default Reports;
