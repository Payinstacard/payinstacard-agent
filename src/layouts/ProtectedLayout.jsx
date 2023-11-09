import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../stores/AuthContext";

export const ProtectedLayout = () => {
  const { isAuthenticated } = useAuth();
  const outlet = useOutlet();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {/* <div className="flex h-screen bg-gray-100">
        <div className="">
          <Sidebar />
        </div>
        <div className="overflow-auto w-full">
          <Navbar />
          <div className="m-6 bg-white rounded-xl">
            {loading ? <Loader /> : outlet}
          </div>
        </div>
      </div> */}
      <div>
        <h1>Welcom to dashboard</h1>
      </div>
      <div>{outlet}</div>
    </>
  );
};
