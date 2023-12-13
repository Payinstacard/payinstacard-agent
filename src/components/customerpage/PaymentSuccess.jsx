import React, { useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import CardWrapper from "./CardWrapper";
// import { Icon } from "@iconify/react";
import success from "../../assets/svg/success.svg";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";
import { MdOutlineArrowBack } from "react-icons/md";
import { downloadTrasactionReceipt } from "../common/models/htmlTopdf";

// import Pdf from "react-to-pdf";
// import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
// import logo from "../../assets/payinstacard log_pblue_pblue (1) 2.png";
// import PdfReciept from "./../utils/PdfReciept";
// import FeedBackModal from "../modals/FeedBackModal";
const PaymentSuccess = (props) => {
  console.log(props);

  const options = {
    orientation: "potrait",
    unit: "in",
  };

  const [isOpenModal, setIsOpenModal] = useState(false);
  const ref = React.createRef();
  const navigate = useNavigate();
  const goBack = (e) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <CardWrapper
      className={
        "px-[1rem] xs:max-sm:px-[1.5rem] sm:max-md:px-[2.5rem] md:px-[1rem] lg:px-[1.5rem] xl:px-[2.5rem] flex flex-col gap-[2rem] py-[2rem] min-h-[420px] xs:min-h-[500px]"
      }
    >
      <p className="flex flex-row gap-[1rem] justify-between items-center text-black text-[1.2rem] xs:text-[1.5rem] font-bold">
        <Link to="/dashboard/customers">
          <MdOutlineArrowBack size={30} />
        </Link>
        <Link onClick={() => console.log("help page")}>
          <HiOutlineQuestionMarkCircle size={30} />
        </Link>
      </p>
      <div className="xs:max-md:px-[2.5rem] md:px-[1rem] lg:px-[2.5rem] flex flex-col gap-[1.5rem]">
        <div className="flex justify-center items-center flex-col">
          <div className="w-fit">
            <img src={success} alt="" />
          </div>
          <hr className=" border-[#263238] w-[60%]" />
        </div>
        <div className="flex flex-col gap-[0.5rem]">
          <p className="text-[#17AB31] text-[1rem] sm:text-[1.2rem] font-bold text-center">
            Your payment of ₹{props?.amount || 0} was Successful.
          </p>
          <p className="text-[0.8rem] sm:text-[1rem] font-[600] text-center">
            Transaction ID:{" "}
            <span className="text-[#7D7D7D]"> {props?.keyid || "N/A"}</span>
          </p>
        </div>

        <button
          type="submit"
          className={`
          mx-auto
            bg-[#00006B]
           text-center min-w-[240px] max-lg:text-[0.8rem] rounded-[30px] text-white py-[0.8rem] font-[800] flex flex-row items-center justify-center gap-[0.5rem]`}
          onClick={() => downloadTrasactionReceipt(props)}
        >
          View Recipt
        </button>
      </div>
    </CardWrapper>
  );
};

export default PaymentSuccess;
