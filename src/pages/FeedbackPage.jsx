import { useState } from 'react';
import WeatherIcon from '../components/WeatherIcon';
import { IconStar, IconGrid, IconMsg, IconCheck } from '../components/Icons';

const RATING_LABELS = ['', 'Terrible', 'Poor', 'Okay', 'Good', 'Love it'];

const TYPES = [
  { id: 'feature', label: 'Feature request', icon: <IconStar /> },
  { id: 'bug', label: 'Bug report', icon: <IconGrid /> },
  { id: 'general', label: 'General feedback', icon: <IconMsg /> },
];

const PLACEHOLDERS = {
  feature: "e.g. I'd love to see hourly UV index on the Watch complication…",
  bug: 'e.g. The radar layer crashes when I zoom in on iOS 18…',
  general: 'Tell us anything — good, bad, or in between…',
};

function StarRating({ rating, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="fb-stars">
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type="button"
          className={`fb-star${n <= (hover || rating) ? ' active' : ''}`}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(r => r === n ? 0 : n)}
          aria-label={`${n} star${n !== 1 ? 's' : ''}`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 3l2.25 5.5L20 9.25l-4 3.75 1 5.5L12 16l-5 2.5 1-5.5-4-3.75 5.75-.75L12 3z" fill="currentColor" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
          </svg>
        </button>
      ))}
      {rating > 0 && <span className="fb-rating-label">{RATING_LABELS[rating]}</span>}
    </div>
  );
}

export default function FeedbackPage() {
  const [type, setType] = useState('feature');
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  function validate() {
    if (!message.trim()) return 'Please write a message before submitting.';
    if (message.trim().length < 10) return 'Message is too short — tell us a bit more.';
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "That email address doesn't look right.";
    return '';
  }

  function handleSubmit(e) {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setError('');
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1200);
  }

  function handleReset() {
    setType('feature');
    setRating(0);
    setMessage('');
    setEmail('');
    setSubmitted(false);
    setError('');
  }

  if (submitted) {
    return (
      <div className="page-view">
        <div className="feedback-wrap">
          <div className="feedback-success">
            <div className="feedback-success-icon"><IconCheck /></div>
            <h2 className="feedback-success-title">Thanks for the feedback</h2>
            <p className="feedback-success-sub">
              Every submission is read by a real person on the Weather.co team.
              We'll be in touch if we have questions{email ? ` at ${email}` : ''}.
            </p>
            <button className="fb-btn-primary" onClick={handleReset}>Send more feedback</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-view">
      <div className="feedback-wrap">
        <div className="feedback-header">
          <div className="placeholder-badge"><WeatherIcon size={12} />Feedback</div>
          <h1 className="placeholder-title">We'd love to hear from you</h1>
          <p className="placeholder-sub">Every message is read by a human. No bots, no auto-close.</p>
        </div>
        <form className="feedback-form" onSubmit={handleSubmit} noValidate>
          <div className="fb-field">
            <label className="fb-label">What kind of feedback?</label>
            <div className="fb-type-grid">
              {TYPES.map(tp => (
                <button
                  key={tp.id}
                  type="button"
                  className={`fb-type-card${type === tp.id ? ' selected' : ''}`}
                  onClick={() => setType(tp.id)}
                >
                  <span className="fb-type-icon">{tp.icon}</span>
                  <span className="fb-type-label">{tp.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="fb-field">
            <label className="fb-label">
              How would you rate the app? <span className="fb-optional">optional</span>
            </label>
            <StarRating rating={rating} onChange={setRating} />
          </div>
          <div className="fb-field">
            <label className="fb-label" htmlFor="fb-message">
              {type === 'feature' ? "Describe the feature you'd like" : type === 'bug' ? 'Describe the bug' : 'Your message'}
            </label>
            <textarea
              id="fb-message"
              className="fb-textarea"
              placeholder={PLACEHOLDERS[type]}
              value={message}
              onChange={e => { setMessage(e.target.value); setError(''); }}
              rows={5}
            />
            <div className="fb-char-count">{message.length} chars</div>
          </div>
          <div className="fb-field">
            <label className="fb-label" htmlFor="fb-email">
              Email <span className="fb-optional">optional — only if you'd like a reply</span>
            </label>
            <input
              id="fb-email"
              type="email"
              className="fb-input"
              placeholder="you@example.com"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(''); }}
            />
          </div>
          {error && <div className="fb-error">{error}</div>}
          <button type="submit" className="fb-btn-primary" disabled={submitting}>
            {submitting ? <span className="fb-spinner" /> : 'Send feedback'}
          </button>
        </form>
      </div>
    </div>
  );
}
