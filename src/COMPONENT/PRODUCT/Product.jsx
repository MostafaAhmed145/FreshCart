import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

import Loding from '../LODING/Loding'
import ErrorPage from '../ERROR-PAGE/ErrorPage'

import { addProductToCart, addProductInWishList } from '../REDUX/CartSlice'

function AllProduct() {

    const dispatch = useDispatch()

    const selectedCategory = useSelector(
        (state) => state.CategoryNameSlice.selectedCategory
    )

    const [searchTerm, setSearchTerm] = useState("")
    const [favorites, setFavorites] = useState([])

    // تحميل الـ wishlist من localStorage
    useEffect(() => {
        const storedFavorites =
            JSON.parse(localStorage.getItem("wishlist")) || []

        setFavorites(storedFavorites)
    }, [])

    // جلب المنتجات
    async function getAllProuduct() {
        return await axios.get(
            "https://ecommerce.routemisr.com/api/v1/products"
        )
    }

    const { data, isLoading, isError } = useQuery(
        "getAllProuduct",
        getAllProuduct
    )

    if (isLoading) return <Loding />

    if (isError) {
        return <ErrorPage />
    }

    let allProducts = data?.data?.data || []

    // فلترة المنتجات
    let filteredProducts = allProducts
        .filter(product =>
            selectedCategory === "all"
                ? true
                : product.category?.name === selectedCategory
        )
        .filter(product =>
            (product.title ?? "")
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        )

    // إضافة / حذف من المفضلة
    const toggleFavorite = (productId) => {

        let updatedFavorites

        if (favorites.includes(productId)) {
            updatedFavorites = favorites.filter(id => id !== productId)
        } else {
            updatedFavorites = [...favorites, productId]
        }

        setFavorites(updatedFavorites)

        localStorage.setItem(
            "wishlist",
            JSON.stringify(updatedFavorites)
        )
    }

    return (

        <div className="content p-10 pb-6 rounded-2xl">

            {/* Search */}
            <div className="flex items-center shadow mb-6 border hover:shadow-md focus-within:ring-2 focus-within:ring-blue-400 transition-all duration-300 p-1 rounded-xl w-full md:w-[70%] lg:w-[50%] ">

                <span className="px-4 text-gray-400 text-lg">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </span>

                <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type="text"
                    placeholder='Search for products...'
                    className='w-full py-3 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent'
                />
            </div>

            {/* Products */}
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">

                {filteredProducts.length > 0 ? (

                    filteredProducts.map((product, inx) => (

                        <div
                            key={inx}
                            className="overflow-hidden card border hover:border-blue-600 p-2 pb-5 text-center relative shadow-lg hover:shadow-2xl transition-all duration-350 rounded-lg hover:scale-[1.02]"
                        >

                            {/* Discount */}
                            {product.priceAfterDiscount && (
                                <div className='absolute top-1 left-1 bg-red-500 text-white rounded-lg z-30 px-3'>
                                    Sale {
                                        Math.round(
                                            (
                                                (product.price - product.priceAfterDiscount)
                                                / product.price
                                            ) * 100
                                        )
                                    }%
                                </div>
                            )}

                            <Link to={`/ProductDitelse/${product.id}`}>

                                <figure>

                                    <LazyLoadImage
                                        loading="lazy"
                                        className="rounded h-48 w-full"
                                        src={product.imageCover}
                                        alt={product.title}
                                        effect="opacity"
                                    />

                                    <figcaption className="p-[20px] text-center rounded-bl-[12px] rounded-br-[12px]">

                                        <h3 className='text-blue-500'>
                                            {product.title
                                                .split(" ")
                                                .slice(0, 3)
                                                .join(" ")
                                            }
                                        </h3>

                                        <p>
                                            {product.description
                                                .split(" ")
                                                .slice(0, 6)
                                                .join(" ")
                                            }
                                        </p>

                                        <h5 className='border rounded-md p-1 my-1'>
                                            brand : {product.brand.name}
                                        </h5>

                                        <div className='w-full flex justify-between items-center pb-4'>

                                            <div>

                                                {product.priceAfterDiscount ? (
                                                    <>
                                                        <h5 className="line-through text-red-500">
                                                            {product.price} EGP
                                                        </h5>

                                                        <h5 className="text-blue-500">
                                                            {product.priceAfterDiscount} EGP
                                                        </h5>
                                                    </>
                                                ) : (
                                                    <h5 className="text-blue-500">
                                                        {product.price} EGP
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

                            {/* Actions */}
                            <div className='flex flex-col justify-center items-center mt-2 space-y-2'>

                                <button
                                    onClick={() =>
                                        dispatch(addProductToCart(product.id))
                                    }
                                    className="absolute bottom-2 left-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out capitalize w-[75%]"
                                >
                                    Add to cart
                                </button>

                                <i
                                    onClick={() => {

                                        toggleFavorite(product.id)

                                        dispatch(
                                            addProductInWishList(product.id)
                                        )
                                    }}

                                    className={`absolute bottom-2 right-2 fa-solid fa-heart cursor-pointer text-2xl transition-colors duration-300 ${favorites.includes(product.id)
                                            ? 'text-red-500'
                                            : 'text-gray-400'
                                        }`}
                                ></i>

                            </div>

                        </div>
                    ))

                ) : (

                    <p className="text-center text-gray-500 col-span-4">
                        No products found
                    </p>

                )}

            </div>

        </div>
    )
}

export default AllProduct