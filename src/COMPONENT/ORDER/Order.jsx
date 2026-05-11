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

          {data?.data?.map((order, idx) => (
            <div key={idx} className='bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200 hover:scale-[1.01] transition-all duration-300'>

              {/* user info */}
              <h3 className='bg-gray-100 p-2 text-stone-500'>User Information :</h3>

              <div className="p-4 border-b-2">
                <h2 className="font-bold text-lg text-green-500">
                  Name: {order.user.name}
                </h2>
                <h3 className="text-sm text-gray-600">
                  Email: {order.user.email}
                </h3>
                <h3 className="text-sm text-gray-600">
                  Phone: {order.user.phone}
                </h3>
              </div>

              {/* shipping */}
              <h3 className='bg-gray-100 p-2 text-stone-500'>Shipping Information :</h3>

              <div className="p-4 border-b-2">
                <h4>City: {order.shippingAddress?.city}</h4>
                <h4>Phone: {order.shippingAddress?.phone}</h4>
                <h4>Details: {order.shippingAddress?.details}</h4>
              </div>

              {/* products */}
              <h3 className='bg-gray-100 p-2 text-stone-500'>Product Information :</h3>

              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-4">Img</th>
                    <th className="p-4">Title</th>
                    <th className="p-4">Price</th>
                  </tr>
                </thead>

                <tbody>
                  {order.cartItems.map((product, index) => (
                    <tr key={index} className="border">
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

              {/* payment */}
              <div className="p-4 bg-gray-50">

                <h4 className='text-center border rounded-md py-1'>
                  Payment Method: {order.paymentMethodType}
                </h4>

                <h4>
                  Tax Price: {order.taxPrice === 0 ? "Free" : `${order.taxPrice} EGP`}
                </h4>

                <h4>
                  Shipping Price: {order.shippingPrice === 0 ? "Free" : `${order.shippingPrice} EGP`}
                </h4>

                <h3 className="text-xl font-semibold">
                  Total Price: <span className="text-green-500">{order.totalOrderPrice} EGP</span>
                </h3>

              </div>

            </div>
          ))}

        </div>
      </div>
    </>
  )
}

export default Order