export const BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:4000";

export const API_STATUS = "/api/v2";
export const GET_USER_ROLE = "/api/v2/getUserRole";
export const ADD_CUSTOMER = "/api/v2/agents/agents/create-customer";
export const FETCH_CUSTOMER = "api/v2/agents/agents/fetchAll-customer";
export const DELETE_CUSTOMER = "api/v2/agents/agents/delete-customer";
export const FETCH_AGENT_DATA = "/api/v2/agents/agents/get-details-agent";

export const BANK_VERIFICATION = "/api/v2/agents/verify/bankVerify";

export const ADD_BENEFICIARY = "/api/v2/agents/agents/create-benificary";
export const DELETE_BENEFICIARY = "/api/v2/agents/agents/delete-beneficiary";

export const SEND_OTP = "/api/v2/agents/otp/send";
export const RESEND_OTP = "/api/v2/agents/otp/resend";
export const VERIFY_OTP = "/api/v2/agents/otp/verify";
export const FETCH_CUSTOMER_DATA = "/api/v2/agents/agents/customer-data";
export const FETCH_SINGLE_CUSTOMER_DATA =
  "/api/v2/agents/agents/fetchsingle-customer";

export const FETCH_SINGLE_TRANSACTION_DATA =
  "/api/v2/agents/agents/fetch-agent-transaction/";

//Air pay endpoint
export const AIRPAY_PAYMENT_TEST = "/api/v2/agents/agents/airpay_post";
export const AIRPAY_PAYMENT = "/payment/airpay_post";
export const WITHDRAW_PAYMENT = "/payment/withdraw";
export const WITHDRAWALS = "/payment/withdrawals";
export const VERIFY_AIRPAY_PAYMENT = "/payment/airpay/verify-order";

//Jus pay endpoint
export const JUSPAY = "/paymentg/agent-juspay/create-order";
export const VERIFY_JUSPAY_PAYMENT = "/paymentg/agent-juspay/status";

export const CHECK_AGENT_BALANCE = "/payment/agent-balance";
