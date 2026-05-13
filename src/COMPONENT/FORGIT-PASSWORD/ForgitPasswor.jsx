import axios from "axios"
import { useFormik } from "formik"
import React, { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { RotatingLines } from "react-loader-spinner"
import { Link, useNavigate } from "react-router-dom"

function ForgotPassword() {
  const emailRef = useRef(null)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus()
    }
  }, [])

  async function handleForgotPassword(values) {
    try {
      setIsLoading(true)

      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        {
          email: values.email,
        }
      )

      toast.success(data.message || "Check your email")

      setTimeout(() => {
        navigate("/PasswordReset/VerifyResetCode")
      }, 1200)

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Something went wrong"
      )
    } finally {
      setIsLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    onSubmit: handleForgotPassword,

    validate: (values) => {
      const errors = {}

      if (!values.email) {
        errors.email = "Email is required"
      } else if (
        !values.email.includes("@") ||
        !values.email.includes(".")
      ) {
        errors.email = "Invalid email format"
      }

      return errors
    },
  })

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 mt-12">
      <div className="bg-white p-8 rounded-lg shadow-lg lg:w-[50%] sm:w-[90%]">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Forgot Password
        </h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>

            <input
              ref={emailRef}
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />

            {formik.errors.email && formik.touched.email && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.email}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-blue-500 text-white flex justify-center items-center font-semibold rounded-lg hover:bg-blue-600"
          >
            {isLoading ? (
              <RotatingLines
                strokeColor="white"
                width="25"
                visible={true}
              />
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Or{" "}
          <Link to="/Login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ForgotPassword