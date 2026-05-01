import { useState } from 'react';
import WeatherIcon from '../components/WeatherIcon';
import { IconCloud, IconMap, IconBell, IconStar, IconGrid, IconMsg, IconApple, IconFeatureCheck } from '../components/Icons';

const OVERVIEW_CARDS = [
  { icon: <IconCloud />, title: 'Hyper-local conditions', desc: 'Real-time temperature, humidity, wind, UV, and pressure.' },
  { icon: <IconMap />, title: 'Live radar', desc: 'Animated precipitation radar updated every 5 minutes.' },
  { icon: <IconBell />, title: 'Smart alerts', desc: 'Push notifications only when weather actually affects your day.' },
  { icon: <IconStar />, title: 'Beautiful widgets', desc: 'Lock screen, home screen, and standby widgets designed to be glanceable.' },
  { icon: <IconGrid />, title: 'Privacy first', desc: 'Location is never stored or sold. Everything runs on-device.' },
  { icon: <IconMsg />, title: 'No subscription', desc: 'Every feature is free. No paywalls, no premium tier.' },
];

const FEATURES = [
  { label: 'Current conditions', detail: 'Temp, feels like, humidity, wind speed & direction, UV index, visibility, pressure, dew point' },
  { label: 'Hourly forecast', detail: '48-hour hour-by-hour breakdown with precipitation probability and cloud cover' },
  { label: '10-day forecast', detail: 'Daily highs/lows, sunrise/sunset times, and dominant conditions at a glance' },
  { label: 'Precipitation radar', detail: 'Animated live radar overlay with zoom, pan, and timeline scrubber' },
  { label: 'Severe weather alerts', detail: 'Government-issued warnings delivered instantly as push notifications' },
  { label: 'Air quality index', detail: 'Real-time AQI with pollutant breakdown and health recommendations' },
  { label: 'Widgets & complications', detail: 'Lock screen, home screen, StandBy, and Apple Watch complications in multiple sizes' },
  { label: 'Multiple locations', detail: 'Add unlimited saved locations and switch between them instantly' },
  { label: 'Dark & light mode', detail: 'Fully adaptive UI that respects your system appearance setting' },
];

const WATCH_CARDS = [
  { icon: <IconCloud />, title: 'Glanceable complications', desc: 'Current temp, conditions icon, and rain chance.' },
  { icon: <IconBell />, title: 'Wrist alerts', desc: 'Haptic taps for incoming rain, lightning, severe weather.' },
  { icon: <IconStar />, title: 'Smart Stack widget', desc: 'Rises to top of Smart Stack when weather is notable.' },
  { icon: <IconGrid />, title: 'On-device processing', desc: 'Fetches and caches data directly from Watch GPS.' },
];

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'watch', label: 'Apple Watch' },
  ];

  return (
    <div className="page-view">
      <div className="products-wrap">
        <div className="products-hero">
          <div className="products-hero-left">
            <div className="placeholder-badge"><WeatherIcon size={12} />Weather.co App</div>
            <h1 className="products-title">The weather app<br />that respects your time.</h1>
            <p className="products-desc">
              Accurate, beautiful, and private. Weather.co gives you exactly what you need —
              conditions, forecasts, and alerts — without the noise.
            </p>
            <div className="products-cta-row">
              <a className="products-cta-primary" href="#">
                <IconApple />Download on App Store
              </a>
              <a className="products-cta-ghost" href="#">Learn more →</a>
            </div>
            <div className="products-meta-row">
              <div className="products-meta-item">
                <span className="products-meta-val">4.9</span>
                <span className="products-meta-label">App Store rating</span>
              </div>
              <div className="products-meta-divider" />
              <div className="products-meta-item">
                <span className="products-meta-val">Free</span>
                <span className="products-meta-label">Always</span>
              </div>
              <div className="products-meta-divider" />
              <div className="products-meta-item">
                <span className="products-meta-val">watchOS</span>
                <span className="products-meta-label">+ iOS</span>
              </div>
            </div>
          </div>
          <div className="products-hero-right">
            <div className="products-app-icon"><WeatherIcon size={72} /></div>
            <div className="products-platform-tags">
              <span className="products-tag">iOS 17+</span>
              <span className="products-tag">watchOS 10+</span>
              <span className="products-tag">iPhone & iPad</span>
            </div>
          </div>
        </div>

        <div className="products-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`products-tab${activeTab === tab.id ? ' active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="placeholder-grid">
            {OVERVIEW_CARDS.map(card => (
              <div className="placeholder-card" key={card.title}>
                <div className="placeholder-card-icon">{card.icon}</div>
                <div className="placeholder-card-title">{card.title}</div>
                <div className="placeholder-card-sub">{card.desc}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'features' && (
          <div className="products-feature-list">
            {FEATURES.map((f, i) => (
              <div className="products-feature-row" key={i}>
                <div className="products-feature-check"><IconFeatureCheck /></div>
                <div>
                  <div className="products-feature-label">{f.label}</div>
                  <div className="products-feature-detail">{f.detail}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'watch' && (
          <div className="placeholder-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            {WATCH_CARDS.map(card => (
              <div className="placeholder-card" key={card.title}>
                <div className="placeholder-card-icon">{card.icon}</div>
                <div className="placeholder-card-title">{card.title}</div>
                <div className="placeholder-card-sub">{card.desc}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
