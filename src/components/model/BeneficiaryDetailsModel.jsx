import React, { useState } from "react";
import CrossBox from "../../assets/svg/crossbox.svg";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import "./BeneficiaryDetailsModel.css";
import MobileInput from "./MobileInput";

const BeneficiaryDetailsModel = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    ben_mobile: "",
    ben_address: "",
    accountNumber: "",
    confirm_accountNumber: "",
    ifsc_code: "",
    benificiaryVerified: "",
  });
  const [formErrors, setFormErrors] = useState({
    fullName: "",
    email: "",
    ben_mobile: "",
    ben_address: "",
    accountNumber: "",
    confirm_accountNumber: "",
    ifsc_code: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChang = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //form validation

  const verifyForm = () => {
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      console.log("susceesfully verify form");
    } else {
      setFormErrors(errors);
    }
  };

  const validateForm = () => {
    const bankIfscRegX = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    const emailRegX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const mobileRegX = /^[6789]\d{9}$/;

    const errors = {};
    setFormErrors(errors);

    //for name
    if (formData.fullName === "") {
      errors.fullName = "Name is required";
    }

    //for email
    if (formData.email === "") {
      errors.email = "Email is required";
    } else if (!emailRegX.test(formData.email)) {
      errors.email = "Please enter valid email";
    }

    // for mobile filed

    if (formData.ben_mobile === "") {
      errors.ben_mobile = "Mobile number is required";
    } else if (formData.ben_mobile.length < 13) {
      errors.ben_mobile = "Please enter valid mobile number";
    }

    //for address filed

    if (formData.ben_address === "") {
      errors.ben_address = "Address is required";
    }

    //for account number filed
    if (formData.accountNumber === "") {
      errors.accountNumber = "Account number is required";
    } else if (
      !(
        formData.accountNumber.length >= 9 &&
        formData.accountNumber.length <= 18
      )
    ) {
      errors.accountNumber = "Please enter valid length account number";
    } else if (!/^[0-9]+$/.test(formData.accountNumber)) {
      errors.accountNumber = "Please enter valid Account number";
    }

    if (formData.accountNumber !== formData.confirm_accountNumber) {
      errors.confirm_accountNumber = "Account number do not match";
    }

    // for ifsc number filed

    if (formData.ifsc_code === "") {
      errors.ifsc_code = "IFSC is required";
    } else if (!bankIfscRegX.test(formData.ifsc_code)) {
      errors.ifsc_code = "Please enter valid ifsc code";
    }
    return errors;
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center scroll  ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div
        className="absolute w-full h-full bg-gray-800 opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white w-[80%] min-[540px]:w-[60%] md:w-[40%] h-[74%]  overflow-auto p-4 min-[549px]:p-8 rounded-lg shadow-lg z-10">
        <p className="flex justify-end">
          <button type="button" className="flex justify-end" onClick={onClose}>
            <img
              src={CrossBox}
              alt=""
              className="w-[60%] min-[540px]:w-full"
              onClick={onClose}
            />
          </button>
        </p>
        <h1 className="text-[20px] min-[375px]:text-[28px] text-[#45464E] my-2 min-[540px]:my-4">
          Beneficiary Details
        </h1>
        <form>
          {/* Your form fields go here */}
          <label htmlFor="fullname" className="text-sm text-[#5E6366] ">
            Full Name
          </label>
          <div className="mt-1 mb-2">
            <input
              id="fullname"
              name="fullname"
              value={formData.fullName}
              type="text"
              className="w-full bg-[#EFF1F9] border-none rounded-lg"
              onChange={handleChang}
            />
            {formErrors.fullName && (
              <div className="text-red-700 text-xs">{formErrors.fullName}</div>
            )}
          </div>

          <label htmlFor="email" className="text-sm text-[#5E6366] ">
            Beneficiary Email{" "}
          </label>
          <div className="mt-1  mb-2">
            <input
              id="email"
              name="email"
              value={formData.email}
              type="text"
              className="w-full bg-[#EFF1F9] border-none rounded-lg"
              onChange={handleChang}
            />
            {formErrors.email && (
              <div className="text-red-700 text-xs">{formErrors.email}</div>
            )}
          </div>
          <label htmlFor="phoneNumber" className="text-sm text-[#5E6366] ">
            Phone Number
          </label>
          <div className="mt-1  mb-2">
            {/* <input
              id="phoneNumber"
              name="ben_mobile"
              value={formData.ben_mobile}
              type="text"
              className="w-full bg-[#EFF1F9] border-none rounded-lg"
              onChange={handleChang}
            /> */}
            <MobileInput formData={formData} setFormData={setFormData} />
            {formErrors.ben_mobile && (
              <div className="text-red-700 text-xs">
                {formErrors.ben_mobile}
              </div>
            )}
          </div>
          <label htmlFor="ben_address" className="text-sm text-[#5E6366] ">
            Address{" "}
          </label>
          <div className="mt-1  mb-2">
            <textarea
              id="ben_address"
              name="ben_address"
              value={formData.ben_address}
              className="w-full bg-[#EFF1F9] border-none rounded-lg resize-none	"
              onChange={handleChang}
            />
            {formErrors.ben_address && (
              <div className="text-red-700 text-xs">
                {formErrors.ben_address}
              </div>
            )}
          </div>
          <label htmlFor="accountNumber" className="text-sm text-[#5E6366] ">
            Beneficiary’s account number
          </label>
          <div className="mt-1  mb-2">
            <input
              id="accountNumber"
              name="accountNumber"
              value={formData.accountNumber}
              autoComplete="accountNumber--1"
              type="text"
              className="w-full bg-[#EFF1F9] border-none rounded-lg"
              onChange={handleChang}
            />
            {formErrors.accountNumber && (
              <div className="text-red-700 text-xs">
                {formErrors.accountNumber}
              </div>
            )}
          </div>

          <label
            htmlFor="confirm_accountNumber"
            className="text-sm text-[#5E6366] "
          >
            Re-Enter Beneficiary’s account number
          </label>
          <div className="mt-1  mb-2 ">
            <div className="relative">
              <input
                id="confirm_accountNumber"
                name="confirm_accountNumber"
                value={formData.confirm_accountNumber}
                type={showPassword ? "text" : "password"}
                className="w-full bg-[#EFF1F9] border-none rounded-lg "
                autoComplete="new-password"
                onChange={handleChang}
              />
              <div
                className="absolute right-[30px] top-1/3 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <BsEye /> : <BsEyeSlash />}
              </div>
            </div>
            {formErrors.confirm_accountNumber && (
              <span className="text-red-700 text-xs">
                {formErrors.confirm_accountNumber}
              </span>
            )}
          </div>

          <label htmlFor="ifsc_code" className="text-sm text-[#5E6366] ">
            IFSC code
          </label>
          <div className="mt-1  mb-2">
            <input
              id="ifsc_code"
              name="ifsc_code"
              value={formData.ifsc_code}
              type="text"
              className="w-full bg-[#EFF1F9] border-none rounded-lg"
              onChange={handleChang}
            />
            {formErrors.ifsc_code && (
              <div className="text-red-700 text-xs">{formErrors.ifsc_code}</div>
            )}
          </div>
          <div className="flex justify-center mt-5">
            <button
              className="px-20 py-2 bg-[#00006B] text-white rounded-lg"
              onClick={verifyForm}
              type="button"
            >
              save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BeneficiaryDetailsModel;
