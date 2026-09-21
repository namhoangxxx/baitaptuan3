import { CartSummary } from './features/cart/cartSummary';
import { FavoritesDrawer } from './features/favorites/FavoritesDrawer';
import { ProductList } from './features/products/productList';

function App() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '32px 16px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
        
        {/* HEADER */}
        <header style={{ 
          marginBottom: '28px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ backgroundColor: '#4f46e5', color: '#fff', width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
              S
            </div>
            <h1 style={{ margin: 0, fontSize: '24px', color: '#0f172a', fontWeight: 800 }}>
              Cửa Hàng Công Nghệ
            </h1>
          </div>

          {/* Đặt nút Yêu thích ở góc phải Header */}
          <FavoritesDrawer />
        </header>

        {/* MAIN CONTENT */}
        <main style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <ProductList />
          <CartSummary />
        </main>

      </div>
    </div>
  );
}

export default App;