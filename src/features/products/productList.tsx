import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addItem } from '../cart/cartSlice';
import { FavoriteButton } from '../favorites/FavoriteButton';
import { fetchProducts, setSelectedCategory } from './productsSlice';

export const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, status, error, selectedCategory } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const categories = ['All', 'Laptop', 'Phụ kiện', 'Thiết bị âm thanh'];

  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter((item) => item.category === selectedCategory);

  if (status === 'loading') {
    return (
      <div style={{ flex: 1, padding: '40px', textAlign: 'center', backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
        <div style={{ fontSize: '24px', marginBottom: '12px' }}>⏳</div>
        <p style={{ color: '#64748b', margin: 0, fontWeight: 500 }}>Đang tải danh sách sản phẩm...</p>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div style={{ flex: 1, padding: '24px', backgroundColor: '#fef2f2', color: '#dc2626', borderRadius: '16px', border: '1px solid #fecaca' }}>
        ⚠️ Lỗi: {error}
      </div>
    );
  }

  return (
    <div style={{ flex: '1 1 540px', backgroundColor: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ margin: '0 0 12px 0', fontSize: '20px', color: '#0f172a', fontWeight: 700 }}>
          📦 Danh Sách Sản Phẩm
        </h2>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => dispatch(setSelectedCategory(cat))}
              style={{
                padding: '6px 14px',
                borderRadius: '20px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 600,
                backgroundColor: selectedCategory === cat ? '#4f46e5' : '#f1f5f9',
                color: selectedCategory === cat ? '#ffffff' : '#475569',
                transition: 'all 0.2s',
              }}
            >
              {cat === 'All' ? 'Tất cả' : cat}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
        {filteredItems.map((product) => (
          <div
            key={product.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid #f1f5f9',
              backgroundColor: '#fafafa',
            }}
          >
            <div>
              <div style={{ fontSize: '36px', marginBottom: '8px', textAlign: 'center' }}>{product.image}</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {product.category}
              </div>
              <h3 style={{ margin: '4px 0', fontSize: '15px', color: '#1e293b', fontWeight: 600 }}>{product.name}</h3>
              <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#64748b', lineHeight: '1.4' }}>
                {product.description}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px dashed #e2e8f0' }}>
              <div>
                <span style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>${product.price}</span>
                <span style={{ fontSize: '12px', color: '#f59e0b', marginLeft: '6px' }}>★ {product.rating}</span>
              </div>

              {/* Nhóm cụm nút hành động */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => dispatch(addItem(product))}
                  style={{
                    backgroundColor: '#4f46e5',
                    color: '#ffffff',
                    border: 'none',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 600,
                  }}
                >
                  + Thêm
                </button>

                <FavoriteButton product={product} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};