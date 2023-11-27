import React, { useState } from "react";
import BeneficiaryDetailsModel from "./BeneficiaryDetailsModel";
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
    <div className="m-2 sm:m-8 max-w-3xl">
      <div className="flex flex-col flex-wrap sm:flex-row justify-between items-center my-4">
        <h2 className="text-lg sm:text-xl  font-semibold mb-2 sm:mb-0">
          Benificiary
        </h2>
        <div>
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

      <div className="text-xs sm:text-sm custom-box-shadow p-4 sm:p-8 rounded-lg">
        <div className="flex justify-between border-b pb-2 sm:pb-4 mb-2 sm:mb-4 items-center">
          <h1 className="text-base sm:text-lg font-bold">ID: PAYINSTA123</h1>
          <button>
            <img src={delete_beneficiary_icon} className="w-8 sm:w-11" />
          </button>
        </div>
        <div className="flex flex-wrap mb-2">
          <div className="md:w-[30%] w-full mb-1 sm:mb-3">
            <p className="text-gray-500 text-sm mb-0 sm:mb-1">Full Name</p>
            <p className="font-bold text-sm sm:text-base">Putta Manikanta</p>
          </div>
          <div className="md:w-[30%] w-full mb-1 sm:mb-3">
            <p className="text-gray-500 text-sm mb-0 sm:mb-1">
              Beneficiary Email
            </p>
            <p className="font-bold text-sm sm:text-base">
              kljsdflkjsd@gmail.com
            </p>
          </div>
          <div className="md:w-[30%] w-full mb-1 sm:mb-3">
            <p className="text-gray-500 text-sm mb-0 sm:mb-1">
              Beneficiary Phone Number
            </p>
            <p className="font-bold text-sm sm:text-base">9812435678</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-gray-500 text-sm mb-0 sm:mb-1">
            Beneficiary Address
          </p>
          <p className="font-bold text-sm sm:text-base">
            AddressAddress AddressAddressAddress
          </p>
        </div>

        <div className="flex flex-wrap">
          <div className="md:w-[30%] w-full mb-1 sm:mb-3">
            <p className="text-gray-500 text-sm mb-0 sm:mb-1">Payment Type</p>
            <p className="font-bold text-sm sm:text-base">Bank</p>
          </div>
          <div className="md:w-[30%] w-full mb-1 sm:mb-3">
            <p className="text-gray-500 text-sm mb-0 sm:mb-1">Account No</p>
            <p className="font-bold text-sm sm:text-base">123456789812</p>
          </div>
          <div className="md:w-[30%] w-full mb-1 sm:mb-3">
            <p className="text-gray-500 text-sm mb-0 sm:mb-1">IFSC</p>
            <p className="font-bold text-sm sm:text-base">SBIN35678</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BeneficiaryAccounts;
