import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import Loding from '../LODING/Loding'
import ErrorPage from '../ERROR-PAGE/ErrorPage'
import { jwtDecode } from 'jwt-decode'


function Order() {

  // حماية من الكراش لو مفيش token
  let token = localStorage.getItem("tkn")
  let getUserId = token ? jwtDecode(token) : null


  async function getAllOrders() {
    return await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${getUserId?.id}`
    )
  }

  let { data, isLoading, isError } = useQuery(
    "getAllOrders",
    getAllOrders,
    {
      enabled: !!getUserId
    }
  )


  if (isLoading) {
    return <Loding />
  }

  if (isError) {
    return <ErrorPage />
  }

  return (
    <>
      <div className="container py-20 m-auto px-6">

        <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-6'>
             {data?.data.length  === 0 ? <p className='shadow-lg text-black mt-11 p-6 border'>No orders found
              </p> : <>
             
             {data?.data?.map((order, idx) => (
            <div key={idx} className='bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200 hover:scale-[1.01] transition-all duration-300'>


              {/* user info */}
<div className="p-5 rounded-2xl border border-gray-200 mt-4 w-[95%] m-auto bg-white shadow-sm">

  {/* title */}
  <div className="border-b pb-3 mb-4">
    <h2 className="text-lg font-bold text-gray-800">
      Customer Information
    </h2>
  </div>

  {/* content */}
  <div className="flex flex-col gap-3">

    {/* name */}
    <div className="flex justify-between items-center bg-green-50 border border-green-200 p-3 rounded-xl">

      <span className="font-medium text-gray-700">
        Name
      </span>

      <span className="font-bold text-green-600">
        {order.user.name}
      </span>

    </div>

    {/* email */}
    <div className="flex justify-between items-center bg-gray-100 p-3 rounded-xl">

      <span className="font-medium text-gray-700">
        Email
      </span>

      <span className="text-gray-800 font-semibold break-all">
        {order.user.email}
      </span>

    </div>

    {/* phone */}
    <div className="flex justify-between items-center bg-gray-100 p-3 rounded-xl">

      <span className="font-medium text-gray-700">
        Phone
      </span>

      <span className="text-gray-800 font-semibold">
        {order.user.phone}
      </span>

    </div>

  </div>

</div>

            {/* shipping */}
<div className="p-5 rounded-2xl border border-gray-200 mt-3 mb-1 w-[95%] m-auto bg-white shadow-sm">

  {/* title */}
  <div className="border-b pb-3 mb-4">
    <h3 className='text-lg font-bold text-gray-800'>
      Shipping Information
    </h3>
  </div>

  {/* content */}
  <div className="flex flex-col gap-3">

    {/* city */}
    <div className="flex justify-between items-center bg-gray-100 p-3 rounded-xl">

      <span className="font-medium text-gray-700">
        City
      </span>

      <span className="font-semibold text-gray-800">
        {order.shippingAddress?.city}
      </span>

    </div>

    {/* phone */}
    <div className="flex justify-between items-center bg-gray-100 p-3 rounded-xl">

      <span className="font-medium text-gray-700">
        Phone
      </span>

      <span className="font-semibold text-gray-800">
        {order.shippingAddress?.phone}
      </span>

    </div>

    {/* details */}
    <div className="bg-gray-100 p-3 rounded-xl">

      <h4 className="font-medium text-gray-700 mb-2">
        Details
      </h4>

      <p className="text-gray-800 leading-relaxed">
        {order.shippingAddress?.details}
      </p>

    </div>

  </div>

</div>

              {/* products */}
              <div className='w-[95%] m-auto border mt-3 rounded-xl'>
                <h3 className=' p-2'>Product </h3>

              <table className="w-full text-center ">
                <thead>
                  <tr className="bg-gray-100 border">
                    <th className="p-4">Img</th>
                    <th className="p-4">Title</th>
                    <th className="p-4">Price</th>
                  </tr>
                </thead>

                <tbody>
                  {order?.cartItems?.map((product, index) => (
                    <tr key={index} >
                      <td className="p-4 flex justify-center">
                        <img
                          className="w-24 h-24 object-cover rounded-lg"
                          src={product?.product.imageCover}
                          alt={product?.product.title}
                        />
                      </td>

                      <td className="p-4">
                        {product?.product.title}
                      </td>

                      <td className="text-blue-600 font-bold">
                        {product?.price} EGP
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>

                          {/* payment */}
            <div className="p-5 rounded-2xl border border-gray-200 mt-3 mb-1 w-[95%] m-auto flex flex-col gap-3 bg-white shadow-sm">

              {/* payment method */}
              <div className='border-b pb-3 flex justify-between items-center'>

                <h4 className='font-semibold text-gray-700'>
                  Payment Method
                </h4>

                <h5 className='bg-indigo-500 text-white py-1 px-3 rounded-full text-sm'>
                  {order.paymentMethodType}
                </h5>

              </div>

              {/* tax */}
              <div className='flex justify-between items-center p-3 rounded-xl bg-gray-100'>

                <h4 className='text-gray-700 font-medium'>
                  Tax Price
                </h4>

                <h5 className='font-semibold text-gray-800'>
                  {order.taxPrice === 0 ? "Free" : `${order.taxPrice} EGP`}
                </h5>

              </div>

              {/* shipping */}
              <div className='flex justify-between items-center p-3 rounded-xl bg-gray-100'>

                <h4 className='text-gray-700 font-medium'>
                  Shipping Price
                </h4>

                <h5 className='font-semibold text-gray-800'>
                  {order.shippingPrice === 0 ? "Free" : `${order.shippingPrice} EGP`}
                </h5>

              </div>

              {/* total */}
              <div className='mt-2 bg-green-50 border border-green-200 rounded-xl p-4 flex justify-between items-center'>

                <h3 className="text-lg font-bold text-gray-800">
                  Total Price
                </h3>

                <span className="text-2xl font-bold text-blue-600">
                  {order.totalOrderPrice} EGP
                </span>

              </div>

            </div>


            </div>
          ))}
             
             </>}
          

        </div>
      </div>
    </>
  )
}

export default Order