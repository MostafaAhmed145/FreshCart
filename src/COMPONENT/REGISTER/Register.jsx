import React, { useEffect, useRef, useState } from "react";
import RegisterCss from "./Register.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import imgLogo from "../IMAGES/freshcart-logo.svg";
import Aos from "aos";
import "aos/dist/aos.css";
import toast from "react-hot-toast";

function Register() {
  const [isLoding, setIsLoding] = useState(false);

  const navigate = useNavigate();
  const focusInput = useRef();

  useEffect(() => {
    Aos.init({ easing: "ease-in-out", duration: 1500 });
  }, []);

  useEffect(() => {
    focusInput.current?.focus();
  }, []);

  async function sendUserData(values) {
    setIsLoding(true);

    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );

      setIsLoding(false);

      setTimeout(() => {
        navigate("/Login");
      }, 500);
          toast.success("Registration Successfully ." , {duration : 3000})

    } catch (err) {
      setIsLoding(false);


          toast.error(err.response?.data?.message || "Error occurred" , {duration : 3000})

    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },

    onSubmit: sendUserData,

    validate: (values) => {
      const errors = {};

      const regxName = /^[A-Za-z]{2,18}$/;
      const regxPassword = /^[A-Za-z0-9]{6,}[@#$%^&*]{0,}$/;
      const redexPhone = /^01[0125][0-9]{8}$/;

      if (!regxName.test(values.name)) {
        errors.name =
          "The username must be between 2 and 18 letters (English only).";
      }

      if (
        !values.email.includes("@") ||
        !values.email.includes(".")
      ) {
        errors.email = "Email must contain @ and .";
      }

      if (!regxPassword.test(values.password)) {
        errors.password =
          "Password must be at least 6 characters and may include special characters.";
      }

      if (values.password !== values.rePassword) {
        errors.rePassword = "Passwords do not match.";
      }

      if (!redexPhone.test(values.phone)) {
        errors.phone = "Please enter a valid Egyptian phone number.";
      }

      return errors;
    },
  });

 



  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <form
        onSubmit={formik.handleSubmit}
        className={
          RegisterCss.myForm +
          " mb-10 drop-shadow-2xl w-[75%] border shadow-lg bg-white m-auto p-8 rounded-lg"
        }
      >
  

        <div className="mt-16 border shadow-lg p-2 rounded-lg">
          <h2 className="text-center text-blue-600 rounded-t-lg text-2xl bg-gray-100 border-t-4 p-3 border-t-blue-500">
            Registration Guidelines
          </h2>

          <ul className="p-2">
            <li className="p-2 border-b">
              Username must be 2–18 English letters only.
            </li>
            <li className="p-2 border-b">
              Password must be at least 6 characters and may include symbols.
              <br />
              Example: Pass155%
            </li>
            <li className="p-2">
              Phone must start with 01 followed by 0,1,2,5.
            </li>
          </ul>
        </div>

        <div className={RegisterCss.allInput + " space-y-12 container m-auto"}>
          <div className="text-center flex flex-col items-center p-3">
            <img src={imgLogo} alt="Logo" />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* Name */}
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium">Name</label>
              <input
                ref={focusInput}
                id="name"
                type="text"
                placeholder="Enter username"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
              {formik.errors.name && formik.touched.name && (
                <p className="text-red-600">{formik.errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
            </div>

            {/* Password */}
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
              {formik.errors.password && formik.touched.password && (
                <p className="text-red-600">{formik.errors.password}</p>
              )}
            </div>

            {/* RePassword */}
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium">RePassword</label>
              <input
                id="rePassword"
                type="password"
                placeholder="Confirm password"
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
              {formik.errors.rePassword && formik.touched.rePassword && (
                <p className="text-red-600">{formik.errors.rePassword}</p>
              )}
            </div>

            {/* Phone */}
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium">Phone</label>
              <input
                id="phone"
                type="text"
                placeholder="Enter phone number"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              />
              {formik.errors.phone && formik.touched.phone && (
                <p className="text-red-600">{formik.errors.phone}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white rounded-lg w-full flex justify-center"
          >
            {isLoding ? (
              <RotatingLines width="30" strokeColor="blue" />
            ) : (
              "Register"
            )}
          </button>

          <p className="text-center mt-3">
            Already have an account?{" "}
            <Link className="text-blue-500" to="/Login">
              Log In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;