import React, { useEffect, useState } from "react";
import validate from "../schemas/CustomerValidation";

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

function AddNewCustomer() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    mobileNo: "",
    mobileVerified: false,
    email: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [validation, setValidation] = useState(initialErrors);
  const [verify, setVerify] = useState(false);
  const [seconds, setSeconds] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [load, setLoad] = useState(false);
  const [otp, setOtp] = useState("");

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitOtp = async () => {
    setLoad(true);
    try {
      //   await apiClient
      //     .post(OTP_VERIFICATION, {
      //       aadhaar_number: data?.kyc_details?.Aadhar_Details?.aadhar,
      //       otp: otp,
      //       ref_id: refId,
      //     })
      //     .then((response) => {
      //       setLoad(false);
      //       console.log(response);
      //       let message = response.data.message;
      //       let responseData = response.data.response;
      //       // setAadharUser(responseData);
      //       setData({
      //         ...data,
      //         kyc_details: {
      //           ...data?.kyc_details,
      //           Aadhar_Details: response.data.response,
      //           mobileVerified: true,
      //         },
      //       });
      //       toast(message, {
      //         theme: "dark",
      //         hideProgressBar: true,
      //         type: "success",
      //       });
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //       let message = error.response.data.message;
      //       toast(message, {
      //         theme: "dark",
      //         hideProgressBar: true,
      //         type: "error",
      //       });
      //       setLoad(false);
      //     });
    } catch (error) {
      console.log(error);
    }
  };

  //   useEffect(() => {
  //     async function lastfilled() {
  //       await apiClient
  //         .get(AGENTS)
  //         .then((response) => {
  //           console.log("response", response);
  //           setTempData([
  //             ...tempData,
  //             ...response?.data?.response?.TempData_array,
  //           ]);
  //           // setData(response.data.response.transactions_array);
  //         })
  //         .catch((error) => {
  //           // console.log(error);
  //         });
  //       console.log("tempDAta", tempData);
  //     }
  //     lastfilled();
  //   }, []);

  const addCustomer = () => {
    // const validationErrors = validate(step, formData);
    // setValidation(validationErrors);
    // const isValid = Object.keys(validationErrors).length === 0;
    // if (isValid) {}
    console.log("data=>", data);
  };

  return (
    <div className="m-2">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h2 className="text-xl font-semibold mb-2 sm:mb-0">Add Customer</h2>
        <div>
          <button
            className="border border-primary hover:bg-primary hover:text-[#FFFFFF] font-medium rounded-md px-8 py-1 mr-8"
            // onClick={handlePreviousStep}
          >
            <span className="mr-2">&#8592;</span> Back
          </button>
          <button
            className="border border-primary hover:bg-primary hover:text-[#FFFFFF] font-medium rounded-md px-8 py-1"
            onClick={addCustomer}
          >
            Submit <span className="mr-2">&#8594;</span>
          </button>
        </div>
      </div>
      <div className="mt-8 bg-white">
        <div className="mx-10 py-14">
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
                <input
                  //   disabled={data?.kyc_details?.mobileVerified}
                  type="text"
                  name="mobileNo"
                  placeholder="Mobile Number"
                  onChange={(e) => handleInputChange(e)}
                  className="text-base block border-0 bg-[#EFF1F999] w-full rounded-lg"
                  value={data?.mobileNo || ""}
                />
                {validation?.mobileNo && (
                  <p className="text-red-800">{validation.mobileNo}</p>
                )}
                {validation?.mobileVerified && (
                  <p className="text-red-800">{validation.mobileVerified}</p>
                )}
                <button
                  //   disabled={data?.kyc_details?.mobileVerified}
                  onClick={() => {
                    //   validateAddhar();
                  }}
                >
                  {verify ? "Get Otp" : "Verify"}
                </button>
                {/* {aadharError !== "" && (
                <span className="text-red-700">{aadharError}</span>
              )} */}
              </div>
            </div>
            <div className="col-span-1">
              {/* {!data?.kyc_details?.mobileVerified && (
                <> */}
              <label className="block mb-2">Enter OTP</label>
              <div className="inputWithButton">
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  className="text-base block border-0 bg-[#EFF1F999] w-full rounded-lg"
                  onChange={(e) => setOtp(e.target.value)}
                />
                {verify && (
                  <button
                    disabled={data?.mobileVerified}
                    onClick={() => submitOtp()}
                  >
                    Submit
                  </button>
                )}
              </div>
              {verify && (
                <p className="text-right">
                  <span className="text-primary font-bold">Resend OTP </span>{" "}
                  {verify && seconds > 0 ? "in " + seconds + " sec" : ""}
                </p>
              )}
              {/* </>
              )} */}
            </div>
            {/* <div className="col-span-1">
              <label className="block mb-2">Mobile Number</label>
              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                value={data?.mobile || ""}
                onChange={(e) => handleInputChange(e)}
                className="text-base block border-0 bg-[#EFF1F999] w-full rounded-lg"
              />
              {validation?.mobile && (
                <p className="text-red-800">{validation.mobile}</p>
              )}
            </div> */}
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
              {validation?.Email && (
                <p className="text-red-800">{validation.Email}</p>
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
              {validation?.Business_Name && (
                <p className="text-red-800">{validation.city}</p>
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
              {validation?.Address && (
                <p className="text-red-800">{validation.Address}</p>
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
                className="text-base block border-0 bg-[#EFF1F999] w-full rounded-lg"
              />
              {validation?.Pincode && (
                <p className="text-red-800">{validation.Pincode}</p>
              )}
            </div>
          </div>

          {/* <input type="text" value={data} onChange={handleInputChange} /> */}
        </div>
      </div>
    </div>
  );
}

export default AddNewCustomer;
