import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import Loding from '../LODING/Loding';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Aos from 'aos';
import "aos/dist/aos.css";
import { useDispatch } from 'react-redux';
import { addProductToCart } from '../REDUX/CartSlice';
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useFormik } from 'formik';
import ErrorPage from '../ERROR-PAGE/ErrorPage';

function ProductDitelse() {

    let dispatch = useDispatch();
    let [isDialogOpen, setIsDialogOpen] = useState(false);
    let [selectedImg, setSelectedImg] = useState(null);

    let { id } = useParams();

    useEffect(() => {
        Aos.init({
            easing: 'ease-in-out',
            duration: 1500
        });
    }, []);

    function gitProductDitelse() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    }

    function getReviews() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}/reviews`);
    }

    function addReview(values) {
        return axios.post(
            `https://ecommerce.routemisr.com/api/v1/products/${id}/reviews`,
            {
                review: values.review,
                rating: values.rating
            },
            {
                headers: {
                    token: localStorage.getItem("tkn"),
                }
            }
        );
    }

    let {
        data,
        isLoading,
        isError
    } = useQuery(["gitProductDitelse", id], gitProductDitelse);

    let {
        data: reviewsData,
        isLoading: isReviewsLoading,
        isError: isReviewsError,
        refetch
    } = useQuery(["getReviews", id], getReviews);

    useEffect(() => {
        if (data?.data?.data) {
            setSelectedImg(data.data.data.imageCover);
        }
    }, [data]);

    let formik = useFormik({
        initialValues: {
            review: "",
            rating: 0
        },
        onSubmit: async (values) => {
            try {
                await addReview(values);
                close();
                refetch();
                formik.resetForm();
            } catch (error) {
                console.log(error);
            }
        }
    });

    if (isLoading || isReviewsLoading) {
        return <Loding />;
    }

    if (isError || isReviewsError) {
        return <ErrorPage />;
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

    function open() {
        setIsDialogOpen(true);
    }

    function close() {
        setIsDialogOpen(false);
    }

    return (
        <>
            <div className="container mx-auto p-12 mt-20">
                <div className="content lg:w-[80%] m-auto">

                    {/* Product details */}
                    <div className="flex flex-col md:flex-row p-6 bg-white rounded-lg shadow-lg mt-8 border">

                        {/* Product image */}
                        <figure className="flex-1 mb-6 md:mb-0">
                            <LazyLoadImage
                                data-aos="zoom-in"
                                loading='lazy'
                                effect='opacity'
                                style={{ width: "75%" }}
                                className="h-auto object-cover rounded-lg m-auto shadow-md"
                                src={selectedImg}
                                alt={data?.data?.data?.title}
                            />
                        </figure>

                        {/* Product description */}
                        <figcaption className="flex-1 md:ml-8">

                            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                                {data?.data?.data?.title}
                            </h2>

                            <p className="text-gray-600 mb-6">
                                {data?.data?.data?.description}
                            </p>

                            {/* Price Section */}
                            {data?.data?.data?.priceAfterDiscount ? (
                                <div className="text-red-500 mb-6">
                                    <h3 className="line-through capitalize text-gray-500">
                                        Price before discount: {data?.data?.data?.price} EGP
                                    </h3>

                                    <h3 className="text-2xl font-bold capitalize">
                                        Price after discount: {data?.data?.data?.priceAfterDiscount} EGP
                                    </h3>
                                </div>
                            ) : (
                                <h3 className="text-2xl font-bold capitalize mb-6">
                                    Price: {data?.data?.data?.price} EGP
                                </h3>
                            )}

                            {/* Slider */}
                            <div className='w-full text-white grid lg:grid-cols-1 my-3'>
                                <Slider className='rounded-3xl overflow-hidden' {...settings}>
                                    {data?.data?.data?.images?.map((img, index) => {
                                        return (
                                            <div key={index} className='flex px-1'>
                                                <LazyLoadImage
                                                    onClick={() => setSelectedImg(img)}
                                                    loading='lazy'
                                                    effect='opacity'
                                                    className='w-full cursor-pointer'
                                                    src={img}
                                                    alt={`Product image ${index + 1}`}
                                                />
                                            </div>
                                        );
                                    })}
                                </Slider>
                            </div>

                            {/* Add to cart button */}
                            <button
                                onClick={() => {
                                    dispatch(addProductToCart(data?.data?.data?.id));
                                }}
                                className="px-6 capitalize w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
                            >
                                add to cart
                            </button>

                        </figcaption>
                    </div>

                    {/* Dialog */}
                    <Dialog
                        open={isDialogOpen}
                        as="div"
                        className="relative z-10 focus:outline-none"
                        onClose={close}
                    >
                        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm">
                            <div className="flex min-h-full items-center justify-center p-4">

                                <DialogPanel
                                    transition
                                    className="w-full max-w-md rounded-xl bg-black/70 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                                >

                                    <form onSubmit={formik.handleSubmit}>

                                        <DialogTitle className="text-lg font-medium text-white mb-4">
                                            Write your review
                                        </DialogTitle>

                                        <textarea
                                            name="review"
                                            onChange={formik.handleChange}
                                            value={formik.values.review}
                                            onBlur={formik.handleBlur}
                                            placeholder='write your review'
                                            className='w-full p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        />

                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <i
                                                key={star}
                                                onClick={() => formik.setFieldValue("rating", star)}
                                                className={`cursor-pointer ${
                                                    formik.values.rating >= star
                                                        ? "fa-solid"
                                                        : "fa-regular"
                                                } fa-star text-yellow-400`}
                                            ></i>
                                        ))}

                                        <button
                                            type='submit'
                                            className="w-full bg-blue-600 mt-3 hover:bg-blue-700 transition text-white py-2 rounded-lg font-semibold"
                                        >
                                            Submit Review
                                        </button>

                                    </form>

                                    <div className="mt-4">
                                        <Button
                                            className="absolute top-1 right-1 inline-flex items-center gap-2 rounded-md bg-red-700 px-3 py-1.5 text-sm font-semibold text-white"
                                            onClick={close}
                                        >
                                            X
                                        </Button>
                                    </div>

                                </DialogPanel>
                            </div>
                        </div>
                    </Dialog>

                    {/* Back Link */}
                    <Link
                        className='py-2 text-red-500 font-bold'
                        to={"/Home"}
                    >
                        Back to the main page
                    </Link>

                </div>

                {/* Add review button */}
                <Button
                    onClick={open}
                    className="rounded-md bg-black/70 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 mt-10"
                >
                    add review
                </Button>

                {/* Reviews */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 shadow-lg p-8">

                    {reviewsData?.data?.data?.length === 0 ? (
                        <h2>No reviews yet</h2>
                    ) : (
                        reviewsData?.data?.data?.map((review, idx) => {
                            return (
                                <div
                                    key={idx}
                                    className="p-4 border border-slate-300 shadow-lg rounded-lg"
                                >
                                    <div className="flex items-center flex-col gap-[8px]">

                                        <div className="flex gap-2">

                                            <div className="flex items-center capitalize mb-4 w-[35px] h-[35px] rounded-full bg-blue-500 text-white justify-center">
                                                {review?.user?.name?.charAt(0)}
                                            </div>

                                            <div>
                                                <h4 className="font-semibold text-gray-800">
                                                    {review?.user?.name}
                                                </h4>

                                                <p className="text-sm text-gray-400">
                                                    {review?.createdAt}
                                                </p>
                                            </div>

                                        </div>

                                        <p>{review?.review}</p>

                                        <p className="text-gray-800 border border-yellow-400 w-fit p-2">
                                            Rating :
                                            <span className="text-yellow-400 font-bold text-lg">
                                                {" "} {review?.rating}
                                            </span>
                                            <i className="fas fa-star text-yellow-400"></i>
                                        </p>

                                    </div>
                                </div>
                            );
                        })
                    )}

                </div>
            </div>
        </>
    );
}

export default ProductDitelse;