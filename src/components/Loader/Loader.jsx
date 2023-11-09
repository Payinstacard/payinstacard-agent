import React from "react";
import { RotatingLines } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="fixed z-50 bg-black/[0.7] left-0 right-0 bottom-0 top-0  flex justify-center items-center">
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  );
};

export default Loader;
