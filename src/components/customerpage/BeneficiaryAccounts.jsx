import React, { useState } from "react";
import BeneficiaryDetailsModel from "./BeneficiaryDetailsModel";
import delete_beneficiary_icon from "../../assets/svg/delete_beneficiary.svg";
import { useSelector } from "react-redux";
import BeneficiaryItem from "./BeneficiaryItem";

function BeneficiaryAccounts(props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const customersData = useSelector(
    (state) => state?.customersData?.singleCustomerData
  );
  console.log("log data", customersData);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="m-2 sm:m-8 max-w-3xl">
      <div className="flex flex-col flex-wrap sm:flex-row justify-between items-center my-4">
        <h2 className="text-lg sm:text-xl  font-semibold mb-2 sm:mb-0">
          Benificiary
        </h2>
        <div>
          <button
            className="bg-primary text-white cursor-pointer  py-1 px-3 sm:py-2 text-sm sm:text-base rounded-lg rounded-6 sm:px-6"
            onClick={openModal}
          >
            <span className="mr-2 sm:mr-4">+</span>
            Add new Benificiary
          </button>
          {/* </button> */}
        </div>
      </div>
      <div>
        <BeneficiaryDetailsModel isOpen={isModalOpen} onClose={closeModal} />
      </div>
      <BeneficiaryItem />
      {/* {customersData?.BenificaryCollection &&
        customersData?.BenificaryCollection?.length > 0 &&
        customersData?.BenificaryCollection?.map((key, item) => (
          <BeneficiaryItem key={key} item={item} />
        ))} */}
    </div>
  );
}

export default BeneficiaryAccounts;
