

import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ErrorPage from '../ERROR-PAGE/ErrorPage'
import Loding from '../LODING/Loding'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { addProductToCart } from '../REDUX/CartSlice'
import { useDispatch } from 'react-redux'

export default function SubCategories() {

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [selectedSubCategory, setSelectedSubCategory] = useState(null)

    let { id } = useParams()

    const dispatch = useDispatch()

    function getSubCategories() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories?category=${id}`)
    }

    let { data , isError, isLoading } = useQuery(["getSubCategories" , id ], getSubCategories , {
        enabled : !!id
    })


    function getSubCategoryProducts() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products?subcategory=${selectedSubCategory}`)
    }


   const { data: subCategoryProductsData , isError: isSubCategoryProductsError, isLoading: isSubCategoryProductsLoading } =  useQuery(["getSubCategoryProducts" , selectedSubCategory], getSubCategoryProducts , {
    enabled: !!selectedSubCategory && isDialogOpen,
    })

  

    // console.log("subCategoryProductsData" , subCategoryProductsData);

    if (isLoading) {
        return <Loding/>
    }

    if (isError) {
        return <ErrorPage/>
    }

    // console.log("subCategoriesData" , data);

    function close() {
        setIsDialogOpen(false)
    }

    function open() {
        setIsDialogOpen(true)
        
    }

  return (
    <div className='container p-10 my-20 m-auto'>
      <h1>SubCategories</h1>
       <div className=" row grid lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-6">
           {data.data.data.length > 0 ? <>
               
                {data.data.data.map((items )=>{
                    return    <Button key={items._id}
                                         onClick={()=>{
                                            setSelectedSubCategory(items._id)
                                            open()
                                         }}
                                         className="rounded-md bg-black/70  px-4 py-2 text-sm font-medium text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-black/30 mt-10">
                                         <div className='card relative shadow-lg border p-3 cursor-pointer transition duration-300 hover:scale-[1.1] rounded-lg text-center' >
                                            <h2>{items.name}</h2>
                                        </div>
                                </Button>
        
                })}
           </> : <p className=" text-gray-500 p-3 shadow-md mt-2 font-bold">No SubCategories available</p>}
       </div>


       <Dialog open={ isDialogOpen } as="div" className="relative z-10 focus:outline-none" onClose={close}>
               <div className="fixed inset-0 bg-black/50 backdrop-blur-sm">
                 <div className="flex min-h-full items-center justify-center p-4">
                   <DialogPanel
                     transition
                     className="w-full max-h-[70vh]  overflow-auto rounded-xl bg-black/70  p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                   >

                    <h2 className="text-white text-lg mb-4">Products</h2>

                        {isSubCategoryProductsLoading ? (
                        <Loding />
                        ) : (
                        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-5 gap-3">
                            {subCategoryProductsData?.data?.data.map((product) => (
                            <div className="bg-white p-2 rounded border shadow" key={product._id}>
                              <Link key={product._id} to={`/ProductDitelse/${product._id}`} className="">
                             
                             <div key={product._id} className="bg-white p-2 rounded border shadow">
                                <img
                                src={product.imageCover}
                                className=" w-full object-cover"
                                />
                                <h3 className="text-xs mt-1">{product.title.slice(0 , 30 )}...</h3>
                                <p className="text-green-600 text-sm py-2 font-bold">
                                {product.price} EGP
                                </p>

                               
                            </div>
                            
                            </Link>

                             <button onClick={
                                  ()=> dispatch(addProductToCart(product._id))
                                } className="w-full bg-blue-600 text-white mt-1 py-1 rounded hover:bg-blue-700 transition duration-300">
                                  add to cart 
                                </button>
                            </div>
                            ))}
                        </div>
                        )}
               
       
                      
                     <div className="mt-4">
                       <Button
                         className=" absolute top-1 right-1 inline-flex items-center gap-2 rounded-md bg-red-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                         onClick={close}
                       >
                         X
                       </Button>
                     </div>
                   </DialogPanel>
                 </div>
               </div>
             </Dialog>


           
    </div>
  )
}
