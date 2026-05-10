
// import axios from 'axios';
import React from 'react'
import Slider from "react-slick";
import Loding from '../LODING/Loding';
// import { useQuery } from 'react-query';


function SlyderProduct() {

        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay : true
        };

    return <>



     <div className="container m-auto mt-20 grid lg:grid-cols-3 sm:grid-cols-3  p-2 mb-10 gap-3">

                <div className='lg:col-span-2 sm:col-span-3   overflow-hidden'>
                <Slider className=" m-auto rounded-2xl w-full o  " {...settings}>

                <img className=' mb-1 w-full h-[320px] rounded-lg ' src={require("../IMAGES/slider-image-1.jpeg")} alt="" />
                <img className=' mb-1 w-full h-[320px] rounded-lg ' src={require("../IMAGES/slider-2.jpeg")} alt="" />
                <img className=' mb-1 w-full h-[320px] rounded-lg ' src={require("../IMAGES/slider-image-2.jpeg")} alt="" />
                <img className=' mb-1 w-full h-[320px] rounded-lg ' src={require("../IMAGES/slider-image-3.jpeg")} alt="" />


                </Slider>
                </div>

                    <div className='lg:col-span-1 md:col-span-3 sm:col-span-3'>
                        <figure className=' relative '>
                        <img className=' mb-1 rounded-lg w-full ' src={require("../IMAGES/grocery-banner-2.jpeg")} alt="Freshly baked buns" />
                        <figcaption className=' absolute p-5 font-bold  top-2'>
                            <h2 className=' capitalize font-serif text-green-500'>Freshly baked buns</h2>
                            <p className=' text-slate-400 font-serif'>get upto 25% off</p>
                            <button className=' p-1 mt-2 rounded-lg text-white bg-slate-700 font-serif font-normal transition-all duration-300 hover:bg-blue-600'>shop now</button>
                        </figcaption>
                        </figure>
                        <div>
                            <figure className=' relative '>
                                <img className=' mt-1 rounded-lg w-full' src={require("../IMAGES/grocery-banner.png")} alt="Fruits $ vegetables" />
                                <figcaption className=' absolute p-5 font-bold  top-2'>
                            <h2 className=' capitalize font-serif text-green-500'>Fruits $ vegetables</h2>
                            <p className=' text-slate-400 font-serif'>get upto 30% off</p>
                            <button className=' p-1 mt-2 rounded-lg text-white bg-slate-700 font-serif font-normal transition-colors duration-300 hover:bg-blue-600'>shop now</button>
                        </figcaption>
                            </figure>
                        </div>
                    </div>
            </div>


            
            
    
    </>
}

export default SlyderProduct
