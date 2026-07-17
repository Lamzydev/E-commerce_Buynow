import { products } from '../data/products.js';
import '../App.css';

export function HomePage({ cartItems = [], addToCart }) {
  const handleAddToCart = (productId, quantity) => {
    addToCart(productId, quantity);
  };

  return (
    <div className="home-page">
      <div className="products-grid">
        {products.map((product) => {
          const isAdded = cartItems.some((item) => item.id === product.id);

          return (
            <div key={product.id} className="product-container">
              <div className="product-image-container">
                <img className="product-image" src={product.image} />
              </div>

              <div className="product-name limit-text-to-2-lines">{product.name}</div>

              <div className="product-rating-container">
                <img
                  className="product-rating-stars"
                  src={`images/ratings/rating-${product.rating.stars * 10}.png`}
                />
                <div className="product-rating-count link-primary">{product.rating.count}</div>
              </div>

              <div className="product-price">${(product.priceCents / 100).toFixed(2)}</div>

              <div className="product-quantity-container">
                <select
                  defaultValue="1"
                  onChange={(event) => {
                    const selectedQuantity = Number(event.target.value);
                    product.selectedQuantity = selectedQuantity;
                  }}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>

              <div className="product-spacer"></div>

              <div className="added-to-cart" style={{ opacity: isAdded ? 1 : 0 }}>
                <img src="images/icons/checkmark.png" />
                Added
              </div>

              <button
                className="add-to-cart-button button-primary"
                type="button"
                onClick={() => handleAddToCart(product.id, product.selectedQuantity || 1)}
              >
                {isAdded ? 'Added' : 'Add to Cart'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
