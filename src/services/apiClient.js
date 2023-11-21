import axios from "axios";
import { signOut } from "firebase/auth";
import { getAccessToken } from "../Firebase";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:4000",
  headers: {
    "Content-type": "application/json",
  },
});

apiClient.interceptors.request.use(async function (config) {
  const tokenId = await getAccessToken();
  // const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${tokenId}`;

  return config;
});
apiClient.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Do something with response error
    if (error?.response?.status === 401) {
      signOut();
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export const get = (apiEndpoint, params) => {
  return apiClient.get(apiEndpoint, params);
};

export const post = (apiEndpoint, postData, extraHeaders) => {
  return apiClient.post(apiEndpoint, postData, extraHeaders);
};

export default apiClient;
