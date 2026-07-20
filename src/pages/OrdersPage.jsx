import '../App.css';

const orderGroups = [
  {
    orderPlaced: 'August 12',
    orderTotal: '$35.06',
    orderId: '27cba69d-4c3d-4098-b42d-ac7fa62b7664',
    items: [
      {
        name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
        deliveryDate: 'August 15',
        quantity: 1,
        image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
      },
      {
        name: 'Adults Plain Cotton T-Shirt - 2 Pack',
        deliveryDate: 'August 19',
        quantity: 2,
        image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
      },
    ],
  },
  {
    orderPlaced: 'June 10',
    orderTotal: '$41.90',
    orderId: 'b6b6c212-d30e-4d4a-805d-90b52ce6b37d',
    items: [
      {
        name: 'Intermediate Size Basketball',
        deliveryDate: 'June 17',
        quantity: 2,
        image: 'images/products/intermediate-composite-basketball.jpg',
      },
    ],
  },
];

export function OrdersPage({ addToCart, products = [] }) {
  const handleAddToCart = (productName, quantity) => {
    const matchingProduct = products.find((product) => product.name === productName);

    if (matchingProduct) {
      addToCart(matchingProduct.id, quantity);
    }
  };

  return (
    <>
      <title>Your Orders</title>

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orderGroups.map((order) => (
            <div className="order-container" key={order.orderId}>
              <div className="order-header">
                <div className="order-header-left-section">
                  <div className="order-date">
                    <div className="order-header-label">Order Placed:</div>
                    <div>{order.orderPlaced}</div>
                  </div>
                  <div className="order-total">
                    <div className="order-header-label">Total:</div>
                    <div>{order.orderTotal}</div>
                  </div>
                </div>

                <div className="order-header-right-section">
                  <div className="order-header-label">Order ID:</div>
                  <div>{order.orderId}</div>
                </div>
              </div>

              <div className="order-details-grid">
                {order.items.map((item) => (
                  <>
                    <div className="product-image-container" key={`${order.orderId}-${item.name}-image`}>
                      <img src={item.image} alt={item.name} />
                    </div>

                    <div className="product-details" key={`${order.orderId}-${item.name}-details`}>
                      <div className="product-name">{item.name}</div>
                      <div className="product-delivery-date">Arriving on: {item.deliveryDate}</div>
                      <div className="product-quantity">Quantity: {item.quantity}</div>
                      <button
                        className="buy-again-button button-primary"
                        onClick={() => handleAddToCart(item.name, item.quantity)}
                      >
                        <img className="buy-again-icon" src="images/icons/buy-again.png" alt="buy again" />
                        <span className="buy-again-message">Add to Cart</span>
                      </button>
                    </div>

                    <div className="product-actions" key={`${order.orderId}-${item.name}-actions`}>
                      <a href="tracking.html">
                        <button className="track-package-button button-secondary">Track package</button>
                      </a>
                    </div>
                  </>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

