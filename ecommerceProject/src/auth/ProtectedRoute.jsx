import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './useAuth.js';

export default function ProtectedRoute({ children }) {
  const { user, isLoading, isConfigured } = useAuth();
  const location = useLocation();

  if (!isConfigured) {
    return (
      <main className="account-state-page">
        <section className="account-state-panel">
          <h1>Account setup needed</h1>
          <p>Add your Supabase project URL and anon key to the frontend environment to use customer accounts.</p>
        </section>
      </main>
    );
  }

  if (isLoading) {
    return <main className="account-state-page"><p>Checking your session…</p></main>;
  }

  if (!user) {
    return <Navigate to="/account/sign-in" replace state={{ from: location.pathname }} />;
  }

  return children;
}