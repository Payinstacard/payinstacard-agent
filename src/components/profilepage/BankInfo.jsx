import React from "react";
import { useSelector } from "react-redux";
import greenTick from "../../assets/svg/GREENcheckbox.svg";
import { Link } from "react-router-dom";

function BankInfo(props) {
  const agentData = useSelector((state) => state?.agentData?.agentData);
  console.log(agentData);
  return (
    <div className="p-6">
      <div className="flex justify-between  items-center mb-6 md:mb-12">
        <h2 className="text-[20px] text-[#45464E] ">Bank Information</h2>
        <div className="hidden">
          {/* <button className="bg-primary text-white py-1 px-3 sm:py-2 rounded-lg rounded-6 sm:px-6"> */}
          <Link className="bg-primary text-white cursor-pointer  py-1 px-3 sm:py-2 text-sm sm:text-base rounded-md sm:rounded-lg rounded-6 sm:px-6">
            <span className="mr-2 sm:mr-4">+</span>
            Add New Bank Account{" "}
          </Link>
          {/* </button> */}
        </div>
      </div>
      <div className="md:w-[80%] mx-auto  mb-16">
        <div>
          <div className="w-[90%] md:flex md:justify-between">
            <div className="md:w-[45%]">
              <div>
                <p className="text-[14px] text-[#5E6366] mb-1">
                  Account Number
                </p>
                <div className="bg-[#EFF1F9] px-2 py-3 rounded">
                  {agentData?.bank_details?.account?.accountNo}
                </div>
              </div>
              {/* {agentData?.bank_details?.bank_verified === true ? (
                <div className="flex items-center gap-2 mt-1 invisible ">
                  <span className="text-[14px] text-[#5E6366]">
                    Bank Verified Name
                  </span>
                  <span>
                    <img src={greenTick} alt="" />
                  </span>
                </div>
              ) : (
                <></>
              )} */}
              <div className="mt-4 md:mt-11">
                <p className="text-[14px] text-[#5E6366] mb-1">Name</p>
                <div className="bg-[#EFF1F9] px-2 py-3 rounded">
                  {agentData?.bank_details?.account?.nameAtBank}
                </div>
              </div>

              {agentData?.bank_details?.bank_verified === true ? (
                <div className="flex items-center gap-2 mt-1 ">
                  <span className="text-[14px] text-[#5E6366]">
                    Bank Verified Name
                  </span>
                  <span>
                    <img src={greenTick} alt="" />
                  </span>
                </div>
              ) : (
                <></>
              )}
            </div>

            <div className="md:w-[45%] flex flex-col justify-between mt-4 md:mt-0">
              <div>
                <p className="text-[14px] text-[#5E6366] mb-1">IFSC Code</p>
                <div className="bg-[#EFF1F9]  px-2 py-3 rounded">
                  {agentData?.bank_details?.account?.ifsc}
                </div>
              </div>
              {agentData?.bank_details?.bank_verified === true ? (
                <div className="flex items-center gap-2 mt-1 ">
                  <span className="text-[14px] text-[#5E6366]">
                    {agentData?.bank_details?.account?.bankName}
                  </span>
                  <span>
                    <img src={greenTick} alt="" />
                  </span>
                </div>
              ) : (
                <></>
              )}

              <div className="mt-4 ">
                <p className="text-[14px] text-[#5E6366] mb-1">Branch</p>
                <div className="bg-[#EFF1F9]  px-2 py-3 rounded">
                  {agentData?.bank_details?.account?.branch}
                </div>
                {agentData?.bank_details?.bank_verified === true ? (
                  <div className="flex items-center gap-2 mt-1 invisible">
                    <span className="text-[14px] text-[#5E6366]">Verified</span>
                    <span>
                      <img src={greenTick} alt="" />
                    </span>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BankInfo;
