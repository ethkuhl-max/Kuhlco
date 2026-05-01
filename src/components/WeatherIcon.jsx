export default function WeatherIcon({ size = 32 }) {
  const id = `grad-${size}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className="brand-logo">
      <defs>
        <linearGradient id={id} x1="30" y1="10" x2="80" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#429bff" />
          <stop offset="100%" stopColor="#2176f4" />
        </linearGradient>
      </defs>
      <path d="M10 60 A40 40 0 0 1 90 60 Z" fill={`url(#${id})`} />
      <rect x="10" y="60" width="80" height="4" rx="2" fill="#40e6d9" opacity="0.95" />
    </svg>
  );
}
