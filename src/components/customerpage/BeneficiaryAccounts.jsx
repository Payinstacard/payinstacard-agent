import React, { useState } from "react";
import BeneficiaryDetailsModel from "./BeneficiaryDetailsModel";
import delete_beneficiary_icon from "../../assets/svg/delete_beneficiary.svg";
import { useSelector } from "react-redux";
import BeneficiaryItem from "./BeneficiaryItem";
import ReactPaginate from "react-paginate";
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";

function BeneficiaryAccounts(props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const customersData = useSelector(
    (state) => state?.customersData?.singleCustomerData
  );
  // console.log("log data", customersData);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  //pagination logic

  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = customersData?.BenificaryCollection?.slice(
    itemOffset,
    endOffset
  );
  const pageCount = Math.ceil(
    customersData?.BenificaryCollection?.length / itemsPerPage
  );

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) %
      customersData?.BenificaryCollection?.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };

  return (
    <div className="m-2 sm:m-8 max-w-3xl">
      <div className="flex flex-col flex-wrap sm:flex-row justify-between items-center my-4">
        <h2 className="text-lg sm:text-xl  font-semibold mb-2 sm:mb-0">
          Benificiary
        </h2>
        <div>
          <button
            className="bg-primary text-white cursor-pointer  py-1.5 px-3 sm:py-2 text-sm sm:text-base rounded-lg rounded-6 sm:px-6"
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
      {/* <BeneficiaryItem /> */}
      {currentItems &&
        currentItems?.length > 0 &&
        currentItems?.map((item, key) => (
          <BeneficiaryItem item={item} key={key} />
        ))}
      <ReactPaginate
        breakLabel="..."
        nextLabel={<GrFormNext className="text-2xl" />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={<GrFormPrevious className="text-2xl" />}
        renderOnZeroPageCount={null}
        containerClassName={
          "flex gap-4 justify-center custom-box-shadow rounded-lg px-2 py-3 mt-[-10px]"
        }
        pageLinkClassName={"px-2 py-1"}
        activeLinkClassName={"bg-[#00006B] text-white rounded"}
      />
    </div>
  );
}

export default BeneficiaryAccounts;
