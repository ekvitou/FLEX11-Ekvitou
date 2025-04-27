// src/features/cart/cartSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],  // Cart items
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add to cart
    addToCart: (state, action) => {
      const existing = state.items.find(item => item.uuid === action.payload.uuid);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity });
      }
    },
    // Update item quantity
    updateQuantity: (state, action) => {
      const item = state.items.find(i => i.uuid === action.payload.uuid);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    // Remove item from cart
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.uuid !== action.payload);
    },
    // Clear all items from cart
    clearCart: (state) => {
      state.items = [];
    },
  },
});

// Export the actions to use in other components
export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;

// New selector to get the total count of items in the cart
export const selectCartItemCount = (state) => {
  return state.cart.items.reduce((total, item) => total + item.quantity, 0);
};

export default cartSlice.reducer;

