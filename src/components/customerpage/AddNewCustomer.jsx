import React, { useEffect, useState } from "react";
import validate from "../../schemas/CustomerValidation";
import { Link, useNavigate, useParams } from "react-router-dom";
import apiClient from "../../services/apiClient";
import { ADD_CUSTOMER, FETCH_CUSTOMER } from "../../services/apiConstant";
import _ from "lodash";
import { RESEND_OTP, SEND_OTP, VERIFY_OTP } from "../../services/apiConstant";
import { toast } from "react-toastify";
import MobileField from "../common/forms/MobileField";
import Loader from "../common/Loader/Loader";
import GreenCheck from "../../assets/svg/GREENcheckbox.svg";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { setCustomersLoading } from "../../stores/CustomerRedux";

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
  // const [load, setLoad] = useState(false);
  const loading = useSelector(
    (state) => state?.customersData?.customersLoading
  );
  const [otp, setOtp] = useState("");
  const params = useParams();
  const [pincodeError, setPincodeError] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  // useEffect(() => {
  //   if (!_.isEmpty(id)) {
  //     fetchCusomerByID(id);
  //   }
  // }, [id]);

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

  const validateProperty = ({ name, value }) => {
    console.log(name, value);
    // for first name
    if (name === "firstName") {
      if (!value && _.isEmpty(value)) {
        return "First name is required";
      } else if (value.length < 3) {
        return "First name should be minimum 3 characters";
      } else if (!/^ *[A-Za-z]+ *$/.test(value)) {
        return "First name should be letters(*Not contain space)";
      }
    }
    // for last name
    if (name === "lastName") {
      if (!value && _.isEmpty(value)) {
        return "Last name is required";
      } else if (value.length < 3) {
        return "Last name should be minimum 3 characters";
      } else if (!/^ *[A-Za-z]+ *$/.test(value)) {
        return "Last name should be letters(*Not contain space)";
      }
    }

    // for mobile

    if (name === "mobileNo") {
      if (!value && _.isEmpty(value)) {
        return "Mobile number is required";
      } else if (!/^(|\+91)?[6789]\d{9}$/.test(value)) {
        return "Invalid mobile number";
      }
    }

    //for email
    if (name === "email") {
      if (!value && _.isEmpty(value)) {
        return "Email is required";
      } else if (!/^ *[\w-\.]+@([\w-]+\.)+[\w-]{2,4} *$/g.test(value)) {
        return "Invalid Email";
      }
    }

    //for pincode

    if (name === "pincode") {
      if (!value && _.isEmpty(value)) {
        return "Pincode is required";
      } else if (value.length !== 6) {
        return "Invalid Pincode";
      } else if (!/^\d*$/.test(value)) {
        return "Pincode should be number";
      }
    }

    //for state

    if (name === "state") {
      if (!value && _.isEmpty(value)) {
        return "State is required";
      } else if (!/^ *[A-Za-z]+ *$/.test(value)) {
        return "State should be letters(*Not contain space)";
      }
    }

    //for city
    if (name === "city") {
      if (!value && _.isEmpty(value)) {
        return "City is required";
      } else if (!/^ *[A-Za-z]+ *$/.test(value)) {
        return "City should be letters(*Not contain space)";
      }
    }
    //
  };

  const handleInputChange = (e) => {
    const errors = { ...validation };
    const errorMessage = validateProperty(e.target);
    if (errorMessage) errors[e.target.name] = errorMessage;
    else errors[e.target.name] = "";

    setData({ ...data, [e.target.name]: e.target.value });
    console.log("error", errors);
    setValidation(errors);
  };
  const mobileRegex = /^(|\+91)?[6789]\d{9}$/;

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

      // setLoad(true);
      dispatch(setCustomersLoading(true));

      // try {
      //   console.log("api call");
      //   await apiClient
      //     .post(SEND_OTP, {
      //       phone: data.mobileNo,
      //     })
      //     .then((response) => {
      //       setVerify(true);
      //       setIsEdit(true);
      //       setIsTimerActive(true);
      //       setTimer(30);
      //       console.log(response);
      //       let message = response.data.message;
      //       const type = response.data.response.type;

      //       if (type === "success") {
      //         const message =
      //           response?.data?.response?.message || response?.data?.message;
      //         toast(message, {
      //           theme: "dark",
      //           hideProgressBar: true,
      //           type: "success",
      //         });
      //       } else {
      //         console.log(message);
      //         setVerify(false);
      //         setIsTimerActive(false);

      //         toast(message, {
      //           theme: "dark",
      //           hideProgressBar: true,
      //           type: "warning",
      //         });
      //       }
      //       // setLoad(false);
      //       dispatch(setCustomersLoading(false));
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //       let message =
      //         error?.response?.data?.message ||
      //         error?.data?.response?.data?.message;
      //       setVerify(false);
      //       setIsTimerActive(false);
      //       toast(message, {
      //         theme: "dark",
      //         hideProgressBar: true,
      //         type: "error",
      //       });
      //       // setLoad(false);
      //       dispatch(setCustomersLoading(false));
      //     });
      // } catch (error) {
      //   console.log(error);
      //   toast(error?.message ?? "Something wrong", {
      //     theme: "dark",
      //     hideProgressBar: true,
      //     type: "error",
      //   });
      // }

      try {
        console.log("api call");
        const response = await apiClient.post(SEND_OTP, {
          phone: data.mobileNo,
        });

        console.log(response);

        const message = response?.data?.message;
        const type = response?.data?.response?.type;
        const code = response?.data?.code;

        if (code === 200 && type === "success") {
          setVerify(true);
          setIsEdit(true);
          setIsTimerActive(true);
          setValidation({ ...validation, mobileVerified: "" });
          setTimer(30);
          toast("OTP has been sent successfully.", {
            theme: "dark",
            hideProgressBar: true,
            type: "success",
          });
        } else {
          console.log(message);
          setVerify(false);
          setIsTimerActive(false);

          toast("Failed to send OTP. Please try again later.", {
            theme: "dark",
            hideProgressBar: true,
            type: "warning",
          });
        }

        dispatch(setCustomersLoading(false));
      } catch (error) {
        console.log(error);
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong. Please try again later.";
        setVerify(false);
        setIsTimerActive(false);
        toast("Something went wrong. Please try again later.", {
          theme: "dark",
          hideProgressBar: true,
          type: "error",
        });

        dispatch(setCustomersLoading(false));
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
      dispatch(setCustomersLoading(true));

      // setLoad(true);
      // try {
      //   await apiClient
      //     .post(RESEND_OTP, {
      //       phone: data.mobileNo,
      //     })
      //     .then((response) => {
      //       setVerify(true);
      //       setIsTimerActive(true);
      //       setTimer(30);
      //       console.log(response);
      //       setValidation({
      //         ...validation,
      //         otp: "",
      //       });
      //       setOtp("");
      //       const type = response.data.response.type;

      //       if (type === "success") {
      //         const message =
      //           response?.data?.response?.message || response?.data?.message;
      //         toast(message, {
      //           theme: "dark",
      //           hideProgressBar: true,
      //           type: "success",
      //         });
      //       } else {
      //         const message = "Please try again";

      //         setIsEdit(false);
      //         setVerify(false);
      //         setIsTimerActive(false);

      //         toast(message, {
      //           theme: "dark",
      //           hideProgressBar: true,
      //           type: "warning",
      //         });
      //       }
      //       // if (response.data.status) {
      //       //   console.log(message);
      //       //   toast(message, {
      //       //     theme: "dark",
      //       //     hideProgressBar: true,
      //       //     type: "success",
      //       //   });
      //       // } else {
      //       //   console.log(message);
      //       //   setVerify(false);
      //       //   setIsTimerActive(false);

      //       //   toast(message, {
      //       //     theme: "dark",
      //       //     hideProgressBar: true,
      //       //     type: "warning",
      //       //   });
      //       // }

      //       // setLoad(false);
      //       dispatch(setCustomersLoading(false));
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //       let message =
      //         error?.response?.data?.message ||
      //         error?.data?.response?.data?.message;
      //       setVerify(false);
      //       setIsTimerActive(false);
      //       toast(message, {
      //         theme: "dark",
      //         hideProgressBar: true,
      //         type: "error",
      //       });
      //       dispatch(setCustomersLoading(false));
      //       // setLoad(false);
      //     });
      // } catch (error) {
      //   console.log(error);
      //   toast(error?.message ?? "Something wrong", {
      //     theme: "dark",
      //     hideProgressBar: true,
      //     type: "error",
      //   });
      // }

      try {
        const response = await apiClient.post(RESEND_OTP, {
          phone: data.mobileNo,
        });

        const type = response.data.response.type;
        const code = response?.data?.code;

        if (code === 200 && type === "success") {
          setVerify(true);
          setIsTimerActive(true);
          setTimer(30);
          console.log(response);
          setValidation({
            ...validation,
            otp: "",
          });
          setOtp("");
          const message =
            response?.data?.response?.message || response?.data?.message;
          toast("OTP resent successfully.", {
            theme: "dark",
            hideProgressBar: true,
            type: "success",
          });
        } else {
          const message =
            response?.data?.response?.message || "Please try again";

          setIsEdit(false);
          setVerify(false);
          setIsTimerActive(false);

          toast("Failed to resend OTP. Please try again later.", {
            theme: "dark",
            hideProgressBar: true,
            type: "warning",
          });
        }

        dispatch(setCustomersLoading(false));
      } catch (error) {
        console.log(error);
        const message =
          error?.response?.data?.message ||
          error?.data?.response?.data?.message ||
          "Something went wrong. Please try again later.";
        setVerify(false);
        setIsTimerActive(false);
        toast("Something went wrong. Please try again later.", {
          theme: "dark",
          hideProgressBar: true,
          type: "error",
        });
        dispatch(setCustomersLoading(false));
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
      // setLoad(true);
      dispatch(setCustomersLoading(true));
      // try {
      //   await apiClient
      //     .post(VERIFY_OTP, {
      //       phone: data?.mobileNo,
      //       otp: otp,
      //     })
      //     .then((response) => {
      //       // setLoad(false);
      //       dispatch(setCustomersLoading(false));
      //       console.log(response);
      //       setData({
      //         ...data,
      //         mobileVerified: true,
      //       });
      //       setValidation({ ...validation, otp: "" });
      //       setIsEdit(false);

      //       const type = response.data.response.type;
      //       const message =
      //         response?.data?.response?.message || response?.data?.message;

      //       if (type === "success") {
      //         toast(message, {
      //           theme: "dark",
      //           hideProgressBar: true,
      //           type: "success",
      //         });
      //       } else {
      //         toast(message, {
      //           theme: "dark",
      //           hideProgressBar: true,
      //           type: "warning",
      //         });
      //       }

      //       // toast(message, {
      //       //   theme: "dark",
      //       //   hideProgressBar: true,
      //       //   type: "success",
      //       // });
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //       let message =
      //         error?.response?.data?.message ||
      //         error?.data?.response?.data?.message;
      //       setValidation({ ...validation, otp: message });
      //       toast(message, {
      //         theme: "dark",
      //         hideProgressBar: true,
      //         type: "error",
      //       });
      //       // setLoad(false);
      //       dispatch(setCustomersLoading(false));
      //     });
      // } catch (error) {
      //   console.log(error);
      // }

      try {
        const response = await apiClient.post(VERIFY_OTP, {
          phone: data?.mobileNo,
          otp: otp,
        });

        dispatch(setCustomersLoading(false));
        console.log(response);

        const type = response.data.response.type;
        const message =
          response?.data?.response?.message || response?.data?.message;
        const code = response?.data?.code;

        const toastOptions = {
          theme: "dark",
          hideProgressBar: true,
        };

        if (code === 200 && type === "success") {
          setData((prevData) => ({
            ...prevData,
            mobileVerified: response.data.response.type === "success",
          }));

          setValidation({ ...validation, otp: "", mobileVerified: "" });
          setIsEdit(false);
          toast("OTP successfully verified.", {
            ...toastOptions,
            type: "success",
          });
        } else {
          setOtp("");
          toast("OTP verification failed. Please try again.", {
            ...toastOptions,
            type: "warning",
          });
        }
      } catch (error) {
        console.log(error);
        setOtp("");

        let message =
          error?.response?.data?.message ||
          error?.data?.response?.data?.message ||
          "Something went wrong. Please try again later.";

        // setValidation({ ...validation, otp: message });

        toast("Something went wrong. Please try again later.", {
          theme: "dark",
          hideProgressBar: true,
          type: "error",
        });

        dispatch(setCustomersLoading(false));
      }
    }
  };
  const submitPincode = async () => {
    // setLoad(true);
    dispatch(setCustomersLoading(true));
    await fetch(`https://api.postalpincode.in/pincode/${data?.pincode}`)
      .then((response) => response.json())
      .then((response) => {
        console.log("data", response);
        // setLoad(false);
        dispatch(setCustomersLoading(false));
        setData({
          ...data,
          state: response[0]?.PostOffice[0]?.State,
          city: response[0]?.PostOffice[0]?.District,
          address: response[0]?.PostOffice[0]?.Name,
        });
        // setPincodeError("");
        setValidation({ ...validation, pincode: "", city: "", state: "" });
      })
      .catch((error) => {
        // setPincodeError("Invalid Pincode");
        setValidation({ ...validation, pincode: "Invalid Pincode" });

        // setLoad(false);
        dispatch(setCustomersLoading(false));
        console.error("Error:", error);
        // Handle errors here
      });
  };

  // else setPincodeError("Pincode should be of 6 Numbers only.");
  const addCustomer = async (e) => {
    console.log(data);
    let validationErrors = validate(data);
    console.log(validationErrors);
    setValidation(validationErrors);
    const isValid = Object.keys(validationErrors).length === 0;
    console.log("valid", isValid);
    if (isValid) {
      const customerData = {
        FirstName: data.firstName.trim(),
        LastName: data.lastName.trim(),
        Address: data.address,
        Pincode: data.pincode,
        State: data.state.trim(),
        City: data.city.trim(),
        mobile: data.mobileNo,
        email: data.email.trim(),
        verified: data.mobileVerified,
      };

      console.log(customerData);
      const endPoint = id ? `${ADD_CUSTOMER}?customerId=${id}` : ADD_CUSTOMER;

      // setLoad(true);

      dispatch(setCustomersLoading(true));
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
          // setLoad(false);
          dispatch(setCustomersLoading(false));
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
          // setLoad(false);
          dispatch(setCustomersLoading(false));
        });
    }
  };

  return (
    <div className="m-2">
      {loading && <Loader />}
      <div className="flex flex-row justify-between md:justify-normal	items-center mt-4 md:mt-0 ">
        <div>
          <Link
            to={"/dashboard/customers"}
            className="border border-primary hover:bg-primary hover:text-[#FFFFFF] font-medium rounded-md px-8 py-1.5 mr-4 min-[1000px]:mr-5"
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
            <label className="block mb-2">
              First Name <span className="text-red-500 ">*</span>
            </label>
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
            <label className="block mb-2">
              Last Name <span className="text-red-500 ">*</span>
            </label>
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
            <label className="block mb-2">
              Mobile Number <span className="text-red-500 ">*</span>
            </label>
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
                    value={otp}
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
            <label className="block mb-2">
              Email <span className="text-red-500 ">*</span>
            </label>
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
            <label className="block mb-2">
              Pincode <span className="text-red-500 ">*</span>
            </label>
            <input
              type="text"
              name="pincode"
              maxLength={6}
              placeholder="Pincode"
              value={data?.pincode || ""}
              onChange={(e) => handleInputChange(e)}
              onBlur={(e) => submitPincode(e)}
              className="text-base block border-0 bg-[#EFF1F999] w-full rounded-lg"
            />
            {validation?.pincode && (
              <p className="text-red-800">{validation.pincode}</p>
            )}
            {/* {pincodeError !== "" && (
              <span className="text-red-700">{pincodeError}</span>
            )} */}
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
