

import axios from 'axios'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import Loding from '../LODING/Loding'
import { Helmet } from 'react-helmet'
import ErrorPage from '../ERROR-PAGE/ErrorPage'
import { Link } from 'react-router-dom'
import Aos from 'aos'
import "aos/dist/aos.css"


function Categores() {

    function gitAllCategores() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    }

    useEffect(()=>{
        Aos.init({
            duration : 1000
        })
    },[])

    let { data , isError , isLoading } = useQuery("gitAllCategores" , gitAllCategores )
    

    if (isLoading) {
        return <Loding/>
    }

    // console.log("categryData" , data);

    if ( isError) return <ErrorPage/>

    return <>

    <Helmet>
      <title>Categores</title>
    </Helmet>
    
    <div className="container p-10 my-20 m-auto">
        <div className="row grid lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-1 gap-4">
            {data.data.data.length > 0 ? <>
                {data.data.data.map( ( category , idx )=>{
                return     <Link className=' cursor-pointer' to={`/SubCategories/${category._id}`} data-aos="flip-left">
                      <div className='  ' key={ idx }>
                <div className="card relative shadow-lg pb-3 border hover:border-blue-500  transition duration-400 hover:scale-[1.04] rounded-lg text-center">
                    <figure>
                        <img style={ { height : " 200px" } } className=' w-full rounded-lg rounded-b-none   ' src={category.image} alt={category.name} />
                    </figure>
                    <figcaption className=' py-2'>
                        <h2 className=' text-blue-600'>{category.name}</h2>
                    </figcaption>
                </div>
               </div>
                </Link>
                
            } )}
            </> : <Loding/> }
            


        </div>
    </div>

    </>
}

export default Categores
