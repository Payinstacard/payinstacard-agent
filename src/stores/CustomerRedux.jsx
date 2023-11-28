import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL, FETCH_CUSTOMER } from "../services/apiConstant";
import apiClient from "../services/apiClient";

const initialState = {
  customersLoading: false,
  customersData: [],
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
} = customersSlice.actions;

export const fetchCustomers = (id) => {
  return async (dispatch) => {
    try {
      dispatch(setCustomersLoading(true));

      const response = await apiClient.get(FETCH_CUSTOMER + "?agent_id=" + id);
      const customersData = response?.data?.response?.AgentCustomers_array;
      console.log("data", customersData)

      dispatch(setCustomersData(customersData));
      dispatch(setCustomersLoading(false));
    } catch (error) {
      dispatch(setCustomersLoading(false));
      console.error(error);
    }
  };
};

export default customersSlice.reducer;
