// import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
// import type { Product } from "../../types/product";

// export interface CartItem {
//   product: Product;
//   quantity: number;
// }

// interface CartState {
//   items: CartItem[];
// }

// const initialState: CartState = {
//   items: [],
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart(
//       state,
//       action: PayloadAction<{ product: Product; quantity: number }>
//     ) {
//       const { product, quantity } = action.payload;
//       const existingItem = state.items.find(
//         (item) => item.product.id === product.id
//       );

//       if (existingItem) {
//         existingItem.quantity = Math.min(
//           existingItem.quantity + quantity,
//           product.inventory
//         );
//       } else {
//         state.items.push({ product, quantity });
//       }
//     },
//     removeFromCart(state, action: PayloadAction<string>) {
//       state.items = state.items.filter(
//         (item) => item.product.id !== action.payload
//       );
//     },
//     updateQuantity(
//       state,
//       action: PayloadAction<{ productId: string; quantity: number }>
//     ) {
//       const item = state.items.find(
//         (item) => item.product.id === action.payload.productId
//       );
//       if (item) {
//         item.quantity = action.payload.quantity;
//       }
//     },
//     clearCart(state) {
//       state.items = [];
//     },
//   },
// });

// export const { addToCart, removeFromCart, updateQuantity, clearCart } =
//   cartSlice.actions;
// export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../types/product";
import { Preferences } from "@capacitor/preferences";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const CART_STORAGE_KEY = "cart_items";

//helper function to save to storage
const saveToStorage = async (items: CartItem[]) => {
  try {
    await Preferences.set({
      key: CART_STORAGE_KEY,
      value: JSON.stringify(items),
    });
  } catch (error) {
    console.error("Error saving cart:", error);
  }
};

//helper function to load from storage
export const loadFromStorage = async (): Promise<CartItem[]> => {
  try {
    const result = await Preferences.get({ key: CART_STORAGE_KEY });
    return result.value ? JSON.parse(result.value) : [];
  } catch (error) {
    console.error("Error loading cart:", error);
    return [];
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(
      state,
      action: PayloadAction<{ product: Product; quantity: number }>
    ) {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        existingItem.quantity = Math.min(
          existingItem.quantity + quantity,
          product.inventory
        );
      } else {
        state.items.push({ product, quantity });
      }

      //save to storage after updating
      saveToStorage(state.items);
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      );

      //save to storage after updating
      saveToStorage(state.items);
    },
    updateQuantity(
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) {
      const item = state.items.find(
        (item) => item.product.id === action.payload.productId
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }

      //save to storage after updating
      saveToStorage(state.items);
    },
    clearCart(state) {
      state.items = [];

      //clear from storage
      Preferences.remove({ key: CART_STORAGE_KEY });
    },
    loadCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  loadCart,
} = cartSlice.actions;
export default cartSlice.reducer;
