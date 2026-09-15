import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../products/productsSlice';

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  discountCode: string;
  discountPercent: number;
}

const initialState: CartState = {
  items: [],
  discountCode: '',
  discountPercent: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Product>) {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== action.payload.id);
        } else {
          item.quantity = action.payload.quantity;
        }
      }
    },
    applyDiscount(state, action: PayloadAction<string>) {
      if (action.payload.trim().toUpperCase() === 'REDUX10') {
        state.discountCode = 'REDUX10';
        state.discountPercent = 10;
      } else {
        state.discountCode = '';
        state.discountPercent = 0;
      }
    },
    clearCart(state) {
      state.items = [];
      state.discountCode = '';
      state.discountPercent = 0;
    },
  },
});

export const { addItem, removeItem, updateQuantity, applyDiscount, clearCart } = cartSlice.actions;
export default cartSlice.reducer;