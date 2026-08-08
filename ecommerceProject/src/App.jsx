

import { Routes, Route } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { HomePage } from './pages/HomePage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const loadCartItems = async () => {
    try {
      const response = await axios.get('/api/cart-items?expand=product');
      setCartItems(response.data);
    } catch (error) {
      console.error('Failed to load cart items:', error);
    }
  };

  useEffect(() => {
    let isCancelled = false;

    const fetchCartItems = async () => {
      try {
        const response = await axios.get('/api/cart-items?expand=product');
        if (!isCancelled) {
          setCartItems(response.data);
        }
      } catch (error) {
        console.error('Failed to load cart items:', error);
      }
    };

    void fetchCartItems();

    return () => {
      isCancelled = true;
    };
  }, []);

  const addToCart = async (productId, quantity = 1) => {
    try {
      await axios.post('/api/cart-items', { productId, quantity });
      await loadCartItems();
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const placeOrder = async () => {
    await axios.post('/api/orders');
    await loadCartItems();
  };

  return (
    <Routes>
      <Route index element={<HomePage cartItems={cartItems} onAddToCart={addToCart} />} />
      <Route path="checkout" element={<CheckoutPage cartItems={cartItems} onPlaceOrder={placeOrder} />} />
      <Route path="orders" element={<OrdersPage cartItems={cartItems} onAddToCart={addToCart} />} />
    </Routes>
  );
}

export default App
