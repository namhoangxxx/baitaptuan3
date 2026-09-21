import React, { useState } from 'react';
import { useFavoritesStore } from './useFavoritesStore';

export const FavoritesDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { favorites, removeFavorite, clearFavorites } = useFavoritesStore();

  return (
    <>
      {/* Nút bấm hiển thị trên Header kèm Badge đếm số lượng */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'relative',
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          padding: '8px 16px',
          borderRadius: '10px',
          cursor: 'pointer',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <span>❤️ Yêu thích</span>
        {favorites.length > 0 && (
          <span
            style={{
              backgroundColor: '#ef4444',
              color: '#ffffff',
              borderRadius: '20px',
              padding: '2px 8px',
              fontSize: '12px',
              fontWeight: 700,
            }}
          >
            {favorites.length}
          </span>
        )}
      </button>

      {/* Pop-up Drawer khi mở */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(4px)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '380px',
              height: '100%',
              backgroundColor: '#ffffff',
              padding: '24px',
              boxShadow: '-4px 0 25px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {/* Header Drawer */}
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px',
                  borderBottom: '1px solid #f1f5f9',
                  paddingBottom: '12px',
                }}
              >
                <h3 style={{ margin: 0, fontSize: '18px', color: '#0f172a' }}>
                  ❤️ Danh Sách Yêu Thích ({favorites.length})
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '18px' }}
                >
                  ✕
                </button>
              </div>

              {/* Danh sách các mục */}
              {favorites.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#94a3b8', padding: '40px 0' }}>
                  <div style={{ fontSize: '40px', marginBottom: '8px' }}>💔</div>
                  <p>Chưa có sản phẩm yêu thích nào</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: '12px', maxHeight: '70vh', overflowY: 'auto' }}>
                  {favorites.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px',
                        backgroundColor: '#f8fafc',
                        borderRadius: '10px',
                        border: '1px solid #f1f5f9',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '24px' }}>{item.image || '📦'}</span>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '14px', color: '#1e293b' }}>
                            {item.name}
                          </div>
                          <div style={{ fontSize: '13px', color: '#4f46e5', fontWeight: 700 }}>
                            ${item.price}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFavorite(item.id)}
                        style={{
                          border: 'none',
                          background: 'none',
                          color: '#ef4444',
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontSize: '13px',
                        }}
                      >
                        Bỏ thích
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Drawer */}
            {favorites.length > 0 && (
              <button
                onClick={clearFavorites}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#fef2f2',
                  color: '#ef4444',
                  border: '1px solid #fecaca',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                Xóa tất cả sản phẩm yêu thích
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};