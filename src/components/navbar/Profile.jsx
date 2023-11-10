import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../stores/AuthContext";

function Profile(props) {
  const auth = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigate();
  return (
    <>
      <div className="w-2/5 flex gap-2 justify-between items-center relative">
        <div>
          <p className="text-sm text-[#060B1E]">Admin</p>
          <p className="text-xs text-[#86929E]">Admin@gmail.com</p>
        </div>
      </div>
    </>
  );
}

export default Profile;
