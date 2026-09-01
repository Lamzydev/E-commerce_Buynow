import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import Navbar from '../components/Navbar';

export function HomePage({ cartItems = [], onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';

  useEffect(() => {
    axios.get('/api/products', { params: searchTerm ? { search: searchTerm } : {} }).then((response) => {
      setProducts(response.data);
    });
  }, [searchTerm]);

  const handleAddToCart = async (productId) => {
    const quantity = selectedQuantities[productId] || 1;
    if (onAddToCart) {
      await onAddToCart(productId, quantity);
    }
  };

  return (
    <>
      <title>Ecommerce Project</title>
      <Navbar cartItems={cartItems} />

      <div className="home-page">
        {searchTerm && (
          <div className="search-results-heading">
            {products.length} result{products.length === 1 ? '' : 's'} for “{searchTerm}”
          </div>
        )}
        <div className="products-grid">
          {products.map((product) => {
            const isAdded = cartItems.some((item) => item.productId === product.id);
            return (
              <div key={product.id} className="product-container">
                <div className="product-image-container">
                  <img className="product-image" src={product.image} alt={product.name} />
                </div>

                <div className="product-name limit-text-to-2-lines">{product.name}</div>

                <div className="product-rating-container">
                  <img
                    className="product-rating-stars"
                    src={`images/ratings/rating-${Math.round(product.rating.stars * 10)}.png`}
                    alt={`${product.rating.stars} stars`}
                  />
                  <div className="product-rating-count link-primary">{product.rating.count}</div>
                </div>

                <div className="product-price">${(product.priceCents / 100).toFixed(2)}</div>

                <div className="product-quantity-container">
                  <select
                    value={selectedQuantities[product.id] || 1}
                    onChange={(event) =>
                      setSelectedQuantities((prev) => ({
                        ...prev,
                        [product.id]: Number(event.target.value),
                      }))
                    }
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((quantity) => (
                      <option key={quantity} value={quantity}>
                        {quantity}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="product-spacer"></div>

                <div className="added-to-cart" style={{ opacity: isAdded ? 1 : 0 }}>
                  <img src="images/icons/checkmark.png" alt="checkmark" />
                  Added
                </div>

                <button
                  className="add-to-cart-button button-primary"
                  type="button"
                  onClick={() => handleAddToCart(product.id)}
                >
                  {isAdded ? 'Added' : 'Add to Cart'}
                </button>
              </div>
            );
          })}
        </div>
        {products.length === 0 && <p className="no-search-results">No products matched your search.</p>}
      </div>
    </>
  );
}
