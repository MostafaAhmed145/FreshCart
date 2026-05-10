

import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../NAVBAR/NavBar'
import Foter from '../FOTER/Foter'
import ScrollToTopButton from '../ScrollToTopButton/ScrollToTopButton'
// import ScrollToTopButton from '../ScrollToTopButton/ScrollToTopButton'

function LayOut() {
    return <>


    <NavBar/>
    
    <Outlet/>
        <ScrollToTopButton/>

    <Foter/>

    </>
}

export default LayOut
