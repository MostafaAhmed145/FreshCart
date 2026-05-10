
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTopButton() {

 let [ showButton, setShowButton ] =  useState(false)

 const { pathname } = useLocation()

  function scrolToTop(){
    window.scrollTo({
      top : 0 ,
      behavior : "smooth"
    })
  }


  useEffect(()=>{
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        })
  },[ pathname ] )

  useEffect(()=>{
  

    function handleScroll(){
      if ( window.scrollY > 300 ) {
    setShowButton(true)
    }else{
        setShowButton(false)
    }
    }

  window.addEventListener( "scroll" , handleScroll)

  handleScroll()

  return () => {
    window.removeEventListener("scroll", handleScroll)
  }
  
  }, [ ] )

  


  return <>
  
        { showButton ? <button
          onClick={ scrolToTop }
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 w-[40px] h-[40px] rounded-full flex justify-center items-center shadow-lg transition duration-300"
        >
          <i className="fa-solid fa-arrow-up"></i>
        </button>  :null}
  
  </>
}
