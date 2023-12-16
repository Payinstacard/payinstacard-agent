export function getStatusText(statusCode) {
    switch (statusCode) {
      case 0:
        return "Created / Initiated";
      case 1:
        return "Paid / Completed - Approved Transaction";
      case 2:
        return "UnPaid / Completed - Declined Transaction";
      case 3:
        return "Completed - Partial Approved Transactions";
      case 4:
        return "Pending Payment / if payment";
      case 5:
        return "Cancelled Payment by User";
      case 6:
        return "Cancelled / Cancelled by Merchant";
      case 7:
        return "Expired";
      default:
        return "Invalid status code";
    }
  }
  