import React from "react";

function Button(props) {
  return (
    <>
      <button
        type={props?.type || "button"}
        {...props?.buttonActions}
        className={`flex w-full text-base justify-center rounded-lg px-3 py-3 font-semibold leading-6 shadow-sm  ${
          props?.outlined
            ? "border-2 border-primary text-primary"
            : "bg-primary hover:bg-primarylight text-[#FFFFFF]"
        }`}
      >
        {props?.label}
      </button>
      {props?.errorMsg && props?.errorMsg != "" && (
        <span className="flex items-center justify-center mt-2 font-medium tracking-wide  text-red-500 mt-1 ml-1">
          {props?.errorMsg}
        </span>
      )}
    </>
  );
}

export default Button;
