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
import {
  fetchSingleCustomer,
  setCustomersLoading,
} from "../../stores/CustomerRedux";
import _ from "lodash";

import { useEffect } from "react";
import Loader from "../common/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import MobileField from "../common/forms/MobileField";

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
  const dispatch = useDispatch();
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
  const loading = useSelector(
    (state) => state?.customersData?.customersLoading
  );
  const [load, setLoad] = useState(false);

  // const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const id = params?.id;
  const emailRegX = /^ *[\w-\.]+@([\w-]+\.)+[\w-]{2,4} *$/;
  const bankIfscRegX = /^ *[A-Z]{4}0[A-Z0-9]{6} *$/;

  const validateProperty = ({ name, value }) => {
    console.log(name, value);
    // for first name
    if (name === "fullName") {
      if (!value && _.isEmpty(value)) {
        return "Full name is required";
      }
    }
    // for last email

    if (name === "email") {
      if (!value && _.isEmpty(value)) {
        return "Email is required";
      } else if (!/^ *[\w-\.]+@([\w-]+\.)+[\w-]{2,4} *$/g.test(value)) {
        return "Invalid Email";
      }
    }

    // for mobile

    if (name === "ben_mobile") {
      if (!value && _.isEmpty(value)) {
        return "Mobile number is required";
      } else if (!/^(|\+91)?[6789]\d{9}$/.test(value)) {
        return "Invalid mobile number";
      }
    }

    //for address
    if (name === "ben_address") {
      if (!value && _.isEmpty(value)) {
        return "Address is required";
      }
    }

    //for pincode

    if (name === "accountNumber") {
      if (!value && _.isEmpty(value)) {
        return "Account is required";
      } else if (!(value.length >= 9 && value.length <= 18)) {
        return "Please enter valid length account number";
      } else if (!/^ *[0-9]+ *$/.test(value)) {
        return "Please enter valid length account number";
      }
    }

    //for confirm_accountNumber

    if (name === "confirm_accountNumber") {
      if (!value && _.isEmpty(value)) {
        return "Confirm AccountNumber is required";
      } else if (formData.accountNumber.trim() !== value.trim()) {
        return "Account number do not match";
      }
    }

    //for ifsc
    if (name === "ifsc_code") {
      if (!value && _.isEmpty(value)) {
        return "IFSC is required";
      } else if (!bankIfscRegX.test(value)) {
        return "Please enter valid ifsc code";
      }
    }
    //
  };
  const handleChang = (e) => {
    const errors = { ...formErrors };
    const errorMessage = validateProperty(e.target);
    if (errorMessage) errors[e.target.name] = errorMessage;
    else errors[e.target.name] = "";

    const { name, value } = e.target;
    const updatedValue = name === "ifsc_code" ? value.toUpperCase() : value;
    setFormData({ ...formData, [name]: updatedValue });
    setFormErrors(errors);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const bankIfscRegX = /^ *[A-Z]{4}0[A-Z0-9]{6} *$/;
    // const mobileRegX = /^[6789]\d{9}$/;

    const errors = {};
    setFormErrors(errors);

    //for name
    if (formData.fullName.trim() === "") {
      errors.fullName = "Name is required";
    }

    //for email
    if (formData.email === "") {
      errors.email = "Email is required";
    } else if (!emailRegX.test(formData.email)) {
      errors.email = "Please enter valid email";
    }

    // for mobile filed

    if (!formData.ben_mobile && _.isEmpty(formData.ben_mobile)) {
      errors.ben_mobile = "Mobile number is required";
    } else if (!/^(|\+91)?[6789]\d{9}$/.test(formData.ben_mobile)) {
      errors.ben_mobile = "Invalid mobile number";
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
    } else if (!/^ *[0-9]+ *$/.test(formData.accountNumber)) {
      errors.accountNumber = "Please enter valid Account number";
    }

    if (
      formData.accountNumber.trim() !== formData.confirm_accountNumber.trim()
    ) {
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
    const bankIfscRegX = /^ *[A-Z]{4}0[A-Z0-9]{6} *$/;
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
    dispatch(setCustomersLoading(true));
    setLoad(true);
    await apiClient
      .post(ADD_BENEFICIARY, data)
      .then((response) => {
        setFormData(initialBeneficiaryData);
        if (
          String(response?.data?.code) === "201" &&
          response.data.status === true
        ) {
          dispatch(setCustomersLoading(false));
          dispatch(fetchSingleCustomer(id));
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

          onClose();
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
        setLoad(false);
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
    console.log(formData);
    const errors = validateForm();
    console.log(formErrors);
    console.log(Object.keys(errors).length === 0);
    if (Object.keys(errors).length === 0) {
      if (validateBankDetails()) {
        console.log("yyesadfa");
        try {
          const beneficiaryData = {
            custom_id: id,
            FirstName: formData.fullName.trim(),
            beneficiary_email: formData.email.trim(),
            beneficiary_address: formData.ben_address.trim(),
            beneficiary_phone: formData?.ben_mobile,
            payment_info: {
              type: "BANK",
              bankAccount: formData?.accountNumber.trim(),
              ifsc_code: formData?.ifsc_code.trim(),
              upi_code: "",
            },
          };
          console.log("benData==>", beneficiaryData);
          add_beneficiary_api(beneficiaryData);
        } catch (error) {
          // setLoad(false);
          dispatch(setCustomersLoading(false));
          console.log(error);
        }
      }
      dispatch(setCustomersLoading(false));
      // setLoad(true);
    }
  };

  return (
    <>
      {loading || (load && <Loader />)}
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
            <button
              type="button"
              className="flex justify-end"
              onClick={onClose}
            >
              <img
                src={CrossBox}
                alt=""
                className="w-[60%] min-[540px]:w-full"
              />
            </button>
          </p>
          <h1 className="text-[20px] min-[375px]:text-[28px] text-[#45464E] my-2 min-[540px]:my-4">
            Beneficiary Details
          </h1>
          <form>
            {/* Your form fields go here */}
            <label htmlFor="fullname" className="text-sm text-[#5E6366] ">
              Full Name <span className="text-red-500 ">*</span>
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
                <div className="text-red-700 text-xs">
                  {formErrors.fullName}
                </div>
              )}
            </div>

            <label htmlFor="email" className="text-sm text-[#5E6366] ">
              Beneficiary Email <span className="text-red-500 ">*</span>
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
              Phone Number <span className="text-red-500 ">*</span>
            </label>
            <div className="mt-1  mb-2 ">
              {/* <MobileInput
                formData={formData}
                setFormData={setFormData}
                formError={formErrors}
                setFormError={setFormErrors}
                setValidateProperty={validateProperty}
              /> */}
              <MobileField
                name="ben_mobile"
                placeholder="Mobile Number"
                value={formData.ben_mobile || ""}
                onChange={(e) => handleChang(e)}
              />

              {formErrors.ben_mobile && (
                <div className="text-red-700 text-xs">
                  {formErrors.ben_mobile}
                </div>
              )}
            </div>
            <label htmlFor="ben_address" className="text-sm text-[#5E6366] ">
              Address <span className="text-red-500 ">*</span>
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
              Beneficiary’s account number{" "}
              <span className="text-red-500 ">*</span>
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
              IFSC code <span className="text-red-500 ">*</span>
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
                <div className="text-red-700 text-xs">
                  {formErrors.ifsc_code}
                </div>
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
    </>
  );
};

export default BeneficiaryDetailsModel;
