import React from "react";
import { RotatingLines } from "react-loader-spinner";

function Loding() {
  return (
    <div
      className="
        fixed
        inset-0
        bg-black/60
        flex
        justify-center
        items-center
        z-50
      "
    >
      <RotatingLines
        visible={true}
        height="80"
        width="80"
        color="white"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
      />
    </div>
  );
}

export default Loding;