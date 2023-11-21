import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../stores/AuthContext";
import Loader from "../components/Loader/Loader";
import PayinstaLogo from "../assets/svg/payinstaLogo.svg";
import SearchIcon from "../assets/svg/ProtectedLayoutImages/SearchIcon.svg";
import BellIcon from "../assets/svg/ProtectedLayoutImages/Bell_Icon.svg";
import UserProfileImg from "../assets/svg/ProtectedLayoutImages/UserProfileImage.svg";
import Profile from "../components/navbar/Profile";
import Sidebar from "../components/sidebar/Sidebar";

export const ProtectedLayout = () => {
  const { user, loading } = useAuth();
  const outlet = useOutlet();

  if (!user && !loading) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {/**For navigation bar  */}
      <div className="flex px-10 py-[17px] border-b">
        <div className="w-[196px]">
          <img src={PayinstaLogo} alt="" className="w-[63px]" />
        </div>
        <div className="grow flex justify-between items-center">
          <div className="relative ">
            <input
              type="search"
              placeholder="Search.."
              className="bg-[#F6F6F8] rounded-lg text-sm border-0 w-[300px] py-3 px-4 pl-[35px] "
            />
            <span className="absolute left-[12px] top-[16px]">
              <img src={SearchIcon} alt="" />
            </span>
          </div>
          <div>
            <div className="flex gap-4">
              <span>
                <img src={BellIcon} alt="" />
              </span>
              <div className="flex ">
                <img src={UserProfileImg} alt="" className="mr-2" />
                <Profile />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex  h-screen bg-gray-100">
        <div className="w-[236px] bg-white">
          <Sidebar />
        </div>
        <div className="overflow-auto grow">
          {/* container */}
          <div className="m-6 rounded-xl">{loading ? <Loader /> : outlet}</div>
        </div>
      </div>
    </>
  );
};
