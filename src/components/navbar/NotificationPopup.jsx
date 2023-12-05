import React, { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useSelector } from "react-redux";
import { createImageFromInitials, getRandomColor } from "./LetterPicture";
import NotificationCard from "./NotificationCard";

function NotificationPopup(props) {
  const [activeTab, setActiveTab] = useState("all");
  const { agentData } = useSelector((state) => state.agentData);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const dummyNotifications = [
    {
      title: "PayinstaCard",
      message:
        "Transaction successful for Manikantaputta amount of ₹5000. Click here to download invoice.",
      created_at: "2023-11-28T13:15:00.000Z",
      btn_flag: true,
      read: false,
    },
    {
      title: "Your App",
      message: "New update available. Click here to install version 2.0.",
      created_at: "2023-11-28T14:30:00.000Z",
      btn_flag: true,
      read: false,
    },
    {
      title: "Social Media",
      message:
        "You have new friend requests. Connect with others in your network.",
      created_at: "2023-11-28T15:45:00.000Z",
      btn_flag: false,
      read: true,
    },
    {
      title: "Newsletter",
      message: "Check out our latest newsletter for exciting updates and news.",
      created_at: "2023-11-28T16:00:00.000Z",
      btn_flag: false,
      read: true,
    },
    {
      title: "Event Reminder",
      message:
        "Reminder: Attend the upcoming event on December 5th at 6:00 PM.",
      created_at: "2023-11-29T09:00:00.000Z",
      btn_flag: true,
      read: true,
    },
    {
      title: "Promotions",
      message: "Exclusive holiday discounts! Shop now and save up to 50%.",
      created_at: "2023-11-29T10:30:00.000Z",
      btn_flag: false,
      read: true,
    },
    {
      title: "Weather Alert",
      message: "Severe weather warning in your area. Stay safe and prepared.",
      created_at: "2023-11-29T12:15:00.000Z",
      btn_flag: false,
      read: false,
    },
    {
      title: "Fitness App",
      message: "Congratulations! You've achieved your weekly fitness goal.",
      created_at: "2023-11-29T14:00:00.000Z",
      btn_flag: true,
      read: true,
    },
    {
      title: "Tech News",
      message:
        "Read the latest tech news and stay updated with the industry trends.",
      created_at: "2023-11-30T11:45:00.000Z",
      btn_flag: false,
      read: false,
    },
    {
      title: "Job Opportunity",
      message: "Exciting job opportunity matching your skills. Apply now!",
      created_at: "2023-11-30T15:30:00.000Z",
      btn_flag: true,
      read: false,
    },
  ];
  const todayNotifications = [
    {
      title: "Your App",
      message: "New update available. Click here to install version 2.0.",
      created_at: "2023-11-28T14:30:00.000Z",
      btn_flag: true,
      read: false,
    },
    {
      title: "Social Media",
      message:
        "You have new friend requests. Connect with others in your network.",
      created_at: "2023-11-28T15:45:00.000Z",
      btn_flag: false,
      read: true,
    },
    {
      title: "Newsletter",
      message: "Check out our latest newsletter for exciting updates and news.",
      created_at: "2023-11-28T16:00:00.000Z",
      btn_flag: false,
      read: true,
    },
  ];
  const oldNotifications = [
    {
      title: "Newsletter",
      message: "Check out our latest newsletter for exciting updates and news.",
      created_at: "2023-11-28T16:00:00.000Z",
      btn_flag: false,
      read: true,
    },
    {
      title: "Event Reminder",
      message:
        "Reminder: Attend the upcoming event on December 5th at 6:00 PM.",
      created_at: "2023-11-29T09:00:00.000Z",
      btn_flag: true,
      read: true,
    },
    {
      title: "Promotions",
      message: "Exclusive holiday discounts! Shop now and save up to 50%.",
      created_at: "2023-11-29T10:30:00.000Z",
      btn_flag: false,
      read: true,
    },
    {
      title: "Weather Alert",
      message: "Severe weather warning in your area. Stay safe and prepared.",
      created_at: "2023-11-29T12:15:00.000Z",
      btn_flag: false,
      read: false,
    },
    {
      title: "Fitness App",
      message: "Congratulations! You've achieved your weekly fitness goal.",
      created_at: "2023-11-29T14:00:00.000Z",
      btn_flag: true,
      read: true,
    },
  ];

  return (
    <div className="absolute top-[65px] sm:top-[105px] right-[0px] right-[8px] md:right-[150px] z-10 sm:w-[400px] h-[523px] shadow-lg bg-white rounded-[8px] overflow-auto">
      {/* header section */}
      <div className="flex justify-between p-4 pl-6 shadow-md  ">
        <div className="flex items-center gap-2">
          <p className="font-bold">Notifications</p>
          <p className="bg-[#00006B] text-white px-1 text-center rounded-full">
            15
          </p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-[12px] text-[#00006B]">Mark all as read</p>

          <button>
            <HiOutlineDotsVertical className="text-[#464748]" />
          </button>
        </div>
      </div>

      {/* tab sections */}
      <div>
        <div className="tab-buttons p-4 pl-6 pb-[6px] border-b border-[#DADADA]">
          <button
            className={`${
              activeTab === "all"
                ? "text-[#00006B] content_border"
                : "text-[#8F8F8F]"
            } mr-6 font-bold pb-[6px]`}
            onClick={() => handleTabClick("all")}
          >
            All
          </button>
          <button
            className={`${
              activeTab === "today"
                ? "text-[#00006B] content_border"
                : "text-[#8F8F8F]"
            } mr-6 font-bold pb-[6px]  `}
            onClick={() => handleTabClick("today")}
          >
            Today
          </button>
          <button
            className={`${
              activeTab === "oldest"
                ? "text-[#00006B] content_border"
                : "text-[#8F8F8F]"
            }  font-bold pb-[6px]  `}
            onClick={() => handleTabClick("oldest")}
          >
            Oldest
          </button>
        </div>
      </div>
      {/* tab content */}
      <div className="">
        {activeTab === "all" &&
          dummyNotifications.map((notification) => (
            <NotificationCard notification={notification} />
          ))}
        {activeTab === "today" &&
          todayNotifications.map((notification) => (
            <NotificationCard notification={notification} />
          ))}

        {activeTab === "oldest" &&
          oldNotifications.map((notification) => (
            <NotificationCard notification={notification} />
          ))}
      </div>
    </div>
  );
}

export default NotificationPopup;
