import axios from "axios";
import React, { createContext, useState } from "react";
import toast from "react-hot-toast";

export const cartContext = createContext();

function CartContextProvider({ children }) {
  const [allProduct, setAllProduct] = useState([]);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [cartId, setCartId] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

 
 

  return (
    <cartContext.Provider
      value={{
      
        statusMessage,
        setStatusMessage,

        cartId,
        setCartId,


      }}
    >
      {children}
    </cartContext.Provider>
  );
}

export default CartContextProvider;