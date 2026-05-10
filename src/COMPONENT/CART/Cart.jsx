import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Loding from '../LODING/Loding'
import { cartContext } from '../CART-CONTEXT/CartContext'
import { Link } from 'react-router-dom'
import Aos from 'aos'
import "aos/dist/aos.css"
import { Helmet } from 'react-helmet'
  
  function Cart() {

    let  [ allProductCart , setAllProductCart ] = useState(null)
    
    let  [ totalCartPrice , setTotalCartPrice ] = useState(null)

    


      let {  cartId ,  setCartId ,  myToken , setMyToken , addProductToCart , upditingCart , totalCartPryse , setTotalCartPryse , numOfCartItems , setNumOfCartItems , removeCart , cleareAllProductInCart , setAllProduct , allProduct , setCaunt , caunt } = useContext( cartContext )
    

                async function displayProductInCar() {
                  try{
                      let { data } =  await axios.get("https://ecommerce.routemisr.com/api/v1/cart" , {
                      headers : { token : localStorage.getItem("tkn")}
                    })

                        setCartId(data.data._id)
                        localStorage.setItem("cartOwner", data.data.cartOwner)
                        setAllProductCart( data.data.products)
                        setTotalCartPryse( data.data.totalCartPrice )
                        setTotalCartPrice(data.data.totalCartPrice)
                        
 
            }
            catch(err){
              console.log( "cartId" , cartId );
            }
                  }

                  useEffect( ()=>{
                    displayProductInCar()
                  } , [ displayProductInCar ] )
                  
                   useEffect( ()=>{
                          Aos.init({ easing: 'ease-in-out', duration : 1500})
                    } , [])

import axios from 'axios';
import React, { useEffect, useContext } from 'react';
import Loding from '../LODING/Loding';
import { cartContext } from '../CART-CONTEXT/CartContext';
import { Link } from 'react-router-dom';
import Aos from 'aos';
import "aos/dist/aos.css";
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { removeCart, updateCart } from '../REDUX/CartSlice';
import ErrorPage from '../ERROR-PAGE/ErrorPage';



function Cart() {
  const dispatch = useDispatch();
  const { cleareAllProductInCart } = useContext(cartContext);
  
  const myCart = useSelector((state) => state.cartSlice.allProduct);
  const totalCartPrice = useSelector((state) => state.cartSlice.totalCartPrice);
  
  
  // const cartId = useSelector((state) => state.cartSlice.cartId);
  const { cartId , setCartId} = useContext( cartContext )

        if (allProductCart == null) {
          return <Loding/>
        }


        async function ubditeCount(id , count ) {
          await upditingCart(id , count )
        }

        async function removeCartItems(id) {
          await removeCart(id)
        }




    return <>

    <Helmet>
      <title>User Cart</title>
    </Helmet>
    
    <div className="container p-10 my-10 m-auto">
  <div className="row m-auto">

    {totalCartPryse <= 0 ? <p className='   shadow-lg text-black mt-5 p-6 '>Your cart is currently empty. Start shopping now and add products to your cart</p> : <>
    
      <button className=' bg-red-500 text-white rounded-lg w-full py-3 px-3 capitalize mb-4' 
    onClick={ cleareAllProductInCart }>clear product In Cart</button>
    
    {allProductCart?.map((product, idx) => {
      return (
        <div
          key={idx}
          className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mb-7 shadow-lg rounded-lg p-6 bg-white hover:shadow-2xl transition-all duration-300"
        >
          {/* الصورة */}
          <figure className="lg:w-[70%] w-full m-auto">
            <img
            data-aos="zoom-in"
              className="w-full h-auto shadow-lg rounded-lg object-cover"
              src={product.product.imageCover}
              alt={product.product.title}
            />
          </figure>

          {/* تفاصيل المنتج */}
          <figcaption className="flex flex-col justify-center items-center m-auto space-y-4">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800">{product.product.title}</h2>
              <h3 className="text-lg text-gray-600">{product.product.category.name}</h3>
              <p className="text-md font-bold text-gray-700"> Price : {product.price} EGB</p>
              <p className="text-md font-bold  text-xl text-cyan-600"> total Price : { product.price * product.count} EGB</p>
            </div>

            

            {/* زر الحذف */}
            <button className="btn px-7 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600 w-full transition-all duration-300"
            onClick={ ()=>{
              removeCartItems(product.product.id)
            } }>
              Remove
            </button>
          </figcaption>

          {/* تعديل الكمية */}
          <div className="flex justify-center items-center space-x-4 mt-4">
            <button
            onClick={ ()=>{
              ubditeCount(product.product.id , product.count - 1 )
            } }
              className="btn bg-gray-200 text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-300 transition-all duration-300"
            >
              -
            </button>

            <p className="text-lg font-semibold">{product.count }</p>

            <button
              className="btn bg-gray-200 text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-300 transition-all duration-300"
              onClick={ ()=>{
                ubditeCount( product.product.id , product.count + 1 )
              } }
            >
              +
            </button>
          </div>
        </div>
      );
    })}

      <div className="flex justify-between items-center py-4 shadow-lg p-3 mt-5">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Total Pryse :</h3>
        </div>
        <div>
        <h4 className="text-2xl text-green-500 font-bold">{totalCartPryse} EGB</h4>
        </div>
      </div>

      <div className=' grid lg:grid-cols-2 md:grid-cols-1 gap-2 mt-2'>
      <Link to="/Payment" className=' capitalize bg-blue-700  hover:bg-blue-800 transition-all duration-150 text-white  flex justify-center items-center p-3  rounded-lg'>
        cash on delivery
      </Link>

      <Link to="/CheckoutPage" className=' capitalize bg-blue-700  hover:bg-blue-800 transition-all duration-150 text-white  flex justify-center items-center p-3  rounded-lg'>
        online payment
      </Link>
      </div>

      

    
    </> }
    
    
      
      </div>

  </div>

 

    
    </>


  const { data, isLoading, isSuccess , isError ,  refetch } = useQuery("cartData", fetchCart);

  useEffect(() => {

    Aos.init({ easing: 'ease-in-out', duration: 1500 });
    // console.log("myCart" , myCart , data);

  }, []);

  if (isLoading) return <Loding />;

  if ( isError) return <ErrorPage />

  if (isSuccess) {
    // console.log("myCart" , myCart , data);
    setCartId(data?.cartId || null); // تحديث cartId في السياق
  }

  // console.log("myCart" , myCart , data);

  const allProducts = data?.data?.products || [];
  const totalPrice = data?.data?.totalCartPrice || 0;

  // console.log("myCart" , allProducts , data , data?.cartId);

  return (
    <>
      <Helmet>
        <title>User Cart</title>
      </Helmet>

      <div className="container p-10 my-10 m-auto">
        <div className="row m-auto">
          {totalPrice <= 0 ? (
            <p className='shadow-lg text-black mt-5 p-6'>
              Your cart is currently empty. Start shopping now and add products to your cart
            </p>
          ) : (
            <>
              <button
                className='bg-red-500 text-white rounded-lg w-full py-3 px-3 capitalize mb-4'
                onClick={async () => {
                  await cleareAllProductInCart();
                  refetch();
                }}
              >
                Clear Cart
              </button>

              {allProducts.map((product, idx) => (
                <div
                  key={idx}
                  className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mb-7 shadow-lg rounded-lg p-6 bg-white hover:shadow-2xl transition-all duration-300"
                >
                  {/* Image */}
                  <figure className="lg:w-[70%] w-full m-auto">
                    <img
                      data-aos="zoom-in"
                      className="w-full h-auto shadow-lg rounded-lg object-cover"
                      src={product.product.imageCover}
                      alt={product.product.title}
                    />
                  </figure>

                  {/* Product details */}
                  <figcaption className="flex flex-col justify-center items-center m-auto space-y-4">
                    <div className="text-center">
                      <h2 className="text-xl font-semibold text-gray-800">{product.product.title}</h2>
                      <h3 className="text-lg text-gray-600">{product.product.category?.name || "no category"}</h3>
                      <p className="text-md font-bold text-gray-700">Price: {product.price} EGB</p>
                      <p className="text-md font-bold text-xl text-cyan-600">Total: {product.price * product.count} EGB</p>
                    </div>

                    <button
                      className="btn px-7 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600 w-full transition-all duration-300"
                      onClick={async () => {
                        await dispatch(removeCart(product.product.id));
                        refetch();
                      }}
                    >
                      Remove
                    </button>
                  </figcaption>

                  {/* Quantity update */}
                  <div className="flex justify-center items-center space-x-4 mt-4">
                    <button
                      onClick={async () => {
                        if (product.count > 1) {
                          await dispatch(updateCart({
                            id: product.product.id,
                            count: product.count - 1
                          }));
                          refetch();
                        }
                      }}
                      className="btn bg-gray-200 text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-300 transition-all duration-300"
                    >
                      -
                    </button>

                    <p className="text-lg font-semibold">{product.count}</p>

                    <button
                      onClick={async () => {
                        await dispatch(updateCart({
                          id: product.product.id,
                          count: product.count + 1
                        }));
                        refetch();
                      }}
                      className="btn bg-gray-200 text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-300 transition-all duration-300"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}

              {/* Total price */}
              <div className="flex justify-between items-center py-4 shadow-lg p-3 mt-5">
                <h3 className="text-lg font-semibold text-gray-800">Total Price:</h3>
                <h4 className="text-2xl text-green-500 font-bold">{totalPrice} EGB</h4>
              </div>

              {/* Payment links */}
              <div className='grid lg:grid-cols-2 md:grid-cols-1 gap-2 mt-2'>
                <Link to="/Payment" className='capitalize bg-blue-700 hover:bg-blue-800 text-white flex justify-center items-center p-3 rounded-lg transition-all duration-150'>
                  Cash on Delivery
                </Link>
                <Link to="/CheckoutPage" className='capitalize bg-blue-700 hover:bg-blue-800 text-white flex justify-center items-center p-3 rounded-lg transition-all duration-150'>
                  Online Payment
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
  }
export default Cart;
