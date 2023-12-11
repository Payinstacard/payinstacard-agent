import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

const Modal = ({ children, className, isOpenModal, setIsOpenModal, bgColor }) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  return (
    <>
      <div className={`fixed bg-black bg-opacity-[0.4] left-0 right-0 bottom-0 top-0 z-30`} onClick={() => { setIsOpenModal(false) }}></div>
      <div className="fixed left-1/2 top-1/2 bg-[#FAFAFA] rounded-[20px] transform -translate-x-1/2 -translate-y-1/2 z-50">
        {children}
      </div>
    </>
  );
};

export default Modal;
