import React from "react";
import CrossBox from "../../assets/svg/crossbox.svg";
import PaymentSuccess from "../../assets/svg/paymentSuccess.svg";
import PaymentFail from "../../assets/svg/paymentFail.svg";
import PaymentSuccessCheck from "../../assets/svg/paymentSuccessCheck.svg";
import paymentFailIcon from "../../assets/svg/paymentFailIcon.svg";
import downloadReceipt from "../../assets/svg/paymentReceiptDownload.svg";
import { downloadTrasactionReceipt } from "../common/models/htmlTopdf";

function PaymentStatusPopUp({ data, onClose }) {
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-opacity-50 bg-gray-700 z-10">
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
            src={`${
              data?.OrderPaymentStatus === "200"
                ? PaymentSuccess
                : data?.OrderPaymentStatus === "201"
                ? PaymentSuccess
                : PaymentFail
            }`}
            alt={`${
              data?.OrderPaymentStatus === "200"
                ? "payment success"
                : data?.OrderPaymentStatus === "201"
                ? "payment success"
                : "payment fail"
            }`}
            className="w-[150px] min-[600px]:w-auto min-[600px]:mt-[-15px]"
          />
          <p className="text-[#45464E] text-[16px] min-[600px]:text-[28px]">
            {data?.OrderPaymentStatus === "200"
              ? "Payment Successful!"
              : data?.OrderPaymentStatus === "201"
              ? "Payment Successful!"
              : "Payment Failed:)"}
          </p>
          <p
            className={`${
              data?.OrderPaymentStatus === "200"
                ? "text-[#17AB31]"
                : data?.OrderPaymentStatus === "201"
                ? "text-[#17AB31]"
                : "text-[#FF0023]"
            } text-[12px] min-[600px]:text-[20px] mt-1 text-center`}
          >
            {data?.OrderPaymentStatus === "200"
              ? `Your payment of ₹${data?.OrderAmount} was successful`
              : data?.OrderPaymentStatus === "201"
              ? `Your payment of ₹${data?.OrderAmount} was successful`
              : `Your payment of ₹${data?.OrderAmount} was Failed.`}
          </p>
        </div>
        <div className="flex flex-col min-[600px]:flex-row mt-7 gap-2 min-[600px]:gap-5 justify-center">
          <button
            className={`${
              data?.OrderPaymentStatus === "200"
                ? "bg-[#25BF17]"
                : data?.OrderPaymentStatus === "201"
                ? "bg-[#25BF17]"
                : "bg-[#FF0023]"
            } flex gap-2 items-center  text-white py-1 min-[600px]:py-2 px-3 min-[600px]:px-6 rounded self-center	cursor-default`}
          >
            <span>
              <img
                src={`${
                  data?.OrderPaymentStatus === "200"
                    ? PaymentSuccessCheck
                    : data?.OrderPaymentStatus === "201"
                    ? PaymentSuccessCheck
                    : paymentFailIcon
                }`}
                alt={`${
                  data?.OrderPaymentStatus === "200"
                    ? "payment success"
                    : data?.OrderPaymentStatus === "201"
                    ? "payment success"
                    : "payment fail"
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
            onClick={() => downloadTrasactionReceipt(data)}
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
