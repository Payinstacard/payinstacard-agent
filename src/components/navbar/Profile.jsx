import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../stores/AuthContext";
import UserProfileImg from "../../assets/svg/ProtectedLayoutImages/UserProfileImage.svg";

function Profile(props) {
  const auth = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigate();
  return (
    <div className="flex">
      <img
        src={auth?.user?.photoURL ? auth?.user?.photoURL : UserProfileImg}
        alt=""
        className="mr-2"
      />
      <div className="w-2/5 flex gap-2 justify-between items-center relative hidden sm:block">
        <div>
          <p className="text-sm text-[#060B1E]">
            {auth?.user?.displayName ? auth?.user?.displayName : "Agent"}
          </p>
          <p className="text-xs text-[#86929E]">
            {auth?.user?.email ? auth?.user?.email : ""}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
