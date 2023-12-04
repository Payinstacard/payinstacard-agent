import React, { useState } from "react";
import BeneficiaryDetailsModel from "./BeneficiaryDetailsModel";
import delete_beneficiary_icon from "../../assets/svg/delete_beneficiary.svg";
import { useDispatch } from "react-redux";
import {
  fetchSingleCustomer,
  setCustomersLoading,
} from "../../stores/CustomerRedux";
import apiClient from "../../services/apiClient";
import { DELETE_BENEFICIARY } from "../../services/apiConstant";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function BeneficiaryItem({ key, item }) {
  console.log("item", item);
  const params = useParams();
  const id = params?.id;
  const dispatch = useDispatch();
  const deleteBeneficiary = async () => {
    dispatch(setCustomersLoading(true));
    await apiClient
      .post(DELETE_BENEFICIARY, { beneficiary_id: item?._id })
      .then((response) => {
        console.log("delete respo=>", response);
        // setFormData(initialBeneficiaryData);
        if (
          String(response?.data?.code) === "201" &&
          response.data.status === true
        ) {
          dispatch(setCustomersLoading(false));
          dispatch(fetchSingleCustomer(id));
          toast(
            response?.data?.message
              ? response?.data?.message
              : "Customer Beneficiary deleted Successfully",
            {
              theme: "dark",
              hideProgressBar: true,
              type: "success",
            }
          );
        } else {
          toast(
            response?.data?.message
              ? response?.data?.message
              : "Something Wrong",
            {
              theme: "dark",
              hideProgressBar: true,
              type: "error",
            }
          );
        }
        dispatch(setCustomersLoading(false));
      })
      .catch((error) => {
        toast(
          error?.response?.data?.message
            ? error?.response?.data?.message
            : "Something Wrong",
          {
            theme: "dark",
            hideProgressBar: true,
            type: "error",
          }
        );
        dispatch(setCustomersLoading(false));
      });
  };
  return (
    <div
      className="text-xs sm:text-sm custom-box-shadow p-4 sm:p-8 rounded-lg mb-4 sm:mb-8"
      key={key}
    >
      <div className="flex justify-between border-b pb-2 sm:pb-4 mb-2 sm:mb-4 items-center">
        <h1 className="text-base sm:text-lg font-bold">
          ID: {item?.beneficiary_id}
        </h1>
        <button onClick={deleteBeneficiary}>
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
