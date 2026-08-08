import { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import Navbar from '../components/Navbar';

const formatDate = (timeMs) => new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
}).format(new Date(Number(timeMs)));

export function OrdersPage({ cartItems = [], onAddToCart }) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addingProductId, setAddingProductId] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    axios.get('/api/orders?expand=products')
      .then((response) => {
        if (!isCancelled) setOrders(response.data);
      })
      .catch((error) => console.error('Failed to load orders:', error))
      .finally(() => {
        if (!isCancelled) setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  const handleBuyAgain = async (productId) => {
    if (!onAddToCart) return;
    setAddingProductId(productId);
    try {
      await onAddToCart(productId, 1);
    } finally {
      setAddingProductId(null);
    }
  };

  return (
    <>
      <title>Orders</title>

      <Navbar cartItems={cartItems} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        {isLoading && <p>Loading orders…</p>}
        {!isLoading && orders.length === 0 && <p>You have not placed any orders yet.</p>}

        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order.id} className="order-container">
              <div className="order-header">
                <div className="order-header-left-section">
                  <div className="order-date">
                    <div className="order-header-label">Order Placed:</div>
                    <div>{formatDate(order.orderTimeMs)}</div>
                  </div>
                  <div className="order-total">
                    <div className="order-header-label">Total:</div>
                    <div>${(order.totalCostCents / 100).toFixed(2)}</div>
                  </div>
                </div>

                <div className="order-header-right-section">
                  <div className="order-header-label">Order ID:</div>
                  <div>{order.id}</div>
                </div>
              </div>

              <div className="order-details-grid">
                {order.products.map((item) => (
                  <div key={item.productId} className="order-product-row">
                    <div className="product-image-container">
                      <img src={item.product.image} alt={item.product.name} />
                    </div>

                    <div className="product-details">
                      <div className="product-name">{item.product.name}</div>
                      <div className="product-delivery-date">Arriving on: {formatDate(item.estimatedDeliveryTimeMs)}</div>
                      <div className="product-quantity">Quantity: {item.quantity}</div>
                      <button
                        className="buy-again-button button-primary"
                        type="button"
                        onClick={() => handleBuyAgain(item.productId)}
                        disabled={addingProductId === item.productId}
                      >
                        <img className="buy-again-icon" src="images/icons/buy-again.png" alt="" />
                        <span className="buy-again-message">
                          {addingProductId === item.productId ? 'Adding…' : 'Add to Cart'}
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
