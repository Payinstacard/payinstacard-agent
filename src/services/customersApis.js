import { getDateString } from "./helper";
import { utils, writeFile } from "xlsx";
import _ from "lodash";
import { toast } from "react-toastify";

// for exporting xl file of customers
export function downloadCSVOfCustomers(array, selectedRows) {
  if (_.isEmpty(array)) {
    toast("There are no records in table", {
      theme: "dark",
      hideProgressBar: true,
      type: "error",
    });
    return;
  }
  let newArray;
  if (_.isEmpty(selectedRows)) {
    newArray = array.map((item) => {
      return {
        Name: `${item?.Customer_data.FirstName} ${item?.Customer_data.LastName}`,
        Transfer: item?.transfers.length,
        Beneficiary: item?.BenificaryCollection.length,
        mobile: item?.mobile,
        Transactions: item?.transactions.length,
        CustomerId: item?.Customer_id,
        Disabled: item?.disabled ? "Enable" : "Disable",
        PaymentStatus: item?.paymentDisabled ? "Enable" : "Disable",
        CreatedAt: getDateString(item?.created_At),
      };
    });
  } else {
    newArray = selectedRows.map((item) => {
      return {
        Name: `${item?.Customer_data.FirstName} ${item?.Customer_data.LastName}`,
        Transfer: item?.transfers.length,
        Bneficiary: item?.BenificaryCollection.length,
        mobile: item?.mobile,
        Transactions: item?.transactions.length,
        CustomerId: item?.Customer_id,
        Disabled: item?.disabled ? "Enable" : "Disable",
        PaymentStatus: item?.paymentDisabled ? "Enable" : "Disable",
        CreatedAt: getDateString(item?.created_At),
      };
    });
  }

  let wb = utils.book_new();
  let ws = utils.json_to_sheet(newArray);
  utils.book_append_sheet(wb, ws, "export");
  writeFile(wb, "export.xlsx");
}

// for exporting xl file of customers transactions
export function downloadCSVOfCustomerTransactions(array, selectedRows) {
  if (_.isEmpty(array)) {
    toast("There are no records in table", {
      theme: "dark",
      hideProgressBar: true,
      type: "error",
    });
    return;
  }
  let newArray;
  if (_.isEmpty(selectedRows)) {
    newArray = array.map((item) => {
      return {
        Transaction_ID: item?.OrderId,
        Transaction_Date: getDateString(item?.created_At),
        Beneficiary_Id: item?.benificary_details?.paymentInfo?.beneficier_id,
        Beneficiary_IFSC: item?.benificary_details?.paymentInfo?.ifsc_code,
        Amount: item?.OrderAmount,
        Status: item?.OrderPaymentStatusText,
      };
    });
  } else {
    newArray = selectedRows.map((item) => {
      return {
        Transaction_ID: item?.OrderId,
        Transaction_Date: getDateString(item?.created_At),
        Beneficiary_Id: item?.benificary_details?.paymentInfo?.beneficier_id,
        Beneficiary_IFSC: item?.benificary_details?.paymentInfo?.ifsc_code,
        Amount: item?.OrderAmount,
        Status: item?.OrderPaymentStatusText,
      };
    });
  }

  let wb = utils.book_new();
  let ws = utils.json_to_sheet(newArray);
  utils.book_append_sheet(wb, ws, "export");
  writeFile(wb, "export.xlsx");
}

// for exporting xl file of Transactions

export function downloadCSVOfTransactions(array, selectedRows) {
  if (_.isEmpty(array)) {
    toast("There are no records in table", {
      theme: "dark",
      hideProgressBar: true,
      type: "error",
    });
    return;
  }
  let newArray;
  if (_.isEmpty(selectedRows)) {
    newArray = array.map((item) => {
      return {
        Transaction_ID: item?.OrderId,
        Transaction_Date: getDateString(item?.created_At),
        Beneficiary_Id: item?.benificary_details?.paymentInfo?.beneficier_id,
        Beneficiary_IFSC: item?.benificary_details?.paymentInfo?.ifsc_code,
        Amount: item?.OrderAmount,
        Status: item?.OrderPaymentStatusText,
      };
    });
  } else {
    newArray = selectedRows.map((item) => {
      return {
        Transaction_ID: item?.OrderId,
        Transaction_Date: getDateString(item?.created_At),
        Beneficiary_Id: item?.benificary_details?.paymentInfo?.beneficier_id,
        Beneficiary_IFSC: item?.benificary_details?.paymentInfo?.ifsc_code,
        Amount: item?.OrderAmount,
        Status: item?.OrderPaymentStatusText,
      };
    });
  }

  let wb = utils.book_new();
  let ws = utils.json_to_sheet(newArray);
  utils.book_append_sheet(wb, ws, "export");
  writeFile(wb, "export.xlsx");
}

// for exporting xl file of withdraw transactions

export function downloadCSVOfWithdrawTransactions(array, selectedRows) {
  if (_.isEmpty(array)) {
    toast("There are no records in table", {
      theme: "dark",
      hideProgressBar: true,
      type: "error",
    });
    return;
  }
  let newArray;
  if (_.isEmpty(selectedRows)) {
    newArray = array.map((item) => {
      return {
        Transaction_ID: item?.withdrawalId,
        Type: "REQUEST",
        Status: item?.status,
        Amount: item?.amount,
        Transaction_Date: getDateString(item?.created_At),
      };
    });
  } else {
    newArray = selectedRows.map((item) => {
      return {
        Transaction_ID: item?.withdrawalId,
        Type: "REQUEST",
        Status: item?.status,
        Amount: item?.amount,
        Transaction_Date: getDateString(item?.created_At),
      };
    });
  }

  let wb = utils.book_new();
  let ws = utils.json_to_sheet(newArray);
  utils.book_append_sheet(wb, ws, "export");
  writeFile(wb, "export.xlsx");
}
