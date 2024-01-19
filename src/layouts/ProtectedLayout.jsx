import { Navigate, useOutlet } from "react-router-dom";
import Loader from "../components/common/Loader/Loader";
import Sidebar from "../components/sidebar/Sidebar";
import { useAuth } from "../stores/AuthContext";
import Navbar from "../components/navbar/Navbar";

export const ProtectedLayout = () => {
  const { user, loading, logoutCurrentUser } = useAuth();
  console.log("user in proted====>", user);
  const outlet = useOutlet();
  if (!user && !user?.role?.agents && !loading) {
    return <Navigate to="/login" />;
  } else if (!user?.role?.agents) {
    logoutCurrentUser();
  }

  return (
    <>
      {user?.role.agents ? (
        <>
          {/**For navigation bar  */}
          <Navbar />
          <div className="flex bg-gray-100 ">
            {/* <div className="w-[236px] bg-white h-[calc(100vh-100px)] overflow-auto"> */}

            <Sidebar />

            <div className="h-[calc(100vh-100px)] overflow-auto grow">
              {/* container */}
              <div className="sm:m-6 rounded-xl">
                {loading ? <Loader /> : outlet}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <Navigate to="/login" />
        </>
      )}
    </>
  );
};
