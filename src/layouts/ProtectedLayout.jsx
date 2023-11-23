import { Navigate, useOutlet } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import Sidebar from "../components/sidebar/Sidebar";
import { useAuth } from "../stores/AuthContext";
import Navbar from "../components/navbar/Navbar";

export const ProtectedLayout = () => {
  const { user, loading } = useAuth();
  const outlet = useOutlet();

  if (!user && !loading) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {/**For navigation bar  */}
      <Navbar />
      <div className="flex bg-gray-100 ">
        {/* <div className="w-[236px] bg-white h-[calc(100vh-100px)] overflow-auto"> */}
        <div>
          <Sidebar />
        </div>
        <div className="h-[calc(100vh-100px)] overflow-auto grow">
          {/* container */}
          <div className="m-6 rounded-xl">{loading ? <Loader /> : outlet}</div>
        </div>
      </div>
    </>
  );
};
