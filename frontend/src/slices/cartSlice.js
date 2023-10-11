import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/utils";
import { toast } from "react-toastify";

const cartItems = localStorage.getItem("cart");
const initialState = cartItems
  ? JSON.parse(cartItems)
  : { cartItems: [], favoriteItems: [], shippingAddress: {} };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const duplicateItem = state.cartItems.find((i) => i._id === item._id);
      if (duplicateItem) {
        state.cartItems = state.cartItems.map((i) =>
          i._id === duplicateItem._id ? item : i
        );
        if (duplicateItem.cnt === item.cnt) {
          toast.warning("Item already in cart.");
        } else {
          toast.success("Item updated to cart.");
        }
      } else {
        state.cartItems = [...state.cartItems, item];
        toast.success("Item added to cart.");
      }
      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i._id !== action.payload);
      toast.success("Item removed from cart.");
      return updateCart(state);
    },
    addToFavorites: (state, action) => {
      const item = action.payload;
      const duplicateItem = state.favoriteItems.find((i) => i._id === item._id);
      if (duplicateItem) {
        toast.warning("Item already in favorites.");
      } else {
        state.favoriteItems = [...state.favoriteItems, item];
        localStorage.setItem("cart", JSON.stringify(state));
        toast.success("Item added to favorites.");
      }
    },
    updateLocalFavorites: (state, action) => {
      state.favoriteItems = [...action.payload];
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromFavorites: (state, action) => {
      const item = action.payload;
      state.favoriteItems = state.favoriteItems.filter(
        (i) => i._id !== item._id
      );
      localStorage.setItem("cart", JSON.stringify(state));
      toast.success("Item removed from favorites.");
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify(state));
    },
    resetCart: (state) =>
      (state = { cartItems: [], favoriteItems: [], shippingAddress: {} }),
  },
});

export const {
  addToCart,
  removeFromCart,
  addToFavorites,
  updateLocalFavorites,
  removeFromFavorites,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
  resetCart,
} = cartSlice.actions;
export default cartSlice.reducer;
