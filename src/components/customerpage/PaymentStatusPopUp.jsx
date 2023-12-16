import React from "react";
import CrossBox from "../../assets/svg/crossbox.svg";
import PaymentSuccess from "../../assets/svg/paymentSuccess.svg";
import PaymentFail from "../../assets/svg/paymentFail.svg";
import PaymentSuccessCheck from "../../assets/svg/paymentSuccessCheck.svg";
import paymentFailIcon from "../../assets/svg/paymentFailIcon.svg";
import downloadReceipt from "../../assets/svg/paymentReceiptDownload.svg";

function PaymentStatusPopUp({ type, onClose }) {
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-opacity-50 bg-gray-700">
      <div
        className={`w-[80%] h-[60%] min-[600px]:w-auto min-[600px]:h-auto bg-white py-4 min-[600px]:py-8 px-3 min-[600px]:px-6 border border-solid border-gray-300 shadow-md rounded-[20px]`}
      >
        <div className="flex justify-end">
          <img
            src={CrossBox}
            alt=""
            onClick={onClose}
            className="w-6 min-[600px]:w-auto text-end cursor-pointer"
          />
        </div>
        <div className="flex flex-col items-center">
          <img
            src={`${type === "success" ? PaymentSuccess : PaymentFail}`}
            alt={`${type === "success" ? "payment success" : "payment fail"}`}
            className="w-[150px] min-[600px]:w-auto min-[600px]:mt-[-15px]"
          />
          <p className="text-[#45464E] text-[16px] min-[600px]:text-[28px]">
            {type === "success" ? "Payment Successful!" : "Payment Failed:)"}
          </p>
          <p
            className={`${
              type === "success" ? "text-[#17AB31]" : "text-[#FF0023]"
            } text-[12px] min-[600px]:text-[20px] mt-1 text-center`}
          >
            {type === "success"
              ? "Your payment of ₹10000 was successful."
              : "Your payment of ₹10000 was Failed."}
          </p>
        </div>
        <div className="flex flex-col min-[600px]:flex-row mt-7 gap-2 min-[600px]:gap-5 justify-center">
          <button
            className={`${
              type === "success" ? "bg-[#25BF17]" : "bg-[#FF0023]"
            } flex gap-2 items-center  text-white py-1 min-[600px]:py-2 px-3 min-[600px]:px-6 rounded self-center	cursor-default`}
          >
            <span>
              <img
                src={`${
                  type === "success" ? PaymentSuccessCheck : paymentFailIcon
                }`}
                alt={`${
                  type === "success" ? "payment success" : "payment fail"
                }`}
                className=" w-4 min-[600px]:w-auto"
              />
            </span>
            <span className="text-[10px] min-[600px]:text-[16px]">
              Payment Successful
            </span>
          </button>
          <button
            className={`flex gap-2 items-center bg-[#00006B] text-white py-1 min-[600px]:py-2 px-3 min-[600px]:px-6 rounded self-center	`}
          >
            <span>
              <img
                src={downloadReceipt}
                alt="download receipt"
                className=" w-4 min-[600px]:w-auto"
              />
            </span>
            <span className="text-[10px] min-[600px]:text-[16px]">
              Download Receipt
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentStatusPopUp;
