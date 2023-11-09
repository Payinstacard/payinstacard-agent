import React from "react";

function Input(props) {
  return (
    <>
      <div className="flex flex-col mb-4">
        <label
          htmlFor={props.name}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {props.label}
        </label>

        <div className="relative">
          {props?.icon && props?.icon !== "" && (
            <div className="absolute flex border border-transparent left-0 top-0 h-full w-10">
              <div className="flex items-center justify-center rounded-tl rounded-bl z-10 bg-gray-100 text-gray-600 text-lg h-full w-full">
                {props.icon}
              </div>
            </div>
          )}
          <input
            id={props.name}
            name={props.name}
            type={props?.type || "text"}
            placeholder={props.name}
            value={props.value || ""}
            onChange={props.onChange}
            onBlur={props.onBlur}
            required={props?.required || false}
            className="text-sm sm:text-base relative w-full border-0 border-b placeholder-gray-400  focus:outline-none focus-visible:outline-none py-2 pr-2 pl-12"
          />
        </div>
        {props?.error && props?.error && props.touch !== "" && (
          <span className="flex items-center font-medium tracking-wide text-xs text-red-500 mt-1 ml-1">
            {props?.error}
          </span>
        )}
      </div>
    </>
  );
}
export default Input;
