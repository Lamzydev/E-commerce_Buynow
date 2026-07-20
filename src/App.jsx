
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';
import axios from 'axios';
import { HomePage } from './pages/HomePage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to load products:', error);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/cart-items?expand=product');
        const normalizedCartItems = response.data.map((item) => ({
          id: item.productId,
          quantity: item.quantity,
          product: item.product,
        }));
        setCartItems(normalizedCartItems);
      } catch (error) {
        console.error('Failed to load cart items:', error);
      }
    };

    loadCartItems();
  }, []);

  const addToCart = async (productId, quantity = 1) => {
    try {
      await axios.post('http://localhost:3000/api/cart-items', { productId, quantity });
      const response = await axios.get('http://localhost:3000/api/cart-items?expand=product');
      const normalizedCartItems = response.data.map((item) => ({
        id: item.productId,
        quantity: item.quantity,
        product: item.product,
      }));
      setCartItems(normalizedCartItems);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  return (
    <>
      <Navbar cartItems={cartItems} />
      <Routes>
        <Route path="/" element={<HomePage cartItems={cartItems} addToCart={addToCart} products={products} />} />
        <Route path="/orders" element={<OrdersPage addToCart={addToCart} products={products} />} />
        <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} products={products} />} />
      </Routes>
    </>
  );
}

export default App;
