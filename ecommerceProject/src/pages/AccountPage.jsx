import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase.js';
import { useAuth } from '../auth/useAuth.js';
import '../components/Account.css';

export default function AccountPage({ mode = 'sign-in' }) {
  const navigate = useNavigate();
  const { isConfigured } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isRegister = mode === 'register';
  const isForgotPassword = mode === 'forgot-password';

  const submitForm = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');
    if (!isConfigured) {
      setError('Account service is not configured. Add the Supabase environment variables and restart the app.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (isForgotPassword) {
        const { error: requestError } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (requestError) throw requestError;
        setMessage('If an account exists for that email, a password reset link is on its way.');
      } else if (isRegister) {
        const { data, error: signupError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName.trim() },
            emailRedirectTo: `${window.location.origin}/account/sign-in`,
          },
        });
        if (signupError) throw signupError;
        if (data.session) navigate('/account/dashboard', { replace: true });
        else setMessage('Check your email to confirm your account, then sign in.');
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
        navigate('/account/dashboard', { replace: true });
      }
    } catch (submitError) {
      setError(isForgotPassword ? 'We could not send the reset email. Check the address and try again.' : submitError.message || 'We could not complete that request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="account-page">
      <section className="account-panel">
        <Link className="account-brand" to="/">BuyNow<span>.</span></Link>
        <p className="account-eyebrow">YOUR BUYNOW ACCOUNT</p>
        <h1>{isForgotPassword ? 'Reset your password' : isRegister ? 'Create your account' : 'Welcome back'}</h1>
        <p className="account-intro">
          {isForgotPassword
            ? 'We will email you a secure link to choose a new password.'
            : isRegister
              ? 'A quicker way back to the things you love.'
              : 'Sign in to see your orders and account details.'}
        </p>

        <form className="account-form" onSubmit={submitForm}>
          {isRegister && (
            <label>Full name
              <input autoComplete="name" value={fullName} onChange={(event) => setFullName(event.target.value)} required />
            </label>
          )}
          <label>Email address
            <input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </label>
          {!isForgotPassword && (
            <label>Password
              <input
                type="password"
                autoComplete={isRegister ? 'new-password' : 'current-password'}
                minLength={isRegister ? 8 : undefined}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>
          )}

          {error && <p className="account-error" role="alert">{error}</p>}
          {message && <p className="account-success" role="status">{message}</p>}

          <button className="account-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Please wait…' : isForgotPassword ? 'Email reset link' : isRegister ? 'Create account' : 'Sign in'}
          </button>
        </form>

        <div className="account-links">
          {mode === 'sign-in' && <Link to="/account/forgot-password">Forgot password?</Link>}
          {isRegister
            ? <span>Already have an account? <Link to="/account/sign-in">Sign in</Link></span>
            : !isForgotPassword && <span>New to BuyNow? <Link to="/account/register">Create an account</Link></span>}
          {isForgotPassword && <Link to="/account/sign-in">Back to sign in</Link>}
        </div>
      </section>
      <div className="account-aside" aria-hidden="true">
        <span>bn</span>
        <p>Good things<br />for the everyday.</p>
      </div>
    </main>
  );
}