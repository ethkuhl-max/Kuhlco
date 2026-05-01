import WeatherIcon from './WeatherIcon';
import { IconSun, IconMoon } from './Icons';

export default function Nav({ theme, onToggleTheme, navLinks, activePage, onNavigate, onMembersClick }) {
  return (
    <nav>
      <button className="nav-logo" onClick={() => onNavigate(0)}>
        <span className="nav-logo-icon"><WeatherIcon size={32} /></span>
        <span className="nav-wordmark">Weather<span>.co</span></span>
      </button>
      <ul className="nav-links">
        {navLinks.map((label, i) => (
          <li key={label}>
            <a
              className={activePage === i ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); onNavigate(i); }}
              href="#"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
      <div className="nav-spacer" />
      <div className="nav-actions">
        <button className="btn btn-primary" onClick={onMembersClick}>Members</button>
        <button
          className="theme-toggle"
          onClick={onToggleTheme}
          title={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
        >
          {theme === 'dark' ? <IconSun /> : <IconMoon />}
        </button>
      </div>
    </nav>
  );
}
