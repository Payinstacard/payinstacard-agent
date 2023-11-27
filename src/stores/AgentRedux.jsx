import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { BASE_URL, FETCH_AGENT_DATA } from "../services/apiConstant";
import apiClient from "../services/apiClient";

const initialState = {
  agentLoading: false,
};

export const agentSlice = createSlice({
  name: "agentData",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.agentLoading = action.payload;
    },
    setAgentData(state, action) {
      state.agentData = action.payload;
    },
  },
});

const { setLoading, setAgentData } = agentSlice.actions;

// Create a thunk action creator
export const fetchAgent = (tokens) => {
  return async (dispatch, getState) => {
    try {
      // Dispatch a loading action to indicate the start of the request
      dispatch(setLoading(true));

      // Make an asynchronous API request
      await apiClient
        .get(BASE_URL + FETCH_AGENT_DATA)
        .then((data) => {
          const datas = data.data;
          console.log("DATA", datas);
          if (datas?.response?.UserData) {
            dispatch(setAgentData(datas?.response?.UserData));
          }
          dispatch(setLoading(false));
        })
        .catch((error) => {
          dispatch(setLoading(false));

          console.log(error);
        });

      // Dispatch a success action with the fetched data
      //dispatch(setUser(response.data));
    } catch (error) {
      dispatch(setLoading(false));
      // Dispatch an error action if the request fails
      //dispatch(setError(error.message));
      console.log(error);
    }
  };
};
