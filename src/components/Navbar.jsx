import { Link } from 'react-router'

 function Navbar() {
 

  return (
    <div className="navbar">
      <div className="left-section">
        <Link to="/" className="navbar-link">
          <img className="logo"
            src="images/buynow.png" />
          
        </Link>
      </div>

      <div class="middle-section">
        <input class="search-bar" type="text" placeholder="Search" />

        <button class="search-button">
          <img class="search-icon" src="images/icons/search-icon.png" />
        </button>
      </div>

      <div class="right-section">
        <Link className="orders-link navbar-link" to="/orders">

          <span className="orders-text">Orders</span>
        </Link>

        <Link className="cart-link navbar-link" to="/checkout">
          <img class="cart-icon" src="images/icons/cart-icon.png" />
          <div class="cart-quantity">3</div>
          <div class="cart-text">Cart</div>
        </Link>
      </div>
      </div>
    
  );
}

export default Navbar;