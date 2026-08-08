import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';

function Navbar({ cartItems = [] }) {
  const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  const handleSearch = (event) => {
    event.preventDefault();
    const query = searchTerm.trim();
    navigate(query ? `/?search=${encodeURIComponent(query)}` : '/');
  };

  return (
    <div className="navbar">
      <div className="left-section">
        <Link to="/" className="navbar-link">
          <img className="logo" src="images/buynow.png" />
        </Link>
      </div>

      <form className="middle-section" onSubmit={handleSearch} role="search">
        <input
          className="search-bar"
          type="search"
          placeholder="Search products"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          aria-label="Search products"
        />

        <button className="search-button" type="submit" aria-label="Search">
          <img className="search-icon" src="images/icons/search-icon.png" alt="" />
        </button>
      </form>

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
