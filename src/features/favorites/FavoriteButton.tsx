import React from 'react';
import { Product, useFavoritesStore } from './useFavoritesStore';

interface FavoriteButtonProps {
  product: Product;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ product }) => {
  // Selector giúp chỉ re-render nút bấm này khi chính sản phẩm này thay đổi
  const isFav = useFavoritesStore((state) =>
    state.favorites.some((item) => item.id === product.id)
  );
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite(product);
      }}
      title={isFav ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
      style={{
        background: isFav ? '#fef2f2' : '#f8fafc',
        border: `1px solid ${isFav ? '#fecaca' : '#e2e8f0'}`,
        borderRadius: '50%',
        width: '36px',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'all 0.2s ease',
      }}
    >
      {isFav ? '❤️' : '🤍'}
    </button>
  );
};