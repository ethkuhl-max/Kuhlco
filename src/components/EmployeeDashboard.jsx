import { useState, useMemo } from 'react';
import WeatherIcon from './WeatherIcon';

// ── Data ──────────────────────────────────────────────────────────────────────

const FEEDBACK_ITEMS = [
  { id: 1, type: 'Feature request', msg: "I'd love to see hourly UV index on the Watch complication", time: '2h ago', rating: 5, platform: 'watchOS', version: '2.4' },
  { id: 2, type: 'Bug report', msg: 'Radar layer crashes when zooming in on iOS 18.3', time: '5h ago', rating: null, platform: 'iOS', version: '2.4' },
  { id: 3, type: 'General', msg: 'Love the new widget design, way more glanceable!', time: '1d ago', rating: 4, platform: 'iOS', version: '2.4' },
  { id: 4, type: 'Feature request', msg: 'Can you add a moon phase complication for watchOS?', time: '1d ago', rating: null, platform: 'watchOS', version: '2.3' },
  { id: 5, type: 'Bug report', msg: 'Notifications not firing on iPhone 15 Pro after update', time: '2d ago', rating: null, platform: 'iOS', version: '2.4' },
  { id: 6, type: 'General', msg: "Best weather app I've used. No ads is a huge plus.", time: '3d ago', rating: 5, platform: 'iOS', version: '2.3' },
  { id: 7, type: 'Feature request', msg: 'Please add a weekly summary widget for iPad', time: '3d ago', rating: 3, platform: 'iPadOS', version: '2.3' },
  { id: 8, type: 'Bug report', msg: 'Dark mode flickers on app launch on iPhone 14', time: '4d ago', rating: null, platform: 'iOS', version: '2.3' },
  { id: 9, type: 'General', msg: 'The precipitation radar is the best I have seen in any app', time: '5d ago', rating: 5, platform: 'iOS', version: '2.3' },
  { id: 10, type: 'Feature request', msg: 'Add severe weather siren sound option for alerts', time: '6d ago', rating: null, platform: 'iOS', version: '2.2' },
];

const ALERTS = [
  { id: 1, level: 'warn', title: 'API rate limit at 78%', desc: 'Weather data provider usage spiking — approaching the 80% threshold', time: '3h ago', priority: 1 },
  { id: 2, level: 'info', title: 'App Store review response needed', desc: '3 new 1-star reviews awaiting reply — avg response time SLA is 24h', time: '1h ago', priority: 2 },
  { id: 3, level: 'success', title: 'v2.4 approved by App Store review', desc: 'Ready to release — manual go/no-go required before publishing', time: '6h ago', priority: 3 },
  { id: 4, level: 'info', title: 'New beta tester signups', desc: '12 new TestFlight testers joined this week', time: '1d ago', priority: 4 },
  { id: 5, level: 'warn', title: 'Crash spike on iOS 18.3', desc: 'Radar component crash rate up 0.4% vs. baseline from last 24h', time: '5h ago', priority: 1 },
];

const TEAM = [
  { name: 'Alex Chen', role: 'iOS Engineer', status: 'active', initials: 'AC', lastActive: 'Now', color: '#3a8fff' },
  { name: 'Maya Patel', role: 'Design Lead', status: 'active', initials: 'MP', lastActive: 'Now', color: '#40e6d9' },
  { name: 'Jordan Lee', role: 'Backend Engineer', status: 'away', initials: 'JL', lastActive: '45m ago', color: '#a78bfa' },
  { name: 'Sam Rivera', role: 'Product Manager', status: 'active', initials: 'SR', lastActive: 'Now', color: '#f59e0b' },
  { name: 'Casey Morgan', role: 'QA Engineer', status: 'offline', initials: 'CM', lastActive: '3h ago', color: '#6b7280' },
];

