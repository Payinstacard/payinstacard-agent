import React, { useState } from "react";
import BeneficiaryDetailsModel from "../model/BeneficiaryDetailsModel";
import delete_beneficiary_icon from "../../assets/svg/delete_beneficiary.svg";

function BeneficiaryAccounts(props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="m-8 max-w-3xl">
      <div className="flex flex-col flex-wrap sm:flex-row justify-between items-center my-4">
        <h2 className="text-xl font-semibold mb-2 sm:mb-0">Benificiary</h2>
        <div>
          {/* <button className="bg-primary text-white py-1 px-3 sm:py-2 rounded-lg rounded-6 sm:px-6"> */}
          <button
            className="bg-primary text-white cursor-pointer  py-1 px-3 sm:py-2 text-sm sm:text-base rounded-lg rounded-6 sm:px-6"
            onClick={openModal}
          >
            <span className="mr-2 sm:mr-4">+</span>
            Add new Benificiary
          </button>
          {/* </button> */}
        </div>
      </div>
      <div>
        <BeneficiaryDetailsModel isOpen={isModalOpen} onClose={closeModal} />
      </div>

      <div class="text-sm custom-box-shadow p-8 rounded-lg">
        <div className="flex justify-between border-b pb-4 mb-4 items-center">
          <h1 className="text-lg font-bold">ID: PAYINSTA123</h1>
          <button>
            <img src={delete_beneficiary_icon} />
          </button>
        </div>
        <div className="flex justify-between flex-wrap mb-3">
          <div className="md:w-[30%] w-full ">
            <p className="text-[#8B8D97] mb-1">Full Name</p>
            <p className="font-bold text-base">putta manikanta</p>
          </div>
          <div className="md:w-[30%] w-full">
            <p className="text-[#8B8D97] mb-1">Beneficiary Email</p>
            <p className="font-bold text-base">kljsdflkjsd@gamil.com</p>
          </div>
          <div className="md:w-[30%] w-full">
            <p className="text-[#8B8D97] mb-1">Beneficiary Phone Number</p>
            <p className="font-bold text-base">9812435678</p>
          </div>
        </div>
        <div className="mb-3">
          <p className="text-[#8B8D97] mb-1">Beneficiary Address</p>
          <p className="font-bold text-base">
            AddressAddress AddressAddressAddress
          </p>
        </div>
        <div className="flex justify-between flex-wrap">
          <div className="md:w-[30%] w-full w-full">
            <p className="text-[#8B8D97] mb-1">Payment Type</p>
            <p className="font-bold text-base">Bank</p>
          </div>
          <div className="md:w-[30%] w-full">
            <p className="text-[#8B8D97] mb-1">Account No</p>
            <p className="font-bold text-base">123456789812</p>
          </div>
          <div className="md:w-[30%] w-full">
            <p className="text-[#8B8D97] mb-1">IFSC</p>
            <p className="font-bold text-base">SBIN35678</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BeneficiaryAccounts;
