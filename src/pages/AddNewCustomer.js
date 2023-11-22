import React, { useEffect, useState } from "react";
import validate from "../schemas/CustomerValidation";
import { Link, useParams } from "react-router-dom";
import apiClient from "../services/apiClient";
import { ADD_CUSTOMER } from "../services/apiConstant";
import _ from "lodash";
import { RESEND_OTP, SEND_OTP, VERIFY_OTP } from "../services/apiConstant";
import { toast } from "react-toastify";
import MobileField from "../components/forms/MobileField";
import Loader from "../components/Loader/Loader";
import GreenCheck from "../assets/svg/GREENcheckbox.svg";

const initialErrors = {
  firstName: "",
  lastName: "",
  mobileNo: "",
  mobileVerified: false,
  email: "",
  city: "",
  state: "",
  pincode: "",
};

const initialCustomerData = {
  firstName: "",
  lastName: "",
  mobileNo: "",
  mobileVerified: false,
  email: "",
  city: "",
  state: "",
  pincode: "",
};

function AddNewCustomer() {
  const [data, setData] = useState(initialCustomerData);
  const [validation, setValidation] = useState(initialErrors);
  const [verify, setVerify] = useState(false);
  const [timer, setTimer] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [load, setLoad] = useState(false);
  const [otp, setOtp] = useState("");
  const params = useParams();
  const [otpError, setOtpError] = useState("");
  const [pincodeError, setPincodeError] = useState("");

  const id = params.id;
  const startTimer = () => {
    setIsTimerActive(true);
    setTimer(30);
  };

  useEffect(() => {
    let interval;

    if (isTimerActive) {
      interval = setInterval(() => {
        if (timer > 0) {
          setTimer(timer - 1);
        } else {
          setIsTimerActive(false);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timer, isTimerActive]);

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const mobileRegex = /^(|\+91)?[789]\d{9}$/;
  const validateMobile = async () => {
    if (data.mobileNo.length === 0) {
      setValidation({ ...validation, mobileNo: "Please Enter Mobile Number" });
    } else if (data.mobileNo.length !== 10 && data.mobileNo.length !== 13) {
      setValidation({
        ...validation,
        mobileNo: "Mobile number should be of 10 digits",
      });
    } else if (mobileRegex.test(data.mobileNo)) {
      setValidation({ ...validation, mobileNo: "" });

      setLoad(true);
      // setAadharUser({});
      try {
        console.log("api call");
        await apiClient
          .post(SEND_OTP, {
            phone: data.mobileNo,
          })
          .then((response) => {
            setVerify(true);
            setIsTimerActive(true);
            setTimer(30);
            console.log(response);
            let message = response.data.message;

            if (response.data.status) {
              console.log(message);
              toast(message, {
                theme: "dark",
                hideProgressBar: true,
                type: "success",
              });
            } else {
              console.log(message);
              setVerify(false);
              setIsTimerActive(false);

              toast(message, {
                theme: "dark",
                hideProgressBar: true,
                type: "warning",
              });
            }
            setLoad(false);
          })
          .catch((error) => {
            console.log(error);
            let message = error.response.data.message;
            setVerify(false);
            setIsTimerActive(false);
            toast(message, {
              theme: "dark",
              hideProgressBar: true,
              type: "error",
            });
            setLoad(false);
          });
      } catch (error) {
        console.log(error);
        toast(error?.message ?? "Something wrong", {
          theme: "dark",
          hideProgressBar: true,
          type: "error",
        });
      }
    } else {
      setValidation({ ...validation, mobileNo: "Enter valid Mobile" });
      return;
    }
  };
  const resentOTP = async () => {
    if (data.mobileNo.length === 0) {
      setValidation({ ...validation, mobileNo: "Please Enter Mobile Number" });
    } else if (data.mobileNo.length !== 10 && data.mobileNo.length !== 13) {
      setValidation({
        ...validation,
        mobileNo: "Mobile number should be of 10 digits",
      });
    } else if (mobileRegex.test(data.mobileNo)) {
      setValidation({ ...validation, mobileNo: "" });

      setLoad(true);
      // setAadharUser({});
      try {
        console.log("api call");
        await apiClient
          .post(RESEND_OTP, {
            phone: data.mobileNo,
          })
          .then((response) => {
            setVerify(true);
            setIsTimerActive(true);
            setTimer(30);
            console.log(response);
            let message = response.data.message;

            if (response.data.status) {
              console.log(message);
              toast(message, {
                theme: "dark",
                hideProgressBar: true,
                type: "success",
              });
            } else {
              console.log(message);
              setVerify(false);
              setIsTimerActive(false);

              toast(message, {
                theme: "dark",
                hideProgressBar: true,
                type: "warning",
              });
            }
            setLoad(false);
          })
          .catch((error) => {
            console.log(error);
            let message = error.response.data.message;
            setVerify(false);
            setIsTimerActive(false);
            toast(message, {
              theme: "dark",
              hideProgressBar: true,
              type: "error",
            });
            setLoad(false);
          });
      } catch (error) {
        console.log(error);
        toast(error?.message ?? "Something wrong", {
          theme: "dark",
          hideProgressBar: true,
          type: "error",
        });
      }
    } else {
      setValidation({ ...validation, mobileNo: "Enter valid Mobile" });
      return;
    }
  };

  const submitOtp = async () => {
    if (otp == "") {
      setValidation({ ...validation, otp: "Enter OTP" });
    } else {
      setLoad(true);
      try {
        await apiClient
          .post(VERIFY_OTP, {
            phone: data?.mobileNo,
            otp: otp,
          })
          .then((response) => {
            setLoad(false);
            console.log(response);
            let message = response.data.message;
            let responseData = response.data.response;
            setData({
              ...data,
              mobileVerified: true,
            });
            toast(message, {
              theme: "dark",
              hideProgressBar: true,
              type: "success",
            });
          })
          .catch((error) => {
            console.log(error);
            let message = error.response.data.message;
            setValidation({ ...validation, otp: message });
            toast(message, {
              theme: "dark",
              hideProgressBar: true,
              type: "error",
            });
            setLoad(false);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const submitPincode = async () => {
    if (!data.pincode || data.pincode === "") {
      setPincodeError("Pincode is required");
    } else if (data.pincode.length == 6) {
      setLoad(true);
      await fetch(`https://api.postalpincode.in/pincode/${data?.pincode}`)
        .then((response) => response.json())
        .then((response) => {
          console.log("data", response);
          setLoad(false);
          setData({
            ...data,
            state: response[0]?.PostOffice[0]?.State,
            city: response[0]?.PostOffice[0]?.District,
            Address: response[0]?.PostOffice[0]?.Name,
          });
          setPincodeError("");
        })
        .catch((error) => {
          setPincodeError("Invalid Pincode");
          setLoad(false);
          console.error("Error:", error);
          // Handle errors here
        });
    } else setPincodeError("Pincode should be of 6 Numbers only.");
  };

  const addCustomer = async (e) => {
    const validationErrors = validate(data);
    setValidation(validationErrors);
    const isValid = Object.keys(validationErrors).length === 0;
    if (isValid) {
      const customerData = {
        FirstName: data.firstName,
        LastName: data.lastName,
        Address: data.Address,
        Pincode: data.pincode,
        State: data.state,
        City: data.city,
        mobile: data.mobileNo,
        email: data.email,
        verified: data.mobileVerified,
      };

      setLoad(true);
      await apiClient
        .post(ADD_CUSTOMER, customerData)
        .then((response) => {
          setData(initialCustomerData);
          console.log("response", response);
          toast("Customer added", {
            theme: "dark",
            hideProgressBar: true,
            type: "success",
          });
          setLoad(false);
        })
        .catch((error) => {
          console.log("error", error);
          setLoad(false);
        });
    }
  };

  return (
    <div className="m-2">
      {load && <Loader />}
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h2 className="text-xl font-semibold mb-2 sm:mb-0">Add Customer</h2>
        <div>
          {/* <button
            className="border border-primary hover:bg-primary hover:text-[#FFFFFF] font-medium rounded-md px-8 py-1 mr-8"
            onClick={handlePreviousStep}
          >
            <span className="mr-2">&#8592;</span> Back
          </button> */}
          <Link
            to={"/dashboard/customers"}
            className="border border-primary hover:bg-primary hover:text-[#FFFFFF] font-medium rounded-md px-8 py-1 mr-8"
          >
            <span className="mr-2">&#8592;</span> Back
          </Link>
          <button
            className="border border-primary hover:bg-primary hover:text-[#FFFFFF] font-medium rounded-md px-8 py-1"
            onClick={addCustomer}
          >
            Submit <span className="mr-2">&#8594;</span>
          </button>
        </div>
      </div>
      <div className="mt-8 bg-white rounded-md h-full flex-1 px-10 py-10 pt-14">
        <h2 className="text-lg text-[#45464E] font-medium">
          Add Personal Information
        </h2>
        <div className="text-sm mt-10 grid grid-cols-2 gap-y-4 gap-x-16 mx-28">
          <div className="col-span-1">
            <label className="block mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              value={data?.firstName || ""}
              placeholder="First Name"
              onChange={(e) => handleInputChange(e)}
              className="text-base block border-0 bg-[#EFF1F999] w-full rounded-lg"
            />
            {validation?.firstName && (
              <p className="text-red-800">{validation.firstName}</p>
            )}
          </div>
          <div className="col-span-1">
            <label className="block mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={data?.lastName || ""}
              placeholder="Last Name"
              onChange={(e) => handleInputChange(e)}
              className="text-base block border-0 bg-[#EFF1F999] w-full rounded-lg"
            />
            {validation?.lastName && (
              <p className="text-red-800">{validation.lastName}</p>
            )}
          </div>
          <div className="col-span-1 ">
            <label className="block mb-2">Mobile Number</label>
            <div className="inputWithButton">
              <MobileField
                name="mobileNo"
                placeholder="Mobile Number"
                value={data?.mobileNo || ""}
                onChange={(e) => handleInputChange(e)}
              />
              {/* <input
                //   disabled={data?.kyc_details?.mobileVerified}
                type="text"
                name="mobileNo"
                placeholder="Mobile Number"
                onChange={(e) => handleInputChange(e)}
                className="text-base block border-0 bg-[#EFF1F999] w-full rounded-lg"
                value={data?.mobileNo || ""}
              /> */}
              {validation?.mobileNo && (
                <p className="text-red-800">{validation.mobileNo}</p>
              )}
              {validation?.mobileVerified && (
                <p className="text-red-800">{validation.mobileVerified}</p>
              )}
              {data.mobileVerified ? (
                <></>
              ) : (
                <>
                  {verify ? (
                    <></>
                  ) : (
                    <>
                      <button
                        disabled={data?.mobileVerified}
                        onClick={() => {
                          validateMobile();
                        }}
                      >
                        {verify ? "Get Otp" : "Verify"}
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="col-span-1">
            {!data?.kyc_details?.mobileVerified && (
              <>
                <label className="block mb-2">Enter OTP</label>
                <div className="inputWithButton">
                  <input
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    className="text-base block border-0 bg-[#EFF1F999] w-full rounded-lg"
                    onChange={(e) => setOtp(e.target.value)}
                    disabled={data.mobileVerified}
                  />
                  {data.mobileVerified ? (
                    <div className=" flex items-center gap-1 absolute right-3 top-2">
                      <img src={GreenCheck} alt="" />
                      <span className="text-[#24A305]">Suceess</span>
                    </div>
                  ) : (
                    <>
                      {verify && (
                        <button
                          disabled={data?.mobileVerified}
                          onClick={() => submitOtp()}
                        >
                          Submit
                        </button>
                      )}
                    </>
                  )}
                </div>
                {validation?.otp && (
                  <p className="text-red-800">{validation.otp}</p>
                )}

                {data.mobileVerified ? (
                  <></>
                ) : (
                  <>
                    {verify && (
                      <p className="text-right mt-1">
                        <button
                          type="button"
                          className="text-primary font-bold "
                          onClick={resentOTP}
                          disabled={isTimerActive}
                        >
                          Resend OTP{" "}
                        </button>{" "}
                        {verify && isTimerActive ? "in " + timer + " sec" : ""}
                      </p>
                    )}
                  </>
                )}
              </>
            )}
          </div>
          <div className="col-span-1">
            <label className="block mb-2">Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email Address"
              onChange={(e) => handleInputChange(e)}
              value={data?.email || ""}
              className="text-base block border-0 bg-[#EFF1F999] w-full rounded-lg"
            />
            {validation?.email && (
              <p className="text-red-800">{validation.email}</p>
            )}
          </div>
          <div className="col-span-1">
            <label className="block mb-2">Pincode</label>
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={data?.pincode || ""}
              onChange={(e) => handleInputChange(e)}
              onBlur={(e) => submitPincode(e)}
              className="text-base block border-0 bg-[#EFF1F999] w-full rounded-lg"
            />
            {validation?.pincode && (
              <p className="text-red-800">{validation.pincode}</p>
            )}
            {pincodeError !== "" && (
              <span className="text-red-700">{pincodeError}</span>
            )}
          </div>

          <div className="col-span-1">
            <label className="block mb-2">State</label>
            <input
              type="text"
              name="state"
              placeholder="State"
              value={data?.state || ""}
              onChange={(e) => handleInputChange(e)}
              className="text-base block border-0 bg-[#EFF1F999] w-full rounded-lg"
            />
            {validation?.state && (
              <p className="text-red-800">{validation.state}</p>
            )}
          </div>
          <div className="col-span-1">
            <label className="block mb-2">City</label>
            <input
              type="text"
              name="city"
              placeholder="City"
              onChange={(e) => handleInputChange(e)}
              value={data?.city || ""}
              className="text-base block border-0 bg-[#EFF1F999] w-full rounded-lg"
            />
            {validation?.city && (
              <p className="text-red-800">{validation.city}</p>
            )}
          </div>
        </div>

        {/* <input type="text" value={data} onChange={handleInputChange} /> */}
      </div>
    </div>
  );
}

export default AddNewCustomer;
