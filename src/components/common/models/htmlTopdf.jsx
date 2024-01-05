import footerImg from "../../../assets/img/Footer_cleanup.png";
import headerImg from "../../../assets/img/Header_cleanup.png";
import logo from "../../../assets/img/Logo.png";

import html2pdf from "html2pdf.js";
import { getDateString } from "../../../services/helper";

export const downloadTrasactionReceipt = (payData) => {
  // Convert the ISO timestamp to a Date object
  // const date = new Date(payData?.created_At);

  // Define an array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get the month, day, and year from the Date object
  // const month = monthNames[date.getMonth()];
  // const day = date.getDate();
  // const year = date.getFullYear();

  // Create the formatted date string
  // const formattedDate = `${month} ${day}, ${year}`;
  console.log("paydata==>", payData);

  //creating html file for invoice

  const element = document.createElement("div");
  element.innerHTML = "";
  let elementTwo = `<div style="width: 100%; margin: 0 auto;"><style>* {box-sizing : border-box;}</style>
            <header style="position: relative; padding: 60px 40px 0">
                <img src="${logo}" width="112" alt="payinstacard" style="">
              <img src="${headerImg}" alt="heder" style="position: absolute; top: 0; left:0; right: 0; bottom: 0; z-index: -1; width: 100%;">
              <div style="display: block; box-sizing: border-box; position: absolute; top: 40px; right: 130px; box-shadow: 0px 2px 4px grey; font-size: 16px; line-height: 20px; border-radius: 20px; padding: 0 10px 13px; background-color: #FFFFFF;">INVOICE NO: #${
                payData?.OrderKeyId
              }</div>
          </header>
          <div style=" margin: 40px;">
            <div style="display: flex; justify-content: space-between;">
              <div style="flex: 1; margin-right: 20px; font-size: 14px;">
                <h6 style="margin-bottom: 10px;"><span style="border-radius: 4px; background: rgba(0, 0, 107, 0.10);color: #00006B; font-size: 12px; padding: 0 10px 13px;">Transaction Information</span></h6>
               
                <div style="font-size: 13px;">
                    <p style="color: #19213D;"><span style="color: #5D6481;">Transaction Id: </span> ${
                      payData?.paymentDetails?.TRANSACTIONID
                    }</p>
                    <p style="color: #19213D;"><span style="color: #5D6481;">Transaction Date:
                    </span> ${getDateString(payData?.created_At)}</p>
                    <p style="color: #19213D;"><span style="color: #5D6481;">Amount: </span> ${
                      payData?.OrderAmount
                    }</p>                  
                    <p style="color: #19213D;"><span style="color: #5D6481;">Status: </span> ${
                      payData?.OrderPaymentStatus === "200"
                        ? "Success"
                        : payData?.OrderPaymentStatus === "201"
                        ? "Success"
                        : "Fail"
                    }
                    </p>
                </div>
              </div>
          
              <div style="font-size: 14px;">
                <h6 style="margin-bottom: 10px;"><span style="border-radius: 4px; background: rgba(0, 0, 107, 0.10);color: #00006B; font-size: 12px; padding: 0 10px 13px;">Beneficiary Information</span></h6>
                <div style="font-size: 13px;">
                    <p style="color: #19213D;"><span style="color: #5D6481;">Beneficiary Id: </span> ${
                      payData?.benificary_details?.paymentInfo?.beneficier_id
                    }</p>
                    <p style="color: #19213D;"><span style="color: #5D6481;">Name:
                    </span> ${
                      payData?.benificary_details?.paymentInfo?.name
                    }</p>
                    <p style="color: #19213D;"><span style="color: #5D6481;">Address:
                    </span> ${
                      payData?.benificary_details?.paymentInfo?.address
                    }</p>
                    <p style="color: #19213D;"><span style="color: #5D6481;">BankAccount:
                    </span> ${
                      payData?.benificary_details?.paymentInfo?.bankAccount
                    }</p>
                    <p style="color: #19213D;"><span style="color: #5D6481;">IFSC:
                    </span> ${
                      payData?.benificary_details?.paymentInfo?.ifsc_code
                    }</p>
                </div>
              </div>
            </div>
          
          </div>
          <footer style="position: relative; padding: 40px; font-size: 14px;">
            <img src="${footerImg}" alt="footer" style="position: absolute; top: 0; left:0; right: 0; bottom: 0; width: 100%; " />
            <div style="">
              <h5 style="font-weight: 600;">Payinstacard</h5>
              <p style="color: #5D6481; font-size: 13px; "><a href="www.payinstacard.com">www.payinstacard.com</a></p>
              <p style="color: #5D6481; font-size: 13px; "><a href="mailto:info@payinstacard.com">info@payinstacard.com</a> / <a href="tel:919100420520">+91 9100 420 520</a></p>
            </div>
          </footer></div>
          `;
  element.innerHTML = "<body>" + elementTwo + "</body>";

  html2pdf()
    .from(element)
    .set({
      filename: "transactionSuccessInvoice.pdf",
      image: { type: "jpeg", quality: 0.95 },
      html2canvas: {
        scale: 2,
        logging: true,
        dpi: 300,
        letterRendering: true,
      },
    })
    .toPdf()
    .get("pdf")
    .save();
};
