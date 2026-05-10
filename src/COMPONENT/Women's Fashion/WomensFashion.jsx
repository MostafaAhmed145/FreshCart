import axios from 'axios'
import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import WomensFashionCss from "../Women's Fashion/WomensFashion.module.css"
import Loding from '../LODING/Loding'
import { Link } from 'react-router-dom'

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import { cartContext } from '../CART-CONTEXT/CartContext'

import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

function WomensFashion() {

  let { addProductToCart, addProductInWishList } = useContext(cartContext)

  async function getAllProuduct() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products")
  }

  let { data, isLoading } = useQuery("getAllProuduct", getAllProuduct)

  if (isLoading) {
    return <Loding />
  }

  async function addProduct(id) {
    await addProductToCart(id)
  }

  async function addProductWishList(productId) {
    await addProductInWishList(productId)
  }

  return (
    <div className="content p-10 pb-6 rounded-2xl">

      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">

        {data?.data?.data?.length > 0 ? (
          <>
            {data.data.data.map((product, inx) => (
              product.category.name === "Women's Fashion" ? (

                <div
                  key={inx}
                  className={WomensFashionCss.card + " card border p-2 pb-5 text-center relative shadow-lg hover:shadow-2xl transition-all duration-300 rounded-lg"}
                >

                  {product.priceAfterDiscount && (
                    <div className='absolute top-1 right-1 bg-red-500 text-white rounded-lg z-30 px-3'>
                      Sale
                    </div>
                  )}

                  <Link to={`/ProductDitelse/${product.id}`} className={WomensFashionCss.link}>

                    <figure className={WomensFashionCss.figre}>

                      <LazyLoadImage
                        className="rounded"
                        style={{ width: "100%" }}
                        src={product.imageCover}
                        alt={product.title}
                        effect="blur"
                      />

                      <figcaption className="p-2">

                        <h3 className='text-green-500'>
                          {product.title.split(" ").slice(0, 3).join(" ")}
                        </h3>

                        <p>
                          {product.description.split(" ").slice(0, 6).join(" ")}
                        </p>

                        <h5 className='border rounded-md p-1 my-1'>
                          brand : {product.brand.name}
                        </h5>

                        <div className='w-full flex justify-between items-center pb-4'>

                          <div>
                            {product.priceAfterDiscount ? (
                              <>
                                <h5 className="line-through text-red-500">
                                  {product.price} EGB
                                </h5>
                                <h5 className="text-green-500">
                                  {product.priceAfterDiscount} EGB
                                </h5>
                              </>
                            ) : (
                              <h5 className="text-green-500">
                                {product.price} EGB
                              </h5>
                            )}
                          </div>

                          <h4 className='text-yellow-400'>
                            <i className="fa-solid fa-star"></i>
                            {product.ratingsAverage}
                          </h4>

                        </div>

                      </figcaption>

                    </figure>

                  </Link>

                  <i
                    onClick={() => addProductWishList(product.id)}
                    className="fa-solid fa-heart absolute right-2 bottom-1 cursor-pointer text-red-500"
                  ></i>

                  <button
                    onClick={() => addProduct(product.id)}
                    className={WomensFashionCss.btn + " px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out capitalize w-[75%] z-30 m-auto bottom-1"}
                  >
                    Add to cart
                  </button>

                </div>

              ) : null
            ))}
          </>
        ) : (
          <Loding />
        )}

      </div>
    </div>
  )
}

export default WomensFashion