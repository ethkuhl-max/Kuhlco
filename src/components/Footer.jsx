import WeatherIcon from './WeatherIcon';

export default function Footer() {
  return (
    <footer>
      <WeatherIcon size={18} />
      <span className="footer-text">© 2026 Weather.co — All rights reserved</span>
    </footer>
  );
}
