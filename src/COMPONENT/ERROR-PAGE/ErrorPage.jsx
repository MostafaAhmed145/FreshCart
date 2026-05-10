import React from "react";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="
        w-[90%]
        md:w-[60%]
        lg:w-[40%]
        bg-white
        shadow-xl
        rounded-2xl
        p-6
        flex
        flex-col
        items-center
        gap-4
      ">

        {/* Icon */}
        <div className="
          bg-red-100
          text-red-600
          w-16 h-16
          flex items-center justify-center
          rounded-full
        ">
          <i className="fa-solid fa-xmark text-2xl"></i>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800">
          Something went wrong
        </h2>

        {/* Subtitle */}
        <p className="text-gray-500 text-center">
          We couldn’t load the data. Please try again later.
        </p>

        {/* Button */}
        <button onClick={()=>{
            window.location.reload()
        }} className="
          mt-2
          bg-red-600
          hover:bg-red-700
          text-white
          px-5 py-2
          rounded-lg
          transition-all
        ">
          Retry
        </button>

      </div>

    </div>
  );
}