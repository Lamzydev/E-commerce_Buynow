import { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router';

export function CheckoutPage({ cartItems = [], products = [] }) {
  const [selectedDeliveryOptions, setSelectedDeliveryOptions] = useState({});
  const [paymentSummary, setPaymentSummary] = useState({
    totalItems: 0,
    productCostCents: 0,
    shippingCostCents: 0,
    totalCostBeforeTaxCents: 0,
    taxCents: 0,
    totalCostCents: 0,
  });

  const cartProducts = cartItems
    .map((item) => {
      const product = products.find((productItem) => productItem.id === item.id);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(Boolean);

  const updateDeliveryOption = async (productId, deliveryOptionId) => {
    try {
      await axios.put(`http://localhost:3000/api/cart-items/${productId}`, {
        deliveryOptionId,
      });
      setSelectedDeliveryOptions((prev) => ({ ...prev, [productId]: deliveryOptionId }));
      const response = await axios.get('http://localhost:3000/api/payment-summary');
      setPaymentSummary(response.data);
    } catch (error) {
      console.error('Failed to update delivery option:', error);
    }
  };

  useEffect(() => {
    const loadPaymentSummary = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/payment-summary');
        setPaymentSummary(response.data);
      } catch (error) {
        console.error('Failed to load payment summary:', error);
      }
    };

    loadPaymentSummary();
  }, []);

  const itemCount = paymentSummary.totalItems;
  const subtotalValue = paymentSummary.productCostCents / 100;
  const shippingValue = paymentSummary.shippingCostCents / 100;
  const estimatedTaxValue = paymentSummary.taxCents / 100;
  const totalValue = paymentSummary.totalCostCents / 100;

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


                         {/* delivery options  */}

                    <div className="delivery-options">
                      <div className="delivery-options-title">Choose a delivery option:</div>
                      <div className="delivery-option">
                        <input
                          type="radio"
                          checked={selectedDeliveryOptions[product.id] === '1' || (!selectedDeliveryOptions[product.id] && product.quantity > 0)}
                          className="delivery-option-input"
                          name={`delivery-option-${product.id}`}
                          onChange={() => updateDeliveryOption(product.id, '1')}
                        />
                        <div>
                          <div className="delivery-option-date">Tuesday, June 21</div>
                          <div className="delivery-option-price">FREE Shipping</div>
                        </div>
                      </div>
                      <div className="delivery-option">
                        <input
                          type="radio"
                          checked={selectedDeliveryOptions[product.id] === '2'}
                          className="delivery-option-input"
                          name={`delivery-option-${product.id}`}
                          onChange={() => updateDeliveryOption(product.id, '2')}
                        />
                        <div>
                          <div className="delivery-option-date">Wednesday, June 15</div>
                          <div className="delivery-option-price">$4.99 - Shipping</div>
                        </div>
                      </div>
                      <div className="delivery-option">
                        <input
                          type="radio"
                          checked={selectedDeliveryOptions[product.id] === '3'}
                          className="delivery-option-input"
                          name={`delivery-option-${product.id}`}
                          onChange={() => updateDeliveryOption(product.id, '3')}
                        />
                        <div>
                          <div className="delivery-option-date">Monday, June 13</div>
                          <div className="delivery-option-price">$9.99 - Shipping</div>
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
              <div className="payment-summary-money">${(paymentSummary.totalCostBeforeTaxCents / 100).toFixed(2)}</div>
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