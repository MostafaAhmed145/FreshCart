import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Loding from '../LODING/Loding';
import { Link } from 'react-router-dom';
import Aos from 'aos';
import "aos/dist/aos.css";
import { Helmet } from 'react-helmet';
import { clearAllProductInCart, getCart, removeCart, updateCart } from '../REDUX/CartSlice';
import { useDispatch, useSelector } from 'react-redux';

function Cart() {



  const totalCartPryse = useSelector((state) => state.cartSlice.totalCartPrice)
  const allProducts = useSelector((state) => state.cartSlice.allProducts)
  const isLoading = useSelector((state) => state.cartSlice.isLoading)
  
  console.log("this.state.first" , totalCartPryse , allProducts);
  
  

  const dispatch = useDispatch()



  useEffect(() => {
    dispatch(getCart())
  }, []);

  useEffect(() => {
    Aos.init({ easing: 'ease-in-out', duration: 1500 });
  }, []);

  // loading
  if (isLoading) {
    return <Loding />;
  }

 
  

  

  return (
    <>
      <Helmet>
        <title>User Cart</title>
      </Helmet>

      <div className="container p-10 my-10 m-auto">
        <div className="row m-auto">

          {totalCartPryse <= 0 ? (
            <p className='shadow-lg text-black mt-5 p-6'>
              Your cart is currently empty. Start shopping now and add products to your cart
            </p>
          ) : (
            <>
              <button
                className='bg-red-600 hover:bg-red-700
  text-white font-bold
  px-6 py-2 rounded-lg
  shadow-md transition-all
  flex items-center justify-center gap-2 my-3
'
                onClick={()=> dispatch(clearAllProductInCart())}
              >
                clear product In Cart
              </button>

              {allProducts?.map((product, idx) => (
                <div
                  key={idx}
                  className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mb-7 shadow-lg rounded-lg p-6 bg-white hover:shadow-2xl transition-all duration-300"
                >
                  {/* image */}
                  <figure className="lg:w-[70%] w-full m-auto">
                    <img
                      data-aos="zoom-in"
                      className="w-full h-auto shadow-lg rounded-lg object-cover"
                      src={product.product.imageCover}
                      alt={product.product.title}
                    />
                  </figure>

                  {/* details */}
                  <figcaption className="flex flex-col justify-center items-center m-auto space-y-4">
                    <div className="text-center">
                      <h2 className="text-xl font-semibold text-gray-800">
                        {product.product.title}
                      </h2>

                      <h3 className="text-lg text-gray-600">
                        {product.product.category.name ? product.product.category.name  : ""}
                      </h3>

                      <p className="text-md font-bold text-gray-700">
                        Price : {product.price} EGB
                      </p>

                      <p className="text-md font-bold text-xl text-cyan-600">
                        total Price : {product.price * product.count} EGB
                      </p>
                    </div>

                    <button
                      className="btn px-7 py-2 rounded-lg text-white bg-red-500 w-full"
                      onClick={() => dispatch(removeCart(product.product.id))}
                    >
                      Remove
                    </button>
                  </figcaption>

                  {/* quantity */}
                  <div className="flex justify-center items-center space-x-4 mt-4">
                    <button
                      onClick={() =>
                        dispatch(updateCart({
                          id: product.product.id,
                          count: product.count - 1
                        }))
                      }
                      className="btn bg-gray-200 py-2 px-4 rounded-lg"
                    >
                      -
                    </button>

                    <p className="text-lg font-semibold">{product.count}</p>

                    <button
                      onClick={() =>
                        dispatch(updateCart({
                        id: product.product.id,
                        count: product.count + 1
                      }))
                      }
                      className="btn bg-gray-200 py-2 px-4 rounded-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex justify-between items-center py-4 shadow-lg p-3 mt-5 border">
                <h3>Total Price :</h3>
                <h4 className="text-xl text-green-500 font-bold">
                  {totalCartPryse} EGB
                </h4>
              </div>

              <div className='grid lg:grid-cols-2 md:grid-cols-1 gap-2 mt-2'>
                <Link
                  to="/Payment"
                  className='bg-blue-700 text-white flex justify-center items-center p-3 rounded-lg'
                >
                  cash on delivery
                </Link>

                <Link
                  to="/CheckoutPage"
                  className='bg-blue-700 text-white flex justify-center items-center p-3 rounded-lg'
                >
                  online payment
                </Link>
              </div>
            </>
          )}

        </div>
      </div>
    </>
  );
}

export default Cart;