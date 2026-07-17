import '../App.css';
import { Link } from 'react-router';

export function CheckoutPage({ cartItems = [], products = [] }) {
  const cartProducts = cartItems.map((item) => {
    const product = products.find((productItem) => productItem.id === item.id);
    return product ? { ...product, quantity: item.quantity } : null;
  }).filter(Boolean);

  const itemCount = cartProducts.reduce((total, product) => total + product.quantity, 0);
  const subtotalCents = cartProducts.reduce((total, product) => total + product.priceCents * product.quantity, 0);
  const subtotalValue = subtotalCents / 100;
  const shippingValue = itemCount > 0 ? 4.99 : 0;
  const estimatedTaxValue = subtotalValue * 0.1;
  const totalValue = subtotalValue + shippingValue + estimatedTaxValue;

  return (
    <>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-middle-section">
            Checkout (<Link className="return-to-home-link" to="/">
              {itemCount} item{itemCount === 1 ? '' : 's'}
            </Link>)
          </div> 

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <div className="order-summary">
            {cartProducts.length === 0 ? (
              <div className="cart-item-container">
                <div className="delivery-date">Your cart is empty.</div>
              </div>
            ) : (
              cartProducts.map((product) => (
                <div className="cart-item-container" key={product.id}>
                  <div className="delivery-date">Delivery date: Tuesday, June 21</div>

                  <div className="cart-item-details-grid">
                    <img className="product-image" src={product.image} />

                    <div className="cart-item-details">
                      <div className="product-name">{product.name}</div>
                      <div className="product-price">${(product.priceCents / 100).toFixed(2)}</div>
                      <div className="product-quantity">
                        <span>
                          Quantity: <span className="quantity-label">{product.quantity}</span>
                        </span>
                      </div>
                    </div>

                    <div className="delivery-options">
                      <div className="delivery-options-title">Choose a delivery option:</div>
                      <div className="delivery-option">
                        <input type="radio" checked className="delivery-option-input" name={`delivery-option-${product.id}`} />
                        <div>
                          <div className="delivery-option-date">Tuesday, June 21</div>
                          <div className="delivery-option-price">FREE Shipping</div>
                        </div>
                      </div>
                      <div className="delivery-option">
                        <input type="radio" className="delivery-option-input" name={`delivery-option-${product.id}`} />
                        <div>
                          <div className="delivery-option-date">Wednesday, June 15</div>
                          <div className="delivery-option-price">$4.99 - Shipping</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="payment-summary">
            <div className="payment-summary-title">Payment Summary</div>

            <div className="payment-summary-row">
              <div>Items ({itemCount}):</div>
              <div className="payment-summary-money">${subtotalValue.toFixed(2)}</div>
            </div>

            <div className="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div className="payment-summary-money">${shippingValue.toFixed(2)}</div>
            </div>

            <div className="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div className="payment-summary-money">${(subtotalValue + shippingValue).toFixed(2)}</div>
            </div>

            <div className="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div className="payment-summary-money">${estimatedTaxValue.toFixed(2)}</div>
            </div>

            <div className="payment-summary-row total-row">
              <div>Order total:</div>
              <div className="payment-summary-money">${totalValue.toFixed(2)}</div>
            </div>

            <button className="place-order-button button-primary">Place your order</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;