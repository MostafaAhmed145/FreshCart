

import React, { useEffect } from 'react'
import {  NavLink, Outlet } from 'react-router-dom'
import CategorySlyder from '../CATEGORY-SLYDER/CategorySlyder'
import SlyderProduct from '../SLYDER-PRODUCT/SlyderProduct'
import { getCategoryName } from '../REDUX/ProductSlice'
import { useDispatch, useSelector } from 'react-redux'


function Home() {

    const Categories = useSelector((state)=> state.CategoryNameSlice )

    let dispatch = useDispatch()

//selectedCategory
   
         
  
    return <>
    

    <SlyderProduct/>

    <CategorySlyder/>

<div className="navBarProduct w-[90%]  bg-[#0f2c4d]  p-2 gap-1 text-white m-auto flex flex-col lg:flex-row lg:flex-wrap lg:justify-around md:justify-around sm:flex-col rounded-md text-center mt-4">
    {Categories.categoryName.map((category , index)=>{
        return <button key={index} onClick={()=>{ dispatch(getCategoryName(category))}}   to="AllProduct" className={Categories.selectedCategory === category ? ' bg-[#2563EB] px-3 py-1 rounded-lg' : 'bg-transparent px-3 py-1'}>{category}</button>
    })}
    {/* <button onClick={()=>{ dispatch(getCategoryName("all"))}}   to="AllProduct" className=' bg-slate-600 p-2 rounded-md text-white'>All Product</button>
    <button onClick={()=>{ dispatch(getCategoryName("Men's Fashion"))}} to="AllProduct" className=' bg-slate-600 p-2 rounded-md text-white'>Men's Fashion</button>
    <button onClick={()=>{ dispatch(getCategoryName("Women's Fashion"))}} to="AllProduct" className=' bg-slate-600 p-2 rounded-md text-white'>Women's Fashion</button>
    <button onClick={()=>{ dispatch(getCategoryName("Electronics"))}} to="AllProduct" className=' bg-slate-600 p-2 rounded-md text-white '>Electronics</button> */}
</div>

            <div className="container my-1 m-auto ">
               <Outlet/>
            </div>

    </>
}

export default Home
