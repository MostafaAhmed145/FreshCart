import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import Loding from '../LODING/Loding'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import Aos from 'aos'
import "aos/dist/aos.css"
import { Helmet } from 'react-helmet'
import ErrorPage from '../ERROR-PAGE/ErrorPage'

function Brandes() {

  function getAllBrandes() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands")
  }

  let { data, isError, isLoading } = useQuery(
    "getAllBrandes",
    getAllBrandes
  )

  React.useEffect(() => {
    Aos.init({ duration: 1500 })
  }, [])

  if (isLoading) {
    return <Loding />
  }

  if (isError) {
    return <ErrorPage />
  }

  return (
    <>
      <Helmet>
        <title>Brandes</title>
      </Helmet>

      <div className="container p-10 my-20 m-auto">
        <div className="row grid lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-1 text-center gap-4">

          {data?.data?.data?.length > 0 ? (
            data.data.data.map((brand, index) => (
              <div
                className='drop-shadow-xl rounded-lg overflow-hidden'
                key={index}
              >
                <div className="card">
                  <figure>
                    <LazyLoadImage
                      className='w-full border transition duration-300 hover:scale-[1.1]'
                      src={brand.image}
                      alt={brand.name}
                      effect="opacity"
                    />
                  </figure>
                </div>
              </div>
            ))
          ) : (
            <Loding />
          )}

        </div>
      </div>
    </>
  )
}

export default Brandes