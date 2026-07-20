import { useNavigate } from 'react-router';
import axios from 'axios';

export function PaymentSummary({ itemCount, subtotalValue, shippingValue, estimatedTaxValue, totalValue, totalCostBeforeTaxValue, onPlaceOrder, isPlacingOrder }) {
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    try {
      await onPlaceOrder();
      navigate('/orders');
    } catch (error) {
      console.error('Failed to place order:', error);
    }
  };

  return (
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
        <div className="payment-summary-money">${totalCostBeforeTaxValue.toFixed(2)}</div>
      </div>

      <div className="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div className="payment-summary-money">${estimatedTaxValue.toFixed(2)}</div>
      </div>

      <div className="payment-summary-row total-row">
        <div>Order total:</div>
        <div className="payment-summary-money">${totalValue.toFixed(2)}</div>
      </div>

      <button className="place-order-button button-primary" onClick={handlePlaceOrder} disabled={isPlacingOrder}>
        {isPlacingOrder ? 'Placing order...' : 'Place your order'}
      </button>
    </div>
  );
}

export default PaymentSummary;
