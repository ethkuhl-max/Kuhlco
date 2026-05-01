import { useState } from 'react';
import WeatherIcon from './WeatherIcon';
import { IconClose, IconEye, IconEyeOff, IconCheck } from './Icons';

export default function LoginModal({ onClose, onOpenDashboard }) {
  const [step, setStep] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) { setError('Please enter your work email.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Enter a valid email address.'); return; }
    if (!password) { setError('Please enter your password.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setError('');
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep('success'); }, 1400);
  }

  function handleBackdrop(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className="login-backdrop" onClick={handleBackdrop}>
      <div className="login-modal" role="dialog" aria-modal="true" aria-label="Employee login">
        <button className="login-close" onClick={onClose} aria-label="Close">
          <IconClose />
        </button>

        {step === 'login' ? (
          <>
            <div className="login-header">
              <div className="login-logo"><WeatherIcon size={36} /></div>
              <h2 className="login-title">Employee portal</h2>
              <p className="login-sub">Sign in with your Weather.co work account.</p>
            </div>
            <form className="login-form" onSubmit={handleSubmit} noValidate>
              <div className="fb-field">
                <label className="fb-label" htmlFor="login-email">Work email</label>
                <input
                  id="login-email"
                  type="email"
                  className="fb-input"
                  placeholder="you@weather.co"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(''); }}
                  autoComplete="email"
                />
              </div>
              <div className="fb-field">
                <label className="fb-label" htmlFor="login-pw">Password</label>
                <div className="login-pw-wrap">
                  <input
                    id="login-pw"
                    type={showPw ? 'text' : 'password'}
                    className="fb-input"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => { setPassword(e.target.value); setError(''); }}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="login-pw-toggle"
                    onClick={() => setShowPw(v => !v)}
                    aria-label={showPw ? 'Hide password' : 'Show password'}
                  >
                    {showPw ? <IconEyeOff /> : <IconEye />}
                  </button>
                </div>
              </div>
              <div className="login-forgot">
                <a href="#" className="login-link" onClick={e => e.preventDefault()}>Forgot password?</a>
              </div>
              {error && <div className="fb-error">{error}</div>}
              <button type="submit" className="fb-btn-primary" disabled={loading}>
                {loading ? <span className="fb-spinner" /> : 'Sign in'}
              </button>
            </form>
            <p className="login-footer-note">
              Access restricted to Weather.co employees.<br />
              Problems? Contact <span className="login-link">it@weather.co</span>
            </p>
          </>
        ) : (
          <div className="feedback-success">
            <div className="feedback-success-icon"><IconCheck /></div>
            <h2 className="feedback-success-title">Welcome back</h2>
            <p className="feedback-success-sub">You're signed in to the Weather.co employee portal.</p>
            <button className="fb-btn-primary" onClick={() => { onClose(); onOpenDashboard(email); }}>
              Go to dashboard →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