const STATS = [
  {
    label: 'App Store rating', value: '4.9', delta: '+0.1', up: true,
    sparkline: [4.7, 4.75, 4.72, 4.8, 4.82, 4.85, 4.9],
  },
  {
    label: 'Active users', value: '24.6k', delta: '+8%', up: true,
    sparkline: [18200, 19400, 20100, 21500, 22300, 23800, 24600],
  },
  {
    label: 'Crash-free rate', value: '99.4%', delta: '-0.1%', up: false,
    sparkline: [99.8, 99.7, 99.6, 99.5, 99.5, 99.4, 99.4],
  },
  {
    label: 'Feedback items', value: '38', delta: '+12', up: true,
    sparkline: [4, 6, 3, 8, 5, 7, 5],
  },
];

const ACTIVITY_DATA = [
  { day: 'Mon', users: 18200, feedback: 4 },
  { day: 'Tue', users: 19400, feedback: 6 },
  { day: 'Wed', users: 20100, feedback: 3 },
  { day: 'Thu', users: 21500, feedback: 8 },
  { day: 'Fri', users: 22300, feedback: 5 },
  { day: 'Sat', users: 23800, feedback: 7 },
  { day: 'Sun', users: 24600, feedback: 5 },
];

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'feedback', label: 'Feedback' },
  { id: 'alerts', label: 'Alerts' },
  { id: 'team', label: 'Team' },
];

const TYPE_CLASS = { 'Bug report': 'bug', 'Feature request': 'feature', 'General': 'general' };

// ── Sub-components ────────────────────────────────────────────────────────────

function FeedbackBadge({ type }) {
  return <div className={`dash-feedback-type-badge type-${TYPE_CLASS[type] || 'general'}`}>{type}</div>;
}

