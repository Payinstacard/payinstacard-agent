import React from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import Card from "../components/common/Card/Card";
import CustomerIcon from "../assets/svg/customerIcon.svg";

function CustomersDetailsLayout(props) {
  const location = useLocation();
  const para = useParams();
  return (
    <div className="mt-4 sm:mt-10">
      <Link
        to={"/dashboard/customers"}
        className="border border-primary text-[#00006B] sm:text-base text-sm hover:bg-primary hover:text-[#FFFFFF] font-medium rounded-md px-4 py-2 sm:px-6 sm:py-3 ms-4 sm:ms-0"
      >
        <span className="mr-2">&#8592;</span> Back
      </Link>
      {/* <div className=" flex flex-wrap justify-between gap-3 mt-8 bg-white rounded-md h-full flex-1 px-10 py-10 pt-14"> */}
      <div className="bg-white rounded-md">
        <div className="flex flex-wrap justify-between gap-3 mt-4 sm:mt-8 h-full flex-1 px-4 py-4 sm:px-10 sm:py-10">
          {/* <div className="grid grid-cols-2 gap-2 text-sm custom-box-shadow p-4 rounded-lg lg:w-[50%] md:w-full"> */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs sm:text-sm custom-box-shadow p-4 rounded-lg lg:w-[50%] w-full">
            <div className="grid grid-rows-2 gap-3">
              <div className="flex">
                <img src={CustomerIcon} alt="customer-icon" />
                <div className="ms-4">
                  <h3 className="font-bold text-sm sm:text-base">
                    Manikanta Putta
                  </h3>
                  <p>
                    <span className="text-[#8B8D97]">Added on</span> 12 Sept
                    2023
                  </p>
                </div>
              </div>
              <div>
                <p className="text-[#8B8D97]">Email ID</p>
                <p>manikantaputta@gmail.com</p>
              </div>
            </div>
            <div className="grid grid-rows-2 gap-3">
              <div>
                <p className="text-[#8B8D97]">Phone Number</p>
                <p>987654310</p>
              </div>
              <div>
                <p className="text-[#8B8D97]">Address</p>
                <p>Hitech city, Hyderabad, Telangana, India - 500074</p>
              </div>
            </div>
          </div>
          {/* <Card data={data.length} title={"Total Customers"} /> */}
          <div className="flex sm:flex-row gap-4 sm:w-[45%] flex-col grow">
            {/* <div className="flex flex-row flex-wrap gap-4 w-full md:w-[90%] lg:w-[75%]"> */}{" "}
            <Card data="2" title={"Total Customers"} width="sm:w-[50%] " />
            <Card
              data="&#8377;20,000"
              title={"Total Payments"}
              width="sm:w-[50%]"
            />
          </div>
        </div>
        {/* <div className="bg-white p-9 rounded-lg"> */}
        <div className="p-2 md:p-9 ">
          {/* <div className="border-b border-[#989898] text-lg py-4"> */}
          <div className="ml-4 border-b pb-4 text-[#989898] flex flex-col md:flex-row items-center">
            <div className="text-[#989898] text-sm sm:text-base">
              <NavLink
                to=""
                className={
                  location.pathname === "/dashboard/customers/customer-details"
                    ? "content_border text-primary font-bold mr-3 sm:mr-14 py-4"
                    : ""
                }
              >
                Beneficiary Accounts
              </NavLink>
              <NavLink
                to="transactions"
                className={
                  location.pathname ===
                  "/dashboard/customers/customer-details/transactions"
                    ? "content_border text-primary font-bold ml-3 sm:ml-14 py-4"
                    : ""
                }
              >
                Transactions
              </NavLink>
            </div>
          </div>

          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}

export default CustomersDetailsLayout;
