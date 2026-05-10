

import React from 'react'

export default function NextArrow( props) {
    const { onClick } = props
  return <>
   

   <button onClick={ onClick } className=' aspect-square bg-gray-500 p-2 rounded-full text-white flex justify-center items-center absolute top-1/2  right-0 -translate-y-1/2'>
       <i className="fa-solid fa-arrow-right"></i>
   </button>
  
  </>
}
