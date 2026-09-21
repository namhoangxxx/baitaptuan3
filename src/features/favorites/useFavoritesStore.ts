import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  category?: string;
}

interface FavoritesState {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  removeFavorite: (id: string) => void;
  clearFavorites: () => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      // Thêm hoặc Xóa sản phẩm khỏi danh sách yêu thích
      toggleFavorite: (product) => {
        const { favorites } = get();
        const exists = favorites.some((item) => item.id === product.id);

        if (exists) {
          set({ favorites: favorites.filter((item) => item.id !== product.id) });
        } else {
          set({ favorites: [...favorites, product] });
        }
      },

      // Xóa 1 sản phẩm
      removeFavorite: (id) => {
        set((state) => ({
          favorites: state.favorites.filter((item) => item.id !== id),
        }));
      },

      // Xóa toàn bộ
      clearFavorites: () => set({ favorites: [] }),

      // Kiểm tra xem sản phẩm đã yêu thích chưa
      isFavorite: (id) => {
        return get().favorites.some((item) => item.id === id);
      },
    }),
    {
      name: 'user-favorites-storage', // Tên key lưu trong LocalStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);