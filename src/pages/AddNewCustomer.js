import React, { useEffect, useState } from "react";
import validate from "../schemas/CustomerValidation";
import { Link, useNavigate, useParams } from "react-router-dom";
import apiClient from "../services/apiClient";
import { ADD_CUSTOMER, FETCH_CUSTOMER } from "../services/apiConstant";
import _ from "lodash";
import { RESEND_OTP, SEND_OTP, VERIFY_OTP } from "../services/apiConstant";
import { toast } from "react-toastify";
import MobileField from "../components/forms/MobileField";
import Loader from "../components/Loader/Loader";
import GreenCheck from "../assets/svg/GREENcheckbox.svg";
import { HiOutlineDotsVertical } from "react-icons/hi";

const initialErrors = {
  firstName: "",
  lastName: "",
  mobileNo: "",
  address: "",
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
  address: "",
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
  const [pincodeError, setPincodeError] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();

  const id = params.id;

  const fetchCusomerByID = async (customer_id) => {
    await apiClient
      .get(FETCH_CUSTOMER + "?id=" + customer_id)
      .then((response) => {
        const mydata = response?.data?.response;
        console.log(response);
        setData({
          firstName: mydata?.Customer_data?.FirstName,
          lastName: mydata?.Customer_data?.LastName,
          mobileNo: mydata?.mobile,
          // mobileVerified: mydata?.verified,
          mobileVerified: !_.isEmpty(mydata?.mobile),
          email: mydata?.Email,
          address: mydata?.Customer_data?.Address,
          city: mydata?.Customer_data?.City,
          state: mydata?.Customer_data?.State,
          pincode: mydata?.Customer_data?.Pincode,
        });
        setVerify(true);
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  useEffect(() => {
    if (!_.isEmpty(id)) {
      fetchCusomerByID(id);
    }
  }, [id]);

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
      try {
        console.log("api call");
        await apiClient
          .post(SEND_OTP, {
            phone: data.mobileNo,
          })
          .then((response) => {
            setVerify(true);
            setIsEdit(true);
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
      try {
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
            setIsEdit(false);
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
        Address: data.address,
        Pincode: data.pincode,
        State: data.state,
        City: data.city,
        mobile: data.mobileNo,
        email: data.email,
        verified: data.mobileVerified,
      };
      const endPoint = id ? `${ADD_CUSTOMER}?customerId=${id}` : ADD_CUSTOMER;
      setLoad(true);
      await apiClient
        .post(endPoint, customerData)
        .then((response) => {
          setData(initialCustomerData);
          if (
            String(response?.data?.code) === "201" &&
            response.data.status === true
          ) {
            toast(
              response?.data?.message
                ? response?.data?.message
                : "Customer Saved Successfully",
              {
                theme: "dark",
                hideProgressBar: true,
                type: "success",
              }
            );
            navigate("/dashboard/customers");
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
    }
  };

  return (
    <div className="m-2">
      {load && <Loader />}
      <div className="flex flex-row justify-between md:justify-normal	items-center mt-4 md:mt-0 ">
        <div>
          <Link
            to={"/dashboard/customers"}
            className="border border-primary hover:bg-primary hover:text-[#FFFFFF] font-medium rounded-md px-4 md:px-8 py-[2px] md:py-1 mr-4 min-[1000px]:mr-5"
          >
            <span className="mr-2">&#8592;</span> Back
          </Link>
        </div>
        <h2 className="text-xl font-semibold ">
          {!_.isEmpty(id) ? "Edit" : "Add"} Customer
        </h2>
      </div>
      <div className=" bg-white rounded-md h-full flex-1 px-0 min-[390px]:px-5 md:px-10 py-5 md:py-10 pt-7 md:pt-14 mt-4 md:mt-8">
        <h2 className="text-lg text-[#45464E] font-medium">
          {!_.isEmpty(id) ? "Edit" : "Add"} Personal Information
        </h2>
        <div className="text-sm mt-5 md:mt-10 grid grid-cols-1 min-[1000px]:grid-cols-2 gap-y-4 gap-x-16 mx-2 min-[390px]:mx-7 min-[1230px]:mx-28">
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
                disabled={data?.mobileVerified}
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
                id && (
                  <>
                    {isEdit ? (
                      <>
                        <button
                          onClick={() => {
                            validateMobile();
                          }}
                        >
                          Verify
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setIsEdit(true);
                            setVerify(false);
                            setData({ ...data, mobileVerified: false });
                          }}
                          disabled={verify}
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </>
                )
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
                        Verify
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
        <div className="mt-7 flex justify-center md:justify-end">
          <Link
            className="border border-primary hover:bg-primary hover:text-[#FFFFFF] font-medium rounded-md px-8 py-1"
            onClick={addCustomer}
          >
            Submit <span className="ml-2">&#8594;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AddNewCustomer;
