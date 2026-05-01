import { useState, useEffect } from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import EmployeeDashboard from './components/EmployeeDashboard';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import FeedbackPage from './pages/FeedbackPage';
import PrivacyPage from './pages/PrivacyPage';

const NAV_LINKS = ['Home', 'Products', 'Feedback', 'Privacy'];
const PAGE_COMPONENTS = [HomePage, ProductsPage, FeedbackPage, PrivacyPage];

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [activePage, setActivePage] = useState(0);
  const [pageKey, setPageKey] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  function handleNavigate(idx) {
    setActivePage(idx);
    setPageKey(k => k + 1);
  }

  function handleOpenDashboard(email) {
    setLoggedInUser(email);
    setShowLogin(false);
    setShowDashboard(true);
  }

  const PageComponent = PAGE_COMPONENTS[activePage] || HomePage;

  return (
    <>
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onOpenDashboard={handleOpenDashboard}
        />
      )}
      {showDashboard && (
        <EmployeeDashboard
          user={loggedInUser}
          onSignOut={() => setShowDashboard(false)}
        />
      )}

      <Nav
        theme={theme}
        onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
        navLinks={NAV_LINKS}
        activePage={activePage}
        onNavigate={handleNavigate}
        onMembersClick={() => setShowLogin(true)}
      />

      <div className="page">
        <PageComponent key={pageKey} />
        <Footer />
      </div>
    </>
  );
}
