import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import Navbar from '../components/Navbar';
import Herosection from '../components/Herosection';
import Footers from '../components/footers';

export function HomePage({ cartItems = [], onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';
  const landingProducts = products.slice(0, 4);

  useEffect(() => {
    axios
      .get('/api/products', { params: searchTerm ? { search: searchTerm } : {} })
      .then((response) => {
        console.log('Loaded products:', response.data.length);
        setProducts(response.data);
      })
      .catch((err) => {
        console.error('Failed to load products via axios:', err);
      });
  }, [searchTerm]);

  const handleAddToCart = async (productId) => {
    const quantity = selectedQuantities[productId] || 1;
    if (onAddToCart) {
      await onAddToCart(productId, quantity);
    }
  };

  const handleQuantityChange = (productId, quantity) => {
    setSelectedQuantities((previous) => ({ ...previous, [productId]: quantity }));
  };

  return (
    <>
      <title>Ecommerce Project</title>
      <Navbar variant="landing" />
      <main className="home-page">
        <Herosection
          products={landingProducts}
          totalProducts={products.length}
          cartItems={cartItems}
          selectedQuantities={selectedQuantities}
          onQuantityChange={handleQuantityChange}
          onAddToCart={handleAddToCart}
          searchTerm={searchTerm}
        />
      </main>
      <Footers />
    </>
  );
}
