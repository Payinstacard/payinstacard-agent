import React from "react";
import { useSelector } from "react-redux";
import Loader from "../common/Loader/Loader";
import { Outlet } from "react-router-dom";

function Withdraw(props) {
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

export default Withdraw;
