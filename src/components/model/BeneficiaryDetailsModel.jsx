import React from "react";
import CrossBox from "../../assets/svg/crossbox.svg";

const BeneficiaryDetailsModel = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div
        className="absolute w-full h-full bg-gray-800 opacity-50"
        // onClick={onClose}
      ></div>
      <div className="bg-white w-[30%] p-8 rounded-lg shadow-lg z-10">
        <p className="text-end">
          {" "}
          <button type="button" className="" onClick={onClose}>
            <img src={CrossBox} alt="" className="" />
          </button>
        </p>
        <h1 className="text-[28px] text-[#45464E] my-4">Beneficiary Details</h1>
        <form>
          {/* Your form fields go here */}
          <label htmlFor="fullname" className="text-sm text-[#5E6366] ">
            Full Name
          </label>
          <div className="mt-1 mb-2">
            <input
              id="fullname"
              type="text"
              className="w-full bg-[#EFF1F9] border-none rounded-lg"
            />
          </div>

          <label htmlFor="email" className="text-sm text-[#5E6366] ">
            Beneficiary Email{" "}
          </label>
          <div className="mt-1  mb-2">
            <input
              id="email"
              type="text"
              className="w-full bg-[#EFF1F9] border-none rounded-lg"
            />
          </div>
          <label htmlFor="phoneNumber" className="text-sm text-[#5E6366] ">
            Phone Number
          </label>
          <div className="mt-1  mb-2">
            <input
              id="phoneNumber"
              type="text"
              className="w-full bg-[#EFF1F9] border-none rounded-lg"
            />
          </div>
          <label htmlFor="address" className="text-sm text-[#5E6366] ">
            Address{" "}
          </label>
          <div className="mt-1  mb-2">
            <textarea
              id="address"
              type="text"
              className="w-full bg-[#EFF1F9] border-none rounded-lg resize-none	"
            />
          </div>
          <label htmlFor="accountNumber" className="text-sm text-[#5E6366] ">
            Beneficiary’s account number
          </label>
          <div className="mt-1  mb-2">
            <input
              id="accountNumber"
              type="text"
              className="w-full bg-[#EFF1F9] border-none rounded-lg 	"
            />
          </div>

          <label
            htmlFor="reEnterAccountNumber"
            className="text-sm text-[#5E6366] "
          >
            Re-Enter Beneficiary’s account number
          </label>
          <div className="mt-1  mb-2">
            <input
              id="reEnterAccountNumber"
              type="text"
              className="w-full bg-[#EFF1F9] border-none rounded-lg "
            />
          </div>
          <label htmlFor="ifsc" className="text-sm text-[#5E6366] ">
            IFSC code
          </label>
          <div className="mt-1  mb-2">
            <input
              id="ifsc"
              type="text"
              className="w-full bg-[#EFF1F9] border-none rounded-lg "
            />
          </div>
          <div className="flex justify-center mt-5">
            <button className="px-20 py-2 bg-[#00006B] text-white rounded-lg">
              save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BeneficiaryDetailsModel;
