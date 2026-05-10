import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import Loding from '../LODING/Loding'
import { Link } from 'react-router-dom'
import LazyLoad from 'react-lazyload'
import { useDispatch } from 'react-redux'
import { addProductToCart } from '../REDUX/CartSlice'
import ErrorPage from '../ERROR-PAGE/ErrorPage'
import toast from 'react-hot-toast'

function Wishlist() {

  let queryClient = useQueryClient()
  let dispatch = useDispatch()

  async function getAllProductInWishList() {
    return await axios.get(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        headers: { token: localStorage.getItem("tkn") }
      }
    )
  }

  let { data, isLoading, isError } = useQuery(
    "getAllProductInWishList",
    getAllProductInWishList
  )

  if (isLoading) {
    return <Loding />
  }

  if (isError) {
    return <ErrorPage />
  }

  async function removeProductFromWishlist(WishListId) {
    try {
      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${WishListId}`,
        {
          headers: { token: localStorage.getItem("tkn") }
        }
      )

      queryClient.invalidateQueries("getAllProductInWishList")
    } catch (err) {
      toast.error("Failed to remove product from wishlist", {
        duration: 3000
      })
    }
  }

  return (
    <div className="container m-auto p-3 my-20">

      {data?.data.count === 0 ? (
        <p className="shadow-lg text-black mt-5 p-6">
          Your wishlist is currently empty. Start shopping now and add products to your wishlist.
        </p>
      ) : (
        <div className="overflow-x-auto shadow-lg mt-11">
          <table className="table-fixed border w-full min-w-max">

            <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <tr>
                <th className="p-3 border">img</th>
                <th className="p-3 border">name</th>
                <th className="p-3 border">price</th>
                <th className="p-3 border">rating</th>
                <th className="p-3 border">sold</th>
                <th className="border">quantity</th>
                <th className="p-3 border">add to cart</th>
                <th className="p-3 border">delete</th>
              </tr>
            </thead>

            <tbody className="text-center">

              {data?.data?.data?.map((wishlistProdct) => (
                <tr
                  key={wishlistProdct.id}
                  className="hover:bg-gray-100 transition-colors duration-200 border"
                >

                  <td className="p-3 break-words">
                    <Link to={`/ProductDitelse/${wishlistProdct.id}`}>
                      <LazyLoad height={200} offset={100} once>
                        <img
                          src={wishlistProdct.imageCover}
                          className="w-full rounded-t-lg"
                          alt={wishlistProdct.title}
                          loading="lazy"
                        />
                      </LazyLoad>
                    </Link>
                  </td>

                  <td className="p-3 break-words text-green-500">
                    {wishlistProdct.title.split(" ").slice(0, 3).join(" ")}
                  </td>

                  <td className="p-3 break-words">
                    {wishlistProdct.price} EGP
                  </td>

                  <td className="p-3 break-words text-amber-500">
                    <span className="text-yellow-400">
                      <i className="fa-solid fa-star"></i>{" "}
                      {wishlistProdct.ratingsAverage}
                    </span>
                  </td>

                  <td className="p-3 break-words">
                    {wishlistProdct.sold}
                  </td>

                  <td className="p-3 break-words">
                    {wishlistProdct.quantity}
                  </td>

                  <td className="p-3 break-words">
                    <button
                      onClick={() =>
                        dispatch(addProductToCart(wishlistProdct.id))
                      }
                      className="capitalize bg-blue-500 hover:bg-blue-600 text-white cursor-pointer p-2 rounded-lg"
                    >
                      +
                    </button>
                  </td>

                  <td className="p-3 break-words">
                    <button
                      onClick={() =>
                        removeProductFromWishlist(wishlistProdct.id)
                      }
                      className="text-white cursor-pointer bg-red-500 hover:bg-red-600 p-2 rounded-lg"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>
        </div>
      )}

    </div>
  )
}

export default Wishlist