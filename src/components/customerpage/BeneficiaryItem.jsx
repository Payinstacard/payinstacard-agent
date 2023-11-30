import React, { useState } from "react";
import BeneficiaryDetailsModel from "./BeneficiaryDetailsModel";
import delete_beneficiary_icon from "../../assets/svg/delete_beneficiary.svg";

function BeneficiaryItem({ key, item }) {
  return (
    <div
      className="text-xs sm:text-sm custom-box-shadow p-4 sm:p-8 rounded-lg mb-4 sm:mb-8"
      key={key}
    >
      <div className="flex justify-between border-b pb-2 sm:pb-4 mb-2 sm:mb-4 items-center">
        <h1 className="text-base sm:text-lg font-bold">
          ID: {item?.beneficiary_id}
        </h1>
        <button>
          <img src={delete_beneficiary_icon} className="w-8 sm:w-11" />
        </button>
      </div>
      <div className="flex flex-wrap mb-0 sm:mb-2 break-words">
        <div className="md:w-[33%] w-full mb-1 sm:mb-3 pr-0 sm:pr-3">
          <p className="text-gray-500 text-sm mb-0 sm:mb-1">Full Name</p>
          <p className="font-bold text-sm sm:text-base">
            {item?.beneficiary_name}
          </p>
        </div>
        <div className="md:w-[33%] w-full mb-1 sm:mb-3 pr-0 sm:pr-3">
          <p className="text-gray-500 text-sm mb-0 sm:mb-1">
            Beneficiary Email
          </p>
          <p className="font-bold text-sm sm:text-base">
            {item?.beneficiary_email}
          </p>
        </div>
        <div className="md:w-[33%] w-full mb-1 sm:mb-3 pr-0 sm:pr-3">
          <p className="text-gray-500 text-sm mb-0 sm:mb-1">
            Beneficiary Phone Number
          </p>
          <p className="font-bold text-sm sm:text-base">
            {item?.beneficiary_phone}
          </p>
        </div>
      </div>

      <div className="sm:mb-4 mb-1">
        <p className="text-gray-500 text-sm mb-0 sm:mb-1">
          Beneficiary Address
        </p>
        <p className="font-bold text-sm sm:text-base">
          {item?.beneficiary_address}
        </p>
      </div>

      <div className="flex flex-wrap break-words">
        <div className="md:w-[33%] w-full mb-1 sm:mb-3 pr-0 sm:pr-3">
          <p className="text-gray-500 text-sm mb-0 sm:mb-1">Payment Type</p>
          <p className="font-bold text-sm sm:text-base">
            {item?.payment_info?.type}
          </p>
        </div>
        <div className="md:w-[33%] w-full mb-1 sm:mb-3 pr-0 sm:pr-3">
          <p className="text-gray-500 text-sm mb-0 sm:mb-1">Account No</p>
          <p className="font-bold text-sm sm:text-base">
            {item?.payment_info?.bankAccount}
          </p>
        </div>
        <div className="md:w-[33%] w-full mb-1 sm:mb-3 pr-0 sm:pr-3">
          <p className="text-gray-500 text-sm mb-0 sm:mb-1">IFSC</p>
          <p className="font-bold text-sm sm:text-base">
            {item?.payment_info?.ifsc_code}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BeneficiaryItem;
