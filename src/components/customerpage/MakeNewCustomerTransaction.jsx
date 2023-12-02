import React from "react";
import { Link, useNavigate } from "react-router-dom";
import MobileField from "../common/forms/MobileField";
import Button from "../common/forms/Button";
import { useState, useEffect } from "react";
import PaymentStatusPopUp from "./PaymentStatusPopUp";
import { useSelector } from "react-redux";
import _ from "lodash";

const MakeCustomerTransaction = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  const [payInfo, setPayInfo] = useState(""); // beneficiary selection
  const [amount, setAmount] = useState(0); // amount input
  const [convieFee, setConvieFee] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const [paymentStatus, setPaymentStatus] = useState(""); // 'success' or 'failed'
  const agentData = useSelector((state) => state?.agentData?.agentData);
  const customersData = useSelector(
    (state) => state?.customersData?.singleCustomerData
  );
  if (_.isEmpty(agentData) || _.isEmpty(customersData?.Customer_id)) {
    navigate("/dashboard/customers");
  }
  useEffect(() => {
    if (!_.isEmpty(customersData?.Customer_id)) {
      setFormValues({
        name:
          customersData?.Customer_data?.FirstName +
          " " +
          customersData?.Customer_data?.LastName,
        mobile: customersData?.mobile,
      });
    }
  }, [customersData?.Customer_id]);

  const handleInputChange = (e) => {
    const {
      target: { name, value },
    } = e;
    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const selectBeneficiary = (event) => {
    const {
      target: { value },
    } = event;
    if (!_.isEmpty(value)) {
      const convertTojson = JSON.parse(value);
      setPayInfo(convertTojson);
    }
  };
  const handleAmount = (event) => {
    let amount = event.target.value;

    amount = parseInt(amount); // Convert to integer to remove leading zeros
    setAmount(amount);
    const feePercentage =
      agentData?.Commission?.markupPercentage +
        agentData?.Commission?.BasePersentage || 1.8;
    if (_.isNumber(amount)) {
      setConvieFee(parseFloat(((feePercentage / 100) * amount).toFixed(2)));
      let fee = parseFloat(((feePercentage / 100) * amount).toFixed(2));
      const totalamount = amount + fee;
      const roundedTotalAmount = Math.ceil(totalamount);
      setTotalAmount(parseInt(roundedTotalAmount));
    }
  };

  const handlePayment = () => {
    // Logic for payment success/failure
    // Set paymentStatus accordingly
    if (false) {
      setPaymentStatus("success");
    } else {
      setPaymentStatus("fail");
    }

    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="lg:m-2">
      {/* {loading && <Loader />} */}
      <div className="flex flex-row justify-between md:justify-normal	items-center mt-4 md:mt-0 ">
        <div>
          <Link
            to={"/dashboard/customers"}
            className="border border-primary hover:bg-primary text-sm sm:text-base hover:text-[#FFFFFF] font-medium rounded-md px-6  sm:px-8 py-1.5 mr-4 min-[1000px]:mr-5"
          >
            <span className="mr-2">&#8592;</span> Back
          </Link>
        </div>
        <h2 className="text-xl font-semibold ">Make Transaction</h2>
      </div>
      <div className=" bg-white rounded-md h-full flex-1 px-2 min-[390px]:px-5 min-[920px]:px-10 py-5 md:py-10 pt-7 md:pt-14 mt-4 md:mt-8">
        <h2 className="text-lg text-[#45464E] font-medium">
          Make New Transaction
        </h2>
        <div className="text-sm md:flex mt-5 min-[1230px]:mt-12 min-[390px]:mx-5 md:mx-0 min-[920px]:mx-5 min-[1230px]:mx-28">
          <div className="md:mr-10 min-[920px]:mr-14 md:w-[45%]">
            <div className="mb-5">
              <label className="block mb-2">Customer Name</label>
              <input
                type="text"
                name="name"
                value={formValues?.name || ""}
                placeholder="Full Name"
                onChange={(e) => handleInputChange(e)}
                className="text-base block border-0 bg-[#EFF1F999] w-full rounded-lg py-2.5"
                disabled
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2">Mobile Number</label>
              <div className="inputWithButton">
                <MobileField
                  name="mobile"
                  placeholder="Mobile Number"
                  value={formValues?.mobile || ""}
                  onChange={(e) => handleInputChange(e)}
                  disabled
                />
              </div>
            </div>
            <div className="mb-5">
              <label className="block mb-2">
                Enter Amount <span className="text-red-500 ">*</span>
              </label>
              <input
                type="text"
                name="amount"
                value={amount || 0}
                placeholder="&#8377;1000"
                onChange={handleAmount}
                className="text-base block border-0 bg-[#EFF1F999] w-full rounded-lg py-2.5"
              />
              {!_.isEmpty(formErrors?.amount) && (
                <p className="text-red-800">{formErrors.amount}</p>
              )}
            </div>
            <div className="mb-5">
              <label className="block mb-2">
                Beneficiary <span className="text-red-500 ">*</span>
              </label>
              <select
                name="beneficiary"
                // value={formValues?.beneficiary || ""}
                onChange={(e) => selectBeneficiary(e)}
                className="text-base block border-0 bg-[#EFF1F999] w-full rounded-lg py-2.5"
              >
                <option value="">Select beneficiary account</option>

                {customersData?.BenificaryCollection &&
                  customersData?.BenificaryCollection?.map((benItem) => {
                    return (
                      <option
                        key={benItem.beneficiary_id}
                        value={JSON.stringify({
                          paydatas: benItem.payment_info,
                          bend_ids: benItem.beneficiary_id,
                          name: benItem.beneficiary_name,
                          address: benItem.beneficiary_address,
                        })}
                      >
                        {benItem.beneficiary_id} - {benItem?.beneficiary_name}
                      </option>
                    );
                  })}
              </select>
              {!_.isEmpty(formErrors?.beneficiary) && (
                <p className="text-red-800">{formErrors.beneficiary}</p>
              )}
            </div>
          </div>
          <div className="mt-6 sm:mt-14 md:mt-2">
            <div className="bg-[#F6F7FB] p-8 rounded-[0.625rem] font-bold">
              <h2 className="text-lg mb-6 text-[#525252]">Payment Details</h2>
              <p className="flex justify-between my-3 mr-10">
                <span className="text-sm text-[#525252]">Amount</span>
                <span className="text-base font-bold">
                  &#8377;{amount || 0}
                </span>
              </p>
              <p className="flex justify-between my-3 pb-3 border-b-2 pr-10">
                <span className="mr-16 text-[#525252]">
                  Convinence Fees (
                  {agentData?.Commission?.markupPercentage +
                    agentData?.Commission?.BasePersentage || 1.8}
                  %):
                </span>
                <span className="text-base font-bold">
                  &#8377;{_.isNaN(convieFee) ? 0 : convieFee}
                </span>
              </p>
              <p className="flex justify-between my-3 pb-2 border-b-2 pr-10">
                <span className="text-[#525252]">Total Amount</span>
                <span className="text-base font-bold">
                  &#8377;{_.isNaN(totalAmount) ? 0 : totalAmount}
                </span>
              </p>

              <div className="mt-10">
                <Button
                  label={`Pay ₹${_.isNaN(totalAmount) ? 0 : totalAmount}`}
                  disabled={!amount > 0 || _.isEmpty(payInfo)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Display Popup */}
      {showPopup && (
        <PaymentStatusPopUp type={paymentStatus} onClose={closePopup} />
      )}
    </div>
  );
};

export default MakeCustomerTransaction;
