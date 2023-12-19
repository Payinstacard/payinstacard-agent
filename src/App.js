import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Route";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";
import Maintain from "./Maintain";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./components/common/Loader/Loader";
import { BASE_URL } from "./services/apiConstant";

function App() {
  const [loading, setLoading] = useState(true);
  const [serverDown, setServerDown] = useState(false);
  const queryClient = new QueryClient();

  async function checkApiStatus() {
    try {
      const response = await axios.get(BASE_URL);

      console.log("response", response);
      // Check the HTTP status code to determine the API status
      if (response.status === 200) {
        console.log("API is up and running.");
        setServerDown(false);
      } else {
        console.log(`API returned status code ${response.status}.`);

        setServerDown(true);
        // You can handle different status codes accordingly
      }
    } catch (error) {
      console.error("Error:", error.message);
      console.log("API is likely down.");
      setServerDown(true);
      // Handle the error, which could indicate that the API is down
    } finally {
      setLoading(false); // Set loading to false regardless of success or error
    }
  }

  useEffect(() => {
    checkApiStatus();
  }, []);

  return (
    <div className="">
      <QueryClientProvider client={queryClient}>
        {loading ? (
          <Loader />
        ) : serverDown ? (
          <Maintain />
        ) : (
          <div className="font-lato">
            <ToastContainer />
            <RouterProvider router={router} />
          </div>
        )}
      </QueryClientProvider>
    </div>
  );
}

export default App;
