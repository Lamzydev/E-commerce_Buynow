import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth.js';
import Navbar from '../components/Navbar.jsx';
import Footers from '../components/footers.jsx';
import '../components/Account.css';

export default function CustomerDashboard({ cartItems = [] }) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    axios.get('/api/orders')
      .then(({ data }) => {
        if (isMounted) setOrders(data);
      })
      .catch(() => {
        if (isMounted) setError('We could not load your orders. Please refresh and try again.');
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => { isMounted = false; };
  }, []);

  const handleSignOut = async () => {
    const { error: signOutError } = await signOut();
    if (signOutError) {
      setError('We could not sign you out. Please try again.');
      return;
    }
    navigate('/', { replace: true });
  };

  return (
    <>
      <Navbar cartItems={cartItems} />
      <main className="customer-dashboard">
        <header className="dashboard-heading">
          <div>
            <p className="account-eyebrow">YOUR ACCOUNT</p>
            <h1>Hello{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name.split(' ')[0]}` : ''}.</h1>
            <p>{user?.email}</p>
          </div>
          <button type="button" className="dashboard-signout" onClick={handleSignOut}>Sign out</button>
        </header>
        <section className="dashboard-orders" aria-labelledby="dashboard-orders-title">
          <div className="dashboard-section-heading">
            <h2 id="dashboard-orders-title">Your orders</h2>
            <Link to="/">Continue shopping <span aria-hidden="true">↗</span></Link>
          </div>
          {isLoading && <p className="dashboard-state">Loading your orders…</p>}
          {error && <p className="account-error" role="alert">{error}</p>}
          {!isLoading && !error && orders.length === 0 && (
            <div className="dashboard-empty">
              <p>No orders yet. Your purchases will show up here.</p>
              <Link className="dashboard-shop-link" to="/">Explore the shop</Link>
            </div>
          )}
          {orders.length > 0 && (
            <div className="dashboard-order-list">
              {orders.map((order) => (
                <article className="dashboard-order" key={order.id}>
                  <div>
                    <span className="dashboard-order-label">Order placed</span>
                    <strong>{new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(Number(order.orderTimeMs)))}</strong>
                  </div>
                  <div>
                    <span className="dashboard-order-label">Items</span>
                    <strong>{order.products.reduce((total, item) => total + item.quantity, 0)}</strong>
                  </div>
                  <div>
                    <span className="dashboard-order-label">Total</span>
                    <strong>${(order.totalCostCents / 100).toFixed(2)}</strong>
                  </div>
                  <span className="dashboard-order-id">#{order.id.slice(0, 8)}</span>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footers />
    </>
  );
}