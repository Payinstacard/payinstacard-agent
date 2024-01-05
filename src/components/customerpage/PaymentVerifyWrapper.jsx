import React, { useRef, useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import PaymentSuccess from "./PaymentSuccess";
import PaymentFailure from "./PaymentFailure";
import PaymentFailure2 from "./PaymentFailure2";
import _ from "lodash";
// import { APIUrls } from "../../baseUrl/BaseUrl";
import apiClient from "../../services/apiClient";
import { useAuth } from "../../stores/AuthContext";
import { useForm } from "react-hook-form";
// import { Icon } from "@iconify/react";
import { CgSpinner } from "react-icons/cg";
import { toast, ToastContainer } from "react-toastify";
import jsPDF from "jspdf";
// import "jspdf-autotable";
// import IndianRupee from "./IndianRupee.ttf";
// import Pdf from "react-to-pdf";
// import PdfReciept from "../utils/PdfReciept";
// import { PDFViewer } from "@react-pdf/renderer";
// import {
//   useQuery,
//   useMutation,
//   useQueryClient,
//   QueryClient,
//   QueryClientProvider,
// } from "@tanstack/react-query";
// import logo from "../../assets/payinstacard log_pblue_pblue (1) 2.png";
import { AIRPAY_PAYMENT, BASE_URL } from "../../services/apiConstant";
import { VERIFY_AIRPAY_PAYMENT } from "../../services/apiConstant";
import FeedBackModal from "./FeedBackModal";
import { useQuery } from "react-query";
import Loader from "../common/Loader/Loader";

const PaymentVerifyWrapper = () => {
  // const queryClient = useQueryClient();

  const { confirmationResult, setConfirmationResult } = useAuth();
  const { getAccessToken, currentUser } = useAuth();
  const { orderkeyid } = useParams();
  const navigate = useNavigate();
  const reportTemplateRef = useRef(null);
  const [res, setRes] = useState({});

  const [isOpenModal, setIsOpenModal] = useState(false);

  // IF ORDER KYE IS NOT THERE
  useEffect(() => {
    if (_.isEmpty(orderkeyid)) {
      return navigate("/");
    }
  }, []);

  const feedbackTimer = () => {
    if (!isOpenModal) {
      setTimeout(() => {
        setIsOpenModal(true);
      }, 3000);
    }
  };

  useEffect(() => {
    feedbackTimer();
  }, []);

  // const { isLoading, isError, data, error, status } = useQuery({
  const { isLoading, isError, data, error, status } = useQuery({
    queryKey: ["fetch_order"],
    queryFn: async () => {
      try {
        const token = await getAccessToken();
        const response = await fetch(BASE_URL + VERIFY_AIRPAY_PAYMENT, {
          method: "POST",
          body: JSON.stringify({
            OrderKeyId: orderkeyid,
            // paymentType: "agent",
          }),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const responseJson = await response.json();
        console.log("res==>", responseJson);
        setRes(responseJson);

        if (_.isEmpty(responseJson)) {
          return toast.error("Something went wrong !!");
        }

        if (responseJson?.code === 200) {
          console.log(responseJson);

          return responseJson?.response;
          //const message = responseJson.response.message;
        }

        if (responseJson?.code === 400) {
          const message = responseJson.response.message;
          throw new Error("Something went Wrong ,Try again later !");
        }

        console.log(responseJson);
      } catch (error) {
        throw new Error("Something went Wrong ,Try again later !");
      }
    },
  });
  console.log("data=>", data, "erro=>", error, "status=>", status);

  if (isLoading) {
    return <Loader />;
  }

  // if (isError) {
  //   let status = error.message === "Cancelled" ? 2 : 0;
  //   //PAYG
  //   // return <PaymentFailure2 reasonStatus={parseInt(data.OrderStatus)}  keyid={orderkeyid} /> ;

  //   // AIRPAY
  //   return (
  //     <PaymentFailure2 reasonStatus={parseInt(status)} keyid={orderkeyid} />
  //   );
  // }

  const payment = {
    tanentInfo: "ss",
    date: "June 30, 2023",
    amount: 1000,
    method: "Bank Transfer",
    transactionId: "123456789",
  };

  return (
    <div>
      {/* {data.OrderId}

      <button onClick={()=>generatePDF()} >Submit</button> */}
      <div className="App"></div>
      {/* <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <PdfReciept payment={data} />
    </PDFViewer> */}
      {/* {isOpenModal && (
        <FeedBackModal
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          className="z-40"
        />
      )} */}
      {status === "success" ? (
        <PaymentSuccess
          keyid={orderkeyid}
          amount={data.OrderAmount}
          orderData={data}
        />
      ) : (
        <PaymentFailure
          reasonStatus={res.message}
          keyid={orderkeyid}
          amount={res?.response?.OrderAmount}
          orderData={res?.response}
        />
      )}
    </div>
  );
};

export default PaymentVerifyWrapper;
