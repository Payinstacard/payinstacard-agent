import React from "react";
import { Outlet } from "react-router";
import Loader from "../common/Loader/Loader";
import { useSelector } from "react-redux";

function Transactions(props) {
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

export default Transactions;
