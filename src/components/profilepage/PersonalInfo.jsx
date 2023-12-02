import React from "react";
import editPencil from "../../assets/svg/editpencil.svg";
import { useSelector } from "react-redux";
import agentImage from "../../assets/svg/agentImage.svg";
import { getDateString } from "../../services/helper";
import greenTick from "../../assets/svg/GREENcheckbox.svg";
import DocumentCard from "./DocumentCard";

function PersonalInfo(props) {
  const agentData = useSelector((state) => state?.agentData?.agentData);
  console.log(agentData);

  // const Documents = [
  //   "https://payinstacard-admin.s3.ap-south-1.amazonaws.com/agents/1700200774199-WhatsApp%20Image%202023-11-17%20at%2011.23.17%20AM%281%29.png",
  //   "https://payinstacard-admin.s3.ap-south-1.amazonaws.com/agents/1700200774221-WhatsApp%20Image%202023-11-17%20at%2011.23.17%20AM.png",
  //   "https://payinstacard-admin.s3.ap-south-1.amazonaws.com/agents/1700200774199-WhatsApp%20Image%202023-11-17%20at%2011.23.17%20AM%281%29.png",
  //   "https://payinstacard-admin.s3.ap-south-1.amazonaws.com/agents/1700200774221-WhatsApp%20Image%202023-11-17%20at%2011.23.17%20AM.png",
  //   "https://payinstacard-admin.s3.ap-south-1.amazonaws.com/agents/1700200774199-WhatsApp%20Image%202023-11-17%20at%2011.23.17%20AM%281%29.png",
  //   "https://payinstacard-admin.s3.ap-south-1.amazonaws.com/agents/1700200774221-WhatsApp%20Image%202023-11-17%20at%2011.23.17%20AM.png",
  // ];

  //   const Documents = [
  //     "https://www.kasandbox.org/programming-images/avatars/spunky-sam.png",
  //     "https://www.kasandbox.org/programming-images/avatars/spunky-sam-green.png",
  //     "https://www.kasandbox.org/programming-images/avatars/purple-pi.png",
  //     "https://www.kasandbox.org/programming-images/avatars/purple-pi-teal.png",
  //     "https://www.kasandbox.org/programming-images/avatars/purple-pi-pink.png",
  //   ];

  return (
    <div className="p-6">
      <h2 className="text-[20px] text-[#45464E] mb-6 min-[480px]:mb-12">
        Personal Information
      </h2>
      {/**this div container for personal information */}
      <div className="md:w-[80%] mx-auto mb-8 md:mb-16">
        {/**agent image sections */}
        <div className="min-[480px]:flex mb-6">
          <div className="mr-12 mb-6 min-[480px]:mb-0">
            {agentData?.kyc_details?.aadhaarVerified ? (
              <img
                src={`data:image/png;base64,${agentData?.kyc_details.Aadhar_Details.photo_link}`}
                alt="agnet_pic"
                // className="inline-block h-28 w-28 rounded-full ring-2 ring-white"
                className="w-[200px] max-h-[200px] object-cover rounded-lg"
              />
            ) : (
              <img
                src={agentImage}
                alt="agnet_pic"
                className="w-[200px] h-[200px]"
              />
            )}
          </div>
          <div className="flex flex-col justify-center gap-4">
            <p className="text-[20px] text-[#00006B] font-bold">
              Agent ID ({agentData?.Customer_data?.Agent_id})
            </p>
            <button className="flex bg-[#00006B] px-8 py-3 gap-3 items-center rounded self-start">
              <img src={editPencil} alt="" />
              <span className="text-white">Edit Profile Picture</span>
            </button>
          </div>
        </div>
        {/**agent details sections */}
        <div>
          <div className="w-[90%] md:flex  md:justify-between">
            <div className="md:w-[45%] mb-4 sm:mb-0">
              <div>
                <p className="text-[14px] text-[#5E6366] mb-1">Full Name</p>
                <div className="bg-[#EFF1F9] px-2 py-3 rounded mb-4">
                  {agentData?.Customer_data?.FullName}
                </div>
              </div>
              <div>
                <p className="text-[14px] text-[#5E6366] mb-1">Email Address</p>
                <div className="bg-[#EFF1F9] px-2 py-3 rounded mb-4">
                  {agentData?.Email}
                </div>
              </div>
              <div>
                <p className="text-[14px] text-[#5E6366] mb-1">Business Name</p>
                <div className="bg-[#EFF1F9] px-2 py-3 rounded">
                  {agentData?.Customer_data?.Business_Name}
                </div>
              </div>
            </div>
            <div className="md:w-[45%]">
              <div>
                <p className="text-[14px] text-[#5E6366] mb-1">Mobile Number</p>
                <div className="bg-[#EFF1F9] px-2 py-3 rounded mb-4">
                  {agentData?.mobile}
                </div>
              </div>
              <div>
                <p className="text-[14px] text-[#5E6366] mb-1">
                  Date of Onboarding
                </p>
                <div className="bg-[#EFF1F9] px-2 py-3 rounded mb-4">
                  {getDateString(agentData?.created_At)}
                </div>
              </div>
              <div>
                <p className="text-[14px] text-[#5E6366] mb-1">Geo Location</p>
                <div className="bg-[#EFF1F9] px-2 py-3 rounded ">
                  {agentData?.Customer_data?.State}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/**This div container for kyc information */}
      <h2 className="text-[20px] text-[#45464E] mb-7">KYC Information</h2>
      <div className="md:w-[80%] mx-auto mb-2 md:mb-16">
        <div>
          <div className="w-[90%] md:flex  md:justify-between ">
            <div className="md:w-[45%] mb-4 md:mb-0">
              <div>
                <p className="text-[14px] text-[#5E6366] mb-1">Aadhar Number</p>
                <div className="bg-[#EFF1F9] px-2 py-3 rounded">
                  {agentData?.kyc_details?.Aadhar_Details?.aadhar}
                </div>
              </div>
              {agentData?.kyc_details?.aadhaarVerified === true ? (
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[14px] text-[#5E6366]">Verified</span>
                  <span>
                    <img src={greenTick} alt="" />
                  </span>
                </div>
              ) : (
                <></>
              )}
              <div className="mt-4">
                <p className="text-[14px] text-[#5E6366] mb-1">Date Of Birth</p>
                <div className="bg-[#EFF1F9] px-2 py-3 rounded">
                  {agentData?.kyc_details?.Aadhar_Details?.dob}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-[14px] text-[#5E6366] mb-1">PAN Card</p>
                <div className="bg-[#EFF1F9] px-2 py-3 rounded">
                  {agentData?.kyc_details?.Pan_details?.pan}
                </div>
                {agentData?.kyc_details?._PANVerified === true ? (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[14px] text-[#5E6366]">Verified</span>
                    <span>
                      <img src={greenTick} alt="" />
                    </span>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className="md:w-[45%] flex flex-col justify-between">
              <div>
                <p className="text-[14px] text-[#5E6366] mb-1">
                  Name On Aadhar
                </p>
                <div className="bg-[#EFF1F9]  px-2 py-3 rounded">
                  {agentData?.kyc_details?.Aadhar_Details?.name}
                </div>
              </div>

              <div className="mt-4 ">
                <p className="text-[14px] text-[#5E6366] mb-1">
                  Name On PAN Card
                </p>
                <div className="bg-[#EFF1F9]  px-2 py-3 rounded">
                  {agentData?.kyc_details?.Pan_details?.registered_name}
                </div>
                {agentData?.kyc_details?._PANVerified === true ? (
                  <div className="flex items-center gap-2 mt-1 invisible">
                    <span className="text-[14px] text-[#5E6366]">Verified</span>
                    <span>
                      <img src={greenTick} alt="" />
                    </span>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/**This div container for Agent Commission Infromation */}
      <h2 className="text-[20px] text-[#45464E] mb-7">
        Agent Commission Infromation
      </h2>
      <div className="md:w-[80%] mx-auto  mb-6 md:mb-16">
        <div>
          <div className="w-[90%] md:flex md:justify-between">
            <div className="md:w-[45%] mb-4 md:mb-0">
              <div>
                <p className="text-[14px] text-[#5E6366] mb-1">
                  Base commission
                </p>
                <div className="bg-[#EFF1F9] px-2 py-3 rounded">
                  {agentData?.Commission?.BasePersentage}
                </div>
              </div>
            </div>
            <div className="md:w-[45%] mb-3 md:mb-0">
              <div>
                <p className="text-[14px] text-[#5E6366] mb-1">
                  Markup  Commission
                </p>
                <div className="bg-[#EFF1F9] px-2 py-3 rounded">
                  {agentData?.Commission?.markupPercentage}
                </div>
                <p className="text-[14px] text-[#FFC300]">
                  Note: Max limit is 0.7%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/**This div container for Document*/}
      <h2 className="text-[20px] text-[#45464E] mb-5">Documents </h2>
      <div className="md:w-[80%] mx-auto ">
        <div className="flex flex-wrap gap-8 md:gap-16">
          {agentData?.Documents.map((docUrl, index) => (
            <DocumentCard key={"doc" + index} docUrl={docUrl} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;
