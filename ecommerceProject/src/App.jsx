

import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { HomePage } from './pages/HomePage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import AccountPage from './pages/AccountPage.jsx';
import ResetPasswordPage from './pages/ResetPasswordPage.jsx';
import CustomerDashboard from './pages/CustomerDashboard.jsx';
import ProtectedRoute from './auth/ProtectedRoute.jsx';
import { useAuth } from './auth/useAuth.js';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  const loadCartItems = async () => {
    try {
      const response = await axios.get('/api/cart-items?expand=product');
      setCartItems(response.data);
    } catch (error) {
      console.error('Failed to load cart items:', error);
    }
  };

  useEffect(() => {
    if (isLoading || !user) return undefined;

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
  }, [isLoading, user]);

  const addToCart = async (productId, quantity = 1) => {
    if (!user) {
      navigate('/account/sign-in');
      return;
    }
    try {
      await axios.post('/api/cart-items', { productId, quantity });
      await loadCartItems();
    } catch (error) {
      console.error('Failed to add to cart:', error);
      if (error.response?.status === 401) navigate('/account/sign-in');
    }
  };

  const placeOrder = async () => {
    await axios.post('/api/orders');
    await loadCartItems();
  };

  const visibleCartItems = user ? cartItems : [];

  return (
    <Routes>
      <Route index element={<HomePage cartItems={visibleCartItems} onAddToCart={addToCart} />} />
      <Route path="account/sign-in" element={<AccountPage mode="sign-in" />} />
      <Route path="account/register" element={<AccountPage mode="register" />} />
      <Route path="account/forgot-password" element={<AccountPage mode="forgot-password" />} />
      <Route path="reset-password" element={<ResetPasswordPage />} />
      <Route path="account/dashboard" element={<ProtectedRoute><CustomerDashboard cartItems={visibleCartItems} /></ProtectedRoute>} />
      <Route path="checkout" element={<ProtectedRoute><CheckoutPage cartItems={visibleCartItems} onPlaceOrder={placeOrder} /></ProtectedRoute>} />
      <Route path="orders" element={<ProtectedRoute><OrdersPage cartItems={visibleCartItems} onAddToCart={addToCart} /></ProtectedRoute>} />
    </Routes>
  );
}

export default App
