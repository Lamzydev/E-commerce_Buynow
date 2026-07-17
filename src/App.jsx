
import { useState } from 'react';
import { Routes, Route } from 'react-router';
import { HomePage } from './pages/HomePage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import Navbar from './components/Navbar';
import { products } from './data/products.js';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (productId, quantity = 1) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === productId);

      if (existingItem) {
        return prev.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }

      return [...prev, { id: productId, quantity }];
    });
  };

  return (
    <>
      <Navbar cartItems={cartItems} />
      <Routes>
        <Route path="/" element={<HomePage cartItems={cartItems} addToCart={addToCart} />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} products={products} />} />
      </Routes>
    </>
  );
}

export default App;
