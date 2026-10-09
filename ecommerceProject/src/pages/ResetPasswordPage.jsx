import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase.js';
import { useAuth } from '../auth/useAuth.js';
import '../components/Account.css';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const { isConfigured, user, isLoading } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async (event) => {
    event.preventDefault();
    setError('');
    if (!isConfigured) {
      setError('Account service is not configured.');
      return;
    }
    if (password !== confirmPassword) {
      setError('The passwords do not match.');
      return;
    }
    setIsSubmitting(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setIsSubmitting(false);
    if (updateError) {
      setError('This reset link is invalid or expired. Request a new password reset email.');
      return;
    }
    navigate('/account/dashboard', { replace: true });
  };

  return (
    <main className="account-page account-reset-page">
      <section className="account-panel">
        <Link className="account-brand" to="/">BuyNow<span>.</span></Link>
        <p className="account-eyebrow">ACCOUNT SECURITY</p>
        <h1>Choose a new password</h1>
        <p className="account-intro">Use at least 8 characters for your new password.</p>
        {isLoading && <p className="account-success" role="status">Verifying your secure reset link…</p>}
        {!isLoading && !user && <p className="account-error" role="alert">This reset link is invalid or expired. <Link to="/account/forgot-password">Request a new link</Link>.</p>}
        <form className="account-form" onSubmit={submitForm}>
          <label>New password
            <input type="password" autoComplete="new-password" minLength="8" value={password} onChange={(event) => setPassword(event.target.value)} required />
          </label>
          <label>Confirm new password
            <input type="password" autoComplete="new-password" minLength="8" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required />
          </label>
          {error && <p className="account-error" role="alert">{error}</p>}
          <button className="account-submit" type="submit" disabled={isSubmitting || !user}>
            {isSubmitting ? 'Updating…' : 'Update password'}
          </button>
        </form>
      </section>
    </main>
  );
}