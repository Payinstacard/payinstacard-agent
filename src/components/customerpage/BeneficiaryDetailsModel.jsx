import React, { useState } from "react";
import CrossBox from "../../assets/svg/crossbox.svg";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import "./BeneficiaryDetailsModel.css";
import MobileInput from "../common/forms/MobileInput";
import apiClient from "../../services/apiClient";
import { ADD_BENEFICIARY, BANK_VERIFICATION } from "../../services/apiConstant";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const initialBeneficiaryData = {
  fullName: "",
  email: "",
  ben_mobile: "",
  ben_address: "",
  accountNumber: "",
  confirm_accountNumber: "",
  ifsc_code: "",
  benificiaryVerified: "",
  payment_info: "",
};

const BeneficiaryDetailsModel = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState(initialBeneficiaryData);
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
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const id = params?.id;

  const handleChang = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //form validation

  // const verifyForm = () => {
  //   const errors = validateForm();
  //   if (Object.keys(errors).length === 0) {
  //     console.log("susceesfully verify form");
  //   } else {
  //     setFormErrors(errors);
  //   }
  // };

  const validateForm = () => {
    const bankIfscRegX = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    const emailRegX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    // const mobileRegX = /^[6789]\d{9}$/;

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

  const validateBankDetails = async () => {
    const bankIfscRegX = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    let formError = {};
    let isValid = true;
    if (formData?.accountNumber?.length === 0) {
      formError = {
        ...formError,
        accountNumber: "Please enter Account Number",
      };
      isValid = false;
    } else if (
      !(
        formData?.accountNumber?.length >= 9 &&
        formData?.accountNumber?.length <= 18
      )
    ) {
      formError = {
        ...formError,
        accountNumber: "please enter valid length account number",
      };
      isValid = false;
    } else {
      formError = {
        ...formError,
        accountNumber: "",
      };
    }

    if (formData?.ifsc_code?.length === 0) {
      formError = {
        ...formError,
        ifsc_code: "Please enter IFSC code",
      };
      isValid = false;
    } else if (formData?.ifsc_code?.length < 11) {
      formError = {
        ...formError,
        ifsc_code: "IFSC code should be of 11 Alphanumeric only",
      };
      isValid = false;
    } else {
      formError = {
        ...formError,
        ifsc_code: "",
      };
    }

    if (bankIfscRegX.test(formData?.ifsc_code)) {
      formError = {
        ...formError,
        ifsc_code: "",
      };
    } else {
      isValid = false;
      formError = {
        ...formError,
        ifsc_code: "Enter valid IFSC",
      };
    }
    setFormErrors(formError);
    return isValid;
  };

  const add_beneficiary_api = async (data, success_cb, error_cb) => {
    await apiClient
      .post(ADD_BENEFICIARY, data)
      .then((response) => {
        setFormData(initialBeneficiaryData);
        if (
          String(response?.data?.code) === "201" &&
          response.data.status === true
        ) {
          toast(
            response?.data?.message
              ? response?.data?.message
              : "Customer Beneficiary Saved Successfully",
            {
              theme: "dark",
              hideProgressBar: true,
              type: "success",
            }
          );
          onclose();
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
        setLoad(false);
      })
      .catch((error) => {
        console.log("error");
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
        setLoad(false);
      });
  };
  const checkBank_varification_api = async (success_cb, error_cb) => {
    await apiClient
      .post(BANK_VERIFICATION, {
        bankAccount: formData?.accountNumber,
        ifsc: formData?.ifsc_code,
      })
      .then((response) => {
        let status = response.data.response.status;
        let message = response.data.response.message;

        if (status === "SUCCESS") {
          success_cb(response.data.response);
        } else {
          error_cb(response.data.response);
        }
      })
      .catch((error) => {
        error_cb(error);
      });
  };

  const addBeneficiary = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      if (validateBankDetails()) {
        try {
          setLoad(true);
          checkBank_varification_api(
            (res) => {
              const beneficiaryData = {
                custom_id: id,
                FirstName: formData.fullName,
                beneficiary_email: formData.email,
                beneficiary_address: formData.ben_address,
                beneficiary_phone: formData?.ben_mobile,
                payment_info: res,
              };
              add_beneficiary_api(beneficiaryData);
              setLoad(false);
            },
            (error) => {
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
              setLoad(false);
            }
          );
        } catch (error) {
          setLoad(false);
          console.log(error);
        }
      }

      setLoad(true);
    }
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
              name="fullName"
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
              onClick={addBeneficiary}
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
