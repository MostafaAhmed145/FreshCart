

import React, {  useEffect, useRef, useState } from 'react'


import { RotatingLines } from 'react-loader-spinner'
import {  useFormik } from 'formik'
import axios from 'axios'
import LoginCss from "./Login.module.css"
import { Link, useNavigate } from 'react-router-dom'
import imgLogo from "../IMAGES/freshcart-logo.svg";
import jwt_decode, { jwtDecode } from 'jwt-decode';
import Aos from 'aos'
import "aos/dist/aos.css"
import toast from 'react-hot-toast'


function Login() {


  const [isLoding, setisLoding] = useState(false)



  useEffect( ()=>{
          Aos.init({ easing: 'ease-in-out', duration : 1500})
  } , [])

 

  let myNavigate = useNavigate()

  let focusInput = useRef()

  useEffect( ()=>{
    focusInput.current.focus()
  } , [] )
  





  async function sendUserData( values ) {

    setisLoding(true)
    await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin" , values )
    .then( (res)=>{
      setisLoding(false)
            if ( res.data.token ) {
              localStorage.setItem("tkn", res.data.token);
              
            } else {
              toast.error("We're sorry, but something went wrong. Please try again shortly")
            }
            
            
            setTimeout(() => {
              myNavigate("/Home")
            }, 500);
                      toast.success("Login Successfully ." , {duration : 3000})
            
      } ).catch( (err)=>{
        setisLoding(false)



                    toast.error(err.response?.data?.message || "Error occurred" , {duration : 3000})
          
      } )

  }
    



            const myFormik = useFormik( {
              initialValues : {
                
                email: "",
                
                password: "",

              }  ,

              onSubmit : sendUserData ,
              
              
                

              validate : function(values){

                const error = {}
                
                let regxPassword = /^[A-Za-z0-9]{6,}[@#$%^&*]{0,}$/




                if (values.email.includes("@") !== true && values.email.includes(".") !== true) {
                  error.email = " The email must contain '@' and also include the letter `.` "
                }

                if (regxPassword.test(values.password) === false) {
                  error.password = "The password must be at least 6 characters long and must end with one of the following special characters: @, #, $, %, ^, &, *."
                }



                return error
              }
            } )




    return <>

<div className=' bg-gray-100 min-h-screen flex justify-center items-center'>
  
<form  onSubmit={myFormik.handleSubmit}  className={ LoginCss.myForm + ' mt-24 mb-10 drop-shadow-lg w-[80%] bg-white m-auto p-8 rounded-lg border' }>

      <div className={LoginCss.allInput + " space-y-12 container m-auto "}>

        <div className="  w-auto">
        <div className=' text-center  flex flex-col items-center p-3'>
            <img src={imgLogo} alt="Logo" />
          </div>
          <div className="imgLogin w-[50%] m-auto">
    <img src={ require("../IMAGES/58703103-486b-47aa-942d-1e622dcb529a.jpg")} className=' w-full' alt="" />
  </div>
            <div className="sm:col-span-3">
              <label  htmlFor="email" className="block text-sm/6 font-medium ">
              Email address
              </label>
              <div className="mt-2">
                <input
                ref={ focusInput }
                  value={myFormik.values.email}
                  onChange={myFormik.handleChange}
                  id="email"
                  type="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                              {myFormik.errors.email && myFormik.touched.email ? <div className="text-red-600">{myFormik.errors.email}</div>: ""}
              </div>
            </div>

            <div className="sm:col-span-3 mt-2">
              <label  htmlFor="password" className="block text-sm/6 font-medium  ">
              Password
              </label>
              <div className="mt-2">
                <input
                value={myFormik.values.password}
                  onChange={myFormik.handleChange}
                  id="password"
                  type="password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
                {myFormik.errors.password && myFormik.touched.password ? <div className=' text-red-600'>{myFormik.errors.password}</div> : ""}
              </div>
            </div>

            
          <button type='submit' className=' py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-5 w-full capitalize flex justify-center items-center'> 
            {isLoding ?  <RotatingLines
                visible={true}
                height="30"
                width="30"
                color=""
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                strokeColor = "blue"
                wrapperStyle={{}}
                wrapperClass=""
                /> : "login" }  </button>
          </div>
          
          <div className=' mt-2 flex flex-col lg:flex-row justify-between '>
            <p> Don't have an account ? <Link to={"/Register"} className=' text-blue-500'>Sign up</Link></p>
            <Link
                  to={"/PasswordReset"}
                  className="text-red-500  font-semibold text-sm hover:text-red-700 transition duration-300 ease-in-out"
                >
                  Forgot Password
                </Link>  
              </div>

        </div>
    </form>
</div>
    
    </>
}

export default Login