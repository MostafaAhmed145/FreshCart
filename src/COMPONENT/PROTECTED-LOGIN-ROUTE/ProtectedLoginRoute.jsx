
import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedLoginRoute({children }) {

    if (localStorage.getItem("tkn")) {
       return <Navigate to={"/Home"}/>
    }
    
  return <>
    {children}
  </>
}
