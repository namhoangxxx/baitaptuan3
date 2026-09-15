import { CartSummary } from './features/cart/cartSummary';
import { ProductList } from './features/products/productList';

function App() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '32px 16px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
        
        <header style={{ marginBottom: '28px', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ backgroundColor: '#4f46e5', color: '#fff', width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
              S
            </div>
            <h1 style={{ margin: 0, fontSize: '24px', color: '#0f172a', fontWeight: 800 }}>
              Giỏ hàng 
            </h1>
          </div>
        </header>

        <main style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <ProductList />
          <CartSummary />
        </main>
      </div>
    </div>
  );
}

export default App;