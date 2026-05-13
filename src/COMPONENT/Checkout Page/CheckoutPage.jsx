

import axios from 'axios';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function CheckoutPage() {

    let myNavigate = useNavigate()


        const cartId = useSelector((state)=> state.cartSlice.cartId)



       async function checkoutSession(  values ) {
            await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${ cartId }?url=http://localhost:3000` , {
                shippingAddress : values
                
            } , {
                headers : { token : localStorage.getItem("tkn") }
            }).then( (res)=>{
                setTimeout(() => {
                    window.location.href = res.data.session.url
                }, 1500);
                
                
            } ).catch( (err)=>{
                toast.error('An error occurred while processing the payment. You will be redirected to your cart to try again.');
                
                setTimeout(() => {
                    myNavigate("/Cart")
                }, 4000);

            } )
        }


        let formikOnlinePayment = useFormik( {

            initialValues : {
                    "details": "",
                    "phone": "",
                    "city": ""
            } ,

            onSubmit : checkoutSession  ,

            validate : function (values) {
                let error = {}
                
                let redxPone = /^01[0125][0-9]{8}$/
                let regxCity = /^[a-zA-Z0-9\s]{1,}$/
                let regxDetails = /^[a-zA-Z0-9\s.,;!?'-]{1,}$/
                
                
                

                if (redxPone.test(values.phone) === false) {
                    error.phone = "Please make sure to enter your phone number"
                }

                if( regxCity.test(values.city) !== true){
                    error.city = "City is required"
                }

                if( regxDetails.test(values.details) !== true){
                    error.details = "details is required"
                }


                return error
            }
        } )



    return <>
    <div className=' bg-gray-100 min-h-screen flex justify-center items-center '>
                    <form onSubmit={formikOnlinePayment.handleSubmit} action="" className=' w-[75%] bg-white shadow-lg p-4 rounded-lg'>
                        <h2 className=' text-center font-bold text-3xl'>checkout Session</h2>
                        <label htmlFor="phone">phone</label>
                        <input id='phone' onChange={formikOnlinePayment.handleChange} value={formikOnlinePayment.values.phone} type="text" className=' w-full p-2 rounded-lg focus:outline-2 focus:outline-blue-700 border shadow-md mb-2' />
                            {formikOnlinePayment.errors.phone  && formikOnlinePayment.touched.phone ? <p className=' text-red-500'>{formikOnlinePayment.errors.phone}</p> : ""} 

                        <label htmlFor="city">city</label>
                        <input id='city' onChange={formikOnlinePayment.handleChange} value={formikOnlinePayment.values.city} type="text" className=' w-full p-2 rounded-lg focus:outline-2 focus:outline-blue-700 border shadow-md mb-2' />
                            { formikOnlinePayment.errors.city && formikOnlinePayment.touched.city ? <p className=' text-red-500'>{formikOnlinePayment.errors.city}</p> : "" }
                
                        <label htmlFor="details">details</label>
                        <textarea placeholder=' Please provide any additional instructions or shipping details (e.g., full address, special delivery requests).' onChange={formikOnlinePayment.handleChange} value={formikOnlinePayment.values.details} name="details" id="details" className=' w-full p-2 rounded-lg focus:outline-2 focus:outline-blue-700 border shadow-md mb-2'></textarea>
                        { formikOnlinePayment.errors.details && formikOnlinePayment.touched.details ? <p className=' text-red-500'>{formikOnlinePayment.errors.details}</p> : "" }


                        <button type='submit' className='capitalize bg-blue-700  hover:bg-blue-800 transition-all duration-150 text-white  flex justify-center items-center p-3 w-full rounded-lg'>cach</button>
                    </form>
    </div>
    
    </>
}

export default CheckoutPage
