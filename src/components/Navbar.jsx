import { Link } from 'react-router';

function Navbar({ cartItems = [] }) {
  const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="navbar">
      <div className="left-section">
        <Link to="/" className="navbar-link">
          <img className="logo" src="images/buynow.png" />
        </Link>
      </div>

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search" />

        <button className="search-button">
          <img className="search-icon" src="images/icons/search-icon.png" />
        </button>
      </div>

      <div className="right-section">
        <Link className="orders-link navbar-link" to="/orders">
          <span className="orders-text">Orders</span>
        </Link>

        <Link className="cart-link navbar-link" to="/checkout">
          <img className="cart-icon" src="images/icons/cart-icon.png" />
          <div className="cart-quantity">{cartQuantity}</div>
          <div className="cart-text">Cart</div>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;