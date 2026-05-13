import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

// =================================
// Async Thunks
// =================================

export const addProductToCart = createAsyncThunk(
  "cartSlice/addProductToCart",
  async (productId) => {
    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { productId },
      { headers: { token: localStorage.getItem("tkn") } }
    );
    return data;
  }
);


export const getCart = createAsyncThunk(
  "cart/getCart",
  async () => {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { headers: { token: localStorage.getItem("tkn") } }
    );
    return data;
  }
);

export const removeCart = createAsyncThunk(
  "cartSlice/removeCart",
  async (id) => {
    const { data } = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      { headers: { token: localStorage.getItem("tkn") } }
    );
    return data;
  }
);

export const updateCart = createAsyncThunk(
  "cartSlice/updateCart",
  async ({ id, count }) => {
    const { data } = await axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      { count },
      { headers: { token: localStorage.getItem("tkn") } }
    );
    return data;
  }
);


// ====== Wishlist ======
export const addProductInWishList = createAsyncThunk(
  "cartSlice/addProductInWishList",
  async (productId) => {
    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      { productId },
      { headers: { token: localStorage.getItem("tkn") } }
    );
    return productId; // أرسل الـ productId
  }
);

export const removeProductFromWishList = createAsyncThunk(
  "cartSlice/removeProductFromWishList",
  async (productId) => {
    await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      { headers: { token: localStorage.getItem("tkn") } }
    );
    return productId;
  }
);

export const clearAllProductInCart = createAsyncThunk("cartSlice/clearAllProductInCart" , async ()=>{
    await axios.delete("https://ecommerce.routemisr.com/api/v1/cart" , {
      headers : {
        token: localStorage.getItem("tkn"),
      }
    })
})

// =================================
// Slice
// =================================

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    userId: null,
    cartId : null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    allProducts: [],
    totalCartPrice: 0,
    numOfCartItems: 0,
    wishlist: [], // <-- أضفنا wishlist
  },
  reducers: {},
  extraReducers: (builder) => {
    // Add Product
    builder.addCase(addProductToCart.pending, (state) => {
      // state.isLoading = true;
            state.isSuccess = false;
    });
    builder.addCase(addProductToCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.allProducts = action.payload.data.products;
      state.totalCartPrice = action.payload.data.totalCartPrice;
      toast.success("Product added to cart", { duration: 1500 });
    });
    builder.addCase(addProductToCart.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      toast.error("Error adding product to cart", { duration: 1500 });
    });



    builder.addCase(getCart.fulfilled, (state, action) => {
      state.allProducts = action.payload.data.products;
      state.totalCartPrice = action.payload.data.totalCartPrice;
      state.cartId = action.payload.data._id
      state.isLoading = false;
      state.isError = false
    });

    builder.addCase(getCart.pending , (state)=>{
      state.isLoading = true;
      state.isError = false
    })

    builder.addCase(getCart.rejected , (state)=>{
      state.isLoading = false;
      state.isError = true
      toast.error("Error geting product cart", { duration: 1500 });
    })




    // Remove Product
    builder.addCase(removeCart.pending, (state) => {
      // state.isLoading = true;
      state.isError = false
    });
    builder.addCase(removeCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allProducts = action.payload.data.products;
      state.totalCartPrice = action.payload.data.totalCartPrice;
      toast.success("Product removed from cart", { duration: 1500 });
    });
    builder.addCase(removeCart.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      toast.error("Error removing product", { duration: 1500 });
    });


    // Update Product Count
    builder.addCase(updateCart.pending, (state) => {
      // state.isLoading = true;
            state.isError = false
    });
    builder.addCase(updateCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.allProducts = action.payload.data.products;
      state.totalCartPrice = action.payload.data.totalCartPrice;
      toast.success("Cart updated", { duration: 1500 });
    });
    builder.addCase(updateCart.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      toast.error("Error updating cart", { duration: 1500 });
    });
    

    // Wishlist - Add
    builder.addCase(addProductInWishList.pending, (state) => {
      // state.isLoading = true;
            state.isError = false
    });
    builder.addCase(addProductInWishList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      if (!state.wishlist.includes(action.payload)) {
        state.wishlist.push(action.payload);
      }
      toast.success("Product added to wishlist", { duration: 1500 });
    });
    builder.addCase(addProductInWishList.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      toast.error("Error adding to wishlist", { duration: 1500 });
    });

    // Wishlist - Remove
    builder.addCase(removeProductFromWishList.fulfilled, (state, action) => {
      state.wishlist = state.wishlist.filter(id => id !== action.payload);
      toast.success("Product removed from wishlist", { duration: 1500 });
    });
    builder.addCase(removeProductFromWishList.rejected, () => {
      toast.error("Error removing from wishlist", { duration: 1500 });
    });

    builder.addCase(clearAllProductInCart.fulfilled , (state)=>{
      state.isError = false ;
      state.isLoading = false ;
      state.totalCartPrice = 0
      state.allProducts = []
    })

    builder.addCase(clearAllProductInCart.pending , (state)=>{
      state.isError = false ;
      state.isLoading = true ;
    })


    builder.addCase(clearAllProductInCart.rejected , (state)=>{
      state.isError = true ;
      state.isLoading = false ;
    })


  },
});

export default cartSlice.reducer;
