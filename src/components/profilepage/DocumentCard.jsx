import React, { useState } from "react";
import watch from "../../assets/svg/view.svg";
import download from "../../assets/svg/ManualTransferSvg/DownloadIcon.svg";
import CrossBox from "../../assets/svg/crossbox.svg";

const ImagePopup = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative max-w-full max-h-full">
        <button
          className="absolute top-4 right-4 text-white hover:text-gray-300"
          onClick={onClose}
        >
          <img src={CrossBox} alt="" />
        </button>
        <img
          src={imageUrl}
          alt="Popup Image"
          className="w-[500px] h-[500px] object-contain"
        />
      </div>
    </div>
  );
};

function DocumentCard({ key, docUrl }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleWatchClick = () => {
    // Add logic to handle watching the document
    setIsPopupOpen(true);
  };
  const handlePopUpClose = () => {
    // Close the pop-up when clicking outside of the image or a close button
    setIsPopupOpen(false);
  };

  const handleDownloadClick = (docUrl) => {
    // fetch(docUrl)
    //   .then((response) => response.blob())
    //   .then((blob) => {
    //     // Create a link element
    //     const link = document.createElement("a");
    //     // Set the download attribute and create a URL from the Blob
    //     link.download = "document";
    //     link.href = window.URL.createObjectURL(blob);
    //     // Append the link to the document, trigger a click, and remove the link
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    //   })
    //   .catch((error) => console.error("Error downloading file:", error));
  };
  return (
    <div key={key}>
      <img
        src={docUrl}
        alt=""
        className="w-[200px] h-[200px] object-cover rounded"
      />
      <div className="flex justify-end items-center mt-3">
        {/* <p className="text-[#45464E]">Agreement</p> */}
        <div className="flex gap-1">
          <span onClick={handleWatchClick} className="cursor-pointer">
            <img src={watch} alt="" />
          </span>
          <span
            // onClick={() => handleDownloadClick(docUrl)}
            className="cursor-pointer"
          >
            <a href={docUrl} download target="_blank">
              <img src={download} alt="" />
            </a>
          </span>
        </div>
      </div>
      {isPopupOpen && (
        <ImagePopup imageUrl={docUrl} onClose={handlePopUpClose} />
      )}
    </div>
  );
}

export default DocumentCard;
