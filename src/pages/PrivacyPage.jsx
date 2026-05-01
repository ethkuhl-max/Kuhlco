import WeatherIcon from '../components/WeatherIcon';
import { IconMap, IconBell, IconGrid } from '../components/Icons';

export default function PrivacyPage() {
  return (
    <div className="page-view">
      <div className="privacy-page">
        <div className="privacy-header">
          <div className="placeholder-badge"><WeatherIcon size={12} />Privacy</div>
          <h1 className="placeholder-title">Privacy Policy</h1>
          <p className="placeholder-sub">Last updated April 30, 2026</p>
        </div>
        <div className="privacy-body">
          <section className="privacy-section">
            <h2 className="privacy-section-title">Overview</h2>
            <div className="privacy-section-body">
              <p>Weather.co ("we", "our", or "us") is committed to protecting your privacy. This policy explains what data we collect, why we collect it, and how we handle it when you use the Weather.co app and website.</p>
              <p>We believe weather data should serve you — not the other way around. We collect only what's necessary to deliver accurate, local forecasts.</p>
            </div>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">Data we collect</h2>
            <div className="privacy-section-body">
              <div className="privacy-row">
                <div className="privacy-row-icon"><IconMap /></div>
                <div>
                  <div className="privacy-row-label">Location</div>
                  <div className="privacy-row-text">We request your device location solely to provide local weather conditions and forecasts. Location data is never stored on our servers. It is processed on-device or sent directly to our weather data provider in real time and immediately discarded.</div>
                </div>
              </div>
              <div className="privacy-row">
                <div className="privacy-row-icon"><IconBell /></div>
                <div>
                  <div className="privacy-row-label">Notification preferences</div>
                  <div className="privacy-row-text">If you enable alerts, we store a minimal record of your alert thresholds (e.g. wind speed, rain) linked to an anonymous device token. No personal identifiers are retained.</div>
                </div>
              </div>
              <div className="privacy-row">
                <div className="privacy-row-icon"><IconGrid /></div>
                <div>
                  <div className="privacy-row-label">App usage</div>
                  <div className="privacy-row-text">We collect anonymous, aggregated usage events (e.g. which complication was tapped) to improve the app. This data cannot be tied back to you or your device.</div>
                </div>
              </div>
            </div>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">Data we do NOT collect</h2>
            <div className="privacy-section-body">
              <ul className="privacy-list">
                <li>Your name, email address, or any account information</li>
                <li>Precise location history or movement patterns</li>
                <li>Any data sold or shared with advertisers</li>
                <li>Health, contacts, photos, or any unrelated device data</li>
              </ul>
            </div>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">Third-party services</h2>
            <div className="privacy-section-body">
              <p>Weather.co uses the following third-party services to deliver forecasts:</p>
              <ul className="privacy-list">
                <li><strong>Weather data provider</strong> — receives your approximate location to return a forecast. Subject to their own privacy policy.</li>
                <li><strong>Apple Push Notification Service (APNs)</strong> — used to deliver weather alerts to your device. Apple does not receive your location.</li>
              </ul>
            </div>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">Apple Watch</h2>
            <div className="privacy-section-body">
              <p>The Weather.co Watch app and complications operate entirely on-device. Location is fetched directly from the Watch's GPS when available. No watch health or activity data is ever accessed.</p>
            </div>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">Contact</h2>
            <div className="privacy-section-body">
              <p>Questions about this policy? Reach us at <span className="privacy-link">privacy@weather.co</span>. We aim to respond within 2 business days.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
