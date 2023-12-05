import React from "react";
import { createImageFromInitials, getRandomColor } from "./LetterPicture";
import { useSelector } from "react-redux";

function NotificationCard({ notification }) {
  console.log(notification);

  const { agentData } = useSelector((state) => state.agentData);

  function timeAgo(created_at) {
    const timestamp = new Date(created_at).getTime();
    const now = new Date().getTime();
    const differenceInSeconds = Math.floor((now - timestamp) / 1000);

    if (differenceInSeconds < 60) {
      return `${differenceInSeconds} seconds ago`;
    } else if (differenceInSeconds < 3600) {
      const minutes = Math.floor(differenceInSeconds / 60);
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else if (differenceInSeconds < 86400) {
      const hours = Math.floor(differenceInSeconds / 3600);
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else {
      const days = Math.floor(differenceInSeconds / 86400);
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    }
  }

  return (
    <div
      className={`flex gap-2 p-4 pl-6 ${
        notification.read ? "bg-white" : "bg-[#FAFBFF]"
      }  border-b border-[#DADADA]`}
    >
      <div className="min-w-fit">
        {agentData?.kyc_details?.Aadhar_Details?.photo_link ? (
          <img
            src={`data:image/png;base64,${agentData?.kyc_details.Aadhar_Details.photo_link}`}
            className="w-[40px] h-[40px] rounded-[50%] object-cover "
          />
        ) : (
          <img
            src={createImageFromInitials(
              40,
              agentData?.Customer_data?.FullName,
              getRandomColor()
            )}
            className="rounded-[50%] "
          />
        )}
      </div>
      <div className="text-[12px] ">
        <p className="font-bold">{notification.title}</p>
        <p className="mt-1">{notification.message}</p>
        {notification?.btn_flag && (
          <div className="mt-2">
            <button className="px-3 py-1 bg-[#00006B] rounded-lg text-white text-[14px] mr-2">
              Accept
            </button>
            <button className="px-3 py-1 bg-white text-[#696F8C] border rounded-lg  text-[14px]">
              Deny
            </button>
          </div>
        )}
        <p className="text-[#696F8C] mt-2">
          {timeAgo(notification.created_at)}
        </p>
      </div>
    </div>
  );
}

export default NotificationCard;
