import React, { useState } from "react";
import Modal from "./Modal";
// import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { CgSpinner } from "react-icons/cg";
import { toast, ToastContainer } from "react-toastify";
// import aadhaarAvatar from "../../assets/aadhaarAvatar.svg";
// import { Radio } from "@material-tailwind/react";
import _ from "lodash";
// import { APIUrls } from "../../baseUrl/BaseUrl";
import { useAuth } from "../../stores/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { payActions } from "../../stores/IndexRedux";
// import { Rating } from "@material-tailwind/react";

const FeedBackModal = ({ isOpenModal, setIsOpenModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstOpen, setIsFirstOpen] = useState(true);
  const [isSecondOpen, setIsSecondOpen] = useState(false);
  const [isThirdOpen, setIsThirdOpen] = useState(false);
  const { getAccessToken, currentUser } = useAuth();
  const [paymentType, setPaymentType] = useState("Bank");
  const dispatch = useDispatch();
  const { beneficiaryRefetch } = useSelector((state) => state.pay);
  const [Ratings, setrating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    reset,
  } = useForm();
  const addFeedback = async () => {
    console.log("hello");

    setIsLoading(true);

    if (Ratings === 0) {
      setIsLoading(false);
      return toast.error("Please Give us atlest one Star");
    }

    if (_.isEmpty(comment)) {
      setIsLoading(false);
      return toast.error("Please write comment");
    }

    const data = {
      ratings: Ratings.toString(),
      comment,
    };

    try {
      const token = await getAccessToken();
      // const response = await fetch(APIUrls.set_feedback, {
      //   method: "POST",
      //   body: JSON.stringify(data),
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //     "Content-Type": "application/json",
      //   },
      // });
      // setIsLoading(false);
      // const responseJson = await response.json();
      // if (_.isEmpty(responseJson)) {
      //   return toast.error("Something went wrong !!");
      // }

      // if (responseJson?.code === 200) {
      //   const message = responseJson.response.message;
      //   toast.success("Thank you for your feedback !");
      //   setIsOpenModal(false);
      //   return;
      // }

      // if (responseJson?.code === 400) {
      //   const message = responseJson.response.message;
      //   return toast.error("Something went Wrong ,Try again later !");
      // }

      // console.log(responseJson);
    } catch (error) {
      setIsLoading(false);
      console.log(error);

      toast.error("Something went Wrong !");
    }
  };

  console.log(isFirstOpen, isSecondOpen, isThirdOpen);

  const handleGoBack = () => {
    if (isThirdOpen) {
      setIsThirdOpen(false);
      setIsSecondOpen(true);
    } else if (isSecondOpen) {
      setIsSecondOpen(false);
      setIsThirdOpen(false);
      setIsFirstOpen(true);
    }
  };

  const getOTPHandler = (data, event) => {
    setIsFirstOpen(false);
    setIsThirdOpen(false);
    setIsSecondOpen(true);
  };

  const submitOTP = (data, event) => {
    setIsFirstOpen(false);
    setIsSecondOpen(false);
    setIsThirdOpen(true);
  };
  return (
    <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal}>
      <div className="min-w-[25rem] xs:min-w-[30rem] sm:min-w-[35rem] min-h-[20rem] py-[2rem] px-[2rem] flex flex-col gap-[2rem] relative max-h-[85vh] overflow-y-auto">
        {/* <Icon
          icon="radix-icons:cross-circled"
          className="absolute right-[2rem] top-[1rem] text-[1.5rem] cursor-pointer"
          onClick={() => {
            setIsOpenModal(false);
          }}
        /> */}

        <div className="pb-[1rem] border-b border-black/[0.2] flex flex-row gap-[1rem] items-center">
          {/* {isSecondOpen || isThirdOpen ? (
            <Icon
              icon="octicon:arrow-left-16"
              className="text-[1.5rem] cursor-pointer"
              onClick={() => {
                handleGoBack();
              }}
            />
          ) : null} */}
        </div>

        <div>
          <p className="text-[#2F2F2F] font-bold text-[1.6rem] flex">
            Give Us Feedback
          </p>
          <p className="mt-3 text-[#2F2F2F] font-bold text-[1rem]">
            Help us make our next level website better?
          </p>

          <div className="mt-5">
            <p className="text-[#8A8A8A] font-bold text-[0.8rem]">
              {" "}
              How much good we are
            </p>
          </div>

          <div className="mt-1">
            {/* <Rating
              value={Ratings}
              ratedColor="blue"
              unratedColor="#00006B"
              onChange={(data) => setrating(data)}
            /> */}
            rating here
          </div>

          <div className="mt-5">
            <p className="mb-3 text-[#8A8A8A] font-bold text-[0.8rem]">
              Any Comments or Suggestions?
            </p>
            <textarea
              onChange={(e) => setComment(e.target.value)}
              id="message"
              rows="4"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
            ></textarea>
          </div>

          <div className="mt-5 flex justify-center">
            <button
              className={` rounded-[30px] text-white py-[0.5rem] font-[800] flex flex-row items-center w-[20rem] justify-center gap-[0.5rem] ${
                isLoading ? "bg-[#00006B]/[0.5]" : "bg-[#00006B]"
              }`}
              disabled={isLoading}
              onClick={() => addFeedback()}
            >
              Submit
              {isLoading && (
                <CgSpinner size={20} className="mt-1 animate-spin" />
              )}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FeedBackModal;
