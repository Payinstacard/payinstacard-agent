import React from "react";
import { useAuth } from "../stores/AuthContext";
import { useNavigate } from "react-router-dom";
import PageTitle from "../components/common/PageTitle/PageTitle";
import SupportIcon from "../assets/img/support.png";
import Card from "../components/common/Card/Card";

function AgentsLayout(props) {
  const auth = useAuth();
  const navigation = useNavigate();

  const logout = () => {
    auth.logoutCurrentUser();
    navigation("/");
  };
  return (
    <>
      {/* <div className="flex flex-col sm:flex-row justify-between items-center">
        <h2 className="text-xl font-semibold mb-2 sm:mb-0">Dashboard</h2>
        <div>
          <Link
            to="/dashboard/agentsmanagement/addAgent"
            className="bg-primary text-white cursor-pointer  py-1 px-3 sm:py-2 text-sm sm:text-base rounded-lg rounded-6 sm:px-6"
          >
            <span className="mr-2 sm:mr-4">+</span>Support
          </Link>
        </div>
      </div> */}
      <PageTitle
        url="/dashboard/agentsmanagement/addAgent"
        title="Dashboard"
        buttonText="Support"
        buttonIcon={SupportIcon}
      />
      <div className="flex flex-wrap justify-start gap-3 sm:gap-6 my-8">
        <Card data="100" title={"Total Customers"} width="w-1/4" />
        <Card
          // data={
          //   [...data.filter((row) => row.OrderPaymentStatus === "200")].length
          // }
          data="&#8377;20,000"
          title={"Total payments"}
          width="w-1/4"
        />
        <Card
          number={true}
          // data={data
          //   .filter((data) => data.OrderPaymentStatus === "200")
          //   .reduce(
          //     (total, transaction) =>
          //       total + parseInt(transaction.benificary_details.Amount),
          //     0
          //   )}
          data="2530"
          title={"Commission Earned"}
          width="w-1/4"
        />
      </div>
      {/* <div className="flex justify-between">
        <div className="w-3/4">graph here</div>
        <div className="w-1/4 h-[300px]">pie chart here</div>
      </div> */}

      {/* <p>for logout</p>
      <button onClick={logout}>logout</button> */}
    </>
  );
}

export default AgentsLayout;
