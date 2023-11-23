import React from "react";
import { Link, useParams } from "react-router-dom";

function CustomersDetails(props) {
  const para = useParams();
  return (
    <div>
      <Link
        to={"/dashboard/customers"}
        className="border border-primary text-[#00006B] hover:bg-primary hover:text-[#FFFFFF] font-medium rounded-md px-8 py-1 mr-8"
      >
        <span className="mr-2">&#8592;</span> Back
      </Link>
    </div>
  );
}

export default CustomersDetails;
