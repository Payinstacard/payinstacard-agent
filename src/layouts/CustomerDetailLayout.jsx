import React from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import Card from "../components/model/Card";
import CustomerIcon from "../assets/svg/customerIcon.svg";

function CustomersDetailsLayout(props) {
  const location = useLocation();
  const para = useParams();
  return (
    <div>
      <Link
        to={"/dashboard/customers"}
        className="border border-primary text-[#00006B] text-base hover:bg-primary hover:text-[#FFFFFF] font-medium rounded-md px-6 py-3 mr-8 mt-10"
      >
        <span className="mr-2">&#8592;</span> Back
      </Link>
      <div className=" flex flex-wrap justify-between gap-3 mt-8 bg-white rounded-md h-full flex-1 px-10 py-10 pt-14">
        <div class="grid grid-cols-2 gap-2 text-sm custom-box-shadow p-4  rounded-lg w-[50%]">
          <div className="grid grid-rows-2 gap-3">
            <div className="flex">
              <img src={CustomerIcon} alt="customer-icon" />
              <div className="ms-4">
                <h3 className="font-bold">Manikanta Putta</h3>
                <p>
                  <span className="text-[#8B8D97]">Added on</span> 12 Sept 2023
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
        <div className="flex flex-row gap-4 w-[45%] grow">
          {" "}
          <Card data="2" title={"Total Customers"} width="w-[50%]" />
          <Card data="&#8377;20,000" title={"Total Payments"} width="w-[50%]" />
        </div>
      </div>
      <div className="bg-white p-9 rounded-lg">
        <div className="border-b border-[#989898] text-lg py-4">
          <div className="ml-4 text-[#989898]">
            <NavLink
              to=""
              // className={({ isActive, isPending }) => {
              //   return `${
              //     isPending ? "pending" : isActive ? "active  text-primary" : ""
              //   } mr-6 `;
              // }}
              className={
                location.pathname === "/dashboard/customers/customer-details"
                  ? "content_border text-primary font-bold mr-14 py-4"
                  : ""
              }
            >
              Beneficiary Accounts
            </NavLink>
            <NavLink
              to="transactions"
              // className={({ isActive, isPending }) => {
              //   return `${
              //     isPending ? "pending" : isActive ? "active  text-primary" : ""
              //   }`;
              // }}
              className={
                location.pathname ===
                "/dashboard/customers/customer-details/transactions"
                  ? "content_border text-primary font-bold ml-14 py-4"
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
  );
}

export default CustomersDetailsLayout;
