import '../App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PaymentSummary from '../components/PaymentSummary';

export function CheckoutPage({ cartItems = [], onPlaceOrder }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [selectedDeliveries, setSelectedDeliveries] = useState({});
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  useEffect(() => {
    axios.get('/api/delivery-options').then((response) => {
      setDeliveryOptions(response.data);
    });
  }, []);

  const handleDeliveryChange = async (productId, deliveryOptionId) => {
    setSelectedDeliveries((prev) => ({ ...prev, [productId]: deliveryOptionId }));
    try {
      await axios.put(`/api/cart-items/${productId}`, { deliveryOptionId });
    } catch (error) {
      console.error('Failed to update delivery option:', error);
    }
  };

  const handlePlaceOrder = async () => {
    if (!onPlaceOrder || cartItems.length === 0) return;
    setIsPlacingOrder(true);
    try {
      await onPlaceOrder();
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const subtotalValue = cartItems.reduce(
    (sum, item) => sum + item.quantity * (item.product.priceCents / 100),
    0,
  );
  const shippingValue = cartItems.reduce((sum, item) => {
    const deliveryOptionId = selectedDeliveries[item.productId] || item.deliveryOptionId || '1';
    const option = deliveryOptions.find((delivery) => delivery.id === deliveryOptionId);
    return sum + (option ? option.priceCents / 100 : 0);
  }, 0);
  const totalCostBeforeTaxValue = subtotalValue + shippingValue;
  const estimatedTaxValue = totalCostBeforeTaxValue * 0.1;
  const totalValue = totalCostBeforeTaxValue + estimatedTaxValue;

  return (
    <>
      <title>Checkout</title>

      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <a href="/">
              <img className="logo" src="images/logo.png" alt="logo" />
              <img className="mobile-logo" src="images/buynow.png" alt="mobile logo" />
            </a>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (<a className="return-to-home-link" href="/">{cartItems.length} items</a>)
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" alt="checkout lock" />
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <div className="order-summary">
            {cartItems.map((item) => (
              <div key={item.productId} className="cart-item-container">
                <div className="delivery-date">Delivery date: Choose your option</div>

                <div className="cart-item-details-grid">
                  <img className="product-image" src={item.product.image} alt={item.product.name} />

                  <div className="cart-item-details">
                    <div className="product-name">{item.product.name}</div>
                    <div className="product-price">${(item.product.priceCents / 100).toFixed(2)}</div>
                    <div className="product-quantity">
                      <span>
                        Quantity: <span className="quantity-label">{item.quantity}</span>
                      </span>
                    </div>
                  </div>

                  <div className="delivery-options">
                    <div className="delivery-options-title">Choose a delivery option:</div>
                    {deliveryOptions.map((option) => {
                      const selectedValue = selectedDeliveries[item.productId] || item.deliveryOptionId || '1';
                      return (
                        <div key={option.id} className="delivery-option">
                          <input
                            type="radio"
                            className="delivery-option-input"
                            name={`delivery-option-${item.productId}`}
                            checked={selectedValue === option.id}
                            onChange={() => handleDeliveryChange(item.productId, option.id)}
                          />
                          <div>
                            <div className="delivery-option-date">
                              {option.deliveryDays === 7 ? 'Tuesday, June 21' : option.deliveryDays === 3 ? 'Wednesday, June 15' : 'Monday, June 13'}
                            </div>
                            <div className="delivery-option-price">
                              {option.priceCents === 0 ? 'FREE Shipping' : `$${(option.priceCents / 100).toFixed(2)} - Shipping`}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <PaymentSummary
            itemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            subtotalValue={subtotalValue}
            shippingValue={shippingValue}
            totalCostBeforeTaxValue={totalCostBeforeTaxValue}
            estimatedTaxValue={estimatedTaxValue}
            totalValue={totalValue}
            onPlaceOrder={handlePlaceOrder}
            isPlacingOrder={isPlacingOrder}
          />
        </div>
      </div>
    </>
  );
}
