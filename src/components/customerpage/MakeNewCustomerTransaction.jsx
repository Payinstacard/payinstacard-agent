import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MobileField from "../common/forms/MobileField";
import Button from "../common/forms/Button";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import {
  fetchSingleCustomer,
  setCustomersLoading,
} from "../../stores/CustomerRedux";
import BeneficiaryDetailsModel from "./BeneficiaryDetailsModel";
import forge from "node-forge";
import CryptoJS from "crypto-js";
import { useRef } from "react";
import { useAuth } from "../../stores/AuthContext";
import public_key from "../../public_key";
import { useForm } from "react-hook-form";
import apiClient from "../../services/apiClient";
import {
  AIRPAY_PAYMENT,
  BASE_URL,
  airpay_payment,
} from "../../services/apiConstant";
import Loader from "../common/Loader/Loader";

const MakeCustomerTransaction = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});
  // const [showPopup, setShowPopup] = useState(false);
  const { getAccessToken, currentUser, get_wallet_lim } = useAuth();

  const [payInfo, setPayInfo] = useState(""); // beneficiary selection
  const [amount, setAmount] = useState(0); // amount input
  const [convieFee, setConvieFee] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const [paymentStatus, setPaymentStatus] = useState(""); // 'success' or 'failed'
  const [isModalOpen, setModalOpen] = useState(false);
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();
  const formRef = useRef({});
  const inputRef = useRef({});
  const keyref = useRef({});
  const tokenRef = useRef({});
  const { rent } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    reset,
    setValue,
    value,
  } = useForm();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormErrors({ ...formErrors, beneficiary: "" });
  };

  const agentData = useSelector((state) => state?.agentData?.agentData);

  useEffect(() => {
    dispatch(fetchSingleCustomer(id));
  }, [id]);
  const customersData = useSelector(
    (state) => state?.customersData?.singleCustomerData
  );
  const customersLoading = useSelector(
    (state) => state?.customersData?.customersLoading
  );
  // if (_.isEmpty(agentData) || _.isEmpty(customersData?.Customer_id)) {
  //   navigate("/dashboard/customers");
  // }
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
    if (event.target.name === "amount") {
      if (event.target.value.length === 0) {
        setFormErrors({
          ...formErrors,
          [event.target.name]: "Please enter amount",
        });
      } else if (event.target.value === "0") {
        setFormErrors({
          ...formErrors,
          [event.target.name]: "Please enter amount",
        });
      } else {
        setFormErrors({
          ...formErrors,
          [event.target.name]: "",
        });
      }
    }
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

  const validateForm = () => {
    let isValid = true;
    const errors = {};
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      errors.amount = "Please enter a valid amount.";
      isValid = false;
    }
    if (_.isEmpty(payInfo)) {
      errors.beneficiary = "Please select a beneficiary account.";
      isValid = false;
    }
    setFormErrors(errors);

    return isValid;
  };

  const onSubmit = async (data, event) => {
    event.preventDefault();
    if (validateForm()) {
      dispatch(setCustomersLoading(true));
      const payableAmount = amount.toString();
      const paymentData = payInfo;
      const Paydata = {
        Amount: amount,
        TotalAmount: totalAmount.toString(),
        // paymentType: rent, // "agent rent"
        paymentType: "agentrent",
        customerId: customersData?.Customer_id,
        paymentInfo: {
          beneficier_id: paymentData.bend_ids,
          name: paymentData?.name, // "beneficiary name"
          address: paymentData?.address,
          type: "agentpayment", // "agent payment"
          bankAccount: paymentData?.paydatas?.bankAccount || "",
          ifsc_code: paymentData?.paydatas?.ifsc_code || "",
          upi_code: paymentData?.paydatas?.upi_code || "",
          base_commision: agentData?.Commission?.BasePersentage,
          markup_commision: agentData?.Commission?.markupPercentage,
        },
        conviFees: convieFee.toString(),
      };
      console.log("paymentdata", Paydata);

      //forge.random.getBytesSync(16)
      const binaryKEy = forge.random.getBytesSync(16).toString();

      const symmetricKey = forge.util.bytesToHex(binaryKEy);

      const key = symmetricKey;
      // Encrypt
      const ciphertext = CryptoJS.AES.encrypt(
        JSON.stringify(Paydata),
        key
      ).toString();

      const encryptData = (paymentData) => {
        // Replace with the server's public key
        // const symmetricKey = forge.random.getBytesSync(16);
        // Convert the public key to a Forge RSA public key object
        const publicKeyForge = forge.pki.publicKeyFromPem(public_key);

        // Encrypt the data using RSA_PKCS1_OAEP_PADDING and sha256 hash
        const encrypted = publicKeyForge.encrypt(key, "RSA-OAEP", {
          md: forge.md.sha256.create(),
        });

        // Convert the encrypted bytes to a Base64-encoded string
        const encryptedBase64 = forge.util.encode64(encrypted);

        return encryptedBase64;
      };

      const encryptedDAta = {
        payData: encryptData(Paydata),
      };

      try {
        const form = formRef.current;

        // Access the input element using the ref
        const inputElement = inputRef.current;

        const keysElement = keyref.current;

        // Get the updated value

        const updatedValue = forge.util.encode64(ciphertext);

        console.log("updatedvalue", updatedValue);
        const tokens = tokenRef.current;
        tokens.value = await getAccessToken();
        // Set the value of the input element
        inputElement.value = updatedValue;
        keysElement.value = encryptData(Paydata, public_key);

        //Submit the form
        console.log("form", form);

        form.submit();
        // await apiClient
        //   .post(AIRPAY_PAYMENT, {
        //     payData: updatedValue,
        //     key: encryptData(Paydata, public_key),
        //     token: await getAccessToken(),
        //   })
        //   .then((response) => {
        //     console.log("response", response);
        //   });
      } catch (error) {
        dispatch(setCustomersLoading(false));
        console.log(error);
      }
    }
  };

  return (
    <div className="lg:m-2">
      {customersLoading && <Loader />}
      <div className="flex flex-row justify-between md:justify-normal	items-center mt-4 md:mt-0 ">
        <div>
          <Link
            to={`/dashboard/customers/customer-details/${customersData?.Customer_id}/transactions`}
            className="border border-primary hover:bg-primary text-sm min-[390px]:text-base hover:text-[#FFFFFF] font-medium rounded-md px-4 min-[390px]:px-8 py-1.5 mr-4 min-[1000px]:mr-5"
          >
            <span className="mr-2">&#8592;</span> Back
          </Link>
        </div>
        <h2 className="text-base min-[390px]:text-xl font-semibold ">
          Make Transaction
        </h2>
      </div>
      <div className=" bg-white rounded-md h-full flex-1 px-2 min-[390px]:px-5 min-[920px]:px-10 py-5 md:py-10 pt-7 md:pt-14 mt-4 md:mt-8">
        <h2 className="text-lg text-[#45464E] font-medium">
          Make New Transaction
        </h2>
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-[2rem] lg:min-w-[350px] "
        >
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
                  className="text-base block border-0 bg-[#E1E7F2] w-full rounded-lg py-2.5"
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
                  maxLength="9"
                  value={amount || 0}
                  placeholder="&#8377;1000"
                  onChange={handleAmount}
                  className="text-base block border-0 bg-[#EFF1F999] w-full rounded-lg py-2.5"
                />
                {!_.isEmpty(formErrors?.amount) && (
                  <p className="text-red-800 mt-1">{formErrors.amount}</p>
                )}
              </div>
              <div className="mb-5">
                <label className="block mb-2">
                  Beneficiary <span className="text-red-500 ">*</span>
                </label>
                {customersData?.BenificaryCollection?.length > 0 ? (
                  <>
                    <select
                      name="beneficiary"
                      // value={formValues?.beneficiary || ""}
                      onChange={(e) => selectBeneficiary(e)}
                      className="text-base block border-0 bg-[#EFF1F999] w-full rounded-lg py-2.5"
                    >
                      <option disabled selected className="text-[16px]">
                        Select beneficiary account
                      </option>

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
                              className="text-[12px] min-[500px]:text-[16px]"
                            >
                              {benItem.beneficiary_id} -{" "}
                              {benItem?.beneficiary_name}
                            </option>
                          );
                        })}
                    </select>
                    {!_.isEmpty(formErrors?.beneficiary) && (
                      <p className="text-red-800">{formErrors.beneficiary}</p>
                    )}
                  </>
                ) : (
                  <button
                    onClick={openModal}
                    className="bg-primary hover:bg-primarylight text-white rounded-lg px-4 py-2 shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring focus:border-primary"
                  >
                    Add Beneficiary
                  </button>
                )}
              </div>
            </div>
            <div className="mt-6 sm:mt-14 md:mt-2">
              <div className="bg-[#F6F7FB] p-6 min-[390px]:p-8 rounded-[0.625rem] font-bold md:w-[280px] min-[920px]:w-[330px] lg:w-[370px]">
                <h2 className="text-lg mb-6 text-[#525252]">Payment Details</h2>
                <p className="flex justify-between my-3 min-[390px]:pr-10 md:pr-2 min-[920px]:pr-10">
                  <span className="text-sm text-[#525252]">Amount</span>
                  <span className="text-base font-bold">
                    &#8377;{amount || 0}
                  </span>
                </p>
                <p className="flex justify-between my-3 pb-3 border-b-2 min-[390px]:pr-10 md:pr-2 min-[920px]:pr-10">
                  <span className="text-[#525252]">Convinence Fees</span>
                  <span className="text-base font-bold">
                    &#8377;{_.isNaN(convieFee) ? 0 : convieFee}
                  </span>
                </p>
                <p className="flex justify-between my-3 pb-2 border-b-2 min-[390px]:pr-10 md:pr-2 min-[920px]:pr-10">
                  <span className="text-[#525252]">Total Amount</span>
                  <span className="text-base font-bold">
                    &#8377;{_.isNaN(totalAmount) ? 0 : totalAmount}
                  </span>
                </p>

                <div className="mt-10">
                  <Button
                    type="submit"
                    label={`Pay ₹${_.isNaN(totalAmount) ? 0 : totalAmount}`}
                    disabled={!amount > 0 || _.isEmpty(payInfo)}
                    // onClick={(event) => onSubmit(event)}
                    // onClick={handlePayment}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div>
        <BeneficiaryDetailsModel isOpen={isModalOpen} onClose={closeModal} />
      </div>
      {/* Display Popup */}
      {/* {showPopup && (
        <PaymentStatusPopUp type={paymentStatus} onClose={closePopup} />
      )} */}
      <form ref={formRef} method="POST" action={BASE_URL + AIRPAY_PAYMENT}>
        <input type="hidden" name="token" ref={tokenRef} value="" />

        <input type="hidden" name="payData" value="" ref={inputRef} />
        <input type="hidden" name="key" value="" ref={keyref} />
      </form>
    </div>
  );
};

export default MakeCustomerTransaction;
