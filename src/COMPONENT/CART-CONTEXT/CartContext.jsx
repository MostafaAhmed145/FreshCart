import axios from "axios";
import React, { createContext, useState } from "react";
import toast from "react-hot-toast";

export const cartContext = createContext();

function CartContextProvider({ children }) {
  const [count, setCount] = useState(0);
  const [allProduct, setAllProduct] = useState([]);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [cartId, setCartId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  // ================= Add Product To Cart =================
  async function addProductToCart(productId) {
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );

      toast.success("Product added successfully", {
        duration: 1500,
      });

      setNumOfCartItems(response.data.numOfCartItems);

    } catch (error) {
      toast.error("Error adding product", {
        duration: 1500,
      });

      console.log(error);
    }
  }

  // ================= Update Cart =================
  async function updatingCart(id, count) {
    try {
      const res = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );

      setCount(count);
      setAllProduct(res.data.data.products);
      setNumOfCartItems(res.data.numOfCartItems);
      setTotalCartPrice(res.data.data.totalCartPrice);

    } catch (err) {
      console.log(err);
    }
  }

  // ================= Remove Product =================
  async function removeCart(id) {
    try {
      const res = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );

      setAllProduct(res.data.data.products);
      setNumOfCartItems(res.data.numOfCartItems);
      setTotalCartPrice(res.data.data.totalCartPrice);

      toast.success("Product deleted successfully", {
        duration: 3000,
      });

    } catch (err) {
      toast.error("Error deleting product", {
        duration: 3000,
      });

      console.log(err);
    }
  }

  // ================= Clear Cart =================
  async function clearAllProductInCart() {
    try {
      await axios.delete(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );

      setAllProduct([]);
      setNumOfCartItems(0);
      setTotalCartPrice(0);

      toast.success("Cart cleared successfully", {
        duration: 3000,
      });

    } catch (err) {
      toast.error("Error clearing cart", {
        duration: 3000,
      });

      console.log(err);
    }
  }

  // ================= Wishlist =================
  async function addProductInWishList(productId) {
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );

      if (res.data.status === "success") {
        setStatusMessage(res.data.status);

        toast.success(res.data.message, {
          duration: 3000,
        });
      }

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <cartContext.Provider
      value={{
        userId,
        setUserId,

        addProductToCart,

        addProductInWishList,
        statusMessage,
        setStatusMessage,

        cartId,
        setCartId,

        updatingCart,

        totalCartPrice,
        setTotalCartPrice,

        numOfCartItems,
        setNumOfCartItems,

        removeCart,

        clearAllProductInCart,

        setAllProduct,
        allProduct,

        setCount,
        count,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}

export default CartContextProvider;