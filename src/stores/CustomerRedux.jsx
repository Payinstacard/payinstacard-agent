import { createSlice } from "@reduxjs/toolkit";
import {
  ADD_BENEFICIARY,
  FETCH_CUSTOMER,
  FETCH_SINGLE_CUSTOMER_DATA,
} from "../services/apiConstant";
import apiClient from "../services/apiClient";

const initialState = {
  customersLoading: false,
  customersData: [],
  singleCustomerData: {},
};

export const customersSlice = createSlice({
  name: "customersData",
  initialState,
  reducers: {
    setCustomersLoading(state, action) {
      state.customersLoading = action.payload;
    },
    setCustomersData(state, action) {
      state.customersData = action.payload;
    },
    setSingleCustomerData(state, action) {
      state.singleCustomerData = {
        ...action.payload,
      };
    },
    updateTransactionArray(state, action) {
      const { customerId, newTransaction } = action.payload;
      // Find the customer by ID and update the transaction array
      state.customersData = state.customersData.map((customer) =>
        customer.Customer_id === customerId
          ? {
              ...customer,
              transactions: [...customer.transactions, newTransaction],
            }
          : customer
      );
    },
    updateBeneficiaryArray(state, action) {
      const { customerId, newBeneficiary } = action.payload;
      // Find the customer by ID and update the beneficiary array
      state.customersData = state.customersData.map((customer) =>
        customer.Customer_id === customerId
          ? {
              ...customer,
              BenificaryCollection: [
                ...customer.BenificaryCollection,
                newBeneficiary,
              ],
            }
          : customer
      );
    },
  },
});

export const {
  setCustomersLoading,
  setCustomersData,
  updateTransactionArray,
  updateBeneficiaryArray,
  setSingleCustomerData,
} = customersSlice.actions;

export const fetchCustomers = (id) => {
  return async (dispatch) => {
    try {
      dispatch(setCustomersLoading(true));

      const response = await apiClient.get(FETCH_CUSTOMER);
      const customersData = response?.data?.response?.AgentCustomers_array;
      console.log("data", customersData);

      dispatch(setCustomersData(customersData));
      dispatch(setCustomersLoading(false));
    } catch (error) {
      dispatch(setCustomersLoading(false));
      console.error(error);
    }
  };
};

export const fetchSingleCustomer = (id) => {
  return async (dispatch) => {
    try {
      dispatch(setCustomersLoading(true));

      const response = await apiClient.get(
        FETCH_SINGLE_CUSTOMER_DATA + "?custom_id=" + id
      );
      const userData = response?.data?.response.UserData;

      dispatch(setSingleCustomerData(userData));
      dispatch(setCustomersLoading(false));
    } catch (error) {
      dispatch(setCustomersLoading(false));
      console.error(error);
    }
  };
};

export const addBeneficiary = (data, success_cb, error_cb) => {
  return async (dispatch) => {
    try {
      dispatch(setCustomersLoading(true));

      const response = await apiClient.post(ADD_BENEFICIARY, data);
      dispatch(fetchSingleCustomer(data.custom_id));
      dispatch(setCustomersLoading(false));
      success_cb(response);
    } catch (error) {
      dispatch(setCustomersLoading(false));
      error_cb(error);
      console.error(error);
    }
  };
};

export default customersSlice.reducer;