function Sparkline({ data, up }) {
  const w = 80, h = 28, pad = 2;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const xs = data.map((_, i) => pad + (i / (data.length - 1)) * (w - pad * 2));
  const ys = data.map(v => h - pad - ((v - min) / range) * (h - pad * 2));
  const d = xs.map((x, i) => `${i === 0 ? 'M' : 'L'}${x},${ys[i]}`).join(' ');
  const fill = `${d} L${xs[xs.length - 1]},${h} L${xs[0]},${h} Z`;
  const color = up ? '#40e6d9' : '#ff6b6b';
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <path d={fill} fill={color} opacity="0.1" />
      <path d={d} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ActivityChart({ data }) {
  const maxUsers = Math.max(...data.map(d => d.users));
  const today = data.length - 1;
  return (
    <div className="dash-activity-chart">
      <div className="dash-activity-bars">
        {data.map((d, i) => {
          const pct = (d.users / maxUsers) * 100;
          return (
            <div key={d.day} className="dash-activity-col">
              <div className="dash-activity-bar-wrap">
                <div
                  className={`dash-activity-bar${i === today ? ' today' : ''}`}
                  style={{ height: `${pct}%` }}
                  title={`${d.users.toLocaleString()} users`}
                />
              </div>
              <div className={`dash-activity-day${i === today ? ' today' : ''}`}>{d.day}</div>
            </div>
          );
        })}
      </div>
      <div className="dash-activity-legend">
        <span className="dash-activity-legend-item">
          <span className="dash-activity-legend-dot" style={{ background: 'var(--blue-core)' }} />
          Daily active users
        </span>
        <span className="dash-activity-meta">{data[today].users.toLocaleString()} today</span>
      </div>
    </div>
  );
}

function FeedbackBreakdown({ items }) {
  const counts = { 'Feature request': 0, 'Bug report': 0, 'General': 0 };
  items.forEach(f => { counts[f.type] = (counts[f.type] || 0) + 1; });
  const total = items.length;
  const bars = [
    { label: 'Feature requests', count: counts['Feature request'], color: 'var(--blue-core)', cls: 'feature' },
    { label: 'Bug reports', count: counts['Bug report'], color: '#ff6b6b', cls: 'bug' },
    { label: 'General', count: counts['General'], color: '#40e6d9', cls: 'general' },
  ];
  return (
    <div className="dash-breakdown">
      <div className="dash-breakdown-bar">
        {bars.map(b => b.count > 0 && (
          <div
            key={b.label}
            className={`dash-breakdown-seg type-${b.cls}`}
            style={{ flex: b.count }}
            title={`${b.label}: ${b.count}`}
          />
        ))}
      </div>
      <div className="dash-breakdown-legend">
        {bars.map(b => (
          <div key={b.label} className="dash-breakdown-item">
            <div className={`dash-breakdown-dot type-${b.cls}`} />
            <span className="dash-breakdown-label">{b.label}</span>
            <span className="dash-breakdown-count">{b.count}</span>
            <span className="dash-breakdown-pct">{Math.round((b.count / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9 9l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function AlertIcon({ level }) {
  if (level === 'warn') return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2L14 13H2L8 2Z" stroke="#f5c842" strokeWidth="1.4" strokeLinejoin="round" />
      <line x1="8" y1="6" x2="8" y2="9" stroke="#f5c842" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="8" cy="11" r="0.6" fill="#f5c842" />
    </svg>
  );
  if (level === 'success') return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="#40e6d9" strokeWidth="1.4" />
      <path d="M5 8l2 2 4-4" stroke="#40e6d9" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="var(--blue-core)" strokeWidth="1.4" />
      <line x1="8" y1="5" x2="8" y2="9" stroke="var(--blue-core)" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="8" cy="11" r="0.6" fill="var(--blue-core)" />
    </svg>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function EmployeeDashboard({ user, onSignOut }) {
  const [activeSection, setActiveSection] = useState('overview');
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('latest');
  const [search, setSearch] = useState('');
  const [dismissedAlerts, setDismissedAlerts] = useState(new Set());
  const [expandedFeedback, setExpandedFeedback] = useState(null);

  const userName = user
    ? user.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    : 'Employee';

  const filters = ['All', 'Feature request', 'Bug report', 'General'];

  const filteredFeedback = useMemo(() => {
    let items = activeFilter === 'All' ? FEEDBACK_ITEMS : FEEDBACK_ITEMS.filter(f => f.type === activeFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(f => f.msg.toLowerCase().includes(q) || f.type.toLowerCase().includes(q));
    }
    if (sortBy === 'rating') items = [...items].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    else if (sortBy === 'type') items = [...items].sort((a, b) => a.type.localeCompare(b.type));
    return items;
  }, [activeFilter, search, sortBy]);

  const sortedAlerts = useMemo(
    () => [...ALERTS].filter(a => !dismissedAlerts.has(a.id)).sort((a, b) => a.priority - b.priority),
    [dismissedAlerts]
  );

  const teamSorted = [...TEAM].sort((a, b) => {
    const order = { active: 0, away: 1, offline: 2 };
    return order[a.status] - order[b.status];
  });

  const teamCounts = TEAM.reduce((acc, m) => { acc[m.status] = (acc[m.status] || 0) + 1; return acc; }, {});

  return (
    <div className="dash-wrap">
      <header className="dash-header">
        <div className="dash-header-left">
          <button className="dash-logo-btn" onClick={onSignOut}>
            <WeatherIcon size={24} />
            <span className="dash-wordmark">Weather<span>.co</span></span>
          </button>
          <nav className="dash-header-nav">
            {SECTIONS.map(s => (
              <button
                key={s.id}
                className={`dash-header-nav-item${activeSection === s.id ? ' active' : ''}`}
                onClick={() => setActiveSection(s.id)}
              >
                {s.label}
                {s.id === 'alerts' && sortedAlerts.filter(a => a.level === 'warn').length > 0 && (
                  <span className="dash-nav-badge">{sortedAlerts.filter(a => a.level === 'warn').length}</span>
                )}
              </button>
            ))}
          </nav>
        </div>
        <div className="dash-header-right">
          <div className="dash-header-user">
            <div className="dash-avatar-sm">{userName[0]}</div>
            <div className="dash-header-user-info">
              <div className="dash-header-user-name">{userName}</div>
              <div className="dash-header-user-email">{user}</div>
            </div>
          </div>
          <button className="dash-header-signout" onClick={onSignOut}>Sign out</button>
        </div>
      </header>

      <main className="dash-main-area">
        <div className="dash-content-wrap" key={activeSection}>

          {/* ── Overview ── */}
          {activeSection === 'overview' && (
            <>
              <div className="dash-stats-grid">
                {STATS.map(s => (
                  <div className="dash-stat-card" key={s.label}>
                    <div className="dash-stat-top">
                      <div>
                        <div className="dash-stat-label">{s.label}</div>
                        <div className="dash-stat-value">{s.value}</div>
                        <div className={`dash-stat-delta${s.up ? ' up' : ' down'}`}>
                          {s.up ? '↑' : '↓'} {s.delta} this week
                        </div>
                      </div>
                      <Sparkline data={s.sparkline} up={s.up} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="dash-two-col">
                <div className="dash-panel">
                  <div className="dash-panel-header">
                    <div className="dash-section-title">User activity</div>
                    <span className="dash-panel-meta">Last 7 days</span>
                  </div>
                  <ActivityChart data={ACTIVITY_DATA} />
                </div>
                <div className="dash-panel">
                  <div className="dash-panel-header">
                    <div className="dash-section-title">Feedback breakdown</div>
                    <span className="dash-panel-meta">{FEEDBACK_ITEMS.length} total</span>
                  </div>
                  <FeedbackBreakdown items={FEEDBACK_ITEMS} />
                </div>
              </div>

              <div className="dash-panel">
                <div className="dash-panel-header">
                  <div className="dash-section-title">Recent feedback</div>
                  <button className="dash-panel-link" onClick={() => setActiveSection('feedback')}>View all →</button>
                </div>
                <div className="dash-feedback-list">
                  {FEEDBACK_ITEMS.slice(0, 4).map((f) => (
                    <div className="dash-feedback-row" key={f.id}>
                      <FeedbackBadge type={f.type} />
                      <div className="dash-feedback-msg">{f.msg}</div>
                      {f.rating && <div className="dash-feedback-rating">{'★'.repeat(f.rating)}{'☆'.repeat(5 - f.rating)}</div>}
                      <div className="dash-feedback-time">{f.time}</div>
                    </div>
                  ))}
                </div>
              </div>

              {sortedAlerts.length > 0 && (
                <div className="dash-panel">
                  <div className="dash-panel-header">
                    <div className="dash-section-title">Active alerts</div>
                    <button className="dash-panel-link" onClick={() => setActiveSection('alerts')}>View all →</button>
                  </div>
                  <div className="dash-alerts-list">
                    {sortedAlerts.slice(0, 2).map((a) => (
                      <div className={`dash-alert-row level-${a.level}`} key={a.id}>
                        <AlertIcon level={a.level} />
                        <div style={{ flex: 1 }}>
                          <div className="dash-alert-title">{a.title}</div>
                          <div className="dash-alert-desc">{a.desc}</div>
                        </div>
                        <div className="dash-alert-time">{a.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* ── Feedback ── */}
          {activeSection === 'feedback' && (
            <>
              <div className="dash-feedback-toolbar">
                <div className="dash-filter-row">
                  {filters.map(f => (
                    <button
                      key={f}
                      className={`dash-filter-btn${activeFilter === f ? ' active' : ''}`}
                      onClick={() => setActiveFilter(f)}
                    >
                      {f}
                      {f === 'All'
                        ? <span className="dash-filter-count">{FEEDBACK_ITEMS.length}</span>
                        : <span className="dash-filter-count">{FEEDBACK_ITEMS.filter(i => i.type === f).length}</span>
                      }
                    </button>
                  ))}
                </div>
                <div className="dash-feedback-controls">
                  <div className="dash-search-wrap">
                    <SearchIcon />
                    <input
                      className="dash-search"
                      placeholder="Search feedback…"
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                    />
                  </div>
                  <select className="dash-sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                    <option value="latest">Latest</option>
                    <option value="rating">Rating</option>
                    <option value="type">Type</option>
                  </select>
                </div>
              </div>

              {filteredFeedback.length === 0 ? (
                <div className="dash-empty">No feedback matching "{search}"</div>
              ) : (
                <div className="dash-feedback-list dash-feedback-list--full">
                  {filteredFeedback.map((f) => (
                    <div
                      className={`dash-feedback-row dash-feedback-row--expandable${expandedFeedback === f.id ? ' expanded' : ''}`}
                      key={f.id}
                      onClick={() => setExpandedFeedback(expandedFeedback === f.id ? null : f.id)}
                    >
                      <FeedbackBadge type={f.type} />
                      <div className="dash-feedback-body">
                        <div className="dash-feedback-msg">{f.msg}</div>
                        {expandedFeedback === f.id && (
                          <div className="dash-feedback-meta-row">
                            <span className="dash-feedback-meta-item">Platform: {f.platform}</span>
                            <span className="dash-feedback-meta-item">Version: v{f.version}</span>
                            {f.rating && <span className="dash-feedback-meta-item">Rating: {'★'.repeat(f.rating)}{'☆'.repeat(5 - f.rating)}</span>}
                          </div>
                        )}
                      </div>
                      {f.rating && !expandedFeedback && <div className="dash-feedback-rating">{'★'.repeat(f.rating)}{'☆'.repeat(5 - f.rating)}</div>}
                      <div className="dash-feedback-time">{f.time}</div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* ── Alerts ── */}
          {activeSection === 'alerts' && (
            <>
              <div className="dash-alerts-summary">
                {[
                  { level: 'warn', label: 'Warnings', color: '#f5c842' },
                  { level: 'info', label: 'Info', color: 'var(--blue-core)' },
                  { level: 'success', label: 'Success', color: '#40e6d9' },
                ].map(({ level, label, color }) => {
                  const count = sortedAlerts.filter(a => a.level === level).length;
                  return (
                    <div className="dash-alerts-summary-item" key={level}>
                      <span style={{ color, fontSize: 22, fontWeight: 600 }}>{count}</span>
                      <span className="dash-alerts-summary-label">{label}</span>
                    </div>
                  );
                })}
              </div>

              <div className="dash-alerts-list">
                {sortedAlerts.length === 0 ? (
                  <div className="dash-empty">All clear — no active alerts</div>
                ) : (
                  sortedAlerts.map((a) => (
                    <div className={`dash-alert-row dash-alert-row--full level-${a.level}`} key={a.id}>
                      <AlertIcon level={a.level} />
                      <div style={{ flex: 1 }}>
                        <div className="dash-alert-title">{a.title}</div>
                        <div className="dash-alert-desc">{a.desc}</div>
                      </div>
                      <div className="dash-alert-time">{a.time}</div>
                      <button
                        className="dash-alert-dismiss"
                        onClick={() => setDismissedAlerts(prev => new Set([...prev, a.id]))}
                      >
                        Dismiss
                      </button>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {/* ── Team ── */}
          {activeSection === 'team' && (
            <>
              <div className="dash-team-summary">
                {[
                  { status: 'active', label: 'Online', color: '#40e6d9' },
                  { status: 'away', label: 'Away', color: '#f5c842' },
                  { status: 'offline', label: 'Offline', color: 'var(--text-tertiary)' },
                ].map(({ status, label, color }) => (
                  <div className="dash-team-summary-item" key={status}>
                    <span style={{ color, fontWeight: 600, fontSize: 22 }}>{teamCounts[status] || 0}</span>
                    <span className="dash-team-summary-label">{label}</span>
                  </div>
                ))}
              </div>

              <div className="dash-team-list">
                {teamSorted.map((m, i) => (
                  <div className="dash-team-row" key={i}>
                    <div className="dash-avatar large" style={{ background: m.color }}>{m.initials}</div>
                    <div style={{ flex: 1 }}>
                      <div className="dash-team-name">{m.name}</div>
                      <div className="dash-team-role">{m.role}</div>
                    </div>
                    <div className="dash-team-last-active">{m.lastActive}</div>
                    <div className={`dash-status-badge status-${m.status}`}>{m.status}</div>
                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      </main>
    </div>
  );
}
