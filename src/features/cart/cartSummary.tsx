import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { applyDiscount, clearCart, removeItem, updateQuantity } from './cartSlice';

export const CartSummary: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, discountCode, discountPercent } = useAppSelector((state) => state.cart);
  const [promoInput, setPromoInput] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const total = Math.max(0, subtotal - discountAmount);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(applyDiscount(promoInput));
  };

  return (
    <div style={{ flex: '1 1 380px', backgroundColor: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, fontSize: '20px', color: '#0f172a', fontWeight: 700 }}>
          🛒 Giỏ Hàng ({totalQuantity})
        </h2>
        {items.length > 0 && (
          <button
            onClick={() => dispatch(clearCart())}
            style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '13px', cursor: 'pointer', fontWeight: 600 }}
          >
            Xóa tất cả
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8' }}>
          <div style={{ fontSize: '40px', marginBottom: '8px' }}>🛍️</div>
          <p style={{ margin: 0, fontSize: '14px' }}>Giỏ hàng đang trống.</p>
        </div>
      ) : (
        <>
          <div style={{ display: 'grid', gap: '12px', marginBottom: '20px', maxHeight: '320px', overflowY: 'auto' }}>
            {items.map((item) => (
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
                  <span style={{ fontSize: '24px' }}>{item.image}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '14px', color: '#1e293b' }}>{item.name}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>${item.price}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                    style={{ width: '26px', height: '26px', border: '1px solid #cbd5e1', borderRadius: '6px', backgroundColor: '#ffffff', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    -
                  </button>
                  <span style={{ fontSize: '14px', fontWeight: 700, minWidth: '18px', textAlign: 'center' }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                    style={{ width: '26px', height: '26px', border: '1px solid #cbd5e1', borderRadius: '6px', backgroundColor: '#ffffff', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => dispatch(removeItem(item.id))}
                    style={{ border: 'none', background: 'none', color: '#94a3b8', cursor: 'pointer', marginLeft: '4px', fontSize: '16px' }}
                    title="Xóa sản phẩm"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Mã giảm giá (Thử: REDUX10)"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
            />
            <button
              type="submit"
              style={{ backgroundColor: '#0f172a', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}
            >
              Áp dụng
            </button>
          </form>

          <div style={{ borderTop: '2px dashed #e2e8f0', paddingTop: '16px', display: 'grid', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#64748b' }}>
              <span>Tạm tính:</span>
              <span>${subtotal}</span>
            </div>
            {discountPercent > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#16a34a', fontWeight: 600 }}>
                <span>Giảm giá ({discountCode}):</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>
              <span>Tổng tiền:</span>
              <span style={{ color: '#4f46e5' }}>${total.toFixed(2)}</span>
            </div>

            <button
              onClick={() => alert(`Thanh toán thành công $${total.toFixed(2)}!`)}
              style={{
                marginTop: '12px',
                width: '100%',
                backgroundColor: '#16a34a',
                color: '#ffffff',
                border: 'none',
                padding: '12px',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '15px',
              }}
            >
              Thanh Toán Ngay
            </button>
          </div>
        </>
      )}
    </div>
  );
};