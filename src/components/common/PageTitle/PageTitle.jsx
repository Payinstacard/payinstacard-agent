import React from "react";
import { Link } from "react-router-dom";

function PageTitle(props) {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center my-8">
        <h2 className="text-xl font-semibold mb-2 sm:mb-0">{props?.title}</h2>
        <div>
          {/* <button className="bg-primary text-white py-1 px-3 sm:py-2 rounded-lg rounded-6 sm:px-6"> */}
          <Link
            to={props.url}
            className="bg-primary text-white cursor-pointer  py-1 px-3 sm:py-2 text-sm sm:text-base rounded-md sm:rounded-lg rounded-6 sm:px-6"
          >
            <span className="mr-2 sm:mr-4">+</span>
            {props?.buttonText}
          </Link>
          {/* </button> */}
        </div>
      </div>
    </>
  );
}

export default PageTitle;
