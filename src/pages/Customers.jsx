import React from "react";

import { Outlet } from "react-router-dom";
import PageTitle from "../components/common/PageTitle/PageTitle";

function Customers(props) {
  return (
    <div className="mx-2 sm:mx-0">
      <Outlet />
    </div>
  );
}

export default Customers;
