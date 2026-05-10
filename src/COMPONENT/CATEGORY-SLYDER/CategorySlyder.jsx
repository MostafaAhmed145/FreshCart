import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";
import Loding from "../LODING/Loding";
import LazyLoad from "react-lazyload";
import ErrorPage from "../ERROR-PAGE/ErrorPage";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";
// import PrevArrow from "./PrevArrow";

function CategorySlyder() {
  function getImageCategry() {
    return axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
  }

  let { data, isError, isLoading } = useQuery(
    "getImageCategry",
    getImageCategry
  );

  // حماية الداتا
  const categories = data?.data?.data;

  if (isLoading) {
    return <Loding />;
  }

  if ( isError) return <ErrorPage />

  var settings = {
    // dots: true,
    infinite: true,
    arrows : true ,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,

    responsive : [
      {
        breakpoint : 1024 , 
        settings : {
          slidesToShow : 4
        }
      } ,

       {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
      },
    },

    {
      breakpoint: 640,
      settings: {
        slidesToShow: 2,
      },
    },

    ]
  };

  return (
    <div className="mx-auto mt-6 container text-center m-auto">
      <Slider
        className="m-auto   container p-3"
        {...settings}
      >
        {categories?.map((categry, idx) => (
          <div className="px-2" key={categry._id || idx}>
            <div className=" group relative overflow-hidden aspect-square  rounded-full shadow-md hover:shadow-2xl">
            <LazyLoad className=" h-full w-full border-blue-500 " offset={100} once >
            <img
              className="  w-full h-full rounded-full   transition-all duration-300 group-hover:scale-[1.07] "
              src={categry.image}
              alt={categry.name}
            />


          <div className=" absolute bg-gradient-to-t from-black/80 to-black/20  opacity-0 group-hover:opacity-100 transform cursor-pointer transition-all duration-300 top-0 bottom-0 left-0 right-0 flex justify-center items-center rounded-full">
               <h2 className=" font-bold text-[20px] text-white">{categry.name}</h2>
          </div>



         


          </LazyLoad>


          </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CategorySlyder;