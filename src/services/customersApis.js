import { getDateString } from "./helper";
import { utils, writeFile } from "xlsx";
import _ from "lodash";
import { toast } from "react-toastify";

// for exporting functionality of users
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
        KycDetails: item?.kyc_status ? "verified" : "Not verified",
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
