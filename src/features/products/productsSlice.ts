import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Laptop' | 'Phụ kiện' | 'Thiết bị âm thanh';
  rating: number;
  image: string;
  description: string;
}

interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  selectedCategory: string;
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
  selectedCategory: 'All',
};

export const fetchProducts = createAsyncThunk<Product[], void>(
  'products/fetchProducts',
  async () => {
    return new Promise<Product[]>((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'p1',
            name: 'MacBook Pro 14" M3',
            price: 1599,
            category: 'Laptop',
            rating: 4.9,
            image: '💻',
            description: 'Chip M3 mạnh mẽ, màn hình Liquid Retina XDR.',
          },
          {
            id: 'p2',
            name: 'Sony WH-1000XM5',
            price: 349,
            category: 'Thiết bị âm thanh',
            rating: 4.8,
            image: '🎧',
            description: 'Chống ồn chủ động đỉnh cao, pin 30 giờ.',
          },
          {
            id: 'p3',
            name: 'Keychron K2 V2',
            price: 89,
            category: 'Phụ kiện',
            rating: 4.7,
            image: '⌨️',
            description: 'Bàn phím cơ Bluetooth gõ siêu êm.',
          },
          {
            id: 'p4',
            name: 'Logitech MX Master 3S',
            price: 99,
            category: 'Phụ kiện',
            rating: 4.9,
            image: '🖱️',
            description: 'Con cuộn MagSpeed, cảm biến 8K DPI.',
          },
          {
            id: 'p5',
            name: 'Marshall Emberton II',
            price: 169,
            category: 'Thiết bị âm thanh',
            rating: 4.6,
            image: '🔊',
            description: 'Âm thanh 360 độ, kháng nước IP67.',
          },
          {
            id: 'p6',
            name: 'Dell XPS 13 Plus',
            price: 1399,
            category: 'Laptop',
            rating: 4.7,
            image: '💻',
            description: 'Mỏng nhẹ cao cấp, màn hình OLED 3.5K.',
          },
        ]);
      }, 700);
    });
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Không thể tải danh sách sản phẩm';
      });
  },
});

export const { setSelectedCategory } = productsSlice.actions;
export default productsSlice.reducer;